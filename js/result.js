const table = document.getElementById("myTable");
const tbody = table.getElementsByTagName("tbody")[0];

const stor = JSON.parse(localStorage.getItem("result"));

if (stor) {
  for (const key in stor) {
    const value = stor[key][1];
    console.log(stor[key][0]);
    console.log(stor[key][1]);
    console.log(stor.length);

    const newRow = document.createElement("tr");
    const keyCell = document.createElement("td");
    const valueCell = document.createElement("td");
    let num = 1 + +key;
    keyCell.textContent = stor[key][0] + " " + `${num}`;
    valueCell.textContent = value;

    newRow.appendChild(keyCell);
    newRow.appendChild(valueCell);

    tbody.appendChild(newRow);
  }
}
