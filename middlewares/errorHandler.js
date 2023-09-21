const errorHandler = (error, req, res, next) => {
  return res.status(400).send({ status: false, data: error.message });
};

module.exports = errorHandler;
