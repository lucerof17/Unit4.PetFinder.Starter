// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const allPetsEndpoint = '/api/v1/pets';
    const petsByNameEndpoint = '/api/v1/pets/';
    const petsByOwnerEndpoint = '/api/v1/pets/owner';

    const fetchAndDisplayPets = (endpoint, heading = 'All Pets') => {
        fetch(endpoint)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Add this line to inspect the data received
                displayPets(data, heading);
            })
            .catch(error => console.error('Error fetching pets:', error));
    };

    const displayPets = (pets, heading) => {
        const outputDiv = document.createElement('div');
        outputDiv.classList.add('output');

        const headingElement = document.createElement('h2');
        headingElement.textContent = heading;
        outputDiv.appendChild(headingElement);

        const ulElement = document.createElement('ul');

        if (Array.isArray(pets)) {
            pets.forEach(pet => {
                const liElement = document.createElement('li');
                liElement.textContent = `${pet.name} (Owner: ${pet.owner})`;
                ulElement.appendChild(liElement);
            });
        } else if (typeof pets === 'object' && pets !== null) {
            // Handle a single pet object
            const liElement = document.createElement('li');
            liElement.textContent = `${pets.name} (Owner: ${pets.owner})`;
            ulElement.appendChild(liElement);
        } else {
            console.error('Invalid data format. Expected an array or a single pet object.');
        }

        outputDiv.appendChild(ulElement);

        document.body.appendChild(outputDiv);
    };

    fetchAndDisplayPets(allPetsEndpoint);
    fetchAndDisplayPets(petsByNameEndpoint + 'Fido', 'Pets by Name');
    fetchAndDisplayPets(petsByOwnerEndpoint + '?owner=John', 'Pets by Owner');
});
