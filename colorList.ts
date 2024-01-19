function colorItemAdd() {
    var colorList = document.getElementById("colorList");
    // console.log(colorList);
    var btn = document.createElement("button");
    // li.className = "nav-item";
    // var item = document.createElement("a");
    btn.className = "btn btn-primary";
    // btn.dataset.colorcode = "#000000";
    btn.textContent = "a";
    // item.style.backgroundColor = colorcode;
    // btn.appendChild(item);
    btn.classList.add("active");
    selectiongItem = btn;
    colorList.insertBefore(btn, colorList.firstChild);
    colortab(true);
    console.log("ボタン追加")
    btn.click();


    material = new THREE.MeshBasicMaterial({ color: "#000000" })
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(3, 4, 1),
        material);
    sphere.position.set(0, 0, 0);
    // const s = 2; // 新しいサイズを設定
    // sphere.scale.set(s, s, s);
    scene.add(sphere)
    console.log(sphere);
    btn.dataset.anchorUuid = sphere.uuid;
    // anchors.add([btn,sphere])

    btn.addEventListener("click", function () {
        // console.log(btn)
        colortab(true)
        selectiongItem = btn;
        // console.log(btn.dataset.colorcode);
        selectingColorcode = btn.style.backgroundColor;
        //TODO、ここ改善点

        colorHighlight(selectingColorcode);

    });
    //  li.insertBefore(item, li.firstChild);
    return btn;
}




var selectiongItem;
var selectiongcolor;
async function colorSet(item, colorcode) {
    item.style.backgroundColor = colorcode; // 任意の色に変更
    item.style.borderColor = colorcode; // ボーダーカラーも指定すると良い
    item.style.color = colorcode;
    item.dataset.colorcode = colorcode;
    var obj = scene.getObjectByProperty('uuid', item.dataset.anchorUuid);
    console.log("colorset", item.dataset, obj)
    obj.material.color.set(new THREE.Color(colorcode));
    var HVC = await RGBtoHVC(hexToRgb(colorcode))
    // console.log("結果", HVC)
    obj.position.z = HVC[0] * 1.5;
    obj.position.x = HVC[1] * 1.5;
    obj.position.y = HVC[2] * 5 - 20;
    console.log("pos,", obj.position)

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