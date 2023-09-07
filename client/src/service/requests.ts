async function sendRequest(endpoint: string, options: RequestInit) {
  try {
    const response = await fetch(endpoint, options);    
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
  payload: any,
  options?: RequestInit,
) {
  const defaultOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    ...options,
  };

  return sendRequest(endpoint, defaultOptions);
}

export async function getRequest(endpoint: string, options?: RequestInit) {
  const defaultOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  return sendRequest(endpoint, defaultOptions);
}

export async function deleteRequest(endpoint: string, options?: RequestInit) {
  const defaultOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  return sendRequest(endpoint, defaultOptions);
}

export async function putRequest(endpoint: string, options?: RequestInit) {
  const defaultOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  };

  return sendRequest(endpoint, defaultOptions);
}
