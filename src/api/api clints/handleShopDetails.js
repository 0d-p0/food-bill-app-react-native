import endpoints from '../endPoints';
import httpRequest from '../httpRequest';

export const handleUpdateShopDetails = async (data, token) => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }
  if (!data) {
    return {success: false, message: 'Shop Details not found'};
  }
  try {
    const responseData = await httpRequest({
      method: 'Post',
      url: endpoints.shopUpdate,
      data: data,
      token: token,
    });
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
