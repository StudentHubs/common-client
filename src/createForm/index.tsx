import * as React from 'react';
import {
  branch,
  compose,
  createEventHandler,
  mapProps,
  pure,
  renderComponent,
  renderNothing,
  withHandlers,
  withProps,
  withState,
} from 'recompose';
import { Comp, mapPropsStream, memoizeProps, omitProps } from 'mishmash';
import * as most from 'most';
import * as _ from 'lodash';
import keysToObject from 'keys-to-object';
import { getId } from 'rgo';
import { noUndef, Obj, root, transformValue } from 'common';

import getState from './getState';
import prepareFields from './prepareFields';

export interface FormProps {
  objects?: Obj<{
    type: string;
    id?: string;
    filter?: string | any[];
    initial?: Obj;
  }>;
  blocks: any[][];
  onCommit?: (values: Obj) => Obj | void | Promise<Obj | void>;
  onError?: (values: Obj) => Obj | void | Promise<Obj | void>;
  onSubmit?: (values: Obj) => Obj | void | Promise<Obj | void>;
}
export default function createForm<T = {}>(
  container: Comp<{
    blocks: React.ReactElement<any>[][];
    HeightWrap: Comp;
    invalid: boolean;
    attempted: boolean;
    submit: () => Promise<void>;
    [key: string]: any;
  }>,
  block: Comp | [string[], Comp],
) {
  const Block = branch<any>(
    ({ fields }) => fields,
    compose(
      getState,
      branch(({ state }: any) => !state, renderNothing),
      mapProps(({ stores, fields, state, ...props }: any) => ({
        ...props,
        fields: fields.map(({ key, initial: _, ...f }, i) => ({
          ...state[i],
          onChange: value =>
            stores[key.store].set([
              { key: key.key, value: transformValue(value, f.transform) },
            ]),
          ...f,
          field: key,
        })),
      })),
    ),
    omitProps('fields', 'stores', 'state') as any,
  )(Array.isArray(block) ? block[1] : block);

  return compose<any, FormProps & T>(
    memoizeProps('objects', 'blocks'),
    pure,
    mapPropsStream(props$ => {
      const state = {};
      const listeners: {
        keys: string[];
        emit: (value: any[]) => void;
      }[] = [];
      const stores = {
        rgo: {
          get(
            keys: [string, string, string],
            emit: (value: any[] | null) => void,
          ) {
            const queries: Obj<Obj<true>> = {};
            keys.forEach(([type, id, field]) => {
              const key = `${type}.${id}`;
              queries[key] = queries[key] || {};
              queries[key][field] = true;
            });
            const queryKeys = Object.keys(queries);
            return root.rgo.query(
              ...queryKeys.map((key, i) => ({
                name: key.split('.')[0],
                alias: `obj${i}`,
                filter: key.split('.')[1],
                fields: Object.keys(queries[key]),
              })),
              data =>
                emit(
                  data &&
                    keys.map(([type, id, field]) => {
                      const record =
                        data[`obj${queryKeys.indexOf(`${type}.${id}`)}`][0];
                      return noUndef(record && record[field]);
                    }),
                ),
            );
          },
          set(values: { key: [string, string, string]; value: any }[]) {
            root.rgo.set(...values);
          },
        },
        local: {
          get(keys: string[], emit: (value: any[]) => void) {
            emit(keys.map(key => noUndef(state[key])));
            if (keys.length > 0) {
              const listener = { keys, emit };
              listeners.push(listener);
              return () => listeners.splice(listeners.indexOf(listener), 1);
            }
            return () => {};
          },
          set(values: { key: string; value: any }[]) {
            values.forEach(({ key, value }) => (state[key] = value));
            listeners.forEach(l => {
              if (values.some(({ key }) => l.keys.includes(key))) {
                l.emit(l.keys.map(key => noUndef(state[key])));
              }
            });
          },
        },
      };
      return props$.map(props => ({ stores, ...props }));
    }),
    mapPropsStream(props$ => {
      let fields;
      props$.observe(() => {}).then(() => {
        root.rgo.set(
          ...fields
            .filter(f => f.key.store === 'rgo')
            .map(f => ({ key: f.key.key })),
        );
      });
      return props$
        .map(
          ({
            objects,
            blocks,
            stores,
            onCommit,
            onError,
            onSubmit,
            ...props
          }) =>
            most
              .fromPromise<any>(
                prepareFields(
                  Array.isArray(block) ? block[0] : [],
                  objects,
                  blocks,
                  stores,
                ),
              )
              .tap(newProps => (fields = newProps.fields))
              .startWith({})
              .map(newProps => ({
                stores,
                onCommit,
                onError,
                onSubmit,
                props,
                ...newProps,
              })),
        )
        .switchLatest();
    }),
    withState('elem', 'setElem', null),
    withHandlers({
      HeightWrap: ({ setElem }: any) => ({ children }) => (
        <div ref={setElem}>{children}</div>
      ),
    }),
    withState('height', 'setHeight', null),
    branch(
      ({ fields }: any) => fields,
      compose(
        mapPropsStream(props$ => {
          const {
            stream: processing$,
            handler: setProcessing,
          } = createEventHandler<any, any>();
          return props$.combine(
            (props, processing) => ({
              ...props,
              processing,
              setProcessing,
            }),
            most.from<any>(processing$).startWith(null),
          );
        }),
        getState,
        branch(
          ({ state }: any) => state,
          compose(
            withHandlers<any, any>({
              submit: ({
                onCommit,
                onSubmit,
                onError,
                stores,
                objects,
                fields,
                elem,
                setHeight,
                setProcessing,
                state,
              }) => async () => {
                if (!state.some(s => !s.hidden && s.invalid)) {
                  if (elem) setHeight(elem.offsetHeight);
                  setProcessing(true);
                  const visibleFields = fields.filter(
                    (_, i) => !state[i].hidden,
                  );
                  const values = visibleFields.reduce(
                    (res, f, i) => _.set(res, f.key.name, state[i].value),
                    {},
                  );
                  const rgoKeys = visibleFields
                    .filter(f => f.key.store === 'rgo')
                    .map(f => f.key);
                  if (onCommit) {
                    const extra = (await onCommit(values)) || {};
                    const extraValues = Object.keys(extra).reduce<any[]>(
                      (res, obj) => [
                        ...res,
                        ...Object.keys(extra[obj] || {}).map(field => ({
                          key: {
                            store: 'rgo',
                            key: [
                              objects[obj].type,
                              objects[obj].id,
                              field,
                            ] as [string, string, string],
                            name: `${obj}.${field}`,
                          },
                          value: extra[obj][field],
                        })),
                      ],
                      [],
                    );
                    root.rgo.set(
                      ...extraValues.map(({ key, value }) => ({
                        key: key.key,
                        value,
                      })),
                    );
                    rgoKeys.push(
                      ...extraValues
                        .filter(
                          ({ key }) => !rgoKeys.some(k => k.name === key.name),
                        )
                        .map(({ key }) => key),
                    );
                  }
                  let changes: any;
                  try {
                    const newIds = await root.rgo.commit(
                      ...rgoKeys.map(key => key.key),
                    );
                    for (const obj of Object.keys(objects)) {
                      const { type, id } = objects[obj];
                      values[obj].id = getId(id, newIds[type]);
                    }
                    changes = onSubmit && (await onSubmit(values));
                  } catch {
                    changes = onError && (await onError(values));
                  }
                  stores.rgo.set(
                    Object.keys(changes || {})
                      .filter(k => objects[k])
                      .reduce<any[]>(
                        (res, k) => [
                          ...res,
                          ...Object.keys(changes[k]).map(field => ({
                            key: [objects[k].type, objects[k].id, field],
                            value: changes[k][field],
                          })),
                        ],
                        [],
                      ),
                  );
                  stores.local.set(
                    Object.keys(changes || {})
                      .filter(k => !objects[k])
                      .reduce<any[]>(
                        (res, k) => [...res, { key: k, value: changes[k] }],
                        [],
                      ),
                  );
                  setProcessing(changes ? false : null);
                } else {
                  setProcessing(false);
                }
              },
            }),
            withHandlers({
              onKeyDown: ({ submit }: any) => event => {
                if (event.which === 13) submit();
              },
            }),
          ),
        ),
      ),
    ),
    branch(
      ({ fields, processing, state }: any) => !fields || processing || !state,
      renderComponent<any>(({ props, height }) =>
        React.createElement(container as any, {
          HeightWrap: ({ style, children }) => (
            <div
              style={{
                position: 'relative',
                ...style,
                height: height || style.height || 'auto',
              }}
            >
              {children}
            </div>
          ),
          ...props,
        }),
      ),
    ),
    mapProps(({ state, ...props }: any) => ({
      invalid: state.some(s => !s.hidden && s.invalid),
      hidden: JSON.stringify(state.map(s => s.hidden)),
      ...props,
    })),
    pure,
    withProps<any, any>(({ fields, hidden }) => ({
      hidden: keysToObject(
        JSON.parse(hidden),
        h => h,
        (_, i) => fields[i].key.name,
      ),
    })),
  )(
    ({
      blocks,
      stores,
      props,
      HeightWrap,
      processing,
      submit,
      onKeyDown,
      invalid,
      hidden,
    }) =>
      React.createElement(container as any, {
        blocks: blocks
          .map((blockSet, i) =>
            blockSet.map(
              (block, j) =>
                (block.fields.length === 0 ||
                  block.fields.some(f => !hidden[f.key.name])) && (
                  <Block
                    {...block}
                    stores={stores}
                    fields={
                      block.fields.length === 0
                        ? null
                        : block.fields.filter(f => !hidden[f.key.name])
                    }
                    attempted={processing !== null}
                    key={`${i}_${j}`}
                  />
                ),
            ),
          )
          .filter(blockComps => blockComps.some(c => c)),
        HeightWrap,
        attempted: processing !== null,
        submit,
        onKeyDown,
        invalid,
        ...props,
      }),
  );
}
