/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { apiName } from 'src/Config/general';
import axios from 'axios';

import { ActivePresaleProps, KingPadResponse, projectSettingProps, tokenDataProps } from 'src/Constant/interface';

export const getProjectDetails = async (address: string) => {
  const response = await axios.get(`https://${apiName}.kingpad.finance/get_project_by_owner?owner=${address}`)
  const projectId = response.data.id;
  if (projectId !== undefined || response.data.error) {
    // const res = await axios.get(`https://${apiName}.kingpad.finance/project_details?id=${parseInt(projectId)}`);
    const res = await axios.get(`https://${apiName}.kingpad.finance/project_details?id=1`);
    const data = res.data;
    return data;
  }
}

export const getProjectDetailsById = async (id: number) => {
  const res = await axios.get(`https://${apiName}.kingpad.finance/project_details?id=${id}`);
  const data = res.data;
  return data;
}

export const getBadgeNames = async (projectId: number) => {
  let names;

  const projectById = await getProjectDetailsById(projectId);
  const badgeIds = projectById.badges;
  const len = badgeIds.length;

  await axios.get<KingPadResponse>(`https://${apiName}.kingpad.finance/mainConfig?app_id=${projectId}`).then(response => {
    const badges = response.data?.KingPad.badges;
    const projectBadge = [];
    for(let i = 0; i < len; i ++) {
      projectBadge.push(badges[badgeIds[i]]);
    }
    if (badges) {
      names = Object.values(projectBadge).map(badge => badge.name);
    }
  }).catch(err => {
    console.error(err)
  });

  return { names, badgeIds};
}

export const getCreatePresaleData = async () => {
  const response = await axios.get(`https://${apiName}.kingpad.finance/create_presale_data?id=1`);
  const res = response.data;
  return res;
}

export const getProjectSetting = async () => {
  const response = await axios.get(`https://${apiName}.kingpad.finance/project_settings?id=1`);
  const res: projectSettingProps = response.data;
  const projectSetting: tokenDataProps[] = []
  for(let i = 0; i < res.redistribution.length; i++) {
    projectSetting.push({
      id: `${res.redistribution[i].name}`,
      label: `${res.redistribution[i].name} ${res.redistribution[i].value}`,
      value: parseFloat(res.redistribution[i].value),
      color: res.redistribution[i].color
    })
  }
  return projectSetting;
}

export const getMainConfig = async () => {
  let activePresales: ActivePresaleProps[] = [];
  await axios.get<KingPadResponse>(`https://${apiName}.kingpad.finance/mainConfig?app_id=1`).then(response => {
    const data = response.data;
    activePresales = Object.values(data.activePresales).map(activePresale => activePresale);
  })
  return activePresales;
}

export const getAdCardId = async () => {
  let adCardId = -1;
  await axios.get<KingPadResponse>(`https://${apiName}.kingpad.finance/mainConfig?app_id=1`).then(response => {
    const data = response.data;
    adCardId = data.sponsoredPresale;
  })
  return adCardId;
}

export const getCurrencyAddress = async () => {
  const response = await axios.get(`https://${apiName}.kingpad.finance/project_settings?id=1`);
  const res: projectSettingProps = response.data;
  return res.currency_address
}