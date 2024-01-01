function colorItemAdd() {
    var colorList = document.getElementById("colorList");
    console.log(colorList);
    var li = document.createElement("li");
    li.className = "nav-item";
      colorList.insertBefore(li, colorList.firstChild);
    var item = document.createElement("a");
    item.className = "nav-link";
    // item.textContent = "aa";
    // item.style.backgroundColor =colorcode;
    li.appendChild(item);
       item.classList.add("active");
    //  li.insertBefore(item, li.firstChild);
    return item;
}

function colorSet(item, colorcode) {
    console.log("colorset")
    item.style.backgroundColor =colorcode;
}
