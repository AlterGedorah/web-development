var elParentLatest = document.getElementById("parentLatest");
var inbDayDate = document.getElementById("bDayDate");
const rovers = ["Perseverance", "Curiosity"];

let roverDataCache = {};
let roverPages = {
  Perseverance: 1,
  Curiosity: 1,
};
const itemsPerPage = 12;

const renderSection = (rover) => {
  const photos = roverDataCache[rover] || [];
  const currentPage = roverPages[rover];

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPhotos = photos.slice(startIndex, endIndex);

  const hasMore = endIndex < photos.length;
  const hasPrev = currentPage > 1;

  const totalPages = Math.ceil(photos.length / itemsPerPage) || 1;

  let roverHTML =
    '<div class="rover-section mb-5" id="section-' +
    rover +
    '">' +
    '<p class="rover-text">Rover: ' +
    rover +
    "</p>" +
    '<p class="earth-date">Earth Date: ' +
    (photos[0] ? photos[0].earth_date : "N/A") +
    "</p>" +
    '<p class="sol">Sol: ' +
    (photos[0] ? photos[0].sol : "N/A") +
    "</p>" +
    '<div class="row pb-2">';

  if (paginatedPhotos.length === 0) {
    roverHTML +=
      '<div class="col-12"><p class="text-muted">No photos available for ' +
      rover +
      " on this page.</p></div>";
  } else {
    for (let j = 0; j < paginatedPhotos.length; j++) {
      roverHTML +=
        '<div class="col-3 pt-4">' +
        '<a href="view.html?id='+ paginatedPhotos[j].id +'" target="_blank" rel="noopener noreferrer>' +
        '<div class="card square-card">' +
        '<img src="' +
        paginatedPhotos[j].img_src +
        '" class="card-img" alt="' +
        paginatedPhotos[j].camera.name +
        '" loading="lazy" />' +
        '<div class="card-img-overlay">' +
        '<h5 class="card-title">' +
        paginatedPhotos[j].camera.name +
        "</h5>" +
        "</div>" +
        "</div>" +
        "</a>" +
        "</div>";
    }
  }

  roverHTML +=
    "</div>" +
    '<div class="d-flex justify-content-between align-items-center my-3 px-2">' +
    '<button class="btn btn-secondary btn-sm" onclick="changeRoverPage(\'' +
    rover +
    "', -1)\" " +
    (!hasPrev ? "disabled" : "") +
    ">Previous</button>" +
    '<span class="text-muted">Page ' +
    currentPage + ' of ' + totalPages + '</span>' +
    '<button class="btn btn-primary btn-sm" onclick="changeRoverPage(\'' +
    rover +
    "', 1)\" " +
    (!hasMore ? "disabled" : "") +
    ">Next</button>" +
    "</div>" +
    "</div>";

  return roverHTML;
};

const getLatestPhotos = async () => {
  let masterHTML = "";

  for (let i = 0; i < rovers.length; i++) {
    var rover = rovers[i];
    if (!roverDataCache[rover]) {
      const response = await fetch(
        "https://rovers.nebulum.one/api/v1/rovers/" + rover + "/latest_photos",
      );
      const roverPhotos = await response.json();
      roverDataCache[rover] = roverPhotos.latest_photos || [];
    }

    masterHTML += renderSection(rover);
  }

  elParentLatest.innerHTML = masterHTML;
};

window.changeRoverPage = (rover, direction) => {
  roverPages[rover] += direction;
  if (roverPages[rover] < 1) roverPages[rover] = 1;

  let masterHTML = "";
  for (let i = 0; i < rovers.length; i++) {
    masterHTML += renderSection(rovers[i]);
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
