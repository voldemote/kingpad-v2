// import { Contract, ethers } from "ethers";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { isEmpty } from "src/Utils/validator";
// import KingpadPresaleContract from './Json/KingPadPresale.json'
// import KingStarterContract from './Json/KingStarter.json'
// import KingpadFactryContract from './Json/KingpadFactory.json'
// import bep20ABI from './Json/bep20ABI.json'
// import { getChainId, apiName } from "src/Config/general";
// import { getCurrencyAddress } from ".";
// import { useState } from "react";

// let kingStarter: Contract;
// let kingpadFactory: Contract;
// let kingPadPresale: Contract;
// let baseBep20: Contract;

// let signer: any = null;
// let provider: any = null;

// export const kingSaleInitialize = async (provider_: any, signer_: any, chainId: number) => {
//   console.log("kingSaleInitialize");
//   const generalData = getChainId(chainId);
//   console.log("kingSaleInitiasdsdsdlize");
//   const kingStarterAddress = generalData.kingStarterAddress;
//   const kingPadFactoryAddress = generalData.kingPadFactoryAddress;
//   const KINGpassAddress = generalData.KINGpassAddress;
//   const token_address = await getCurrencyAddress();

//   kingStarter = new ethers.Contract(kingStarterAddress, KingStarterContract.abi, signer_);
//   console.log("cazzo dici o frat", kingpadFactory)
//   kingpadFactory = new ethers.Contract(kingPadFactoryAddress, KingpadFactryContract.abi, signer_);
//   console.log("cazzo dici o frat", kingpadFactory)
//   baseBep20 = new ethers.Contract(KINGpassAddress, bep20ABI, signer_);
//   console.log("LOOOOOOOGG")
  
//   const presaleAddress = await getPresaleAddress();
//   kingPadPresale = new ethers.Contract(presaleAddress, KingpadPresaleContract.abi, signer_);

//   console.log("esistiiiiii: ", { kingPadPresale })
//   provider = provider_;
//   signer = signer_;
// }

// export const getPresaleAddress = async () => {
//   const response = await axios.get(`https://${apiName}.kingpad.finance/create_presale_data?id=1`); // @todo oh no hardcode
//   const res = response.data;
//   console.log(res[0][0], "!!!!!!!!!!@!@#! ! ")
//   if(kingpadFactory !== undefined && signer !== undefined) {
//     const kingPadPresaleAddress = await kingpadFactory.getSaleAdrsFromTokenA(res[0][0]);
//     console.log("kingPadPresaleAddress", kingPadPresaleAddress)
//     return kingPadPresaleAddress;
//   }
// }

// export const createKingSale = async () => {
//   const response = await axios.get(`https://${apiName}.kingpad.finance/create_presale_data?id=1`); // @todo oh no hardcode
//   const res = response.data;
//   const genData = getChainId(31337);
//   console.log(res[0][1], "PRIMAAA")
//   res[0][1] = (res[0][1] === "BNB") ? "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c" : "porcodio" // @todo oh no hardcode

//   console.log(res[0][1], "DOPOOO")
//   if (res !== undefined) {
//     const fromPass = (await kingStarter.getTotalContribution(res[0][0])).toString();
//     const amount = (await kingpadFactory.calculatePsaleToken(res[1][2], res[1][6], res[1][0], fromPass))[0].toString() // uint hc, uint listrate, uint psalerate, uint fromPass
//     console.log('DIOCEMRDA', amount)
//     const tx = await baseBep20.attach(res[0][0]).approve(genData.kingPadFactoryAddress, amount);
//     await tx.wait();
//     console.log("createPresaleeeeeeeeee", res[0], res[1], res[2], res[3]);
//     const txx = await kingpadFactory.createPsale(res[0], res[1], res[2], res[3]);
//     await txx.wait();
//     toast.success(`Created king sale!`);
//     window.open(`/kingsale-explore?id=${1}`);
//   }
// }
// export const getKingPadPresaleTotalContribution = async () => {
//   console.log({ signer }, 'getKingPadPresaleTotalContribution');
//   if (!isEmpty(signer) && !isEmpty(kingPadPresale)) {
//     console.log("asf", { kingPadPresale })
//     const tx = await kingPadPresale.totalContribution();
//     console.log("totalContribution: ", { tx })
//     const res = tx.toString();
//     console.log("totalContribution: ", res)
//     return res;
//   }
// }

