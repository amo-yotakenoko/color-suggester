function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function colorHarmonyCalculate() {

    for (const element of Array.from(document.getElementsByClassName("harmony"))) {
        const parent = element.parentNode;
        if (parent) {
            parent.removeChild(element);
        }
    }


    var colorButtons = document.querySelectorAll('#colorButton');
    HdifferentCount = 0
    VdifferentCount = 0
    CdifferentCount = 0
    var ordersum = 0
    for (let c1 = 0; c1 < colorButtons.length; c1++) {
        for (let c2 = c1 + 1; c2 < colorButtons.length; c2++) {
            var b1 = colorButtons[c1];
            var b2 = colorButtons[c2];
            console.log(c1, c2)
            // Clone the content of the template
            const harmonyTemplate = document.getElementById("harmonyTemplate");
            const harmonyElement = harmonyTemplate.content.cloneNode(true);


            const container = document.getElementById("colorHarmony");
            container.appendChild(harmonyElement);
            const tbody = container.querySelector(".autocolor tbody");
            var order = 0

            var [H1, V1, C1] = XYZtoHVC(scene.getObjectByProperty('uuid', b1.dataset.anchorUuid).position);
            var [H2, V2, C2] = XYZtoHVC(scene.getObjectByProperty('uuid', b2.dataset.anchorUuid).position);
            var Hdifferent = Math.abs(H1, H2)
            if (Hdifferent > 20) {
                Hdifferent = 40 - Hdifferent;
            }

            var Hevaluation;
            var Hpoint;
            if (Hdifferent < 1) {
                Hevaluation = "同一調和"
                Hpoint = 1.5
            } else if (Hdifferent < 7) {
                Hevaluation = "第1の曖昧"
                Hpoint = 0
            }
            else if (Hdifferent < 12) {
                Hevaluation = "類似調和"
                Hpoint = 1.1
            }
            else if (Hdifferent < 28) {
                Hevaluation = "第2の曖昧"
                Hpoint = 0.65
            } else {
                Hevaluation = "対比調和"
                Hpoint = 1.7
            }
            if (C1 < 1 || C2 < 1) {
                Hevaluation = "灰色"
                Hpoint = 1.0
            }

            order += Hpoint
            const newRow = document.createElement("tr");
            newRow.innerHTML = `<th>色相差</th><td>${Hdifferent.toFixed(2)}</td><td>${Hevaluation}</td><td>${Hpoint}</td>`;
            tbody.appendChild(newRow);

            var Vdifferent = Math.abs(V1, V2)//高さ明度
            var Cdifferent = Math.abs(C1, C2)
            var Vpoint
            var Cpoint
            var VCdifferent = Math.sqrt(Vdifferent ** 2 + Cdifferent ** 2);
            if (Math.sqrt((Vdifferent ** 2) / (0.25 ** 2) + Cdifferent ** 2) / (0.5 ** 2) < 1) {
                Vevaluation = "同一調和"
                Cevaluation = "同一調和"
                Vpoint = -1.3
                Cpoint = 0.8

            } else if (Math.sqrt((Vdifferent ** 2) / (0.5 ** 2) + Cdifferent ** 2) / (3 ** 2) < 1) {
                Vevaluation = "第1の曖昧"
                Cevaluation = "第1の曖昧"
                Vpoint = -1.0
                Cpoint = 0
            }
            else if (Math.sqrt((Vdifferent ** 2) / (1.5 ** 2) + Cdifferent ** 2) / (5 ** 2) < 1) {
                Vevaluation = "類似調和"
                Cevaluation = "類似調和"
                Vpoint = 0.7
                Cpoint = 0.1
            }
            else if (Math.sqrt((Vdifferent ** 2) / (2.5 ** 2) + Cdifferent ** 2) / (7.5 ** 2) < 1) {
                Vevaluation = "第2の曖昧"
                Cevaluation = "第2の曖昧"
                Vpoint = -0.2
                Cpoint = 0
            } else {
                Vevaluation = "対比調和"
                Cevaluation = "対比調和"
                Vpoint = 3.7
                Cpoint = 0.4
            }
            if (Vdifferent > 10) {
                Vevaluation = "眩輝"
                Vpoint = -2.0
            }
            order += Cpoint
            order += Vpoint
            const newRow = document.createElement("tr");
            newRow.innerHTML = `<th>明度差</th><td>${Vdifferent.toFixed(2)}</td><td>${Vevaluation}</td><td>${Vpoint.toFixed(2)}</td>`;
            tbody.appendChild(newRow);
            const newRow = document.createElement("tr");
            newRow.innerHTML = `<th>彩度差</th><td>${Cdifferent.toFixed(2)}</td><td>${Cevaluation}</td><td>${Cpoint.toFixed(2)}</td>`;
            tbody.appendChild(newRow);



            const newRow = document.createElement("tr");
            newRow.innerHTML = `<th>秩序</th><td></td><td></td><td>${order.toFixed(2)}</td>`;
            tbody.appendChild(newRow);
            console.log("diff", Hdifferent, Vdifferent, Cdifferent)
            if (Hdifferent > 2) {
                HdifferentCount += 1
            }
            if (Vdifferent > 2) {
                VdifferentCount += 1
            }
            if (Cdifferent > 2) {
                CdifferentCount += 1
            }
            document.getElementById("aestheticMeasure")
            ordersum += order;
            // var harmonybtn = harmonyElement.createElement("button");
            // document.getElementById("colorHarmony").appendChild(harmonybtn);

            // // Set the class and text content for the button
            // harmonybtn.className = "btn btn-primary";
            // harmonybtn.textContent = "a";
            // console.log(b1.style.backgroundColor, b2.style.backgroundColor)
            // var colorHarmony = document.getElementById("colorHarmony");
            // // console.log(colorList);
            // var div = document.createElement("div");
            // const text1 = div.createTextNode(c1);
            // text1.style.color = b1.style.backgroundColor;

            // const element = 5
            // console.log("計算");
            // console.log("Start");
            // await delay(1000);  // 1秒待つ
            // console.log("After 1 second");
            // await delay(2000);  // 2秒待つ
            // console.log("After 2 seconds");

        }
    }

    const harmonyTemplate = document.getElementById("harmonyTemplate");
    const harmonyElement = harmonyTemplate.content.cloneNode(true);


    const container = document.getElementById("colorHarmony");
    container.appendChild(harmonyElement);
    const tbody = container.querySelector(".autocolor tbody");
    var complexity = 0
    complexity += colorButtons.length;
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th>色数</th><td>${colorButtons.length}`;
    tbody.appendChild(newRow);
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th>色相差のある色対</th><td>${HdifferentCount}`;
    tbody.appendChild(newRow);
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th>明度差のある色対</th><td>${VdifferentCount}`;
    tbody.appendChild(newRow);
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th>彩度差ののある色対</th><td>${CdifferentCount}`;
    tbody.appendChild(newRow);

    complexity += HdifferentCount
    complexity += VdifferentCount
    complexity += CdifferentCount
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th>複雑さ</th><td>${complexity}`;
    tbody.appendChild(newRow);

    console.log(document.getElementById("aestheticMeasure"))
    measre = (ordersum / complexity)
    document.getElementById("aestheticMeasure").innerText = `美度:${measre.toFixed(2)}`


}
