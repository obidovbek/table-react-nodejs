import { App } from "./app.js";

async function appBootsTrap(){
    const app = new App();
    app.init();
}

appBootsTrap();