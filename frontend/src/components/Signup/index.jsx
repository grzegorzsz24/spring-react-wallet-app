import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const validateField = (name, value) => {
    const nameRegex = /^[A-Z][a-zA-Z]{1,}$/; // Wzorzec dla imienia i nazwiska
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/; // Wzorzec dla hasła

    switch (name) {
      case "firstName":
        if (!nameRegex.test(value)) {
          return "First name must start with a capital letter and have at least two characters";
        }
        break;
      case "lastName":
        if (!nameRegex.test(value)) {
          return "Last name must start with a capital letter and have at least two characters";
        }
        break;
      case "password":
        if (!passwordRegex.test(value)) {
          return "Password must have at least 8 characters, one uppercase letter, and one digit";
        }
        break;
      default:
        break;
    }

    return "";
  };

  const handleBlur = (name, value) => {
    const error = validateField(name, value);
    setErrors({ ...errors, [name]: error });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let fieldErrors = {};

    // Walidacja pól
    for (const [fieldName, fieldValue] of Object.entries(data)) {
      const error = validateField(fieldName, fieldValue);
      if (error) {
        fieldErrors[fieldName] = error;
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    try {
      const url = "http://localhost:8080/api/auth/register";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setErrors({ general: error.response.data.message });
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
              value={data.firstName}
              required
              className={`${styles.input} ${errors.firstName && styles.error_input}`}
            />
            {errors.firstName && <p className={styles.error_msg}>{errors.firstName}</p>}
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
              value={data.lastName}
              required
              className={`${styles.input} ${errors.lastName && styles.error_input}`}
            />
            {errors.lastName && <p className={styles.error_msg}>{errors.lastName}</p>}
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
              value={data.password}
              required
              className={`${styles.input} ${errors.password && styles.error_input}`}
            />
            {errors.password && <p className={styles.error_msg}>{errors.password}</p>}
            {errors.general && <p className={styles.error_msg}>{errors.general}</p>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
