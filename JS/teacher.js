const backHomeEL = document.querySelector(".footer-btn");
const attendanceList = document.querySelector(".attendance-list");
const studentList = document.getElementById("student-list");
const markAttendanceBtnEL = document.getElementById("mark-attendance-btn");

let attendanceInfo = JSON.parse(localStorage.getItem("attendance")) || [];

const defaultStds = [
  "Sushil Shrestha",
  "Priya Sharma",
  "Ramesh Karki",
  "Anuj Ghimire",
  "Anju Khadka",
  "Sabita Bhattarai",
  "Dipesh Gurung",
  "Sunita Basnet",
  "Binod Tamang",
  "Pooja Gurung",
  "Anil Thapa",
];

let raw = localStorage.getItem("students");
let studentLists = raw ? JSON.parse(raw) : defaultStds;

studentLists.sort();
// const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
// let sortedStudents = [];
// alphabet.forEach((letter) => {
//   const filteredList = RandomStudentsList.filter((name) =>
//     name.toUpperCase().startsWith(letter),
//   );
//   sortedStudents = [...sortedStudents, ...filteredList];
// });

localStorage.setItem("students", JSON.stringify(studentLists));

const space = document.createDocumentFragment();
studentLists.forEach((student) => {
  const option = document.createElement("option");
  option.value = student;
  option.textContent = student;
  space.appendChild(option);
});
studentList.appendChild(space);

function markAttendance(name, wallet, status) {
  if (!name) {
    alert("Please enter student name");
    return;
  }

  attendanceInfo.push({
    name: name,
    wallet: wallet,
    date: new Date().toLocaleDateString(),
    status: status,
  });

  localStorage.setItem("attendance", JSON.stringify(attendanceInfo));
  displayAttendance();
}

markAttendanceBtnEL.addEventListener("click", () => {
  const name = studentList.value;
  const status = document.querySelector(`input[name="status"]:checked`).value;

  markAttendance(name, localStorage.getItem("wallet"), status);
});

function displayAttendance() {
  attendanceList.innerHTML = "";
  const space = document.createDocumentFragment();

  attendanceInfo.forEach((info) => {
    const p = document.createElement("p");
    p.textContent = `${info.name} | ${info.status} | ${info.date}`;
    space.appendChild(p);
  });
  attendanceList.appendChild(space);
}

displayAttendance();

backHomeEL.addEventListener("click", () => {
  window.location = "home.html";
});
