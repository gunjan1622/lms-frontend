const BASE_URL = "https://lms-backend.onrender.com/api"; // change to your hosted backend URL

async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(\`\${BASE_URL}/auth/login\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();
  localStorage.setItem("token", data.token);
  alert("Logged in");
  fetchMentors();
}

async function register() {
  const name = document.getElementById("regName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const role = document.getElementById("regRole").value;

  const res = await fetch(\`\${BASE_URL}/auth/register\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password, role })
  });

  const data = await res.json();
  alert("Registered");
}

async function fetchMentors() {
  const res = await fetch(\`\${BASE_URL}/mentor/all\`);
  const mentors = await res.json();
  const list = document.getElementById("mentorList");
  list.innerHTML = "";

  mentors.forEach(mentor => {
    const li = document.createElement("li");
    li.textContent = mentor.name + " (" + mentor.email + ")";
    const btn = document.createElement("button");
    btn.textContent = "Request";
    btn.onclick = () => requestMentor(mentor.id);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

async function requestMentor(mentorId) {
  const token = localStorage.getItem("token");
  const res = await fetch(\`\${BASE_URL}/mentor/request\`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: \`Bearer \${token}\`
    },
    body: JSON.stringify({ studentId: 1, mentorId })
  });

  alert("Mentor Requested");
}
