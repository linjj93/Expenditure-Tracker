const editIncomeButton = document.querySelector('.income-box button');
const submitButton = document.getElementById('submit');
const date = document.getElementById('date');
const itemInfo = document.getElementById('item');
const amountSpent = document.getElementById('amount');
const typeOfExpense = document.getElementById('expense-type');
const categoryTitles = document.querySelectorAll('.categories th');
const tableBody = document.getElementsByClassName('table')[0].getElementsByTagName('tbody')[0];
let itemCounter = 1;
let savingsAmount = document.getElementById('savings-amount');
let incomeAmount = document.getElementById('income');



function formNotComplete() {
  const dropdownChoice = document.querySelector('#expense-type');
  if (dropdownChoice[0].selected) {
    return true;
  } else {
    return false;
  }
}

function notNumber(arg) {
  return isNaN(parseFloat(arg));
}


// const income = parseFloat(prompt("Enter your income."));
//
// incomeAmount.textContent = income;
// savingsAmount.textContent = "$ " + incomeAmount.textContent;

submitButton.addEventListener('click', () => {
  if (formNotComplete()) {
    alert("You have not chosen the type of expense.");
    return;
  }

  if (notNumber(amountSpent.value)) {
    alert("Invalid amount entered.");
    amountSpent.value = "";
    return;
  }


  const tr = document.createElement('tr');
  const th = document.createElement('th');
  const tdItem = document.createElement('td');
  const tdAmount = document.createElement('td');
  const tdEditButton = document.createElement('button');
  tdEditButton.textContent = "edit";
  const tdDeleteButton = document.createElement('button');
  tdDeleteButton.textContent = "delete";

  //row number
  th.textContent = itemCounter;
  th.className = "number-col";

  //item description
  tdItem.textContent = itemInfo.value;
  tdItem.className = "item-col";

  //amount spent
  tdAmount.textContent = "$ " + parseFloat(amountSpent.value).toFixed(2);
  tdAmount.className = "amount-col";

  //buttons
  tdEditButton.className = "change-col edit-button";
  tdDeleteButton.className = "change-col delete-button";


  tr.className = "row";
  tr.appendChild(th);
  tr.appendChild(tdItem);
  tr.appendChild(tdAmount);
  tr.appendChild(tdEditButton);
  tr.appendChild(tdDeleteButton);
  tableBody.appendChild(tr);


  for (let i = 1; i < typeOfExpense.children.length; i++) {
    if (typeOfExpense.children[i].selected) {
      for (let j = 0; j < categoryTitles.length; j++) {
        if (categoryTitles[j].firstChild.textContent == typeOfExpense.children[i].value) {
          let cost = parseFloat(categoryTitles[j].nextElementSibling.textContent.slice(2));
          cost += parseFloat(amountSpent.value);
          categoryTitles[j].nextElementSibling.textContent = "$ " + String(cost.toFixed(2));
          let totalSpend = parseFloat(categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent.slice(2));
          totalSpend += parseFloat(amountSpent.value);
          categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent = "$ " + String(totalSpend.toFixed(2));
          savingsAmount.textContent = "$ " + String(parseFloat(savingsAmount.textContent.slice(2)) - parseFloat(amountSpent.value));

        }
      }
    }
  }

  itemCounter += 1;
  itemInfo.value = "";
  amountSpent.value = ""
  ;

  // name edit and delete buttons
  const deleteEntryButton = document.getElementsByClassName('delete-button')[0];
  const editEntryButton = document.getElementsByClassName('edit-button')[0];

  //delete entry
  deleteEntryButton.addEventListener('click', () => {
    const tableRows = Array.from(tableBody.children);
    const parentRow = deleteEntryButton.parentNode;
    if (tableRows.length > 1) {
      const startingIndex = tableRows.indexOf(parentRow);
      for (let i = startingIndex + 1; i < (tableRows.length - startingIndex); i++) {
        const numberColumn = tableRows[i].firstElementChild;
        console.log('debug check');
        let serialNumber = parseInt(numberColumn.textContent)
        serialNumber -= 1;
        numberColumn.textContent = serialNumber;
      }
    }

    tableBody.removeChild(parentRow);
    itemCounter -= 1;
    //change number of every entry thereafter by -1


  })

  //edit entry
  editEntryButton.addEventListener('click', () => {

  })



})

//edit income

editIncomeButton.addEventListener('click', () => {
  const incomeText = document.getElementById('income');
  if (incomeText.textContent == "" ) {
    const newIncome = incomeText.firstElementChild.value;
    let check = true;
    while (check) {
      if (notNumber(newIncome)) {
        alert("Invalid income entered. Enter again");
        incomeText.firstElementChild.value = "";
        return;
      } else {
        check = false;
      }
    }
    editIncomeButton.textContent = "edit";
    incomeText.innerHTML = "";
    incomeText.textContent = newIncome;
    savingsAmount.textContent = "$ " + newIncome;  //handle expenditure in future
  } else if (incomeText.tagName === "SPAN") {
    incomeText.innerHTML = "<input type = 'text' size = '5'>";
    editIncomeButton.textContent = "update";
  }

})
