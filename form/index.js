const form = document.getElementById("input-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const checked = formData.get("checkbox") !== null;

  const response = await fetch("/adduser", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({
      email,
      password,
      checked,
    }),
  });
  if (!response.ok) {
    alert("Data save failed");
  }
});
