import { SHOP_TYPE } from '../../utils/constants';
import network from '../../utils/network';

const getListService = (search: string, page: number, size: number) => {
  return network.getWithQueryParam(`${SHOP_TYPE}/list`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

const getById = (shopTypeId: string) => {
  return network.get(`${SHOP_TYPE}/get/${shopTypeId}`);
};

const create = (data: any) => {
  return network.post(`${SHOP_TYPE}/create`, data);
};

const update = (shopTypeId: string, data: any) => {
  return network.post(`${SHOP_TYPE}/update/${shopTypeId}`, data);
};

const updateStatus = (shopTypeId: string, data: any) => {
  return network.post(`${SHOP_TYPE}/update/status/${shopTypeId}`, data);
};

export default {
  getListService,
  getById,
  create,
  update,
  updateStatus,
};
