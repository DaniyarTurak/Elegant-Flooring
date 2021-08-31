const scriptUrl = "https://script.google.com/macros/s/AKfycbzWsfpqzfyJ89pNWXOhwE0cvL0wq1jkJgi81adDfBisdnZleF2JOK4raXIO6rfYVNOT/exec";
//const scriptDropdown = "https://script.google.com/macros/s/AKfycbzOWXIRhPqJDGZcJuJQ7qaBbEjEAV6uCLNkqXwRit8MtUtgIqmnNjUF1Qzbvq9dEs8T/exec";
const counters = {
  row: 1,
  row2: 1
};

let accountsArr = [];
let shopsArr = [];
let uniqueAccountsArr = [];
let uniqueShopsArr = [];
let newRows = [];

readRecord();
function readRecord() {

  let url = scriptUrl + "?action=read";
  let tbody = document.getElementById("tbodyTable1");

  $.getJSON(url, function (json) {

    accountsArr = [];
    shopsArr = [];
    counters.row = 1;
    $("#tbodyTable1").empty();

    for (let i=0; i<json.records.length; i++) {
      accountsArr.push(json.records[i].Sales_Person);
      shopsArr.push(json.records[i].Shops);
    }

    uniqueAccountsArr = accountsArr.filter(onlyUnique);
    uniqueAccountsArr.sort();
    uniqueShopsArr = shopsArr.filter(onlyUnique);
    uniqueShopsArr.sort();

    /*
    console.log("Account arrays: ");
    console.log(accountsArr);
    console.log(uniqueAccountsArr);

    console.log("Shops arrays: ");
    console.log(shopsArr);
    console.log(uniqueShopsArr);
    */

    for (let i=0; i<json.records.length; i++) {
      tbody.innerHTML += `
        <tr>
          <td>
            <select class="form-select" aria-label="Default select example" name="account${counters.row}" id="account${counters.row}"></select>
          </td>
          <td>
            <select class="form-select" name="shop${counters.row}" id="shop${counters.row}"></select>
            <img src="/icons/delete.png" alt="Delete" class="icons" onclick="deleteRecord(${counters.row})">
          </td>
          <input type="hidden" id="up_record_id${counters.row}" value="${json.records[i].ID}" />
        </tr>
        `;

      
      counters.row += 1;
    }

    for (let i=1; i<=json.records.length; i++) {
      fillDropdownList(i);
    }

    //console.log(uniqueAccountsArr);
    //console.log(uniqueShopsArr);
  });
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}


function fillDropdownList(row) {
  
  let accountID = `account${row}`;
  let shopID = `shop${row}`;
  let dynamicAcc = document.getElementById(accountID);
  let dynamicShop = document.getElementById(shopID);

  //console.log(dynamicAcc);

  
  if (dynamicAcc != null) {
    for (let i=0; i<uniqueAccountsArr.length; i++) {
      let newOption = document.createElement("option");
      newOption.text = uniqueAccountsArr[i].toString();
      dynamicAcc.add(newOption); 
    }

    $(`#account${row}`).val(accountsArr[row-1]);
  }
  
  if (dynamicShop != null) {
    for (let i=0; i<uniqueShopsArr.length; i++) {
      let newOption = document.createElement("option");
      newOption.text = uniqueShopsArr[i].toString();
      dynamicShop.add(newOption); 
    }

    $(`#shop${row}`).val(shopsArr[row-1]);
  }
  

}

function deleteRecord(row) {

  let accID = "#account" + row;
  let shopID = "#shop" + row;

  let record_id = document.getElementById("up_record_id"+row).value;
  let name = $(accID).val();
  let shop = $(shopID).val();

  let url = scriptUrl+"?callback=ctrlq&salesPerson="+name+"&id="+record_id+"&shop="+shop+"&action=delete";

  let request = jQuery.ajax({
    crossDomain: true,
    url: url ,
    method: "GET",
    dataType: "jsonp"
  });
}

function ctrlq(e) {
  readRecord();
}

function saveTable1() {
  
  let cnt = 0;

  for (let i=0; i<newRows.length; i++) {
    updateNewRow(newRows[i]);
    cnt++;
  }
  
  let sizeArr = counters.row - cnt;

  for (let i=1; i<sizeArr; i++) {

    updateRecord(i);
  }

}

function updateRecord(row) {
 
  let accID = "#account" + row;
  let shopID = "#shop" + row;

  let record_id = document.getElementById("up_record_id"+row).value;
  let name = $(accID).val();
  let shop = $(shopID).val();

  let url = scriptUrl+"?callback=ctrlq&salesPerson="+name+"&id="+record_id+"&shop="+shop+"&action=update";

  let request = jQuery.ajax({
    crossDomain: true,
    url: url ,
    method: "GET",
    dataType: "jsonp"
  });
}

function addRow1() {

  let tbodyEl = document.getElementById("tbodyAddTable1");
  let new_id = Date.now();
  
  tbodyEl.innerHTML += `
    <td><input type="text" id="up_name${counters.row}" value="" class="form-control" /></td>
    <td><input type="text" id="up_shop${counters.row}" value="" class="form-control" /></td>
    <input type="hidden" id="up_record_id${counters.row}" value="${new_id}" />
  `;
  newRows.push(counters.row);
  counters.row++;
}

function updateNewRow(row) {

  let name = document.getElementById("up_name" + row).value;
  let shop = document.getElementById("up_shop" + row).value;
  let id = document.getElementById("up_record_id" + row).value;

  let lengthName = name.split(" ").join("").length;
  let lengthShop = shop.split(" ").join("").length;

  
  if (lengthName != 0 &&  lengthShop != 0) {
    var url = scriptUrl+"?callback=ctrlq&salesPerson="+name+"&id="+id+"&shop="+shop+"&action=insert";
    var tbodyEl = document.getElementById("tbodyAddTable1");
    tbodyEl.innerHTML = '';
  
    var request = jQuery.ajax({
        crossDomain: true,
        url: url ,
        method: "GET",
        dataType: "jsonp"
    });
  }
  
}