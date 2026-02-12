const connectBtn = document.getElementById("connectWalletBtn");
const walletText = document.getElementById("walletAddress");
const teacherBtn = document.getElementById("teacher-btn");
const studentBtn = document.getElementById("student-btn");

teacherBtn.disabled = true;
studentBtn.disabled = true;

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (!userInfo) {
  alert("Please login first!");
  window.location.href = "login.html";
}

connectBtn.addEventListener("click", async function () {
  if (!window.solana || !window.solana.isPhantom) {
    alert("Phantom wallet not installed!");
    return;
  }
  try {
    walletText.innerText = "Connecting to Phantom...";
    const response = await window.solana.connect();
    const address = response.publicKey.toString();

    setTimeout(() => {
      walletText.innerText = address.slice(0, 3) + "..." + address.slice(-4);
    }, 1000);

    localStorage.setItem("wallet", address);

    enableRole();
  } catch (err) {
    console.error(err);
    walletText.innerText = "Not Connected";
  }
});

function enableRole() {
  if (userInfo.role.toLowerCase() === "teacher") {
    teacherBtn.disabled = false;
  } else {
    studentBtn.disabled = false;
  }
}

teacherBtn.addEventListener("click", () => {
  window.location = "teacher.html";
});

studentBtn.addEventListener("click", () => {
  window.location = "student.html";
});
