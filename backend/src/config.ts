import * as dotenv from 'dotenv';

dotenv.config();

if (process.env.NODE_ENV === 'development') {
    dotenv.config({path: '.env.development'});
} else {
    dotenv.config({path: '.env.production'});
}

export default {
    port: parseInt(process.env.PORT || '3000', 10),
    infuraApiKey: process.env.INFURA_API_KEY || '',
    infuraApiSecret: process.env.INFURA_API_SECRET || '',
    walletPrivate: process.env.WALLET_PRIVATE || '',
    contractAddress: process.env.CONTRACT_ADDR || '',
}