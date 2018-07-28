"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var refluent_1 = require("refluent");
var common_1 = require("common");
var utils_1 = require("../../utils");
var createQuery_1 = require("./createQuery");
var Footer_1 = require("./Footer");
var jsonUrl_1 = require("./jsonUrl");
var Table_1 = require("./Table");
var initStore = function (printFilter, store, fields, type, path) {
    return fields.forEach(function (f, i) {
        if (typeof f !== 'string') {
            var newType = type
                ? common_1.root.rgo.schema[type][f.name].type
                : f.name;
            var newPath = path ? path + "." + i : "" + i;
            if (f.filter) {
                store.set(newPath + "_filter", printFilter(f.filter, newType));
            }
            store.set(newPath + "_start", (f.start || 0) + 1);
            if (f.end)
                store.set(newPath + "_end", f.end);
            initStore(printFilter, store, f.fields || [], newType, newPath);
        }
    });
};
var addAliases = function (fields, alias) {
    if (alias === void 0) { alias = ''; }
    return fields.map(function (f, i) {
        if (typeof f === 'string')
            return f;
        var newAlias = alias + "_" + i;
        return __assign({}, f, { alias: newAlias, fields: addAliases(f.fields, newAlias) });
    });
};
var addIds = function (fields) {
    return fields.map(function (f) {
        if (typeof f === 'string')
            return f;
        return __assign({}, f, { fields: f.fields.includes('id')
                ? addIds(f.fields)
                : __spread(['id'], addIds(f.fields)) });
    });
};
exports.default = refluent_1.default
    .do(utils_1.restyle(function (style) { return ({
    base: style
        .numeric('paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft')
        .scale({
        borderTopWidth: { borderTopWidth: 0.5, borderBottomWidth: 0.5 },
        borderRightWidth: { borderLeftWidth: 0.5, borderRightWidth: 0.5 },
        borderBottomWidth: { borderTopWidth: 0.5, borderBottomWidth: 0.5 },
        borderLeftWidth: { borderLeftWidth: 0.5, borderRightWidth: 0.5 },
    }),
    footer: style.scale({
        height: {
            fontSize: 1,
            paddingTop: 1,
            paddingBottom: 1,
            borderTopWidth: 2,
            borderBottomWidth: 2,
        },
    }),
}); }))
    .do(function (_, push) {
    common_1.root.rgo.query().then(function () { return push({ loading: false }); });
    return {
        loading: true,
        reset: function () { return push({ isReset: true }, function () { return push({ isReset: false }); }); },
    };
})
    .yield(function (_a) {
    var loading = _a.loading, isReset = _a.isReset, loader = _a.loader, next = _a.next;
    return loading || isReset ? loader() : next();
})
    .do(function (props$, push) {
    var values = {};
    var listeners = {};
    var set = function (key, value) {
        if (value !== values[key]) {
            if (value === undefined)
                delete values[key];
            else
                values[key] = value;
            listeners[''] && listeners[''].forEach(function (l) { return l(values); });
            listeners[key] && listeners[key].forEach(function (l) { return l(value); });
        }
    };
    var store = {
        get: function (key) { return values[key]; },
        set: set,
        update: function (key, map) { return set(key, map(values[key])); },
        listen: function (key, listener) {
            listener(key ? values[key] : values);
            listeners[key] = listeners[key] || [];
            listeners[key].push(listener);
            return function () { return listeners[key].splice(listeners[key].indexOf(listener), 1); };
        },
    };
    var unsubscribe;
    var query = createQuery_1.default(props$().query || jsonUrl_1.default.parse(location.search.slice(1)) || [], function (q) {
        var _a;
        initStore(props$().config.printFilter, store, q);
        var aliasQuery = addAliases(q);
        push({ query: aliasQuery, linkQuery: __spread(q) });
        if (unsubscribe)
            unsubscribe();
        unsubscribe = (_a = common_1.root.rgo).query.apply(_a, __spread(addIds(aliasQuery), [function (data) {
                if (!data) {
                    push({ fetching: true });
                }
                else {
                    push({ data: __assign({}, data) }, function () {
                        return setTimeout(function () { return push({ fetching: false }); });
                    });
                }
            }]));
    });
    var widthElems = {};
    var setWidthElem = function (key, elem) {
        if (elem) {
            widthElems[key] = elem;
        }
        else {
            delete widthElems[key];
            store.set(key);
        }
    };
    var updateWidths = function () {
        Object.keys(widthElems).forEach(function (key) {
            return store.set(key, widthElems[key].getBoundingClientRect().width);
        });
    };
    store.listen('', function () { return setTimeout(updateWidths); });
    props$().resizer && props$().resizer(updateWidths);
    props$('config', 'types', 'meta', 'editable', 'input', 'permalink', 'fileServer', 'reset', function (config, types, meta, editable, input, permalink, fileServer, reset) {
        if (meta === void 0) { meta = {}; }
        return ({
            context: {
                config: config,
                types: types,
                meta: meta,
                editable: editable,
                input: input,
                permalink: permalink,
                fileServer: fileServer,
                reset: reset,
                store: store,
                query: query,
                setWidthElem: setWidthElem,
                updateWidths: updateWidths,
                setActive: function (active, focus) {
                    store.update('header', function (state) {
                        if (state === void 0) { state = {}; }
                        return state.activeFocus && !focus
                            ? state
                            : {
                                activeFocus: active && focus,
                                activeType: active && active.type,
                                activePath: active && active.path,
                            };
                    });
                },
            },
        });
    });
    return unsubscribe;
})
    .yield(function (_a) {
    var query = _a.query, data = _a.data, loader = _a.loader, next = _a.next;
    return (!query || !data ? loader() : next());
})
    .yield(function (_a) {
    var context = _a.context, query = _a.query, fetching = _a.fetching, data = _a.data, style = _a.style, linkQuery = _a.linkQuery;
    return (React.createElement("div", { style: {
            position: 'relative',
            width: '100%',
            height: '100%',
            paddingBottom: 10 + style.footer.height,
        } },
        React.createElement("div", { style: {
                width: '100%',
                height: '100%',
                whiteSpace: 'nowrap',
                overflow: 'auto',
            } }, Array.from({ length: query.length + 1 }).map(function (_, i) { return (React.createElement("div", { style: {
                display: 'inline-block',
                verticalAlign: 'top',
                height: '100%',
                paddingLeft: i !== 0 ? 30 : 0,
            }, key: i },
            React.createElement(Table_1.default, { context: context, query: query[i] ? [query[i]] : [], fetching: fetching, data: data, index: i, style: style.base }))); })),
        React.createElement(Footer_1.default, { context: context, query: query, linkQuery: linkQuery, data: data, style: style.footer })));
});
