import pg from 'pg'
import { ConfigService } from './config.js';
const {Pool} = pg;

export class PostgreConfig{
    constructor(){
        this.configService = ConfigService.getInstance();
        this.pool = new Pool({
            host: this.configService.get('POSTGRE_HOST'),
            port: parseInt(this.configService.get('POSTGRE_PORT')),
            database: this.configService.get('POSTGRE_DB'),
            user: this.configService.get('POSTGRE_USER'),
            password: this.configService.get('POSTGRE_PASSWORD'),
            dialect: this.configService.get('POSTGRE_DIALECT'),
        })
    }
    static getInstance(){
        if(!this.instance){
            this.instance = new PostgreConfig();
        }
        return this.instance;
    }
    async connect(){
        try{
            this.pool.connect();
            console.log('[Postgresql] connected to database');
        }catch(e){
            console.log('[Postgresql] error while connecting to database');
        }
    }    
}