// export const getKingPadfinalizeStatus = async () => {
//   console.log({ signer }, 'sporcodio');
//   if (signer !== undefined && kingPadPresale !== undefined) {
//     console.log({ signer }, 'sporcodio1')
//     const tx = await kingPadPresale.finalized()
//     console.log({ signer }, 'sporcodio11')
//     const txx = await kingPadPresale.softReached()
//     console.log("finalizedssssss: ", { tx, txx })
//     if (tx === true && txx === false) { // fail
//       console.log("DAI FA RSERIOO", 1)
//       return 1;
//     } else if (tx === true && txx === true) { // success
//       console.log("DAI FA RSERIOO", 2)
//       return 2;
//     } else { // ongoing
//       console.log("DAI FA RSERIOO", 0)
//       return 0;
//     }
//   }
// }

// export const kingSaleDeposit = async (amount_: string, token_address_: string) => {
//   const amount = amount_ // ethers.utils.parseEther(amount_.toString());
//   const token_address = token_address_;
//   const kingPadPresaleAddress = await kingpadFactory.getSaleAdrsFromTokenA(token_address);
//   // console.log({ presaleAddress, kingPadPresaleAddress })
//   const pairAddress = await getCurrencyAddress(); // mmh
//   console.log({ pairAddress }, '@@@@@@@@@@@@@@@@@@@@@@@@@@');
//   if (pairAddress === '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c') {
//     await kingPadPresale.deposit(0, { value: amount });
//   } else {
//     const tx = await baseBep20.attach(pairAddress).approve(kingPadPresaleAddress, amount);
//     await tx.wait();
//     await kingPadPresale.deposit(amount, { value: 0 });
//   }
//   toast.success(`Deposit success!`);
// }

// export const getUserContribution = async (presaleAddress: string, userAddress: string): Promise<any[] | undefined> => {
//   console.log("getUserContribution");
//   console.log({ kingStarter });
//   if (!isEmpty(kingStarter) && !isEmpty(signer)) {
//     const starterDeposit = await kingStarter.returnPsaleUserDeposit(presaleAddress, userAddress); // presaleAddress = token address
//     console.log({ starterDeposit })
//     const userArr = await kingPadPresale.userDB(userAddress);
//     console.log({ userArr });
//     const presaleDeposit = userArr[4];
//     console.log({ presaleDeposit }, 'LOOOOOOOGG23');
//     let userContribution;
//     if (starterDeposit > 0) {
//       userContribution = starterDeposit.add(presaleDeposit);
//     } else {
//       userContribution = presaleDeposit;
//     }
//     const res = ethers.utils.formatEther(userContribution);

//     const res1 = await kingPadPresale.calculateClaimableToken(userAddress)
//     console.log({ res, res1 }, "OHHHDIOMAIALE");
//     const retrn = [res, parseFloat(ethers.utils.formatEther(res1))];
//     return retrn;
//   }
// }

// export const presaleWithdraw = async () => {
//   console.log("presaleWithdraw");
//   if (!isEmpty(kingPadPresale)) {
//     const tx = await kingPadPresale.getFundBack();
//     await tx.wait();
//     toast.success(`Withdraw success!`);
//   }
// }
// export const presaleClaim = async () => {
//   console.log("presaleWithdraw");
//   if (!isEmpty(kingPadPresale)) {
//     const tx = await kingPadPresale.claim();
//     await tx.wait();
//     toast.success(`Withdraw success!`);
//   }
// }
// export const afterClaimStats = async (userAddress: string): Promise<any[] | undefined> => {
//   console.log("dioindu");
//   if (!isEmpty(kingPadPresale)) {
//     const userArr = await kingPadPresale.userDB(userAddress);
//     console.log({ userArr });
//     const deposits = userArr[6];
//     const tknGot = userArr[5];
//     const retrn = [deposits, tknGot];
//     return retrn;
//   }
// }

// export const getAdminAddress = async () => {
//   if(!isEmpty(kingPadPresale) && !isEmpty(signer)) {
//     const admin_addy = await kingPadPresale.creatorz();
//     return admin_addy;
//   }
// }

// export const finalize = async () => {
//   if(!isEmpty(kingPadPresale)) {
//     const tx = await kingPadPresale.finalize();
//     await tx.wait();
//   }
// }