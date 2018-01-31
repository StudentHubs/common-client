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
var recompose_1 = require("recompose");
var react_router_dom_1 = require("react-router-dom");
var elmnt_1 = require("elmnt");
var mishmash_1 = require("mishmash");
exports.default = recompose_1.compose(mishmash_1.withHover, mishmash_1.mapStyle(['isHovered'], function (isHovered) { return [['mergeKeys', { hover: isHovered }]]; }), mishmash_1.mapStyle({
    cell: [
        __spread(['filter'], mishmash_1.cssGroups.box, mishmash_1.cssGroups.other),
        ['expandFor', 'paddingLeft'],
    ],
    cellAlt: [
        ['mergeKeys', 'alt'],
        __spread(['filter'], mishmash_1.cssGroups.box, mishmash_1.cssGroups.other),
        ['expandFor', 'paddingLeft'],
    ],
    text: [__spread(['filter'], mishmash_1.cssGroups.text)],
    index: [['mergeKeys', 'index'], __spread(['filter'], mishmash_1.cssGroups.text)],
}))(function (_a) {
    var path = _a.path, _b = __read(_a.values), url = _b[0], values = _b.slice(1), index = _a.index, hoverProps = _a.hoverProps, style = _a.style;
    return (React.createElement("tr", __assign({}, hoverProps, { style: { cursor: 'pointer' } }), __spread(["" + (index + 1)], values).map(function (v, j) { return (React.createElement("td", { style: __assign({}, (index % 2 === 0 ? style.cell : style.cellAlt), (j !== 0
            ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
            : {}), (j !== values.length
            ? { borderTopRightRadius: 0, borderBottomRightRadius: 0 }
            : { paddingRight: style.cell.paddingLeft })), key: j },
        React.createElement(elmnt_1.Txt, { style: j ? style.text : style.index }, v),
        React.createElement(react_router_dom_1.Link, { to: path + "/" + url, style: {
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            } }))); })));
});