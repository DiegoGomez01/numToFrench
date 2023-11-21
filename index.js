const arrayBase = ['zero', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
const arrayTen = ['vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];

const objectDivisions = {
  milliard: 1000000000,
  million: 1000000,
  mille: 1000,
  cent: 100,
};

const country = 'fr';
const numbersToConvert = [999999];
const result = [];

numbersToConvert.forEach(number => {
  result.push(convertNumberToFrench(number));
});

console.log(result);

function convertNumberToFrench(number){
  if(number < 20) {
    return arrayBase[number];
  }
  for (const [key, value] of Object.entries(objectDivisions)) {
    if (Math.floor(number / value) >= 1) {
      const divisionResult = Math.floor(number / value);
      const divisionRest = number % value;
      let leftValue = `${convertNumberToFrench(divisionResult)} `;
      if(leftValue === 'un ') {
        leftValue = '';
      }
      let rightValue = convertNumberToFrench(divisionRest);
      if (rightValue === 'zero') {
        rightValue = '';
      }
      return `${leftValue}${key} ${rightValue}`;
    }
  }
  // Number Between 20 and 99
  const quotient = Math.floor(number / 10);
  const remainder = number % 10;
  return `${arrayTen[quotient - 2]}${quotient >= 80 ? 's' : ''} ${arrayBase[remainder]}`;
}