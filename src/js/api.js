const BACKEND_URL = 'https://foliumbackend-production.up.railway.app';

async function postData(endpoint, data) {
  const response = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: 'POST',
    credentials: 'include', // se precisar cookies/session
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  const text = await response.text();
  if (!response.ok) throw new Error(text);
  return text;
}

export async function login(email, password, rememberMe) {
  return postData('/login', { email, password, rememberMe });
}

export async function confirmCode(code) {
  return postData('/login/confirm', { code });
}

export async function logout() {
  return postData('/logout', {});
}

// **Aqui a nova função register**
export async function register(name, email, password, confipassword) {
  return postData('/register', { name, email, password, confipassword });
}
