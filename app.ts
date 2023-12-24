//カメラの設定型
interface CameraSetting {
    audio: boolean;
    video: {
        width: number;
        height: number;
        deviceId:string
    };
}

// カメラを初期化する関数
const cameraInit = () => {
    // HTMLドキュメント内の<video>要素を取得
    const video: HTMLVideoElement | null = document.getElementById("camera") as HTMLVideoElement;

    if (!video) {
        console.error("Video element not found");
        return;
    }

    // カメラの設定
    const cameraSetting: CameraSetting = {
        audio: false,
        video: {
            width: 300,
            height: 400,
             deviceId:'1'
        }
    };

    // ユーザーのデバイスからメディアストリーム（カメラのビデオストリーム）を取得
    navigator.mediaDevices.getUserMedia(cameraSetting)
        .then((mediaStream: MediaStream) => {
            // メディアストリームを<video>要素のsrcObjectに設定してビデオを表示
            video.srcObject = mediaStream;
        })
        .catch((err: Error) => {
            // エラーが発生した場合はコンソールにエラーメッセージを表示
            console.error(err.toString());
        });
}

// カメラの初期化関数を呼び出し
cameraInit();
