import React, { useState } from "react";
import classes from "./createEmployee.module.css";
import { useNavigate } from "react-router-dom";

export default function CreateEmployee() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "HR",
    gender: "",
    courses: [],
  });

  const [formErrors, setFormErrors] = useState({
    mobile: false,
    email: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => {
        const newCourses = checked
          ? [...prev.courses, value]
          : prev.courses.filter((course) => course !== value);
        return { ...prev, courses: newCourses };
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, mobile: value }));
    setFormErrors((prev) => ({ ...prev, mobile: value.length !== 9 }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, email: value }));
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setFormErrors((prev) => ({ ...prev, email: !emailValid }));
  };

  const isFormValid = () => {
    const { name, email, mobile, gender, courses } = formData;
    return (
      name &&
      email &&
      mobile.length === 9 &&
      gender &&
      courses.length > 0 &&
      !formErrors.mobile &&
      !formErrors.email
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      console.log("Form is invalid.");
      return;
    }

    const formDataToSend = {
      name: formData.name,
      email: formData.email,
      mobile_no: formData.mobile,
      designation: formData.designation,
      gender: formData.gender,
      course: JSON.stringify(formData.courses), // Ensure courses is an array
    };

    // Make sure no field is undefined
    for (const key in formDataToSend) {
      if (formDataToSend[key] === undefined || formDataToSend[key] === "") {
        console.error(`Field ${key} is undefined or empty.`);
        return; // Exit if any value is invalid
      }
    }

    try {
      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend), // Send as JSON
      });

      if (response.ok) {
        console.log("Form submitted successfully");
        navigate("/employee-list");
      } else {
        console.log("Failed to submit form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
            value={formData.name}
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
            type="text"
            name="email"
            value={formData.email}
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
            name="mobile"
            value={formData.mobile}
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
            value={formData.designation}
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
              value="Male"
              checked={formData.gender === "Male"}
              onChange={handleChange}
            />{" "}
            M
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="Female"
              checked={formData.gender === "Female"}
              onChange={handleChange}
            />{" "}
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
              checked={formData.courses.includes("MCA")}
              onChange={handleChange}
            />
            MCA
          </label>
          <label>
            <input
              type="checkbox"
              value="BCA"
              checked={formData.courses.includes("BCA")}
              onChange={handleChange}
            />
            BCA
          </label>
          <label>
            <input
              type="checkbox"
              value="BSC"
              checked={formData.courses.includes("BSC")}
              onChange={handleChange}
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
          <input type="file" accept=".jpg" onChange={handleFileChange} />
        </div>
      </div>
      <div className={classes.button} onClick={handleSubmit}>
        Submit
      </div>
      {!isFormValid() && (
        <div className={classes.warning}>
          *Please fill all fields correctly.
        </div>
      )}
    </div>
  );
}
