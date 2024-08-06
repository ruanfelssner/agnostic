import { type $Fetch, type FetchOptions as $FetchOptions, ofetch } from 'ofetch'
import { Agent, setGlobalDispatcher } from 'undici'

export type FetchParams = $FetchOptions<'json'> & {
  url: RequestInfo
  queryString?: string
}

const agent = new Agent({
  connect: {
    rejectUnauthorized: false
  }
})

setGlobalDispatcher(agent)

export class HttpAdapter {
  readonly fetch: $Fetch

  async fetchErrorFactory(error: unknown) {
    return error
  }

  constructor(
    readonly baseURL: string = '',
    options?: any
  ) {
    this.fetch = ofetch.create({
      baseURL,
      ...options
    })
  }

  async get<TReturnType = unknown>(params: Omit<FetchParams, 'body'>): Promise<TReturnType> {
    return this.fetch(
      `${params.url}${params.queryString ? `?${new URLSearchParams(params.queryString)}` : params.params ? `?${new URLSearchParams(params.params).toString()}` : ''}`
    )
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(this.fetchErrorFactory(error)))
  }

  async post<TReturnType = unknown>(
    params: FetchParams,
    formData?: FormData
  ): Promise<TReturnType> {
    return this.fetch(params.url, {
      method: 'POST',
      body: formData ? formData : JSON.stringify(params.body),
      headers: formData ? {} : { 'Content-Type': 'application/json' }
    })
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(this.fetchErrorFactory(error)))
  }

  async put<TReturnType = unknown>(params: FetchParams): Promise<TReturnType> {
    return fetch(params.url, {
      method: 'PUT',
      body: JSON.stringify(params.body)
    })
      .then(response => response.json())
      .catch(error => Promise.reject(this.fetchErrorFactory(error)))
  }

  async patch<TReturnType = unknown>(params: FetchParams): Promise<TReturnType> {
    return this.fetch(params.url, {
      method: 'PATCH',
      body: JSON.stringify(params.body)
    })
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(this.fetchErrorFactory(error)))
  }

  async delete(params: Omit<FetchParams, 'body'>): Promise<unknown> {
    return this.fetch(params.url, {
      method: 'DELETE'
    })
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(this.fetchErrorFactory(error)))
  }
}

export default HttpAdapter