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
var common_1 = require("common");
exports.default = (function () {
    var state = {};
    var listeners = [];
    return {
        rgo: {
            get: function (keys, emit) {
                var _a;
                var queries = {};
                keys.forEach(function (_a) {
                    var _b = __read(_a, 3), type = _b[0], id = _b[1], field = _b[2];
                    var key = type + "." + id;
                    queries[key] = queries[key] || {};
                    queries[key][field] = true;
                });
                var queryKeys = Object.keys(queries);
                return (_a = common_1.root.rgo).query.apply(_a, __spread(queryKeys.map(function (key, i) { return ({
                    name: key.split('.')[0],
                    alias: "obj" + i,
                    filter: key.split('.')[1],
                    fields: Object.keys(queries[key]),
                }); }), [function (data) {
                        return emit(data &&
                            keys.map(function (_a) {
                                var _b = __read(_a, 3), type = _b[0], id = _b[1], field = _b[2];
                                var record = data["obj" + queryKeys.indexOf(type + "." + id)][0];
                                return common_1.noUndef(record && record[field]);
                            }));
                    }]));
            },
            set: function (values) {
                var _a;
                (_a = common_1.root.rgo).set.apply(_a, __spread(values));
            },
        },
        local: {
            get: function (keys, emit) {
                emit(keys.map(function (key) { return common_1.noUndef(state[key]); }));
                if (keys.length > 0) {
                    var listener_1 = { keys: keys, emit: emit };
                    listeners.push(listener_1);
                    return function () { return listeners.splice(listeners.indexOf(listener_1), 1); };
                }
                return function () { };
            },
            set: function (values) {
                values.forEach(function (_a) {
                    var key = _a.key, value = _a.value;
                    return (state[key] = value);
                });
                listeners.forEach(function (l) {
                    if (values.some(function (_a) {
                        var key = _a.key;
                        return l.keys.includes(key);
                    })) {
                        l.emit(l.keys.map(function (key) { return common_1.noUndef(state[key]); }));
                    }
                });
            },
        },
    };
});
