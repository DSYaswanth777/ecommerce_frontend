// Validation schema
export const validationSchema = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^\S+@\S+$/i,
      message: "Invalid email address",
    },
  },
  password: {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  },
};
export const signupValidationSchema = {
  name: {
    required: true,
    minLength: 4,
    pattern: /^[A-Za-z\s]+$/i,

  },
  email: {
    required: true,
    pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
  },
  mobile: {
    required: true,
    pattern: /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/,
  },
  password: {
    required: true,
    minLength: 6,
    maxLength: 10,
    pattern: /^(?=.*\d)/,
  },
  confirmPassword: {
    validate: (value, values) => value === values.password,
  },
};
