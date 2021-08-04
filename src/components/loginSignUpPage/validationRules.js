export default function validate(values) {
  let errors = {};

  if (!values.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!values.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!values.email) {
    errors.email = 'Email address is required';
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = "Password must be 6 characters or more";
  }

  return errors;
}