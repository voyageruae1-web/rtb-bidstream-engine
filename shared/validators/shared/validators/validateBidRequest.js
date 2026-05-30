const { bidRequestSchema } = require("./bidRequest.schema");

/**
 * RTB VALIDATION MIDDLEWARE
 * Blocks invalid traffic BEFORE auction engine
 */
function validateBidRequest(req, res, next) {
  const result = bidRequestSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: "INVALID_BID_REQUEST",
      error: result.error.format(),
    });
  }

  // attach cleaned data
  req.validatedBody = result.data;

  next();
}

module.exports = validateBidRequest;