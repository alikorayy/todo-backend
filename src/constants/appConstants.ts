const RESPONSE_STATUS = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
  };

const VALID_STATUSES= ['TODO', 'IN_PROGRESS', 'DONE'];

  const appConstants = {
    RESPONSE_STATUS,
    VALID_STATUSES
  };

  export default appConstants;