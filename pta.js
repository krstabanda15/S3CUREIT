// PTA Cybersecurity Awareness JavaScript
// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();
// Dark mode toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const html = document.documentElement;
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);
updateThemeIcon(currentTheme);
themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const newTheme = current === 'light' ? 'dark' : 'light';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcon(newTheme);
});
function updateThemeIcon(theme) {
  themeIcon.className = theme === 'light' ? 'bi bi-moon-stars' : 'bi bi-sun-fill';
}
// Scroll reveal animation
const reveals = document.querySelectorAll('.reveal');
function checkReveal() {
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const revealTop = reveal.getBoundingClientRect().top;
    const revealPoint = 100;
    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add('active');
    }
  });
}
window.addEventListener('scroll', checkReveal);
checkReveal(); // Check on load
// Micro-simulation buttons
const feedback = document.getElementById('simFeedback');
const btnHover = document.getElementById('btnHover');
const btnVerify = document.getElementById('btnVerify');
const btnReport = document.getElementById('btnReport');
btnHover.addEventListener('click', () => {
  feedback.innerHTML = `<div class="alert alert-warning mb-0"><i class="bi bi-exclamation-triangle me-2"></i> Hover preview shows <code>bnk-alerts.example</code> — not your bank's real domain. Good catch! Proceed to verify via the official app.</div>`;
});
btnVerify.addEventListener('click', () => {
  feedback.innerHTML = `<div class="alert alert-success mb-0"><i class="bi bi-shield-check me-2"></i> Correct: use the bank's official app or saved number. No issues found when logging in directly.</div>`;
});
btnReport.addEventListener('click', () => {
  feedback.innerHTML = `<div class="alert alert-primary mb-0"><i class="bi bi-flag me-2"></i> Reported to security/IT and deleted. Sharing saves others from the same attack.</div>`;
});
// QR Code tools
const qrContainer = document.getElementById('qrcode');
let qr;
function makeQR(text) {
  qrContainer.innerHTML = '';
  qr = new QRCode(qrContainer, { 
    text, 
    width: 200, 
    height: 200, 
    correctLevel: QRCode.CorrectLevel.M 
  });
}
makeQR(window.location.href);
document.getElementById('qrThis').addEventListener('click', () => {
  makeQR(window.location.href);
  document.getElementById('qrInput').value = window.location.href;
});
document.getElementById('qrMake').addEventListener('click', () => {
  const v = document.getElementById('qrInput').value.trim();
  if(v) makeQR(v);
});
document.getElementById('qrDownload').addEventListener('click', () => {
  const img = qrContainer.querySelector('img');
  const canvas = qrContainer.querySelector('canvas');
  let dataURL = '';
  if (img && img.src) dataURL = img.src;
  if (!dataURL && canvas) dataURL = canvas.toDataURL('image/png');
  if (!dataURL) return;
  const a = document.createElement('a');
  a.href = dataURL;
  a.download = 'pta-qr.png';
  a.click();
});
document.getElementById('qrInput').value = window.location.href;
// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
// Prevent fake link click
document.getElementById('fakeLink').addEventListener('click', (e) => {
  e.preventDefault();
  feedback.innerHTML = `<div class="alert alert-danger mb-0"><i class="bi bi-x-circle me-2"></i> Wait! This is a phishing simulation. Never click suspicious links. Try the other buttons instead.</div>`;
});
