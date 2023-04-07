// import axios from 'axios';
// import { Contract, ethers } from 'ethers';
// import { isEmpty } from 'src/Utils/validator';
// import KingStarterContract from './Json/KingStarter.json'
// import bep20ABI from './Json/bep20ABI.json'
// import { getChainId, apiName } from 'src/Config/general';
// import { toast } from 'react-toastify';

// let kingStarter: Contract;
// let kingStarterz: Contract;
// let baseBep20: Contract;
// let provider: any = null;
// let signer: any = null;
// let kingStarterAddress: string;

// export const kingStarterInitialize = async (provider_: any, signer_: any, chainId: number) => {
//   console.log("kingStarterInitialize")
//   const generalData = getChainId(chainId);
//   kingStarterAddress = generalData.kingStarterAddress;
//   const KINGpassAddress = generalData.KINGpassAddress;
//   // porcodiiooooooooooooooooooooo
//   kingStarter = new ethers.Contract(kingStarterAddress, KingStarterContract.abi, signer_);
//   kingStarterz = new ethers.Contract(kingStarterAddress, KingStarterContract.abi, provider_);
//   baseBep20 = new ethers.Contract(KINGpassAddress, bep20ABI, signer_);
//   provider = provider_;
//   signer = signer_;
// }

// export const createPresale = async () => {
//   const response = await axios.get(`https://${apiName}.kingpad.finance/create_kingsale_data?id=1`); // oh no hardcode
//   const res = response.data;
//   if (res !== undefined) {
//     console.log("createPresale", { res });
//     const tx = await kingStarter.createPassSale(res[0], res[1], res[2], res[3], res[4], res[5]);
//     await tx.wait();
//     toast.success(`Created king starter!`);
//     window.open(`/kingstarter-explore?id=${1}`);
//   }
// }

// export const getContributeValue = async (addressToken: string | undefined) => {
//   if (!isEmpty(provider) && !isEmpty(kingStarterz)) {
//     const tx = await kingStarterz.getTotalContribution(addressToken);
//     const totalContrubute = ethers.utils.formatEther(tx)
//     console.log("getContributeValue", { totalContrubute }, tx)
//     return totalContrubute;
//   }
// }

// export const getTokenInfo = async (addy: string) => {
//   const tokenName = await baseBep20.attach(addy).name();
//   const tokenSymbol = await baseBep20.attach(addy).symbol();
//   const tokenDecimal = await baseBep20.attach(addy).decimals();

//   return { tokenName, tokenSymbol, tokenDecimal }
// }

// export const kingStarterDeposit = async (currency: string, amount_: number, saleTokenAddress: string) => {
//   const amount = ethers.utils.parseEther(amount_.toString());
//   if (!isEmpty(kingStarter) && !isEmpty(signer)) {
//     if (currency === 'BNB') {
//       await kingStarter.depositPassSale(0, saleTokenAddress, { value: amount });
//       toast.success(`Deposited ${ethers.utils.formatEther(amount)} ${currency}`);
//     } else {
//       const bnbAddress = await kingStarter.viewKingstarterCurrecy(saleTokenAddress);
//       // if (await baseBep20.attach(bnbAddress).allowance() < amount_) @todo
//       const tx = await baseBep20.attach(bnbAddress).approve(kingStarterAddress, amount);
//       await tx.wait();
//       toast.success(`Approved ${ethers.utils.formatEther(amount)} ${currency}`);
//       const txx = await kingStarter.depositPassSale(amount, saleTokenAddress, { value: 0 });
//       await txx.wait()
//       toast.success(`Deposited ${ethers.utils.formatEther(amount)}  ${currency}`);
//     }
//   }
// }

// export const getPsaleDeposit = async (saleTokenAddress: string, userAddress: string) => {
//   if (!isEmpty(provider) && !isEmpty(kingStarter)) {
//     const tx = await kingStarter.returnPsaleUserDeposit(saleTokenAddress, userAddress);
//     const res = tx.toString();
//     console.log("getPsaleDeposit", { res })
//     return res;
//   }
// }

// export const contributeWithdraw = async (saleTokenAddress: string) => {
//   if (!isEmpty(provider) && !isEmpty(kingStarter)) {
//     const tx = await kingStarter.exitPassSale(saleTokenAddress);
//     await tx.wait();
//     toast.success(`Withdrawn successfully!`);
//   }
// }
