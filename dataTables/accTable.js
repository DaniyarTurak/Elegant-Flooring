const accUrl = "https://script.google.com/macros/s/AKfycbyBhVsUzvcmWXIH0rPOuZFA9ZGHPON2C9mA7IG4_hWWqH0f8EC_358gH3ri0_Tel8Ep/exec";
let accArr = [];
let shopsArr = [];
let uniqueAcc = [];
let uniqueShops = [];

accRecords();

const searchAcc = document.getElementById('searchInpAcc');
searchAcc.addEventListener('keyup', (e) => {
    let searchValue = searchAcc.value.toUpperCase();
    console.log(searchValue);
    const accValues = document.querySelectorAll(['[name="account"]']);
    accValues.forEach(acc => {
        let target = acc.value.toUpperCase();
        if (target.includes(searchValue)) {
            acc.parentElement.parentElement.style.display = '';
        } else {
            acc.parentElement.parentElement.style.display = 'none';
        }
    });
    // let carts = document.querySelectorAll('.cart');
    // let cartsArr = [];
    // carts.forEach(cart => {
    //     let temp = cart.childNodes;
    //     temp.forEach(item => {
    //         if (item.nodeName == "DIV") {
    //             if (item.className.includes("cart-header") == true) {
    //                 cartsArr.push(item);
    //             }
    //         }
    //     });
    // });

    // cartsArr.forEach(cart => {
    //     let target = cart.querySelector('.flex-1').textContent.toUpperCase();
        
    //     if (target.includes(searchValue) == true) {
    //         cart.parentElement.style.display = '';
    //     } else {
    //         cart.parentElement.style.display = 'none';
    //     }
    // });
});

