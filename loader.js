function addScript(){
    let myscript;

    //load script to read/write settings to localStorage
    myscript= document.createElement('script');
    myscript.src = chrome.runtime.getURL("utils.js");
    document.documentElement.appendChild(myscript);     

    //script to overwrite XMLHttpRequests url if they match the selected configuration
    myscript = document.createElement('script');
    myscript.src = chrome.runtime.getURL("inject.js");
    document.documentElement.appendChild(myscript);    
    
    //add frontend to edit the recommendation cluster and add an alternative recommendation source url
    myscript= document.createElement('script');
    myscript.src = chrome.runtime.getURL("toggle.js");
    document.documentElement.appendChild(myscript);     
      
}

function addCss()
{
    let mycss = document.createElement('link');

    //adds open/close button
    mycss.href = chrome.runtime.getURL("style/toggle.css");
    mycss.rel = "stylesheet";
    document.documentElement.appendChild(mycss);
    
    mycss = document.createElement('link');
    //adds url bar to enter custom url
    mycss.href = chrome.runtime.getURL("style/editor.css");
    mycss.rel = "stylesheet";
    document.documentElement.appendChild(mycss);    
}

addScript();
addCss();
