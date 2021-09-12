const skuUrl = "https://script.google.com/macros/s/AKfycbxA_BDCht8u15RFYFDBGwylcIfizm3iysF-VeMjaY8JGXnvm5uAh-gplM8OSsnGYXx5/exec";
const flagsSrc = ["https://maxinum.kz/elegant_flooring/flags/gray_circle.png", "https://maxinum.kz/elegant_flooring/flags/red_circle.png", "https://maxinum.kz/elegant_flooring/flags/yellow_circle.png"];

skuRecords();

let saveSkuBtn = document.getElementById('saveSKU'),
    addSkuBtn = document.getElementById('addSKU');
const allNonActiveValue = [];
const allActiveValue = [];
let isActive = true;

function callSku() {
    const parent = document.querySelector('.cart-container');
    parent.innerHTML = "";
    skuRecords();
}

const activeCheckbox = document.querySelector('#statusSwitcher');
activeCheckbox.addEventListener('click', (e) => {
    
    const stSwitch = document.getElementById('statusSwitcher');
    let status = stSwitch.getAttribute('status');
    const carts = document.querySelectorAll('.cart');

    carts.forEach(cart => {
        cart.classList.toggle('nonActiveCart');
    });

    if (status == "true") {
        stSwitch.setAttribute('status', false);
        document.getElementById("checkedTxt").innerHTML = "Inactive";
        document.getElementById("checkedImg").src = "icons/checked.svg";
        document.getElementById('checkedTxt').style.color = '#656565';

        

        
        
    } else {
        stSwitch.setAttribute('status', true);
        document.getElementById("checkedTxt").innerHTML = "Active";
        document.getElementById("checkedImg").src = "icons/checked-blue.svg";
        document.getElementById('checkedTxt').style.color = '#0078FF';
    }
   
});

addSkuBtn.addEventListener('click', (e) => {

    const newcart = `
        <div class="cart">
            <div class="flex flex-col">
                <div class="absolute menu" style="top: 16px; left:20px; width: 200px; background-color: white; border: 1px solid black; z-index: 200; font-size: 16px; box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);">
                    <span style="width: 100%; border-bottom: 1px solid black;">Archive</span>
                    <span style="width: 100%;">Delete permanently</span>
                </div>
                <div class="menu" style="background: rgba(0, 0, 0, 0.5);position: absolute;top: 0;bottom: 0;left: 0;right: 0; z-index: 100;"></div>

                <div class="cart-header p-4 flex items-center gap-4">
                    <div class="discussion" style="font-size: 2em;"></div>
                    
                    <div contenteditable="true" style="width: 45px;" class="tagCount border-2 border-black">1</div>
                    <div contenteditable="true" class="flex-1 title-sku"></div>
                    <div class="flagContainer">
                        <img src="flags/gray_circle.png" alt="" width="45" class="flag">
                    </div>
                </div>
                <div class="cart-body p-4">
                    <div class="gap-4 mb-4" style="display:grid;grid-template-columns:  0.2fr 0.2fr 2.4fr 1.2fr 0.2fr;">
                    <div contenteditable="true" class="numericOrder">1</div>
                    <div><img data-modal src="cameraImg/drop_file.png" alt="" width="55" class="cart-img"></div>
                    <div class="tags flex flex-1 flex-col gap-4">
                    <div class="custom-input">
                        <input type="text" class="custom-input_input" oninput="addSpan(event)" list="tags">
                    </div><!--separator-->
                    </div>
                    <div class="comments flex flex-col">
                    <input class="cart-textarea p-4" placeholder="Comment">
                    </div>
                    <div class="deleteRow">X</div>
                </div>
                </div>
            </div>
        <br>
        </div>
        
    `;
    const parent = document.querySelector('.cart-container');
    parent.insertAdjacentHTML("beforeend", newcart);

    flagAndTagsChange();
    fillDataList();
    modalInsert();
    deleteRowsEvent();

    threeDotsFunc();

    divNotAdding();
    numericOrderFunc();
});

