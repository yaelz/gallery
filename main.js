"use strict";
function GL() {

}

GL.createDiv = function createDiv(className) {
//    className = className || "gl-item-title";
    var div = document.createElement('div');
    div.className = className;
    return div;
};

GL.createBtn = function createBtn(text, onClickMethod) {
    var showImgBtn = document.createElement('button');
    showImgBtn.onclick = onClickMethod;
    showImgBtn.textContent = text;
    return showImgBtn;
};

function createImg(imgSrc) {
    var itemImg = new Image();
    itemImg.src = imgSrc;
    itemImg.alt = 'alt';
    return itemImg;
}

GL.removeItem = function removeItem(className) {
    className.visibility = 'hidden';
};

GL.createItem = function createItem (imgSrc) {
    var galleryItem = GL.createDiv("gl-gallery-item");

    var itemTitle = GL.createDiv("gl-item-title");
    itemTitle.textContent = "Item Title";
    galleryItem.appendChild(itemTitle);

    var itemImg = createImg(imgSrc);
    galleryItem.appendChild(itemImg);

    var itemControls = GL.createDiv("gl-item-controls");
    galleryItem.appendChild(itemControls);

    var showImgBtn = GL.createBtn('Show image', function () {});
    itemControls.appendChild(showImgBtn);

//    var closeBtn = GL.createBtn('Close', GL.removeItem("gl-gallery-item"));
//    itemControls.appendChild(closeBtn);
    var closeBtn = GL.createBtn('Close', function () {});
    itemControls.appendChild(closeBtn);

    return galleryItem;
};


GL.init = function init() {
    var cont = document.querySelector('.gl-items-container');
    cont.appendChild(GL.createItem('http://dummyimage.com/200x142/000/00ff48'));
    cont.appendChild(GL.createItem('http://dummyimage.com/200x142/000/00ff48'));
    cont.appendChild(GL.createItem('http://dummyimage.com/200x142/000/00ff48'));
};

GL.init();
//window.onload = function () {
//    GL.init();
//};