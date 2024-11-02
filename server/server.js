import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const { verify } = jwt;
const app = express();
app.use(cors());
app.use(express.json());
// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/contact_manager")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB:", err));

// Define schemas
const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ["student", "teacher"] },
});

const contactSchema = new mongoose.Schema({
  name: String,
  department: String,
  domain: String,
  email: String,
  phone: String,
  address: String,
  github: String,
  linkedin: String,
});

const User = mongoose.model("User", userSchema);
const Contact = mongoose.model("Contact", contactSchema);

// Registration route
app.post("/register", async (req, res) => {
  const { phone, password, role } = req.body;
  try {
    const newUser = new User({ phone, password, role });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed", error: error.message });
  }
});

// Login route
app.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "3hATF7zzGuPh3Vr0ZhVao4THlP28Tvvn/4dqNzc3AV8=",
      { expiresIn: "1h" }
    );
    res.json({
      token,
      user: { id: user._id, name: user.phone, role: user.role },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  next();
};

// Contacts routes
app.get("/contacts", async (req, res) => {
  try {
    const { department, domain } = req.query;
    const query = {};
    if (department) query.department = department;
    if (domain) query.domain = domain;
    const contacts = await Contact.find(query);
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to get contacts" });
  }
});

app.post("/contacts", verifyToken, async (req, res) => {
  if (req.userRole !== "teacher")
    return res.status(403).json({ message: "Access forbidden" });
  const contactData = req.body;
  try {
    const newContact = new Contact(contactData);
    await newContact.save();
    res.status(201).json({ message: "Contact added successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add contact", error: error.message });
  }
});

app.delete("/contacts/:id", verifyToken, async (req, res) => {
  if (req.userRole !== "teacher")
    return res.status(403).json({ message: "Access forbidden" });
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact)
      return res.status(404).json({ message: "Contact not found" });
    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete contact", error: error.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
