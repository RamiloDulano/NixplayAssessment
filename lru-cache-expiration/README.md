# LRU Cache with Expiration

## Overview

This project implements an efficient **LRU (Least Recently Used) Cache** with an additional **expiration (TTL)** feature using Node.js. The cache supports constant-time `get` and `put` operations and automatically handles expired entries during access.

The solution uses a combination of a **hash map** and a **doubly linked list** to maintain both fast lookup and usage order.

---

## Approach

The implementation combines two data structures:

* **Hash Map** → O(1) access to cache entries
* **Doubly Linked List** → O(1) insertion, deletion, and recency updates

### Key Ideas

* The most recently used item is moved to the **head**
* The least recently used item is removed from the **tail**
* Each entry can have an optional **TTL (time-to-live)**
* Expired entries are removed **lazily during access (`get`)**

---

## Complexity

### Time Complexity

* `get` → O(1)
* `put` → O(1)

### Space Complexity

* O(n), where *n = capacity of the cache*

---

## Edge Case Handling

The implementation explicitly handles:

* Capacity = 0 (cache disabled)
* Invalid or missing keys
* Negative TTL values (ignored)
* Expired entries during access
* Updating existing keys
* Rapid insertions causing eviction

---

## Project Structure

lru-cache-expiration/
├── src/
│   └── LRUCache.js
├── test/
│   └── LRUCache.test.js
├── package.json
└── README.md

---

## Usage

### Example

const LRUCache = require('./src/LRUCache');

const cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2, 1000);

console.log(cache.get(1)); // 1
console.log(cache.get(2)); // 2 (if not expired)

cache.put(3, 3);

console.log(cache.get(2)); // -1 (evicted or expired)

### Run

node index.js

---

## Testing

Tests are implemented using Node.js built-in `assert` module.

### Run Tests

You can run tests in two ways:

Option 1: Using Node directly
node test/LRUCache.test.js

Option 2: Using npm script
npm test

---

## Design Considerations

* Uses `Map` for reliable O(1) operations
* Uses dummy head/tail nodes to simplify edge-case handling
* Lazy expiration avoids overhead of timers or schedulers
* Maintains strict O(1) performance for both operations
* Clean separation between internal helpers and public API

---

## Alternative Approach

### Min-Heap for Expiration

* Time complexity: O(log n)
* Better for bulk expiration handling
* More complex implementation

### Periodic Cleanup

* Use `setInterval` to remove expired entries
* Simpler but less efficient and less precise

---

## Conclusion

This implementation efficiently combines **LRU eviction** with **TTL-based expiration** while maintaining constant-time operations. The design balances performance, simplicity, and maintainability, making it suitable for real-world caching scenarios.

---

## Expected Output (Testing)

Each test case displays:

* Operation being performed
* Expected result
* Actual result

Example:

[STEP 3] Access key=1
Expected: 1
Actual:   1
Result: PASS

---

## Prerequisites

* Node.js v14 or higher
* No external dependencies required
