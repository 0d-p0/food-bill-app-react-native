import endpoints from '../endPoints';
import httpRequest from '../httpRequest';

export const handleCreateBill = async (token, data) => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'POST',
      url: endpoints.createBill,
      token: token,
      data: data,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    // console.error('Error:', error.response.data.message);
    // console.error('Error:', error.response);
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const handleGetBill = async (token, fromDate, toDate) => {
  if (!token) {
    return {success: false, message: 'token not found'};
  }

  try {
    const responseData = await httpRequest({
      method: 'GET',
      url: `${endpoints.billingReports}/${fromDate}/${toDate}`,
      token: token,
    });
    // console.log(responseData);
    return {success: true, message: responseData};
  } catch (error) {
    // console.error('Error:', error.response.data.message);
    // console.error('Error:', error.response);
    return {
      success: false,
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};
