// zip -1 -x "*screens*" -x "*/\.*" x ".*"  -x "*.zip" -r addon.zip .

const settings = new Config();

//https://api.zdf.de/broker/
const regex1 = /^https:\/\/api\.(zdf)\.de\/broker\//;


const XHR = XMLHttpRequest.prototype;
const send = XHR.send; //save original
const open = XHR.open; //save original
const store = {};

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


XHR.open = function(method, url) {

    //only modify broker URLs
    if (regex1.test(url)) {
        let name = Config.getBrokerConfig(url);
        let config = settings.getConfig(name);

        //only modify enabled URLs
        if (config.enabled && config.url != ""){
            this.url = config.url;
            this.timeout = 5000;
            this.ontimeout = ((name)=>{
                return (e)=>{                   
                    console.error("config:",name,"timed out");
                    settings.upsertConfig({name:name, enabled:false})
                }
            })(name)
            arguments[1] = config.url;
            return open.apply(this, arguments);
            //Object.defineProperty(this, 'status',     {writable: true});
            //Object.defineProperty( this, "url", { value: "https://ts1-staging.recos.aws.hrnmtech.de/trending?broker=1" });
        }
    } 

    this.url = url
    return open.apply(this, arguments);
}



XHR.send = function() {    
    this.addEventListener('load', function() {
        
        if ( regex1.test(this.url) ){
            //stage1( this.url, this.response );
            //console.log(this.url)
        } 

    });
    //this.onreadystatechange = readyState_callback;
    return send.apply(this, arguments);
};

