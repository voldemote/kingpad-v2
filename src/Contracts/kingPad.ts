import { Contract, ethers } from "ethers";
import { getChainId } from "src/Config/general"
import kingpadContract from './Json/KingPad.json'
import kingpassContract from './Json/KingPass.json'
import { isEmpty } from "src/Utils/validator";
import { toast } from "react-toastify";

let provider: any = null;
let signer: any = null;
const defaultProvider = new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org/");
let kingpad: Contract = new ethers.Contract(kingpadContract.bscmain, kingpadContract.abi, defaultProvider);
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
        const amount = parseFloat(ethers.utils.formatEther(ownerData[0].toString()));
        const tokenTogGet = parseFloat(ethers.utils.formatEther(ownerData[1].toString()));
        const isWhitelisted = ownerData[2];
        console.log("depositAmount: ", amount);
        console.log({ amount, isWhitelisted, tokenTogGet })
        return { amount, isWhitelisted, tokenTogGet };
}

export const getUserPassActive = async (address: string | undefined) => {
  if (!isEmpty(provider) && !isEmpty(address) && !isEmpty(kingpass)) {
    const tx = await kingpass.checkIfPassActive(address);
    console.log("kingpass Active: ", tx);
    return tx;
  }
}

export const getMinBuy = async () => {
    const res = await kingpad.minBuy();
    const minBuy = parseFloat(ethers.utils.formatEther(res));
    console.log("minBuy: ", minBuy)
    return minBuy;
}

export const getMaxBuy = async () => {
    const res = await kingpad.maxBuy();
    const maxBuy = parseFloat(ethers.utils.formatEther(res));
    console.log("maxBuy: ", maxBuy)
    return maxBuy;
}

export const getPresaleRate = async () => {
    const presaleRate = await kingpad.presaleRate();
    return presaleRate;
}

export const getStartTime = async () => {
    const startTime = await kingpad.startTime();
    return startTime
}

export const getKingState = async () => {
    const kingState = await kingpad.getKingState();
    return kingState;
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
       const isActive = await kingpad.isActive();
       return isActive;
}

export const deposit = async (amount_: string) => {
    const amount = amount_;
    if(!isEmpty(signer) && !isEmpty(kingpad)) {
       await kingpad.deposit({ value: amount });
       toast.success(`Deposit success!`);
    }
}

export const getTotalDeposited = async () => {
    const res = await kingpad.totalDeposited();
    const total = ethers.utils.formatEther(res.toString());
    return total;
}