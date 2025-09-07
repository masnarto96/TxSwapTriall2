// UI Manipulation Functions
class UIService {
    static updateWalletUI() {
        if (STATE.account) {
            DOM.connectWalletBtn.style.display = 'none';
            DOM.walletAddressEl.style.display = 'block';
            DOM.walletAddressEl.textContent = this.formatAddress(STATE.account);
            DOM.swapButton.disabled = false;
            DOM.swapButton.textContent = 'Swap';
        } else {
            DOM.connectWalletBtn.style.display = 'block';
            DOM.walletAddressEl.style.display = 'none';
            DOM.swapButton.disabled = true;
            DOM.swapButton.textContent = 'Connect Wallet';
        }
    }

    static formatAddress(address) {
        return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
    }

    static showError(message) {
        DOM.transactionStatus.textContent = message;
        DOM.transactionStatus.className = 'transaction-status error';
        DOM.transactionStatus.style.display = 'block';
        
        setTimeout(() => {
            DOM.transactionStatus.style.display = 'none';
        }, 5000);
    }

    static showSuccess(message) {
        DOM.transactionStatus.textContent = message;
        DOM.transactionStatus.className = 'transaction-status success';
        DOM.transactionStatus.style.display = 'block';
        
        setTimeout(() => {
            DOM.transactionStatus.style.display = 'none';
        }, 5000);
    }

    static toggleTheme() {
        const body = document.body;
        const icon = DOM.themeToggle.querySelector('i');
        
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            STATE.currentTheme = 'light';
        } else {
            body.classList.add('dark-theme');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            STATE.currentTheme = 'dark';
        }
    }

    static calculateOutput() {
        const amountIn = DOM.amountIn.value;
        if (!amountIn || amountIn <= 0) {
            DOM.amountOut.value = '';
            return;
        }
        
        const amountOut = amountIn * 1950;
        DOM.amountOut.value = amountOut.toFixed(2);
        
        document.getElementById('price').textContent = `1950 USDC per ETH`;
        document.getElementById('minReceived').textContent = 
            `${(amountOut * (1 - STATE.slippageTolerance/100)).toFixed(2)} USDC`;
        document.getElementById('feeAmount').textContent = 
            `${(amountOut * 0.003).toFixed(2)} USDC`;
    }

    // ... other UI methods
}