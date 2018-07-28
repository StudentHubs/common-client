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
var common_1 = require("common");
var ejson_1 = require("../ejson");
function getData() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var propName = typeof args[0] === 'string' ? args[0] : 'data';
    var queries = typeof args[0] === 'string' ? args.slice(1) : args;
    return function (props$, push) {
        return props$(function (props) {
            return typeof queries[0] === 'function' && ejson_1.default.stringify(queries[0](props));
        }, function (jsonQueries, commit) {
            var _a;
            push({ data: null });
            if (commit) {
                return (_a = common_1.root.rgo).query.apply(_a, __spread((jsonQueries ? ejson_1.default.parse(jsonQueries) : queries), [function (data) {
                        var _a;
                        return push((_a = {}, _a[propName] = data && __assign({}, data), _a));
                    }]));
            }
        });
    };
}
exports.default = getData;
