tf.loadLayersModel('ConvertionMunsellColorSystem/out/RGBtoHVC/model.json').then((model) => {
    console.log("efkjfaaa");
    RGBtoHVC([255, 255, 0], model);
});

async function RGBtoHVC(RGB, model) {
    console.log("入力 RGB:", RGB);

    // モデルの構造を確認
    // model.summary();

    try {
        const data = tf.tensor2d([RGB], [1, 3]);
        const HVC = await model.predict(data);

        HVC.print(); // 予測結果を表示
        return HVC;
    } catch (error) {
        console.error("予測中にエラーが発生しました:", error);
        return null;
    }
}


