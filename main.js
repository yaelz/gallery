"use strict";
function GL() {}

GL.createDiv = function createDiv(className) {
//    className = className || "gl-item-title";
    var div = document.createElement('div');
    div.className = className;
    return div;
};

GL.createBtn = function createBtn(text, dataID, onClickMethod) {
    var btn = document.createElement('button');
    btn.onclick = onClickMethod;
    btn.textContent = text;
    btn.dataset.id = dataID;
    return btn;
};

function createImg(imgSrc) {
    var itemImg = new Image();
    itemImg.src = imgSrc;
    itemImg.alt = 'alt';
    return itemImg;
}

GL.hideItem = function hideItem(element) {
    element.className = element.className + ' hidden';
};

GL.removeItem = function removeItem(event) {
    var button = event.target;
    var elementID = button.dataset.id;
    var element = document.getElementById(elementID);
    element.parentNode.removeChild(element);
};

GL.createItem = function createItem (imgSrc, itemId) {
    var galleryItem = GL.createDiv("gl-gallery-item");
    galleryItem.id = itemId;

    var itemTitle = GL.createDiv("gl-item-title");
    itemTitle.textContent = "Item Title";
    galleryItem.appendChild(itemTitle);

    var itemImg = createImg(imgSrc);
    galleryItem.appendChild(itemImg);

    var itemControls = GL.createDiv("gl-item-controls");
    galleryItem.appendChild(itemControls);

    var showImgBtn = GL.createBtn('Show image', itemId, function () {});
    itemControls.appendChild(showImgBtn);

    var closeBtn = GL.createBtn('Close', itemId, GL.removeItem);
    itemControls.appendChild(closeBtn);

    return galleryItem;
};


GL.init = function init() {
    var cont = document.querySelector('.gl-items-container');
    [1,2,3,4].forEach(function (item) {
        console.log(item);
        cont.appendChild(GL.createItem('http://dummyimage.com/200x142/000/00ff48', item));
    });
//    cont.appendChild(GL.createItem('http://dummyimage.com/200x142/000/00ff48'));
//    cont.appendChild(GL.createItem('http://dummyimage.com/200x142/000/00ff48'));
//    cont.appendChild(GL.createItem('http://dummyimage.com/200x142/000/00ff48'));
};

GL.init();
//window.onload = function () {
//    GL.init();
//};