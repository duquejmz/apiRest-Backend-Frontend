document.getElementById('productsCard').addEventListener('click', () => {
    window.location.href = '/Frontend/views/Compras/listProduct.html'; // Redirige a la vista de productos
});

document.getElementById('providersCard').addEventListener('click', () => {
    window.location.href = '/proveedores'; // Redirige a la vista de proveedores
});

document.getElementById('categoriesCard').addEventListener('click', () => {
    window.location.href = '/Frontend/views/Servicios/listCategory.html'; // Redirige a la vista de categorías
});

document.getElementById('agendasCard').addEventListener('click', () => {
    window.location.href = '/agendas'; // Redirige a la vista de agendas
});

document.getElementById('logout').addEventListener('click', () => {
    // Lógica para cerrar sesión
    alert('Sesión cerrada');
    window.location.href = '/Frontend/views/login.html'; // Redirigir al login
});
