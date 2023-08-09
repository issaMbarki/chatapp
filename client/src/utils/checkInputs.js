export const IsInvalidInput = (input) => {
  const { name, value } = input;
  switch (name) {
    case "firstName":
        console.log(name);
      break;
    case "lastName":
        console.log(name);
      break;
    case "username":
        console.log(name);
      break;
    case "email":
        console.log(name);
      break;
    case "password":
        console.log(name);
      break;
    default:
      break;
  }
  //   if (!input) {
  //     return 'this field is requeird';
  //   }else if (true) {
  //      {
  //       return false
  //     }
  //   }
};
