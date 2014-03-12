// expRec1, expRec2
var expRec1 = function(b, n) {
  return n === 0 ? 1 : (b * expRec1(b, n - 1));
};

var expRec2 = function(b, n) {
  if (n === 0) {
    return 1;
  }

  if (n % 2 === 0) {
    var subAnswer = expRec2(b, n / 2);
    return subAnswer * subAnswer;
  } else {
    var subAnswer = expRec2(b, ((n - 1) / 2));
    return subAnswer * subAnswer * b;
  }
};

var fibonacci = function(n) {
  if (n === 0) {
    return [];
  } else if (n === 1) {
    return [0];
  } else if (n === 2) {
    return [0, 1];
  } else {
    var fibs = fibsRec(n - 1);
    fibs.push(fibs[fibs.length - 1] + fibs[fibs.length - 2]);

    return fibs;
  }
};

var bsearch = function(numbers, target) {
  if (numbers.length === 0) {
    return -1;
  } else if ((numbers.length === 1) && (numbers[0] != target)) {
    return -1;
  }

  var probe_index = Math.floor(numbers.length / 2);
  var probe = numbers[probe_index];
  if (target === probe) {
    return probe_index;
  } else if (target < probe) {
    var left = numbers.slice(0, probe_index);
    return bsearch(left, target);
  } else {
    var right = numbers.slice(probe_index + 1);
    var subproblem = bsearch(right, target);

    return subproblem === -1 ? subproblem : subproblem + probe_index;
  }
};

var makeChange = function(target, coins) {
  if (target === 0) {
    return [];
  }

  var bestChange = null;

  var reverseSorter = function (a, b) {
    if (a < b) {
      return 1
    } else if (a > b) {
      return -1
    } else {
      return 0
    }
  };

  coins.sort(reverseSorter).forEach(function(coin, index) {
    if (coin > target) {
      return;
    }

    var remainder = target - coin;
    var restChange = makeChange(remainder, coins.slice(index));

    var change = [coin].concat(restChange);
    if (!bestChange || (change.length < bestChange.length)) {
      bestChange = change;
    }
  });

  return bestChange;
};

var merge = function(left, right) {
  var merged = [];

  while (left.length > 0 && right.length > 0) {
    var nextItem = (left[0] < right[0]) ? left.shift() : right.shift();
    merged.push(nextItem);
  }

  return merged.concat(left).concat(right);
};

var mergeSort = function(array) {
  if (array.length < 2) {
    return array;
  } else {
    var middle = Math.floor(array.length / 2);

    var left = mergeSort(array.slice(0, middle));
    var right = mergeSort(array.slice(middle));

    return merge(left, right);
  }
};

var subsets = function(array) {
  if (array.length === 0) {
    return [[]];
  }

  var lastElement = array[0];
  var subSubsets = subsets(array.slice(1));

  var newSubsets = subSubsets.map(function(subSubset) {
    return subSubset.concat(lastElement);
  });

  return newSubsets.concat(subSubsets);
};