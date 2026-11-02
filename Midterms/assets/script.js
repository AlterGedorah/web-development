var elParentLatest = document.getElementById("parentLatest");
var elParentResult = document.getElementById("parentBday");
var inbDayDate = document.getElementById("bDayDate");
const rovers = ["Perseverance", "Curiosity"];

const getLatestPhotos = async () => {
  let masterHTML = "";
  for (let i = 0; i < rovers.length; i++) {
    var rover = rovers[i];
    const response = await fetch(
      "https://rovers.nebulum.one/api/v1/rovers/" + rover + "/latest_photos",
    );
    const roverPhotos = await response.json();
    console.log(roverPhotos);
    let roverHTML =
      `
    <p class="rover-text">Rover: ` +
      rover +
      `</p>
    <p class="earth-date">Earth Date: ` +
      roverPhotos.latest_photos[0].earth_date +
      `</p>
    <p class="sol">Sol: ` +
      roverPhotos.latest_photos[0].sol +
      `</p>
    <div class="row pb-2">`;

    for (let i = 0; i < 12; i++) {
      roverHTML +=
        `<div class="col-3 pt-4">
            <a
              href="` +
        roverPhotos.latest_photos[i].img_src +
        `"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="card square-card">
                <img
                  src="` +
        roverPhotos.latest_photos[i].img_src +
        `"
                  class="card-img"
                  alt="` +
        roverPhotos.latest_photos[i].camera.name +
        `"
                  loading="lazy"
                />

                <div class="card-img-overlay">
                  <h5 class="card-title">` +
        roverPhotos.latest_photos[i].camera.name +
        `</h5>
                </div>
              </div>
            </a>
          </div>`;
    }
    roverHTML += `</div>`;
    masterHTML += roverHTML;
  }
  elParentLatest.innerHTML = masterHTML;
};
getLatestPhotos();

const getBdayPhotos = async () => {
  var date = inbDayDate.value;
  var month = date.split("-")[1];
  var day = date.split("-")[2];
  const currentYear = new Date().getFullYear();
  elParentResult.innerHTML = `
  <div class="h1">Results</div>
  
  <div class=row>`;

  for (let yr = currentYear; yr >= 2012; yr--) {
    const dateString = `${yr}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

    const response = await fetch(
      "https://rovers.nebulum.one/api/v1/rovers/Curiosity/photos?earth_date=" +
        dateString,
    );
    const roverPhotos = await response.json();
    console.log(dateString);
    console.log(roverPhotos);

    for (let i = 0; i < roverPhotos.photos.length; i++) {
      const photos = roverPhotos.photos[i];
    //   if (photos && photos.length > 0) {
        elParentResult.innerHTML +=
          `
            <div class="col-3 pt-4">
            <a
              href="` +
          photos.img_src +
          `"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div class="card square-card">
                <img
                  src="` +
          photos.img_src +
          `"
                  class="card-img"
                  alt="` +
          photos.camera.name +
          `"
                  loading="lazy"
                />

                <div class="card-img-overlay">
                  <h5 class="card-title">` +
          photos.camera.name +
          `</h5>
                </div>
              </div>
            </a>
          </div>`;
    }
    
  }
};
