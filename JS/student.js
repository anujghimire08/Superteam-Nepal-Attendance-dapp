let attendanceInfo = JSON.parse(localStorage.getItem("attendance")) || [];

const backHomeEL = document.querySelector(".footer-btn");
const tbody = document.querySelector("#tbody");

function displayAttendance() {
  tbody.innerHTML = "";
  const space = document.createDocumentFragment();

  attendanceInfo.forEach((info) => {
    const tr = document.createElement("tr");

    Object.values(info).forEach((val) => {
      const td = document.createElement("td");
      td.textContent = val;
      tr.appendChild(td);
    });

    space.appendChild(tr);
  });

  tbody.appendChild(space);
}

displayAttendance();

backHomeEL.addEventListener("click", () => {
  window.location = "index.html";
});
