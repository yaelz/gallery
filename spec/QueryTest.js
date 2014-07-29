
function setup(){
    document.body.innerHTML = '<div>ABC</div>';
}

setup();

describe("Queries Tests", function() {
    describe("addClass", function() {
        it("should return true", function() {
            expect($('body') instanceof jDOMCollection).toEqual(true);
        });

        it("should add class", function() {
            $('div').nodes[0].addClass('hello');
            var className = $('div').nodes[0].element.className;
            expect(className).toEqual('hello');
        });

        it("should remove class", function() {
            $('div').nodes[0].addClass('hello');
            $('div').nodes[0].removeClass('hello');
            var className = $('div').nodes[0].element.className;
            expect(className).toEqual('');
        });
    });
});