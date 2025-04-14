export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const handleApiError = (error: any): never => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new ApiError(
      error.response.data?.errorDescription || 'API Error',
      error.response.status,
      error.response.data
    )
  } else if (error.request) {
    // The request was made but no response was received
    throw new ApiError('No response from server')
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new ApiError(error.message || 'Unknown error occurred')
  }
} 