// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const Employee = require("./models/Employee");

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/EmployeeMgmtSys", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/api/employee/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
  } catch (error) {
    console.error("Error fetching employee data:", error);
    res.status(500).json({ message: "Error fetching employee data" });
  }
});

app.get("/api/employees", async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put("/api/employee/:id", async (req, res) => {
  try {
    const { name, email, mobile_no, designation, gender, course } = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        email,
        mobile_no,
        designation,
        gender,
        course,
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(updatedEmployee);
  } catch (error) {
    console.error("Error updating employee data:", error);
    res.status(500).json({ message: "Error updating employee data" });
  }
});

app.post("/api/employees", async (req, res) => {
  try {
    const { name, email, mobile_no, designation, gender, course } = req.body;

    const newEmployee = new Employee({
      name,
      email,
      mobile_no,
      designation,
      gender,
      course: JSON.parse(course),
      created_date: new Date(),
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/api/employee/:id", async (req, res) => {
  console.log("Deleting employee with ID:", req.params.id);
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
