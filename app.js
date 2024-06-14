const table1 = document.getElementById("table1");
const table2 = document.getElementById("table2");
const table3 = document.getElementById("table3");

const tables = [table1, table2, table3];
const tableFiles = [
  "table1.csv",
  "table2.csv",
  "table3.csv"
];

function loadTable(table, file) {
  fetch(file)
    .then(response => response.text())
    .then(data => {
      const rows = data.trim().split("\n");
      const headers = rows[0].split(",");
      const tableBody = document.createElement("tbody");

      rows.slice(1).forEach(row => {
        if (row) {
          const cells = row.split(",");
          const tableRow = document.createElement("tr");

          cells.forEach(cell => {
            const tableCell = document.createElement("td");
            tableCell.textContent = cell;
            tableRow.appendChild(tableCell);
          });

          tableBody.appendChild(tableRow);
        }
      });

      table.appendChild(tableBody);
      table.querySelector("thead").innerHTML = `<tr>${headers.map(header => `<th>${header}</th>`).join("")}</tr>`;
    })
    .catch(() => {
      console.warn(`Failed to load ${file}`);
      //const yesterday = new Date();
      //yesterday.setDate(yesterday.getDate() - 1);
      //const yesterdayFormatted = yesterday.toISOString().split("T")[0];
      loadTable(table, `${file}`);
    });
}

tables.forEach((table, index) => loadTable(table, tableFiles[index]));
