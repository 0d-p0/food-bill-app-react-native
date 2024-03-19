// Function to extract expiration time from JWT
const getExpirationTime = token => {
  const [, payloadBase64] = token.split('.');
  const payload = JSON.parse(atob(payloadBase64));
  console.log('Decoded payload:', payload); // Add this line for debugging
  return payload.exp * 1000; // Convert from seconds to milliseconds
};
// Function to calculate the time left until JWT expiration
const getTimeLeftUntilExpiration = expirationTime => {
  const currentTime = new Date().getTime();
  const timeLeftInMilliseconds = expirationTime - currentTime;
  const timeLeftInHours = timeLeftInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours
  return timeLeftInHours;
};

// Example usage
const jwtToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoicHJpdGFtMUBtYWlsLmNvbSIsInRva2VuVmVyc2lvbiI6MSwiaWF0IjoxNzEwNzUxNzIxLCJleHAiOjE3MTEzNTY1MjF9.bmKQvH-TZs4iumkI9O_HNFHkA8j_tCNbfItxpAk_7XI';
const expirationTime = getExpirationTime(jwtToken);
const timeLeft = getTimeLeftUntilExpiration(expirationTime);

console.log('Time left until JWT expiration (milliseconds):', timeLeft);
