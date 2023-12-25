import express from 'express'
import { ConfigService } from './config/config.js';
import { PostgreConfig } from './config/postgre.js';
import router from './routes.js';
import cors from 'cors';
export class App{
    app=express();

    constructor(){}

    async init(){
        this.app.use('/', router);
        this.app.use(cors());
        this.app.use(express.json());
        this.configService = ConfigService.getInstance();
        this.postgreConfig = PostgreConfig.getInstance();
        await this.postgreConfig.connect();
        this.app.listen(this.configService.get('PORT'), ()=>{
            console.log(`Server run at port ${this.configService.get('PORT')}`)
        })
    }
}