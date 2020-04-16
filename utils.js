
class Config{


    constructor(){

    }

    upsertConfig(config){

        try {
            config = { ...JSON.parse(localStorage.getItem(config.name)), ...config }
            localStorage.setItem(config.name, JSON.stringify(config))
        } catch (error){
            console.warn("Save config failed", error);
        }        
        
    }
    
    getConfig(name){
        let config =  { "name": name, "enabled": false, "url": "" } //default;
        try {
            config = { ...config, ...JSON.parse(localStorage.getItem(name)) }
        } catch (error){
            console.warn("Load config failed", error);
        }
        return config;    
    }
    
    toggleConfig( config ){
        let conf = getConfig(config);
        conf.enabled = !conf.enabled;
        saveConfig(conf);
    }

    static getBrokerConfig(configString){
        try {
            return (new URLSearchParams( configString.split('?')[1] )).get('brokerConfiguration')
        } catch (error) {
            return "default";
        }
    }    
}


/**

{
    "doku1": //brokerConfig
    {
        enabled: true/false
        url: "neue url"
    }
}


 */