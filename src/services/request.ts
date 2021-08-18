import axios from 'axios'
import { message } from '@/components'

export interface CommonResponse<T> {
  reqId: string
  code: number
  data: T
  msg?: string
}

export interface ResponseError<D = any> extends Error {
  name: string
  data: D
  response: ResponseError
  request: {
    url: string
    options: any
  }
  type: string
}

type GetParams = Record<string, any> | URLSearchParams | undefined
type Url = `/${string}`
function get<Result>(url: Url): () => Promise<Result>
function get<Result, Params extends GetParams>(
  url: Url
): (params: Params) => Promise<Result>
function get<Result, Params extends GetParams>(
  url: Url
): (params?: Params) => Promise<Result> {
  return async (params) => {
    const { data } = await axios.get<CommonResponse<Result>>(url, { params })
    const { code, msg } = data
    if (code === 0) {
      return data.data
    }
    return {} as Result
  }
}
function post<Result>(url: Url): () => Promise<Result>
function post<Result, Params>(url: Url): (params: Params) => Promise<Result>
function post<Result, Params>(url: Url): (params?: Params) => Promise<Result> {
  return async (params) => {
    const { data } = await axios.post<CommonResponse<Result>>(url, params)
    return data.data
  }
}

axios.interceptors.request.use(
  (config) => {
    const baserUrl = GLOBAL_CONFIG?.API_SERVER_URL
    config.url = `${baserUrl}${config.url}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    const { code, msg } = response.data as CommonResponse<any>
    if (code !== 0) {
      message.error('数据错误')
    }
    return response
  },
  function (error: ResponseError) {
    const { response } = error
    console.log('response: ', response)
    if (!response) {
      message.error('您的网络发生异常，无法连接服务器')
    } else {
      message.error(response.data?.msg || '请求错误')
    }
    return Promise.reject(error)
  }
)

const request = axios.request

export { get, post, request }
