const BACKEND_URL = 'https://seu-backend-railway.up.railway.app'; // coloque a URL real do Railway aqui

async function login(email, password, rememberMe) {
  try {
    const response = await fetch(`${BACKEND_URL}/login`, {
      method: 'POST',
      credentials: 'include', // para enviar/receber cookies de sessão
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, rememberMe }),
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(text || 'Erro no login');
    }

    return text; // ex: "Código de confirmação enviado para seu e-mail."
  } catch (error) {
    throw error;
  }
}

async function confirmCode(code) {
  try {
    const response = await fetch(`${BACKEND_URL}/confirm`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    const text = await response.text();

    if (!response.ok) {
      throw new Error(text || 'Código inválido');
    }

    return text; // ex: "Login confirmado! Bem-vindo, ..."
  } catch (error) {
    throw error;
  }
}

async function logout() {
  try {
    const response = await fetch(`${BACKEND_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Erro ao fazer logout');
    }

    return 'Logout realizado com sucesso.';
  } catch (error) {
    throw error;
  }
}

// Exemplo de uso com event listeners (você adapta para seu HTML)
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = e.target.email.value;
  const password = e.target.password.value;
  const rememberMe = e.target.rememberMe.checked;

  const messageDiv = document.getElementById('message');
  messageDiv.textContent = '';

  try {
    const msg = await login(email, password, rememberMe);
    messageDiv.style.color = 'green';
    messageDiv.textContent = msg;

    // Aqui você pode abrir o popup de confirmação do código
    document.getElementById('confirmPopup').style.display = 'flex';
  } catch (err) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = err.message;
  }
});

document.getElementById('confirmBtn').addEventListener('click', async () => {
  const code = document.getElementById('confirmCode').value;
  const popupMsg = document.getElementById('popupMessage');
  popupMsg.textContent = '';

  try {
    const msg = await confirmCode(code);
    popupMsg.style.color = 'green';
    popupMsg.textContent = msg;

    setTimeout(() => {
      window.location.href = '/home.html'; // ajuste conforme seu site
    }, 1500);
  } catch (err) {
    popupMsg.style.color = 'red';
    popupMsg.textContent = err.message;
  }
});

document.getElementById('logoutBtn')?.addEventListener('click', async () => {
  try {
    const msg = await logout();
    alert(msg);
    window.location.href = '/index.html'; // página de login
  } catch (err) {
    alert(err.message);
  }
});
