import endpoints from '../endPoints';
import httpRequest from '../httpRequest';

export const handleGetCategoryList = async token => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'GET',
      url: endpoints.categoryList,
      token: token,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    // console.error('Error:', error.response.data.message);
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const handleSaveNewCategory = async (token, data) => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'POST',
      url: endpoints.addCategory,
      token: token,
      data: data,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const handleDeleteCategory = async (token, data) => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'POST',
      url: endpoints.categoryRemove,
      token: token,
      data: data,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    // console.error('Error:', error.response.data.message);
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const handlEditCategory = async (token, data) => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'POST',
      url: endpoints.categoryEdit,
      token: token,
      data: data,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    // console.error('Error:', error.response.data.message);
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};
