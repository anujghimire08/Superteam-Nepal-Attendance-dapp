document.addEventListener("DOMContentLoaded", async () => {
  const backHomeEL = document.querySelector(".footer-btn");
  const attendanceList = document.querySelector(".attendance-list");
  const studentList = document.getElementById("student-list");
  const markAttendanceBtnEL = document.getElementById("mark-attendance-btn");

  const MEMO_PROGRAM = "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr";

  if (!window.solana) {
    alert("Install Phantom Wallet first!");
    return;
  }
  const wallet = window.solana;
  try {
    await wallet.connect();
  } catch {
    alert("Wallet connection rejected");
    return;
  }
  const teacherAddress = wallet.publicKey.toString();

  const connection = new solanaWeb3.Connection(
    solanaWeb3.clusterApiUrl("devnet"),
    "confirmed",
  );

  const students = [
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
  students.sort();
  studentList.innerHTML = "<option selected disabled>Select Student</option>";
  const frag = document.createDocumentFragment();
  students.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s;
    opt.textContent = s;
    frag.appendChild(opt);
  });
  studentList.appendChild(frag);

  function loadAttendance() {
    const records = JSON.parse(localStorage.getItem("studentAttendance")) || [];
    attendanceList.innerHTML = "";
    if (!records.length) {
      attendanceList.innerHTML = "No records yet";
      return;
    }
    records
      .slice()
      .reverse()
      .forEach((r) => {
        const p = document.createElement("p");
        p.textContent = `${r.name || "Unknown"} | ${r.status || "Unknown"} | ${r.date || "Unknown"}`;
        attendanceList.appendChild(p);
      });
  }

  loadAttendance();

  async function markAttendance(name, status) {
    const record = {
      name,
      status,
      date: new Date().toLocaleDateString(),
      teacher: teacherAddress,
    };
    const data = JSON.stringify(record);

    const tx = new solanaWeb3.Transaction();
    tx.add(
      new solanaWeb3.TransactionInstruction({
        keys: [],
        programId: new solanaWeb3.PublicKey(MEMO_PROGRAM),
        data: new TextEncoder().encode(data),
      }),
    );

    tx.feePayer = wallet.publicKey;
    tx.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

    markAttendanceBtnEL.disabled = true;
    try {
      const { signature } = await wallet.signAndSendTransaction(tx);
      await connection.confirmTransaction(signature);

      alert(
        `Attendance marked successfully!\nStudent: ${record.name}\nStatus: ${record.status}\nDate: ${record.date}\nTx: ${signature}`,
      );

      const p = document.createElement("p");
      p.textContent = `${record.name} | ${record.status} | ${record.date}`;
      if (attendanceList.textContent === "No records yet") {
        attendanceList.innerHTML = "";
      }
      attendanceList.prepend(p);

      let studentRecords =
        JSON.parse(localStorage.getItem("studentAttendance")) || [];
      studentRecords.push({
        name: record.name,
        status: record.status,
        date: record.date,
        tx: signature,
      });
      localStorage.setItem("studentAttendance", JSON.stringify(studentRecords));

      studentList.value = "Select Student";
      const selectedStatus = document.querySelector(
        'input[name="status"]:checked',
      );
      if (selectedStatus) selectedStatus.checked = false;
    } catch (err) {
      console.error(err);
      alert("Transaction failed");
    } finally {
      markAttendanceBtnEL.disabled = false;
    }
  }

  markAttendanceBtnEL.addEventListener("click", () => {
    const name = studentList.value;
    const statusEl = document.querySelector('input[name="status"]:checked');
    if (!name || !statusEl) return alert("Select student & status");
    markAttendance(name, statusEl.value);
  });

  backHomeEL.addEventListener("click", () => {
    window.location = "home.html";
  });
});

document.getElementById("sidebar-username").textContent =
  JSON.parse(localStorage.getItem("userInfo")).name || "unknown";
