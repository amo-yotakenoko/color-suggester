var model;
// async function loadModel() {
//     model = await tf.loadLayersModel('ConvertionMunsellColorSystem/out/RGBtoHVC/model.json');

// }
loadModel()

RGBtoHVC([255, 255, 0]);

async function RGBtoHVC(RGB) {
    if (!model) {
        model = await tf.loadLayersModel('ConvertionMunsellColorSystem/out/RGBtoHVC/model.json');
    }
    // console.log("入力 RGB:", RGB);

    // モデルの構造を確認
    // model.summary();
    if (model) {

        try {
            const data = tf.tensor2d([RGB], [1, 3]);
            const HVC = await model.predict(data);

            // HVC.print(); // 予測結果を表示
            // console.log("結果", HVC.arraySync()[0])
            return HVC.arraySync()[0];
        } catch (error) {
            console.error("予測中にエラーが発生しました:", error);
            return null;
        }
    } else {
        console.log("modelがない", model)
    }
}


