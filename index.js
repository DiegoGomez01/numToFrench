const arrayBase = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
const arrayTen = ['vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];

const objectDivisions = {
  milliard: 1000000000,
  million: 1000000,
  mille: 1000,
  cent: 100,
};

const country = 'fr';
const numbersToConvert = [0, 1, 5, 10, 11, 15, 20, 21, 30, 35, 50, 51, 68, 70, 75, 99, 100, 101, 105, 111, 123, 168, 171, 175, 199, 200, 201, 555, 999, 1000, 1001, 1111, 1199, 1234, 1999, 2000, 2001, 2020, 2021, 2345, 9999, 10000, 11111, 12345, 123456, 654321, 999999];
const result = [];

numbersToConvert.forEach(number => {
  result.push(convertNumberToFrench(number));
});

console.log(result);

function convertNumberToFrench(number){
  // If the number is less than 20, directly retrieve the corresponding word from arrayBase
  if(number < 20) {
    return arrayBase[number];
  }
  let leftValue = '';
  let rightValue = '';
  for (const [key, value] of Object.entries(objectDivisions)) {
    // If the division is applicable, that's means the number is a milliard, million, mille or cent
    if (Math.floor(number / value) >= 1) {
      const divisionResult = Math.floor(number / value);
      const divisionRest = number % value;
      // Recursively call itself for the left side of the number
      leftValue = `${convertNumberToFrench(divisionResult)} `;

      // Remove the left value if it's 'un'
      if(leftValue === 'un ') {
        leftValue = '';
      }

      // Recursively call itself for the right side of the number
      rightValue = convertNumberToFrench(divisionRest);
      rightValue = conditionsRightValue(rightValue, ' ')
      return `${leftValue}${key}${rightValue}`;
    }
  }
  // Conditions for numbers between 71 and 79
  if (number >= 71 && number <= 79) {
    const remainder = number-60;
    return `${arrayTen[4]}-${arrayBase[remainder]}`;
  }
  // Operations for number between 20 and 99
  const quotient = Math.floor(number / 10);
  const remainder = number % 10;
  rightValue = conditionsRightValue(arrayBase[remainder], '-', 'dix')
  return `${arrayTen[quotient - 2]}${quotient >= 80 ? 's' : ''}${rightValue}`;
}

function conditionsRightValue(number, separator, base=''){
  let valueToReturn = '';
  if (number !== 'zéro') {
    valueToReturn = `${separator}${number}`;
  }
  if (number === 'un' && base === 'dix') {
    valueToReturn = `-et${separator}${number}`;
  }
  return valueToReturn;
}