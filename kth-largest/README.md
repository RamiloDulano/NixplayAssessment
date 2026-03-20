# Kth Largest Element Finder

## Overview

This project implements an efficient algorithm to find the kth largest element in an unsorted array using the Quickselect technique. The solution avoids full sorting and achieves linear time complexity on average, making it suitable for large input sizes.

---

## Approach

The implementation is based on Quickselect, a selection algorithm derived from Quicksort.

Key idea:

* The kth largest element is equivalent to the (n - k)th smallest element.
* The algorithm partitions the array around a pivot and recursively processes only the relevant partition.

To reduce the likelihood of worst-case performance, a random pivot is used.

---

## Complexity

Time Complexity:

* Average: O(n)
* Worst case: O(n^2)

Space Complexity:

* O(1), in-place operation

---

## Edge Case Handling

The implementation explicitly handles:

* Empty input array
* Invalid values of k (k < 1 or k > n)
* Arrays with duplicate elements
* k = 1 (maximum element)
* k = n (minimum element)

---

## Project Structure

```
kth-largest/
├── src/
│   └── findKthLargest.js
├── test/
│   └── findKthLargest.test.js
├── index.js
├── package.json
└── README.md
```

---

## Usage

Example:

```
findKthLargest([3, 2, 1, 5, 6, 4], 2)  // 5
findKthLargest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)  // 4
```

Run:

```
node index.js
```

---

## Testing

Tests are implemented using Node.js built-in assert module.

Run:

```
node test/findKthLargest.test.js
```

---

## Design Considerations

* Avoids Array.sort() to meet performance constraints
* Uses in-place partitioning to minimize memory usage
* Keeps logic modular for maintainability and testing
* Randomized pivot selection to improve practical performance

---

## Alternative Approach

A min-heap of size k can also be used:

* Time complexity: O(n log k)
* Space complexity: O(k)

This approach is simpler but less optimal for large datasets compared to Quickselect.

---

## Conclusion

This implementation provides a balance between performance and simplicity, achieving linear average time complexity while maintaining clean and testable code structure.


## Testing

Tests are implemented using Node.js built-in `assert` module.

### Run Tests

You can run tests in two ways:

**Option 1: Using Node directly**

```
node test/findKthLargest.test.js
```

**Option 2: Using npm script**

```
npm test
```

### Prerequisites

* Ensure Node.js is installed (v14 or higher recommended)
* No external dependencies are required

### Expected Output

Each test case will display detailed input, expected output, and actual result.

Example:

```
Test: Basic case
Input: nums = [3,2,1,5,6,4], k = 2
Expected: 5
Actual:   5
Result: PASS
```

If all tests pass, execution will complete without errors.

If any test fails:

* The failing case will be displayed
* Execution will stop with an assertion error
