"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
var common_1 = require("common");
var keys_to_object_1 = require("keys-to-object");
var mapArray = function (v, map) {
    return Array.isArray(v) ? v.map(map) : map(v);
};
var isObject = function (v) {
    return Object.prototype.toString.call(v) === '[object Object]';
};
var merge = function (target, source, depth) {
    if (depth === void 0) { depth = -1; }
    var result = {};
    if (isObject(target)) {
        Object.keys(target).forEach(function (k) { return (result[k] = clone(target[k])); });
    }
    Object.keys(source).forEach(function (k) {
        if (!isObject(source[k]) || !target[k] || depth === 0) {
            result[k] = clone(source[k]);
        }
        else {
            result[k] = merge(target[k], source[k], depth - 1);
        }
    });
    return result;
};
var clone = function (obj, depth) {
    if (depth === void 0) { depth = -1; }
    return isObject(obj) ? merge({}, obj, depth) : obj;
};
exports.getFieldKey = function (objects, key) {
    var _a = __read(key.split('.'), 2), obj = _a[0], f = _a[1];
    return [objects[obj].type, objects[obj].id, f];
};
exports.default = (function (blockProps, configObjects, blocks, stores) {
    if (configObjects === void 0) { configObjects = {}; }
    return __awaiter(_this, void 0, void 0, function () {
        var _a, objectKeys, response, objects, getInitialValue, allFields, mappedBlocks;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    objectKeys = Object.keys(configObjects);
                    return [4 /*yield*/, (_a = common_1.root.rgo).query.apply(_a, __spread(objectKeys.filter(function (obj) { return configObjects[obj].filter; }).map(function (obj) { return ({
                            name: configObjects[obj].type,
                            alias: obj,
                            filter: configObjects[obj].filter,
                            end: 1,
                            fields: ['id'],
                        }); })))];
                case 1:
                    response = _b.sent();
                    objects = keys_to_object_1.default(objectKeys, function (obj) { return (__assign({}, configObjects[obj], { id: configObjects[obj].id ||
                            (response[obj] && response[obj][0] && response[obj][0].id) ||
                            common_1.root.rgo.create(configObjects[obj].type) })); });
                    getInitialValue = function (_a, value) {
                        var _b = __read(_a, 3), type = _b[0], _ = _b[1], f = _b[2];
                        return common_1.root.rgo.schema[type][f].type
                            ? mapArray(value, function (v) { return (objects[v] ? objects[v].id : v); })
                            : value;
                    };
                    allFields = [];
                    mappedBlocks = blocks.map(function (blockSet) {
                        return blockSet.map(function (_a) {
                            var fields = _a.fields, block = __rest(_a, ["fields"]);
                            var config = { block: {}, field: {} };
                            Object.keys(block).forEach(function (k) { return (config[blockProps.includes(k) ? 'block' : 'field'][k] = block[k]); });
                            var blockFields = (fields
                                ? fields.map(function (f) { return merge(f, config.field); })
                                : config.field.field || config.field.name
                                    ? [config.field]
                                    : []).reduce(function (res, _a) {
                                var field = _a.field, name = _a.name, initial = _a.initial, other = __rest(_a, ["field", "name", "initial"]);
                                var key = field && exports.getFieldKey(objects, field);
                                var _b = field
                                    ? common_1.root.rgo.schema[key[0]][key[2]]
                                    : {}, _c = _b.meta, meta = _c === void 0 ? {} : _c, schema = __rest(_b, ["meta"]);
                                if (field) {
                                    ['gt', 'lt'].filter(function (k) { return other[k]; }).forEach(function (k) {
                                        other[k] = field.split('.')[0] + "." + other[k];
                                    });
                                }
                                return __spread(res, [
                                    __assign({ key: {
                                            store: field ? 'rgo' : 'local',
                                            key: field ? key : name,
                                            name: field ? field : name,
                                        }, initial: field ? getInitialValue(key, initial) : initial }, (field ? __assign({}, schema, meta) : {}), other)
                                ], ['gt', 'lt'].filter(function (k) { return other[k]; }).map(function (k) { return ({
                                    key: {
                                        store: 'rgo',
                                        key: other[k].includes('.')
                                            ? exports.getFieldKey(objects, other[k])
                                            : other[k],
                                        name: other[k],
                                    },
                                }); }));
                            }, []);
                            allFields.push.apply(allFields, __spread(blockFields));
                            return __assign({}, config.block, { fields: blockFields });
                        });
                    });
                    objectKeys.forEach(function (obj) {
                        Object.keys(objects[obj].initial || {}).forEach(function (k) {
                            var key = [objects[obj].type, objects[obj].id, k];
                            var initial = getInitialValue(key, objects[obj].initial[k]);
                            var field = allFields.find(function (f) { return f.key.name === obj + "." + k; });
                            if (field) {
                                field.initial = initial;
                            }
                            else {
                                allFields.push({
                                    key: { store: 'rgo', key: key, name: obj + "." + k },
                                    initial: getInitialValue(key, objects[obj].initial[k]),
                                    optional: true,
                                });
                            }
                        });
                    });
                    ['rgo', 'local'].forEach(function (store) {
                        return stores[store].set(allFields
                            .filter(function (f) { return f.key.store === store && f.initial !== undefined; })
                            .map(function (f) { return ({ key: f.key.key, value: f.initial }); }));
                    });
                    return [2 /*return*/, { objects: objects, blocks: mappedBlocks, fields: allFields }];
            }
        });
    });
});
