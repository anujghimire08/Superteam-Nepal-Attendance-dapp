document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("tbody");
  const backHomeEL = document.querySelector(".footer-btn");

  const records = JSON.parse(localStorage.getItem("studentAttendance")) || [];

  tbody.innerHTML = "";

  if (!records.length) {
    tbody.innerHTML = "<tr><td colspan='3'>No records yet</td></tr>";
  } else {
    records.forEach((r) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
       <td>${r.date}</td>
        <td>${r.tx}</td>
        <td>${r.status}</td>
      `;
      tbody.appendChild(tr);
    });
  }

  backHomeEL.addEventListener("click", () => {
    window.location = "home.html";
  });
});

document.getElementById("user").title =
  JSON.parse(localStorage.getItem("userInfo")).name || "unknown";
