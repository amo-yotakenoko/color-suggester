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
function colorItemAdd() {
    var colorList = document.getElementById("colorList");
    // console.log(colorList);
    var btn = document.createElement("button");
    // li.className = "nav-item";
    // var item = document.createElement("a");
    btn.className = "btn btn-primary";
    btn.id = "colorButton";
    // btn.dataset.colorcode = "#000000";
    btn.textContent = "a";
    // item.style.backgroundColor = colorcode;
    // btn.appendChild(item);
    btn.classList.add("active");
    selectiongItem = btn;
    colorList.insertBefore(btn, colorList.firstChild);
    colortab(true);
    console.log("ボタン追加");
    btn.click();
    material = new THREE.MeshBasicMaterial({ color: "#000000" });
    var sphere = new THREE.Mesh(new THREE.SphereGeometry(3, 4, 1), material);
    sphere.position.set(0, 0, 0);
    // const s = 2; // 新しいサイズを設定
    // sphere.scale.set(s, s, s);
    scene.add(sphere);
    console.log(sphere);
    btn.dataset.anchorUuid = sphere.uuid;
    // anchors.add([btn,sphere])
    btn.addEventListener("click", function () {
        // console.log(btn)
        colortab(true);
        selectiongItem = btn;
        // console.log(btn.dataset.colorcode);
        selectingColorcode = btn.style.backgroundColor;
        //TODO、ここ改善点
        // console.log("selectingColorcode2",rgbToColorcode(selectingColorcode))
        // colorHighlight(selectingColorcode)
        colorHighlight(rgbToColorcode(selectingColorcode), true);
    });
    //  li.insertBefore(item, li.firstChild);
    return btn;
}
var selectiongItem;
var selectiongcolor;
var hvcView = document.getElementById('HVCview');
function colorSet(item, colorcode) {
    return __awaiter(this, void 0, void 0, function () {
        var obj, HVC, _a, H, V, C;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    item.style.backgroundColor = colorcode; // 任意の色に変更
                    item.style.borderColor = colorcode; // ボーダーカラーも指定すると良い
                    item.style.color = colorcode;
                    item.dataset.colorcode = colorcode;
                    obj = scene.getObjectByProperty('uuid', item.dataset.anchorUuid);
                    // console.log("colorset", item.dataset, obj)
                    obj.material.color.set(new THREE.Color(colorcode));
                    return [4 /*yield*/, RGBtoHVCxyz(hexToRgb(colorcode))
                        // console.log("結果", HVC)
                    ];
                case 1:
                    HVC = _b.sent();
                    // console.log("結果", HVC)
                    obj.position.z = HVC[0] * 1.5;
                    obj.position.x = HVC[1] * 1.5;
                    obj.position.y = HVC[2] * 5 - 20;
                    _a = XYZtoHVC(obj.position), H = _a[0], V = _a[1], C = _a[2];
                    // console.log(XYZtoHVC(obj.position));
                    hvcView.innerHTML = '色彩H: ' + H.toFixed(2) + '<br>明度V: ' + V.toFixed(2) + '<br>彩度C: ' + C.toFixed(2);
                    ;
                    // hvcView.style.color = textcolorIswhite ? "white" : "black";
                    // console.log("pos", obj.position)
                    // console.log("pos,", obj.position)
                    colorHighlight(rgbToColorcode(colorcode), true);
                    return [2 /*return*/];
            }
        });
    });
}
// https://rfs.jp/sb/javascript/js-lab/zeropadding.html
function XYZtoHVC(pos) {
    // console.log(pos.x);
    var H = (Math.atan2(pos.z, pos.x) + 2 * Math.PI) / (2 * Math.PI) * 40.0 % 40;
    var V = (pos.y + 20) / 5;
    var C = Math.sqrt(Math.pow(pos.x, 2) + Math.pow(pos.z, 2)) / 1.5;
    return [H, V, C];
}
var colorList = document.getElementById("colorList");
var SelectingColorText = document.getElementById("colorcode");
var btns = document.getElementsByClassName('btn');
// var btns = document.getElementsByClassName('btn');
SelectingColorText.addEventListener('input', function (event) {
    console.log("input event" + SelectingColorText.value);
    colorSet(selectiongItem, SelectingColorText.value);
    selectingColorcode = SelectingColorText.value;
    // selectiongItem.style.backgroundColor = SelectingColorText.value;
});
// changeイベント
SelectingColorText.addEventListener('change', function (event) {
    console.log("change event");
});
var textcolorIswhite;
colorUpdate();
function colorUpdate() {
    requestAnimationFrame(colorUpdate);
    // selectingColorcode
    // console.log(selectiongItem)
    // clickイベント
    // SelectingColorText.addEventListener('click', function (event) {
    //     console.log("click event");
    // });
    if (selectiongItem) {
        selectiongcolor = selectiongItem.style.backgroundColor;
        document.body.style.backgroundColor = selectiongcolor;
        var regex = /rgb\((\d+), (\d+), (\d+)\)/;
        var rgb = selectiongcolor.match(regex);
        // console.log((parseInt(rgb[1], 10) + parseInt(rgb[2], 10) + parseInt(rgb[3], 10)));
        // var c = (parseInt(rgb[1], 10) + parseInt(rgb[2], 10) + parseInt(rgb[3], 10)) > 255 * 3 / 2 ? '#000000' : '#FFFFFF';
        // deleteButton.style.color = c;
        // // deleteButton.style.outlineColor = c;
        // deleteButton.style.backgroundColor = c;
        // deleteButton.style.outline = "10px solid #000";
        textcolorIswhite = (parseInt(rgb[1], 10) + parseInt(rgb[2], 10) + parseInt(rgb[3], 10)) < 255 * 3 / 2;
        btns.forEach(function (b) {
            b.className = textcolorIswhite ? 'btn btn-outline-light' : 'btn btn-outline-dark';
        });
        document.getElementsByClassName('autocolor').forEach(function (b) {
            b.style.color = textcolorIswhite ? '#FFFFFF' : '#000000';
        });
    }
    ;
    // console.log("aa" + hexToRgb(selectiongcolor) + deleteButton.style.outlineColor);
    if (document.activeElement !== SelectingColorText) {
        // console.log("selectingColorcode" + selectingColorcode)
        SelectingColorText.value = rgbToColorcode(selectingColorcode);
    }
}
// console.log(selectiongcolor)
// SelectingColorText.style.color = "aa";
// SelectingColorText.style.color = (rgb[0] + rgb[1] + rgb[2]) > 255 * 3 / 2 ? '#000000' : '#FFFFFF';
// console.log((rgb[0] + rgb[1] + rgb[2]) < 255 * 3 / 2 ? '#000000' : '#FFFFFF')
// console.log(selectingColorcode)
// console.log("selectingColorcodelast", selectingColorcode)
// colorHighlight(selectingColorcode);
//     // console.log(selectingColorcode)
//     //     }
// }
function rgbToColorcode(rgb) {
    // console.log(rgb)
    if (!rgb) {
        console.log("rgb が undefined または null");
        return rgb; // rgb が undefined または null の場合、そのまま返す
    }
    var match = rgb.match(/^rgb\((\d+), (\d+), (\d+)\)$/);
    if (match) {
        var r = parseInt(match[1], 10);
        var g = parseInt(match[2], 10);
        var b = parseInt(match[3], 10);
        var hexR = r.toString(16).padStart(2, '0');
        var hexG = g.toString(16).padStart(2, '0');
        var hexB = b.toString(16).padStart(2, '0');
        return "#" + hexR + hexG + hexB;
    }
    else {
        return rgb;
    }
}
function colorDelete() {
    console.log("delete");
    var obj = scene.getObjectByProperty('uuid', selectiongItem.dataset.anchorUuid);
    obj.geometry.dispose();
    obj.material.dispose();
    scene.remove(obj);
    // メモリリークを防ぐために GC（ガベージコレクション）を促進
    obj.geometry = null;
    obj.material = null;
    var parent = selectiongItem.parentNode;
    parent.removeChild(selectiongItem);
    parent.firstElementChild.click();
    // selectiongItem = null;
}
