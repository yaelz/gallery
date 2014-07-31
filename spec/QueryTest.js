"use strict";

function setup(){
    document.body.innerHTML = '<div>ABC</div>';
}

var div;

describe("Queries Tests", function() {

    beforeEach(function() {
        setup();
        div = $('div');
    });

    describe("addClass function", function() {
        it("should return true for instanceof jDOMCollection", function() {
            expect($('body') instanceof jDOMCollection).toEqual(true);
        });

        it("should add class to jDOM item", function() {
            div.nodes[0].addClass('hello');
            var className = div.nodes[0].element.className;
            expect(className).toEqual('hello');
        });

        it("should remove class from jDOM item", function() {
            div.nodes[0].addClass('hello');
            div.nodes[0].removeClass('hello');
            var className = div.nodes[0].element.className;
            expect(className).toEqual('');
        });
    });

    describe("functions on all elements", function() {

        it("each function - should add class newclass for all elements", function() {
            div.each(function () {
                this.addClass('newclass');
            });
            expect(div.nodes[0].element.className).toEqual('newclass');
        });

        it("hasClass should return true", function() {
            div.each(function () {
                this.addClass('newclass');
            });
            expect(div.hasClass('newclass')).toEqual(true);
        });

        it("toggleClass should add class and then remove it", function() {
            expect(div.hasClass('newclass')).toEqual(false);
            div.toggleClass('newclass');
            expect(div.hasClass('newclass')).toEqual(true);
            div.toggleClass('newclass');
            expect(div.hasClass('newclass')).toEqual(false);
        });

        it("addAttr should add the attribute", function() {
            div = $('div');
            div.addAttr('data-name', 'my-div');
            expect(div.nodes[0].element.getAttribute('data-name')).toEqual('my-div');
        });

        it("removeAttr should remove the attribute", function() {
            div.addAttr('data-name', 'hello');
            div.removeAttr('data-name');
            expect(div.nodes[0].element.getAttribute('data-name')).toEqual(null);
        });

        it("hasAttr should return true after adding an attribute", function() {
            div.addAttr('data-name', 'hi');
            expect(div.hasAttr('data-name')).toEqual(true);
            div.removeAttr('data-name');
            expect(div.hasAttr('data-name')).toEqual(false);
        });

        it("size should return the number of elements in the jDOM collection", function() {
            expect(div.size()).toEqual(1);
        });


        it("remove should remove all child nodes of the set of matched elements from the DOM", function() {
            div.remove();
            expect(document.body.innerHTML).toEqual('');

        });

        it("clone should create a deep copy of the set of matched elements", function() {
            expect(div.clone(true)).not.toBe(div);
            expect(div.clone(true).nodes[0].element.innerHTML).toEqual(div.nodes[0].element.innerHTML);
        });

        it("text should get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements", function() {
            expect(div.text()).toEqual(div.nodes[0].element.textContent);
            div.text('abc');
            expect(div.nodes[0].element.textContent).toEqual('abc');
        });

        it("html should get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element", function() {
            expect(div.html()).toEqual(div.nodes[0].element.innerHTML);
            var newInnerHtml = '<p>HI!</p>'
            div.html(newInnerHtml);
            expect(div.nodes[0].element.innerHTML).toEqual(newInnerHtml);
        });

        it("empty should remove all child nodes of the set of matched elements from the DOM", function() {
            var newInnerHtml = '<div><p>HI!</p></div>';
            div.html(newInnerHtml);
            div.empty();
            expect(div.nodes[0].element.outerHTML).toEqual('<div></div>');
        });

        it("eq should reduce the set of matched elements to the one at the specified index", function() {
            var html0 = '<div><p>Number0</p></div>';
            var html1 = '<div>Number1</div>';
            var html2 = '<div>Number2</div>';
            document.body.innerHTML=html0+html1+html2;
            expect($('div').eq(0).nodes[0].element.outerHTML).toEqual(html0);
            expect($('div').eq(-1).nodes[0].element.outerHTML).toEqual(html2);
            expect($('div').eq(4).nodes).toEqual([]);
        });

        it("first should reduce the set of matched elements to the first in the set", function() {
            var html0 = '<div><p>Number0</p></div>';
            var html1 = '<div>Number1</div>';
            var html2 = '<div>Number2</div>';
            document.body.innerHTML=html0+html1+html2;
            expect($('div').first().nodes.length).toEqual(1);
            expect($('div').first().nodes[0].element.outerHTML).toEqual(html0);
        });

        it("last should reduce the set of matched elements to the last in the set", function() {
            var html0 = '<div><p>Number0</p></div>';
            var html1 = '<div>Number1</div>';
            var html2 = '<div>Number2</div>';
            document.body.innerHTML=html0+html1+html2;
            expect($('div').last().nodes.length).toEqual(1);
            expect($('div').last().nodes[0].element.outerHTML).toEqual(html2);
        });

// TODO
//        it("append should insert the specified content as the last child of each element in the jQuery collection", function() {
//            var html0 = '<div><p></p></div>';
//            var html1 = '<a>Number1</a>';
//            document.body.innerHTML=html0;
//            expect(div.append(html1).html()).toEqual('<p></p><a>Number1</a>');
//        });
//
//        it("next should get the immediately following sibling of each element in the set of matched elements", function() {
//            var html0 = '<div><p></p></div>';
//            var html1 = '<a>Number1</a>';
//            document.body.innerHTML=html0+html1;
//            expect($('div').next().nodes[0].element.outerHTML).toEqual(html1);
//        });

    });


});