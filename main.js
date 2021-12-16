// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];


// Add your functions below:
/*below function looks at the last i in arr and counts backwards. For each item
it checks if it is even or odd ((arr.length-1-i) % 2 === 1) ... the % is used to
divide a number an amount of times (in this case 2) and count the remainder (1)
if the number is 0, 2, 4, 6 etc it will skip to adding currentValue to the total
if the number is 1, 3, 5, 7 etc it will be doubled and have 9 removed if the 
total is greater than 9... Then it is added to the total.
finally the total is divided by 10 and if there are no leftover numbers after this
eg === 0; the function will evaluate to true, otherwise false if total % === 1; 
or any number other than 0
*/
const validateCred = (arr) => {

    let total = 0;

  for(let i = arr.length-1; i >= 0; i--) {

      let currentValue = arr[i]

      if ((arr.length - 1 - i) % 2 === 1) {

          currentValue *=2;

          if (currentValue > 9) {

              currentValue -= 9;
          }
      }

      total += currentValue;

  }
  
  return total % 10 === 0;
}


/* This function takes a placeholder (cards) and for each item in the array it 
will check the outcome of calling the validateCred function using the cards[i], 
the card at that position as a variable for validateCred. As the if function 
is looking for a true value we reverse it with ! , so that any card which returns
false through validateCred will count as 'true' and be pushed to the invalidCards array.
*/
const findInvalidCards = cards => {
  let invalidCards = [];
  for (let i = 0; i < cards.length; i++) {
      let currentCard = cards[i]
      if (!validateCred(currentCard)) {
        invalidCards.push(currentCard);
      }
    }
  
    return invalidCards;
  }
  
//console.log(findInvalidCards(batch));

/* This function checks each invalid card on the invalid card list (or individual cards). 
    And looks at the first number to determine which company it is from. It then pushes the result to companies.
    It will only push the result to companies if there is no other instance of that card ('string'),
    This is done by using -1 to represent no existing numbers eg !numbers. If the companies array has any 
    instances of that 'string' eg 'Amex' the switch statement will go to the break, move to the next case and then next card  */
const idInvalidCardCompanies = notValid => {
    const companies = [];
    for (let i = 0; i < notValid.length; i++){
      switch (notValid [i][0]){
        case 3:
        if (companies.indexOf('Amex') === -1){
          companies.push('Amex')
        }
        break
        case 4:
        if (companies.indexOf('Visa') === -1){
          companies.push('Visa')
        }
        break
        case 5:
        if (companies.indexOf('Mastercard') === -1){
          companies.push('Mastercard')
        }
        break
        case 6:
        if (companies.indexOf('Discover') === -1){
          companies.push('Discover')
        }
        break
        default:
        console.log('Company not found')
      }
    }
    return companies;
  }
  
  console.log(idInvalidCardCompanies([invalid1])); // Print['visa']
  console.log(idInvalidCardCompanies([invalid2])); // Print ['mastercard']
  console.log(idInvalidCardCompanies(batch)); // Companies mailed invalid cards