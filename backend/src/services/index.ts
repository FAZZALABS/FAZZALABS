import {IpfsService} from "./ipfs-service.js";
import {NftVerifyService} from "./nft-verify-service.js";
import {ContractListener} from "./contract-listner.js";

export class RootService {
    public readonly nftVerify = new NftVerifyService();
    public readonly ipfs = new IpfsService();

    public static readonly I = new RootService();
    constructor() {

    }
}