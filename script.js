
// TYPING ANIMATION

const typing = document.getElementById("typing");

const roles = [
    "Aspiring Data Analyst",
    "SQL Enthusiast",
    "Python Learner",
    "Computer Science Student"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeText() {
    const currentRole = roles[roleIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typing.textContent =
        currentRole.substring(0, charIndex);

    let delay = deleting ? 55 : 100;

    if (!deleting &&
        charIndex === currentRole.length) {
        deleting = true;
        delay = 1600;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 400;
    }

    setTimeout(typeText, delay);
}

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (typing) {
    if (reducedMotion) {
        typing.textContent = roles[0];
    } else {
        typeText();
    }
}


// SCROLL REVEAL

const revealElements =
    document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    revealElements.forEach((element) => {
        observer.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add("visible");
    });
}


// SCROLL PROGRESS BAR

const progressBar =
    document.getElementById("progressBar");

function updateProgress() {
    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = pageHeight > 0
        ? (scrollTop / pageHeight) * 100
        : 0;

    if (progressBar) {
        progressBar.style.width = progress + "%";
    }
}

window.addEventListener(
    "scroll",
    updateProgress,
    { passive: true }
);

updateProgress();


// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuBtn.textContent = isOpen ? "✕" : "☰";
});

document.querySelectorAll(".nav-links a")
    .forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuBtn.setAttribute(
                "aria-expanded",
                "false"
            );
            menuBtn.textContent = "☰";
        });
    });


// LIGHT AND DARK THEME

const themeBtn = document.getElementById("themeBtn");

function updateThemeButton() {
    const isLight =
        document.body.classList.contains("light");

    themeBtn.textContent = isLight ? "☾" : "☀";

    themeBtn.setAttribute(
        "aria-label",
        isLight
            ? "Switch to dark mode"
            : "Switch to light mode"
    );
}

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("light");
    updateThemeButton();
});

updateThemeButton();


// CURRENT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();