// Application Configuration
const CONFIG = {
    NETWORK: 'Base Sepolia',
    NETWORK_ID: 84532,
    CHAIN_ID: '0x14a34',
    RPC_URL: 'https://sepolia.base.org',
    EXPLORER_URL: 'https://sepolia.basescan.org',
    CONTRACT_ADDRESS: '0x2d0C0B93bb41c261eBa9Db9409Dba447eF4Ce80C',
    TOKEN_ADDRESSES: {
        ETH: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
        USDC: '0x0A7269C636f0De0B8EC0FF0F4F1c5BC53a098415',
        DAI: '0xCADcD231899D93058aA19EFf9f98f9c324f714eb',
        WBTC: '0xDb650fC7F34201b4D304370999941332549eF098'
    }
};

// Contract ABI
const TXSWAP_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

// Global State
let STATE = {
    web3: null,
    account: null,
    contract: null,
    currentTheme: 'light',
    slippageTolerance: 0.5,
    transactionDeadline: 20,
    currentTokenModal: null
};

// DOM Elements Cache
const DOM = {
    connectWalletBtn: document.getElementById('connectWallet'),
    walletAddressEl: document.getElementById('walletAddress'),
    swapButton: document.getElementById('swapButton'),
    themeToggle: document.getElementById('themeToggle'),
    networkError: document.getElementById('networkError'),
    addNetworkBtn: document.getElementById('addNetwork'),
    amountIn: document.getElementById('amountIn'),
    amountOut: document.getElementById('amountOut'),
    fromToken: document.getElementById('fromToken'),
    toToken: document.getElementById('toToken'),
    transactionStatus: document.getElementById('transactionStatus'),
    // ... other elements
};