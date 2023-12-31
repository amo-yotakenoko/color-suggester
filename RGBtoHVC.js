function colorConvart() {
    // console.log("colorConvart")
    requestAnimationFrame(colorConvart);
    console.log(isMouseDown);
    if (!isMouseDown) {
        for (var _i = 0, colorObjects_1 = colorObjects; _i < colorObjects_1.length; _i++) {
            var obj = colorObjects_1[_i];
            obj[0].material.transparent = false;
            obj[0].material.needsUpdate = false;
        }
        return;
    }
    var _a = hexToRgb(selectingColorcode), r = _a[0], g = _a[1], b = _a[2];
    // console.log(r);
    var nearobj;
    var nearDistance = 1000000;
    for (var _b = 0, colorObjects_2 = colorObjects; _b < colorObjects_2.length; _b++) {
        var obj = colorObjects_2[_b];
        // 各要素に対する処理をここに記述
        var _c = hexToRgb(obj[1]), objr = _c[0], objg = _c[1], objb = _c[2];
        // console.log(objr);
        var distance = Math.sqrt(Math.pow((r - objr), 2) + Math.pow((g - objg), 2) + Math.pow((b - objb), 2));
        if (nearDistance > distance) {
            nearDistance = distance;
            nearobj = obj;
        }
    }
    console.log("near", nearobj);
    for (var _d = 0, colorObjects_3 = colorObjects; _d < colorObjects_3.length; _d++) {
        var obj = colorObjects_3[_d];
        if (obj == nearobj) {
            obj[0].scale.set(2, 2, 2);
        }
        else {
            obj[0].scale.set(1, 1, 1);
        }
        if (obj[2][0] == nearobj[2][0] || obj[2][1] == nearobj[2][1]) {
            obj[0].material.transparent = false;
            obj[0].material.needsUpdate = false;
        }
        else {
            obj[0].material.opacity = 0.05;
            obj[0].material.transparent = true;
            obj[0].material.needsUpdate = true;
        }
    }
}
colorConvart();
function hexToRgb(hex) {
    // #を削除
    hex = hex.replace(/^#/, '');
    // 16進数を10進数に変換
    var bigint = parseInt(hex, 16);
    // R、G、Bに分割
    var red = (bigint >> 16) & 255;
    var green = (bigint >> 8) & 255;
    var blue = bigint & 255;
    return [red, green, blue];
}
// function calculateDistance(vector1, vector2) {
//     return Math.sqrt(vector1.reduce((acc, val, i) => acc + (val - vector2[i]) ** 2, 0));
// }