function insertToParent(arr) {
    const skuDb = {
        tags: {},
        comments: {},
        flags: {},
        url: {},
        row: {},
        active: {}
    };

    for (let i=0; i<arr.length; i++) {
        skuDb.tags[arr[i].SKU] = ``;
        skuDb.comments[arr[i].SKU] = ``;
        skuDb.flags[arr[i].SKU] = ``;
        skuDb.url[arr[i].SKU] = ``;
        skuDb.row[arr[i].SKU] = ``;
        skuDb.active[arr[i].SKU] = ``;
    }
    
    for (let i=0; i<arr.length; i++) {
        let arrWords = (arr[i].Tags).split("-");

        skuDb.flags[arr[i].SKU] = `${arr[i].Flags}`;
        
        skuDb.row[arr[i].SKU] += `<div class="gap-4 mb-4" style="display:grid;grid-template-columns: 0.2fr 0.2fr 2.4fr 1.2fr 0.2fr;">`;

        skuDb.url[arr[i].SKU] += `<div><img data-modal src="uploads/${arr[i].Tags}.png" alt="" width="55" class="cart-img"></div>`; 

        skuDb.tags[arr[i].SKU] += `<div class="tags flex flex-1 flex-col gap-4">`;
        skuDb.tags[arr[i].SKU] +=`<div class="custom-input">`;
        
        for(let a in arrWords){
            skuDb.tags[arr[i].SKU] +=`
                <span class="custom-input_word" contenteditable="true">
                    ${arrWords[a]}
                <button class="x-button" onclick="deleteSpan(event)">x</button>
                </span>
            `;
        }
        skuDb.tags[arr[i].SKU] +=`<input type="text" class="custom-input_input" oninput="addSpan(event)" list="tags"></div><!--separator--></div>`;
        
        skuDb.comments[arr[i].SKU] += `<div class="comments flex flex-col"><input class="cart-textarea p-4" value="${arr[i].comments}"></div>`;
        
        skuDb.row[arr[i].SKU] += `<div contenteditable="true" class="numericOrder">${countOccurence(skuDb.row[arr[i].SKU], "cart-textarea")+1}</div>`;
        skuDb.row[arr[i].SKU] += skuDb.url[arr[i].SKU];
        skuDb.row[arr[i].SKU] += skuDb.tags[arr[i].SKU];
        skuDb.row[arr[i].SKU] += skuDb.comments[arr[i].SKU];
        skuDb.row[arr[i].SKU] += '<div class="deleteRow">X</div></div>';

        skuDb.url[arr[i].SKU] = ``;
        skuDb.tags[arr[i].SKU] = ``;
        skuDb.comments[arr[i].SKU] = ``;
        skuDb.active[arr[i].SKU] = `${arr[i].Active}`;
    }

    

    let parent = document.querySelector('.cart-container');
    parent.innerHTML = "";
    parent.innerHTML += `
        <datalist  id="tagNamesDataList"></datalist>
    `;
    for (const [key, value] of Object.entries(skuDb.tags)) {
        
        // grid addclass for menu
        if (skuDb.active[key] == "Active") {
            parent.innerHTML += `
            <div class="cart">
                <div class="flex flex-col relative mb">
            
                    <div class="absolute menu" style="top: 16px; left:20px; width: 200px; background-color: white; border: 1px solid black; z-index: 200; font-size: 16px; box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);">
                        <span style="width: 100%; border-bottom: 1px solid black;">Archive</span>
                        <span style="width: 100%;">Delete permanently</span>
                    </div>
                    <div class="menu" style="background: rgba(0, 0, 0, 0.5);position: absolute;top: 0;bottom: 0;left: 0;right: 0; z-index: 100;"></div>

                    <div class="cart-header p-4 flex items-center gap-4">
                        <div class="discussion" style="font-size: 2em;"></div>

                        <div contenteditable="true" style="width: 45px; height:40px" class="tagCount border-2 border-black">${countOccurence(skuDb.row[key], "cart-textarea")}</div>
                        <div contenteditable="true" class="flex-1 title-sku">${key}</div> 
                        <div class="flagContainer">
                            <img src="${flagIcons(skuDb.flags[key])}" alt="Flags" width="45" class="flag">
                        </div>
                    </div>
                    <div class="cart-body p-4">
                        ${skuDb.row[key]}
                        
                    </div>
                </div>
                <br>
            </div>
            `;
        } else {
            parent.innerHTML += `
            <div class="cart nonActiveCart">
                <div class="flex flex-col relative mb">
                    
                    <div class="absolute menu" style="top: 16px; left:20px; width: 200px; background-color: white; border: 1px solid black; z-index: 200; font-size: 16px; box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);">
                        <span style="width: 100%; border-bottom: 1px solid black;">Restore</span>
                        <span style="width: 100%;">Delete permanently</span>
                    </div>
                    <div class="menu" style="background: rgba(0, 0, 0, 0.5);position: absolute;top: 0;bottom: 0;left: 0;right: 0; z-index: 100;"></div>

                    <div class="cart-header p-4 flex items-center gap-4 ">
                        <div class="discussion" style="font-size: 2em;"></div>

                        <div contenteditable="true" style="width: 45px; height:40px" class="tagCount border-2 border-black">${countOccurence(skuDb.row[key], "cart-textarea")}</div>
                        <div contenteditable="true" class="flex-1 title-sku">${key}</div> 
                        <div class="flagContainer">
                            <img src="${flagIcons(skuDb.flags[key])}" alt="Flags" width="45" class="flag">
                        </div>
                    </div>
                    <div class="cart-body p-4">
                        ${skuDb.row[key]}
                        
                    </div>
                </div>
            <br>
            </div>
            `;
        }
        
    }

    flagAndTagsChange();
    fillDataList();
    modalInsert();
    deleteRowsEvent();

    threeDotsFunc();


    divNotAdding();


    numericOrderFunc();

}

