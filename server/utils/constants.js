const STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const ERRORS = {
  NOT_FOUND: 'Not Found Error',
  BAD_REQUEST: 'Bad Request Error',
  REQ_PATH_NOT_FOUND: 'The requested path not found!',
};

const MESSAGE = {
  ALREADY_DELETED: 'Record is already deleted.',
  DELETED_SUCCESS: 'Record deleted successfully.',
  NO_ACTIVE_RECORDS: 'No active records found to delete.',
};

module.exports = {
  STATUS,
  ERRORS,
  MESSAGE,
};
