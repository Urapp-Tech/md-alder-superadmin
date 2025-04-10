import network from '../../utils/network';

const getSystemConfig = (domain: string) => {
  return network.getSystemConfig(`get/theme/${domain}`);
};

const getSystemConfigDefault = () => {
  return network.getSystemConfig(`get/default/theme`);
};

const getSystemConfigByTenant = (tenantId: string) => {
  return network.getSystemConfig(`detail/${tenantId}`);
};

const systemConfigColorChange = (tenantId: string, data: object) => {
  return network.postSystemConfig(`color/change/${tenantId}`, data);
};

const systemConfigLayoutUpdate = (tenantId: string, data: object) => {
  return network.postMultipartSystemConfig(`layout/update/${tenantId}`, data);
};

export default {
  getSystemConfig,
  getSystemConfigByTenant,
  systemConfigColorChange,
  systemConfigLayoutUpdate,
  getSystemConfigDefault,
};
