const submitButton = document.getElementById('submit');
const date = document.getElementById('date');
const itemInfo = document.getElementById('item');
const amountSpent = document.getElementById('amount');
const typeOfExpense = document.getElementById('dropdown');
const categoryTitles = document.querySelectorAll('.dot h6');
const tableBody = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
let itemCounter = 1;

submitButton.addEventListener('click', () => {
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
  tdAmount.textContent = amountSpent.value;
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
        if (categoryTitles[j].textContent == typeOfExpense.children[i].value) {
          let cost = parseFloat(categoryTitles[j].nextElementSibling.textContent.slice(2));
          cost += parseFloat(amountSpent.value);
          categoryTitles[j].nextElementSibling.textContent = "$ " + String(cost.toFixed(2));
        }
      }
    }
  }

  itemCounter += 1;
  itemInfo.value = "";
  amountSpent.value = "";


})
