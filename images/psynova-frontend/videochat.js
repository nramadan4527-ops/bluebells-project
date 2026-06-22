// ===== Role =====
const params = new URLSearchParams(window.location.search);
const role = params.get("role") || "patient";

document.getElementById("roleTitle").innerText =
  role === "doctor" ? "Doctor Panel" : "Patient Panel";

// ===== Video =====
let stream;

async function startVideo() {
  stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
  });

  document.getElementById("localVideo").srcObject = stream;
}

startVideo();

// ===== Controls =====
function toggleMute() {
  const audio = stream.getAudioTracks()[0];
  audio.enabled = !audio.enabled;
}

function toggleCamera() {
  const video = stream.getVideoTracks()[0];
  video.enabled = !video.enabled;
}

function endCall() {
  stream.getTracks().forEach(track => track.stop());
  alert("Call Ended");
}

// ===== Chat =====
function sendMessage() {
  const input = document.getElementById("msgInput");
  if (!input.value) return;

  addMessage(input.value, "me");
  input.value = "";
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = "message " + type;
  div.innerText = text;

  document.getElementById("messages").appendChild(div);
}