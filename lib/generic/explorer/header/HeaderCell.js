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
var elmnt_1 = require("elmnt");
var refluent_1 = require("refluent");
var utils_1 = require("../../../utils");
var icons_1 = require("../icons");
var AddField_1 = require("./AddField");
var FilterField_1 = require("./FilterField");
var LimitField_1 = require("./LimitField");
var RemoveField_1 = require("./RemoveField");
var SortField_1 = require("./SortField");
var PageField_1 = require("./PageField");
exports.default = refluent_1.default
    .yield(function (_a) {
    var next = _a.next;
    return next(function (props) { return props; });
})
    .do(utils_1.restyle('alt', function (props) { return props.name === ''; }, function (props) { return props.isPathSort || props.isSiblingSort; }, function (props) { return props.isPathRemove || props.isChildRemove; }, function (props) {
    return props.isPathAdd ||
        props.isLastPathAdd ||
        props.isPathSort ||
        props.isSiblingSort ||
        props.isPathRemove ||
        props.isChildRemove ||
        props.isPathPageUp ||
        props.isPathPageDown;
}, function (alt, empty, sort, remove, active, style) {
    return style.mergeKeys({ header: true, alt: alt, empty: empty, sort: sort, remove: remove, active: active });
}))
    .do(utils_1.restyle('name', 'path', 'span', 'firstCol', 'lastCol', function (name, path, span, firstCol, lastCol, style) {
    var _a;
    return ({
        base: style,
        td: style
            .scale(__assign({ paddingTop: {
                paddingTop: 1,
                borderTopWidth: span || name.startsWith('#') ? -1 : 0,
            }, paddingLeft: {
                paddingLeft: 1,
                borderLeftWidth: span ? 1 : 0,
            }, borderTopWidth: span || name.startsWith('#') ? 2 : 1, borderRightWidth: !lastCol && name === '#2' ? 1 : 0, borderBottomWidth: !span ? 2 : 0, borderLeftWidth: (!firstCol && (name === '#1' ? 2 : !span && 1)) || 0 }, (name === '' && path.indexOf('.') === -1
            ? {
                borderTopWidth: 2,
                borderRightWidth: 0,
                borderBottomWidth: 0,
                borderLeftWidth: 0,
            }
            : {})))
            .merge({ position: 'relative', verticalAlign: 'top' }),
        fill: style
            .scale({
            top: { borderTopWidth: span || name.startsWith('#') ? -2 : -1 },
            right: {
                borderRightWidth: (!lastCol && (name === '#2' ? -2 : -1)) || 0,
            },
            bottom: { borderBottomWidth: !span ? -2 : -1 },
            left: {
                borderLeftWidth: (!firstCol && (name === '#1' ? -2 : !span && -1)) || 0,
            },
        })
            .filter('top', 'right', 'bottom', 'left')
            .merge({ position: 'absolute' }),
        icon: (_a = style
            .mergeKeys('icon')).filter.apply(_a, __spread(elmnt_1.css.groups.text, ['background'])).scale({
            fontSize: 0.6,
            padding: { fontSize: 0.15 },
            radius: { fontSize: 0.375 },
        })
            .merge({ borderRadius: 100 }),
        text: style.filter.apply(style, __spread(elmnt_1.css.groups.text)).merge({
            cursor: 'default',
            position: 'relative',
            userSelect: 'none',
            MozUserSelect: 'none',
            WebkitUserSelect: 'none',
            msUserSelect: 'none',
        }),
    });
}))
    .do('context', 'live', function (_a) {
    var name = _a.name, path = _a.path;
    return path + "_" + name + "_width";
}, function (context, live, key, push) {
    return live
        ? context.store.listen(key, function (width) { return push({ width: width }); })
        : {
            setWidthElem: Object.assign(function (elem) { return context.setWidthElem(key, elem); }, { noCache: true }),
        };
})
    .yield(function (_a) {
    var context = _a.context, rowSpan = _a.rowSpan, name = _a.name, type = _a.type, isList = _a.isList, span = _a.span, path = _a.path, sort = _a.sort, last = _a.last, firstCol = _a.firstCol, lastCol = _a.lastCol, text = _a.text, live = _a.live, focused = _a.focused, isPathAdd = _a.isPathAdd, isLastPathAdd = _a.isLastPathAdd, isPathSort = _a.isPathSort, isSiblingSort = _a.isSiblingSort, isPathRemove = _a.isPathRemove, isChildRemove = _a.isChildRemove, isPathLimit = _a.isPathLimit, isPathFilter = _a.isPathFilter, isPathPageUp = _a.isPathPageUp, isPathPageDown = _a.isPathPageDown, setWidthElem = _a.setWidthElem, width = _a.width, style = _a.style;
    return (React.createElement("td", { style: __assign({}, style.td, (live && !span ? { minWidth: width } : {})), colSpan: span || 1, rowSpan: rowSpan, ref: !span ? setWidthElem : undefined },
        live && (React.createElement("div", { style: style.fill },
            span && (React.createElement("div", { style: {
                    position: 'absolute',
                    top: style.base.borderTopWidth * 2,
                    right: 0,
                    bottom: style.base.borderBottomWidth,
                    width: style.base.borderLeftWidth,
                    background: style.td.background,
                    zIndex: 1,
                } })),
            !span &&
                name !== '#2' &&
                !firstCol && (React.createElement("div", { style: __assign({ position: 'absolute', top: 0 }, (name
                    ? { width: style.base.borderLeftWidth }
                    : { right: 0 }), { bottom: 0, left: 0, zIndex: name ? 20 : 5 }) },
                React.createElement(AddField_1.default, { context: context, wide: !name, type: type, path: path, active: isPathAdd, focused: isPathAdd && focused, empty: name === '', style: style }))),
            last &&
                !lastCol && (React.createElement("div", { style: {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    width: style.base.borderRightWidth,
                    zIndex: 20,
                } },
                React.createElement(AddField_1.default, { context: context, type: type, path: last, active: isLastPathAdd, focused: isLastPathAdd && focused, style: style }))),
            isSiblingSort && (React.createElement("div", { style: {
                    position: 'absolute',
                    top: -style.base.borderTopWidth,
                    left: 0,
                    right: 0,
                    height: style.base.borderLeftWidth * 3,
                    background: style.icon.background,
                    zIndex: 10,
                } })),
            name &&
                !isList &&
                !span &&
                !name.startsWith('#') && (React.createElement("div", { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '50%',
                    zIndex: 10,
                } },
                React.createElement(SortField_1.default, { context: context, sort: sort, path: path, active: isPathSort, activeSibling: isSiblingSort, style: style }))),
            !span &&
                isChildRemove && (React.createElement("div", { style: {
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    left: 0,
                    height: style.base.borderBottomWidth * 3,
                    background: style.icon.background,
                    zIndex: 1,
                } })),
            name &&
                !name.startsWith('#') && (React.createElement("div", { style: __assign({ position: 'absolute' }, (span
                    ? {
                        left: -style.base.paddingLeft,
                        right: -style.base.paddingRight,
                        top: -style.icon.radius,
                        bottom: style.base.borderTopWidth + style.icon.radius,
                    }
                    : { left: 0, right: 0, bottom: 0, height: '50%' }), { zIndex: span ? 4 : 10 }) },
                React.createElement(RemoveField_1.default, { context: context, relation: span, path: path, active: isPathRemove, style: style }))),
            name === '#1' &&
                isList && (React.createElement(React.Fragment, null,
                React.createElement(PageField_1.default, { up: true, context: context, path: path, active: isPathPageUp, style: style }),
                React.createElement(PageField_1.default, { context: context, path: path, active: isPathPageDown, style: style }))))),
        name === '#1' &&
            isList && (React.createElement(LimitField_1.default, { context: context, live: live, path: path, active: isPathLimit, focused: isPathLimit && focused, style: style })),
        !name.startsWith('#') && (React.createElement(elmnt_1.Div, { style: { spacing: style.base.paddingRight * 1.5, layout: 'bar' } },
            name === '' && path !== '0' && path.indexOf('.') === -1 ? (React.createElement(elmnt_1.Icon, __assign({}, icons_1.default.plus, { style: style.text }))) : (React.createElement(elmnt_1.Txt, { style: style.text }, text)),
            span && (React.createElement(FilterField_1.default, { context: context, live: live, type: type, path: path, active: isPathFilter, focused: isPathFilter && focused, style: style }))))));
});
