const connectBtn = document.getElementById("connectWalletBtn");
const walletText = document.getElementById("walletAddress");
const teacherBtn = document.getElementById("teacher-btn");
const studentBtn = document.getElementById("student-btn");

teacherBtn.disabled = true;
studentBtn.disabled = true;

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
      walletText.innerText = "Connected!";
      //FOR VIEWER TO CHECK WALLET ADDRESS
      // walletText.innerText = "Connected to" + formatAddress(address);
    }, 1500);
    enableRole();
    localStorage.setItem("wallet", address);
  } catch (err) {
    console.error(err);
    walletText.innerText = "Not Connected";
  }
});

//FOR VIEWER TO CHECK WALLET ADDRESS
// function formatAddress(address) {
//   return address.slice(0, 4) + "..." + address.slice(-14);
// }

function enableRole() {
  const role = JSON.parse(localStorage.getItem("userInfo")).role;
  if (!role) return;

  if (role.toLowerCase() === "teacher") {
    document.getElementById("teacher-btn").disabled = false;
  } else {
    document.getElementById("student-btn").disabled = false;
  }
}

teacherBtn.addEventListener("click", () => {
  window.location = "teacher.html";
});

studentBtn.addEventListener("click", () => {
  window.location = "student.html";
});
