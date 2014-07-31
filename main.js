"use strict";
//function GL() {}
var GL = {
    cont:'',
    idxShown: 0,
    numToPresentAt1Time: 10
};

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

GL.createImg = function createImg(imgSrc) {
    var itemImg = new Image();
    itemImg.src = imgSrc;
    itemImg.alt = 'alt';
    return itemImg;
};

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
    itemTitle.textContent = "{{Item Title}}";
    galleryItem.appendChild(itemTitle);

    var itemImg = GL.createImg(imgSrc);
    galleryItem.appendChild(itemImg);

    var itemControls = GL.createDiv("gl-item-controls");
    galleryItem.appendChild(itemControls);

    var showImgBtn = GL.createBtn('Edit', itemId, function () {});
    itemControls.appendChild(showImgBtn);

    var closeBtn = GL.createBtn('Remove', itemId, GL.removeItem);
    itemControls.appendChild(closeBtn);

    return galleryItem;
};

GL.getImageUrl = function () {
    var searchResults = document.getElementById('search-results').value;
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:5000/search/'+searchResults, true);
    xhr.onload = GL.loadHandler;
    xhr.send();
};

GL.loadHandler = function loadHandler (gotFromServer) {
    console.log('aaaaaaaaaaaaaaaa ' + gotFromServer);
    var response = gotFromServer.target.response;
    var responseInJson = JSON.parse(response);
    for (GL.idxShown = 0; GL.idxShown < GL.numToPresentAt1Time; GL.idxShown++) {
        GL.cont.appendChild(GL.createItem(responseInJson[GL.idxShown].imgUrl, GL.idxShown));
    }
//    responseInJson.forEach(function (imgData) {
//        createItem(imgData.imgUrl);
//    });
};

GL.addClass = function addClass(whereToAdd, classToAdd) {
    $(whereToAdd).addClass("blue");
};

GL.init = function init() {
    GL.cont = document.querySelector('.gl-items-container');
    [1,2,3,4].forEach(function (item) {
        GL.cont.appendChild(GL.createItem('http://dummyimage.com/200x142/000/00ff48', item));
    });
//    cont.appendChild(GL.createItem('http://dummyimage.com/200x142/000/00ff48'));
//    cont.appendChild(GL.createItem('http://dummyimage.com/200x142/000/00ff48'));
//    cont.appendChild(GL.createItem('http://dummyimage.com/200x142/000/00ff48'));
};

GL.init();
//window.onload = function () {
//    GL.init();
//};