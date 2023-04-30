let url = 'https://tipseeart.fly.dev/user/create'

export async function submitForm(userData) {
  try {
    const response = await fetch(url, {
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

export async function loginRequest(userData) {
  try {
    const response = await fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: userData,
    })

    if (!response.ok) {
      const message = `Error: ${response.status}`
      throw new Error(message)
    }

    const data = await response.json()
    const token = data.access_token
    console.log(data, token)
    // sessionStorage.setItem('token', token)
  } catch (error) {
    console.log(`Error: ${error}`)
  }
}
