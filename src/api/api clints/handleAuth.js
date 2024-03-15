import endpoints from '../endPoints';
import httpRequest from '../httpRequest';

export const handleLoginRequest = async data => {
  try {
    const responseData = await httpRequest({
      method: 'Post',
      url: endpoints.login,
      data: data,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    // console.error('Error:', error.response.data);
    return {success: false, message: error.response.data};
  }
};

export const handleRegisterRequest = async data => {
  try {
    const responseData = await httpRequest({
      method: 'Post',
      url: endpoints.register,
      data: data,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    // console.error('Error:', error.response.data);
    return {success: false, message: error.response.data};
  }
};

export const handleChangePasswordRequest = async (token, data) => {
  try {
    const responseData = await httpRequest({
      method: 'Post',
      url: endpoints.changePassword,
      token: token,
      data: data,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    // console.error('Error:', error.response.data);
    return {
      success: false,
      message: error.response.data,
      status: error.response.status,
    };
  }
};

export const handleLogoutOtherRequest = async token => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'GET',
      url: endpoints.logoutOthers,
      token: token,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    console.error('Error:', error.response.data.message);
    // console.error('Error:', error.response);
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};
