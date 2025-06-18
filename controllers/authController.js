const User = require("../models/User");
const jwt = require("jsonwebtoken");

// JWT generator
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

exports.signup = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "User already exists" });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user);

    res.status(201).json({ message: "Signup successful", token, user });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = generateToken(user);
    res.status(200).json({ message: "Login successful", token, user });
  }catch (err) {
  console.error("AuthController Error:", err);  // Console pe error show karo
  res.status(500).json({ error: err.message || "Server error" }); // Error message bhejo client ko
}

};
