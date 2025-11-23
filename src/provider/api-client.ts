import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

export class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      // TODO: REPLACE THIS WITH ENV VARIABLE
      baseURL: 'https://api.themoviedb.org/3',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.client.interceptors.request.use(
      config => this.handleRequest(config),
      error => this.handleError(error),
    );

    this.client.interceptors.response.use(
      response => this.handleResponse(response),
      error => this.handleError(error),
    );
  }

  private handleRequest(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig {
    // TODO: REPLACE THIS WITH ENV VARIABLE
    const accessToken =
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1MmM5MDI1ZDM2ZGY5MmQxYzYwMGNlNzc0NmVlZmRkNSIsIm5iZiI6MTc2Mzc4NTYxNS45NDUsInN1YiI6IjY5MjEzYjhmMzg3ODNlNWFlOWEzYWI5NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qyrugTDzGThGwVEIFr4VzvhdLesnCFo0sNrF5grKvhg';
    if (accessToken) {
      config.headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return config;
  }

  private handleResponse<T>(response: AxiosResponse<T>): T {
    return response.data;
  }

  private handleError(error: AxiosError): Promise<never> {
    if (error.response) {
      if (error.response.status === 401) {
        // TODO: Handle unauthorized error, e.g., redirect to login
      }

      return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
  }

  public get<T>(url: string, params?: Record<string, any>): Promise<T> {
    return this.client.get(url, { params });
  }

  public post<T, K>(
    url: string,
    data?: K,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.client.post(url, data, config);
  }

  public put<T, K>(
    url: string,
    data?: K,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.client.put(url, data, config);
  }

  public delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete(url, config);
  }
}

export const apiClient = new ApiClient();
