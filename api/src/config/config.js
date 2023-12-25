import {config} from 'dotenv'

export class ConfigService{
    config;
    constructor(){
        const result = config({path: `./env/.${process.env.NODE_ENV}`});
        if(result.error){
            console.log('[Configuration] Error occured while loading');
        }else{
            this.config = result.parsed;
            console.log('[Configuration] file loaded successfully');
        }
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new ConfigService();
        }
        return this.instance;
    }
    get(key){
        return this.config[key];
    }
}