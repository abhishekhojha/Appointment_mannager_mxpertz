const User = require("../model/User");

const getUsers = async (req, res) => {
  try {
    const role = req.query.role || "patient";

    const users = await User.find({ role }).select("-password");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { getUsers };
