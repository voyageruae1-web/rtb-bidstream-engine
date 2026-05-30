function runAuction(bidRequest) {
  console.log("Running auction for:", bidRequest.bidId);

  return {
    auctionId: `auc-${Date.now()}`,
    bidId: bidRequest.bidId,
    winningPrice: Math.floor(Math.random() * 100) + 1,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  runAuction
};