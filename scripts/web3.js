class Web3Service {
    static async initWeb3() {
        if (typeof window.ethereum !== 'undefined') {
            STATE.web3 = new Web3(window.ethereum);
            return true;
        }
        throw new Error('Web3 not available');
    }

    static async connectWallet() {
        try {
            const accounts = await window.ethereum.request({ 
                method: 'eth_requestAccounts' 
            });
            STATE.account = accounts[0];
            return STATE.account;
        } catch (error) {
            throw new Error('User rejected connection: ' + error.message);
        }
    }

    static async checkNetwork() {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        return chainId === CONFIG.CHAIN_ID;
    }

    static async addBaseSepoliaNetwork() {
        try {
            await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                    chainId: CONFIG.CHAIN_ID,
                    chainName: CONFIG.NETWORK,
                    nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 },
                    rpcUrls: [CONFIG.RPC_URL],
                    blockExplorerUrls: [CONFIG.EXPLORER_URL]
                }]
            });
            return true;
        } catch (error) {
            throw new Error('Failed to add network: ' + error.message);
        }
    }

    static async initContract() {
        if (!STATE.web3) throw new Error('Web3 not initialized');
        
        STATE.contract = new STATE.web3.eth.Contract(
            TXSWAP_ABI, 
            CONFIG.CONTRACT_ADDRESS
        );
        return STATE.contract;
    }

    // ... other web3 methods
}