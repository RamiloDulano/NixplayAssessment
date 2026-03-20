/**
 * LRU Cache with TTL (expiration)
 *
 * Time Complexity:
 * - get: O(1)
 * - put: O(1)
 *
 * Space Complexity:
 * - O(capacity)
 */

class Node {
  constructor(key, value, expireAt = null) {
    this.key = key;
    this.value = value;
    this.expireAt = expireAt; // timestamp or null
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    if (!Number.isInteger(capacity) || capacity < 0) {
      throw new Error("Capacity must be a non-negative integer");
    }

    this.capacity = capacity;
    this.map = new Map();

    // Dummy head & tail
    this.head = new Node(null, null);
    this.tail = new Node(null, null);

    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  // --- Internal Helpers ---

  _addNode(node) {
    // Always add right after head (most recent)
    node.next = this.head.next;
    node.prev = this.head;

    this.head.next.prev = node;
    this.head.next = node;
  }

  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _moveToHead(node) {
    this._removeNode(node);
    this._addNode(node);
  }

  _popTail() {
    const node = this.tail.prev;
    this._removeNode(node);
    return node;
  }

  _isExpired(node) {
    return node.expireAt !== null && Date.now() > node.expireAt;
  }

  // --- Public Methods ---

  get(key) {
    if (!this.map.has(key)) return -1;

    const node = this.map.get(key);

    // Handle expiration
    if (this._isExpired(node)) {
      this._removeNode(node);
      this.map.delete(key);
      return -1;
    }

    this._moveToHead(node);
    return node.value;
  }

  put(key, value, ttl) {
    if (this.capacity === 0) return;

    if (typeof key === "undefined") return;

    let expireAt = null;

    if (ttl !== undefined) {
      if (typeof ttl !== "number" || ttl < 0) return;
      expireAt = Date.now() + ttl;
    }

    if (this.map.has(key)) {
      const node = this.map.get(key);

      node.value = value;
      node.expireAt = expireAt;

      this._moveToHead(node);
    } else {
      const newNode = new Node(key, value, expireAt);

      this.map.set(key, newNode);
      this._addNode(newNode);

      if (this.map.size > this.capacity) {
        const tail = this._popTail();
        this.map.delete(tail.key);
      }
    }
  }
}

module.exports = LRUCache;