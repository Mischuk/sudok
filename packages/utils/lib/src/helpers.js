"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformData = void 0;
var constants_1 = require("./constants");
var getValues = function (data) {
    return data.map(function (v) { return (v !== constants_1.DOT ? Number(v) : null); });
};
var getChunks = function (_a) {
    var value = _a.value, range = _a.range;
    return getValues(value.split("").slice(range[0], range[1]));
};
var getRow = function (_a) {
    var id = _a.id, puzzle = _a.puzzle, solution = _a.solution;
    var notes = [];
    return {
        id: id,
        cells: puzzle.map(function (cell, cellIndex) { return ({
            value: cell,
            answer: solution[cellIndex],
            notes: notes,
            error: false,
        }); }),
    };
};
var getMatrix = function (_a) {
    var puzzle = _a.puzzle, solution = _a.solution;
    var chunkSize = constants_1.MAX_NUM;
    var data = [];
    for (var i = 0; i < chunkSize * constants_1.MAX_NUM; i += chunkSize) {
        var range = [i, i + chunkSize];
        data.push({
            id: i,
            puzzle: getChunks({ value: puzzle, range: range }),
            solution: getChunks({ value: solution, range: range }),
        });
    }
    return data;
};
var transformData = function (data) { return getMatrix(data).map(getRow); };
exports.transformData = transformData;
