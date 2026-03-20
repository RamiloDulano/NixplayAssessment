const assert = require("assert");
const LRUCache = require("../src/LRUCache");

// Helper logger
function logStep(step, message) {
  console.log(`\n[STEP ${step}] ${message}`);
}

function logResult(expected, actual) {
  console.log(`   → Expected: ${expected}, Got: ${actual}`);
}

// ==========================
// LRU TEST
// ==========================
(function testLRU() {
  console.log("\n===== LRU BEHAVIOR TEST =====");

  const cache = new LRUCache(2);

  logStep(1, "Insert key=1, value=1");
  cache.put(1, 1);

  logStep(2, "Insert key=2, value=2");
  cache.put(2, 2);

  logStep(3, "Access key=1 (should be most recently used)");
  let result = cache.get(1);
  logResult(1, result);
  assert.strictEqual(result, 1);

  logStep(4, "Insert key=3 (should evict least recently used key=2)");
  cache.put(3, 3);

  logStep(5, "Check key=2 (should be evicted)");
  result = cache.get(2);
  logResult(-1, result);
  assert.strictEqual(result, -1);

  logStep(6, "Insert key=4 (should evict key=1)");
  cache.put(4, 4);

  logStep(7, "Check key=1 (should be evicted)");
  result = cache.get(1);
  logResult(-1, result);
  assert.strictEqual(result, -1);

  logStep(8, "Check key=3 (should exist)");
  result = cache.get(3);
  logResult(3, result);
  assert.strictEqual(result, 3);

  logStep(9, "Check key=4 (should exist)");
  result = cache.get(4);
  logResult(4, result);
  assert.strictEqual(result, 4);

  console.log("\nLRU test passed ");
})();

// ==========================
// TTL TEST
// ==========================
(function testTTL() {
  console.log("\n===== TTL EXPIRATION TEST =====");

  const cache = new LRUCache(2);

  logStep(1, "Insert key=1 with TTL=100ms");
  cache.put(1, 100, 100);

  logStep(2, "Immediately fetch key=1 (should exist)");
  let result = cache.get(1);
  logResult(100, result);
  assert.strictEqual(result, 100);

  logStep(3, "Wait 150ms for expiration...");

  setTimeout(() => {
    logStep(4, "Fetch key=1 after expiration");
    const expiredResult = cache.get(1);
    logResult(-1, expiredResult);
    assert.strictEqual(expiredResult, -1);

    console.log("\nTTL expiration test passed ");
  }, 150);
})();

// ==========================
// UPDATE TEST
// ==========================
(function testUpdateTTL() {
  console.log("\n===== UPDATE VALUE TEST =====");

  const cache = new LRUCache(2);

  logStep(1, "Insert key=1 with value=1");
  cache.put(1, 1, 1000);

  logStep(2, "Update key=1 with new value=2");
  cache.put(1, 2, 1000);

  logStep(3, "Fetch key=1 (should return updated value)");
  const result = cache.get(1);
  logResult(2, result);
  assert.strictEqual(result, 2);

  console.log("\nUpdate test passed ");
})();

// ==========================
// CAPACITY ZERO TEST
// ==========================
(function testCapacityZero() {
  console.log("\n===== CAPACITY ZERO TEST =====");

  const cache = new LRUCache(0);

  logStep(1, "Try inserting into capacity=0 cache");
  cache.put(1, 1);

  logStep(2, "Fetch key=1 (should not exist)");
  const result = cache.get(1);
  logResult(-1, result);
  assert.strictEqual(result, -1);

  console.log("\nCapacity zero test passed ");
})();

// ==========================
// INVALID TTL TEST
// ==========================
(function testInvalidTTL() {
  console.log("\n===== INVALID TTL TEST =====");

  const cache = new LRUCache(2);

  logStep(1, "Insert key=1 with negative TTL (invalid)");
  cache.put(1, 1, -100);

  logStep(2, "Fetch key=1 (should not exist)");
  const result = cache.get(1);
  logResult(-1, result);
  assert.strictEqual(result, -1);

  console.log("\nInvalid TTL test passed ");
})();