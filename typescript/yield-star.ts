function* yielder(value: number) {
    return (yield value);
}

export default function* yieldStar(log: string[]) {
    try {
        let sum = 0;
        while (true) {
            log.push('yield');
            sum += yield* yielder(sum);
        }
    } finally {
        log.push('finally');
    }
}
