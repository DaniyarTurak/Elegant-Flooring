function changeColor(id, colorCode) {
  
  var sortingButtons=document.querySelectorAll("#salesTable span");

  sortingButtons.forEach(function(node) {
    node.style.backgroundColor="";
    node.style.color="";
  });
  
  sortingButtons[id].style.color=colorCode;
  /*
  tabButtons.forEach(function(node) {
      node.style.backgroundColor="";
      node.style.color="";
  });
  tabButtons[panelIndex].style.backgroundColor=colorCode;
  tabButtons[panelIndex].style.color="white";
  */
 console.log(sortingButtons);

}

function sortAccountsAsc(id, colorCode) {
  console.log("Checkign Asc sort");
  let table, rows, switching, i, x, y, shouldSwitch;
  let xValue, yValue;
  table = document.getElementById("salesTable");
  switching = true;
  
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      
      x = rows[i].getElementsByTagName("select")[0];
      y = rows[i + 1].getElementsByTagName("select")[0];

      xValue = x.options[x.selectedIndex].value;
      yValue = y.options[y.selectedIndex].value;

      
      // Check if the two rows should switch place:
      if (xValue.toLowerCase() > yValue.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
      
    }
    
    if (shouldSwitch) {
      
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
    
  }

  changeColor(id, colorCode);
  
}

function sortAccountsDesc(id, colorCode) {
  console.log("Checkign Desc sort");
  let table, rows, switching, i, x, y, shouldSwitch;
  let xValue, yValue;
  table = document.getElementById("salesTable");
  switching = true;
  
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      
      x = rows[i].getElementsByTagName("select")[0];
      y = rows[i + 1].getElementsByTagName("select")[0];

      xValue = x.options[x.selectedIndex].value;
      yValue = y.options[y.selectedIndex].value;

      // Check if the two rows should switch place:
      if (xValue.toLowerCase() < yValue.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }     
    }
    
    if (shouldSwitch) {
      
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
    
  }
  
  changeColor(id, colorCode);
}

function sortShopsAsc(id, colorCode) {
  console.log("Sort Shops Asc");
  let table, rows, switching, i, x, y, shouldSwitch;
  let xValue, yValue;
  table = document.getElementById("salesTable");
  switching = true;

  
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      
      x = rows[i].getElementsByTagName("select")[1];
      y = rows[i + 1].getElementsByTagName("select")[1];

      xValue = x.options[x.selectedIndex].value;
      yValue = y.options[y.selectedIndex].value;
   
      // Check if the two rows should switch place:toLowerCase()
      if (xValue.length > yValue.length) {
        
        shouldSwitch = true;
        break;

      } else if ((xValue.toLowerCase() > yValue.toLowerCase()) && (xValue.length == yValue.length)) {

        shouldSwitch = true;
        break;

      }
    }
    
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }

  changeColor(id, colorCode);
}

function sortShopsDesc(id, colorCode) {
  console.log("Sort Shops Desc");
  let table, rows, switching, i, x, y, shouldSwitch;
  let xValue, yValue;
  table = document.getElementById("salesTable");
  switching = true;

  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      
      x = rows[i].getElementsByTagName("select")[1];
      y = rows[i + 1].getElementsByTagName("select")[1];

      xValue = x.options[x.selectedIndex].value;
      yValue = y.options[y.selectedIndex].value;
     
      // Check if the two rows should switch place:toLowerCase()
      if (xValue.length < yValue.length) {
        
        shouldSwitch = true;
        break;

      } else if ((xValue.toLowerCase() < yValue.toLowerCase()) && (xValue.length == yValue.length)) {

        shouldSwitch = true;
        break;

      }
    }
    
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }

  changeColor(id, colorCode);
}

/*
function sortAsc2() {
  console.log("Checkign Asc sort");
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("skuTable");
  switching = true;
  
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      
      x = rows[i].getElementsByTagName("input")[0];
      y = rows[i + 1].getElementsByTagName("input")[0];
      
      // Check if the two rows should switch place:
      if (x.value.toLowerCase() > y.value.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
      
    }
    
    if (shouldSwitch) {
      
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
    
    
  }
  
}



function sortDesc2() {
  console.log("Checkign Desc sort");
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("skuTable");
  switching = true;
  
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      
      x = rows[i].getElementsByTagName("input")[0];
      y = rows[i + 1].getElementsByTagName("input")[0];
      
      // Check if the two rows should switch place:
      if (x.value.toLowerCase() < y.value.toLowerCase()) {
        // If so, mark as a switch and break the loop:
        shouldSwitch = true;
        break;
      }
      
    }
    
    if (shouldSwitch) {
      
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
    
    
  }
  
}

*/