//this codes add a checkbox and url input to tell the addon which urls it should modify

async function addAngleAndEditor(){

    //internal function to for angle click event
    function clickedAngle(e){
        let a1 = e.target.closest("article");
        //let editor = a1.querySelector("span.editor");
        let label = a1.querySelector("label.toggle");

        //console.log(e)
        //toggle
        //editor.classList.toggle("open");
        label.classList.toggle("open");
        //e.preventDefault();
        e.stopPropagation();
    }

    //add open/close html and logic
    function getLabelHtml(index, enabled){
        let el = document.createElement("label");
        el.setAttribute("for", `checkbox${index}`);
        el.classList.add("toggle");
        if (enabled){
            el.classList.add("open");
        }
        return el
    }
    //add open/close html and logic
    function getCheckboxHtml(index, enabled){
        let el = document.createElement("input");
        el.addEventListener("click", clickedAngle, false);
        el.type = "checkbox";
        el.classList.add("toggle");
        el.checked = enabled;
        el.id = `checkbox${index}`;   
        return el;
    }

    //internal function to for url checkbox event
    function urlcheckbox(e){
        //save new state
        settings.upsertConfig({
            name: e.target.value,
            enabled: e.target.checked        
        });
    }

    //internal function to for url modification event
    function saveCustomUrl(e){
        settings.upsertConfig({
            name: e.target.getAttribute("brokerconfig"),
            url: e.target.value        
        });
    }
    //add editor html and logic
    function editorHtml(config){

        let editor = document.createElement("div")
        editor.classList.add("container")
        editor.innerHTML = `
        <span class="editor" brokerconfig="${config.name}">
            <div class="editor">
                <span class="checkbox">
                <label><input type="checkbox" value="${config.name}">override URL:</label>
                </span>
                <span class="url">
                    
                    <input type="url" 
                            value="${config.url}"
                            brokerconfig="${config.name}"
                            placeholder="https://ts1-staging.recos.aws.hrnmtech.de/trending?broker=1" size="150">
                </span>            
            </div>
        </span>
        `;

        editor.querySelector("input[type=checkbox]").checked = config.enabled;
        editor.querySelector("input[type=checkbox]").addEventListener("click", urlcheckbox, false);
        editor.querySelector("input[type=url]").addEventListener("change", saveCustomUrl, false);
        //editor.setAttribute("brokerconfig", brokerconfig);

        return editor;
    }


    function modifyArticle(article,idx)
    {
        

        //get original brokerConfiguration
        //example: /broker/recommendations?brokerConfiguration=doku2&abGroup={abGroup}&appId={appId}
        let configString = article.getAttribute("data-clusterrecommendation-template");
        //example: doku2
        let brokerconfig = Config.getBrokerConfig(configString);
        let config       = settings.getConfig(brokerconfig);
        
        //no mods on default/fallbacks
        //if (config == "default") return; 
        

        //add config to node for easy access
        //article.setAttribute("brokerconfig", config);

        let label    = getLabelHtml(idx, config.enabled);
        let checkbox = getCheckboxHtml(idx, config.enabled);
        let editor   = editorHtml(config);
        
        article.querySelector("h2").appendChild(label);
        article.querySelector("header").after(editor);
        article.querySelector("header").after(checkbox);

        //check if config exists
        //let cssClass = readConfig(config).enabled == true?"enabled":""
        //cssClass!=""?pen.classList.add(cssClass):1;
        
    }

    //Main
    //settings can be loaded first
    const settings = new Config();
    document.querySelectorAll('article[data-clusterrecommendation-template]').forEach(modifyArticle);
}

document.addEventListener("DOMContentLoaded", addAngleAndEditor);

