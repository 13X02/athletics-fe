export const getToken = () => {
  return localStorage.getItem('authToken');
};

export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); 
    const exp = payload.exp;
    if (!exp) return true;

    return Date.now() >= exp * 1000; 
  } catch (error) {
    return true; 
  }
};

export const getUserRole = (token) => {
  if (!token) return '';

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); 
    return payload.role || ''; 
  } catch (error) {
    return '';
  }
};
export const getUserId = (token) => {
  if (!token) return '';

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); 
    return payload.userId || ''; 
  } catch (error) {
    return '';
  }
};

export const isLoggedIn = () => {
  const token = getToken();
  return token && !isTokenExpired(token);
};
