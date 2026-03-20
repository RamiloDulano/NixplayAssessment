/**
 * Finds the kth largest element using Quickselect.
 */
const findKthLargest = (nums, k) => {
  if (!Array.isArray(nums) || nums.length === 0) return null;
  if (k < 1 || k > nums.length) return null;

  const targetIndex = nums.length - k;

  const partition = (left, right) => {
    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
    [nums[pivotIndex], nums[right]] = [nums[right], nums[pivotIndex]];

    const pivot = nums[right];
    let storeIndex = left;

    for (let i = left; i < right; i++) {
      if (nums[i] < pivot) {
        [nums[i], nums[storeIndex]] = [nums[storeIndex], nums[i]];
        storeIndex++;
      }
    }

    [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]];
    return storeIndex;
  };

  const quickSelect = (left, right) => {
    if (left === right) return nums[left];

    const pivotIndex = partition(left, right);

    if (pivotIndex === targetIndex) return nums[pivotIndex];
    if (pivotIndex < targetIndex) return quickSelect(pivotIndex + 1, right);
    return quickSelect(left, pivotIndex - 1);
  };

  return quickSelect(0, nums.length - 1);
};

module.exports = findKthLargest;