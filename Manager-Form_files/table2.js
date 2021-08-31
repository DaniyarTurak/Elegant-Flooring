let scriptUrl2 = "https://script.google.com/macros/s/AKfycbys4xE6c90-KPJcCuRNzQ2Fc12R302IJC6deFWqi4Y8VaOnpS414beAHHWmk8VaRJMb/exec";

readRecord2();
function readRecord2() {
  
  let url = scriptUrl2 + "?action=read";
  let tbodyEl = document.getElementById("tbodyTable2");
  

  $.getJSON(url, function (json) {

    $("#tbodyTable2").empty();
    counters.row2 = 1;

    for (var i = 0; i < json.records.length; i++) {
     
      tbodyEl.innerHTML += `
      <tr>
        <td class="cameraCell" ><img src="/icons/cross.png" alt="Delete" class="cross"></td>
        <td><input type="text" id="up_sku${counters.row2}" value="${json.records[i].SKU}" class="form-control" /></td>
        <td>
          <p>Check</p><input  type="text" id="up_tag${counters.row2}" value="${json.records[i].Tags}" />
        </td>
        <td><input type="text" id="comment${counters.row2}" value="${json.records[i].comments}" class="form-control" /></td>
        <td class="flagCell"><img id="flagId${counters.row2}" src="/flags/yellow_circle.png" alt="Delete" class="flags"></td>
        <input type="hidden" id="up_record_id2${counters.row2}" value="${json.records[i].ID}" />
      </tr>
      `;
      
      console.log(json.records[i].Flags);
      flagChange(counters.row2, json.records[i].Flags);
      counters.row2++;
      
    }
    
  });
}


