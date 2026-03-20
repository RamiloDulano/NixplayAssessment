const assert = require('assert');
const findKthLargest = require('../src/findKthLargest');

/**
 * Runs a test case with detailed logging
 */
const runTest = (description, nums, k, expected) => {
  console.log("--------------------------------------------------");
  console.log(`Test: ${description}`);
  console.log(`Input: nums = [${nums}], k = ${k}`);

  const result = findKthLargest([...nums], k); // clone to avoid mutation

  console.log(`Expected: ${expected}`);
  console.log(`Actual:   ${result}`);

  try {
    assert.strictEqual(result, expected);
    console.log("Result: PASS");
  } catch (error) {
    console.log("Result: FAIL");
    throw error; // stop execution on failure
  }
};

/**
 * Execute all tests
 */
console.log("\nRunning Kth Largest Element Tests...\n");

runTest("Basic case", [3, 2, 1, 5, 6, 4], 2, 5);
runTest("With duplicates", [3, 2, 3, 1, 2, 4, 5, 5, 6], 4, 4);
runTest("Single element", [1], 1, 1);
runTest("k = 1 (largest)", [7, 10, 4, 3, 20, 15], 1, 20);
runTest("k = n (smallest)", [7, 10, 4, 3, 20, 15], 6, 3);
runTest("Empty array", [], 1, null);
runTest("Invalid k", [1, 2, 3], 0, null);

console.log("\nAll tests completed successfully.\n");