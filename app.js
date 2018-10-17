const editIncomeButton = document.getElementById('income').nextElementSibling;
const submitButton = document.getElementById('submit');
const date = document.getElementById('date');
const itemInfo = document.getElementById('item');
const amountSpent = document.getElementById('amount');
const typeOfExpense = document.getElementById('expense-type');
const categoryTitles = document.querySelectorAll('.dot h6');
const tableBody = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
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


const income = parseFloat(prompt("Enter your income."));

incomeAmount.textContent = "$ " + income;
savingsAmount.textContent = "$ " + income;

submitButton.addEventListener('click', () => {
  if (formNotComplete()) {
    alert("You have not chosen the type of expense.");
    return;
  }

  if (notNumber(amountSpent.value)) {
    alert("Invalid amount entered.");
    return;
  }


  const tr = document.createElement('tr');
  const th = document.createElement('th');
  const tdDate = document.createElement('td');
  const tdItem = document.createElement('td');
  const tdAmount = document.createElement('td');

  //row number
  th.textContent = itemCounter;
  th.className = "col-2 number";

  //date field
  //tdDate.textContent =
  tdDate.className = "col-2 date";

  //item description
  tdItem.textContent = itemInfo.value;
  tdItem.className = "col-5 item";

  //amount spent
  tdAmount.textContent = "$ " + parseFloat(amountSpent.value).toFixed(2);
  tdAmount.className = "col-3 amount text-center";

  tr.className = "row";
  tr.appendChild(th);
  tr.appendChild(tdDate);
  tr.appendChild(tdItem);
  tr.appendChild(tdAmount);
  tableBody.appendChild(tr);

  for (let i = 1; i < typeOfExpense.children.length; i++) {
    if (typeOfExpense.children[i].selected) {
      for (let j = 0; j < categoryTitles.length; j++) {
        if (categoryTitles[j].firstChild.textContent == typeOfExpense.children[i].value) {
          let cost = parseFloat(categoryTitles[j].firstElementChild.textContent.slice(2));
          savingsAmount.textContent = "$ " + String(parseFloat(savingsAmount.textContent.slice(2)) - parseFloat(amountSpent.value));
          cost += parseFloat(amountSpent.value);
          categoryTitles[j].firstElementChild.textContent = "$ " + String(cost.toFixed(2));
        }
      }
    }
  }

  itemCounter += 1;
  itemInfo.value = "";
  amountSpent.value = ""
  ;


})



editIncomeButton.addEventListener('click', () => {
  let incomeText = updateIncomeButton.previousElementSibling;
  if (incomeText.firstElementChild) {
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
    incomeText.innerHTML = "";
    incomeText.textContent = "$ " + newIncome;
  } else if (incomeText.tagName === "H3") {
    incomeText.innerHTML = "<input type = 'text' size = '5'>";
  }

})
