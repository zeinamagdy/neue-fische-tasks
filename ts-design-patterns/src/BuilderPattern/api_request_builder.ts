// The API request builder
// Design a flexible way to construct HTTP requests without a single, optional-heavy configuration object.

// Implement a RequestBuilder class that allows method chaining for setting the HTTP method, URL, headers, query parameters, and a JSON body.
// The build() method must validate the configuration before returning the final immutable Request object. 
// It should throw an error if the method is POST but no body was provided, or if the URL has not been set.

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export class RequestBuilder {
  private url: string = '';
  private method: HttpMethod = 'GET';
  private headers: Record<string, string> = {};
  private queryParams: URLSearchParams = new URLSearchParams();
  private body: unknown = null;

  // Set target URL
  public setUrl(url: string): this {
    this.url = url;
    return this;
  }

  // Set HTTP Method
  public setMethod(method: HttpMethod): this {
    this.method = method;
    return this;
  }

  // Add a single header
  public addHeader(key: string, value: string): this {
    this.headers[key] = value;
    return this;
  }

  // Add multiple headers at once
  public addHeaders(headers: Record<string, string>): this {
    this.headers = { ...this.headers, ...headers };
    return this;
  }

  // Add a query parameter (e.g. ?search=dragon)
  public addQueryParam(key: string, value: string): this {
    this.queryParams.append(key, value);
    return this;
  }

  // Set JSON Body automatically sets Content-Type header
  public setJsonBody(body: unknown): this {
    this.body = JSON.stringify(body);
    this.addHeader('Content-Type', 'application/json');
    return this;
  }

  // Build full URL including query strings
  private buildUrl(): string {
    if (!this.url) {
      throw new Error("URL must be set before building request.");
    }
    const queryString = this.queryParams.toString();
    return queryString ? `${this.url}?${queryString}` : this.url;
  }

  // Build standard RequestInit object for fetch
  public build(): { url: string; config: RequestInit } {
    if (!this.url || this.url.trim() === '') {
      throw new Error('Validation Error: URL must be set before building request.');
    }

    // 2. Validate POST body requirement
    if (this.method === 'POST' && !this.body) {
      throw new Error('Validation Error: POST requests require a body.');
    }
    const fullUrl = this.buildUrl();
    const config: RequestInit = {
      method: this.method,
      headers: this.headers,
      body: this.body ? (this.body as BodyInit) : undefined,
    };

    return { url: fullUrl, config };
  }

  // Directly execute using native fetch
  public async send<T = unknown>(): Promise<T> {
    const { url, config } = this.build();
    const response = await fetch(url, config);

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}