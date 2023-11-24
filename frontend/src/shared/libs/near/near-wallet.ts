/* eslint-disable */
import { providers } from "near-api-js";

// wallet selector UI
import "@near-wallet-selector/modal-ui/styles.css";
import { setupModal } from "@near-wallet-selector/modal-ui";
import LedgerIconUrl from "@near-wallet-selector/ledger/assets/ledger-icon.png";
import MyNearIconUrl from "@near-wallet-selector/my-near-wallet/assets/my-near-wallet-icon.png";

// wallet selector options
import { setupNearWallet } from "@near-wallet-selector/near-wallet";
import { setupWalletSelector } from "@near-wallet-selector/core";
import { setupLedger } from "@near-wallet-selector/ledger";
import { setupMyNearWallet } from "@near-wallet-selector/my-near-wallet";

const THIRTY_TGAS = "30000000000000";
const NO_DEPOSIT = "0";
const selector = await setupWalletSelector({
	network: "testnet",
	modules: [setupNearWallet()],
});
export class Wallet {
	walletSelector: any;
	wallet: any;
	network: any;
	createAccessKeyFor: any;
	accountId: any;

	constructor({ createAccessKeyFor = undefined, network = "testnet" }) {
		this.createAccessKeyFor = createAccessKeyFor;
		this.network = network;
	}

	// To be called when the website loads
	async startUp() {
		this.walletSelector = await setupWalletSelector({
			network: this.network,
			modules: [
				setupMyNearWallet({ iconUrl: MyNearIconUrl }),
				setupLedger({ iconUrl: LedgerIconUrl }),
			],
		});

		const isSignedIn = this.walletSelector.isSignedIn();

		if (isSignedIn) {
			this.wallet = await this.walletSelector.wallet();
			this.accountId =
				this.walletSelector.store.getState().accounts[0].accountId;
		}

		return isSignedIn;
	}

	// Sign-in method
	signIn() {
		const description = "Please select a wallet to sign in.";
		const modal = setupModal(selector, {
			contractId: "testnet",
			description,
		});
		modal.show();
	}

	signOut() {
		// console.log(this.wallet, "out");
		this.wallet.signOut();

		// this.wallet.signOut();
		this.wallet = this.accountId = this.createAccessKeyFor = null;
		window.location.replace(window.location.origin + window.location.pathname);
		// console.log(this.wallet, "out1");
	}

	// Make a read-only call to retrieve information from the network
	async viewMethod({
		contractId,
		method,
		args = {},
	}: {
		contractId: any;
		method: any;
		args: {};
	}) {
		const { network } = this.walletSelector.options;
		const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

		const res = await provider.query({
			request_type: "call_function",
			account_id: contractId,
			method_name: method,
			args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
			finality: "optimistic",
		});
		return JSON.parse(Buffer.from(res.block_hash).toString());
	}

	// Call a method that changes the contract's state
	async callMethod({
		contractId,
		method,
		args = {},
		gas = THIRTY_TGAS,
		deposit = NO_DEPOSIT,
	}: {
		contractId: number;
		method: any;
		args: {};
		gas: any;
		deposit: any;
	}) {
		// Sign a transaction with the "FunctionCall" action
		const outcome = await this.wallet.signAndSendTransaction({
			signerId: this.accountId,
			receiverId: contractId,
			actions: [
				{
					type: "FunctionCall",
					params: {
						methodName: method,
						args,
						gas,
						deposit,
					},
				},
			],
		});

		return providers.getTransactionLastResult(outcome);
	}

	async getTransactionResult(txhash: any) {
		const { network } = this.walletSelector.options;
		const provider = new providers.JsonRpcProvider({ url: network.nodeUrl });

		// Retrieve transaction result from the network
		const transaction = await provider.txStatus(txhash, "unnused");
		return providers.getTransactionLastResult(transaction);
	}
}
export const wallet = new Wallet({ network: "testnet" });
