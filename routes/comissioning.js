const commissionController = require("../controllers/commission");

exports.receiveCommission = (req, res) => {
  commissionController.calculateCommission(req).then((data) => res.send(data));
};
