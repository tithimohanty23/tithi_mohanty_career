document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const button = document.getElementById("menuButton");
  const links = document.getElementById("navLinks");
  const anchors = [...links.querySelectorAll("a")];
  const sections = [...document.querySelectorAll("main section[id]")];

  const closeMenu = () => {
    links.classList.remove("open");
    button.classList.remove("open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Open navigation");
    document.body.style.overflow = "";
  };

  button.addEventListener("click", () => {
    const open = !links.classList.contains("open");
    links.classList.toggle("open", open);
    button.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    document.body.style.overflow = open ? "hidden" : "";
  });

  anchors.forEach((anchor) => anchor.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const onScroll = () => {
    header.classList.toggle("scrolled", window.scrollY > 12);
    const position = window.scrollY + 180;
    let activeId = "";
    sections.forEach((section) => {
      if (position >= section.offsetTop && position < section.offsetTop + section.offsetHeight) activeId = section.id;
    });
    anchors.forEach((anchor) => anchor.classList.toggle("active", anchor.getAttribute("href") === `#${activeId}`));
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -36px" });

  document.querySelectorAll(".reveal:not(.is-visible)").forEach((element) => observer.observe(element));
  document.getElementById("year").textContent = new Date().getFullYear();
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
});
