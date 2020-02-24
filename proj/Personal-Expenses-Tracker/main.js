let pet = {};

pet.totalExpenses = [0, 0, 0, 0, 0, 0, 0];
pet.currentLocation = "N/A";

pet.spendField = document.querySelector('#spendField');

pet.addFoodCostBtn = document.querySelector('#food');
pet.addTransportationCostBtn = document.querySelector('#transportation');
pet.addClothesCostBtn = document.querySelector('#clothes');
pet.addHealthCostBtn = document.querySelector('#health');
pet.addEducationCostBtn = document.querySelector('#education');
pet.addHousingCostBtn = document.querySelector('#housing');
pet.addOtherCostBtn = document.querySelector('#other');

pet.resetDBBtn = document.querySelector('#resetDB');

// In case you want to test your code in browsers that still use a prefix...
window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction || {
  READ_WRITE: "readwrite"
}; // This line should only be needed if it is needed to support the object's constants for older browsers
window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;

if (!window.indexedDB) {
  window.alert("Your browser doesn't support a stable version of IndexedDB.");
}

pet.request = window.indexedDB.open("petDB", 1);

pet.request.onsuccess = function (event) {
  pet.db = pet.request.result;
  pet.getCosts();
  console.log(pet.db.name + ' accessed successfully.');
};

pet.request.onerror = function (event) {
  console.log("an error occured requesting db access");
};

pet.request.onupgradeneeded = function (event) {
  console.log(event.target.result.name + " is upgrading...");
  let database = event.target.result;
  database.createObjectStore("food", {
    autoIncrement: true
  });
  database.createObjectStore("transportation", {
    autoIncrement: true
  });
  database.createObjectStore("clothes", {
    autoIncrement: true
  });
  database.createObjectStore("health", {
    autoIncrement: true
  });
  database.createObjectStore("education", {
    autoIncrement: true
  });
  database.createObjectStore("housing", {
    autoIncrement: true
  });
  database.createObjectStore("other", {
    autoIncrement: true
  });
}

pet.addCost = function (categoryVal, sumVal) {

  let request = pet.db.transaction(categoryVal, "readwrite").objectStore(categoryVal).add({
    sum: sumVal,
    time: new Date(),
  });

  request.onsuccess = function (event) {
    pet.getCosts();
    console.log(sumVal + ' added to ' + categoryVal + ' at key ' + event.target.result);
    pet.spendField.value = '';
  };

  request.onerror = function (event) {
    console.log("problem with adding the new data item to the database");
  }

}

pet.getCosts = function () {

  var doneCount = 0;
  pet.totalExpenses = [0, 0, 0, 0, 0, 0, 0];

  for (let objectStoreIndex = 0; objectStoreIndex < pet.db.objectStoreNames.length; objectStoreIndex++) {
    let currentStore = pet.db.objectStoreNames[objectStoreIndex];
    var objectStore = pet.db.transaction(currentStore, "readonly").objectStore(currentStore);

    objectStore.transaction.oncomplete = function () {
      doneCount++;
      if (doneCount === pet.db.objectStoreNames.length) {
        console.log(pet.totalExpenses);
        pet.redrawGraph();
      }
    }

    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        pet.totalExpenses[objectStoreIndex] += cursor.value.sum;
        cursor.continue();
      } else {
        console.log(currentStore + " total expenses updated.");
      }
    }

  }
  // returns the unchanged array because asynch results didn't arrive on time. how can we solve this?
  return pet.totalExpenses;
};

pet.resetCosts = function () {

  var doneCount = 0;

  for (let objectStoreIndex = 0; objectStoreIndex < pet.db.objectStoreNames.length; objectStoreIndex++) {
    let currentStore = pet.db.objectStoreNames[objectStoreIndex];
    let objectStore = pet.db.transaction(currentStore, "readwrite").objectStore(currentStore);

    objectStore.transaction.oncomplete = function () {
      doneCount++;
      if (doneCount === pet.db.objectStoreNames.length) {
        pet.totalExpenses = [0, 0, 0, 0, 0, 0, 0];
        pet.redrawGraph();
      }
    }

    objectStore.openCursor().onsuccess = function (event) {
      var cursor = event.target.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      } else {
        console.log(currentStore + " emptied.");
      }
    };
  }

};

// Google Charts //


pet.redrawGraph = function () {

  // Load the Visualization API and the corechart package.
  google.charts.load('current', {
    'packages': ['corechart']
  });

  // Set a callback to run when the Google Visualization API is loaded.
  google.charts.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {

    if (!pet.totalExpenses.some((e) => e > 0)) {
      console.log('empty graph!');
      document.getElementById('chart').style.display = "none";
      document.getElementById('emptyChartMsg').style.display = "block";
    } else {
      document.getElementById('chart').style.display = "block";
      document.getElementById('emptyChartMsg').style.display = "none";
    }

    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Expense Type');
    data.addColumn('number', 'Expense Amount');
    data.addRows([
      ['Food', pet.totalExpenses[2]],
      ['Transportation', pet.totalExpenses[6]],
      ['Clothes', pet.totalExpenses[0]],
      ['Health', pet.totalExpenses[3]],
      ['Education', pet.totalExpenses[1]],
      ['Housing', pet.totalExpenses[4]],
      ['Other', pet.totalExpenses[5]]
    ]);

    // Set chart options
    var options = {
      chartArea: {
        left: 20,
        top: 20,
        width: '80%',
        height: '80%'
      },
      'width': window.innerWidth,
      'height': window.innerWidth,
      'backgroundColor': 'transparent',
      'legend': {
        'alignment': 'center'
      }
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('chart'));
    chart.draw(data, options);
  }
}

pet.addFoodCostBtn.addEventListener('click', (e) => pet.addCost(e.target.name, Number(pet.spendField.value)));
pet.addTransportationCostBtn.addEventListener('click', (e) => pet.addCost(e.target.name, Number(pet.spendField.value)));
pet.addClothesCostBtn.addEventListener('click', (e) => pet.addCost(e.target.name, Number(pet.spendField.value)));
pet.addHealthCostBtn.addEventListener('click', (e) => pet.addCost(e.target.name, Number(pet.spendField.value)));
pet.addEducationCostBtn.addEventListener('click', (e) => pet.addCost(e.target.name, Number(pet.spendField.value)));
pet.addHousingCostBtn.addEventListener('click', (e) => pet.addCost(e.target.name, Number(pet.spendField.value)));
pet.addOtherCostBtn.addEventListener('click', (e) => pet.addCost(e.target.name, Number(pet.spendField.value)));

pet.resetDBBtn.addEventListener('click', pet.resetCosts);