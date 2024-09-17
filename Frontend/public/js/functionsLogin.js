const url = 'http://localhost:3000/login';


const handleLogin = async (event) => {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    const email = document.getElementById('email').value || '';
    const password = document.getElementById('password').value || '';

    // Validar que los campos no estén vacíos
    if (!email || !password) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    try {
        // Realizar la solicitud de autenticación
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        // Manejo de la respuesta del servidor
        if (response.ok) {
            alert(data.msg || 'Login exitoso');
            window.location.href = '/Frontend/views/dashboard.html';
        } else {
            alert(`Error: ${data.msg || 'Error de autenticación'}`);
        }
    } catch (error) {
        // Capturar y manejar cualquier error en la solicitud
        console.error('Error en la solicitud de autenticación:', error);
        alert('Hubo un error al realizar la solicitud.');
    }
};

// Asignar la función al evento 'submit' del formulario
document.getElementById('loginForm').addEventListener('submit', handleLogin);
