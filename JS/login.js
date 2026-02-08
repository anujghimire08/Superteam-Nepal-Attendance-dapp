const form = document.querySelector("form");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("user-name").value.trim();


  const role = document.querySelector('input[name="role"]:checked').value;

  const userInfo = {
    name: name,
    role: role,
  };

  localStorage.setItem("userInfo", JSON.stringify(userInfo));

  window.location.href = "home.html";
});
