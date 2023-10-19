const xml = new XMLHttpRequest();

xml.open("GET", "Table_Input.csv", true);

xml.responseType = "text";

xml.onload = () => {
  var csvData = xml.responseText;

  var parsedData = parseCSV(csvData);
  
  var table = document.createElement("table");
  // create table header
  var header = createHeader(parsedData);

  table.appendChild(header);
  
  var keyTable = []
  var valueTable = []
  for (var row = 0; row < parsedData.length; row++) {
    const key = Object.keys(parsedData[row]);
    keyTable.push(key)
    const value = Object.values(parsedData[row]);
    valueTable.push(value)
    var newRow = createNewRow(key, value)

    table.appendChild(newRow);
  }

  var mainContainer = document.getElementById("main-container");
  mainContainer.appendChild(table);

  const alphaVal = document.getElementById("alpha-value")
  const betaVal = document.getElementById("beta-value")
  const charlieVal = document.getElementById("charlie-value")

  console.log(parsedData)
  var val1 = 0
  var val2 = 0
  parsedData.forEach(obj => {
    for (const key in obj) {
        if (obj[key] === "A5") {
            val1 = obj.Value
        }
        if (obj[key] === "A20") {
            val2 = obj.Value
        }
    }
  });
  alphaVal.innerHTML = parseInt(val1) + parseInt(val2)

  parsedData.forEach(obj => {
    for (const key in obj) {
        if (obj[key] === "A15") {
            val1 = obj.Value
        }
        if (obj[key] === "A7") {
            val2 = obj.Value
        }
    }
  });
  betaVal.innerHTML = parseInt(val1) / parseInt(val2)

  parsedData.forEach(obj => {
    for (const key in obj) {
        if (obj[key] === "A13") {
            val1 = obj.Value
        }
        if (obj[key] === "A12") {
            val2 = obj.Value
        }
    }
  });
  charlieVal.innerHTML = parseInt(val1) * parseInt(val2)
};

xml.send();

function parseCSV(csvData) {
  var rows = csvData.split("\n");

  var headers = rows[0].split(",");

  var parsedData = [];

  for (var i = 1; i < rows.length; i++) {
    var value = rows[i].split(",");

    var obj = {};

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = value[j];
    }

    parsedData.push(obj);
  }
  console.log(parsedData)

  return parsedData;
}

function createHeader(parsedData) {
  var newRow = document.createElement("tr");
  for (var col = 0; col < 2; col++) {
    var newColHeader = document.createElement("th");

    const key = Object.keys(parsedData[0]);
    newColHeader.innerHTML = key[col];
    console.log(parsedData[0][key[0]]);
    newRow.appendChild(newColHeader);
  }
  return newRow;
}

function createNewRow(key, value) {
    var newRow = document.createElement("tr");
    for (var col = 0; col < key.length; col++) {
      var newCol = document.createElement("td");
      newCol.textContent = value[col];
      newRow.appendChild(newCol);
    }
    return newRow
}
