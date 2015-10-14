p = (function(){
    "use strict";

    // Starting list of cached primes
    var primeList = [2,3,5,7,9,11],
    // Starting tested range, note this should be an odd number
        testedTo = 15;

    function findFirstFactor(n){
        // Given {n} finds the lowest factor of n, that isn't 1.
        // (this will be prime, as if it wasn't there should be a lower factor)
        // Returns: Lowest prime factor or {null} if {n} is prime

        if( n < 2 ) return undefined;
        // Quick to catch primes, low hanging fruit speed up
        if( n < 4 ) return null;

        // At this point, you could test if n is in primeList but this would generally only speed up
        // smaller numbers. Alternatively if you're really going for speed up employ a bloom filter
        // on primeList

        // The 0.001 stops floating point rounding errors due to MAth.sqrt
        var maxSearch = Math.floor(Math.sqrt(n)+0.001);


        // Check the primes we know about
        for(var i=0;i<primeList.length;i++){
            if( primeList[i] > maxSearch ){
                // No factor found - the number is prime
                return null;
            }

            if( n % primeList[i] == 0){
                // Factor found
                return primeList[i];
            }
        }


        if(maxSearch > testedTo){
            // We need process some more numbers to get our tested list to sqrt(n)
            // +=2 due to skipping even numbers
            for(var i=testedTo+1; i<=maxSearch; i+=2){
                testedTo=i;
                if(findFirstFactor(i) === null){
                    primeList.push(i);
                    if( n % i == 0){
                        // Factor found
                        return primeList[i];
                    }
                }
            }
        }

        // If it was not a prime, we would have found a factor by this point
        return null;
    }

    return function(n){
        if( isNaN(n) || typeof n !== "number" || !(n > 0) ){
            // n is not a number
            throw new Error("Expected a positive integer");
        }

        // Force the input to be an integer
        var m = parseInt(n,10),
            lf = findFirstFactor(m),
            out = {
                isPrime: false,
                pFactors: [],
                pFactorize: {}
            };

        // Because 1 is a special case
        if(n === 1){
            return out;
        }

        // If n is prime
        if(lf === null){
            out.isPrime = true;
            out.pFactors = [m];
            out.pFactorize[m] = 1;
            return out;
        }

        // If n isn't prime
        while(lf !== null){
            if(lf in out.pFactorize && out.pFactorize.hasOwnProperty(lf)){
                // Already in pFactorize, increase count
                out.pFactorize[lf]++;
            }else{
                // Not yet in pFactorize, add lf to pFactorize and pFactors
                out.pFactorize[lf] = 1;
                out.pFactors.push(lf);
            }

            // And roll around again
            m = m / lf;
            lf = findFirstFactor(m);
        }

        // Add in last value
        // TODO: abstract out as it's not DRY
        if(m in out.pFactorize && out.pFactorize.hasOwnProperty(m)){
            // Already in pFactorize, increase count
            out.pFactorize[m]++;
        }else{
            // Not yet in pFactorize, add lf to pFactorize and pFactors
            out.pFactorize[m] = 1;
            out.pFactors.push(m);
        }

        return out;

    };
})();

// CommonJS
if (typeof exports === "object" && typeof module === "object") {
        module.exports = p;
// <script>
} else if (typeof window !== "undefined" || typeof self !== "undefined") {
    // Prefer window to self
    var global = typeof window !== "undefined" ? window : self;

    // Save current p
    var previousP = global.p;
    global.p = p;

    // Add a noConflict function:
    global.p.noConflict = function () {
        global.p = previousP;
        return p;
    };

} else {
    throw new Error("Sorry, but you are using an unsupported environment, please request support.");
}
