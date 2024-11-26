import React, { useEffect, useState } from "react";
//import { employees } from "../../data.js";
import axios from "axios";
import classes from "./employeeList.module.css";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/employees");
        setEmployees(response.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchEmployees();
  }, []);
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/employee/${id}`
      );

      if (response.status === 200) {
        setEmployees((prevEmployees) =>
          prevEmployees.filter((employee) => employee._id !== id)
        );
        console.log("Employee deleted successfully");
      }
    } catch (err) {
      console.error("Error deleting employee:", err);
    }
  };
  return (
    <div className={classes.elist}>
      <div className={classes.header}>
        <div>Total Count:{employees.length}</div>
        <Link to="/create-employee">
          <div className={classes.button}>Create Employee</div>
        </Link>
      </div>
      <div className={classes.search}>
        <label>Search:</label>
        <input />
      </div>
      <table className={classes.table}>
        <thead>
          <tr className={classes.top_heading}>
            <td>Unique Id</td>
            <td>Image</td>
            <td>Name</td>
            <td>Email</td>
            <td>Mobile No.</td>
            <td>Designation</td>
            <td>Gender</td>
            <td>Course</td>
            <td>Created Date</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const formatDate = format(
              new Date(employee.created_date),
              "dd-MM-yyyy"
            );
            return (
              <tr className={classes.heading}>
                <td>{employee.id}</td>
                <td>
                  <img
                    src={`Images/${employee.name
                      .replace(/\s+/g, "")
                      .toLowerCase()}.jpg`}
                    alt={employee.name}
                    width={100}
                    height={100}
                  />
                </td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.mobile_no}</td>
                <td>{employee.designation}</td>
                <td>{employee.gender}</td>
                <td>{employee.course.join(", ")}</td>
                <td>{formatDate}</td>
                <td>
                  <Link to={`/edit-employee/${employee._id}`}>
                    <div className={classes.button}>Edit</div>
                  </Link>
                  <div
                    className={classes.button}
                    onClick={() => handleDelete(employee._id)}
                  >
                    Delete
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
