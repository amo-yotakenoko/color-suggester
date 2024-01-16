function colorItemAdd() {
    var colorList = document.getElementById("colorList");
    console.log(colorList);
    var li = document.createElement("li");
    li.className = "nav-item";
    colorList.insertBefore(li, colorList.firstChild);
    var item = document.createElement("a");
    item.className = "nav-link";
    item.dataset.colorcode = "#000000";
    item.textContent = "a";
    // item.style.backgroundColor = colorcode;
    li.appendChild(item);
    item.classList.add("active");
    selectiongItem = item;

    item.addEventListener("click", function () {
        console.log(item)
        document.getElementById("colorProperty").style.display = "block";
        document.getElementById("settings").style.display = "none";
        selectiongItem = item;
        console.log(item.dataset.colorcode);
        selectingColorcode = item.dataset.colorcode;
        //TODO、ここ改善点

        colorHighlight();

    });
    //  li.insertBefore(item, li.firstChild);
    return item;
}
var selectiongItem;
var selectiongcolor;
function colorSet(item, colorcode) {
    // console.log("colorset")
    item.style.backgroundColor = colorcode;
    item.dataset.colorcode = colorcode;

}
colorUpdate()
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