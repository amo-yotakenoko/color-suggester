function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function colorHarmonyCalculate() {


    for (let c1 = 0; c1 < 5; c1++) {
        for (let c2 = c1 + 1; c2 < 5; c2++) {
            console.log(c1, c2)
        }
        // const element = 5
        // console.log("計算");
        // console.log("Start");
        // await delay(1000);  // 1秒待つ
        // console.log("After 1 second");
        // await delay(2000);  // 2秒待つ
        // console.log("After 2 seconds");

    }
}