function flagChange(row, value) {

  if (value == "in stock") {document.getElementById("flagId"+row).src="/flags/gray_circle.png";}
  else if (value == "discontinued no stock") {document.getElementById("flagId"+row).src="/flags/red_circle.png";}
  else if (value == "yellow discontinued in stock") {document.getElementById("flagId"+row).src="/flags/yellow_circle.png";}
  
}
/*
var script_url2 ="https://script.google.com/macros/s/AKfycbys4xE6c90-KPJcCuRNzQ2Fc12R302IJC6deFWqi4Y8VaOnpS414beAHHWmk8VaRJMb/exec";
read_record2();

var row_Num = 1;

function read_record2() {

  var url = script_url2+"?action=read";camera.png
  var tbodyEl = document.getElementById("tbody3");
  $("#tbody3").empty();
  row_Num = 1;

  $.getJSON(url, function (json) {
    
    $("#tbody3").empty();
    for (var i = 0; i < json.records.length; i++) {
     
      tbodyEl.innerHTML += `
      <tr>
        <td class="cameraCell" ><img src="../camera.png" alt="Delete" class="camera" onclick="cameraPopUp(${row_Num})"></td>
        <td><input type="text" id="up_sku${row_Num}" value="${json.records[i].SKU}" class="form-control" /></td>
        <td><input type="text" id="up_tag${row_Num}" value="${json.records[i].Tags}" class="form-control" /></td>
        <td><input type="text" id="comment${row_Num}" value="${json.records[i].comments}" class="form-control" /></td>
        <td class="flagCell"><img id="flagId${row_Num}" src="/flags/yellow_circle.png" alt="Delete" class="flags"></td>
        <input type="hidden" id="up_record_id2${row_Num}" value="${json.records[i].ID}" />
      </tr>
      `;
      
      console.log(json.records[i].Flags);
      flagChange(row_Num, json.records[i].Flags);
      row_Num++;
      
    }
    
  });

}

function flagChange(row_number, value) {

  if (value == "in stock") {document.getElementById("flagId"+row_number).src="/flags/gray_circle.png";}
  else if (value == "discontinued no stock") {document.getElementById("flagId"+row_number).src="/flags/red_circle.png";}
  else if (value == "yellow discontinued in stock") {document.getElementById("flagId"+row_number).src="/flags/yellow_circle.png";}
  
}

function ctrlq(e) {
  read_record2();
}


function cameraPopUp(row_number) {
  // Get the modal
  var modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  document.getElementById("camImg").src="/cameraImg/camera"+row_number+".png";
  var titlePop = document.getElementById("up_sku" + row_number).value;
  document.getElementById("title-pop-up").innerHTML = titlePop;

  modal.style.display = "block";

}


function addCell2() {
  var tbodyEl = document.getElementById("tbody4");
  var new_id = Date.now();
  
  tbodyEl.innerHTML += `
    <td class="cameraCell" ><img src="../camera.png" alt="Delete" class="camera"></td>
    <td><input type="text" id="up_sku${row_Num}" value="" class="form-control" /></td>
    <td><input type="text" id="up_tag${row_Num}" value="" class="form-control" /></td>
    <td><input type="text" id="comment${row_Num}" value="" class="form-control" /></td>
    <td class="flagCell"><img id="flagId${row_Num}" src="/flags/white_circle.png" alt="Delete" class="flags"></td>
    <input type="hidden" id="up_record_id2${row_Num}" value="${new_id}" />
  `;

  row_Num++;

}


function save2() {

  var sizeArr = row_Num - 1;
  
  $("#tbody4").empty();
  
  for (var i=1; i<=sizeArr; i++) {

    updateRecord2(i);
  }
  
  
}

function updateRecord2(row_number) {

  var record_id = document.getElementById("up_record_id2"+row_number).value;
  var sku = document.getElementById("up_sku" + row_number).value;
  var tag = document.getElementById("up_tag" + row_number).value;
  var comment = document.getElementById("comment" + row_number).value;

  var url = script_url2+"?callback=ctrlq&sku="+sku+"&id="+record_id+"&tag="+tag+"&comment="+comment+"&action=update";

  var request = jQuery.ajax({
    crossDomain: true,
    url: url ,
    method: "GET",
    dataType: "jsonp"
  });
  
}


/*


function updateRecord2(row_number) {

  var record_id = document.getElementById("up_record_id2"+row_number).value;
  var series = document.getElementById("up_sku" + row_number).value;
  var tag = document.getElementById("up_tag" + row_number).value;
  var comment = document.getElementById("comment" + row_number).value;

  var url = script_url2+"?callback=ctrlq&name="+series+"&id="+record_id+"&test="+tag+"&comment="+comment+"&action=update";

  var request = jQuery.ajax({
    crossDomain: true,
    url: url ,
    method: "GET",
    dataType: "jsonp"
  });
  
}


function addCell2() {
  var tbodyEl = document.getElementById("tbody4");
  var new_id = Date.now();
  
  tbodyEl.innerHTML += `
    <td><input type="text" id="up_sku${row_Num}" value="" class="form-control" /></td>
    <td><input type="text" id="up_tag${row_Num}" value="" class="form-control" /></td>
    <td><input type="button" id="delete_button${row_Num}" value="Delete" class="btn btn-danger" onclick="deleteNew2(${row_Num})"></td>
    <td><input type="button" id="update_button${row_Num}" value="Update" class="btn btn-primary" onclick="updateNew2(${row_Num})"></td>
    <td><input type="text" id="comment${row_Num}" value="" class="form-control" /></td>
    <input type="hidden" id="up_record_id2${row_Num}" value="${new_id}" />
  `;
  rowNum++;
  
}

function deleteNew2(row_number) {
  var tbodyEl = document.getElementById("tbody4");
  tbodyEl.innerHTML = '';
  read_record2();
}

function updateNew2(row_number) {

  var record_id = document.getElementById("up_record_id2"+row_number).value;
  var series = document.getElementById("up_sku" + row_number).value;
  var tag = document.getElementById("up_tag" + row_number).value;
  var comment = document.getElementById("comment" + row_number).value;

  var url = script_url2+"?callback=ctrlq&name="+series+"&id="+record_id+"&test="+tag+"&comment="+comment+"&action=insert";
  var tbodyEl = document.getElementById("tbody4");
  tbodyEl.innerHTML = '';

  var request = jQuery.ajax({
      crossDomain: true,
      url: url ,
      method: "GET",
      dataType: "jsonp"
  });
  
}
*/