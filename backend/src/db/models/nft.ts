import mongoose, {Schema, Document} from "mongoose";
import {IBPrint} from "./bprint.js";

export interface INft extends Document {
    ipfs: string;
    tokenId: string;
    contract: string;
    prints: Array<IBPrint>;
    isMinted: boolean
}

const NftSchema: Schema = new Schema({
    ipfs: {type: String, required: true},
    tokenId: {type: String, required: true},
    contract: {type: String, required: true},
    isMinted: {type: Boolean, default: false},
    prints: [{type: Schema.Types.ObjectId, ref: "BPrint"}]
});

export const Nft = mongoose.model<INft>("Nft", NftSchema);
