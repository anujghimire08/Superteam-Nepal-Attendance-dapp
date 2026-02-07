let attendanceInfo = JSON.parse(localStorage.getItem("attendance")) || [];

const studentNameEL = document.querySelector("#wallet-address");
const attendanceOptionsEL = document.querySelector("#attendance-option");
const markAttendanceBtnEL = document.querySelector("#mark-attendance-btn");
const backHomeEL = document.querySelector(".footer-btn");
const attendanceList = document.querySelector(".attendance-list");

function markAttendance(name, status) {
  if (!name) {
    alert("Please enter student name");
    return;
  }

  attendanceInfo.push({
    name: name,
    date: new Date().toLocaleDateString(),
    status: status,
  });

  localStorage.setItem("attendance", JSON.stringify(attendanceInfo));
  displayAttendance();
}

markAttendanceBtnEL.addEventListener("click", () => {
  const name = studentNameEL.value;
  const status = attendanceOptionsEL.value;
  markAttendance(name, status);
  studentNameEL.value = "";
});

function displayAttendance() {
  attendanceList.innerHTML = "";
  const space = document.createDocumentFragment();

  attendanceInfo.forEach((info) => {
    const p = document.createElement("p");
    p.textContent = `${info.name} | ${info.date} | ${info.status}`;
    space.appendChild(p);
  });

  attendanceList.appendChild(space);
}

displayAttendance();

backHomeEL.addEventListener("click", () => {
  window.location = "index.html";
});
