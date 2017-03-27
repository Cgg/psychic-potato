# Psychic Potato

## Run the level tests

`$ node test-runner.js tests/levels.t.js`

## More information

I used nodeJS (latest stable version) to implement the solutions.

The solution to each level is located in the level directory as
`level<number>.js`.

Code shared and reused amongst the three levels is at the root of the directory.

Tests files are located under the `tests` folders and can be run with the
`run-all-test` shell script. It simply looks for all files ending in `.t.js` and
passes them through `test-runner.js`, a crude little ad-hoc test runner.

One can run a specific test file directly like thusly: `$ node test-runner.js <test-file>`

The three levels are validated by one test driver, located under
`tests/levels.t.js`.

## Note

In the level 3, output.json implies that when applying a percentage discount to
a price, the computed discount (`price * percentage`) should be rounded up.
