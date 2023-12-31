var munsellColorSystemCanvas = document.getElementById("munsellColorSystemCanvas") as HTMLVideoElement;
munsellColorSystemCanvasUpdate();

var munsellCtx;
function munsellColorSystemCanvasUpdate() {
    // console.log("munsellColorSystemCanvasUpdate");
    if (munsellColorSystemCanvas != null) {
        munsellCtx = munsellColorSystemCanvas.getContext("2d");
    }

    if (munsellColorSystemCanvas != null) {
        // Clear the canvas
        // munsellCtx.clearRect(0, 0, munsellColorSystemCanvas.width, munsellColorSystemCanvas.height);
        // Set the fill style and draw a red circle
        munsellCtx.fillStyle = "red";
        munsellCtx.beginPath();
        // var x = munsellColorSystemCanvas.width / 2;
        // var y = munsellColorSystemCanvas.height / 2;
        // drowCircle(0, 0)
        // if (munsellColors) {
            
        //     munsellColors.map(function (c) {
        //         // console.log(c);
        //         // setMunsellColor(c);
        //     });
        // }
    }

    // Request the next animation frame
    requestAnimationFrame(munsellColorSystemCanvasUpdate);
}


function drowCircle(x, y) {
     munsellCtx.beginPath();
      munsellCtx.arc(munsellColorSystemCanvas.width / 2+x, munsellColorSystemCanvas.height / 2+y, 10, 0, 2 * Math.PI);
      
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
            munsellColors = text.split('\n').map(line => line.split('\t'))
            munsellColors.map(function (c) {
                // console.log(c);
                setMunsellColor(c);
            });
        })
       
}

function setMunsellColor(color) {
    // console.log(color);
    var colorcode, H, S, V;
    [colorcode, H, S, V] = color;
    console.log(colorcode)
    munsellCtx.fillStyle = colorcode;
 var rad=H/40.0
    // drowCircle(Math.sin(rad * 2 * Math.PI) * V * 8, Math.cos(rad * 2 * Math.PI) * V * 8);
    
    drowCircle(V*10-170,S*10-50);

    //    var coloredElement = document.createElement('span');
    //     coloredElement.style.color = colorcode;
    //     coloredElement.textContent = "A\n";

  
    //    document.body.appendChild(coloredElement);
}
