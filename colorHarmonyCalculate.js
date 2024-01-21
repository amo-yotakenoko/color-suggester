var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function colorHarmonyCalculate() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, _a, element, parent_1, colorButtons, ordersum, paircount, c1, c2, b1, b2, ordartableTemplate, ordartableElemant, container_1, tbodyElements, tbody_1, colorelements1, colorelements2, order, _b, H1, V1, C1, _c, H2, V2, C2, Hdifferent, Hevaluation, Hpoint, newRow_1, Vdifferent, Cdifferent, Vpoint, Cpoint, VCdifferent, newRow_2, newRow_3, newRow_4, orderviewelements, complexitytableTemplate, complexitytableElemant, container, tbody, complexity, newRow, newRow, newRow, newRow, newRow;
        return __generator(this, function (_d) {
            for (_i = 0, _a = Array.from(document.getElementsByClassName("harmony")); _i < _a.length; _i++) {
                element = _a[_i];
                parent_1 = element.parentNode;
                if (parent_1) {
                    parent_1.removeChild(element);
                }
            }
            colorButtons = document.querySelectorAll('#colorButton');
            HdifferentCount = 0;
            VdifferentCount = 0;
            CdifferentCount = 0;
            ordersum = 0;
            paircount = 0;
            for (c1 = 0; c1 < colorButtons.length; c1++) {
                for (c2 = c1 + 1; c2 < colorButtons.length; c2++) {
                    b1 = colorButtons[c1];
                    b2 = colorButtons[c2];
                    console.log(c1, c2);
                    ordartableTemplate = document.getElementById("ordartableTemplate");
                    ordartableElemant = ordartableTemplate.content.cloneNode(true);
                    container_1 = document.getElementById("ordartable");
                    container_1.appendChild(ordartableElemant);
                    tbodyElements = container_1.querySelectorAll(".autocolor tbody");
                    tbody_1 = tbodyElements[tbodyElements.length - 1];
                    colorelements1 = container_1.querySelectorAll(".sample1");
                    colorelements2 = container_1.querySelectorAll(".sample2");
                    // 新しい要素ごとに処理
                    colorelements1[colorelements1.length - 1].style.backgroundColor = b1.style.backgroundColor;
                    colorelements1[colorelements1.length - 1].dataset.pairid = paircount;
                    colorelements2[colorelements2.length - 1].style.backgroundColor = b2.style.backgroundColor;
                    colorelements2[colorelements2.length - 1].dataset.pairid = paircount;
                    console.log(paircount);
                    paircount += 1;
                    order = 0;
                    _b = XYZtoHVC(scene.getObjectByProperty('uuid', b1.dataset.anchorUuid).position), H1 = _b[0], V1 = _b[1], C1 = _b[2];
                    _c = XYZtoHVC(scene.getObjectByProperty('uuid', b2.dataset.anchorUuid).position), H2 = _c[0], V2 = _c[1], C2 = _c[2];
                    Hdifferent = Math.abs(H1, H2);
                    if (Hdifferent > 20) {
                        Hdifferent = 40 - Hdifferent;
                    }
                    if (Hdifferent < 1) {
                        Hevaluation = "同一調和";
                        Hpoint = 1.5;
                    }
                    else if (Hdifferent < 7) {
                        Hevaluation = "第1の曖昧";
                        Hpoint = 0;
                    }
                    else if (Hdifferent < 12) {
                        Hevaluation = "類似調和";
                        Hpoint = 1.1;
                    }
                    else if (Hdifferent < 28) {
                        Hevaluation = "第2の曖昧";
                        Hpoint = 0.65;
                    }
                    else {
                        Hevaluation = "対比調和";
                        Hpoint = 1.7;
                    }
                    if (C1 < 1 || C2 < 1) {
                        Hevaluation = "灰色";
                        Hpoint = 1.0;
                    }
                    order += Hpoint;
                    newRow_1 = document.createElement("tr");
                    newRow_1.innerHTML = "<th>\u8272\u76F8\u5DEE</th><td>" + Hdifferent.toFixed(2) + "</td><td>" + Hevaluation + "</td><td>" + Hpoint + "</td>";
                    tbody_1.appendChild(newRow_1);
                    Vdifferent = Math.abs(V1, V2) //高さ明度
                    ;
                    Cdifferent = Math.abs(C1, C2);
                    VCdifferent = Math.sqrt(Math.pow(Vdifferent, 2) + Math.pow(Cdifferent, 2));
                    if (Math.sqrt((Math.pow(Vdifferent, 2)) / (Math.pow(0.25, 2)) + Math.pow(Cdifferent, 2)) / (Math.pow(0.5, 2)) < 1) {
                        Vevaluation = "同一調和";
                        Cevaluation = "同一調和";
                        Vpoint = -1.3;
                        Cpoint = 0.8;
                    }
                    else if (Math.sqrt((Math.pow(Vdifferent, 2)) / (Math.pow(0.5, 2)) + Math.pow(Cdifferent, 2)) / (Math.pow(3, 2)) < 1) {
                        Vevaluation = "第1の曖昧";
                        Cevaluation = "第1の曖昧";
                        Vpoint = -1.0;
                        Cpoint = 0;
                    }
                    else if (Math.sqrt((Math.pow(Vdifferent, 2)) / (Math.pow(1.5, 2)) + Math.pow(Cdifferent, 2)) / (Math.pow(5, 2)) < 1) {
                        Vevaluation = "類似調和";
                        Cevaluation = "類似調和";
                        Vpoint = 0.7;
                        Cpoint = 0.1;
                    }
                    else if (Math.sqrt((Math.pow(Vdifferent, 2)) / (Math.pow(2.5, 2)) + Math.pow(Cdifferent, 2)) / (Math.pow(7.5, 2)) < 1) {
                        Vevaluation = "第2の曖昧";
                        Cevaluation = "第2の曖昧";
                        Vpoint = -0.2;
                        Cpoint = 0;
                    }
                    else {
                        Vevaluation = "対比調和";
                        Cevaluation = "対比調和";
                        Vpoint = 3.7;
                        Cpoint = 0.4;
                    }
                    if (Vdifferent > 10) {
                        Vevaluation = "眩輝";
                        Vpoint = -2.0;
                    }
                    order += Cpoint;
                    order += Vpoint;
                    newRow_1 = document.createElement("tr");
                    newRow_1.innerHTML = "<th>\u660E\u5EA6\u5DEE</th><td>" + Vdifferent.toFixed(2) + "</td><td>" + Vevaluation + "</td><td>" + Vpoint.toFixed(2) + "</td>";
                    tbody_1.appendChild(newRow_1);
                    newRow_1 = document.createElement("tr");
                    newRow_1.innerHTML = "<th>\u5F69\u5EA6\u5DEE</th><td>" + Cdifferent.toFixed(2) + "</td><td>" + Cevaluation + "</td><td>" + Cpoint.toFixed(2) + "</td>";
                    tbody_1.appendChild(newRow_1);
                    newRow_1 = document.createElement("tr");
                    newRow_1.innerHTML = "<th >\u79E9\u5E8F</th><td></td><td></td><td >" + order.toFixed(2) + "</td>";
                    tbody_1.appendChild(newRow_1);
                    console.log("diff", Hdifferent, Vdifferent, Cdifferent);
                    if (Hdifferent > 2) {
                        HdifferentCount += 1;
                    }
                    if (Vdifferent > 2) {
                        VdifferentCount += 1;
                    }
                    if (Cdifferent > 2) {
                        CdifferentCount += 1;
                    }
                    document.getElementById("aestheticMeasure");
                    ordersum += order;
                    orderviewelements = container_1.querySelectorAll(".orderview");
                    orderviewelements[orderviewelements.length - 1].innerHTML = "\u79E9\u5E8F:" + order.toFixed(2);
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
            complexitytableTemplate = document.getElementById("complexitytableTemplate");
            complexitytableElemant = complexitytableTemplate.content.cloneNode(true);
            container = document.getElementById("complexitytable");
            container.appendChild(complexitytableElemant);
            tbody = container.querySelector(".autocolor tbody");
            complexity = 0;
            complexity += colorButtons.length;
            newRow = document.createElement("tr");
            newRow.innerHTML = "<th>\u8272\u6570</th><td>" + colorButtons.length;
            tbody.appendChild(newRow);
            newRow = document.createElement("tr");
            newRow.innerHTML = "<th>\u8272\u76F8\u5DEE\u306E\u3042\u308B\u8272\u5BFE</th><td>" + HdifferentCount;
            tbody.appendChild(newRow);
            newRow = document.createElement("tr");
            newRow.innerHTML = "<th>\u660E\u5EA6\u5DEE\u306E\u3042\u308B\u8272\u5BFE</th><td>" + VdifferentCount;
            tbody.appendChild(newRow);
            newRow = document.createElement("tr");
            newRow.innerHTML = "<th>\u5F69\u5EA6\u5DEE\u306E\u3042\u308B\u8272\u5BFE</th><td>" + CdifferentCount;
            tbody.appendChild(newRow);
            complexity += HdifferentCount;
            complexity += VdifferentCount;
            complexity += CdifferentCount;
            newRow = document.createElement("tr");
            newRow.innerHTML = "<th>\u8907\u96D1\u3055</th><td>" + complexity;
            newRow.classList.add("total-cell");
            tbody.appendChild(newRow);
            console.log(document.getElementById("aestheticMeasure"));
            measre = (ordersum / complexity);
            document.getElementById("aestheticMeasure").innerText = "\u7F8E\u5EA6:" + measre.toFixed(2);
            return [2 /*return*/];
        });
    });
}
function tableHide(num) {
    console.log(num.dataset.pairid);
    var id = num.dataset.pairid;
    console.log(Array.from(document.getElementsByClassName("ordartablebody"))[0]);
    Array.from(document.getElementsByClassName("ordartablebody"))[id].style.display = Array.from(document.getElementsByClassName("ordartablebody"))[id].style.display == 'none' ? "block" : "none";
    // document.getElementById("ordartable").querySelectorAll(".autocolor tbody")
}
