// index.js (CJS entry)
const { getServerResponse } = require('./src/Common/getServerResponse.js');
const serverCommunicationHelper = require('./src/Common/serverCommunicationHelper.js');
const { showSuccessToast, showErrorToast, showInfoToast } = require('./src/Common/ToastUtils.js');

module.exports = {
  getServerResponse,
  serverCommunicationHelper,
  showSuccessToast,
  showErrorToast,
  showInfoToast
};
