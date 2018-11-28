Function.prototype.memoize = function() {
    var self = this;
    return function() {
        var args = Array.prototype.slice.call(arguments);
        self.cache = self.cache || {};
        return self.cache[args]
            ? self.cache[args]
            : (self.cache[args] = self(args));
    };
};
const {
    prototype: { memoize }
} = Function;

function sqrt(arg) {
    return Math.sqrt(arg);
}

function fibonacci(num) {
    if (num === 1 || num === 2) {
        return 1;
    }
    return fibonacci(num - 1) + fibonacci(num - 2);
}

memoize(sqrt);
for (let i = 0; i < 10; i++) {
    const num = i * i;

    console.time("non-memoized call");
    console.log(sqrt(num));
    console.timeEnd("non-memoized call");
    console.time("memoized call");
    console.log(sqrt(num));
    console.timeEnd("memoized call");
    console.log();
}

memoize(fibonacci);

console.log("profiling tests for fibonacci");
console.time("non-memoized call");
console.log(fibonacci(6));
console.timeEnd("non-memoized call");
console.time("memoized call");
console.log(fibonacci(6));
console.timeEnd("memoized call");
