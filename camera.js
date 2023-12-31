var video;
function cameraInit(deviceId) {
    // HTMLドキュメント内の<video>要素を取得
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
    // video.style.display = "none";
}
var canvas;
var mousePos = { x: 0, y: 0 };
function canvasInit() {
    console.log("canvasInit");
    canvas = document.getElementById("cameraCanvas");
    document.addEventListener("DOMContentLoaded", function () {
        var ctx;
        console.log("DOMContentLoaded");
        if (canvas != null) {
            ctx = canvas.getContext("2d");
        }
        //  console.log("角");
        canvas.addEventListener("mousemove", function (event) {
            var rect = canvas.getBoundingClientRect();
            mousePos = { x: event.clientX - rect.left, y: event.clientY - rect.top };
            // console.log("角");
            // ctx.clearRect(0, 0, canvas.width, canvas.height); // Canvasをクリア
        });
        canvasUpdate();
    });
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
                newButton.innerHTML = device.label;
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
function canvasUpdate() {
    var ctx;
    if (canvas != null) {
        ctx = canvas.getContext("2d");
    }
    if (ctx == null)
        return;
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // console.log("ctx");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    i += 1;
    // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    // ctx.fillRect(Math.sin(i * 0.5) * 10, Math.cos(i * 0.5) * 10, 50, 50);
    // ctx.fillStyle = "blue";
    // ctx.fillRect(mousePos.x, mousePos.y, 50, 50);
    var pixelData = ctx.getImageData(mousePos.x, mousePos.y, 1, 1).data;
    // console.log(pixelData);
    var colorText = document.getElementById("color");
    if (colorText != null) {
        colorText.textContent = pixelDataToRGB(pixelData);
        colorText.style.color = pixelDataToRGB(pixelData);
    }
    requestAnimationFrame(canvasUpdate);
}
function pixelDataToRGB(pixelData) {
    var hex = function (value) {
        var hexValue = Math.round(value).toString(16);
        return hexValue.length === 1 ? "0" + hexValue : hexValue;
    };
    return "#" + hex(pixelData[0]) + hex(pixelData[1]) + hex(pixelData[2]);
}
