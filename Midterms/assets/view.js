var elParentView = document.getElementById("parentView");

var elName = document.getElementById("name");
var elFullName = document.getElementById("fullName");
var elImage = document.getElementById("image");
var elEarthDate = document.getElementById("earthDate");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");
const date = urlParams.get("date");


const getPhotoById = async () => {

    elName.innerHTML = "Loading " + id;
    elImage.src = "";
    elFullName.innerHTML = "";
    elEarthDate.innerHTML = "";

    const response = await fetch(
      "https://rovers.nebulum.one/api/v1/photos/" + id,
    );
    const roverPhotos = await response.json();

    elName.innerHTML = roverPhotos.photo.camera.name;
    elImage.src = roverPhotos.photo.img_src;
    elFullName.innerHTML = roverPhotos.photo.camera.full_name;
    elEarthDate.innerHTML = roverPhotos.photo.earth_date;
    console.log(roverPhotos.photo.camera.name);
}
getPhotoById();