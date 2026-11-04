var elParentLatest = document.getElementById("parentLatest");

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

function pageRedirect() {
  const dateInput = document.getElementById("bDayDate").value;
  if (!dateInput) {
    alert("Please select your birthday first!");
    return;
  }
  window.location.href = "result.html?date=" + dateInput;
}


