"use strict";
//function GL() {}
var GL = {
    cont:'',
    jsonItems: [],
    idxShown: 0,
    numToPresentAt1Time: 20,
    statusBar: 0
};

GL.createDiv = function createDiv(className) {
//    className = className || "gl-item-title";
    var div = document.createElement('div');
    div.className = className;
    return div;
};

GL.createBtn = function createBtn(text, itemID, className) {
    var btn = document.createElement('button');
    btn.dataset.id = itemID;
    btn.textContent = text;
    btn.className = className;
    return btn;
};

GL.createImg = function createImg(imgSrc, className) {
    var itemImg = new Image();
    itemImg.onerror = GL.onErrorImg;
    itemImg.alt = 'alt';
    itemImg.className = className;
    itemImg.src = imgSrc;
    return itemImg;
};

GL.onErrorImg = function (event) {
    var target = event.target;
    target.src = 'http://upload.wikimedia.org/wikipedia/en/a/aa/Magic_the_gathering-card_back.jpg';
};

GL.hideItem = function hideItem(element) {
    element.className = element.className + ' hidden';
};

GL.deligationOnBody = function deligationOnBody(event) {
    var target = event.target;

    if (target.classList.contains('gl-remove-btn')) {
        GL.removeItem(event);
    } else if (target.classList.contains('gl-edit-btn')) {
        GL.editItem(event);
    } else if (target.classList.contains('search-button')) {
        GL.getImageUrl();
    } else if (target.classList.contains('clear-button')) {
        GL.clearAllImages();
    } else if (target.classList.contains('popup')) {
        GL.hideItem(target);
    } else if (target.classList.contains('more-button')) {
        GL.addMoreImages();
    } else if (target.classList.contains('gl-item-image')) {

    }

};

GL.removeItem = function removeItem(event) {
    var button = event.target;
    var elementID = button.dataset.id;
    var element = document.getElementById(elementID);
    element.parentNode.removeChild(element);
};

GL.editItem = function editItem(event) {
    console.log(event.target);
};

GL.createItem = function createItem (imgSrc, itemId) {
    var galleryItem = GL.createDiv('gl-gallery-item');
    galleryItem.id = itemId;

    var itemTitle = GL.createDiv('gl-item-title');
    itemTitle.textContent = "{{Item Title}}";
    galleryItem.appendChild(itemTitle);

    var itemImg = GL.createImg(imgSrc, 'gl-item-image');
    galleryItem.appendChild(itemImg);

    var itemControls = GL.createDiv('gl-item-controls');
    galleryItem.appendChild(itemControls);

    var showImgBtn = GL.createBtn('Edit', itemId, 'gl-edit-btn');
    itemControls.appendChild(showImgBtn);

    var closeBtn = GL.createBtn('Remove', itemId, 'gl-remove-btn');
    itemControls.appendChild(closeBtn);

    return galleryItem;
};


GL.getImageUrl = function getImageUrl() {
    var searchResults = document.getElementById('search-results').value;
    var xhr = new XMLHttpRequest();
    xhr.open('get', 'http://localhost:5000/search/'+searchResults, true);
    xhr.onload = GL.handleServerResponse;
    xhr.send();
};

GL.clearAllImages = function clearAllImages() {
    var container = $('.gl-items-container').empty();
};

//GL.errorNoItemsFound = function errorNoItemsFound () {
//    var errStr = 'Sorry, no items with '+document.getElementById('search-results').value + ' found! Please try your magic again...';
//      GL.cont.appendChild(document.createElement);
//    // TODO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//};

GL.handleServerResponse = function handleServerResponse (gotFromServer) {
    var response = gotFromServer.target.response;
    var responseInJson;
    var error = 0;
    try {
        responseInJson = JSON.parse(response);
    }
    catch (err) {
        error = 1;
    }

    if (responseInJson.length === 0){
        error = 1;
    }

    if (error === 1) {
//        GL.errorNoItemsFound();
        return;
    }
    GL.jsonItems = responseInJson;
    GL.addMoreImages();
};

GL.addMoreImages = function addMoreImages () {
    for (GL.idxShown; GL.idxShown < GL.numToPresentAt1Time && GL.idxShown < GL.jsonItems.length; GL.idxShown++) {
        GL.cont.appendChild(GL.createItem(GL.jsonItems[GL.idxShown].imgUrl, GL.idxShown));
    }
    GL.numToPresentAt1Time+=GL.idxShown;
    GL.changeStatusBar();
};

GL.addClass = function addClass(whereToAdd, classToAdd) {
    $(whereToAdd).addClass("blue");
};

GL.changeStatusBar = function changeStatusBar() {
    if (GL.idxShown > GL.jsonItems.length) {
        return;
    }
    GL.statusBar = GL.idxShown / GL.jsonItems.length;
    document.getElementById('progress-inner').style.width = GL.statusBar*100 +'%';
};

GL.init = function init() {
    GL.cont = document.querySelector('.gl-items-container');
//    [1,2,3,4].forEach(function (item) {
//        GL.cont.appendChild(GL.createItem('http://dummyimage.com/200x142/000/00ff48', item));
//    });
    document.body.onclick = GL.deligationOnBody;
};


GL.init();
//window.onload = function () {
//    GL.init();
//};