import kingPad from '../Contracts/Json/KingPad.json'
import kingpass from "../Contracts/Json/KingPass.json"

const getChainId = (id: number) => {
    const generalData = {
        rpcUrl: "https://bsc-dataseed1.binance.org/",
        tokenAddy: "",
        kingAddy: "",
        kingpassAddy: kingpass.bscmain,
        kingpadAddy: kingPad.bscmain
    }
    if(id === 56) {
        generalData.rpcUrl = "https://bsc-dataseed1.binance.org/";
        generalData.tokenAddy = "";
        generalData.kingAddy = "";
        generalData.kingpassAddy = kingpass.bscmain;
        generalData.kingpadAddy = kingPad.bscmain;
    } else if (id === 80001) {
        generalData.rpcUrl = "https://polygon-mumbai.infura.io/v3/4458cf4d1689497b9a38b1d6bbf05e78";
        generalData.tokenAddy = "";
        generalData.kingAddy = "";
        generalData.kingpassAddy = kingpass.polygon;
        generalData.kingpadAddy = kingPad.polygon;
    } else if (id === 31337) {
        generalData.rpcUrl = "https://rpc.kkteam.net/kingpad";
        generalData.tokenAddy = "0xDe174DCa991c2C3a577085e78Dc39325D16979bf";
        generalData.kingAddy = "0xab3031961EB80123A536716D6e1e74B8939a3adE";
        generalData.kingpassAddy = kingpass.localhost;
        generalData.kingpadAddy = kingPad.localhost;
    }
    return generalData
}

const apiName = "testwebhooks"

export { getChainId, apiName }
