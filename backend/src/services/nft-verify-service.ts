import {ethers} from "ethers";
import config from "../config.js";
import fs from "fs";

export class NftVerifyService {
    constructor() {
        this.initWallet()
    }

    //private readonly credentialsFilePath = 'credentials.json';

    private readonly NetworkConfig = {
        polygon: {
            name: "Polygon Mainnet",
            symbol: 'MATIC',
            rpcUrl: "https://rpc-mainnet.maticvigil.com",
            chainId: 137,
            blockExplorerUrl: 'https://polygonscan.com',
        },
        polygonTestnet: {
            name: "Polygon Testnet",
            symbol: 'tMATIC',
            rpcUrl: "https://rpc-mumbai.maticvigil.com/",
            chainId: 80001,
            blockExplorerUrl: 'https://mumbai.polygonscan.com/',
        },
        optimism: {
            name: "Optimism Mainnet",
            symbol: 'ETH',
            rpcUrl: "https://mainnet.optimism.io",
            chainId: 10,
            blockExplorerUrl: 'https://optimistic.etherscan.io',
        },
        eth: {
            name: "Ethereum Mainnet",
            symbol: 'ETH',
            rpcUrl: "https://mainnet.infura.io/v3/646c19f79ffc4860a3a5f4a3679b1a66",
            chainId: 1,
            blockExplorerUrl: 'https://etherscan.io',
        },
        arb: {
            name: "Arbitrum Mainnet",
            symbol: 'ARB',
            rpcUrl: "https://arb1.arbitrum.io/rpc",
            chainId: 42161,
            blockExplorerUrl: 'https://arbiscan.io',
        },
        bsc: {
            name: "Binance Smart Chain Testnet",
            symbol: 'tBNB',
            rpcUrl: "https://data-seed-prebsc-1-s1.binance.org:8545",
            chainId: 97,
            blockExplorerUrl: 'https://testnet.bscscan.com/',
        }
    }
    private contractInterface = new ethers.utils.Interface([
        'function ownerOf(uint256 tokenId) view returns(uint256)',
        'function setHash(address userAddr, string memory data) public'
    ])

    // async initWallet() {
    //     if (!fs.existsSync(this.credentialsFilePath)) {
    //         const wallet = ethers.Wallet.createRandom();

    //         const credentials = {
    //             privateKey: wallet.privateKey,
    //         };
    //         fs.writeFileSync(this.credentialsFilePath, JSON.stringify(credentials));

    //         console.log('Wallet addr:', wallet.address);
    //     } else {
    //         const credentials = JSON.parse(fs.readFileSync(this.credentialsFilePath, 'utf-8'));
    //         const provider = new ethers.providers.JsonRpcProvider(this.NetworkConfig.bsc.rpcUrl);
    //         const wallet = new ethers.Wallet(credentials.privateKey, provider);

    //         console.log('Wallet addr:', wallet.address);
    //     }
    // }

    async initWallet() {
        
        //const credentials = JSON.parse(fs.readFileSync(this.credentialsFilePath, 'utf-8'));
        const credentials = JSON.parse(String(process.env.WALLET_JSON));
        //const privateKeyStr = process.env.WALLET_JSON;
        //const privateKey
        const provider = new ethers.providers.JsonRpcProvider(this.NetworkConfig.polygonTestnet.rpcUrl);
        const wallet = new ethers.Wallet(credentials.privateKey, provider);

        console.log('20231123 Wallet addr:', wallet.address);
    
    }

    //TODO refactor
    async checkOwner(contractAddress: string, tokenId: string, owner: string): Promise<boolean | undefined> {
        try {
            const results = await Promise.all(
                Object.values(this.NetworkConfig).map(async (network: any) => {
                    try {
                        const provider = new ethers.providers.JsonRpcProvider(network.rpcUrl);
                        const contract = new ethers.Contract(contractAddress, this.contractInterface, provider);
                        const ownerNft = await contract.ownerOf(tokenId);

                        return ownerNft.toHexString().toLowerCase() === owner.toLowerCase()
                    } catch (error) {
                        return false
                    }
                })
            );


            return results.filter(results => results)[0];
        } catch (mainError) {
            console.error('Main error:', mainError);
        }
    }

    async writeHash(owner: string, data: string): Promise<void> {
        //const credentials = JSON.parse(fs.readFileSync(this.credentialsFilePath, 'utf-8'));
        const credentials = JSON.parse(String(process.env.WALLET_JSON));
        const provider = new ethers.providers.JsonRpcProvider(this.NetworkConfig.polygonTestnet.rpcUrl);
        const wallet = new ethers.Wallet(credentials.privateKey, provider);
        const contract = new ethers.Contract(config.contractAddress, this.contractInterface, wallet);

        try {
            console.log(data)
            await contract.setHash(owner, data);
            console.log('hash seted for:', owner)
        } catch (writeError) {
            console.error('Error while writing:', writeError);
        }        
    }
}