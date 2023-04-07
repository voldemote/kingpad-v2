import { getMainConfig, getProjectDetailsById } from "src/Contracts";
import { CoinCardProps, coinDataProps } from "./interface";
import { UTCTimePrinter, currentTimeStamp } from "src/Utils/utcTimePrinter";

// 0: all, 1: upcoming, 2: ongong, 3: ended

// export const KingStarterData: CoinCardProps[] = [
//   {
//     id: 1, 
//     isKingStarter: true,
//     status: 1,
//     coinImg: '',
//     coinName: 'Coin name',
//     raisedValue: 0,
//     time: '10:13:05:21'
//   },
//   {
//     id: 2, 
//     isKingStarter: true,
//     status: 2,
//     coinImg: '',
//     coinName: 'Coin name',
//     raisedValue: 135,
//     time: '10:13:05:21'
//   },
//   {
//     id: 3, 
//     isKingStarter: true,
//     status: 3,
//     coinImg: '',
//     coinName: 'Coin name',
//     raisedValue: 135
//   },
//   {
//     id: 4, 
//     isKingStarter: false,
//     status: 1,
//     coinImg: '',
//     coinName: 'Coin name',
//     progress: 0,
//     softCap: 135,
//     hardCap: 270,
//     time: '10:13:05:21'
//   },
//   {
//     id: 5, 
//     isKingStarter: false,
//     status: 2,
//     coinImg: '',
//     coinName: 'Coin name',
//     progress: 35,
//     softCap: 135,
//     hardCap: 270,
//     time: '10:13:05:21'
//   },
//   {
//     id: 6, 
//     isKingStarter: false,
//     status: 3,
//     coinImg: '',
//     coinName: 'Coin name',
//     progress: 100,
//     softCap: 135,
//     hardCap: 270,
//     time: '10:13:05:21'
//   }
// ];

export const coinCardData = async () => {
  const mainConfig = await getMainConfig();
  const coinCard: CoinCardProps[] = [];
  for(let i = 0; i < mainConfig.length; i++) {
    const project: coinDataProps = await getProjectDetailsById(mainConfig[i].id);
    const now = currentTimeStamp();
    const kingpass_start = UTCTimePrinter(project.kingpass_start);
    const kingpass_end = UTCTimePrinter(project.kingpass_end);
    const presale_start = UTCTimePrinter(project.presale_start);
    const presale_end = UTCTimePrinter(project.presale_end);

    if(kingpass_start > now) {
      coinCard.push({
        id: mainConfig[i].id,
        isKingStarter: true,
        coinImg: project.logo,
        coinName: project.name,
        status: getKingStarterStatus(project), // Upcoming
        token_address: project.token_address,
        hardCap: project.hard_cap,
        softCap: project.soft_cap,
        time: getKingStarterCardTime(getKingStarterStatus(project), project),
        website: project.website,
        twitter: project.twitter,
        telegram: project.telegram,
        youtube: project.youtube
      });
    } else if (kingpass_start < now && kingpass_end > now) {
       coinCard.push({
        id: mainConfig[i].id,
        isKingStarter: true,
        coinImg: project.logo,
        coinName: project.name,
        status: getKingStarterStatus(project), // Ongoing
        token_address: project.token_address,
        hardCap: project.hard_cap,
        softCap: project.soft_cap,
        time: getKingStarterCardTime(getKingStarterStatus(project), project),
        website: project.website,
        twitter: project.twitter,
        telegram: project.telegram,
        youtube: project.youtube
      });
    } else if (kingpass_end < now) {
      coinCard.push({
        id: mainConfig[i].id,
        isKingStarter: true,
        coinImg: project.logo,
        coinName: project.name,
        status: getKingStarterStatus(project), // Ended
        hardCap: project.hard_cap,
        token_address: project.token_address,
        softCap: project.soft_cap,
        time: getKingStarterCardTime(getKingStarterStatus(project), project),
        website: project.website,
        twitter: project.twitter,
        telegram: project.telegram,
        youtube: project.youtube
      });
    }

    if(kingpass_end < now && presale_start > now) {
      coinCard.push({
        id: mainConfig[i].id,
        isKingStarter: false,
        coinImg: project.logo,
        coinName: project.name,
        status: getKingSaleStatus(project), // Upcoming
        hardCap: project.hard_cap,
        token_address: project.token_address,
        softCap: project.soft_cap,
        time: getKingStaleCardTime(getKingSaleStatus(project), project),
        website: project.website,
        twitter: project.twitter,
        telegram: project.telegram,
        youtube: project.youtube
      });
    } else if (presale_start < now && presale_end > now) {
       coinCard.push({
        id: mainConfig[i].id,
        isKingStarter: false,
        coinImg: project.logo,
        coinName: project.name,
        status: getKingSaleStatus(project), // Upcoming
        hardCap: project.hard_cap,
        token_address: project.token_address,
        softCap: project.soft_cap,
        time: getKingStaleCardTime(getKingSaleStatus(project), project),
        website: project.website,
        twitter: project.twitter,
        telegram: project.telegram,
        youtube: project.youtube
      });
    } else if(presale_end < now) {
       coinCard.push({
        id: mainConfig[i].id,
        isKingStarter: false,
        coinImg: project.logo,
        coinName: project.name,
        status: getKingSaleStatus(project), // Upcoming
        hardCap: project.hard_cap,
        token_address: project.token_address,
        softCap: project.soft_cap,
        time: getKingStaleCardTime(getKingSaleStatus(project), project),
        website: project.website,
        twitter: project.twitter,
        telegram: project.telegram,
        youtube: project.youtube
      });
    }
  }

  return coinCard
}

  const getKingStarterStatus = (data: coinDataProps) => {
    const now = currentTimeStamp();
    const kingpass_start = UTCTimePrinter(data.kingpass_start);
    const kingpass_end = UTCTimePrinter(data.kingpass_end);
    let _status = '';
    if (kingpass_start > now) {
      _status = 'Upcoming';
    }
    if (kingpass_start < now && kingpass_end > now) {
      _status = 'Ongoing';
    }
    if (kingpass_end < now ) {
      _status = 'Ended';
    }
    return _status
  };

  const getKingSaleStatus = (data: coinDataProps) => {
    const now = currentTimeStamp();
    const presale_start = UTCTimePrinter(data.presale_start);
    const presale_end = UTCTimePrinter(data.presale_end);
    let _status = '';
    if (presale_start > now) {
      _status = 'Upcoming';
    }
    if (presale_start < now && presale_end > now) {
      _status = 'Ongoing';
    }
    if (presale_end < now ) {
      _status = 'Ended';
    }
    return _status
  }

export const getKingStarterCardTime = (status: string, data: coinDataProps) => {
  let time;
   const kingpass_start = new Date(data.kingpass_start).getTime();
  const kingpass_end = new Date(data.kingpass_end).getTime();
    if(status === "Upcoming") {
      time = kingpass_start;
    } else if(status === "Ongoing") {
      time = kingpass_end ;
    }
  return time;
}

export const getKingStaleCardTime = (status: string, data: coinDataProps) => {
  let time;
  const presale_start = new Date(data.presale_start).getTime();
  const presale_end = new Date(data.presale_end).getTime();
  if(status === "Upcoming") {
    time = presale_start;
  } else if(status === "Ongoing") {
    time = presale_end ;
  }
  return time;
}