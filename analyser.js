// analyser.js - Expense Analyser
const fs = require('fs');
const _ = require('lodash');   // installed in Step 1 with: npm install lodash (not used further)
// GIVEN: turns the text of the file into an array of objects
// like { category: 'food', amount: 250 }
const parseExpenses = (text) => {
  return text.trim().split('\n').map((line) => {
    const parts = line.trim().split(',');
    return { category: parts[0], amount: Number(parts[1]) };
  });
};
// ---------- Step 3: read the file synchronously ----------
console.time('sync read');
const text = fs.readFileSync('expenses.txt', 'utf8');
console.timeEnd('sync read');
const expenses = parseExpenses(text);
console.log('First expense:', expenses[0]);
// ---------- Step 4: higher-order functions ----------

// TODO: totalSpent - use reduce (initial value 0) to add up every amount
const totalSpent = expenses.reduce((total, e) => {
  return total + e.amount;
}, 0);

console.log('total spent:', totalSpent);

// TODO: bigExpenses - use filter to keep expenses with amount > 500
const bigExpenses = expenses.filter((e)=>{
  return e.amount>500;
});

console.log('Big expenses;', bigExpenses);

// TODO: withFee - use map to return NEW objects with a flat Rs 50 delivery fee
const withFee = expenses.map((e) => {
  return {
    ...e,
    amount: e.amount + 50
  };
});

console.log('Expenses with fee:', withFee);

//       added to the amount. Use the spread operator { ...e, amount: ... }
//       so the original objects are not changed.

// ---------- Step 5: totals per category ----------
const totalsByCategory = {};
// TODO: loop over expenses with for...of. For each one:
//       if totalsByCategory[e.category] is undefined, set it to 0 first,
//       then add e.amount to it.

for(const e of expenses){
  if(totalsByCategory[e.category]===undefined){
    totalsByCategory[e.category]=0;
  }
  totalsByCategory[e.category] += e.amount;
}

console.log('Total By Category:', totalsByCategory);

// ---------- Step 6: switch and ternary ----------
function budgetNote(category) {
  switch (category){
    
    case 'food':
    return 'Daily need';
    break;

    case 'travel':
      return 'Commute';
      break;

    case 'books':
      return 'Study';
      break;

      default:
        return 'Other';
  }
  // TODO: use a switch with break. 'food' -> 'Daily need', 'travel' -> 'Commute',
  //       'books' -> 'Study', and a default of 'Other'. Return the text.
}
const categories = ['food', 'travel', 'books', 'entertainment'];

categories.forEach((category) =>{
    const total = totalsByCategory[category];
    const status = total >1500? 'OVER 1500' : 'OK';

    console.log(
    `${category} (${budgetNote(category)}): Rs ${total} - ${status}`
  );
})
// TODO: use categories.forEach. For each category, print one line with a
//       template literal, for example:
//       food (Daily need): Rs 940 - OK
//       Use ONE ternary to print 'OVER 1500' instead of 'OK' when the total > 1500.

// ---------- Step 7: closure ----------
function createBudgetTracker(limit) {
  let spent =0;

  return function spend(amount){
    spent += amount;

    const Remaining = limit - spent;

    if (Remaining >= 0) {
      return `Remaining: ${Remaining}`;
    } else {
      return `Over budget by ${Math.abs(Remaining)}`;
    }

  };
  }
  // TODO: declare a variable spent = 0 here, then return a function spend(amount)
  //       that adds amount to spent and returns:
  //       Remaining: ${...}  or  Over budget by ${...}

const tracker = createBudgetTracker(1000);
console.log(tracker(300));
console.log(tracker(500));
console.log(tracker(400));
// ---------- Step 8: read the file asynchronously ----------
console.log('Async read started');

fs.readFile('expenses.txt', 'utf8', (err, data) => {

  if (err) {
    console.log(err);
    return;
  }
  console.log('Async read finished');

});

// TODO: use fs.readFile('expenses.txt', 'utf8', callback). The callback takes (err, data).
//       If err, log it and return. Otherwise log 'Async read finished'.

for (let i = 0; i < 1000000; i++) {
  // Loop is running
}

console.log('Loop finished');

// TODO: right after the fs.readFile call, run a for loop that counts to 1000000
//       and log 'Loop finished'. Note which message prints first.
