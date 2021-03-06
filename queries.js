
//    function walkTheDOM(node, func) {
//        func(node);
//        node = node.firstChild;
//        while (node) {
//            walkTheDOM(node, func);
//            node = node.nextSibling;
//        }
//    }

    function jDomItem(element) {
        this.element = element;
    }

    jDomItem.prototype.addClass = function (className) {
        this.element.classList.add(className);
        return this;
    };


    jDomItem.prototype.removeClass = function (className) {
        this.element.classList.remove(className);
        return this;
    };

    jDomItem.prototype.hasClass = function (className) {
        return this.element.classList.contains(className);
    };

    jDomItem.prototype.hasAttr = function (attr) {
        return this.element.hasAttribute(attr);
    };

    jDomItem.prototype.addAttr = function (key, val) {
        this.element.setAttribute(key, val);
        return this;
    };

    jDomItem.prototype.removeAttr = function (key) {
        this.element.removeAttribute(key);
        return this;
    };

    jDomItem.prototype.html = function html (newInnerHTML) {
        this.element.innerHTML = newInnerHTML;
    };

    jDomItem.prototype.clone = function (isDeep) {
        var newEl = this.element.cloneNode(isDeep)
        return new jDomItem(newEl);
    };

    jDomItem.prototype.empty = function empty() {
        var currChild = this.element.firstChild;
        while (currChild) {
            this.element.removeChild(currChild);
            currChild = this.element.firstChild;
        }
        return this;
    };

//    jDomItem.prototype.next = function () {
//        return this.element.nextSibling;
//    };
    //////////////////////////////////////////////////////////////////////////////////
    /////////////////////////// Collection ///////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////

    function jDOMCollection(jDomItems) {
        this.nodes = jDomItems || [];
    }


    jDOMCollection.prototype.each = function (func) {
        this.nodes.forEach(function(node) {
            func.call(node, arguments);
        });
        return this;
    };

    jDOMCollection.prototype.hasClass = function (className) {;
        return this.nodes[0].hasClass(className);
    };

    jDOMCollection.prototype.toggleClass = function (className) {;
        this.each(function () {
            if (!this.hasClass(className)) {
                this.addClass(className);
            } else {
                this.removeClass(className);
            }
        });
        return this;
    };

//    jDOMCollection.prototype.hasAttr = function hasAttr(attr) {
//        return this.nodes[0].hasAttr(attr);
//    };

    jDOMCollection.prototype.addAttr = function addAttr(key, val) {;
        this.each(function () {
            this.addAttr(key, val);
        });
        return this;
    };

    jDOMCollection.prototype.removeAttr = function removeAttr(key) {;
        this.each(function () {
            this.removeAttr(key);
        });
        return this;
    };

    jDOMCollection.prototype.hasAttr = function hasAttr(attr) {;
        return this.nodes[0].hasAttr(attr);
    };

    jDOMCollection.prototype.size = function size() {
        return this.nodes.length;
    };

    jDOMCollection.prototype.remove = function remove() {
        this.each(function(){
            // TODO better to implement this in jDOMItem.remove?
            this.element.parentNode.removeChild(this.element);
        });
        return this;
    };

    jDOMCollection.prototype.text = function text(txt) {
        if (txt === undefined) {
            return (this.nodes[0] && this.nodes[0].element.textContent) || '';
        } else {
            this.each(function () {
                // TODO better to implement this in jDOMItem.text?
               this.element.textContent = txt;

            });
            return this;
        }
    };

    jDOMCollection.prototype.html = function html(html) {
        if (html === undefined) {
            return (this.nodes[0] && this.nodes[0].element.innerHTML) || '';
        } else {
            this.each(function () {
                // TODO better to implement this in jDOMItem.text?
                this.html(html);
            });
            return this;
        }
    };

    jDOMCollection.prototype.clone = function clone(isDeep) {
        //create new jDOMCollection
        //each on this - create a new jDOM Item and push it into the jDOMCollection nodes
        var newCollection = new jDOMCollection();
        this.each(function () {
            var newItem = this.clone(isDeep);
            newCollection.nodes.push(newItem);
        });
        return newCollection;
    };

    jDOMCollection.prototype.empty = function empty () {
        this.each(function () {
            this.empty();
        });
        return this;
    };

    jDOMCollection.prototype.eq = function eq (idx) {
        var idxToGet = this.nodes.length;
        (idx < 0) ? idxToGet+=idx : idxToGet=idx;
        var retColl;
        if (idxToGet >= 0 && idxToGet < this.nodes.length) {
            retColl = new jDOMCollection([this.nodes[idxToGet]]);
        } else {
            retColl = new jDOMCollection();
        }
        return retColl;
    };

    jDOMCollection.prototype.first = function first () {
        return (this.nodes[0] && new jDOMCollection([this.nodes[0]])) || new jDOMCollection();
    };

    jDOMCollection.prototype.last = function last () {
        var lastNodeIdx = this.nodes.length - 1;
        return (this.nodes[lastNodeIdx] && new jDOMCollection([this.nodes[lastNodeIdx]])) || new jDOMCollection();
    };

//    jDOMCollection.prototype.append = function append (stringInnerHtml) {
//        var newElem = document.createElement(stringInnerHtml);
//
//        return this;
//    };
//    jDOMCollection.prototype.next = function next () {
//        var newColl = new jDOMCollection();
//        this.each(function (){
//            console.log(this.outerHTML);
//            var next = this.next();
//            console.log(next.outerHTML);
//            newColl.nodes.push(next);
//        });
//        return newColl;
//    };

    jDOMCollection.prototype.map = function () {};
    jDOMCollection.prototype.filter = function () {};

    //////////////////////////////////////////////////////////////////////

    function $(selectorOrNode, root) {
        root = root || document;
        if (typeof selectorOrNode === 'string') {
            // TODO
//            if (selectorOrNode === '') {
//                return new jDomItem([]);
//            }
            var nlist = root.querySelectorAll(selectorOrNode);
            return new jDOMCollection($.nodeListToArrayOfjDomItems(nlist));
        } else {
            throw new Error('TODO: implement more modes');
        }
    }

    $.is_jDomEntity = function(thing){
        return thing instanceof jDomItem || thing instanceof jDOMCollection;
    };

    $.nodeListToArrayOfjDomItems = function(nodeList){
        return Array.prototype.map.call(nodeList, function (element) {
            return new jDomItem(element);
        });
    };

