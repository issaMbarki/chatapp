export const IsInvalidInput = (input) => {
  var error = {};
  const { name, value } = input;
  const onlyChars = /^[A-Za-z]+$/;
  const charsAndDigits = /^[a-zA-Z0-9]{5,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasDigit = /[0-9]/;
  const hasSpecialChar = /[^A-Za-z0-9]/;
  switch (name) {
    case "firstName":
    case "lastName":
      if (!onlyChars.test(value)) {
        error[name] = `Invalid ${name}.`;
      } else {
        error[name] = null;
      }
      break;
    case "username":
      if (!charsAndDigits.test(value)) {
        error[name] =
          "Username must be at least 5 characters long and can contain letters and digits.";
      } else {
        error[name] = null;
      }
      break;
    case "email":
      if (!emailPattern.test(value)) {
        error[name] = "Invalid email";
      } else {
        error[name] = null;
      }
      break;
    case "password":
      if (value.length < 6) {
        error[name] = "Password should at least 6 characters long.";
      } else if (value.length > 50) {
        error[name] = "Password is too long.";
      } else if (
        !hasUppercase.test(value) ||
        !hasLowercase.test(value) ||
        !hasDigit.test(value) ||
        !hasSpecialChar.test(value)
      ) {
        error[name] =
          "Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character.";
      } else {
        error[name] = null;
      }
      break;
    default:
      break;
  }
  if (!value) {
    error[name] = "This field is requeird.";
  }
  return error;
};

export const checkEmptyFields = (obj) => {
  const emptyFields = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === "") {
      emptyFields[key] = "This field is required";
    }
  }

  return emptyFields;
};
