async function open(){}


async function clickedPen(e){
    let a1 = e.target.closest("article");
    let pen = e.target;

    //save 
    let config = a1.getAttribute("brokerconfig");
    //toggle
    pen.classList.toggle("enabled")
    //save new state
    toggleConfig( config )
    
}




async function saveCustomUrl(e){
    let editor = e.target.closest("div.editor")
    let brokerconfig = editor.getAttribute("brokerconfig")

    let config = readConfig(brokerconfig);
    config.url = e.target.value
    saveConfig(config);
    //console.log("save",e.target.value)
    
}



function editorHtml(brokerconfig){
    let editor = document.createElement("span")
    editor.classList.add("editor")

    let config = readConfig(brokerconfig);

    editor.innerHTML = `
    
        <div class="editor">
            <span class="checkbox">
                <input type="checkbox">
            </span>
            <span class="url">
                <label>override URL:</label>
                <input type="url" name="name" 
                        value="${config.url}"
                        brokerconfig="${brokerconfig}"
                        placeholder="https://api.zdf.de/broker/recommendations?brokerConfiguration=doku3" size="150">
            </span>            
        </div>
    `;

    editor.addEventListener("change", saveCustomUrl, false);
    editor.setAttribute("brokerconfig", brokerconfig);

    return editor;
}

function getPenHtml(){    
    let pen = document.createElement("div")
    pen.addEventListener("click", clickedPen, false);
    pen.innerText = " ";
    pen.classList.add("pencil");    
    return pen;
}


async function addPen(){
    document.querySelectorAll('article[data-clusterrecommendation-template]').forEach(item=>{
        //console.log(item.getAttribute("data-clusterrecommendation-template"))

        //get config
        let configString = item.getAttribute("data-clusterrecommendation-template");
        let config = getBrokerConfig(configString) ;
        
        //no mods on default/fallbacks
        if (config == "default") return; 

        //add config to node for easy access
        item.setAttribute("brokerconfig", config);

        let pen = getPenHtml();
        let editor = editorHtml(config);
        
        item.querySelector("h2").appendChild(pen)
        item.querySelector("header").after(editor)

        //check if config exists
        let cssClass = readConfig(config).enabled == true?"enabled":""
        cssClass!=""?pen.classList.add(cssClass):1;
        
    })
}


function addHtml(){
    //add angle
    
    //add editor
}

//settings can be loaded first
//loadSettings()
document.addEventListener("DOMContentLoaded", addHtml);
//document.addEventListener("DOMContentLoaded", addPen);
