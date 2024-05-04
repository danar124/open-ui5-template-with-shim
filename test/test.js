let fAddValue = (a) => {
  return a + 1;
};

let fMap = (a, b) => {
  let aArray = [];
  b.forEach((item) => {
    aArray.push(a(item));
  });
  return aArray;
};

let aInput = [1, 2, 3, 4, 5];
console.log(fMap(fAddValue, aInput));

console.log(aInput.map(fAddValue));
