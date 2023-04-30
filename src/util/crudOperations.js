export async function submitForm(userData) {
  try {
    const response = await fetch(`https://tipseeart.fly.dev/user/create`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
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

export async function confirmToken(token) {
  try {
    const response = await fetch('https://tipseeart.fly.dev/me', {
      headers: { Authorization: 'Bearer ' + token },
    })
    if (!response.ok) {
      const message = response
      throw new Error(message)
      return false
    }
    const data = await response.json()
    if (data) return true
    return false
  } catch (error) {
    console.log(`Error: ${error}`)
    return false
  }
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
    console.log(data)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}

export async function createProfile(artist, token) {
  console.log(artist, token)
  const formData = new FormData()
  formData.append('artist', artist)
  try {
    const response = await fetch('https://tipseeart.fly.dev/artists/create', {
      method: 'post',
      headers: { Authorization: 'Bearer ' + token },
      body: JSON.stringify(formData),
    })
    if (!response.ok) {
      const message = `Error: ${response.status}`
      throw new Error(message)
    }
    const data = await response.json()
    console.log(data)
    //const token = data.access_token
    //sessionStorage.setItem('token', token)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
