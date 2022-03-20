export function getAnswer(one, two, operation) {
  one = isNaN(parseInt(one)) ? 0 : parseInt(one);
  two = isNaN(parseInt(two)) ? 0 : parseInt(two);
  switch (operation) {
    case "+":
      return one + two;
    case "-":
      return Math.max(one, two) - Math.min(one, two);
    case "*":
      return one * two;
    case "/":
      return one / two;
  }
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max) + 1;
}

export function getOperation(operation) {
  const operations = ["+", "-", "*", "/"];
  if (operation === "all") {
    return operations[getRandomInt(3)];
  } else return operation;
}
