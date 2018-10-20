const editIncomeButton = document.querySelector('.income-box button');
const submitButton = document.getElementById('submit');
const date = document.getElementById('date');
const itemInfo = document.getElementById('item');
const amountSpent = document.getElementById('amount');
const typeOfExpense = document.getElementById('expense-type');
const categoryTitles = document.querySelectorAll('.categories th');
const tableBody = document.getElementsByClassName('table')[0].getElementsByTagName('tbody')[0];
let totalSpend = parseFloat(categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent.slice(2));
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

function emptyInput(input) {
  return (input == "");
}


// const income = parseFloat(prompt("Enter your income."));
//
// incomeAmount.textContent = income;
// savingsAmount.textContent = "$ " + incomeAmount.textContent;

submitButton.addEventListener('click', () => {
  if (emptyInput(itemInfo.value)) {
    alert("You did not describe your item.");
    return;
  }

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
  const tdType = document.createElement('td');
  const tdItem = document.createElement('td');
  const tdAmount = document.createElement('td');
  const tdButtons = document.createElement('td');
  const tdEditButton = document.createElement('button');
  tdEditButton.textContent = "edit";
  const tdDeleteButton = document.createElement('button');
  tdDeleteButton.textContent = "delete";

  //row number
  th.textContent = itemCounter;
  th.className = "number-col";

  //expense type
  for (let i = 1; i < typeOfExpense.children.length; i++) {
    if (typeOfExpense.children[i].selected) {
      tdType.textContent = typeOfExpense.children[i].textContent;
    }
  }
  tdType.className = "type-col";

  //item description
  tdItem.textContent = itemInfo.value;
  tdItem.className = "item-col";

  //amount spent
  tdAmount.textContent = "$ " + parseFloat(amountSpent.value).toFixed(2);
  tdAmount.className = "amount-col";

  //buttons
  tdEditButton.className = "edit-button";
  tdDeleteButton.className = "delete-button";
  tdButtons.appendChild(tdEditButton);
  tdButtons.appendChild(tdDeleteButton);
  tdButtons.className = "change-col";



  tr.className = "row";
  tr.appendChild(th);
  tr.appendChild(tdItem);
  tr.appendChild(tdType);
  tr.appendChild(tdAmount);
  tr.appendChild(tdButtons);
  tableBody.appendChild(tr);


  for (let i = 1; i < typeOfExpense.children.length; i++) {
    if (typeOfExpense.children[i].selected) {
      for (let j = 0; j < categoryTitles.length; j++) {
        if (categoryTitles[j].firstChild.textContent == typeOfExpense.children[i].value) {
          let cost = parseFloat(categoryTitles[j].nextElementSibling.textContent.slice(2));
          cost += parseFloat(amountSpent.value);
          categoryTitles[j].nextElementSibling.textContent = "$ " + String(cost.toFixed(2));
          //let totalSpend = parseFloat(categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent.slice(2));
          totalSpend += parseFloat(amountSpent.value);
          categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent = "$ " + String(totalSpend.toFixed(2));
          savingsAmount.textContent = "$ " + String((parseFloat(savingsAmount.textContent.slice(2)) - parseFloat(amountSpent.value)).toFixed(2));

        }
      }
    }
  }

  itemCounter += 1;
  itemInfo.value = "";
  amountSpent.value = ""
  ;

})

  //delete entry
  // deleteEntryButton.addEventListener('click', () => {
  //   const tableRows = Array.from(tableBody.children);                   //make array from tablebody
  //   const parentRow = deleteEntryButton.parentNode.parentNode;          //traverse to entire row
  //   if (tableRows.length > 1) {
  //     const startingIndex = tableRows.indexOf(parentRow);               //find index of row to be removed
  //     for (let i = startingIndex + 1; i < (tableRows.length - startingIndex); i++) {        //handle the serial number of subsequent rows
  //       const numberColumn = tableRows[i].firstElementChild;            //find DOM rep of each subsequent number column, minus each no. by 1
  //       let serialNumber = parseInt(numberColumn.textContent)
  //       serialNumber -= 1;
  //       numberColumn.textContent = serialNumber;
  //     }
  //   }
  //
  //   tableBody.removeChild(parentRow);
  //   itemCounter -= 1;
  //   //change number of every entry thereafter by -1
  //
  //
  // })
  //
  // //edit entry
  // editEntryButton.addEventListener('click', () => {
  //
  // })


tableBody.addEventListener('click', (e) => {
  if(e.target.className == "delete-button") {
    const parentRow = e.target.parentNode.parentNode;
    const parentRowCategory = parentRow.firstElementChild.nextElementSibling.nextElementSibling;
    const parentRowAmount = parseFloat(parentRowCategory.nextElementSibling.textContent.slice(2));
    // reverse corresponding category amount
    for (let i = 0; i < categoryTitles.length; i++) {
      if (categoryTitles[i].firstChild.textContent == parentRowCategory.textContent) {
        let categoryValue = parseFloat(categoryTitles[i].nextElementSibling.textContent.slice(2));
        categoryValue -= parentRowAmount;
        categoryTitles[i].nextElementSibling.textContent = "$ " + String(categoryValue.toFixed(2));
        savingsAmount.textContent = "$ " + String((parseFloat(savingsAmount.textContent.slice(2)) + parseFloat(parentRowAmount)).toFixed(2));
        //let totalSpend = parseFloat(categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent.slice(2));
        totalSpend -= parseFloat(parentRowAmount);
        categoryTitles[categoryTitles.length - 1].nextElementSibling.textContent = "$ " + String(totalSpend.toFixed(2));
      }
    }
    //shift all other elements by -1, if there exists more rows after the chosen row
    if (parentRow.nextElementSibling != null) {
      let nextRow = parentRow.nextElementSibling;
      let startingIndex = parseInt(nextRow.firstElementChild.textContent) - 1;
      while (startingIndex <= tableBody.children.length - 1) {
        nextRow.firstElementChild.textContent = startingIndex;
        nextRow = nextRow.nextElementSibling;
        startingIndex += 1;
      }
    } //remove the row entirely
    tableBody.removeChild(parentRow);
    itemCounter -= 1;
  }

  if (e.target.className == "edit-button") {
    const parentRow = e.target.parentNode.parentNode;
    const itemCell = parentRow.children[1];
    const amountCell = parentRow.children[3];

  }

})
//edit income

editIncomeButton.addEventListener('click', () => {
  const incomeText = document.getElementsByClassName('income-box')[0].firstElementChild.lastElementChild;
  if (incomeText.firstElementChild.tagName == "INPUT" ) {
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

    savingsAmount.textContent = "$ " + parseFloat((parseFloat(newIncome)-totalSpend).toFixed(2));  //handle expenditure in future

  } else if (incomeText.firstElementChild.tagName === "SPAN") {
    const input = document.createElement('input');
    input.type = "text";
    incomeText.parentNode.insertBefore(input, incomeText);
    incomeText.parentNode.removeChild(incomeText);

//    incomeText.innerHTML = "<input type = 'text' size = '5'>";
//    incomeText.style.height = "25px";
//    incomeText.style.padding = "0";
    editIncomeButton.style.fontFamily = "'Mali', cursive";
    editIncomeButton.textContent = "update";
  }

})
