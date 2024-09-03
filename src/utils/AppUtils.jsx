// AppUtils.js
export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
    const exp = payload.exp;
    if (!exp) return true;

    return Date.now() >= exp * 1000; // Convert exp to milliseconds
  } catch (error) {
    return true; // Error in decoding token
  }
};

export const getUserRole = (token) => {
  if (!token) return '';

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
    return payload.role || ''; // Extract role from payload
  } catch (error) {
    return '';
  }
};
export const getUserId = (token) => {
  if (!token) return '';

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
    return payload.userId || ''; // Extract role from payload
  } catch (error) {
    return '';
  }
};

export const isLoggedIn = () => {
  const token = getToken();
  return token && !isTokenExpired(token);
};
