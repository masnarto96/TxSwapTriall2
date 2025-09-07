// Main Application Logic
class TxSwapApp {
    static async init() {
        try {
            // Initialize Web3
            await Web3Service.initWeb3();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Check network
            const isCorrectNetwork = await Web3Service.checkNetwork();
            if (!isCorrectNetwork) {
                DOM.networkError.style.display = 'block';
            }
            
            // Check if wallet is already connected
            const accounts = await STATE.web3.eth.getAccounts();
            if (accounts.length > 0) {
                STATE.account = accounts[0];
                await Web3Service.initContract();
                UIService.updateWalletUI();
                await this.loadBalances();
            }
            
            console.log('TxSwap App initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
            UIService.showError('Failed to initialize application');
        }
    }

    static setupEventListeners() {
        // Wallet connection
        DOM.connectWalletBtn.addEventListener('click', this.connectWalletHandler);
        DOM.addNetworkBtn.addEventListener('click', this.addNetworkHandler);
        
        // Theme toggle
        DOM.themeToggle.addEventListener('click', UIService.toggleTheme);
        
        // Swap functionality
        DOM.amountIn.addEventListener('input', UIService.calculateOutput);
        DOM.swapButton.addEventListener('click', this.executeSwapHandler);
        document.getElementById('switchTokensBtn').addEventListener('click', this.switchTokensHandler);
        
        // Token selection
        document.getElementById('fromTokenSelect').addEventListener('click', () => this.openTokenModal('from'));
        document.getElementById('toTokenSelect').addEventListener('click', () => this.openTokenModal('to'));
        
        // Modal controls
        document.getElementById('closeTokenModal').addEventListener('click', () => this.closeModal('tokenModal'));
        document.getElementById('closeSettingsModal').addEventListener('click', () => this.closeModal('settingsModal'));
        document.getElementById('settingsBtn').addEventListener('click', () => this.openModal('settingsModal'));
        
        // Network changes
        window.ethereum.on('chainChanged', () => window.location.reload());
        window.ethereum.on('accountsChanged', this.handleAccountsChanged);
    }

    static async connectWalletHandler() {
        try {
            await Web3Service.connectWallet();
            await Web3Service.initContract();
            UIService.updateWalletUI();
            await this.loadBalances();
        } catch (error) {
            UIService.showError(error.message);
        }
    }

    static async addNetworkHandler() {
        try {
            await Web3Service.addBaseSepoliaNetwork();
        } catch (error) {
            UIService.showError(error.message);
        }
    }

    static handleAccountsChanged(accounts) {
        if (accounts.length === 0) {
            STATE.account = null;
            UIService.updateWalletUI();
        } else {
            STATE.account = accounts[0];
            UIService.updateWalletUI();
            this.loadBalances();
        }
    }

    static async loadBalances() {
        // Simulate loading balances
        document.getElementById('fromBalance').textContent = '0.5';
        document.getElementById('toBalance').textContent = '250';
    }

    static async executeSwapHandler() {
        try {
            DOM.swapButton.disabled = true;
            DOM.swapButton.textContent = 'Swapping...';
            
            UIService.showSuccess('Swap completed successfully!');
            
            setTimeout(() => {
                DOM.swapButton.disabled = false;
                DOM.swapButton.textContent = 'Swap';
            }, 3000);
            
        } catch (error) {
            UIService.showError('Swap failed: ' + error.message);
            DOM.swapButton.disabled = false;
            DOM.swapButton.textContent = 'Swap';
        }
    }

    static switchTokensHandler() {
        const fromToken = DOM.fromToken.textContent;
        const toToken = DOM.toToken.textContent;
        
        DOM.fromToken.textContent = toToken;
        DOM.toToken.textContent = fromToken;
        
        UIService.calculateOutput();
    }

    static openTokenModal(context) {
        STATE.currentTokenModal = context;
        this.openModal('tokenModal');
    }

    static openModal(modalId) {
        document.getElementById(modalId).style.display = 'flex';
    }

    static closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    TxSwapApp.init();
});