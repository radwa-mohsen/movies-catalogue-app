import { errors } from '../utilies/errors';

const useErrorsHandler = () => {
  const handleError = (statusCode = 500, msg = '') => {
    const message = msg || errors[`error${statusCode}`];
    alert(message);
  };
  const handleErrorResponse = (err) => {
    if (err.response) {
      try {
        switch (err.response.status) {
          case 401:
            handleError(401, err.response?.data?.error_message);
            break;
          case 403:
            handleError(403, err.response?.data?.error_message);
            break;
          case 400:
            handleError(500, err.response?.data?.error_message);
            break;
          case 404:
            handleError(404, err.response?.data?.error_message);
            break;
          default:
            handleError(500, err.response?.data?.error_message);
        }
      } catch (e) {
        handleError(500);
      }
    } else if (err.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      handleError(500);
    } else {
      // Something happened in setting up the request that triggered an Error
      handleError(500);
    }
  };

  return handleErrorResponse;
};
export default useErrorsHandler;