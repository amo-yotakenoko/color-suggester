// colorHighlight();
var HviewCanvas = document.getElementById("Hview");
var VCviewCanvas = document.getElementById("VCview");
var prevcolorcode;
var prevcameraangle;
// var isHighLight = false;
function colorHighlight(colorcode, enforceUpdate) {
    // requestAnimationFrame(colorHighlight);
    if (enforceUpdate === void 0) { enforceUpdate = false; }
    colorcode = rgbToColorcode(colorcode);
    // console.log("updatecolorcode", colorcode)
    if (!enforceUpdate && prevcolorcode == colorcode && Math.abs(prevcameraangle - munsellCamera.position.x) < 0.1) {
        return;
    }
    // console.log("更新")
    prevcolorcode = colorcode;
    prevcameraangle = munsellCamera.position.x;
    // console.log(colorHighlight);
    // if (!isMouseDown) {
    //     return;
    // }
    // console.log(selectiongItem.dataset.colorcode, ",", selectingColorcode);
    // console.log(colorcode);
    // console.log(colorcode);
    if (colorcode == null || isgray(colorcode)) {
        console.log("colorcodeがない");
        HilightReset();
        return;
    }
    var enablecount = 0;
    var nearobj = colorConvart(colorcode);
    var Hview = HviewCanvas.getContext("2d");
    var VCview = VCviewCanvas.getContext("2d");
    Hview.clearRect(0, 0, HviewCanvas.width, HviewCanvas.height);
    VCview.clearRect(0, 0, VCviewCanvas.width, VCviewCanvas.height);
    // console.log();
    // //nearobj:[sphere,colorcode,[H,V,C]]
    // colorObjects.indexOf(nearobj)
    // array.splice(index, 1);
    // console.log(nearobj[0])
    // console.log(colorObjects)
    // console.log(colorObjects.filter(a => a[2] != nearobj[2]).concat(nearobj));
    // console.log(colorObjects.filter(a => a !== nearobj[0]).concat(nearobj[0]).length);
    var angleoffset = Math.atan2(munsellCamera.position.x, munsellCamera.position.z);
    // console.log(angleoffset)
    for (var _i = 0, _a = colorObjects.filter(function (a) { return a[2] != nearobj[2]; }).concat([nearobj]); _i < _a.length; _i++) {
        var obj = _a[_i];
        // if (obj == nearobj) continue;
        var sphere = obj[0];
        // if (obj == nearobj) {
        //     sphere.scale.set(2, 2, 2);
        // } else {
        //     sphere.scale.set(1, 1, 1);
        // }
        var isHighLight = false;
        if (obj[2][0] % 40 == nearobj[2][0] % 40 || (obj[2][0] + 20) % 40 == nearobj[2][0] % 40 || nearobj[2][2] == 0) {
            VCview.fillStyle = obj[1];
            //格子
            var x = (obj[2][2] - 1) * 4.5;
            var isHosyoku = (obj[2][0] + 20) % 40 == nearobj[2][0] % 40;
            if (isHosyoku)
                x *= -1;
            // x += isHosyoku ? -5 : 5;
            x += VCviewCanvas.width / 2;
            var y = -obj[2][1] * 20 + VCviewCanvas.height;
            VCview.beginPath();
            //    VCview.moveTo();
            var size = obj != nearobj ? 10 : 15;
            VCview.moveTo(x - size, y - size);
            VCview.lineTo(x + size, y - size);
            VCview.lineTo(x + size, y + size);
            VCview.lineTo(x - size, y + size);
            VCview.closePath();
            VCview.fill();
            if (obj == nearobj) {
                VCview.lineWidth = 1;
                VCview.strokeStyle = 'black';
                VCview.stroke();
            }
            isHighLight = true;
            // drawCircleFill(VCview,x,y, 10);
        }
        if (obj[2][1] == nearobj[2][1]) {
            Hview.fillStyle = obj[1];
            //[sphere,colorcode,[H,V,C]]
            var H = obj[2][0];
            var V = obj[2][1];
            var C = obj[2][2];
            // var HVC = obj[2];
            //   var  r=Math.sqrt(sphere.position.x**2+sphere.position.z**2)
            //円
            // var theta1=
            //   let x=Math.sin(rad) * C*5 + HviewCanvas.width / 2;
            // let y = Math.cos(rad) * C*5 + HviewCanvas.height / 2;
            // console.log(angleoffset)
            var rad = ((H / 40.0)) * 2 * Math.PI + angleoffset;
            //    VCview.moveTo();
            var radwidth = (obj != nearobj ? 5 : 7.5) / 360 * 2 * Math.PI;
            var rwidth = (obj != nearobj ? 2.2 : 5);
            Hview.beginPath();
            Hview.moveTo(Math.cos(rad - radwidth) * C * 5 + HviewCanvas.width / 2, Math.sin(rad - radwidth) * C * 5 + HviewCanvas.height / 2);
            Hview.lineTo(Math.cos(rad + radwidth) * C * 5 + HviewCanvas.width / 2, Math.sin(rad + radwidth) * C * 5 + HviewCanvas.height / 2);
            Hview.lineTo(Math.cos(rad + radwidth) * (C + rwidth) * 5 + HviewCanvas.width / 2, Math.sin(rad + radwidth) * (C + rwidth) * 5 + HviewCanvas.height / 2);
            Hview.lineTo(Math.cos(rad - radwidth) * (C + rwidth) * 5 + HviewCanvas.width / 2, Math.sin(rad - radwidth) * (C + rwidth) * 5 + HviewCanvas.height / 2);
            Hview.closePath();
            Hview.fill();
            if (obj == nearobj) {
                Hview.lineWidth = 1;
                Hview.strokeStyle = 'black';
                Hview.stroke();
            }
            isHighLight = true;
            // VCview.moveTo(Math.sin(rad - radwidth) * C * 5 + HviewCanvas.width / 2, Math.cos(rad - radwidth) * C * 5 + HviewCanvas.height / 2);
            //   VCview.moveTo(Math.sin(rad+radwidth) * C * 5 + HviewCanvas.width / 2, Math.cos(rad+radwidth) * C * 5 + HviewCanvas.height / 2);
            //  VCview.moveTo(Math.sin(rad-radwidth) * C*5 + HviewCanvas.width / 2,Math.cos(rad-radwidth) * C*5 + HviewCanvas.height / 2);
            // var x = sphere.position.x * 3 + HviewCanvas.width / 2;
            // var y= sphere.position.z * 3 + HviewCanvas.height / 2
            // drawCircleFill(Math.sin(rad - radwidth) * (C) * 5 + HviewCanvas.width / 2, Math.cos(rad - radwidth) * (C+1) * 5 + HviewCanvas.height / 2, 1);
        }
        if (obj[2][0] % 40 == nearobj[2][0] % 40 && obj[2][1] == nearobj[2][1] && obj[2][2] == nearobj[2][2]) {
            console.log(obj[2][0], obj[2][1], obj[2][2]);
        }
        if (isHighLight) {
            sphere.material.transparent = false;
            sphere.material.opacity = 1;
            sphere.material.needsUpdate = true;
            enablecount += 1;
        }
        else {
            sphere.material.transparent = true;
            sphere.material.opacity = 0.05;
            sphere.material.needsUpdate = true;
        }
    }
    // console.log(colorList);
    // for (const btn in colorList.getElementsByTagName("button")) {
    //     console.log("btn", btn.style.backgroundColor)
    // }
    for (var i_1 = 0; i_1 < colorList.length; i_1++) {
        console.log(colorList[i_1]); // 各アイテムのテキストが表示されます
    }
    if (enablecount <= 0) {
        HilightReset();
    }
}
function isgray(colorcode) {
    // console.log("color", colorcode)
    return colorcode.substring(1, 3) === colorcode.substring(3, 5) && colorcode.substring(3, 5) === colorcode.substring(5, 7);
}
function HilightReset() {
    for (var _i = 0, colorObjects_1 = colorObjects; _i < colorObjects_1.length; _i++) {
        var obj = colorObjects_1[_i];
        obj[0].material.transparent = false;
        obj[0].material.opacity = 1;
        obj[0].material.needsUpdate = true;
    }
    // console.log("HilightReset()")
}
function drawCircleFill(context, centerX, centerY, radius) {
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
}
function colorConvart(selectingColorcode) {
    // console.log("colorConvart")
    if (!selectingColorcode)
        return null;
    var _a = hexToRgb(selectingColorcode), r = _a[0], g = _a[1], b = _a[2];
    // console.log(r);
    var nearobj;
    var nearDistance = Infinity;
    // console.log(colorObjects)
    if (colorObjects) {
        for (var _i = 0, colorObjects_2 = colorObjects; _i < colorObjects_2.length; _i++) {
            var obj = colorObjects_2[_i];
            // 各要素に対する処理をここに記述
            var _b = hexToRgb(obj[1]), objr = _b[0], objg = _b[1], objb = _b[2];
            // console.log(objr);
            var distance = Math.sqrt(Math.pow((r - objr), 2) + Math.pow((g - objg), 2) + Math.pow((b - objb), 2));
            if (nearDistance > distance) {
                nearDistance = distance;
                nearobj = obj;
            }
        }
    }
    return nearobj;
}
// colorConvart();
function hexToRgb(hex) {
    // #を削除
    // if (typeof hex !== 'string') {
    //     console.log(hex)
    //     console.log("えらー￥")
    //     return [0, 0, 0];
    // }
    hex = hex.replace(/^#/, '');
    // 16進数を10進数に変換
    var bigint = parseInt(hex, 16);
    // R、G、Bに分割
    var red = (bigint >> 16) & 255;
    var green = (bigint >> 8) & 255;
    var blue = bigint & 255;
    // 入力が正しい16進数形式でない場合は黒を返す
    if (isNaN(red) || isNaN(green) || isNaN(blue)) {
        return [0, 0, 0];
    }
    return [red, green, blue];
}
// function calculateDistance(vector1, vector2) {
//     return Math.sqrt(vector1.reduce((acc, val, i) => acc + (val - vector2[i]) ** 2, 0));
// }
