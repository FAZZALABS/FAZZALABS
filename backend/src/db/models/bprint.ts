import mongoose, {Schema, Document} from "mongoose";

export interface IBPrint extends Document {
    ipfs: string;
    createdAt: string;
    metadata: string;
}

const BPrintSchema: Schema = new Schema({
    ipfs: { type: String, required: true },
    createdAt: { type: String, required: true },
    metadata: { type: String, required: true }
});

export const BPrint = mongoose.model<IBPrint>("BPrint", BPrintSchema);
