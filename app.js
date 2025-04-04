// Handle scroll animations
const sections = document.querySelectorAll("section");
const options = {
  threshold: 0.3,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");

      // Animate stats when they come into view
      if (entry.target.id === "market") {
        animateStats();
      }
    }
  });
}, options);

sections.forEach((section) => {
  section.classList.add("opacity-0", "transition-opacity", "duration-1000");
  observer.observe(section);
});

// Add smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Animate statistics
function animateStats() {
  const stats = document.querySelectorAll(".stat-number");
  stats.forEach((stat) => {
    const value = stat.innerText;
    stat.innerText = "0";

    // Simple animation for numbers
    if (value.includes("$")) {
      const targetValue = parseInt(value.replace(/[\$\+B]/g, ""));
      let currentValue = 0;
      const increment = targetValue / 30;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          clearInterval(timer);
          stat.innerText = value;
        } else {
          stat.innerText = `$${Math.round(currentValue)}B+`;
        }
      }, 50);
    } else if (value.includes("%")) {
      const targetValue = parseInt(value.replace("%", ""));
      let currentValue = 0;
      const increment = targetValue / 30;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
          clearInterval(timer);
          stat.innerText = value;
        } else {
          stat.innerText = `${Math.round(currentValue)}%`;
        }
      }, 50);
    }
  });
}

// Add parallax effect to hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector("section:first-of-type");
  const speed = 0.5;

  hero.style.transform = `translateY(${scrolled * speed}px)`;
});

// Add hover effect to feature cards
document.querySelectorAll(".feature-card").forEach((card) => {
  card.addEventListener("mouseenter", () => {
    card.style.transform = "translateY(-10px)";
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });
});
