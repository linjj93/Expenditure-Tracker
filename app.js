const submitButton = document.getElementById('submit');
const itemInfo = document.getElementById('item');
const amountSpent = document.getElementById('amount');
const typeOfExpense = document.getElementById('dropdown');
const categoryTitles = document.querySelectorAll('.dot h6');
const tr = document.createElement('tr');
const th = document.createElement('th');
const tdItem = document.createElement('td');
const tdAmount = document.createElement('td');
const tableBody = document.getElementsByTagName('table')[0].getElementsByTagName('tbody')[0];
let itemCounter = 1;

submitButton.addEventListener('click', () => {
  const tr = document.createElement('tr');
  const th = document.createElement('th');
  const tdItem = document.createElement('td');
  const tdAmount = document.createElement('td');


  th.textContent = itemCounter;
  th.className = "col-2 number";
  tdItem.textContent = itemInfo.value;
  tdItem.className = "col-7 item";
  tdAmount.textContent = amountSpent.value;

  tdAmount.className = "col-3 amount text-center";
  tr.className = "row";
  tr.appendChild(th);
  tr.appendChild(tdItem);
  tr.appendChild(tdAmount);
  tableBody.appendChild(tr);
  itemCounter += 1;
  itemInfo.value = "";
  amountSpent.value = "";

  for (let i = 1; i < typeOfExpense.children.length; i++) {
    if (typeOfExpense.children[i].selected) {
      for (let j = 0; j < categoryTitles.length; j++) {
        if (categoryTitles[j].textContent == typeOfExpense.children[i].value) {
          let cost = parseFloat(categoryTitles[j].nextElementSibling.textContent.slice(2));
          alert(cost);
          cost += parseFloat(amountSpent.value);
          alert(cost);
          categoryTitles[j].nextElementSibling.textContent = "$ " + String(cost);
        }
      }
    }
  }



})
