// When ready the document, read the JSON from assets/data and render the data in the DOM
document.addEventListener('DOMContentLoaded', () => {

    mapboxgl.accessToken = 'pk.eyJ1IjoibmljY29sb3NlZ2F0byIsImEiOiJjbHV3aTJoZjIwYng1MmtueXAzOWk0bjUyIn0.2MCPa0K5rXvNVX_DLSkYiw';
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/niccolosegato/clwstqose016k01pn8ei6hr6a', // style URL
        center: [9.5, 45.2], // starting position [lng, lat]
        zoom: 6 // starting zoom
    });

    fetch('assets/data/data.json')
    .then((response) => response.json())
    .then((data) => {
        const container = document.getElementById('places');
        
        for (let i = 0; i < data.places.length; i++) {
            const mainContent = document.createElement('div');
            mainContent.classList.add('place');
            mainContent.id = "place-" + i;

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
            .setPopup(new mapboxgl.Popup().setHTML('<h3>' + data.places[i].title + '</h3>'))
            .addTo(map);
            
            marker1.getElement().dataset.id = data.places[i].id;

            marker1.getElement().addEventListener('click', () => {
                const place = document.getElementById('place-' + i);
                // Scroll to the place + 300px
                window.scrollTo({
                    top: place.offsetTop - 300,
                    behavior: 'smooth'
                });

                // Apply a border for 3 seconds to the place
                place.style.border = '2px solid white';
                setTimeout(() => {
                    place.style.transition = 'border 1s';
                    place.style.border = 'none';
                }, 3000);
            });
            marker1.getElement().id = 'marker-' + i;
            marker1.getElement().style.cursor = 'pointer';

            mainContent.addEventListener('click', () => {
                map.flyTo({ center: [data.places[i].lng, data.places[i].lat], zoom: 10 });
                // Simulate click on the marker
                document.getElementById('marker-' + i).click();
            });
        }
    });
});