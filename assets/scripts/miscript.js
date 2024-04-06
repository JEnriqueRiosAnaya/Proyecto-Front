// Funciones para la Api de Google
function getGeo() {
    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoOk, geoError)
    }
}
function geoOk(position) {
    console.log(position)
    //Llamammos a la funcion para dibujar el mapa
    showLatlong(position.coords.latitude, position.coords.longitude)
}
function geoError(error) {
    if (error.code == 1) {
        console.log("El usuario nego el permiso")
        alert("El usuario nego el permiso")
    } else if (error.code == 2) {
        console.log("No se puede recuperar la Ubicacion")
        alert("No se puede recuperar la Ubicacion")
    } else if (error.code == 3) {
        console.log("Tiempo de respuesta expirado")
        alert("Tiempo de respuesta expirado")
    } else {
        console.log("Error" + error.code)
        alert("Error" + error.code)
    }
}
function showLatlong(lat, long) {
    // Mostrar en pantalla mis coordenadas
    $("#direccion").html("latitud: " + 26.045342 + "longuitud: " + -98.321796);
    var geocoder = new google.maps.Geocoder(); // Esto servira para serializar las coordenadas para el street view
    var milocalizacion = new google.maps.LatLng(26.045342, -98.321796); // Esto convierte mis coordenadas en el formato para el mapa de Google
    console.log(geocoder);
    console.log(milocalizacion);

    // Generamos la direccion
    geocoder.geocode({ 'latLng': milocalizacion }, processGeocoder);
    //Dibujamos el mapa
    dibujaMapa(26.045342, -98.321796)
    $("#street").css("height", 300);
}
function processGeocoder(result, status) {
    console.log(result);
    console.log(status);

    if (status == google.maps.GeocoderStatus.OK) {
        console.log(result);
        if (result[0]) {
            var direccion = result[0].formatted_address;
            console.log(direccion);
            $("#direccion").html(direccion);
        } else {
            error("Google no retorno ningun resultado")
        }
    } else {
        error("Google no retorno ningun resultado")
    }
}
function dibujaMapa(lat, long) {
    //26.045342, -98.321796
    var coor = { Lat: 26.045342, Lng: -98.321796 };

    function localizacion(posicion) {
        if (lat == 0) {
            var coord = { Lat: position.coords.latitude, Lng: posicion.coords.longitude };
        } else {
            var coord = { Lat: lat, Lng: long };
        }

        var miscoordenadas = new google.maps.LatLng(coord.Lat, coord.Lng);
        var mapoptions = {
            zoom: 20,
            center: miscoordenadas,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }

        var map = new google.maps.Map(document.getElementById('mapa'), mapoptions);
        console.log(document.getElementById('mapa'))
        console.log(map)

        var marker = new google.maps.Marker({ position: miscoordenadas, title: "Mi Posición" });
        marker.setMap(map)
        $("#mapa").css("height", 350)

        var panorama = new google.maps.StreetViewPanorama(document.getElementById("street"),
            { position: miscoordenadas, pov: { heading: 90, pitch: 5 } });
        map.setStreetView(panorama)
    }

    if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(localizacion, Error)
    }
}