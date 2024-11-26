import React, { useEffect, useState } from "react";
import classes from "./editEmployee.module.css";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    mobile_no: "",
    designation: "",
    gender: "",
    course: "",
    created_date: "",
  });
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`
        );
        setEmployee(response.data);
      } catch (err) {
        console.error("Error fetching employee:", err);
      }
    };
    fetchEmployee();
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({ ...prev, [name]: value }));
  };
  const handleGenderChange = (e) => {
    setEmployee((prev) => ({ ...prev, gender: e.target.value }));
  };

  const [formErrors, setFormErrors] = useState({
    mobile: false,
    email: false,
  });
  const handleCourseChange = (e) => {
    const { value } = e.target;
    setEmployee((prev) => {
      const updatedCourses = prev.course.includes(value)
        ? prev.course.filter((course) => course !== value)
        : [...prev.course, value];
      return { ...prev, course: updatedCourses };
    });
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    const isValidMobile = /^[0-9]{9}$/.test(value);
    console.log(isValidMobile);
    setEmployee((prev) => ({ ...prev, mobile_no: value }));
    setFormErrors((prev) => ({ ...prev, mobile: !isValidMobile }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmployee((prev) => ({ ...prev, email: value }));
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setFormErrors((prev) => ({ ...prev, email: !emailValid }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/employee/${id}`, employee);
      navigate("/employee-list");
    } catch (err) {
      console.error("Error updating employee:", err);
    }
  };
  const isFormValid = () => {
    const { name, email, mobile_no, gender, course } = employee;
    return (
      name &&
      email &&
      mobile_no.length === 9 &&
      gender &&
      course.length > 0 &&
      !formErrors.mobile &&
      !formErrors.email
    );
  };
  
  return (
    <div className={classes.cemp}>
      <div className={classes.container}>
        <div className={classes.label}>
          <label>Name: </label>
        </div>
        <div>
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.label}>
          <label>Email: </label>
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleEmailChange}
          />
        </div>
        {formErrors.email && (
          <div className={classes.warning}>*Please enter a valid email</div>
        )}
      </div>
      <div className={classes.container}>
        <div className={classes.label}>
          <label>Mobile No: </label>
        </div>
        <div>
          <input
            type="text"
            name="mobile_no"
            value={employee.mobile_no}
            onChange={handleMobileChange}
          />
        </div>
        {formErrors.mobile && (
          <div className={classes.warning}>
            *Mobile no. must be 9 digits only
          </div>
        )}
      </div>
      <div className={classes.container}>
        <div className={classes.label}>
          <label>Designation: </label>
        </div>
        <div>
          <select
            name="designation"
            value={employee.designation}
            onChange={handleChange}
          >
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.label}>
          <label>Gender: </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="M"
              checked={employee.gender === "Male"}
              onChange={handleGenderChange}
            />
            M
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="F"
              checked={employee.gender === "Female"}
              onChange={handleGenderChange}
            />
            F
          </label>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.label}>
          <label>Course: </label>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              value="MCA"
              checked={employee.course.includes("MCA")}
              onChange={handleCourseChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              value="BCA"
              checked={employee.course.includes("BCA")}
              onChange={handleCourseChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              value="BSC"
              checked={employee.course.includes("BSC")}
              onChange={handleCourseChange}
            />
            BSC
          </label>
        </div>
      </div>
      <div className={classes.container}>
        <div className={classes.label}>
          <label>Image Upload: </label>
        </div>
        <div>
          <input type="file" accept=".jpg" />
        </div>
      </div>
      <div
        className={classes.button}
        onClick={handleSubmit}
      >
        Submit
      </div>
      {!isFormValid && (
        <div className={classes.warning}>*Please fill all fields correctly</div>
      )}
    </div>
  );
}
