const url = 'http://localhost:3000/api/products';

// Listar todos los productos

const listProducts = async () => {
    const content = document.getElementById('content');
    if (!content) {
        console.error('Elemento con id "content" no encontrado');
        return;
    }
    try {
        const response = await fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
        const data = await response.json();
        let list = Array.isArray(data) ? data : data.Products || [];
        if (list.length === 0) {
            content.innerHTML = '<p>No hay productos para mostrar.</p>';
            return;
        }
        let responseHtml = '';
        list.forEach(function(Product) {
            // Formatear el precio en formato de moneda
            const formattedPrice = Product.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' });
            responseHtml += `
                <tr>
                    <td>${Product._id}</td>
                    <td>${Product.name}</td>
                    <td>${formattedPrice}</td>
                    <td>${Product.stock}</td>
                    <td>${Product.category}</td>
                    <td><a href='editProduct.html?id=${Product._id}&name=${Product.name}'>Edit</a></td>
                </tr>`;
        });
        responseHtml += '</table>';
        content.innerHTML = responseHtml;
    } catch (error) {
        console.error('Error al listar los productos:', error);
        content.innerHTML = '<p>Error al cargar los productos.</p>';
    }
}


const createProduct = async () => {
    event.preventDefault();
    // Obtener los valores de los campos del formulario
    const product = {
        name: document.getElementById('name').value || '',
        description: document.getElementById('description').value || '',
        price: parseFloat(document.getElementById('price').value) || 0,
        stock: parseInt(document.getElementById('stock').value) || 0,
        category: document.getElementById('categorySelect').value || ''  // Obtener el ObjectId seleccionado
    };

    // Validar que todos los campos estén completos
    if (!product.name || !product.description || !product.price || !product.stock || !product.category) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    try {
        // const response = await fetch(url, {
        //     method: 'POST',
        //     mode: 'cors',
        //     body: JSON.stringify(product),
        //     headers: { "Content-type": "application/json; charset=UTF-8" }
        // });

        console.log(product)
        const json = await response.json();
        if (response.ok) {
            alert(json.msg || 'Producto creado exitosamente');
            // Limpiar los campos del formulario
            ['name', 'description', 'price', 'stock'].forEach(id => {
                document.getElementById(id).value = '';
            });
            document.getElementById('categorySelect').value = '';
        } else {
            alert(`Error: ${json.msg || 'No se pudo crear el producto'}`);
        }
    } catch (error) {
        console.error('Error al crear el producto:', error);
        alert('Hubo un error al realizar la solicitud.');
    }
};


// Obtener producto por el id
const editProduct = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    if (!id) {
        alert('No se encontró la ID del producto.');
        return;
    }

    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'GET',
            mode: 'cors',
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        // Verifica si la respuesta no es JSON
        if (!response.ok) {
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error(`Tipo de contenido inesperado: ${contentType}`);
            }
        }

        // Obtener el JSON de la respuesta
        const product = await response.json();

        // Poblar los campos del formulario con los datos del producto
        document.getElementById('name').value = product.name || '';
        document.getElementById('description').value = product.description || '';
        document.getElementById('price').value = product.price || '';
        document.getElementById('stock').value = product.stock || '';
        document.getElementById('categorySelect').value = product.category || '';
    } catch (error) {
        console.error('Error al obtener el producto:', error);
        alert(`Hubo un error al obtener el producto: ${error.message}`);
    }
};



// Actualizar producto

// Actualizar producto
const updateProduct = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    if (!id) {
        alert('No se encontró la ID del producto.');
        return;
    }

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const stock = document.getElementById('stock').value;
    const category = document.getElementById('categorySelect').value;

    if (!name || !description || !price || !stock || !category) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const product = { name, description, price, stock, category };

    try {
        const response = await fetch(`${url}/${id}`, { 
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(product),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        const json = await response.json();

        if (response.ok) {
            alert(json.msg || 'Producto actualizado exitosamente');
        } else {
            alert(`Error: ${json.msg || 'No se pudo actualizar el producto'}`);
        }
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        alert('Hubo un error al realizar la solicitud.');
    }
};

