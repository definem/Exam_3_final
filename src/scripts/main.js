// < !-- ---- Bismillah ---- -- >
// < !-- ---- Musyaa, u can do it, ut teacher believed u. look everything is gonna be okay :)) ---- -- >

let navbar = document.getElementById("navbar");

function toggleNavbar() {
  navbar.classList.toggle("active");
}

function shrink() {
  if (
    document.body.scrollTop > 100 ||
    document.documentElement.scrollTop > 100
  ) {
    navbar.classList.add("navbar-shrink");
  } else {
    navbar.classList.remove("navbar-shrink");
  }
}
window.addEventListener("scroll", function () {
  shrink();
});

function carouselGenerate(wrapperName, carouselName, firstCardWidthName) {
  const wrapper = document.querySelector(`.${wrapperName}`);
  const carousel = document.querySelector(`.${carouselName}`);
  const firstCardWidth = carousel.querySelector(
    `.${firstCardWidthName}`
  ).offsetWidth;
  const arrowBtns = document.querySelectorAll(`.${wrapperName} i`);
  const carouselChildrens = [...carousel.children];

  let isDragging = false,
    isAutoPlay = true,
    startX,
    startScrollLeft,
    timeoutId;

  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

  carouselChildrens
    .slice(-cardPerView)
    .reverse()
    .forEach((card) => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

  carouselChildrens.slice(0, cardPerView).forEach((card) => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  carousel.classList.add("no-transition");
  carousel.scrollLeft = carousel.offsetWidth;
  carousel.classList.remove("no-transition");

  arrowBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      carousel.scrollLeft +=
        btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
  });

  const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    if (!isDragging) return;

    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  const infiniteScroll = () => {
    if (carousel.scrollLeft === 0) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - 2 * carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    } else if (
      Math.ceil(carousel.scrollLeft) ===
      carousel.scrollWidth - carousel.offsetWidth
    ) {
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
  };

  const autoPlay = () => {
    if (window.innerWidth < 800 || !isAutoPlay) return;

    timeoutId = setTimeout(() => (carousel.scrollLeft += firstCardWidth), 2500);
  };
  autoPlay();

  carousel.addEventListener("mousedown", dragStart);
  carousel.addEventListener("mousemove", dragging);
  document.addEventListener("mouseup", dragStop);
  carousel.addEventListener("scroll", infiniteScroll);
  wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  wrapper.addEventListener("mouseleave", autoPlay);

  let block = document.getElementById("wrap-text");
  let active = false;
  function blockShow() {
    if (active) {
      block.style.display = "none";
      active = false;
    } else {
      block.style.display = "block";
      active = true;
    }
  }
}
carouselGenerate(
  "wrapper-speciality",
  "carousel-speciality",
  "card-speciality"
);
carouselGenerate("wrapper-report", "carousel-report", "card-report");

function closePopup(id) {
  let popup = document.getElementById(id);
  popup.style.display = "none";
}
function openPopup(id) {
  let popup = document.getElementById(id);
  popup.style.display = "flex";
}

let popupForm = document.getElementById("popup-form");
popupForm.onsubmit = (e) => {
  e.preventDefault();
  closePopup("popup");
  openPopup("popup-success");
};
