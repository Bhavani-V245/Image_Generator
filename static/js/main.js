// static/js/main.js

// Utility to show spinner
function showSpinner(show) {
  const spinner = document.getElementById('spinner');
  if (spinner) spinner.style.display = show ? 'block' : 'none';
}

// Handle text prompt generation
async function generateFromText() {
  const prompt = document.getElementById('promptInput').value.trim();
  if (!prompt) return alert('Enter a prompt');
  showSpinner(true);
  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });
    const data = await response.json();
    if (data.image_url) {
      document.getElementById('resultImg').src = data.image_url;
    } else {
      alert(data.error || 'Generation failed');
    }
  } catch (e) {
    alert('Request error');
  }
  showSpinner(false);
}

// Voice recording handling
let mediaRecorder;
let audioChunks = [];
const micBtn = document.getElementById('micBtn');

micBtn.addEventListener('click', async () => {
  if (mediaRecorder && mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    return;
  }
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  mediaRecorder = new MediaRecorder(stream);
  audioChunks = [];
  mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
  mediaRecorder.onstop = async () => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
    const form = new FormData();
    form.append('audio', audioBlob, 'voice.webm');
    showSpinner(true);
    try {
      const res = await fetch('/voice_generate', { method: 'POST', body: form });
      const result = await res.json();
      if (result.image_url) {
        document.getElementById('resultImg').src = result.image_url;
      } else {
        alert(result.error || 'Voice generation failed');
      }
    } catch (e) {
      alert('Voice request error');
    }
    showSpinner(false);
    micBtn.classList.remove('recording');
  };
  mediaRecorder.start();
  micBtn.classList.add('recording');
});

// Attach event listeners after DOM load
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('generateBtn').addEventListener('click', generateFromText);
});
