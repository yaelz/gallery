"use strict";

function setup(){
    document.body.innerHTML = '<div>ABC</div>';
}

//setup();
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
            console.log(div.nodes[0].element.getAttribute('data-name'));
            div.removeAttr('data-name');
            console.log(div.nodes[0].element.getAttribute('data-name'));
            expect(div.hasAttr('data-name')).toEqual(false);
        });
    });


});