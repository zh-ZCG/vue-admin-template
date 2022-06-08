import request from '@/utils/request';

export const reqProductList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' });

export const reqSkuById = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' });

export const reqAddSpu = (spuInfo) => request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo });

export const reqUpdateSpu = (spuInfo) => request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo });

export const reqproductkeyword = (keyword) => request({ url: `/admin/product/getskuInfo/${keyword}`, method: 'get'});

export const reqdeleteproductById = (skuId) => request({ url: `/admin/product/getdeleteproductById/${skuId}`, method: 'get' });

export const reqDindanList = (page, limit) => request({ url: `/admin/dindan/list/${page}/${limit}`, method: 'get' });

export const reqdindanById = (skuId) => request({ url: `/admin/product/getdindanById/${skuId}`, method: 'get' });

export const reqdindankeyword = (keyword) => request({ url: `/admin/dindan/getskuInfo/${keyword}`, method: 'get' });

export const reqdeletedindanById = (skuId) => request({ url: `/admin/product/getdeletedindanById/${skuId}`, method: 'get' });