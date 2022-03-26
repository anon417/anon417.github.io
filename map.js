function showData(dist) {
    document.getElementById('district').innerText = dist.District;
    document.getElementById('unemployment').innerText = dist.Unemployment;
    document.getElementById('annual').innerText = dist.Annual_Income;
    document.getElementById('unmet').innerText = dist.Unmet_Medical_Care;
    document.getElementById('uninsured').innerText = dist.Uninsured;
    document.getElementById('avoid').innerText = dist.Avoidable_Adult_Hosp;

};
async function initialize(){
    /*const data = new File("data.csv");
    const reader = new FileReader();
    reader.readAsText(data);
    debug.log(reader);*/

    let response = await fetch('http://localhost:4000/');
    let data = await response.json();

    var mapOptions = {
        center: new google.maps.LatLng(40.8783912,-73.8933324),
        zoom: 10,
        rotateControl: false,
        scaleControl: false,
        mapTypeControl: false,
        streetViewControl: false,

    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    data.map((district) => { 
        const marker = { lat: parseFloat(district.Latitude), lng: parseFloat(district.Longitude) };        

        const pp = new google.maps.Marker({
            position: marker,
            map: map
        });
        pp.addListener("click", () => {
            map.setCenter(pp.getPosition());
            map.setZoom(12);
            showData(district);
        }
    )});



    const newYork = { lat: 40.7178149, lng: -74.0160309};
    const NYmarker = new google.maps.Marker({
        position: newYork,
        map: map
    });

    NYmarker.addListener("click", () => {
        map.setCenter(NYmarker.getPosition());
        map.setZoom(12);
        showData(NYmarker.getPosition());
    });
}