var video;
var inputingColorItem;
function cameraInit(deviceId) {
    // HTMLドキュメント内の<video>要素を取得
    var userAgent = window.navigator.userAgent.toLowerCase();
    if (navigator.userAgent.indexOf("Safari") !== -1 && navigator.userAgent.indexOf("Chrome") === -1)
        alert("Safariだとカメラが動かないかもしれないのでできればChrome等を使ってください" + window.navigator.userAgent.toLowerCase());
    video = document.getElementById("camera");
    if (!video) {
        console.error("Video element not found");
        return;
    }
    // カメラの設定
    var cameraSetting = {
        audio: false,
        video: {
            width: 256,
            height: 256,
            deviceId: deviceId
        }
    };
    // ユーザーのデバイスからメディアストリーム（カメラのビデオストリーム）を取得
    navigator.mediaDevices.getUserMedia(cameraSetting)
        .then(function (mediaStream) {
        // メディアストリームを<video>要素のsrcObjectに設定してビデオを表示
        video.srcObject = mediaStream;
    })["catch"](function (err) {
        // エラーが発生した場合はコンソールにエラーメッセージを表示
        console.error(err.toString());
    });
    video.style.display = "none";
}
var cameraCanvas;
var mousePos = { x: 0, y: 0 };
var ctx;
var isMouseDown;
function canvasInit() {
    console.log("canvasInit");
    cameraCanvas = document.getElementById("cameraCanvas");
    console.log(cameraCanvas);
    ctx = cameraCanvas.getContext("2d");
    var image = new Image();
    image.src = 'demo.png';
    image.onload = function () {
        ctx.drawImage(image, 0, 0, cameraCanvas.width, cameraCanvas.height);
    };
    document.addEventListener("DOMContentLoaded", function () {
        console.log("DOMContentLoaded");
        // if (cameraCanvas != null) {
        // }
        //  console.log("角");
        cameraCanvas.addEventListener('mousedown', TouchStart, false);
        cameraCanvas.addEventListener('mouseup', TouchEnd, false);
        //         function mouseDownHandler(event) {
        //     isMouseDown = true;
        //     console.log("mousedown");
        // }
        // function mouseUpHandler(event) {
        //     isMouseDown = false;
        // }
        cameraCanvas.addEventListener('touchstart', TouchStart, { passive: false });
        cameraCanvas.addEventListener('touchend', TouchEnd, false);
        function TouchStart(event) {
            isMouseDown = true;
            console.log("touchstart");
            event.preventDefault();
            inputingColorItem = colorItemAdd();
        }
        function TouchEnd(event) {
            isMouseDown = false;
            HilightReset();
        }
    });
    cameraCanvas.addEventListener("mousemove", handleInput);
    cameraCanvas.addEventListener("touchmove", handleInput);
    function handleInput(event) {
        if (event.touches && event.touches.length === 1) {
            var touch = event.touches[0];
            updateMousePos(touch.clientX, touch.clientY);
            //   inputingColorItem= colorItemAdd();
        }
        else {
            updateMousePos(event.clientX, event.clientY);
        }
    }
    function updateMousePos(clientX, clientY) {
        var rect = cameraCanvas.getBoundingClientRect();
        var cameraCanvasRect = cameraCanvas.getBoundingClientRect();
        mousePos = {
            x: (clientX - rect.left) / (cameraCanvasRect.width / 256),
            y: (clientY - rect.top) / (cameraCanvasRect.height / 256)
        };
        // Perform other actions with the updated mousePos as needed
    }
    canvasUpdate();
}
function cameraDevicesChangeButtonInit() {
    navigator.mediaDevices.enumerateDevices()
        .then(function (devices) {
        // メディアデバイスのリストが取得された場合の処理
        devices.forEach(function (device) {
            var _a;
            // デバイスがビデオ入力である場合のみ処理
            if (device.kind === "videoinput") {
                // デバイスの情報をコンソールに表示
                console.log(device.kind + ": " + device.label + device.deviceId);
                var newButton = document.createElement("button");
                // ボタンのテキストを設定
                newButton.innerHTML = device.label + device.deviceId;
                newButton.onclick = function () {
                    cameraInit(device.deviceId);
                };
                // ボディ要素にボタンを追加
                (_a = document.getElementById("cameraList")) === null || _a === void 0 ? void 0 : _a.appendChild(newButton);
            }
        });
    });
}
// カメラの初期化関数を呼び出し
cameraDevicesChangeButtonInit();
cameraInit('1');
canvasInit();
var i = 0;
var selectingColorcode;
function canvasUpdate() {
    // console.log(ctx);
    // var ctx;
    // if (cameraCanvas != null) {
    //     ctx = cameraCanvas.getContext("2d");
    // }
    // if (ctx == null)
    //     return;
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log("ctx");
    ctx.drawImage(video, 0, 0, cameraCanvas.width, cameraCanvas.height);
    i += 1;
    // ctx.fillRect(Math.sin(i * 0.5) * 10, Math.cos(i * 0.5) * 10, 50, 50);
    // ctx.fillRect(mousePos.x, mousePos.y, 25, 25);
    // console.log(mousePos);
    var pixelData = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    // console.log(pixelData);
    // var SelectingColorText;
    //  var SelectingColorText = document.getElementById("color");
    //     // console.log(colorText);
    //     if (SelectingColorText != null) {
    //       SelectingColorText.textContent = selectingColorcode;
    //   SelectingColorText.style.color = selectingColorcode;
    //     }
    ctx.fillStyle = pixelDataToRGB(pixelData);
    ctx.strokeStyle = pixelDataToRGB(pixelData);
    if (isMouseDown) {
        selectingColorcode = pixelDataToRGB(pixelData);
        // console.log("   selectingColorcode", selectingColorcode);
        colorSet(inputingColorItem, selectingColorcode);
    }
    // console.log(colorcode);
    drowCircle(mousePos.x, mousePos.y);
    requestAnimationFrame(canvasUpdate);
}
function pixelDataToRGB(pixelData) {
    var hex = function (value) {
        var hexValue = Math.round(value).toString(16);
        return hexValue.length === 1 ? "0" + hexValue : hexValue;
    };
    return "#" + hex(pixelData[0]) + hex(pixelData[1]) + hex(pixelData[2]);
}
function drowCircle(x, y) {
    // if (ctx == null) return;
    // console.log("円"+x+","+y);
    // 色を赤に設定
    ctx.beginPath();
    var r = 10;
    ctx.lineWidth = 5;
    ctx.arc(x, y, r, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.closePath();
}
