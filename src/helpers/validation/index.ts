import * as yup from 'yup';

export const LoginSchema = yup.object().shape({
  email: yup.string().email('Email must be a valid email').required('Email is a required field'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is a required field'),
});

export const SignUpSchema = yup.object().shape({
  name: yup.string().min(1).required("name is a required field"),
  email: yup.string().email('Email must be a valid email').required('Email is a required field'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Password must be at most 20 characters')
    .required('Password is a required field'),
  
})