function numericOrderFunc() {
    const numerics = document.querySelectorAll('.numericOrder');
    numerics.forEach(num => {
        num.addEventListener('keyup', (e) => {
            if (e.key == "Enter") {
                const body = e.target.parentElement.parentElement,
                orders = body.querySelectorAll('.numericOrder');
                let arr = [];
                orders.forEach(order => {
                    arr.push(order);
                    if (order === e.target) {
                    } else if (order.textContent == e.target.textContent) {
                        order.textContent = +order.textContent + 1;
                    } else if (order.textContent < e.target.textContent) {
                        order.textContent = +order.textContent - 1;
                    }
                });
                arr = sortAsc(arr);
                
                arr.forEach((item, id) => {
                    item.textContent = id+1; 
                });
                
                const rows = [];
                arr.forEach(item => {
                    rows.push(item.parentElement);
                });

                console.log(rows);
                body.innerHTML = "";

                rows.forEach(row => {
                    body.append(row);
                });
            }
            
            
            
        });
    });
}

function threeDotsFunc() {
    const threeDots = document.querySelectorAll('.discussion');

    threeDots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const cart = e.target.parentElement.parentElement,
                  menus = cart.querySelectorAll('.menu');
            
            menus.forEach(menu => {
                menu.classList.add('show');
                menu.addEventListener('click', (e) => {
                    if(e.target.textContent == "Archive" || e.target.textContent == "Restore" ) {
                        e.target.parentElement.parentElement.parentElement.classList.toggle('nonActiveCart');
                    } else if (e.target.textContent == "Delete permanently"){
                        e.target.parentElement.parentElement.parentElement.remove();
                    } 
                });
            });

        }); 
    });

    document.getElementById('skuTab').addEventListener('click', (e) => {
        const menus = document.querySelectorAll('.menu');

        if(e.target.className != 'discussion') {
            menus.forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
}

function divNotAdding() {
    $('div[contenteditable]').keydown(function(e) {
        // trap the return key being pressed
        if (e.keyCode === 13) {
            // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
            document.execCommand('insertHTML', false, '<br/>');
            // prevent the default behaviour of return key pressed
            return false;
        }
    });
}

function deleteRowsEvent() {
    const deleteRows = document.querySelectorAll('.deleteRow');
    deleteRows.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cart = e.target.parentElement.parentElement.parentElement,
                  tagCount = cart.querySelector('.tagCount');
            e.target.parentElement.remove();
            tagCount.textContent -= 1;
        });
    });
}

function countOccurence (string, word) {
    return string.split(word).length - 1; // create array 
}

