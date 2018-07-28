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
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var refluent_1 = require("refluent");
var common_1 = require("common");
var elmnt_1 = require("elmnt");
var deepEqual = require("deep-equal");
var utils_1 = require("../../../utils");
var d3_1 = require("./d3");
var dataToRows_1 = require("./dataToRows");
var isolate_1 = require("./isolate");
exports.default = refluent_1.default
    .do(utils_1.restyle(function (style) {
    var _a, _b;
    var base = (_a = style
        .mergeKeys('data')
        .defaults({ fontStyle: 'normal', fontWeight: 'normal' })
        .scale({
        paddingTop: { paddingTop: 1, fontSize: 0.5, lineHeight: -0.5 },
        paddingBottom: {
            paddingBottom: 1,
            fontSize: 0.5,
            lineHeight: -0.5,
        },
    })).filter.apply(_a, __spread(elmnt_1.css.groups.text, ['padding',
        'border',
        'background',
        'maxWidth'])).merge({
        position: 'relative',
        verticalAlign: 'top',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
    });
    return {
        base: base,
        null: base.mergeKeys('null'),
        empty: base.mergeKeys('empty'),
        fileLink: (_b = base.mergeKeys('fileLink')).filter.apply(_b, __spread(elmnt_1.css.groups.text)),
        changed: base.mergeKeys('changed'),
        input: style
            .mergeKeys('data', 'input')
            .scale({ maxWidth: { maxWidth: 1, borderLeftWidth: 1 } })
            .merge({ zIndex: 200 }),
    };
}))
    .do('context', 'query', 'data', function (context, query, data) { return ({
    dataRows: dataToRows_1.default(context, query, data),
}); })
    .do('context', function (context, push) {
    return context.store.listen('editing', function (editing) {
        if (editing === void 0) { editing = {}; }
        return push({ isEditing: !!editing.key });
    });
})
    .do('context', function (context, push) {
    return context.store.listen('unchanged', function (unchanged) {
        if (unchanged === void 0) { unchanged = {}; }
        return push({ unchanged: unchanged });
    });
})
    .yield(isolate_1.default(function (elem, props$) {
    var Input = props$().context.input;
    var startEditing = function (key, value) {
        props$().context.store.set('editing', { key: key, value: value });
        props$().context.store.update('unchanged', function (unchanged) {
            if (unchanged === void 0) { unchanged = {}; }
            var _a;
            return (__assign({}, unchanged, (unchanged[key] === undefined ? (_a = {}, _a[key] = value, _a) : {})));
        });
    };
    var stopEditing = function (invalid) {
        var _a = props$().context.store.get('editing'), key = _a.key, value = _a.value;
        props$().context.store.set('editing', {});
        props$().context.store.update('unchanged', function (_a) {
            var _b = key, v = _a[_b], unchanged = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
            var _c;
            if (deepEqual(v, value, { strict: true }) || invalid) {
                common_1.root.rgo.set({ key: key.split('.'), value: undefined });
                return unchanged;
            }
            common_1.root.rgo.set({ key: key.split('.'), value: value });
            return __assign({}, unchanged, (_c = {}, _c[key] = v, _c));
        });
    };
    var inputRef = null;
    var unlisten = props$().context.store.listen('editing', function (editing) {
        if (editing === void 0) { editing = {}; }
        if (editing.key) {
            var splitKey = editing.key.split('.');
            var elems = elem.querySelectorAll("[data-key='" + editing.key + "']");
            for (var i = 0; i < elems.length; i++) {
                if (elems[i] !== inputRef) {
                    elems[i].textContent = props$().context.config.printValue(editing.value, common_1.root.rgo.schema[splitKey[0]][splitKey[2]]);
                }
            }
        }
    });
    props$('context', 'dataRows', 'style', 'isEditing', 'unchanged', function (context, dataRows, style, _, unchanged) {
        var editing = context.store.get('editing') || {};
        var rows = d3_1.default
            .select(elem)
            .selectAll('tr')
            .data(__spread(dataRows));
        rows
            .exit()
            .selectAll('td')
            .each(function () {
            ReactDOM.unmountComponentAtNode(this);
        });
        rows.exit().remove();
        var allRows = rows
            .enter()
            .append('tr')
            .merge(rows);
        var cells = allRows.selectAll('td').data(function (d) { return d; });
        cells
            .exit()
            .each(function () {
            ReactDOM.unmountComponentAtNode(this);
        })
            .remove();
        var allCells = cells
            .enter()
            .append('td')
            .merge(cells)
            .datum(function (d) { return (__assign({}, d, { style: inputRef !== _this && Object.keys(unchanged).includes(d.key)
                ? 'changed'
                : d.empty
                    ? 'empty'
                    : d.field.startsWith('#') || d.value === null
                        ? 'null'
                        : 'base' })); })
            .style(function (d) { return style[d.style]; })
            .style(function (d) { return ({
            borderTopWidth: (!d.first ? 1 : 0) * style.base.borderTopWidth,
            borderBottomWidth: 0,
            borderLeftWidth: ((!d.firstCol && (d.field === '#1' ? 2 : 1)) || 0) *
                style.base.borderLeftWidth,
            borderRightWidth: ((!d.lastCol && d.field === '#2' && 1) || 0) *
                style.base.borderRightWidth,
        }); })
            .attr('rowspan', function (d) { return d.span; })
            .attr('data-key', function (d) { return d.key; });
        allCells
            .filter(function (_a) {
            var key = _a.key;
            return key;
        })
            .style({ cursor: 'pointer' })
            .on('mouseenter', function (d) {
            var s = style[d.style];
            this.style.background =
                (s.hover && s.hover.background) || s.background;
        })
            .on('mouseleave', function (d) {
            this.style.background = style[d.style].background;
        })
            .on('dblclick', function (_a) {
            var key = _a.key, value = _a.value;
            startEditing(key, value);
            inputRef = this;
        })
            .each(function (_a) {
            var _this = this;
            var type = _a.type, field = _a.field, key = _a.key, text = _a.text;
            if (inputRef === this) {
                this.style.padding = null;
                ReactDOM.render(React.createElement(Input, { context: context, dataKey: key.split('.'), onBlur: function (invalid) {
                        stopEditing(invalid);
                        if (inputRef === _this)
                            inputRef = null;
                    }, inputRef: function (elem) {
                        if (elem && inputRef === _this)
                            elem.focus();
                    }, style: style.input }), this);
            }
            else {
                ReactDOM.unmountComponentAtNode(this);
                if (editing.key === key) {
                    this.textContent = context.config.printValue(editing.value, common_1.root.rgo.schema[type][field]);
                }
                else {
                    this.textContent = text;
                }
            }
        });
        allCells
            .filter(function (_a) {
            var key = _a.key;
            return !key;
        })
            .style({ cursor: null })
            .on('mouseenter', null)
            .on('mouseleave', null)
            .on('dblclick', null)
            .each(function (_a) {
            var text = _a.text, link = _a.link;
            ReactDOM.unmountComponentAtNode(this);
            this.textContent = link ? '' : text;
            if (link) {
                var a = document.createElement('a');
                a.textContent = text;
                a.href = link;
                a.target = '_blank';
                d3_1.applyStyle(a, style.fileLink);
                this.appendChild(a);
            }
        });
        context.updateWidths();
    });
    return function () {
        unlisten();
        d3_1.default.select(elem)
            .selectAll('tr')
            .selectAll('td')
            .each(function () {
            ReactDOM.unmountComponentAtNode(this);
        });
    };
}, 'tbody'));
