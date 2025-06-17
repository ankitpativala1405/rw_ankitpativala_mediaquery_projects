const sections = document.querySelectorAll("section, header");
const navLinks = document.querySelectorAll(".list-group-item");

function resetSVGStops(svg) {
  const stops = svg.querySelectorAll("stop");
  stops.forEach((stop, index) => {
    if (index === 0) {
      stop.setAttribute("stop-color", "#FF4308");
    } else {
      stop.setAttribute("stop-color", "#FB8500");
    }
  });
}

function setActiveSVGStops(svg) {
  const stops = svg.querySelectorAll("stop");
  stops.forEach((stop, index) => {
    if (index === 0) {
      stop.setAttribute("stop-color", "#fd8c5f");
    } else {
      stop.setAttribute("stop-color", "#FFFFFF");
    }
  });
}

function removeActiveClasses() {
  navLinks.forEach((link) => {
    link.classList.remove("active");

    const svg = link.querySelector("svg");
    if (svg) resetSVGStops(svg);
  });
}

function addActiveClass() {
  let scrollPosition =
    document.documentElement.scrollTop || document.body.scrollTop;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      removeActiveClasses();
      const currentId = section.getAttribute("id");
      const currentLink = document.querySelector(
        `.list-group-item[href="#${currentId}"]`
      );
      if (currentLink) {
        currentLink.classList.add("active");

        const svg = currentLink.querySelector("svg");
        if (svg) setActiveSVGStops(svg);
      }
    }
  });
}

window.addEventListener("scroll", addActiveClass);

function animatePercentage(element, targetPercent) {
  let current = 0;
  const interval = setInterval(() => {
    if (current < targetPercent) {
      current++;
      element.textContent = current + "%";
    } else {
      clearInterval(interval);
    }
  }, 100);
}

const skillsSection = document.querySelector("#skills");
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".skill-round-1 p").forEach((el) => {
          const finalPercent = parseInt(el.textContent);
          animatePercentage(el, finalPercent);
        });
        document.querySelectorAll(".skill-round-2 p").forEach((el) => {
          const finalPercent = parseInt(el.textContent);
          animatePercentage(el, finalPercent);
        });

        observer.unobserve(skillsSection);
      }
    });
  },
  { threshold: 0.3 }
);

observer.observe(skillsSection);
