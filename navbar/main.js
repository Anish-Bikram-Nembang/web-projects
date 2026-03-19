const hamburg = document.getElementById("hamburg");
const list = document.getElementById("hamburg-list");

hamburg.addEventListener("click", () => {
  list.classList.contains("hidden")
    ? list.classList.remove("hidden")
    : list.classList.add("hidden");
});

const heroText = document.getElementById("hero-text");
document.body.addEventListener("click", (e) => {
  const target = e.target.closest("[data-nav]");
  if (!target) return;
  const action = target.dataset.nav;
  switch (action) {
    case "home":
      heroText.textContent = "HOME";
      document.title = "Home";
      break;
    case "about":
      heroText.textContent = "ABOUT";
      document.title = "About";
      break;
    case "services":
      heroText.textContent = "SERVICES";
      document.title = "Services";
      break;
    case "signin":
      heroText.textContent = "SIGN IN";
      document.title = "Sign in";
      break;
  }
});
