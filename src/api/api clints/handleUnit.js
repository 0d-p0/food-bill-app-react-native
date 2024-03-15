import endpoints from '../endPoints';
import httpRequest from '../httpRequest';

export const handleGetUnitList = async token => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'GET',
      url: endpoints.unitList,
      token: token,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    console.error('Error:', error.response.data.message || error.response.data);
    return {
      success: false,
      message: error.response.data.message || error.response.data,
      status: error.response.status,
    };
  }
};

export const handleSaveNewUnit = async (token, data) => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'POST',
      url: endpoints.addUnit,
      token: token,
      data,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    console.error('Error:', error.response.data.message);
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const handleDeleteUnit = async (token, data) => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'POST',
      url: endpoints.unitRemove,
      token: token,
      data,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    console.error('Error:', error.response.data.message);
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const handleEditUnit = async (token, data) => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'POST',
      url: endpoints.unitEdit,
      token: token,
      data,
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
