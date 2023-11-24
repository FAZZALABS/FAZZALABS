import express from 'express';
import {NftController} from "./nft-controller.js";
import {BprintController} from "./bprint-controller.js";

export class RootController {
    public readonly router = express.Router();

    constructor() {
        this.router.use('/nft', new NftController().router)
        this.router.use('/print', new BprintController().router)
    }
}