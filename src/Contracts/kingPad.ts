import { Contract, ethers } from "ethers";
import { getChainId } from "src/Config/general"
import kingpadContract from './Json/KingPad.json'
import kingpassContract from './Json/KingPass.json'
import { isEmpty } from "src/Utils/validator";
import { toast } from "react-toastify";

let provider: any = null;
let signer: any = null;
let kingpad: Contract;
let kingpass: Contract;

export const kingpadInitialize = async (provider_: any, signer_: any, chainId: number) => {
    const generalData = getChainId(chainId);   
    kingpad = new ethers.Contract(generalData.kingpadAddy, kingpadContract.abi, signer_);
    kingpass = new ethers.Contract(generalData.kingpassAddy, kingpassContract.abi, provider_);
    provider = provider_;
    signer = signer_;
}

export const getUserInfo = async (address: string) => {
    const ownerData = await kingpad.userDB(address);
    console.log({ ownerData })
}

export const getUserPassActive = async (address: string | undefined) => {
  if (!isEmpty(provider) && !isEmpty(address) && !isEmpty(kingpass)) {
    const tx = await kingpass.checkIfPassActive(address);
    console.log({ tx });
    return tx;
  }
}

export const getMinBuy = async () => {
    if(!isEmpty(signer) && !isEmpty(kingpad)) {
        const minBuy = await kingpad.minBuy();
        return minBuy;
    }
}

export const getMaxBuy = async () => {
    if(!isEmpty(signer) && !isEmpty(kingpad)) {
        const maxBuy = await kingpad.maxBuy();
        return maxBuy;
    }
}

export const getPresaleRate = async () => {
    if(!isEmpty(signer) && !isEmpty(kingpad)) {
        const presaleRate = await kingpad.presaleRate();
        return presaleRate;
    }
}

export const getStartTime = async () => {
    if(!isEmpty(signer) && !isEmpty(kingpad)) {
        const startTime = await kingpad.startTime();
        return startTime
    }
}

export const getKingState = async () => {
    if(!isEmpty(signer) && !isEmpty(kingpad)) {
        const kingState = await kingpad.getKingState();
        return kingState;
    }
}

export const withdraw = async () => {
    if(!isEmpty(signer) && !isEmpty(kingpad)) {
        const tx = await kingpad.withdraw();
        await tx.wait();
    }
}

export const finalize = async () => {
    if(!isEmpty(signer) && !isEmpty(kingpad)) {
        const tx = await kingpad.finalize();
        await tx.wait();
    }
}

export const kingpadIsActive = async () => {
    if(!isEmpty(signer) && !isEmpty(kingpad)) {
       const isActive = await kingpad.isActive();
       return isActive;
    }
}

export const deposit = async (amount_: string) => {
    const amount = amount_;
    if(!isEmpty(signer) && !isEmpty(kingpad)) {
       await kingpad.deposit({ value: amount });
       toast.success(`Deposit success!`);
    }
}