async function sendRequest(endpoint: string, options: RequestInit) {
  try {
    const token = localStorage.getItem('jwtToken');
    
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await fetch(endpoint, { ...options, headers });

    if (!response.ok) {
      throw new Error('Request failed');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function postRequest(
  endpoint: string,
  payload?: any,
  options?: RequestInit,
) {
  const defaultOptions = {
    method: 'POST',
    body: JSON.stringify(payload),
    ...options,
  };

  return sendRequest(endpoint, defaultOptions);
}

export async function getRequest(endpoint: string, options?: RequestInit) {
  const defaultOptions = {
    method: 'GET',
    ...options,
  };

  return sendRequest(endpoint, defaultOptions);
}

export async function deleteRequest(endpoint: string, options?: RequestInit) {
  const defaultOptions = {
    method: 'DELETE',
    ...options,
  };

  return sendRequest(endpoint, defaultOptions);
}

export async function putRequest(endpoint: string, options?: RequestInit) {
  const defaultOptions = {
    method: 'PUT',
    ...options,
  };

  return sendRequest(endpoint, defaultOptions);
}
