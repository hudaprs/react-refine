import { DataProvider } from '@refinedev/core'
import defaultAxios from 'axios'
// import { mapOperator } from '@refinedev/simple-rest'
import omit from 'lodash.omit'

const axios = defaultAxios.create({
  baseURL: 'https://api.fake-rest.refine.dev',
  timeout: 1000
})

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

// const generateFilters = (filters?: CrudFilters) => {
//   const queryFilters: { [key: string]: string } = {}

//   filters?.map((filter): void => {
//     if ('field' in filter) {
//       const { field, operator, value } = filter
//       const mappedOperator = mapOperator(operator)
//       queryFilters[`${field}${mappedOperator}`] = value
//     }
//   })

//     return queryFilters
// }

export const dataProvider = (apiUrl: string): DataProvider => ({
  getApiUrl: () => apiUrl,
  getList: async ({ resource }) => {
    const url = `${apiUrl}/${resource}`
    const { data } = await axios.get(url)

    return {
      data,
      total: data.length
    }
  },
  create: async ({ resource, variables }) => {
    const url = `${apiUrl}/${resource}`

    const { data } = await axios.post(url, variables)

    return {
      data
    }
  },
  getOne: async ({ resource, id }) => {
    const url = `${apiUrl}/${resource}/${id}`

    const { data } = await axios.get(url)

    return {
      data
    }
  },
  update: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`

    const { data } = await axios.patch(url, variables)

    return {
      data
    }
  },
  deleteOne: async ({ resource, id, variables }) => {
    const url = `${apiUrl}/${resource}/${id}`

    const { data } = await axios.delete(url, {
      data: variables
    })

    return {
      data
    }
  }
})
