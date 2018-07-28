"use strict";
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
var utils_1 = require("../utils");
var Question = refluent_1.default
    .do(utils_1.restyle(function (style) {
    var _a;
    return (_a = style.mergeKeys('question')).filter.apply(_a, __spread(elmnt_1.css.groups.text));
}))
    .yield(elmnt_1.Txt);
var Prompt = refluent_1.default
    .do(utils_1.restyle(function (style) {
    var _a;
    return (_a = style.mergeKeys('prompt')).filter.apply(_a, __spread(elmnt_1.css.groups.text));
}))
    .yield(elmnt_1.Txt);
var Vertical = refluent_1.default
    .do(utils_1.restyle('view', 'small', function (view, small, style) {
    return style
        .scale({
        paddingTop: view
            ? 0
            : { paddingTop: small ? 0.4 : 1, borderTopWidth: 1 },
    })
        .filter('paddingTop')
        .merge({ spacing: 10 });
}))
    .do(function () { return ({ view: undefined, small: undefined }); })
    .yield(elmnt_1.Div);
exports.default = refluent_1.default.yield(utils_1.withWidth(600)).yield(function (_a) {
    var text = _a.text, prompt = _a.prompt, vertical = _a.vertical, view = _a.view, fields = _a.fields, style = _a.style, _b = _a.small, small = _b === void 0 ? false : _b, setWidthElem = _a.setWidthElem, children = _a.children;
    return text ? (React.createElement("div", { ref: setWidthElem }, vertical || small ? (React.createElement(elmnt_1.Div, { style: { spacing: 10 } },
        React.createElement(Question, { style: style },
            text,
            fields.some(function (f) { return !f.optional; }) && (React.createElement("span", { style: style.required }, "\u00A0*"))),
        prompt && React.createElement(Prompt, { style: style }, prompt),
        children)) : (React.createElement(elmnt_1.Div, { style: {
            layout: 'bar',
            width: '100%',
            verticalAlign: 'top',
            spacing: 30,
        } },
        React.createElement("div", { style: { width: 200 } },
            React.createElement(Vertical, { view: view, small: fields[0].type === 'boolean' ||
                    (fields[0].options && fields[0].style.layout !== 'modal'), style: style },
                React.createElement(Question, { style: style },
                    text,
                    fields.some(function (f) { return !f.optional; }) && (React.createElement("span", { style: style.required }, "\u00A0*"))),
                prompt && React.createElement(Prompt, { style: style }, prompt))),
        children)))) : (children);
});
