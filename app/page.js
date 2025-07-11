"use client";

import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  Switch,
  Button,
  Typography,
  Stack,
  Slider,
  Rating,
  Autocomplete,
  IconButton,
  InputAdornment
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  AccountCircle,
  Email,
  Phone,
  UploadFile
} from "@mui/icons-material";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    date: "",
    gender: "",
    agree: false,
    notifications: false,
    description: "",
    file: null,
    role: "",
    phone: "",
    time: "",
    rating: 3,
    slider: 50,
    country: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const countries = ["India", "USA", "Canada", "Australia", "Germany"];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhoneInput = (e) => {
    const numeric = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phone: numeric });
  };

  const validate = () => {
    const newErrors = {};
    const requiredFields = [
      "name",
      "email",
      "password",
      "date",
      "phone",
      "time",
      "description",
      "role",
      "gender",
      "country"
    ];

    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "This field is required";
      }
    });

    if (!formData.file) newErrors.file = "File is required";
    if (!formData.agree) newErrors.agree = "You must agree to continue";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", formData);
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      date: "",
      gender: "",
      agree: false,
      notifications: false,
      description: "",
      file: null,
      role: "",
      phone: "",
      time: "",
      rating: 0,
      slider: 50,
      country: ""
    });
    setErrors({});
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
      <form onSubmit={handleSubmit} style={{ maxWidth: 600, width: "100%" }}>
        <Typography variant="h5" mb={'2'} gutterBottom>
          All Fields Form
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <AccountCircle />
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Email />
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            error={!!errors.password}
            helperText={errors.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((prev) => !prev)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Date of Birth"
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.date}
            helperText={errors.date}
          />

          <TextField
            label="Phone Number"
            name="phone"
            type="tel"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*", maxLength: 10 }}
            value={formData.phone}
            onChange={handlePhoneInput}
            fullWidth
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Phone />
                </InputAdornment>
              )
            }}
          />

          <TextField
            label="Preferred Time"
            name="time"
            type="time"
            value={formData.time}
            onChange={handleChange}
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={!!errors.time}
            helperText={errors.time}
          />

          <Autocomplete
            options={countries}
            value={formData.country}
            onChange={(event, newValue) => {
              setFormData({ ...formData, country: newValue });
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Country"
                error={!!errors.country}
                helperText={errors.country}
              />
            )}
          />

          
            <FormControl fullWidth error={!!errors.role}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              labelId="role-label"
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              label="Role"
            >
              <MenuItem value="">
                <em>Select Role</em>
              </MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="guest">Guest</MenuItem>
            </Select>
            {errors.role && (
              <Typography variant="caption" color="error">
                {errors.role}
              </Typography>
            )}
          </FormControl>

          <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
          {errors.gender && (
            <Typography variant="caption" color="error">
              {errors.gender}
            </Typography>
          )}

          <TextField
            label="Description"
            name="description"
            multiline
            minRows={3}
            value={formData.description}
            onChange={handleChange}
            fullWidth
            error={!!errors.description}
            helperText={errors.description}
          />

          <Box>
            <Button
              variant="outlined"
              component="label"
              endIcon={<UploadFile />}
            >
              Upload File
              <input
                type="file"
                name="file"
                hidden
                onChange={handleChange}
                accept=".png,.jpg,.pdf"
              />
            </Button>
            {formData.file && (
              <Typography variant="body2" mt={1}>
                Selected: {formData.file.name}
              </Typography>
            )}
            {errors.file && (
              <Typography variant="caption" color="error">
                {errors.file}
              </Typography>
            )}
          </Box>

          <Typography gutterBottom>Experience (Slider)</Typography>
          <Slider
            value={formData.slider}
            onChange={(e, val) => setFormData({ ...formData, slider: val })}
            step={10}
            marks
            min={0}
            max={100}
            valueLabelDisplay="auto"
          />

          <Typography gutterBottom>Rating</Typography>
          <Rating
            name="rating"
            value={formData.rating}
            onChange={(e, newValue) => {
              setFormData({ ...formData, rating: newValue });
            }}
          />

          <FormControlLabel
            control={
              <Checkbox
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
              />
            }
            label="I agree to terms"
          />
          {errors.agree && (
            <Typography variant="caption" color="error">
              {errors.agree}
            </Typography>
          )}

          <FormControlLabel
            control={
              <Switch
                name="notifications"
                checked={formData.notifications}
                onChange={handleChange}
              />
            }
            label="Enable Notifications"
          />

          <Stack direction="row" justifyContent="space-between" spacing={2}>
            <Box sx={{ flex: 1 }}>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={handleClear}
              >
                Clear
              </Button>
            </Box>

            <Box sx={{ flex: 1 }}>
              <Button variant="contained" type="submit" fullWidth>
                Submit
              </Button>
            </Box>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
}
