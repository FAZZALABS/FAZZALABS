import {ethers, utils} from "ethers";
import config from "../config.js";
import {Nft} from "../db/models/nft.js";

export class ContractListener {
    private readonly chain = 'polygonTestnet';
    private readonly contracts = config.contractAddress
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
    private _provider: any
    private _contractInterface = new utils.Interface([
        'event NFTMinted(address indexed owner, string data)'
    ]);

    constructor() {
        this._provider = new ethers.providers.JsonRpcProvider(this.NetworkConfig[this.chain].rpcUrl);
        this.initSubscriptions()
    }

    private initSubscriptions() {
        const payment = new ethers.Contract(this.contracts, this._contractInterface, this._provider)

        payment.on('NFTMinted', (user, data) => {
            console.log('Minted', user, JSON.parse(data))
            this.updateNftStatus(data)
        })
        console.log('init subscribe')
    }

    private async updateNftStatus(data: string) {
        const lData = JSON.parse(data)

        const nft = await Nft.findOneAndUpdate({
                contract: lData.contract_address,
                tokenId: lData.nft_data[0].token_id
            },
            {
                minted: true
            }
        )
    }
}