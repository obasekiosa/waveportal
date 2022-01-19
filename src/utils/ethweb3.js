

export const ethweb3 = {
    getEthereum: (errorCallBack) => {
        const { ethereum } = window;

        if (!ethereum) {
            errorCallBack && errorCallBack();
            return null;
        }

        console.log("We have the ethereum object", ethereum);
        return ethereum;
    },

    connectWallet: async () => {
        try {
            const ethereum = this.getEthereum(
                () => alert("Get MetaMask!")
                );

            if (!ethereum) {
                return;
            }

            const accounts = await ethereum.request({ method: "eth_requestAccounts" });

            console.log("Connected", accounts[0]);

            return accounts;
        } catch (error) {
            console.log(error)
        }

        return null;
    },

    checkIfWalletIsConnected:  async () => {
        try {
            const ethereum = this.getEthereum(
                () => console.log("Make sure you have metamask!")
            );

            if (!ethereum) {
                return false;
            }


            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                console.log("Found an authorized account:", account[0]);
                return true;
            } else {
                console.log("No authorized account found")
            }
        } catch (error) {
            console.log(error);
        }

        return false;
    },

    getAccounts: async () => {
        try {
            const ethereum = this.getEthereum(
                () => console.log("Make sure you have metamask!")
            );

            if (!ethereum) { 
                return null;
            }


            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length !== 0) {
                console.log("Found an authorized account:", account);
                return accounts
            } else {
                console.log("No authorized account found");
            }
        } catch (error) {
            console.log(error);
        }

        return null;
    }
};