const sortAcc = document.querySelector('.sortAccBtn');
sortAcc.addEventListener('click', (e) => {
    let table, rows, switching, i, x, y, shouldSwitch;
    let xValue, yValue;
    table = document.getElementById("salesTable");
    switching = true;

    let isPressed = checkSortPressed(e);
    while (switching) {
        switching = false;
        rows = table.rows;
        
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName('input')[0].value;
            y = rows[i+1].getElementsByTagName('input')[0].value;

            if (isPressed) {
                // Check if the two rows should switch place:
                if (x.toLowerCase() < y.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (x.toLowerCase() > y.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
          
          rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
          switching = true;
        }
    
    
    }
});


const sortShop = document.querySelector('.sortShopBtn');
sortShop.addEventListener('click', (e) => {
    let table, rows, switching, i, x, y, shouldSwitch;
    let xValue, yValue;
    table = document.getElementById("salesTable");
    switching = true;

    let isPressed = checkSortPressed(e);
    while (switching) {
        switching = false;
        rows = table.rows;
        
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName('input')[1].value;
            y = rows[i+1].getElementsByTagName('input')[1].value;

            if (isPressed) {
                // Check if the two rows should switch place:
                if (x.toLowerCase() < y.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            } else {
                if (x.toLowerCase() > y.toLowerCase()) {
                    // If so, mark as a switch and break the loop:
                    shouldSwitch = true;
                    break;
                }
            }
        }

        if (shouldSwitch) {
          
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
    }
});



const saveBtn = document.getElementById('saveAcc');
saveBtn.addEventListener('click', (e) => {
    
    const tbody = document.querySelector('#tbodySales');
    const accounts = tbody.querySelectorAll('[name="account"]');
    const shops = tbody.querySelectorAll('[name="shop"]');
    
    accArr = [];
    shopsArr = [];

    accounts.forEach(account => {
        accArr.push(account.value);
    }); 

    shops.forEach(shop => {
        shopsArr.push(shop.value);
    });

    console.log(accArr);
    console.log(shopsArr);

    const url = `${accUrl}?callback=callAcc&acc=${accArr}&shops=${shopsArr}&action=save`;

    jQuery.ajaxSetup({
        async: false
      });
      
      
    let request = jQuery.ajax({
        crossDomain: true,
        url: url ,
        method: "GET",
        dataType: "jsonp"
    });
});

const addBtn = document.getElementById('addAcc');
addBtn.addEventListener('click', (e) => {
    const tbody = document.querySelector('#tbodySales');
    
    tbody.innerHTML += `
    <tr>
        <td>
            <input class="form-input"  name="account" list="accountDataList">
        </td>
        <td>
            <input class="form-input" name="shop" list="shopDataList">
            <img src="icons/delete.png" alt="Delete" class="icons">
        </td>
    </tr>
    `;
    orderDataList();
    deleteIcon();
});

function accRecords() {
    const url = `${accUrl}?action=read`;

    $.getJSON(url, function(json) {
        json.records.sort(compare);

        const tbody = document.getElementById('tbodySales');
        
        for (let i=0; i<json.records.length; i++) {
            accArr.push(json.records[i].SalesPerson);
            shopsArr.push(json.records[i].Shops);
        }

        uniqueAcc = accArr.filter(onlyUnique);
        uniqueShops = shopsArr.filter(onlyUnique);

        tbody.innerHTML += `
            <datalist id="accountDataList"></datalist>
            <datalist id="shopDataList"></datalist>
        `;


        for (let i=0; i<json.records.length; i++) {
            tbody.innerHTML += `
            <tr>
                <td>
                    <input class="form-input"  name="account" list="accountDataList">
                </td>
                <td>
                    <input class="form-input" name="shop" list="shopDataList">
                    <img src="icons/delete.png" alt="Delete" class="icons">
                </td>
            </tr>
            `;
        }

        deleteIcon();
        dataListInsert();
    });
}

function orderDataList() {
    const datalistAcc = document.querySelector('#accountDataList'),
          datalistShop = document.querySelector('#shopDataList'),
          inputAccContainer = document.querySelectorAll('[name="account"]'),
          inputShopContainer = document.querySelectorAll('[name="shop"]');

    inputAccContainer.forEach((input, id) => {
        if (typeof accArr[id] !== "undefined") {
            input.value = accArr[id];
        }
    });

    inputShopContainer.forEach((input, id) => {
        if (typeof shopsArr[id] !== "undefined") {
            input.value = shopsArr[id];
        }
    });
}

function dataListInsert() {
    const datalistAcc = document.querySelector('#accountDataList'),
          datalistShop = document.querySelector('#shopDataList'),
          inputAccContainer = document.querySelectorAll('[name="account"]'),
          inputShopContainer = document.querySelectorAll('[name="shop"]');

    for (let item of datalistAcc.childNodes) {
        item.remove();
    }

    for (let item of datalistShop.childNodes) {
        item.remove();
    }

    for (let acc of uniqueAcc) {
        if (typeof acc !== "undefined") {
            const option = document.createElement('option');
            option.textContent = acc;
            datalistAcc.append(option);
        }
    }

    for (let shop of uniqueShops) {
        if (typeof shop !== "undefined") {
            const option = document.createElement('option');
            option.textContent = shop;
            datalistShop.append(option);
        }
    }

    inputAccContainer.forEach((input, id) => {
        if (typeof accArr[id] !== "undefined") {
            input.value = accArr[id];
        }
    });

    inputShopContainer.forEach((input, id) => {
        if (typeof shopsArr[id] !== "undefined") {
            input.value = shopsArr[id];
        }
    });
}

function deleteIcon() {
    let deleteBtn = document.querySelectorAll('.icons');
    deleteBtn.forEach((btn, id) => {
        btn.addEventListener('click', (e) => {
            accArr.splice(id, 1);
            shopsArr.splice(id, 1);
            btn.parentElement.parentElement.remove();
        });
    });

}

function compare( a, b ) {
    if ( a.SalesPerson < b.SalesPerson ){
        return -1;
    }
    if ( a.SalesPerson > b.SalesPerson ){
        return 1;
    }
    return 0;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function checkSortPressed(e) {
    let isPressed = e.target.sort;

    if(e.target.name == "sortAccBtn"){
        document.querySelector("[name = sortShopBtn]").src = "icons/sortArrowUpDown.svg"
    } else{
        document.querySelector("[name = sortAccBtn]").src = "icons/sortArrowUpDown.svg"
    }

    if (isPressed == "true") {
            e.target.src = "icons/sortArrowUpDown-asc.svg"
            e.target.sort = "false";
            isPressed = false;
            
    } else {
            e.target.src = "icons/sortArrowUpDown-desc.svg"
            e.target.sort = "true";
            isPressed = true;
    }
    return isPressed;
}

function callAcc() {
    accArr = [];
    shopsArr = [];
    uniqueAcc = [];
    uniqueShops = [];
    const tbody = document.querySelector('#tbodySales');
    tbody.innerHTML = "";

    accRecords();
}