// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";
import axios from "../api";
import toast from 'react-hot-toast'
const Register = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });

      if (response.data.success) {
        toast.success("User Registered Successfully");
        navigate("/login");
      } else {
        console.error("Registration failed:", response.data);
        toast.success("Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        console.error("Response error:", error.response.data);
        toast.success(`Error: ${error.response.data.message || "Registration failed"}`);
      } else if (error.request) {
        console.error("Request error:", error.request);
        toast.success("No response from the server. Please try again later.");
      } else {
        console.error("Error:", error.message);
        toast.success(`Error: ${error.message}`);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        maxWidth={450}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="auto"
        marginTop={5}
        boxShadow="10px 10px 20px #ccc"
        padding={3}
        borderRadius={5}
      >
        <Typography
          variant="h4"
          padding={3}
          textAlign="center"
          sx={{ textTransform: "uppercase" }}
        >
          Register
        </Typography>
        <TextField
          placeholder="Enter Your Name"
          value={inputs.name}
          onChange={handleChange}
          name="name"
          margin="normal"
          type="text"
          required
        />
        <TextField
          placeholder="Enter Your Email"
          value={inputs.email}
          onChange={handleChange}
          name="email"
          margin="normal"
          type="email"
          required
        />
        <TextField
          placeholder="Enter Your Password"
          value={inputs.password}
          onChange={handleChange}
          name="password"
          margin="normal"
          type="password"
          required
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: 3, marginTop: 3 }}
          color="primary"
        >
          Submit
        </Button>
        <Button
          onClick={() => navigate("/login")}
          sx={{ borderRadius: 3, marginTop: 3 }}
        >
          Already Registered? Please Login
        </Button>
      </Box>
    </form>
  );
};

export default Register;