saveSkuBtn.addEventListener('click', (e) => {
    const sendArr = [];
    const skuArr = [];
    const tagsArr = [];
    const activeArr = [];
    const commentsArr = [];
    const flagsArr = [];

    const carts = document.querySelectorAll('.cart');

    carts.forEach(cart => {
        const sku = cart.querySelector('.cart-header .flex-1').textContent;
        const comment = cart.querySelectorAll('.cart-textarea');
        const flagImg = cart.querySelector('.flagContainer .flag');
        const flag = getValueFromSrc(flagImg.src);
        const tagContainer = cart.querySelectorAll('.tags');
       
        
        tagContainer.forEach((tagCont, id) => {
            const tags = tagCont.querySelectorAll('span');
            let stringTag = '';
            tags.forEach(tag => {
                stringTag += tag.textContent.trim().substring(0, tag.textContent.trim().length-1).trim() + '-';
            });
            stringTag = stringTag.substring(0, stringTag.length-1);

            
            if(cart.className.includes('nonActiveCart')) {
                skuArr.push(sku);
                tagsArr.push(stringTag);
                activeArr.push("Non-Active");
                commentsArr.push(comment[id].value);
                flagsArr.push(flag);
            } else {
                skuArr.push(sku);
                tagsArr.push(stringTag);
                activeArr.push("Active");
                commentsArr.push(comment[id].value);
                flagsArr.push(flag);
            }
            
        });

    });
    
    const url = `${skuUrl}?callback=callSku&sku=${skuArr}&tags=${tagsArr}&active=${activeArr}&comments=${commentsArr}&flags=${flagsArr}&action=send`;

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


const search = document.getElementById('searchInp');
search.addEventListener('keyup', (e) => {
    let searchValue = search.value.toUpperCase();
    
    let carts = document.querySelectorAll('.cart');
    let cartsArr = [];
    carts.forEach(cart => {
        if(!cart.className.includes("nonActiveCart")){
            let temp = cart.childNodes;
            temp.forEach(item => {
                if (item.nodeName == "DIV") {
                    // if (item.className.includes("cart-header") == true) {
                    //     cartsArr.push(item);
                    // } 
                    cartsArr.push(item);
                }
            });
        }
        
    });

    cartsArr.forEach(cart => {
        let title = cart.querySelector('.flex-1').textContent.toUpperCase(),
            tags = cart.parentElement.querySelectorAll('.custom-input_word');
        
        let stringTemp = '';

        tags.forEach(tag => {
            stringTemp += tag.textContent.trim().substring(0, tag.textContent.trim().length-1).toUpperCase();
        });
        if (title.includes(searchValue) || stringTemp.includes(searchValue)) {
            cart.parentElement.style.display = '';
        } else {
            cart.parentElement.style.display = 'none';
        }
    });

    
});

function flagIcons(flag) {
    if (flag == "in stock") {return "flags/gray_circle.png";}
    else if (flag == "discontinued no stock") {return "flags/red_circle.png";}
    else if (flag == "yellow discontinued in stock") {return "flags/yellow_circle.png";}
    return "";
}

// http://localhost:8888 Elegant-Flooring-Form
function getValueFromSrc(src) {
    if (src == "https://maxinum.kz/elegant_flooring/flags/gray_circle.png") {return "in stock";}
    else if (src == "https://maxinum.kz/elegant_flooring/flags/red_circle.png") {return "discontinued no stock";}
    else if (src == "https://maxinum.kz/elegant_flooring/flags/yellow_circle.png") {return "yellow discontinued in stock";}
    return "";
}

function toggleFlags(e) {
    let currentIndex = flagsSrc.indexOf(e.target.src);
    // console.log(currentIndex);
    // console.log(flagsSrc);
    // console.log(e.target.src);
    
    if (flagsSrc.length-1 == currentIndex) {
        e.target.src = flagsSrc[0];
    } else {
        currentIndex++;
        e.target.src = flagsSrc[currentIndex];
    }
}

function flagAndTagsChange() {
    const flagArr = document.querySelectorAll('.flag');
    flagArr.forEach(flag => {
        flag.addEventListener('click', toggleFlags, false); 
    });

    const tagCounts = document.querySelectorAll('.tagCount');
    tagCounts.forEach(count => {
        let currentCount;

        count.addEventListener('click', (e) => {
            e.preventDefault();
        });

        count.addEventListener('keyup', (e) => {
            e.preventDefault();
            const currentCount = e.target.textContent,
                  rows = e.target.parentElement.parentElement.querySelectorAll('.mb-4'),
                  cartBody = e.target.parentElement.parentElement.querySelector('.cart-body');
            
            if (e.key == "Enter") {
                if (rows.length < currentCount) {
                    const cnt = currentCount - rows.length;
                    
                    for (let i=0; i<cnt; i++) {

                        let row = `
                        <div class="gap-4 mb-4" style="display:grid;grid-template-columns: 0.2fr 0.2fr 2.4fr 1.2fr 0.2fr;">
                            <div contenteditable="true" class="numericOrder">${rows.length+i+1}</div>
                            <div><img data-modal src="cameraImg/drop_file.png" alt="" width="55" class="cart-img"></div>
                            <div class="tags flex flex-1 flex-col gap-4">
                            <div class="custom-input">
                                <input type="text" class="custom-input_input" oninput="addSpan(event)" list="tags">
                            </div><!--separator-->
                            </div>
                            <div class="comments flex flex-col">
                            <input class="cart-textarea p-4" placeholder="Comment">
                            </div>
                            <div class="deleteRow">X</div>
                        </div>
                        `;
                        

                        cartBody.insertAdjacentHTML('beforeend', row);

                        deleteRowsEvent();
                        modalInsert();
                            
                    }
                } else if (currentCount > 0){
                    let cnt = 0;
                    rows.forEach(row => {
                        cnt++;
                        if (cnt > currentCount) {
                            row.remove();
                        }
                    });
                }
            }
            
            
        });
    });
}

function fillDataList() {
    const datalist = document.querySelectorAll('#tagNamesDataList'),
          cartContainer = document.querySelector('.cart-container'),
          tagValueContainer = cartContainer.querySelectorAll('.cart-input'),
          tagValueArr = [];

    

    tagValueContainer.forEach(tagInp => {
        tagValueArr.push(tagInp.value);
    });

    datalist.forEach(list => {
        for (let i of list.childNodes) {
            i.remove();
        }
    });

    datalist.forEach(list => {
        for (let tag of tagValueArr) {
            const option = document.createElement('option');
            option.textContent = tag;
            list.append(option);
        }
        
    });

}

function closeModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = ''; //  браузер решит что поставить
}

function modalInsert() {
    // Modal
    const modalTriggers = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalClsBtn = document.querySelector('[data-close]');

    modalTriggers.forEach(tagImg => {
        tagImg.addEventListener('click', (e) => {
            
            modal.classList.add('show');
            modal.classList.remove('hide');
            //modal.classList.toggle('show') // второе решение, toggle если есть show, то удаляй если нет то добавляй
            document.body.style.overflow = 'hidden';
            
            //modalImg.style.backgroundImage = `url('${tagImg.src}')`;
            modal.querySelector('.modal__title').textContent = tagImg.parentElement.parentElement.parentElement.parentElement.querySelector('.flex-1').textContent;
            const modalContent = document.querySelector('.modal__content'),
                  formContent = document.querySelector('.myForm');

            clearDropImg();
            
            removeBtn(modalContent);

            const viewImg = document.createElement('img');
            viewImg.src = tagImg.src;
            viewImg.className = "view-image";
            viewImg.style.cssText = 'text-align: center; width: 300px; height: 300px';
            modalContent.append(viewImg);

            if (tagImg.src.includes("cameraImg/drop_file.png")) {
                clearDropImg();
                dropImg(modal, tagImg);
            } else {
                const editBtn = document.createElement('button');
                editBtn.classList.add('border', 'border-black', 'px-4', 'py-1', 'edit_mode', 'inline-block', 'mr-4', 'mb-4');
                editBtn.textContent = 'Edit';
                
                const deleteBtn = document.createElement('button');
                deleteBtn.classList.add('border', 'border-black', 'px-4', 'py-1', 'delete_mode', 'inline-block', 'mr-4', 'mb-4');
                deleteBtn.textContent = 'Delete';

                modalContent.append(editBtn);
                modalContent.append(deleteBtn);


                //const editBtn = modal.querySelector('.edit_mode');
            
                editBtn.addEventListener('click', (e) => {
                    clearDropImg();
                    removeBtn(modalContent);
                    dropImg(modal, tagImg);
                });

                deleteBtn.addEventListener('click', (e) => {
                    tagImg.src = "cameraImg/drop_file.png";
                    clearDropImg();
                    removeBtn(modalContent);
                    dropImg(modal, tagImg);
                });
            }

        });
    });
    

    modalClsBtn.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
}

function removeBtn(content) {
    const buttons = content.querySelectorAll('button');
    buttons.forEach(btn => {
        if (typeof btn !== null) {
            btn.remove();
        }
    });
}

function clearDropImg() {
    const modalContent = document.querySelector('.modal__content');
    for (let mod of modalContent.childNodes) {
        if (mod.className == "drop-zone" || mod.className == "view-image") {
            mod.remove();
        }
    }
}

function dropImg(modal, mainImg) {
    //selecting all required elements

    /*<form class="myForm inline-block">
        <button type="submit" class="border border-black px-4 py-1 upload_img inline-block">Upload</button>
    </form> */
    
    const div = document.createElement('div');
    div.classList.add('drop-zone');
    div.innerHTML = `
        <span class="drop-zone__prompt">Drop file here or click to upload</span>
        <input type="file" name="myFile" class="drop-zone__input">
    `;

    const btnSave = document.createElement('button');
    btnSave.classList.add('border', 'border-black', 'px-4', 'py-1', 'save_mode', 'inline-block', 'mr-4', 'mb-4');
    btnSave.textContent = 'Save';

    const modalContent = modal.querySelector('.modal__content');
    modalContent.append(div);

    // const formModal = document.createElement('form');
    // formModal.classList.add('myForm');

    modalContent.append(btnSave); //formModal
    //formModal.append(btnSave);

    const inputElement = modal.querySelector(".drop-zone__input");
    const dropZoneElement = inputElement.closest(".drop-zone");
    inputElement.value = "";
    
    let onceCall = 0;
    dropZoneElement.addEventListener("click", (e) => {
        if (onceCall == 0) {
            inputElement.click();
        }
        onceCall++;
    });

    inputElement.addEventListener('change', (e) => {
        
        const reader = new FileReader();

        reader.onload = function () {
            
            btnSave.addEventListener('click', (e) => {
                mainImg.src = reader.result;
                // let imgId = -1;
                let targetTag = "";

                // const imgContainer = document.querySelectorAll('.cart-img');
                // imgContainer.forEach((img, id) => {
                //     if (mainImg == img) {
                //         imgId = id;
                //     }
                // });


                const fieldTag = mainImg.parentElement.parentElement.querySelectorAll('.custom-input_word');
                fieldTag.forEach(field => {
                    targetTag += field.textContent.trim().substring(0, field.textContent.trim().length-1).trim() + "-";
                });

                targetTag = targetTag.substring(0, targetTag.length-1);
                
                
                // const tagContainer = document.querySelectorAll('.cart-input');
                // tagContainer.forEach((tag, id) => {
                //     if (imgId == id) {
                //         targetTag = tag;
                //     }
                // });

                Object.defineProperty(inputElement.files[0], 'name', {
                    writable: true,
                    value: targetTag
                });

                const endpoint = "upload.php";
                const formData= new FormData();

                formData.append("inpFile", inputElement.files[0], `${targetTag}.png`);
                
                fetch(endpoint, {
                    method: "get",
                    body: formData
                }).catch(console.error);

                closeModal();
            });
            

            // const formContent = document.querySelector('.myForm');
            //     formContent.addEventListener('submit', (e) => {
            //     e.preventDefault();

                
            // });

            const title = dropZoneElement.querySelector('.drop-zone__prompt');
            title.remove();

            // const insideDropImg = document.createElement("img");
            // insideDropImg.src = reader.result;
            // insideDropImg.style.display = "hidden";
            // insideDropImg.classList.add("tempImg");
            
            const thumbnailElement = document.createElement("div");
            thumbnailElement.classList.add("drop-zone__thumb");
            thumbnailElement.dataset.label = inputElement.files[0].name;
            thumbnailElement.style.backgroundImage = `url('${reader.result}')`;
            dropZoneElement.appendChild(thumbnailElement);
            // dropZoneElement.appendChild(insideDropImg);
        };

        reader.readAsDataURL(inputElement.files[0]);


    }, false);
}

function skuRecords() {
    const url = `${skuUrl}?action=read`;
    
    $.getJSON(url, function(json) {

        json.records = sortAsc(json.records);

        // for (let i=0; i<json.records.length; i++) {
        //     if (json.records[i].Active == "Non-Active") {
        //         allNonActiveValue.push(json.records[i]);
        //     } else if (json.records[i].Active == "Active") {
        //         allActiveValue.push(json.records[i]);
        //     }
        // }
        //console.log(json.records);
        
        
        insertToParent(json.records);

    });
}

document.querySelector('div.sortBtn').addEventListener('click', (e) => {

    let isPressed = checkForPressed(e);
    let cartHeader = document.querySelectorAll('.cart-header .flex-1');
    let arr = [];

    cartHeader.forEach(item => {
        //if(!item.parentElement.parentElement.parentElement.className.includes("nonActiveCart")){
            arr.push(item);
        //}
    });


    if (isPressed) {
        
        arr = sortDesc(arr);

        changeParent(arr);

    } else {
       
        arr = sortAsc(arr);

        changeParent(arr);
    }
    
});


function changeParent(arr) {
    let blocks = [];
    arr.forEach(item => {
        blocks.push(item.parentElement.parentElement.parentElement);
    });

    let parent = document.querySelector('.cart-container');
    parent.innerHTML = "";
    blocks.forEach(block => {
        let bre = document.createElement('br');
        parent.append(block);
        parent.append(bre);
    });
}

function checkForPressed(e) {
    let isPressed = false;
    if (e.target.tagName == "DIV") {
        if (e.target.style.backgroundColor == 'white') {
            for (let i of e.target.childNodes) {
                console.log(i.src);
                if (i.src == "elegant_flooring/icons/sort-aplhabet-desc.svg") {
                    i.src = "elegant_flooring/icons/sort-aplhabet-asc.svg";
                } else if (i.src == "elegant_flooring/icons/sort-aplhabet-asc.svg") {
                    i.src = "elegant_flooring/icons/sort-aplhabet-desc.svg";
                }
            }

            e.target.style.backgroundColor = '#EDEBD7';
            isPressed = false;

        } else {
            for (let i of e.target.childNodes) {
                if (i.src == "elegant_flooring/icons/sort-aplhabet-asc.svg") {
                    i.src = "elegant_flooring/icons/sort-aplhabet-desc.svg";
                } else if (i.src == "elegant_flooring/icons/sort-aplhabet-desc.svg") {
                    i.src = "elegant_flooring/icons/sort-aplhabet-asc.svg";
                } 
            }

            e.target.style.backgroundColor = 'white';
            isPressed = true;
        }
        
    } else {
        if (e.target.parentElement.style.backgroundColor == 'white') {

            if (e.target.src == "elegant_flooring/icons/sort-aplhabet-desc.svg") {
                e.target.src = "elegant_flooring/icons/sort-aplhabet-asc.svg";
            } else if (e.target.src == "elegant_flooring/icons/sort-aplhabet-asc.svg") {
                e.target.src = "elegant_flooring/icons/sort-aplhabet-desc.svg";
            } 
            
            e.target.parentElement.style.backgroundColor = '#EDEBD7';
            isPressed = false;
        } else {

            if (e.target.src == "elegant_flooring/icons/sort-aplhabet-asc.svg") {
                e.target.src = "elegant_flooring/icons/sort-aplhabet-desc.svg";
            } else if (e.target.src == "elegant_flooring/icons/sort-aplhabet-desc.svg") {
                e.target.src = "elegant_flooring/icons/sort-aplhabet-asc.svg";
            }
            
            e.target.parentElement.style.backgroundColor = 'white';
            isPressed = true;
        }
    }

    return isPressed;
}

function sortAsc(arr) {

    arr.sort(function(a, b) {
        if (a.textContent < b.textContent) {
            return -1;
        } else if (a.textContent > b.textContent) {
            return 1;
        } else {
            return 0;
        }
    });
    return arr;
}

function sortDesc(arr) {
    arr.sort(function(a, b) {
        if (a.textContent > b.textContent) {
            return -1;
        } else if (a.textContent < b.textContent) {
            return 1;
        } else {
            return 0;
        }
    });

    return arr;
}

function addSpan(e) {
    e = e || window.event;
    var input = e.target || e.srcElement;
    var str = input.value;
    var arr = str.split(/[\s,]+/);

    if (arr.length > 1) {
        let span = `<span class="custom-input_word"contenteditable="true">${arr[0]}<button class="x-button" onclick="deleteSpan(event)">x</button></span>`;
        input.insertAdjacentHTML("beforebegin", span);
        input.value = "";
    }
}

function deleteSpan(e) {
    e = e || window.event;
    var input = e.target || e.srcElement;
    
    input.parentElement.remove();
}

