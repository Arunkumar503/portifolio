document.addEventListener("DOMContentLoaded", () => {

    /* ================= AOS ================= */
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100
        });
    }

    /* ================= NAVBAR ================= */
    const navbar = document.getElementById("mainNav");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("scrolled", window.scrollY > 50);

            let current = "";
            sections.forEach(section => {
                if (window.scrollY >= section.offsetTop - 60) {
                    current = section.id;
                }
            });

            navLinks.forEach(link => {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href")?.slice(1) === current
                );
            });
        });
    }

    /* ================= SMOOTH SCROLL ================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute("href"));
            target?.scrollIntoView({ behavior: "smooth" });

            const navbarCollapse = document.getElementById("navbarNav");
            navbarCollapse?.classList.remove("show");
        });
    });

    /* ================= TYPED JS ================= */
    if (typeof Typed !== "undefined" && document.querySelector(".typed-text")) {
        new Typed(".typed-text", {
            strings: ["Full Stack Developer", "Problem Solver", "Tech Enthusiast"],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    /* ================= SCROLL TO TOP ================= */
    const scrollToTopBtn = document.getElementById("scrollToTop");

    if (scrollToTopBtn) {
        window.addEventListener("scroll", () => {
            scrollToTopBtn.classList.toggle("visible", window.scrollY > 300);
        });

        scrollToTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ================= DARK MODE ================= */
    const darkModeToggle = document.getElementById("darkModeToggle");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (darkModeToggle) {
        if (
            localStorage.getItem("theme") === "dark" ||
            (!localStorage.getItem("theme") && prefersDark)
        ) {
            document.documentElement.setAttribute("data-theme", "dark");
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        darkModeToggle.addEventListener("click", () => {
            const isDark = document.documentElement.getAttribute("data-theme") === "dark";
            document.documentElement.setAttribute("data-theme", isDark ? "light" : "dark");
            darkModeToggle.innerHTML = isDark
                ? '<i class="fas fa-moon"></i>'
                : '<i class="fas fa-sun"></i>';
            localStorage.setItem("theme", isDark ? "light" : "dark");
        });
    }

    /* ================= CONTACT FORM ================= */
    const contactForm = document.querySelector(".contact-form");

    contactForm?.addEventListener("submit", async e => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        if (!submitBtn) return;

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            showNotification("Message sent successfully!", "success");
            contactForm.reset();
        } catch {
            showNotification("Failed to send message.", "error");
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = "Send Message";
        }
    });

    /* ================= PROJECT IMAGES ================= */
    document.querySelectorAll(".project-img img").forEach(img => {
        img.addEventListener("load", () => img.classList.add("loaded"));
    });

    /* ================= EXPERIENCE CARDS ================= */
    document.querySelectorAll(".experience-card").forEach(card => {
        card.addEventListener("mousemove", e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
            card.classList.add("active");
        });

        card.addEventListener("mouseleave", () => {
            card.classList.remove("active");
        });
    });

});

/* ================= NOTIFICATION ================= */
function showNotification(message, type = "success") {
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === "success" ? "fa-check-circle" : "fa-exclamation-circle"}"></i>
        <span>${message}</span>
    `;

    document.body.appendChild(notification);
    setTimeout(() => notification.classList.add("show"), 100);

    setTimeout(() => {
        notification.classList.remove("show");
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
