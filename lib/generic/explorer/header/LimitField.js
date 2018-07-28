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
exports.default = refluent_1.default
    .do('context', 'path', function (context, path, push) {
    var unlistens = [
        context.store.listen(path + "_start", function (start) {
            if (start === void 0) { start = 1; }
            return push({ start: start });
        }),
        context.store.listen(path + "_end", function (end) {
            if (end === void 0) { end = null; }
            return push({ end: end });
        }),
    ];
    return function () { return unlistens.forEach(function (u) { return u(); }); };
})
    .do(function (props$, _) {
    var inputElem1;
    var inputElem2;
    var diff = -1;
    props$('start', 'end', function (start, end) {
        if (diff === -1)
            diff = end ? end - start : null;
        return { invalid: start && end && start > end };
    });
    return {
        setInputElem1: function (e) { return (inputElem1 = e); },
        setInputElem2: function (e) { return (inputElem2 = e); },
        onChangeStart: function (v) {
            var _a = props$(), context = _a.context, path = _a.path, end = _a.end;
            context.store.set(path + "_start", v);
            if (v && end) {
                context.store.set(path + "_end", Math.max(v + diff, 1));
            }
        },
        onChangeEnd: function (v) {
            var _a = props$(), context = _a.context, path = _a.path, start = _a.start;
            context.store.set(path + "_end", v);
            diff = start && v ? v - start : null;
        },
        onMouseMove: function () {
            var _a = props$(), context = _a.context, path = _a.path;
            context.setActive({ type: 'limit', path: path });
        },
        onMouseLeave: function () {
            var context = props$().context;
            context.setActive(null);
        },
        onClick: function () {
            var _a = props$(), context = _a.context, path = _a.path;
            context.setActive({ type: 'limit', path: path }, true);
            inputElem1 && inputElem1.focus();
        },
        onClickOutside: function () {
            var _a = props$(), context = _a.context, path = _a.path, focused = _a.focused, $invalid = _a.$invalid, start = _a.start, end = _a.end;
            if (focused) {
                if (!$invalid) {
                    if (!start)
                        context.store.set(path + "_start", 1);
                    if (end === 0)
                        context.store.set(path + "_end", null);
                    context.query.limit(path, start ? start - 1 : 0, end);
                    context.setActive(null, true);
                }
                return true;
            }
        },
        onKeyDown: function (event) {
            var _a = props$(), context = _a.context, path = _a.path, focused = _a.focused, $invalid = _a.$invalid, start = _a.start, end = _a.end;
            if (focused && event.keyCode === 13) {
                if (!$invalid) {
                    if (!start)
                        context.store.set(path + "_start", 1);
                    if (end === 0)
                        context.store.set(path + "_end", null);
                    context.query.limit(path, start ? start - 1 : 0, end);
                    context.setActive(null, true);
                    document.activeElement.blur();
                }
            }
        },
    };
})
    .do(utils_1.restyle('active', 'focused', 'invalid', function (active, focused, invalid, style) {
    var _a;
    var input = style.base.mergeKeys({
        input: true,
        hover: active,
        focus: focused,
        invalid: invalid,
    });
    return __assign({}, style, { input: input, div: (_a = input
            .scale({ margin: { padding: -1 } })).filter.apply(_a, __spread(['margin'], (active && !focused ? ['background'] : []))).merge({ position: 'relative', zIndex: focused ? 30 : 6 }), text: input
            .filter.apply(input, __spread(elmnt_1.css.groups.text, ['padding'], (active && !focused ? [] : ['background']))).scale({ minWidth: { fontSize: 2 } })
            .merge({ display: 'inline-block', verticalAlign: 'top' }), arrow: input
            .mergeKeys('connect')
            .scale({
            fontSize: 0.9,
            paddingTop: 0,
            paddingBottom: 0,
            minWidth: { fontSize: 2 },
        })
            .filter('fontSize', 'color', 'padding', 'minWidth') });
}))
    .do(function (props$, _) { return ({
    setClickElem: utils_1.clickOutsideRef(function () { return props$().onClickOutside(); }),
}); })
    .yield(function (_a) {
    var live = _a.live, start = _a.start, end = _a.end, onChangeStart = _a.onChangeStart, onChangeEnd = _a.onChangeEnd, focused = _a.focused, onMouseMove = _a.onMouseMove, onMouseLeave = _a.onMouseLeave, onClick = _a.onClick, setClickElem = _a.setClickElem, onKeyDown = _a.onKeyDown, setInputElem1 = _a.setInputElem1, setInputElem2 = _a.setInputElem2, style = _a.style;
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { onKeyDown: onKeyDown, style: style.div, ref: setClickElem },
            React.createElement(elmnt_1.Input, { type: "int", value: start, onChange: onChangeStart, style: style.text, ref: setInputElem1 }),
            React.createElement(elmnt_1.Icon, __assign({}, icons_1.default.down, { style: style.arrow })),
            React.createElement(elmnt_1.Input, { type: "int", value: end, onChange: onChangeEnd, style: style.text, ref: setInputElem2 })),
        live &&
            !focused && (React.createElement("div", { onMouseMove: onMouseMove, onMouseLeave: onMouseLeave, onClick: onClick, style: {
                position: 'absolute',
                top: -style.base.borderTopWidth * 2 - style.icon.radius,
                right: -style.base.borderRightWidth,
                bottom: -style.base.borderBottomWidth * 2,
                left: -style.base.borderLeftWidth,
                zIndex: 6,
                cursor: 'pointer',
            } }))));
});
