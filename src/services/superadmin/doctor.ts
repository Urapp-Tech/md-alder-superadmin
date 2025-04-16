import network from '../../utils/network';

const DOC_PREFIX = 'back-office-user';

const list = (qp: any) => {
  return network.get(`${DOC_PREFIX}/list`, qp);
};

const create = (data: any) => {
  return network.postMultipart(`${DOC_PREFIX}/create`, data);
};

const update = (id: any, data: any) => {
  return network.postMultipart(`${DOC_PREFIX}/update/${id}`, data);
};

export default {
  list,
  create,
  update,
};
