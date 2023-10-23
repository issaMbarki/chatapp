
export const truncateString  = (string,maxLength) => {
  if (string.length > maxLength) {
    string = string.substring(0,maxLength);
    string= string+"..."
  }
  return string;
}
