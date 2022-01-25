import Axios, { AxiosInstance } from 'axios';
import { RequestConfig } from '../../domain/entity/auth/structures/rest/Types';
import { ApiConfiguration } from './ApiConfiguration';
import { handleServiceError } from './ApiServiceErrors';
import { IApiClient } from '../../domain/entity/auth/structures/rest/ApiClient';

export default class ApiClient implements IApiClient { 
  private client: AxiosInstance;

  protected createAxiosClient(
    apiConfiguration: ApiConfiguration
  ): AxiosInstance {
    return Axios.create({
      baseURL: 'http://localhost:3000/api/v1',
      responseType: 'json' as const,
      headers: {
        'Content-Type': 'application/json',
        ...(apiConfiguration.accessToken && {
          Authorization: `Token ${apiConfiguration.accessToken}`,
        }),
      },
      timeout: 10 * 1000,
    });
  }

  constructor(apiConfiguration: ApiConfiguration) {
    this.client = this.createAxiosClient(apiConfiguration);
  }

  async post<TRequest, TResponse>(
    path: string,
    payload: TRequest,
    config?: RequestConfig
  ): Promise<TResponse> {
    try {
      const response = config
        ? await this.client.post<TResponse>(path, payload, config)
        : await this.client.post<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as TResponse;
  }

  async patch<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as TResponse;
  }

  async put<TRequest, TResponse>(
    path: string,
    payload: TRequest
  ): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(path, payload);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as TResponse;
  }

  async get<TResponse>(path: string): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(path);
      return response.data;
    } catch (error) {
      handleServiceError(error);
    }
    return {} as TResponse;
  }
}