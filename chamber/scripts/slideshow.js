const slideshowContainer = document.querySelector("#slideshow");
const images = [
    "https://www.emscorporate.com/hubfs/chamber%20post%20for%20blog.jpg",
    "https://fellow.app/wp-content/uploads/2023/06/business-problems-to-solve.jpg",
    "https://images.homes.co.nz/resize/fill/900/490/ce/0/plain/https://s3-ap-southeast-2.amazonaws.com/homes-listing-images/15048634423182594443",
];

let index = 0;

function updateSlideshow() {
    slideshowContainer.innerHTML = `<img src="${images[index]}" alt="Gallery Image">`;
    index = (index + 1) % images.length;
}

setInterval(updateSlideshow, 3000);
updateSlideshow();

