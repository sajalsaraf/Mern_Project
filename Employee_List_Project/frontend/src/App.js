import { Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import EmployeeList from "./components/EmployeeList/EmployeeList";
import CreateEmployee from "./components/CreateEmployee/CreateEmployee";
import EditEmployee from "./components/EditEmployee/EditEmployee";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/employee-list" element={<EmployeeList />} />
      <Route path="/create-employee" element={<CreateEmployee />} />
      <Route path="/edit-employee/:id" element={<EditEmployee />} />
    </Routes>
  );
}

export default App;
