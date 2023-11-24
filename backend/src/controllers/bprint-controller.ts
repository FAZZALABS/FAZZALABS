import express, {NextFunction, Request, Response} from "express";
import createError from "http-errors";
import {RootService} from "../services/index.js";
import {Nft} from "../db/models/nft.js";
import {BPrint} from "../db/models/bprint.js";

export class BprintController {
    router = express.Router();

    constructor() {
        this.router.post('/getLast', this.getLastPrint.bind(this));
        this.router.post('/savePrint', this.savePrint.bind(this));
    }

    async getLastPrint(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {contractAddr, tokenId} = req.body;

            const nft = await Nft.findOne({
                tokenId: tokenId,
                contract: contractAddr,
            }).populate({
                path: "prints",
                model: BPrint
            })

            if (nft) {
                const result = Object.values(nft.prints)
                    .filter((i: any) => i.createdAt)
                    .sort((a: any, b: any) => Number(b.createdAt) - Number(a.createdAt));

                res.send(result)
            }
        } catch (e) {
            console.error(e);
            next(createError(500, 'Internal error'));
        }
    }

    async savePrint(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {contractAddr, tokenId, print} = req.body;

            const nft = await Nft.findOne({
                tokenId: tokenId,
                contract: contractAddr,
            })

            if (nft) {
                const cid = await RootService.I.ipfs.saveToIpfs(print)

                const newPrint = await BPrint.create({
                    ipfs: cid.Hash,
                    createdAt: Date.now(),
                    metadata: JSON.stringify(print)
                })

                await Nft.findByIdAndUpdate({_id: nft._id}, {
                    $push: {
                        prints: newPrint._id
                    }
                })

                res.send(newPrint)
            } else {
                next(createError(500, 'NFT not found'));
                //res.sendStatus(404)
            }
        } catch (e) {
            console.error(e);
            next(createError(500, 'Internal error'));
        }
    }
}