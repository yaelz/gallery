
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
        return this.element.className.match(className) !== null;
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


    /////////////////////////// Collection ///////////////////////////////////////////

    function jDOMCollection(jDomItems) {
        this.nodes = jDomItems;
    }


    jDOMCollection.prototype.each = function (func) {
        this.nodes.forEach(function(node) {
            func.call(node);
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

    jDOMCollection.prototype.hasAttr = function (attr) {;
        return this.nodes[0].hasAttr(attr);
    };

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

