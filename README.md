# Technical Test - Philip Ingrey (Oct 2015)

This module exposes one function that when called on a positive number returns:

    isPrime - [Boolean] whether the integer is prime
    pFactors - [Array] a list of prime factors
    pFactorize - [Object] Where the keys are the prime factors and the values are their respective factor number 

## Testing

Tests use [mocha](http://mochajs.org/) and can be run with:

    npm install
    npm test

## Notes

### Algorithm

This code is based on the fact that if a number is not divisible by all the primes less than it's sqrt then the number is prime. By storing the discovered primes between runs large speed-ups can occur.

### Memory usage

The system saves the primes it has found to speed up future requests. A [rule of thumb](http://mathworld.wolfram.com/PrimeCountingFunction.html) for memory usage will be (if N is the largest tested number):

     16*(N^.5)/ln(N) Bytes

For large N, e.g. ~1.5GB for N=2^64
 
### Valid range

Over 2^53-1 javascripts number format breaks down for integers and a arbitrary precision module like [BigInteger](https://github.com/peterolson/BigInteger.js/) would need to be employed.
