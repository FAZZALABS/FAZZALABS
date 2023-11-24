import express, {NextFunction, Request, Response} from "express";
import createError from "http-errors";
import {RootService} from "../services/index.js";
import {INft, Nft} from "../db/models/nft.js";

export class NftController {
    router = express.Router();

    constructor() {
        this.router.post('/checkOwner', this.checkOwner.bind(this));
        this.router.post('/get', this.getNftData.bind(this));
    }

    async checkOwner(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {data, owner} = req.body;
            console.log(typeof data)

            const lData: any = JSON.parse(data)

            const newData = JSON.stringify(lData)

            var isOwner = await RootService.I.nftVerify.checkOwner(lData.contract_address, lData.token_id, owner)
            console.log(`owner ${owner} for ${newData}`)

            isOwner = true;

            if (isOwner) {
                var nft: INft | null = await Nft.findOne({
                    contract: lData.contract_address,
                    tokenId: lData.token_id
                })

                nft = null;
                if (!nft) {
                    const cid = await RootService.I.ipfs.saveToIpfs(newData)

                    const newNft = await Nft.create({
                        ipfs: cid.Hash,
                        contract: lData.contract_address,
                        tokenId: lData.token_id
                    })

                    await RootService.I.nftVerify.writeHash(owner, newData)

                    res.send(newNft)
                    return
                }
                else{
                    await RootService.I.nftVerify.writeHash(owner, newData)
                    res.send(nft)
                }
            } else {
                next(createError(500, owner + 'is not owner of NFT with tokenId ' + lData.token_id +' minted by smartontract' + lData.contract_address));
                //res.sendStatus(404);
            }
        } catch (e) {
            console.error(e);
            next(createError(500, 'Internal error ' + e));
        }
    }

    async getNftData(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {url} = req.body;

            const result = await Nft.findOne({ipfs: url})

            if (result) {
                res.send(result)
            } else {
                res.sendStatus(404);
            }

        } catch (e) {
            console.error(e);
            next(createError(500, 'Internal error ' + e));
        }
    }
}