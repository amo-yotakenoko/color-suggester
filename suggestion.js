var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var suggestionProsessing = false;
function suggestionButton() {
    return __awaiter(this, void 0, void 0, function () {
        var suggestionElement, measreresults, count, beforemeasreresult, _a, _i, _b, colorObject, candidateHVC, candidateColor, measreresult, newDiv, i_1, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (suggestionProsessing) {
                        console.log("実行中！");
                        return [2 /*return*/];
                    }
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 9, 10, 11]);
                    suggestionProsessing = true;
                    suggestionElement = document.getElementById("suggestionElements");
                    changetab("suggestion");
                    document.querySelectorAll(".suggestElement").forEach(function (table) {
                        table.remove();
                    });
                    measreresults = [];
                    count = 0;
                    console.log(document.querySelectorAll('#colorButton').length);
                    if (!(document.querySelectorAll('#colorButton').length <= 1)) return [3 /*break*/, 2];
                    _a = 0;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, colorHarmonyCalculate()];
                case 3:
                    _a = _c.sent();
                    _c.label = 4;
                case 4:
                    beforemeasreresult = _a;
                    _i = 0, _b = shuffleArray(colorObjects);
                    _c.label = 5;
                case 5:
                    if (!(_i < _b.length)) return [3 /*break*/, 8];
                    colorObject = _b[_i];
                    count += 1;
                    // console.log(count / colorObjects.length * 100)
                    document.getElementById("suggestionProgress").innerText = "\u63D0\u6848" + Math.round(count / colorObjects.length * 100) + "%";
                    // const currentColorObject = colorObject;
                    // console.log("dis", suggestionElement.style.display)
                    if (document.getElementById("suggestion").style.display == "none") {
                        console.log("おわり");
                        return [3 /*break*/, 8];
                    }
                    candidateHVC = { H: colorObject[2][0], V: colorObject[2][1], C: colorObject[2][1] };
                    candidateColor = colorObject[1];
                    return [4 /*yield*/, colorHarmonyCalculate([{ color: candidateColor, HVC: candidateHVC }])];
                case 6:
                    measreresult = _c.sent();
                    newDiv = document.createElement("div");
                    // 新しい div 要素に内容を追加
                    newDiv.innerHTML = "\n        <table class=\"suggestElement\">\n            <tr>\n                <td>\n                    <button type=\"button\" class=\"btn\" onclick=\"newsuggestedColor('" + candidateColor + "')\" style=\"background-color:" + candidateColor + ";\">\u3000\u3000</button>\n                </td>\n                <td>\n                    <div class=\"orderview display-6\">" + (measreresult > 0 ? '+' : '') + measreresult.toFixed(3) + "</div>\n                </td>\n            </tr>\n        </table>\n    ";
                    // 新しい div 要素を suggestionElement に追加
                    for (i_1 = 0; i_1 < measreresults.length; i_1++) {
                        if (measreresults[i_1] < measreresult) {
                            measreresults.splice(i_1, 0, measreresult);
                            // 新しい要素を作成
                            // 新しい要素の内容や属性の設定
                            // 親要素のN番目に要素を挿入
                            suggestionElement.insertBefore(newDiv, suggestionElement.children[i_1]);
                            break; // 挿入後にループを終了
                        }
                    }
                    // 値が既存のすべての値よりも大きい場合、配列の末尾に追加する必要があります
                    if (measreresults.indexOf(measreresult) === -1) {
                        measreresults.push(measreresult);
                        // 新しい要素を作成
                        // 新しい要素の内容や属性の設定
                        // 親要素の末尾に要素を挿入
                        suggestionElement.appendChild(newDiv);
                    }
                    _c.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 5];
                case 8: return [3 /*break*/, 11];
                case 9:
                    error_1 = _c.sent();
                    // 何らかのエラーが発生した場合の処理
                    console.error("エラーが発生しました:", error_1);
                    return [3 /*break*/, 11];
                case 10:
                    // このブロックのコードは、try ブロックが正常に終了またはエラーで終了した場合に実行されます
                    // console.log("finally ブロックが実行されました。");
                    suggestionProsessing = false;
                    return [7 /*endfinally*/];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function shuffleArray(array) {
    var cloneArray = __spreadArrays(array);
    for (var i_2 = cloneArray.length - 1; i_2 >= 0; i_2--) {
        var rand = Math.floor(Math.random() * (i_2 + 1));
        // 配列の要素の順番を入れ替える
        var tmpStorage = cloneArray[i_2];
        cloneArray[i_2] = cloneArray[rand];
        cloneArray[rand] = tmpStorage;
    }
    return cloneArray;
}
function newsuggestedColor(newcolorcode) {
    console.log("newcolorcode", newcolorcode);
    inputingColorItem = colorItemAdd();
    canvasUpdate();
    colorSet(inputingColorItem, newcolorcode);
}
