// zip -1 -x "*screens*" -x "*/\.*" x ".*"  -x "*.zip" -r addon.zip .

const settings = new Config();

//intercept only calls to the recommendation broker
const regex1 = /^https:\/\/(api|zdf-int-api)\.(zdf)\.de\/broker\//;

const XHR = XMLHttpRequest.prototype;
const open = XHR.open; //save original


XHR.open = function(method, url) {

    //only modify broker URLs
    if (regex1.test(url)) {

        //get brokerconfiguration from url
        //example: https://api.zdf.de/broker/relay?brokerConfiguration=doku1&appId=exozet-zdf-pd-0.63.1676
        let name = Config.getBrokerConfig(url);
        
        //load config from localStorage
        //example: {"name":"doku2","enabled":false,"url":"https://ts1-dev.recos.aws.hrnmtech.de/trending?broker=1"}
        let config = settings.getConfig(name);

        //only modify enabled URLs
        if (config.enabled && config.url != ""){
            this.timeout = 5000;
            this.ontimeout = ((name)=>{
                return (e)=>{                   
                    //frontend doesnt handle timeouts so well,
                    // thats why the config gets disabled to be able to fix the url.
                    console.error("config:",name,"timed out");
                    settings.upsertConfig({name:name, enabled:false})
                }
            })(name)
            arguments[1] = config.url;
            return open.apply(this, arguments);
        }
    } 

    return open.apply(this, arguments);
}


//zu spät und zu langsam
// const readyState_callback = async function () {
//     // "this" will be the XHR object
//     // it will contain status and readystate
//     if ( regex1.test(this.url) && (this.readyState == 4)){
//         console.log("xx readyState", this.url)
//         const urlParams = new URLSearchParams( (new URL(this.url).search) );
//         if (urlParams.get('brokerConfiguration') == "doku1"){
//             //Object.defineProperty( this, "responseText", { value: JSON.stringify(q2) });
//             //Object.defineProperty( this, "response", { value: JSON.stringify(q2) });
            
//         }
//     };
// }