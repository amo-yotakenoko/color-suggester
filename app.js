// カメラを初期化する関数
var cameraInit = function () {
    // HTMLドキュメント内の<video>要素を取得
    var video = document.getElementById("camera");
    if (!video) {
        console.error("Video element not found");
        return;
    }
    // カメラの設定
    var cameraSetting = {
        audio: false,
        video: {
            width: 300,
            height: 400,
            deviceId: '3'
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
};
// カメラの初期化関数を呼び出し
cameraInit();
