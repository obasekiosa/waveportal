import { ethers } from "ethers";
import contractABI from "./wavePortal.json";
import { contractAddress } from "./constants";
import Wave from "./wave";

import ethweb3 from "../utils/ethweb3";

const wavePortalApi = {

    getAllWaves: async () => {
        try {
            const ethereum = ethweb3.getEthereum();
            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                const waves = await wavePortalContract.getAllWaves();

                let wavesCleaned = waves.map(wave => {
                    return {
                        address: wave.waver,
                        timestamp: new Date(wave.timestamp * 1000),
                        message: wave.message
                    };
                });
                return wavesCleaned;
            } else {
                console.log("Ethereum object doesn't exist!")
            }
        } catch (error) {
            console.log(error);
        }

        return null;
    },

    setNewWaveListener: (callback) => {
        let wavePortalContract;

        const callbackWrapper = (from, timestamp, message) => {
            console.log("NewWave", from, timestamp, message);
            const wave = new Wave(from, message, timestamp);
            callback(wave);
        };

        const ethereum = ethweb3.getEthereum();

        if (ethereum) {
            const provider = new ethers.providers.Web3Provider(ethereum);
            const signer = provider.getSigner();

            wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);
            wavePortalContract.on("NewWave", callbackWrapper);
        }

        return () => {
            if (wavePortalContract) {
                wavePortalContract.off("NewWave", callbackWrapper);
            }
        };
    },

    wave: async () => {
        try {
            const ethereum = ethweb3.getEthereum();

            if (ethereum) {
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

                let count = await this.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

                const waveTxn = await wavePortalContract.wave("No Morty shhzzz", { gasLimit: 300_000 });
                console.log("Mining...", waveTxn.hash);

                await waveTxn.wait();
                console.log("Mined -- ", waveTxn.hash);

                count = await wavePortalContract.getTotalWaves();
                console.log("Retrieved total wave count...", count.toNumber());

                return true;
            } else {
                console.log("Ethereum object doesn't exist!");
            }
        } catch (error) {
            console.log(error)
        }

        return false;
    }


}