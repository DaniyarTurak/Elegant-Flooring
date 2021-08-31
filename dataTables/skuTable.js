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

const activeCheckbox = document.querySelector('[type="checkbox"]');
activeCheckbox.addEventListener('change', (e) => {
    if (e.target.checked == true) {
        console.log("Checked");
        insertToParent(allActiveValue);
        isActive = true;
    } else {
        console.log("Unchecked");
        insertToParent(allNonActiveValue);
        isActive = false;
    }
});

addSkuBtn.addEventListener('click', (e) => {

    const carts = document.querySelectorAll('.cart');

    if (isActive) {
        while(allActiveValue.length>0){
            allActiveValue.pop();
        }
    } else {
        while(allNonActiveValue.length>0){
            allNonActiveValue.pop();
        }
    }

    carts.forEach(cart => {
        const tags = cart.querySelectorAll('.cart-input'),
        comment = cart.querySelector('.cart-textarea'),
        flag = cart.querySelector('.flag'),
        sku = cart.querySelector('.title-sku');

        tags.forEach(tag => {
            if (isActive) {
                allActiveValue.push({'Active': "Active", 'Flags': getValueFromSrc(flag.src), 'SKU': sku.textContent, 'Tags': tag.value, 'comments': comment.textContent});
            } else {
                allNonActiveValue.push({'Active': "Active", 'Flags': getValueFromSrc(flag.src), 'SKU': sku.textContent, 'Tags': tag.value, 'comments': comment.textContent});
            }
            
        });
    });
    
    if (isActive) {
        insertToParent(allActiveValue);
    } else {
        insertToParent(allNonActiveValue);
    }
    

    

    const parent = document.querySelector('.cart-container');
    parent.innerHTML += `
    <div class="cart flex flex-col">
        <div class="cart-header p-4 flex items-center gap-4">
            <div contenteditable="true" style="width: 45px;" class="tagCount border-2 border-black">1</div>
            <div contenteditable="true" class="flex-1 title-sku"></div>
            <div class="flagContainer">
                <img src="flags/gray_circle.png" alt="" width="45" class="flag">
            </div>
        </div>
        <div class="cart-body p-4">
            <div class="flex flex-row gap-4">
                <div class="flex flex-col gap-4">
                    <div class="cart-item-img"><img data-modal src="cameraImg/drop_file.png" alt="" width="55" class="cart-img"></div>
                </div>
                <div class="tags flex flex-1 flex-col gap-4">
                    <div class="cart-item-input"><input list="tagNamesDataList" type="text" class="cart-input pl-2" placeholder="Name"></div>
                </div>
                <div class="comments flex flex-col">
                    <textarea class="cart-textarea p-4" placeholder="Comment"></textarea>
                </div>
            </div>
        </div>
    </div>
    <br>
    `;

    


    flagAndTagsChange();
    fillDataList();
    modalInsert();
});

function insertToParent(arr) {
    const skuDb = {
        tags: {},
        comments: {},
        flags: {},
        url: {}
    };

    for (let i=0; i<arr.length; i++) {
        skuDb.tags[arr[i].SKU] = ``;
        skuDb.comments[arr[i].SKU] = ``;
        skuDb.flags[arr[i].SKU] = ``;
        skuDb.url[arr[i].SKU] = ``;
    }


    
    for (let i=0; i<arr.length; i++) {
        skuDb.tags[arr[i].SKU] +=`<input type="text" list="tagNamesDataList" class="cart-input pl-2" placeholder="Name" value="${arr[i].Tags}"><!--separator-->`;

        skuDb.comments[arr[i].SKU] = `<textarea class="cart-textarea p-4" placeholder="Comment">${arr[i].comments}</textarea>`;
    
        skuDb.flags[arr[i].SKU] = `${arr[i].Flags}`;
        
        skuDb.url[arr[i].SKU] += `<img data-modal src="uploads/${arr[i].Tags}.png" alt="" width="55" class="cart-img">`;


        
    }

    let parent = document.querySelector('.cart-container');
    parent.innerHTML = "";
    parent.innerHTML += `
        <datalist  id="tagNamesDataList"></datalist>
    `;
    for (const [key, value] of Object.entries(skuDb.tags)) {
        parent.innerHTML += `
            <div class="cart flex flex-col">
                <div class="cart-header p-4 flex items-center gap-4">
                    <img class="deleteActive" src="icons/delete.png" alt="delete">
                    <div contenteditable="true" style="width: 45px;" class="tagCount border-2 border-black">${skuDb.tags[key].split('<!--separator-->').filter(a => a.length>0).length}</div>
                    <div contenteditable="true" class="flex-1 title-sku">${key}</div> 
                    <div class="flagContainer">
                        <img src="${flagIcons(skuDb.flags[key])}" alt="" width="45" class="flag">
                    </div>
                </div>
                <div class="cart-body p-4">
                    <div class="flex flex-row gap-4">
                        <div class="imgIcons flex flex-col gap-4">
                            ${skuDb.url[key]}
                        </div>
                        <div class="tags flex flex-1 flex-col gap-4">
                            ${skuDb.tags[key]}
                            
                        </div>
                        <div class="comments flex flex-col">
                            ${skuDb.comments[key]}
                        </div>
                    </div>
                </div>
            </div>
            <br>
        `;
    }

    flagAndTagsChange();
    fillDataList();
    modalInsert();

    const deleteActive = document.querySelectorAll('.deleteActive');
    deleteActive.forEach(btn => {
        
            btn.addEventListener('click', (e) => {
                //console.log(e.target.parentElement.parentElement);
                
                if (isActive == true) {
                    const cart = e.target.parentElement.parentElement,
                    sku = cart.querySelector('.flex-1').textContent;
                
               
                    
                    for (let i=0; i<allActiveValue.length; i++) {
                        
                        if (Object.values(allActiveValue[i]).indexOf(sku) > -1) {
                            allNonActiveValue.push(allActiveValue[i]);
                            allActiveValue.splice(i, 1);
                            i--;
                        }
                    }

                    insertToParent(allActiveValue);
                } else {
                    const cart = e.target.parentElement.parentElement,
                    sku = cart.querySelector('.flex-1').textContent;
                
                    for (let i=0; i<allNonActiveValue.length; i++) {
                        
                        if (Object.values(allNonActiveValue[i]).indexOf(sku) > -1) {
                            allNonActiveValue.splice(i, 1);
                            i--;
                        }
                    }

                    insertToParent(allNonActiveValue);
                }
                

            });
      
            
    });

}

