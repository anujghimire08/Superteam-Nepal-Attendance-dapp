const connectBtn = document.getElementById("connectWalletBtn");
const walletText = document.getElementById("walletAddress");
connectBtn.addEventListener("click", async function () {
  if (!window.solana || !window.solana.isPhantom) {
    alert("Phantom wallet not installed!");
    return;
  }

  try {
    const response = await window.solana.connect();

    const address = response.publicKey.toString();

    walletText.innerText = "Connecting to Phantom...";

    setTimeout(() => {
      walletText.innerText = address;
    }, 1500);
  } catch (err) {
    console.error(err);
  }
});

document
  .getElementById("teacher-btn")
  .addEventListener("click", () => (window.location = "teacher.html"));

document
  .getElementById("student-btn")
  .addEventListener("click", () => (window.location = "student.html"));
