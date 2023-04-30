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

export async function confirmToken(token) {
  try {
    const response = await fetch('https://tipseeart.fly.dev/me', {
      headers: { Authorization: 'Bearer ' + token }
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