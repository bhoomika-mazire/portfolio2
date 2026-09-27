const typingText = document.getElementById("typing-text");

const roles = [
    "a Computer Science Student",
    "an SQL Enthusiast",
    "an Aspiring Data Analyst"
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

function typeRole() {
    if (!typingText) return;

    const currentRole = roles[roleIndex];

    if (deleting) {
        characterIndex--;
    } else {
        characterIndex++;
    }

    typingText.textContent =
        currentRole.substring(0, characterIndex);

    let speed = deleting ? 45 : 85;

    if (!deleting &&
        characterIndex === currentRole.length) {
        deleting = true;
        speed = 1700;
    }

    if (deleting && characterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 350;
    }

    setTimeout(typeRole, speed);
}

if (typingText) {
    // The first role is already visible in the HTML.
    characterIndex = roles[0].length;
    deleting = true;
    setTimeout(typeRole, 1700);
}


// MOBILE MENU

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".nav-links");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
            menuButton.textContent = "☰";
            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );
        });
    });
}


// SCROLL REVEAL

const revealElements =
    document.querySelectorAll(".reveal");

if (
    "IntersectionObserver" in window &&
    !window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches
) {
    const observer = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.08
        }
    );

    revealElements.forEach(element => {
        observer.observe(element);
    });

    document.body.classList.add("js-ready");
}


// ACTIVE NAVIGATION

const sections =
    document.querySelectorAll("main section[id]");

const links =
    document.querySelectorAll(".nav-links a");

function updateNavigation() {
    let current = "home";

    sections.forEach(section => {
        if (
            window.scrollY >=
            section.offsetTop - 150
        ) {
            current = section.id;
        }
    });

    links.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") ===
                "#" + current
        );
    });
}

window.addEventListener(
    "scroll",
    updateNavigation,
    { passive: true }
);

updateNavigation();


// IMAGE ERROR CHECK

const girlImage =
    document.querySelector(".girl-image");

if (girlImage) {
    girlImage.addEventListener("error", () => {
        console.error(
            "Cannot load floating-girl.png. " +
            "Check the image filename and folder."
        );
    });
}
