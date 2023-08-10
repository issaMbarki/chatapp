export const IsInvalidInput = (input) => {
  var error = {};
  const { name, value } = input;
  const onlyChars = /^[A-Za-z]+$/;
  const charsAndDigits = /^[a-zA-Z0-9]{5,}$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const hasChar = /[A-Za-z]/;
  const hasUppercase = /[A-Z]/;
  const hasLowercase = /[a-z]/;
  const hasDigit = /[0-9]/;
  const hasSpecialChar = /[^A-Za-z0-9]/;
  switch (name) {
    case "firstName":
    case "lastName":
      if (value && !onlyChars.test(value)) {
        error[name] = `Invalid ${name==='firstName'?'first name':'last name'}.`;
      } else {
        error[name] = null;
      }
      break;
    case "username":
      if (value &&  !charsAndDigits.test(value) || !hasChar.test(value)) {
        error[name] =
          "Username must be at least 5 characters long and can contain letters and digits.";
      } else if (value.length>20) {
        error[name] ="Username is too long."
      }else {
        error[name] = null;
      }
      break;
    case "email":
      if (value && !emailPattern.test(value)) {
        error[name] = "Invalid email.";
      } else if (value.length>150) {
        error[name]='Email is too long.'
      }{
        error[name] = null;
      }
      break;
      case 'emailUsername': 

      break;
    case "password":
      if ( value && value.length < 6) {
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
