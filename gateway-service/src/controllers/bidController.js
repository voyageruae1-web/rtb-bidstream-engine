const { sendBidRequest } = require("../../kafka/producer");

const receiveBidRequest = async (req, res) => {
  try {
    // Normalize incoming payload (fixes undefined bidId issue)
    const bidRequest = {
      bidId: req.body.bidId || req.body.id,
      publisher: req.body.publisher || "unknown",
    };

    // Send to Kafka
    await sendBidRequest(bidRequest);

    console.log("Incoming Bid Request:");
    console.log(bidRequest);

    return res.status(200).json({
      success: true,
      message: "Bid request received and sent to Kafka",
      data: bidRequest,
    });
  } catch (error) {
    console.error("Error in receiveBidRequest:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  receiveBidRequest,
};