function addScript(){
    let myscript;
    myscript= document.createElement('script');
    myscript.src = chrome.runtime.getURL("utils.js");
    document.documentElement.appendChild(myscript);     

    myscript = document.createElement('script');
    myscript.src = chrome.runtime.getURL("inject.js");
    document.documentElement.appendChild(myscript);    
    
    myscript= document.createElement('script');
    myscript.src = chrome.runtime.getURL("toggle.js");
    document.documentElement.appendChild(myscript);     
      
}

function addCss()
{
    let mycss = document.createElement('link');
    mycss.href = chrome.runtime.getURL("style/toggle.css");
    mycss.rel = "stylesheet";
    document.documentElement.appendChild(mycss);
    
    mycss = document.createElement('link');
    mycss.href = chrome.runtime.getURL("style/editor.css");
    mycss.rel = "stylesheet";
    document.documentElement.appendChild(mycss);    
}


if (window.location.pathname.indexOf("/fehler/")>-1){

    addScript();
    addCss();
}
