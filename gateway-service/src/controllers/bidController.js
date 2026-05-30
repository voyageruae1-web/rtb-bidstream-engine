const receiveBidRequest = async (req, res) => {
  try {
    const bidRequest = req.body;

    console.log("Incoming Bid Request:");
    console.log(bidRequest);

    res.status(200).json({
      success: true,
      message: "Bid request received",
      data: bidRequest
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
};

module.exports = {
  receiveBidRequest
};