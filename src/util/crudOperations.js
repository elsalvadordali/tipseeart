import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase';

export async function submitForm(userData) {
  let res

  await createUserWithEmailAndPassword(auth, userData.email, userData.password)
  .then((userCredential) => {
    const user = userCredential.user;
    localStorage.setItem('uid', user.auth.currentUser.uid)
    sessionStorage.setItem('token', user.accessToken)
    res = true
  })
  .catch(() => {
    res = false
  });
  return res
}


export async function loginRequest(userData) {
  try {
    const response = await fetch('https://tipseeart.fly.dev/token', {
      method: 'post',
      headers: {}, // When using specified 'Content-Type': 'application/x-www-form-urlencoded' an error 422 occurs.
      body: userData,
    })

    if (!response.ok) {
      const message = `Error: ${response.status}`
      throw new Error(message)
    }

    const data = await response.json()
    const token = data.access_token
    sessionStorage.setItem('token', token)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
