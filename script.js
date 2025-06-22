document.addEventListener('DOMContentLoaded', () => {
    // Función para actualizar la hora y fecha
    function updateDateTime() {
        const now = new Date();

        // Hora
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        document.getElementById('time').textContent = now.toLocaleTimeString('es-AR', timeOptions);

        // Fecha
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('date').textContent = now.toLocaleDateString('es-AR', dateOptions);
    }

    // Actualiza la hora y fecha cada segundo
    setInterval(updateDateTime, 1000);
    // Llama la función una vez al cargar para mostrar la información inmediatamente
    updateDateTime();

    // Función para obtener la ubicación
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    document.getElementById('location').textContent = `Latitud: ${lat.toFixed(4)}, Longitud: ${lon.toFixed(4)}`;

                    // Opcional: Usar una API de geocodificación inversa para obtener el nombre de la ciudad
                    try {
                        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
                        const data = await response.json();
                        if (data.address && data.address.city) {
                            document.getElementById('location').textContent = `${data.address.city}, ${data.address.country}`;
                        } else if (data.address && data.address.town) {
                            document.getElementById('location').textContent = `${data.address.town}, ${data.address.country}`;
                        } else if (data.address && data.address.village) {
                            document.getElementById('location').textContent = `${data.address.village}, ${data.address.country}`;
                        } else {
                             document.getElementById('location').textContent = `Latitud: ${lat.toFixed(4)}, Longitud: ${lon.toFixed(4)} (Ciudad no encontrada)`;
                        }
                    } catch (error) {
                        console.error('Error al obtener la ciudad:', error);
                        document.getElementById('location').textContent = `Latitud: ${lat.toFixed(4)}, Longitud: ${lon.toFixed(4)} (Error al obtener la ciudad)`;
                    }
                },
                (error) => {
                    console.error('Error al obtener la ubicación:', error);
                    document.getElementById('location').textContent = 'Ubicación no disponible.';
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        } else {
            document.getElementById('location').textContent = 'La geolocalización no es compatible con tu navegador.';
        }
    }

    getLocation(); // Llama a la función para obtener la ubicación al cargar la página
});