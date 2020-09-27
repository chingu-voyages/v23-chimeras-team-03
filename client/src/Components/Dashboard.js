import React from "react";
import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully");
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={(e) => logout(e)}>Log out</button>
    </div>
  );
};

export default Dashboard;
