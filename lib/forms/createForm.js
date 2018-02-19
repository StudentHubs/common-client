"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
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
var mishmash_1 = require("mishmash");
var createForm_1 = require("../generic/createForm");
var Field_1 = require("./Field");
var Question_1 = require("./Question");
var Connect = mishmash_1.map(mishmash_1.restyle([
    __spread(['filter'], elmnt_1.css.groups.text),
    ['merge', { textAlign: 'center', width: 30, margin: '0 -15px' }],
]))(elmnt_1.Txt);
var Column = mishmash_1.map(mishmash_1.restyle([['mergeKeys', 'column'], __spread(['filter'], elmnt_1.css.groups.text, ['padding'])]))(elmnt_1.Txt);
exports.default = (function (container, blockProps, blockHOC, fieldHOC, style, admin) {
    var Field = fieldHOC(Field_1.default);
    var RowField = mishmash_1.map(mishmash_1.restyle(['alt'], function (alt) { return [['mergeKeys', { alt: alt }]]; }), mishmash_1.omit('alt'))(Field);
    return createForm_1.default(container, __spread(blockProps, ['text', 'prompt', 'vertical', 'connect', 'columns', 'view']), mishmash_1.compose(blockHOC, mishmash_1.map(function (_a) {
        var fields = _a.fields, attempted = _a.attempted, props = __rest(_a, ["fields", "attempted"]);
        return (__assign({ fields: fields.map(function (_a) {
                var scalar = _a.scalar, isList = _a.isList, _ = _a.type, file = _a.file, invalid = _a.invalid, field = __rest(_a, ["scalar", "isList", "type", "file", "invalid"]);
                return (__assign({}, field, { type: "" + (file ? 'file' : scalar || 'string') + (isList && field.index === undefined ? 'list' : ''), invalid: invalid && (admin || attempted), style: __assign({}, style, field.style), view: props.view, admin: admin }));
            }) }, props, (admin ? { prompt: undefined, vertical: false } : {})));
    }), mishmash_1.render(function (_a) {
        var inner = _a.inner, props = __rest(_a, ["inner"]);
        return (React.createElement(Question_1.default, __assign({}, props, { style: style }), inner()));
    }), mishmash_1.render(function (_a) {
        var fields = _a.fields, connect = _a.connect, columns = _a.columns;
        return fields[0].style.layout === 'bar' ? (React.createElement("div", null,
            React.createElement(elmnt_1.Div, { style: { layout: 'bar', width: '100%' } },
                React.createElement("div", { style: { width: '50%', paddingRight: connect ? 20 : 5 } },
                    React.createElement(Field, __assign({}, fields[0]))),
                connect && (React.createElement(Connect, { style: fields[0].style }, connect)),
                React.createElement("div", { style: { width: '50%', paddingLeft: connect ? 20 : 5 } },
                    React.createElement(Field, __assign({}, fields[1])))))) : fields[0].style.layout === 'table' ? (React.createElement("table", { style: { width: '100%' } },
            React.createElement("tbody", null,
                columns && (React.createElement("tr", null,
                    React.createElement("td", null),
                    columns.map(function (c) { return (React.createElement("td", { style: { verticalAlign: 'middle' }, key: c },
                        React.createElement(Column, { style: fields[0].style }, c))); }))),
                fields.map(function (field, i) { return (React.createElement(RowField, __assign({}, field, { alt: i % 2 === 0 }, (columns
                    ? { labels: field.options.map(function () { return ''; }) }
                    : {}), { key: i }))); })))) : (React.createElement(elmnt_1.Div, { style: { spacing: 10 } }, fields.map(function (field, i) { return React.createElement(Field, __assign({}, field, { key: i })); })));
    }))(Field));
});