function* yielder(value) {
    return (yield value);
}

exports.yieldStar = function* yieldStar(log) {
    try {
        let sum = 0;
        while (true) {
            log.push('yield');
            sum += yield* yielder(sum);
        }
    } finally {
        log.push('finally');
    }
};
