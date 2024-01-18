function colorItemAdd() {
    var colorList = document.getElementById("colorList");
    // console.log(colorList);
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
    colortab(true);
    console.log("ボタン追加")
    btn.click();
    btn.addEventListener("click", function () {
        // console.log(btn)
        colortab(true)
        selectiongItem = btn;
        console.log(btn.dataset.colorcode);
        selectingColorcode = btn.dataset.colorcode;
        //TODO、ここ改善点

        colorHighlight(selectingColorcode);

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
    item.dataset.colorcode = colorcode;
}
var colorList = document.getElementById("colorList");
var SelectingColorText = document.getElementById("colorcode");
var deleteButton = document.getElementById("colorDelete");
SelectingColorText.addEventListener('input', function (event) {
    console.log("input event" + SelectingColorText.value);
    colorSet(selectiongItem, SelectingColorText.value)
    selectingColorcode = SelectingColorText.value;
    // selectiongItem.style.backgroundColor = SelectingColorText.value;
});

// changeイベント
SelectingColorText.addEventListener('change', function (event) {
    console.log("change event");
});

colorUpdate()
function colorUpdate() {
    requestAnimationFrame(colorUpdate);
    // selectingColorcode

    // console.log(selectiongItem)


    // clickイベント
    // SelectingColorText.addEventListener('click', function (event) {
    //     console.log("click event");
    // });


    if (selectiongItem) {

        selectiongcolor = selectiongItem.style.backgroundColor;
        document.body.style.backgroundColor = selectiongcolor;
        var regex = /rgb\((\d+), (\d+), (\d+)\)/;
        var rgb = selectiongcolor.match(regex);
        // console.log((parseInt(rgb[1], 10) + parseInt(rgb[2], 10) + parseInt(rgb[3], 10)));
        var c = (parseInt(rgb[1], 10) + parseInt(rgb[2], 10) + parseInt(rgb[3], 10)) > 255 * 3 / 2 ? '#000000' : '#FFFFFF';
        deleteButton.style.color = c;
        deleteButton.style.outlineColor = c;
        // console.log("aa" + hexToRgb(selectiongcolor) + deleteButton.style.outlineColor);
    }
    if (document.activeElement !== SelectingColorText) {

        SelectingColorText.value = selectingColorcode;
    }
    // console.log(selectiongcolor)
    // SelectingColorText.style.color = "aa";
    // SelectingColorText.style.color = (rgb[0] + rgb[1] + rgb[2]) > 255 * 3 / 2 ? '#000000' : '#FFFFFF';
    // console.log((rgb[0] + rgb[1] + rgb[2]) < 255 * 3 / 2 ? '#000000' : '#FFFFFF')

    // console.log(selectingColorcode)
    // console.log("selectingColorcodelast", selectingColorcode)

    colorHighlight(selectingColorcode);

    // console.log(selectingColorcode)
    //     }
}

function colorDelete() {
    console.log("delete");
    var parent = selectiongItem.parentNode
    parent.removeChild(selectiongItem);
    parent.firstElementChild.click();

    // selectiongItem = null;

}