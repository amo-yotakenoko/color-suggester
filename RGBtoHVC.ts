
// colorHighlight();

var HviewCanvas = document.getElementById("Hview");
var VCviewCanvas = document.getElementById("VCview");
var prevcolorcode;
var prevcameraangle;
// var isHighLight = false;
function colorHighlight(colorcode, enforceUpdate: boolean = false) {
    // console.log(munsellCamera.position.x)
    if (!enforceUpdate && prevcolorcode == colorcode && Math.abs(prevcameraangle - munsellCamera.position.x) < 0.1) {
        return;
    }


    // console.log("更新")
    prevcolorcode = colorcode;
    prevcameraangle = munsellCamera.position.x;
    // requestAnimationFrame(colorHighlight);
    // console.log(colorHighlight);

    // if (!isMouseDown) {

    //     return;
    // }
    // console.log(selectiongItem.dataset.colorcode, ",", selectingColorcode);
    // console.log(colorcode);
    // console.log(colorcode);
    if (colorcode == null || isgray(colorcode)) {
        console.log("colorcodeがない")
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
    for (const obj of colorObjects.filter(a => a[2] != nearobj[2]).concat([nearobj])) {
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
            if (isHosyoku) x *= -1;
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
        if (isHighLight) {
            sphere.material.transparent = false;
            sphere.material.opacity = 1;
            sphere.material.needsUpdate = true;
            enablecount += 1;
        } else {


            sphere.material.transparent = true;
            sphere.material.opacity = 0.05;
            sphere.material.needsUpdate = true;
        }

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
    for (const obj of colorObjects) {
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

    if (!selectingColorcode) return null;

    let [r, g, b] = hexToRgb(selectingColorcode);
    // console.log(r);
    var nearobj;
    var nearDistance = Infinity;
    // console.log(colorObjects)
    if (colorObjects) {
        for (const obj of colorObjects) {
            // 各要素に対する処理をここに記述
            let [objr, objg, objb] = hexToRgb(obj[1]);
            // console.log(objr);
            var distance = Math.sqrt((r - objr) ** 2 + (g - objg) ** 2 + (b - objb) ** 2);
            if (nearDistance > distance) {
                nearDistance = distance;
                nearobj = obj
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
    const bigint = parseInt(hex, 16);

    // R、G、Bに分割
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;

    // 入力が正しい16進数形式でない場合は黒を返す
    if (isNaN(red) || isNaN(green) || isNaN(blue)) {
        return [0, 0, 0];
    }

    return [red, green, blue];
}
// function calculateDistance(vector1, vector2) {
//     return Math.sqrt(vector1.reduce((acc, val, i) => acc + (val - vector2[i]) ** 2, 0));
// }