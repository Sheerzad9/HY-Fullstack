import axios from 'axios'

const baseUrl = '/api/login'

const login = async (loginData) => {
  const res = await axios.post(baseUrl, loginData)
  return res.data
}

export default { login }
