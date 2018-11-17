function errorHandler(error, request, response, next) {
  return response.status(error.status || 500).json({
    error: {
      errMessage: error.message || "Oops, something went wrong!"
    }
  });
}

module.exports = errorHandler;