saveSkuBtn.addEventListener('click', (e) => {
    const sendArr = [];
    const skuArr = [];
    const tagsArr = [];
    const activeArr = [];
    const commentsArr = [];
    const flagsArr = [];



    const carts = document.querySelectorAll('.cart');

    if (isActive == true) {
        carts.forEach(cart => {
            const sku = cart.querySelector('.cart-header .flex-1').textContent;
            const comment = cart.querySelector('.cart-textarea');
            const flagImg = cart.querySelector('.flagContainer .flag');
            const flag = getValueFromSrc(flagImg.src);
    
            const tags = cart.querySelectorAll('.tags input');
            tags.forEach(tag => {
                // sendArr.push([sku, tag.value, "Active", comment.textContent, flag]);
                
                skuArr.push(sku);
                tagsArr.push(tag.value);
                activeArr.push("Active");
                commentsArr.push(comment.textContent);
                flagsArr.push(flag);
            });
        });

        for (let i =0; i<allNonActiveValue.length;i++) {
            skuArr.push(allNonActiveValue[i].SKU);
            tagsArr.push(allNonActiveValue[i].Tags);
            activeArr.push(allNonActiveValue[i].Active);
            commentsArr.push(allNonActiveValue[i].comments);
            flagsArr.push(allNonActiveValue[i].Flags);
        }


    } else {
        carts.forEach(cart => {
            const sku = cart.querySelector('.cart-header .flex-1').textContent;
            const comment = cart.querySelector('.cart-textarea');
            const flagImg = cart.querySelector('.flagContainer .flag');
            const flag = getValueFromSrc(flagImg.src);
    
            const tags = cart.querySelectorAll('.tags input');
            tags.forEach(tag => {
                // sendArr.push([sku, tag.value, "Active", comment.textContent, flag]);
                
                skuArr.push(sku);
                tagsArr.push(tag.value);
                activeArr.push("Non-Active");
                commentsArr.push(comment.textContent);
                flagsArr.push(flag);
            });
        });

        for (let i =0; i<allActiveValue.length;i++) {
            skuArr.push(allActiveValue[i].SKU);
            tagsArr.push(allActiveValue[i].Tags);
            activeArr.push(allActiveValue[i].Active);
            commentsArr.push(allActiveValue[i].comments);
            flagsArr.push(allActiveValue[i].Flags);
        }
    }
    
    
    const url = `${skuUrl}?callback=callSku&sku=${skuArr}&tags=${tagsArr}&active=${activeArr}&comments=${commentsArr}&flags=${flagsArr}&action=send`;

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
        let temp = cart.childNodes;
        temp.forEach(item => {
            if (item.nodeName == "DIV") {
                if (item.className.includes("cart-header") == true) {
                    cartsArr.push(item);
                } 
            }
        });
    });

    cartsArr.forEach(cart => {
        let title = cart.querySelector('.flex-1').textContent.toUpperCase(),
            tags = cart.parentElement.querySelectorAll('.cart-input');
        
        let stringTemp = '';

        tags.forEach(tag => {
            
            stringTemp += tag.value.toUpperCase();
            
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

        count.addEventListener('focusout', (e) => {
            e.preventDefault();
            const currentCount = e.target.textContent;
            const tabContainer =  e.target.parentElement.parentElement.querySelector('.tags');
            const imgConainer = e.target.parentElement.parentElement.querySelector('.imgIcons');
            
            if (tabContainer.querySelectorAll('input').length < currentCount) {
                const cnt = currentCount - tabContainer.querySelectorAll('input').length;
                for (let i=0; i<cnt; i++) {
                    const temp = document.createElement('input');
                    temp.classList.add('tags', 'flex', 'flex-1', 'flex-col', 'gap-4');

                    tabContainer.append(temp);

                    const tempImg = document.createElement('img');
                    tempImg.setAttribute('data-modal', ''); 
                    tempImg.src = "cameraImg/ImageNo.png";
                    tempImg.className = "cart-img";
                    tempImg.width = "55";

                    imgConainer.append(tempImg);
                    modalInsert();
                }
            } else {
                const tabsInput  = tabContainer.querySelectorAll('input'),
                      tabsImg = imgConainer.querySelectorAll('.cart-img');

                let cnt = 0;
                tabsInput.forEach(item => {
                    cnt++;
                    if (cnt > currentCount) { item.remove(); }
                });

                cnt = 0;
                tabsImg.forEach(item => {
                    cnt++;
                    if (cnt > currentCount) { item.remove(); }
                });
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

function modalInsert() {
    // Modal
    const modalTriggers = document.querySelectorAll('[data-modal]'),
    modal = document.querySelector('.modal'),
    modalClsBtn = document.querySelector('[data-close]');

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = ''; //  браузер решит что поставить
    }

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

    const formModal = document.createElement('form');
    formModal.classList.add('myForm');

    modalContent.append(formModal);
    formModal.append(btnSave);

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
            });
            

            const formContent = document.querySelector('.myForm');
                formContent.addEventListener('submit', (e) => {
                e.preventDefault();

                let imgId = -1;
                let targetTag = "";

                const imgContainer = document.querySelectorAll('.cart-img');
                imgContainer.forEach((img, id) => {
                    if (mainImg == img) {
                        imgId = id;
                    }
                });

                const tagContainer = document.querySelectorAll('.cart-input');
                tagContainer.forEach((tag, id) => {
                    if (imgId == id) {
                        targetTag = tag;
                    }
                });

                // Object.defineProperty(inputElement.files[0], 'name', {
                //     writable: true,
                //     value: targetTag.value
                // });

                const endpoint = "upload.php";
                const formData= new FormData();

                formData.append("inpFile", inputElement.files[0], `${targetTag.value}.png`);
                
                fetch(endpoint, {
                    method: "post",
                    body: formData
                }).catch(console.error);
            });

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

        for (let i=0; i<json.records.length; i++) {
            if (json.records[i].Active == "Non-Active") {
                allNonActiveValue.push(json.records[i]);
            } else if (json.records[i].Active == "Active") {
                allActiveValue.push(json.records[i]);
            }
        }
        //sconsole.log(json.records);

        insertToParent(allActiveValue);


    });
}

document.querySelector('div.sortBtn').addEventListener('click', (e) => {

    let isPressed = checkForPressed(e);
    let temp = document.querySelectorAll('.cart-header .flex-1');
    let arr = [];

    temp.forEach(item => {
        arr.push(item);
    });


    if (isPressed) {
        
        arr = sortDesc(arr);

        changeParent(arr);

    } else {
       
        arr = sortAsc(arr);

        changeParent(arr);
    }
    
});

document.querySelector('div.sortByNum').addEventListener('click', (e) => {
    
    let isPressed = checkForPressed(e);
    let temp = document.querySelectorAll('.tagCount');
    let arr = [];
    temp.forEach(item => {
        arr.push(item);
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
        blocks.push(item.parentElement.parentElement);
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
                if (i.src == "icons/sort-aplhabet-desc.svg") {
                    i.src = "icons/sort-aplhabet-asc.svg";
                } else if (i.src == "icons/number-desc-sort.svg") {
                    i.src = "icons/number-asc-sort.svg";
                }
            }

            e.target.style.backgroundColor = '#EDEBD7';
            isPressed = false;

        } else {
            for (let i of e.target.childNodes) {
                if (i.src == "icons/sort-aplhabet-asc.svg") {
                    i.src = "icons/sort-aplhabet-desc.svg";
                } else if (i.src == "icons/number-asc-sort.svg") {
                    i.src = "icons/number-desc-sort.svg";
                }
                
            }

            e.target.style.backgroundColor = 'white';
            isPressed = true;
        }
        
    } else {
        if (e.target.parentElement.style.backgroundColor == 'white') {

            if (e.target.src == "icons/sort-aplhabet-desc.svg") {
                e.target.src = "icons/sort-aplhabet-asc.svg";
            } else if (e.target.src == "icons/number-desc-sort.svg") {
                e.target.src = "icons/number-asc-sort.svg";
            }
            e.target.parentElement.style.backgroundColor = '#EDEBD7';
            isPressed = false;
        } else {

            if (e.target.src == "icons/sort-aplhabet-asc.svg") {
                e.target.src = "icons/sort-aplhabet-desc.svg";
            } else if (e.target.src == "icons/number-asc-sort.svg") {
                e.target.src = "icons/number-desc-sort.svg";
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


function changeLanguage(language) {
    var element = document.getElementById("url");
    element.value = language;
    element.innerHTML = language;
}

function showDropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}