export default function* basic(log: string[]) {
    try {
        let sum = 0;
        while (true) {
            log.push('yield');
            sum += yield sum;
        }
    } finally {
        log.push('finally');
    }
}
