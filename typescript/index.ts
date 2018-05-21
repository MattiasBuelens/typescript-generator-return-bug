import assert = require('assert');
import basic from "./basic";
import closure from "./closure";
import yieldStar from "./yield-star";

function test(fn: (log: string[]) => IterableIterator<number>): number {
    try {
        const log: string[] = [];
        const gen = fn(log);
        assert.deepStrictEqual(gen.next(), {done: false, value: 0});
        assert.deepStrictEqual(log, ['yield']);
        assert.deepStrictEqual(gen.next(10), {done: false, value: 10});
        assert.deepStrictEqual(log, ['yield', 'yield']);
        assert.deepStrictEqual(gen.next(20), {done: false, value: 30});
        assert.deepStrictEqual(log, ['yield', 'yield', 'yield']);
        assert.deepStrictEqual(gen.return!(), {done: true, value: undefined});
        assert.deepStrictEqual(log, ['yield', 'yield', 'yield', 'finally']);

        console.log(`Test "${fn.name}" passed`);
        return 0;
    } catch (e) {
        console.error(`Test "${fn.name}" failed\n`, e);
        return 1;
    }
}

let errors = 0;
errors += test(basic);
errors += test(closure);
errors += test(yieldStar);
process.exit(errors);
