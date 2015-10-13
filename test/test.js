var assert = require("assert"),
    p = require("../p");

describe("p", function(){
    describe("#isPrime", function(){
        it("Should be resilient to bad inputs", function(){
            assert.throws(function(){ return p("foo"); }, Error, "Resilient to string");
            assert.throws(function(){ return p({}); }, Error, "Resilient to object");
            assert.throws(function(){ return p(-10); }, Error, "Resilient to negative number");
            assert.throws(function(){ return p([1,4,2]); }, Error, "Resilient to array");
            assert.throws(function(){ return p(undefined); }, Error, "Resilient to undefined");
            assert.throws(function(){ return p(null); }, Error, "Resilient to null");
        });
        it("Should return false for non-prime numbers", function(){
            assert.equal(p(1).isPrime, false);
            assert.equal(p(10*10).isPrime, false);
            assert.equal(p(1234).isPrime, false);
            assert.equal(p(1234567890).isPrime, false);
            assert.equal(p(12345678901).isPrime, false, "Testing on >2^32 number");
        });
        it("Should return true for prime numbers", function(){
            assert.equal(p(2).isPrime, true);
            assert.equal(p(17).isPrime, true);
            assert.equal(p(999983).isPrime, true);
            assert.equal(p(Math.pow(2,31)-1).isPrime, true);
        });
    });
    describe("#pFactors", function(){
        it("Should be solely itself for prime numbers", function(){
            assert.deepEqual(p(2).pFactors, [2]);
            assert.deepEqual(p(17).pFactors, [17]);
            assert.deepEqual(p(999983).pFactors, [999983]);
            assert.deepEqual(p(Math.pow(2,31)-1).pFactors, [Math.pow(2,31)-1]);
        });
        it("Should give known prime factors", function(){
            assert.deepEqual(p(12345678901).pFactors, [857, 14405693]);
            assert.deepEqual(p(12345678901).pFactors, [857, 14405693]);
        });
    })
});
