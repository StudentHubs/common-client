import * as React from 'react';
import { css, Div, Icon, Txt } from 'elmnt';
import m, { watchHover } from 'mishmash';
import st from 'style-transform';
import { root } from 'common';

import download from '../download';

import jsonUrl from './jsonUrl';
import icons from './icons';

const Link = m
  .do(watchHover)
  .merge('style', 'isHovered', (style, isHovered) => ({
    style: st(style)
      .mergeKeys({ link: true, hover: isHovered })
      .filter(...css.groups.text, 'padding', 'background')
      .scale({ paddingLeft: 2, paddingRight: 2 })
      .merge({
        float: 'left',
        display: 'inline-block',
        verticalAlign: 'top',
        textAlign: 'center',
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        cursor: 'pointer',
      }),
  }))(({ text, onClick, hoverProps, style }) => (
  <Txt onClick={onClick} {...hoverProps} style={style}>
    {text}
  </Txt>
));

const Button = m
  .do(watchHover)
  .merge('style', 'isHovered', 'save', (style, isHovered, save) => {
    const base = st(style)
      .mergeKeys({ button: true, hover: isHovered, cancel: !save })
      .scale({
        fontSize: { fontSize: 1, borderTopWidth: 2, borderBottomWidth: 2 },
        spacing: { fontSize: 0.75 },
        margin: { borderWidth: -2 },
        ...(save ? { paddingLeft: 2.5, paddingRight: 2.5 } : {}),
      })
      .merge({
        layout: 'bar',
        float: 'right',
        cursor: 'pointer',
        border: 'none',
      });
    return {
      style: {
        div: st(base).filter(...css.groups.box, ...css.groups.other),
        text: st(base).filter(...css.groups.text),
      },
    };
  })(({ save, onClick, hoverProps, style }) => (
  <Div onClick={onClick} {...hoverProps} style={style.div}>
    {save && <Txt style={style.text}>Save</Txt>}
    <Icon {...icons[save ? 'tick' : 'cross']} style={style.text} />
  </Div>
));

export default m
  .merge('style', style => ({
    style: {
      base: style,
      div: st(style)
        .filter('height', 'background', 'border')
        .scale({ borderWidth: 2 })
        .merge({
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100%',
        }),
    },
  }))
  .merge('context', (context, push) =>
    context.store.listen('unchanged', (unchanged = {}) =>
      push({ isEditing: Object.keys(unchanged).length > 0 }),
    ),
  )
  .merge(props$ => {
    const clear = () => {
      const { context } = props$();
      root.rgo.set(
        ...Object.keys(context.store.get('unchanged') || {}).map(k => ({
          key: k.split('.') as [string, string, string],
          value: undefined,
        })),
      );
      context.store.set('unchanged', {});
    };
    return {
      save: async () => {
        const { context } = props$();
        try {
          await root.rgo.commit(
            ...(Object.keys(context.store.get('unchanged') || {}).map(k =>
              k.split('.'),
            ) as [string, string, string][]),
          );
          context.store.set('unchanged', {});
        } catch (error) {
          alert(
            'Save failed. You may not have permission to edit these fields.',
          );
        }
      },
      clear,
      reset: () => {
        const { context } = props$();
        clear();
        context.reset();
      },
      permalink: () => {
        const { context, linkQuery } = props$();
        window.open(`${context.permalink}?${jsonUrl.stringify(linkQuery)}`);
      },
      download: () => {
        const { context, query, data } = props$();
        download(context.config, context.types, query, data);
      },
    };
  })(({ reset, download, permalink, save, clear, isEditing, style }) => (
  <div style={style.div}>
    <Link text="Reset" onClick={reset} style={style.base} />
    <Link text="Download" onClick={download} style={style.base} />
    <Link text="Permalink" onClick={permalink} style={style.base} />
    {isEditing && (
      <>
        <Button save onClick={save} style={style.base} />
        <Button onClick={clear} style={style.base} />
      </>
    )}
  </div>
));
