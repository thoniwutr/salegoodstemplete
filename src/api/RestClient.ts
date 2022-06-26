import axios from 'axios'
import { appBaseURL } from '../ui-kit/EnvUtils'

function createRestClient() {
  const client = axios.create({
    baseURL: appBaseURL,
  })

  client.interceptors.response.use((response) => response.data)
  return client
}

export const authenticatedRestClient = createRestClient()
