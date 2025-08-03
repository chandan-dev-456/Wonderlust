const mapDiv = document.getElementById("map");

if (mapDiv) {
  const location = mapDiv.dataset.location;

  fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
    .then(res => res.json())
    .then(data => {
      if (data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);

        const map = L.map("map").setView([lat, lon], 13);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors"
        }).addTo(map);

        L.marker([lat, lon]).addTo(map).bindPopup(location).openPopup();
      } else {
        alert("Location not found");
      }
    });
}
