class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

class Repository {
    constructor() {
        this.activities = [];
    }

    getAllActivities() {
        return this.activities;
    }

    createActivity(id, title, description, imgUrl) {
        const activity = new Activity(id, title, description, imgUrl);
        this.activities.push(activity);
    }

    deleteActivity(id) {
        this.activities = this.activities.filter(activity => activity.id !== id);
    }
}

const activityRepository = new Repository();

function displayActivities() {
    const activitiesContainer = document.getElementById('activitiesContainer');
    activitiesContainer.innerHTML = '';

    activityRepository.getAllActivities().forEach(activity => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <h3>${activity.title}</h3>
            <p>${activity.description}</p>
            <img src="${activity.imgUrl}" alt="${activity.title}" style="max-width: 100%;">
            <button onclick="deleteActivity(${activity.id})">Eliminar</button>
        `;
        activitiesContainer.appendChild(card);
    });
}

function createActivity() {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const imgUrl = document.getElementById('imgUrl').value.trim();

    if (title === '' || description === '' || imgUrl === '') {
        alert('Por favor, completa todos los campos.');
        return;
    }
    // Validar que la URL tenga una extensión de imagen válida
    if (!esExtensionDeImagenValida(imgUrl)) {
        alert('La URL proporcionada no es una imagen válida.');
        return;
    }
    const id = Date.now();

activityRepository.createActivity(id, title, description, imgUrl);

    displayActivities();

    document.getElementById('activityForm').reset();
}
function esExtensionDeImagenValida(url) {
    // Lista de extensiones de imagen válidas
    const extensionesValidas = ['.jpg', '.jpeg', '.png', '.gif'];

    // Obtener la extensión del archivo desde la URL
    const extension = url.slice(((url.lastIndexOf(".") - 1) >>> 0) + 2);

    // Verificar si la extensión está en la lista de extensiones válidas
    return extensionesValidas.includes(extension.toLowerCase());
}

function deleteActivity(id) {
    activityRepository.deleteActivity(id);
    displayActivities();
}

displayActivities();