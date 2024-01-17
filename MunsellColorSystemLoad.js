var munsellColorSystemCanvas = document.getElementById("munsellColorSystemCanvas");
// munsellColorSystemCanvasUpdate();
// function munsellColorSystemCanvasUpdate() {
//     // console.log("munsellColorSystemCanvasUpdate");
//     if (munsellColorSystemCanvas != null) {
//         // Clear the canvas
//         // munsellCtx.clearRect(0, 0, munsellColorSystemCanvas.width, munsellColorSystemCanvas.height);
//         // Set the fill style and draw a red circle
//         munsellCtx.fillStyle = "red";
//         munsellCtx.beginPath();
//         // var x = munsellColorSystemCanvas.width / 2;
//         // var y = munsellColorSystemCanvas.height / 2;
//         // drowCircle(0, 0)
//         // if (munsellColors) {
//         //     munsellColors.map(function (c) {
//         //         // console.log(c);
//         //         // setMunsellColor(c);
//         //     });
//         // }
//     }
//     // Request the next animation frame
//     requestAnimationFrame(munsellColorSystemCanvasUpdate);
// }
function drowCircle(x, y) {
    munsellCtx.beginPath();
    munsellCtx.arc(munsellColorSystemCanvas.width / 2 + x, munsellColorSystemCanvas.height / 2 + y, 10, 0, 2 * Math.PI);
    munsellCtx.fill();
    munsellCtx.closePath();
}
readcolorcodeToHVC();
var munsellColors = [];
function readcolorcodeToHVC() {
    fetch('ConvertionMunsellColorSystem\\colorcodeToHVC.txt')
        .then(function (response) {
        return response.text(); // テキストコンテンツのPromiseを返す
    })
        .then(function (text) {
        // console.log(text.split('\n'));
        munsellColors = text.split('\n').map(function (line) { return line.split('\t'); });
        munsellColors.map(function (c) {
            // console.log(c);
            // setMunsellColor(c);
            //              var colorcode, H, V, C;
            // [colorcode, H, V, C] = c;
            // console.log(colorcode)
        });
        colorAddLoop(1);
    });
}
function colorAddLoop(i) {
    // console.log(munsellColors[i]);
    // addColorMesh(colorcode, H, V, C);
    for (var j = 0; j < 10; j++) {
        if (!munsellColors[i])
            return;
        i += 1;
        var color = munsellColors[i];
        // console.log(color)
        if (color == null)
            continue;
        addColorMesh(color[0], parseFloat(color[1]), parseFloat(color[2]), parseFloat(color[3]));
    }
    // colorAddLoop(i + 1);
    requestAnimationFrame(function () {
        colorAddLoop(i);
    });
}
// function setMunsellColor(color) {
// //     // console.log(color);
//     var colorcode, H, S, V;
//     [colorcode, H, S, V] = color;
//     console.log(colorcode)
// // //     munsellCtx.fillStyle = colorcode;
// // //  var rad=H/40.0
// //     // drowCircle(Math.sin(rad * 2 * Math.PI) * V * 8, Math.cos(rad * 2 * Math.PI) * V * 8);
// //     // drowCircle(V*10-170,S*10-50);
// //     //    var coloredElement = document.createElement('span');
// //     //     coloredElement.style.color = colorcode;
// //     //     coloredElement.textContent = "A\n";
// //     //    document.body.appendChild(coloredElement);
// }
