mocha.setup('bdd');
let assert = chai.assert;

describe("checkBrackets", () => {
    it("case.Undefined",function() {
        assert.equal(checkBrackets(undefined), '-1')
    })
    it("case.Nan", () => assert.equal(checkBrackets(NaN), '-1'))
    it("case { () }", function() {
        assert.equal(checkBrackets('()'), '0');
    });
    it("case { ()()()()()()() }", function() {
        assert.equal(checkBrackets('()()()()()()()'), '0');
    });
    it("case { ()()()()() }", function() {
        assert.equal(checkBrackets('()()()()()'), '0');
    });
    it("case { ([ }", function() {
        assert.equal(checkBrackets('()()()()()()'), '0');
    });
    it("case { ((((((((((hi)))))))))) }", function() {
        assert.equal(checkBrackets('((((((((((hi))))))))))'), '0');
    });
    it("case { ( ( ( ( ( ( ( }", function() {
        assert.equal(checkBrackets('( ( ( ( ( ( ('), '7');
    });
    it("case { (1) (2) (3) (4) }", function() {
        assert.equal(checkBrackets('(1) (2) (3) (4)'), '0');
    });
    it("case { )1( )2( }", function() {
        assert.equal(checkBrackets(')1( )2('), '2');
    });
    it("fail1",function() {
        assert.equal(checkBrackets('string'), '0')
    })
    it("fail2",function() {
        assert.equal(checkBrackets(22), '0')
    })
    it("fail3",function() {
        assert.equal(checkBrackets(null), '0')
    })
    it("fail4", function() {
        assert.equal(checkBrackets('() )('), '0');
    });
    it("fail5", function() {
        assert.equal(checkBrackets('()()str(str))'), '0');
    });
});

mocha.run();
