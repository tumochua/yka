const table = [
    {
        "name": "不良 2",
        "value": "0",
    },
    {

        "name2": "不良 7",
        "value2": "0"
    },
    {
        "name": "不良 3",
        "value": "10",
    },
    {
        "name2": "不良 8",
        "value2": "0"
    },
    {
        "name": "不良 4",
        "value": "0",
    },
    {

        "name2": "不良 9",
        "value2": "0"
    },
    {
        "name": "不良 5",
        "value": "0",
    },
    {

        "name2": "不良 10",
        "value2": "0"
    },
    {
        "name": "不良 2",
        "value": "0",
    },
    {
        "name2": "不良 7",
        "value2": "0"
    },
    {
        "name": "不良 3",
        "value": "10",
    },
    {

        "name2": "不良 8",
        "value2": "0"
    },
    {
        "name": "不良 4",
        "value": "0",
    },
    {

        "name2": "不良 9",
        "value2": "0"
    },
    {
        "name": "不良 5",
        "value": "0",
    },
    {

        "name2": "不良 10",
        "value2": "0"
    },
    {
        "name": "不良 2",
        "value": "0",
    },
    {

        "name2": "不良 7",
        "value2": "10"
    },
    {
        "name": "不良 3",
        "value": "10",
    },
    {

        "name2": "不良 8",
        "value2": "0"
    },
    {
        "name": "不良 4",
        "value": "0",
    },
    {

        "name2": "不良 9",
        "value2": "0"
    },
    {
        "name": "不良 5",
        "value": "0",
    },
    {

        "name2": "不良 10",
        "value2": "0"
    }
]

export function Table() {
    const tableBody = document.getElementById("tableBody");
    const tableBody1 = document.getElementById("tableBody1");

    for (let i = 0; i < table.length; i += 2) {
        const rowData1 = table[i];
        const rowData2 = table[i + 1];

        const row = document.createElement("tr");

        // Cột Name và Value
        const cell1 = document.createElement("td");
        cell1.textContent = rowData1.name || "";
        const cell2 = document.createElement("td");
        const input1 = document.createElement("input");

        // cell2.textContent = rowData1.value || "0";
        input1.type = "number";
        input1.value = rowData1.value || "0";
        input1.classList.add("input-size");
        input1.min = "0";
        input1.addEventListener("input", function () {
            if (parseInt(input1.value) < 0) {
                input1.value = "0";
            }
        });
        cell2.appendChild(input1);

        // Cột Name2 và Value2
        const cell3 = document.createElement("td");
        cell3.textContent = rowData2.name2 || "";
        const cell4 = document.createElement("td");
        // cell4.textContent = rowData2.value2 || "0";

        const input2 = document.createElement("input");
        input2.type = "number";
        input2.value = rowData1.value || "0"; // Lấy giá trị từ rowData1.value
        input2.classList.add("input-size");
        input2.min = "0";
        input2.addEventListener("input", function () {
            if (parseInt(input2.value) < 0) {
                input2.value = "0";
            }
        });
        cell4.appendChild(input2);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);

        tableBody.appendChild(row);
    }
    for (let i = 0; i < table.length; i += 2) {
        const rowData1 = table[i];
        const rowData2 = table[i + 1];

        const row = document.createElement("tr");

        // Cột Name và Value
        const cell1 = document.createElement("td");
        cell1.textContent = rowData1.name || "";
        const cell2 = document.createElement("td");
        const input1 = document.createElement("input");

        // cell2.textContent = rowData1.value || "0";
        input1.type = "number";
        input1.value = rowData1.value || "0";
        input1.classList.add("input-size");
        input1.min = "0";
        input1.addEventListener("input", function () {
            if (parseInt(input1.value) < 0) {
                input1.value = "0";
            }
        });
        cell2.appendChild(input1);

        // Cột Name2 và Value2
        const cell3 = document.createElement("td");
        cell3.textContent = rowData2.name2 || "";
        const cell4 = document.createElement("td");
        // cell4.textContent = rowData2.value2 || "0";

        const input2 = document.createElement("input");
        input2.type = "number";
        input2.value = rowData1.value || "0"; // Lấy giá trị từ rowData1.value
        input2.classList.add("input-size");
        input2.min = "0";
        input2.addEventListener("input", function () {
            if (parseInt(input2.value) < 0) {
                input2.value = "0";
            }
        });
        cell4.appendChild(input2);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);

        tableBody1.appendChild(row);
    }
}