function delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function colorHarmonyCalculate(coloritems) {
    document.getElementById("aestheticMeasure").innerText = `美度:`
    // document.getElementById("colorPropertyAestheticMeasure").innerText = `美度:`
    console.log("olorHarmonyCalculate")
    for (const element of Array.from(document.getElementsByClassName("harmony"))) {
        const parent = element.parentNode;
        if (parent) {
            parent.removeChild(element);
        }
    }
    if (coloritems == null) {
        coloritems = []
    }
    var colorButtons = document.querySelectorAll('#colorButton');
    for (let b = 0; b < colorButtons.length; b++) {


        // coloritems.push(scene.getObjectByProperty('uuid', colorButtons[b].dataset.anchorUuid))

        var HVC = XYZtoHVC(scene.getObjectByProperty('uuid', colorButtons[b].dataset.anchorUuid).position)
        console.log("coloritems", { color: colorButtons[b].style.backgroundColor, HVC: HVC })
        coloritems.push({ color: colorButtons[b].style.backgroundColor, HVC: HVC })
    }
    // if (coloritems > 5) return

    // coloritems = colorObjects;// coloritems.concat(colorObjects);

    // var colorButtons = document.querySelectorAll('#colorButton');
    HdifferentCount = 0
    VdifferentCount = 0
    CdifferentCount = 0
    var ordersum = 0
    var paircount = 0
    for (let c1 = 0; c1 < coloritems.length; c1++) {
        for (let c2 = c1 + 1; c2 < coloritems.length; c2++) {
            await delay(1);
            // delay(1000);
            console.log("mae", coloritems.length)
            // if (coloritems.length > 5) return
            var item1 = coloritems[c1];
            var item2 = coloritems[c2];
            console.log(item1, item2)
            // Clone the content of the template
            const ordartableTemplate = document.getElementById("ordartableTemplate");
            const ordartableElemant = ordartableTemplate.content.cloneNode(true);


            const container = document.getElementById("ordartable");
            container.appendChild(ordartableElemant);
            // console.log(container.querySelectorAll(".autocolor tbody")[container.querySelectorAll(".autocolor tbody").length - 1])
            const tbodyElements = container.querySelectorAll(".autocolor tbody");
            const tbody = tbodyElements[tbodyElements.length - 1];



            const colorelements1 = container.querySelectorAll(".sample1");
            const colorelements2 = container.querySelectorAll(".sample2");

            // 新しい要素ごとに処理
            console.log("color", item1.color)
            colorelements1[colorelements1.length - 1].style.backgroundColor = item1.color;
            colorelements1[colorelements1.length - 1].dataset.pairid = paircount

            colorelements2[colorelements2.length - 1].style.backgroundColor = item2.color;
            colorelements2[colorelements2.length - 1].dataset.pairid = paircount
            console.log(paircount)
            paircount += 1


            var order = 0
            // console.log("pos", item1.position.x, coloritems.length)
            var HVC1 = item1.HVC;
            var HVC2 = item2.HVC;
            console.log("ato", item1.HVC, HVC1, HVC2)
            // continue
            // return

            var Hdifferent = Math.abs(HVC1.H - HVC2.H)
            console.log("Hdiff", Hdifferent)
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
            if (HVC1.C < 1 || HVC2.C < 1) {
                Hevaluation = "灰色"
                Hpoint = 1.0
            }

            order += Hpoint
            const newRow = document.createElement("tr");
            newRow.innerHTML = `<th>色相差</th><td>${Hdifferent.toFixed(2)}</td><td>${Hevaluation}</td><td>${Hpoint}</td>`;
            tbody.appendChild(newRow);

            var Vdifferent = Math.abs(HVC1.V - HVC2.V)//高さ明度
            var Cdifferent = Math.abs(HVC1.C - HVC2.C)
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
            if (Vdifferent > 9) {
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
            newRow.innerHTML = `<th >秩序</th><td></td><td></td><td >${order.toFixed(2)}</td>`;
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

            const orderviewelements = container.querySelectorAll(".orderview");
            orderviewelements[orderviewelements.length - 1].innerHTML = `秩序:${order.toFixed(2)}`
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
            var complexity = 0
            complexity += coloritems.length;
            complexity += HdifferentCount
            complexity += VdifferentCount
            complexity += CdifferentCount

            console.log(document.getElementById("aestheticMeasure"))
            measre = (ordersum / complexity)
            document.getElementById("aestheticMeasure").innerText = `美度:${measre.toFixed(2)}`
            // document.getElementById("colorPropertyAestheticMeasure").innerText = `美度:${measre.toFixed(2)}`

        }
    }
    const complexitytableTemplate = document.getElementById("complexitytableTemplate");
    const complexitytableElemant = complexitytableTemplate.content.cloneNode(true);


    const container = document.getElementById("complexitytable");
    container.appendChild(complexitytableElemant);
    const tbody = container.querySelector(".autocolor tbody");



    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th>色数</th><td>${coloritems.length}`;
    tbody.appendChild(newRow);
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th>色相差のある色対</th><td>${HdifferentCount}`;
    tbody.appendChild(newRow);
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th>明度差のある色対</th><td>${VdifferentCount}`;
    tbody.appendChild(newRow);
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th>彩度差のある色対</th><td>${CdifferentCount}`;
    tbody.appendChild(newRow);
    const newRow = document.createElement("tr");
    newRow.innerHTML = `<th class="display-6">複雑さ</th><td>${complexity}`;
    newRow.classList.add("total-cell");
    tbody.appendChild(newRow);


    return measre;

}


function tableHide(num) {
    console.log(num.dataset.pairid)
    var id = num.dataset.pairid;
    console.log(Array.from(document.getElementsByClassName("ordartablebody"))[0])
    Array.from(document.getElementsByClassName("ordartablebody"))[id].style.display = Array.from(document.getElementsByClassName("ordartablebody"))[id].style.display == 'none' ? "block" : "none";
    // document.getElementById("ordartable").querySelectorAll(".autocolor tbody")
}