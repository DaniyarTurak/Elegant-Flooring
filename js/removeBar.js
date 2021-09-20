// function loadCSS(iframeId, filename){ 
//     var file = document.createElement("link");
//     file.setAttribute("rel", "stylesheet");
//     file.setAttribute("type", "text/css");
//     file.setAttribute("href", filename);
//     document.getElementById(iframeId).contentWindow.document.head.appendChild(file);
//     console.log(file);
//     console.log(iframeId);   
//  }

 // just call a function to load your CSS
 // this path should be relative your HTML location
// loadCSS("dashboard", "simpleIframe.css");



// //second
// const iframeBord = document.querySelector('.iframe-border');
// iframeBord.addEventListener('click', (e) => {
//     console.log(e.target);
//     const iframe = document.getElementById('dashboard');
//     console.log(iframe);
//     iframe.style.pointerEvents = 'all';
// });