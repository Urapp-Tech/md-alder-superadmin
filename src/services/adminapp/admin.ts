import { BACKOFFICE_PREFIX } from '../../utils/constants';
import network from '../../utils/network';

import { UserLogin } from '../../interfaces/auth.interface';

const loginService = (userData: UserLogin) => {
  return network.post(`${BACKOFFICE_PREFIX}/login`, userData);
};

const createNewPassword = (data: any) => {
  return network.post(`${BACKOFFICE_PREFIX}/new-password`, data);
};

export default {
  loginService,
  createNewPassword,
};
