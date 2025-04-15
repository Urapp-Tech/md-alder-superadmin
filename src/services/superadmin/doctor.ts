import network from '../../utils/network';

const DOC_PREFIX = 'back-office-user';

const list = (qp: any) => {
  return network.get(`${DOC_PREFIX}/list`, qp);
};

const create = (data: any) => {
  return network.postMultipart(`${DOC_PREFIX}/create`, data);
};

export default {
  list,
  create,
};
