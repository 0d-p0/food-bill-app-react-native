const endpoints = {
  baseUrl: 'https://restaurant-billing-backend-by-debanjan.vercel.app/',
  // baseUrl: 'http://192.168.248.62:4000/',
  login: 'auth/login',
  register: 'auth/create',
  changePassword: 'auth/passwrod-change',
  logoutOthers: 'auth/logout-other',
  foodList: 'food/getallfood',
  categoryList: 'category/categoryList',
  unitList: 'unit/unit_list',
  addCategory: 'category/create',
  addUnit: 'unit/create',
  addFood: 'food/create',
  createBill: 'bill/create',
  shopUpdate: 'auth/shopUpdate',
  categoryEdit: 'category/edit',
  unitEdit: 'unit/edit',
  foodEdit: 'food/edit',
  categoryRemove: 'category/remove',
  unitRemove: 'unit/remove',
  foodRemove: 'food/remove',
  billingReports: 'bill/details/date'
};

export default endpoints;
