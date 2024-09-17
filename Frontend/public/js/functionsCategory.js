const url = 'http://localhost:3000/api/category';

const loadCategories = async () => {
    try {
        const response = await fetch(url); // URL de tu API de categorías
        const categories = await response.json();

        const selectElement = document.getElementById('categorySelect');
        if (!selectElement) {
            console.error('Elemento con id "categorySelect" no encontrado');
            return;
        }

        // Verifica si hay categorías
        if (categories && categories.length > 0) {
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category._id; // O el campo que uses como ID de categoría
                option.textContent = category.name;
                selectElement.appendChild(option);
            });
        } else {
            alert('No hay categorías disponibles');
        }
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
        alert('Hubo un error al cargar las categorías.');
    }
};

document.addEventListener('DOMContentLoaded', loadCategories);

const listCategories = async () => {
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
        let list = Array.isArray(data) ? data : data.Categories || [];
        if (list.length === 0) {
            content.innerHTML = '<p>No hay productos para mostrar.</p>';
            return;
        }
        let responseHtml = '';
        list.forEach(function(Category) {
            responseHtml += `
                <tr>
                    <td>${Category._id}</td>
                    <td>${Category.name}</td>
                    <td>${Category.description}</td>
                    <td><a href='editCategory.html?id=${Category._id}&name=${Category.name}'>Edit</a></td>
                </tr>`;
        });
        responseHtml += '</table>';
        content.innerHTML = responseHtml;
    } catch (error) {
        console.error('Error al listar las categorias:', error);
        content.innerHTML = '<p>Error al cargar las categorias.</p>';
    }
}


const createCategory = async () => {
    // Obtener los valores de los campos del formulario
    const category = {
        name: document.getElementById('name').value || '',
        description: document.getElementById('description').value || ''
    };

    // Validar que todos los campos estén completos
    if (!category.name || !category.description) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(category),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        const json = await response.json();
        if (response.ok) {
            alert(json.msg || 'Categoria creada exitosamente');
            // Limpiar los campos del formulario
            ['name', 'description'].forEach(id => {
                document.getElementById(id).value = '';
            });
        } else {
            alert(`Error: ${json.msg || 'No se pudo crear la categoria'}`);
        }
    } catch (error) {
        console.error('Error al crear la categoria:', error);
        alert('Hubo un error al realizar la solicitud.');
    }
};

const editCategory = async () => {
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
        const category = await response.json();

        // Poblar los campos del formulario con los datos del producto
        document.getElementById('name').value = category.name || '';
        document.getElementById('description').value = category.description || '';
    
    } catch (error) {
        console.error('Error al obtener la categoria:', error);
        alert(`Hubo un error al obtener la categoria: ${error.message}`);
    }
};

const updateCategory = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get('id');

    if (!id) {
        alert('No se encontró la ID del producto.');
        return;
    }

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    if (!name || !description) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const category = { name, description };

    try {
        const response = await fetch(`${url}/${id}`, { 
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(category),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });

        const json = await response.json();

        if (response.ok) {
            alert(json.msg || 'Categoria actualizado exitosamente');
        } else {
            alert(`Error: ${json.msg || 'No se pudo actualizar la categoria'}`);
        }
    } catch (error) {
        console.error('Error al actualizar la categoria:', error);
        alert('Hubo un error al realizar la solicitud.');
    }
};
