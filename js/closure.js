exports.closure = function* closure(log) {
    try {
        let sum = 0;
        while (true) {
            const value = 'value';
            const fn = () => value;
            log.push('yield');
            sum += yield sum;
        }
    } finally {
        log.push('finally');
    }
};
