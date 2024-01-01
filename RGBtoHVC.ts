function colorConvart() {
    // console.log("colorConvart")
    requestAnimationFrame(colorConvart);
    console.log(isMouseDown);
    if (!isMouseDown) {
        for (const obj of colorObjects) {
                obj[0].material.transparent = false;
           obj[0].material.needsUpdate = false;
        }
        return;
    }

    let [r, g, b] = hexToRgb(selectingColorcode); 
    // console.log(r);
    var nearobj;
    var nearDistance =  Infinity;
    for (const obj of colorObjects) {
        // 各要素に対する処理をここに記述
        let [objr, objg, objb] =hexToRgb(obj[1]); 
        // console.log(objr);
        var distance = Math.sqrt((r - objr) ** 2 + (g - objg) ** 2 + (b - objb) ** 2);
        if (nearDistance > distance) {
            nearDistance = distance;
            nearobj=obj
        }
       
    }
    console.log("near", nearobj);
    for (const obj of colorObjects) {
        if (obj == nearobj) {
          obj[0].scale.set(2, 2, 2);
        } else {
      obj[0].scale.set(1, 1, 1);
        }
        if (obj[2][0] == nearobj[2][0]||obj[2][1] == nearobj[2][1]) {
                obj[0].material.transparent = false;
           obj[0].material.needsUpdate = false;
        } else {
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
    const bigint = parseInt(hex, 16);

    // R、G、Bに分割
    const red = (bigint >> 16) & 255;
    const green = (bigint >> 8) & 255;
    const blue = bigint & 255;

    return [red, green, blue];
}
// function calculateDistance(vector1, vector2) {
//     return Math.sqrt(vector1.reduce((acc, val, i) => acc + (val - vector2[i]) ** 2, 0));
// }