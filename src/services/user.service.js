import axios from 'axios'
const API_URL = 'https://iapitest.eva.guru'

///oauth/token:
const login = async (userData) => {
  const requestData = {
    Email: userData.email,
    Password: userData.password,
    GrantType: 'password',
    Scope: 'amazon_data',
    ClientId: 'C0001',
    ClientSecret: 'SECRET0001',
    RedirectUri: 'https://api.eva.guru'
  }
  const response = await axios.post(API_URL + '/oauth/token', requestData)

  if (response.data?.Data) {
    localStorage.setItem('token', response.data.Data.AccessToken)
    localStorage.setItem('email', userData.email)
  }
  return response.data?.ApiStatusCode === 200
}

const getUserInfo = async () => {
  let userEmail = localStorage.getItem('email') || ''
  const token = localStorage.getItem('token') ? localStorage.getItem('token') : ''
  if (userEmail.length === 0 || token.length === 0) return new Promise.reject()
  const authHeaders = {
    Authorization: `Bearer ${token}`
  }

  return await axios
    .post(API_URL + '/user/user-information', { email: userEmail }, { headers: authHeaders })
    .then((res) => {
      localStorage.setItem('marketplace', res.data.Data.user.store[0].marketplaceName)
      localStorage.setItem('sellerId', res.data.Data.user.store[0].storeId)
      localStorage.setItem('user', res.data.Data.user)
      return res
    })
    .catch((err) => {
      return err
    })
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  localStorage.removeItem('sellerId')
  localStorage.removeItem('marketplace')
}

export const userService = {
  login,
  getUserInfo,
  logout
}

export default userService
