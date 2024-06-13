// When ready the document, read the JSON from assets/data and render the data in the DOM
document.addEventListener('DOMContentLoaded', () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoibmljY29sb3NlZ2F0byIsImEiOiJjbHV3aTJoZjIwYng1MmtueXAzOWk0bjUyIn0.2MCPa0K5rXvNVX_DLSkYiw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/niccolosegato/clwstqose016k01pn8ei6hr6a', // style URL
        center: [44.8, 9.6], // starting position [lng, lat]
        zoom: 4 // starting zoom
    });

    fetch('assets/data/data.json')
    .then((response) => response.json())
    .then((data) => {
        const container = document.getElementById('places');
        console.log(data.places);
        for (let i = 0; i < data.places.length; i++) {
            const mainContent = document.createElement('div');
            mainContent.classList.add('place');

            if(data.places[i].image !== undefined) {
                const img = document.createElement('img');
                img.src = "assets/images/00-Grattacielo-Pirelli-Milano-1138x640.jpg";
                img.alt = "Milano";
                
                mainContent.appendChild(img);
            }

            const placeInfo = document.createElement('div');
            placeInfo.classList.add('place-info');

            const title = document.createElement('h3');
            title.textContent = data.places[i].title;

            const innerContent = document.createElement('div');
            innerContent.classList.add('place-ribbons');

            let section = document.createElement('p');
            section.textContent = data.places[i].section;
            section.style.backgroundColor = data.places[i].color;

            let city = document.createElement('p');
            city.textContent = data.places[i].city;

            let year = document.createElement('p');
            year.textContent = data.places[i].year;

            const description = document.createElement('p');
            description.classList.add('place-description');
            description.textContent = "In questo luogo: ";

            const events = document.createElement('ul');
            events.classList.add('events');
            for(let j = 0; j < data.places[i].events.length; j++) {
                const event = document.createElement('li');
                if(data.places[i].events[j].mostra !== null){
                    event.textContent = "\"" + data.places[i].events[j].mostra + "\" - " + data.places[i].events[j].year;
                }
                else{
                    event.textContent = "\"Mostra senza nome\" - " + data.places[i].events[j].year;
                }
                events.appendChild(event);
            }

            placeInfo.appendChild(title);
            innerContent.appendChild(section);
            innerContent.appendChild(city);
            innerContent.appendChild(year);
            mainContent.appendChild(placeInfo);
            mainContent.appendChild(innerContent);
            mainContent.appendChild(description);
            mainContent.appendChild(events);

            container.appendChild(mainContent);

            const marker1 = new mapboxgl.Marker({ color: data.places[i].color })
            .setLngLat([data.places[i].lng, data.places[i].lat])
            .addTo(map);
        }
    });
});