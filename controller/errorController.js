const httpStatus = require("http-status-codes");

exports.pageNotFoundError = (req, res) => {
  let errorCode = httpStatus.StatusCodes.NOT_FOUND;
  res.status(errorCode);
  res.render("error");
};

exports.internalServerError = (error, req, res, next) => {
  const httpStatus = require("http-status-codes");
  let errorCode = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR;

  console.error(`ERROR Ocurried: ${error.stack}`);

  // garante que flashMessages existe
  const flashes = req.flash();
  res.locals.flashMessages = {
    success: flashes.success || [],
    error: flashes.error || [],
  };

  res.status(errorCode).render("error500");
};
