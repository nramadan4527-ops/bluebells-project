// 🔹 لما backend يبقى جاهز غيري اللينك ده بس
const API_URL = "http://localhost:3000/api/doctors";

// 🔹 داتا مؤقتة (هتشتغل دلوقتي)
const fallbackDoctors = [
  { name: "Dr. Ahmed", specialty: "Therapist" },
  { name: "Dr. Sara", specialty: "Psychologist" }
];

async function loadDoctors() {
  const container = document.getElementById("doctors");

  try {
    const res = await fetch(API_URL);

    if (!res.ok) throw new Error("No backend");

    const doctors = await res.json();
    renderDoctors(doctors);

  } catch (error) {
    console.warn("Using fallback doctors");
    renderDoctors(fallbackDoctors);
  }
}

function renderDoctors(doctors) {
  const container = document.getElementById("doctors");
  container.innerHTML = "";

  doctors.forEach(doc => {
    container.innerHTML += `
      <div class="card">
        <h3>${doc.name}</h3>
        <p>${doc.specialty}</p>
      </div>
    `;
  });
}

loadDoctors();