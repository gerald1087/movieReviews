import AuthService from '../components/AuthService';
const Auth = new AuthService();

export async function registerUser(user) {
  const response = await fetch('http://localhost:3001/api/users/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),

  })
  return await response.json();

}

export async function loginUser(user) {
  const response = await fetch('http://localhost:3001/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user),

  })
  return await response.json();
}

// fetch user profile using protected fetch from auth service
export async function getProfileData() {
  const userProfile = Auth.getProfile();
  if (userProfile) {
    const userId = userProfile.id;
    const response = await Auth.fetch(`${Auth.domain}/users/${userId}`, {
      method: 'GET'
    });
    return await response;
  } else {
    return Promise.resolve();
  }
}
