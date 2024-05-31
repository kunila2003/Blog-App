import React, { useState } from "react";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "../api";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: {
              xs: '90%', // 90% of the screen width on extra-small devices
              sm: '80%', // 80% of the screen width on small devices
              md: '60%', // 60% of the screen width on medium devices
              lg: '50%', // 50% of the screen width on large devices
              xl: '40%', // 40% of the screen width on extra-large devices
            },
            border: 3,
            borderRadius: 2,
            padding: {
              xs: 2, // Padding on extra-small devices
              sm: 3, // Padding on small devices
            },
            margin: 'auto',
            boxShadow: '10px 10px 20px #ccc',
            display: 'flex',
            flexDirection: 'column',
            marginTop: '30px',
          }}
        >
          <Typography
            variant="h4"
            textAlign="center"
            fontWeight="bold"
            padding={3}
            color="gray"
          >
            Create A Post
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "18px", fontWeight: "bold" }}
          >
            Title
          </InputLabel>
          <TextField
            name="title"
            value={inputs.title}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "18px", fontWeight: "bold" }}
          >
            Description
          </InputLabel>
          <TextField
            name="description"
            value={inputs.description}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
            required
          />
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "18px", fontWeight: "bold" }}
          >
            Image URL
          </InputLabel>
          <TextField
            name="image"
            value={inputs.image}
            onChange={handleChange}
            margin="normal"
            variant="outlined"
            required
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            sx={{ mt: 2 }}
          >
            SUBMIT
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;