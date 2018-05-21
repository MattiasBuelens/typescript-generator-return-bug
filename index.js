const assert = require('assert');
const js = require('./js/index');
const babel = require('./babel/index');
const ts = require('./ts/index');

function test(name, fn) {
    try {
        const log = [];
        const gen = fn(log);
        assert.deepStrictEqual(gen.next(), {done: false, value: 0});
        assert.deepStrictEqual(log, ['yield']);
        assert.deepStrictEqual(gen.next(10), {done: false, value: 10});
        assert.deepStrictEqual(log, ['yield', 'yield']);
        assert.deepStrictEqual(gen.next(20), {done: false, value: 30});
        assert.deepStrictEqual(log, ['yield', 'yield', 'yield']);
        assert.deepStrictEqual(gen.return(), {done: true, value: undefined});
        assert.deepStrictEqual(log, ['yield', 'yield', 'yield', 'finally']);

        console.log(`Test ${name} passed`);
        return 0;
    } catch (e) {
        console.error(`Test ${name} failed\n`, e);
        return 1;
    }
}

function suite(suiteName, fnMap) {
    let errors = 0;
    for (let testName of Object.keys(fnMap)) {
        errors += test(`${suiteName}:${testName}`, fnMap[testName]);
    }
    return errors;
}

let errors = 0;
errors += suite('native', js);
errors += suite('babel', babel);
errors += suite('typescript', ts);
process.exit(errors);
