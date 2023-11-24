import {createServer} from "http";
import app from './app.js'
import config from "./config.js";
import {db} from "./db/db.js";
import {ContractListener} from "./services/contract-listner.js";

class Index {
    static server = createServer(app);

    static async start() {
        await this.listen()
        await db
        await new ContractListener();
        console.log(`listening at :${config.port}`);
    }

    static listen() {
        return new Promise((resolve, reject) => {
            this.server.on('listening', resolve);
            this.server.on('error', (err) => {
                console.error(err);
                reject(err);
            });
            this.server.listen(config.port);
        });
    }
}

Index.start().catch((err) => {
    console.error(err);
});