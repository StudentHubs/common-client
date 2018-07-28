import * as React from 'react';
export declare type Selector<P = any, V = any> = ((props: P) => V) | string | null | undefined;
declare const _default: <TOuter = any>(init: (elem: HTMLElement, props$: (() => TOuter) & (<V = any>(selector: Selector<TOuter, V>, listener: (value: V) => void | (() => void)) => () => void) & (<V1 = any, V2 = any>(selector1: Selector<TOuter, V1>, selector2: Selector<TOuter, V2>, listener: (value1: V1, value2: V2) => void | (() => void)) => () => void) & (<V1 = any, V2 = any, V3 = any>(selector1: Selector<TOuter, V1>, selector2: Selector<TOuter, V2>, selector3: Selector<TOuter, V3>, listener: (value1: V1, value2: V2, value3: V3) => void | (() => void)) => () => void) & (<V1 = any, V2 = any, V3 = any, V4 = any>(selector1: Selector<TOuter, V1>, selector2: Selector<TOuter, V2>, selector3: Selector<TOuter, V3>, selector4: Selector<TOuter, V4>, listener: (value1: V1, value2: V2, value3: V3, value4: V4) => void | (() => void)) => () => void) & (<V1 = any, V2 = any, V3 = any, V4 = any, V5 = any>(selector1: Selector<TOuter, V1>, selector2: Selector<TOuter, V2>, selector3: Selector<TOuter, V3>, selector4: Selector<TOuter, V4>, selector5: Selector<TOuter, V5>, listener: (value1: V1, value2: V2, value3: V3, value4: V4, value5: V5) => void | (() => void)) => () => void) & (<V1 = any, V2 = any, V3 = any, V4 = any, V5 = any, V6 = any>(selector1: Selector<TOuter, V1>, selector2: Selector<TOuter, V2>, selector3: Selector<TOuter, V3>, selector4: Selector<TOuter, V4>, selector5: Selector<TOuter, V5>, selector6: Selector<TOuter, V6>, listener: (value1: V1, value2: V2, value3: V3, value4: V4, value5: V5, value6: V6) => void | (() => void)) => () => void) & (<V1 = any, V2 = any, V3 = any, V4 = any, V5 = any, V6 = any, V7 = any>(selector1: Selector<TOuter, V1>, selector2: Selector<TOuter, V2>, selector3: Selector<TOuter, V3>, selector4: Selector<TOuter, V4>, selector5: Selector<TOuter, V5>, selector6: Selector<TOuter, V6>, selector7: Selector<TOuter, V7>, listener: (value1: V1, value2: V2, value3: V3, value4: V4, value5: V5, value6: V6, value7: V7) => void | (() => void)) => () => void) & (<V1 = any, V2 = any, V3 = any, V4 = any, V5 = any, V6 = any, V7 = any, V8 = any>(selector1: Selector<TOuter, V1>, selector2: Selector<TOuter, V2>, selector3: Selector<TOuter, V3>, selector4: Selector<TOuter, V4>, selector5: Selector<TOuter, V5>, selector6: Selector<TOuter, V6>, selector7: Selector<TOuter, V7>, selector8: Selector<TOuter, V8>, listener: (value1: V1, value2: V2, value3: V3, value4: V4, value5: V5, value6: V6, value7: V7, value8: V8) => void | (() => void)) => () => void) & (<V1 = any, V2 = any, V3 = any, V4 = any, V5 = any, V6 = any, V7 = any, V8 = any, V9 = any>(selector1: Selector<TOuter, V1>, selector2: Selector<TOuter, V2>, selector3: Selector<TOuter, V3>, selector4: Selector<TOuter, V4>, selector5: Selector<TOuter, V5>, selector6: Selector<TOuter, V6>, selector7: Selector<TOuter, V7>, selector8: Selector<TOuter, V8>, selector9: Selector<TOuter, V9>, listener: (value1: V1, value2: V2, value3: V3, value4: V4, value5: V5, value6: V6, value7: V7, value8: V8, value9: V9) => void | (() => void)) => () => void) & (<V1 = any, V2 = any, V3 = any, V4 = any, V5 = any, V6 = any, V7 = any, V8 = any, V9 = any, V10 = any>(selector1: Selector<TOuter, V1>, selector2: Selector<TOuter, V2>, selector3: Selector<TOuter, V3>, selector4: Selector<TOuter, V4>, selector5: Selector<TOuter, V5>, selector6: Selector<TOuter, V6>, selector7: Selector<TOuter, V7>, selector8: Selector<TOuter, V8>, selector9: Selector<TOuter, V9>, selector10: Selector<TOuter, V10>, listener: (value1: V1, value2: V2, value3: V3, value4: V4, value5: V5, value6: V6, value7: V7, value8: V8, value9: V9, value10: V10) => void | (() => void)) => () => void)) => void, elemType?: string) => {
    new (props: Readonly<{}>): {
        root: any;
        listeners: any[];
        componentWillReceiveProps(nextProps: any): void;
        shouldComponentUpdate(): boolean;
        componentDidMount(): void;
        render(): React.DOMElement<React.DOMAttributes<Element>, Element>;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    new (props: {}, context?: any): {
        root: any;
        listeners: any[];
        componentWillReceiveProps(nextProps: any): void;
        shouldComponentUpdate(): boolean;
        componentDidMount(): void;
        render(): React.DOMElement<React.DOMAttributes<Element>, Element>;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<{}>) => {} | Pick<{}, K> | null) | Pick<{}, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{}>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
};
export default _default;
