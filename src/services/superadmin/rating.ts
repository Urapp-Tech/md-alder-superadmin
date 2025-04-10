import { RATING } from '../../utils/constants';
import network from '../../utils/network';

const getListService = (
  tenant: any,
  search: string,
  page: number,
  size: number
) => {
  return network.getWithQueryParam(`${RATING}/list/${tenant}`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

const getCatListService = (
  catId: string | any,
  search: string,
  page: number,
  size: number
) => {
  return network.getWithQueryParam(`${RATING}/reviews/${catId}`, {
    search,
    page: page.toString(),
    size: size.toString(),
  });
};

const getCatStarRating = (homeCatId: string | any) => {
  return network.getWithQueryParam(`${RATING}/distinct/star/list/${homeCatId}`);
};

const getCatStarDetail = (homeCatId: string | any) => {
  return network.getWithQueryParam(`${RATING}/item/detail/${homeCatId}`);
};

const ratingStatusUpdate = (ratingId: string | any) => {
  return network.post(`${RATING}/status/update/${ratingId}`, {});
};

export default {
  getListService,
  getCatListService,
  getCatStarRating,
  getCatStarDetail,
  ratingStatusUpdate,
};
