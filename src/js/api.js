const BACKEND_URL = 'https://foliumbackend-production.up.railway.app';

async function postData(endpoint, data) {
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  let responseData;
  try {
    responseData = await response.json();
  } catch {
    // fallback se não for JSON
    responseData = await response.text();
  }

  if (!response.ok) {
    // Se for objeto JSON com message, use message
    const errorMsg = responseData?.message || response.statusText || 'Erro desconhecido';
    throw new Error(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
  }

  return responseData.message || 'Sucesso';
}


export async function register(name, email, password, confipassword) {
  return postData('/api/auth/register', { name, email, password, confipassword });
}

export async function login(email, password, rememberMe) {
  return postData('/api/auth/login', { email, password, rememberMe });
}

export async function confirmCode(code) {
  return postData('/api/auth/confirm', { code });
}

export async function logout() {
  return postData('/api/auth/logout', {});
}
