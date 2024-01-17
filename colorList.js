function colorItemAdd() {
    var colorList = document.getElementById("colorList");
    console.log(colorList);
    var btn = document.createElement("button");
    // li.className = "nav-item";
    // var item = document.createElement("a");
    btn.className = "btn btn-primary";
    btn.dataset.colorcode = "#000000";
    btn.textContent = "a";
    // item.style.backgroundColor = colorcode;
    // btn.appendChild(item);
    btn.classList.add("active");
    selectiongItem = btn;
    colorList.insertBefore(btn, colorList.firstChild);
    btn.addEventListener("click", function () {
        console.log(btn);
        document.getElementById("colorProperty").style.display = "block";
        document.getElementById("settings").style.display = "none";
        selectiongItem = item;
        console.log(btn.dataset.colorcode);
        selectingColorcode = btn.dataset.colorcode;
        //TODO、ここ改善点
        colorHighlight();
    });
    //  li.insertBefore(item, li.firstChild);
    return btn;
}
var selectiongItem;
var selectiongcolor;
function colorSet(item, colorcode) {
    // console.log("colorset")
    item.style.backgroundColor = colorcode; // 任意の色に変更
    item.style.borderColor = colorcode; // ボーダーカラーも指定すると良い
    item.style.color = colorcode;
}
colorUpdate();
function colorUpdate() {
    requestAnimationFrame(colorUpdate);
    var colorList = document.getElementById("colorList");
    // selectingColorcode
    var SelectingColorText = document.getElementById("colorcode");
    // console.log(selectiongItem)
    if (selectiongItem) {
        selectiongcolor = selectiongItem.style.backgroundColor;
    }
    // console.log(selectiongcolor)
    // SelectingColorText.style.color = "aa";
    SelectingColorText.textContent = selectingColorcode;
    // console.log(selectingColorcode)
    // console.log("selectingColorcodelast", selectingColorcode)
    colorHighlight(selectingColorcode);
    // console.log(selectingColorcode)
    //     }
}
