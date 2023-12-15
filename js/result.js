const tbody = table.getElementsByTagName("tbody")[0];
const table = document.getElementById("myTable");

const stor = JSON.parse(localStorage.getItem("result"));

if (stor) {
  for (const key in stor) {
    const value = stor[key][1];
    console.log(stor[key][0]);
    console.log(stor[key][1]);
    console.log(stor.length);
    const keyCell = document.createElement("td");

    const newRow = document.createElement("tr");
    let num = 1 + +key;
    const valueCell = document.createElement("td");
    keyCell.textContent = stor[key][0] + " " + `${num}`;
    newRow.appendChild(keyCell);
    valueCell.textContent = value;

    newRow.appendChild(valueCell);
    tbody.appendChild(newRow);

  }
}
