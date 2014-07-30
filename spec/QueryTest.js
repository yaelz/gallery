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

        it("return the number of elements in the jDOM collection", function() {
            expect(div.size()).toEqual(1);
        });


        it("remove all child nodes of the set of matched elements from the DOM", function() {
            div.remove();
            expect(document.body.innerHTML).toEqual('');

        });

        it("Create a deep copy of the set of matched elements", function() {
            expect(div.clone(true)).not.toBe(div);
            expect(div.clone(true).nodes[0].element.innerHTML).toEqual(div.nodes[0].element.innerHTML);
        });

        it("Get the combined text contents of each element in the set of matched elements, including their descendants, or set the text contents of the matched elements", function() {
            expect(div.text()).toEqual(div.nodes[0].element.textContent);
            div.text('abc');
            expect(div.nodes[0].element.textContent).toEqual('abc');
        });

        it("Get the HTML contents of the first element in the set of matched elements or set the HTML contents of every matched element", function() {
            expect(div.html()).toEqual(div.nodes[0].element.innerHTML);
            var newInnerHtml = '<p>HI!</p>'
            div.html(newInnerHtml);
            expect(div.nodes[0].element.innerHTML).toEqual(newInnerHtml);
        });

        it("Remove all child nodes of the set of matched elements from the DOM", function() {
            var newInnerHtml = '<div><p>HI!</p></div>';
            div.html(newInnerHtml);
            div.empty();
            expect(div.nodes[0].element.outerHTML).toEqual('<div></div>');
        });

    });


});