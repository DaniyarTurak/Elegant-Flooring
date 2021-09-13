document.querySelectorAll('.buttonContainer button').forEach((item, id) => {
    let tabPanels=document.querySelectorAll(".tabContainer .tabPanel");
    if (id == 0) { 
        item.style.cssText = 'background-color: #273550;';
        tabPanels[id].style.display="block";
    }

    item.addEventListener('click', (e) => {
        let parent = item.parentElement;

        for (let btn of parent.childNodes) {
            if (btn.nodeName == "BUTTON") {
                btn.style.cssText = 'background-color: #273236';
            }
        }
        item.style.cssText = 'background-color: #273550;';

        tabPanels.forEach(node => {
            node.style.display="none";
        });
        tabPanels[id].style.display="block";
    });
});