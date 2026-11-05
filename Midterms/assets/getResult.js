var elParentResult = document.getElementById("parentBday");

const getBdayPhotos = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const fullDate = urlParams.get("date");

  const month = fullDate.split("-")[1];
  const day = fullDate.split("-")[2];
  const currentYear = new Date().getFullYear();

  elParentResult.innerHTML =
    `<div class="h1">Results for ` + fullDate + `</div>`;

  for (let yr = currentYear; yr >= 2021; yr--) {
    const dateString = `${yr}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const response = await fetch(
      "https://rovers.nebulum.one/api/v1/rovers/Perseverance/photos?earth_date=" +
        dateString,
    );
    const roverPhotos = await response.json();

    elParentResult.innerHTML +=
      `<div class="h1 pt-3">` + yr + `-` + month + `-` + day + `</div>`;
    for (let i = 0; i < roverPhotos.photos.length; i++) {
      const photos = roverPhotos.photos[i];

      elParentResult.innerHTML +=
        `
            <div class="col-3 pt-4">
            <a
              href="view.html?id=` +
        photos.id +
        `&date=` +
        photos.earth_date +
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

document.addEventListener("DOMContentLoaded", () => {
  getBdayPhotos();
});
