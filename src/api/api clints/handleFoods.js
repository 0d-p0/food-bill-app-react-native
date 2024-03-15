import endpoints from '../endPoints';
import httpRequest from '../httpRequest';

export const handleGetFoodList = async token => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'GET',
      url: endpoints.foodList,
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

export const handleSaveNewFood = async (token, data) => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'POST',
      url: endpoints.addFood,
      token: token,
      data: data,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    // console.error('Error:', error.response);
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const handleDeleteFood = async (token, foodId) => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'POST',
      url: endpoints.foodRemove,
      token: token,
      data: foodId,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    // console.error('Error:', error.response);
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const handleEditFood = async (token, data) => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'POST',
      url: endpoints.foodEdit,
      token: token,
      data: data,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    // console.error('Error:', error.response);
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};
