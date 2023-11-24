import config from "../config.js";
import path from "path";
import fs from "fs";
import FormData from "form-data";
import axios from "axios";

export class IpfsService {
    private apiKey = config.infuraApiKey
    private apiSecret = config.infuraApiSecret;
    private apiUrl = 'https://ipfs.infura.io:5001/api/v0';

    async saveToIpfs(data: any): Promise<any> {
        try {
            //const filePath = path.join('./data', 'data.json');
            //await fs.promises.writeFile(filePath, data);

            const formData = new FormData();
            //formData.append('file', fs.createReadStream(filePath));

            formData.append('file', data);

            const credentials = `${this.apiKey}:${this.apiSecret}`;
            const encodedCredentials = Buffer.from(credentials).toString('base64');
            const pin = true;

            const fetch = await axios.post(`${this.apiUrl}/add?pin=${pin}`, formData, {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`,
                    ...formData.getHeaders(),
                }
            })

            // fs.unlink(filePath, (err) => {
            //     if (err) throw err;
            //     // console.log(`${filePath}/file.txt was deleted`);
            // });

            console.log('*** *** ***')
            console.log('')

            console.log('data saved to IPFS')
            console.log('')
            console.log(fetch.data)
            console.log('*** *** ***')
            

            return fetch.data
        } catch (e) {
            console.error(e)
        }
    }

    async getFromIpfs(cid: string): Promise<any> {
        try {
            const credentials = `${this.apiKey}:${this.apiSecret}`;
            const encodedCredentials = Buffer.from(credentials).toString('base64');

            const response = await axios.post(`${this.apiUrl}/cat?arg=${cid}`, null, {
                headers: {
                    'Authorization': `Basic ${encodedCredentials}`,
                }
            });

            return response.data
        } catch (e) {
            console.error(e)
        }
    }
}