// Отримуємо посилання на таблицю та її тіло (tbody) за їхніми ідентифікаторами
const table = document.getElementById('myTable');
const tbody = table.getElementsByTagName('tbody')[0];

// Отримуємо збережений об'єкт з localStorage
const storedData = JSON.parse(localStorage.getItem('result'));

// Перевіряємо, чи є дані в localStorage та вставляємо їх до таблиці
if (storedData) {
    for (const key in storedData) {
        const value = storedData[key][1];
        console.log(storedData[key][0]);
        console.log(storedData[key][1]);
        console.log(storedData.length);

        const newRow = document.createElement('tr');
        const keyCell = document.createElement('td');
        const valueCell = document.createElement('td');
        let num = 1 + + key;
        keyCell.textContent = storedData[key][0] + ' ' + `${num}`;
        valueCell.textContent = value;

        newRow.appendChild(keyCell);
        newRow.appendChild(valueCell);

        tbody.appendChild(newRow);
    }
}

