const blockedSites = ["facebook.com", "youtube.com"];

const current = window.location.hostname;

if (blockedSites.includes(current)) {
  document.body.innerHTML = `
    <h1 style="text-align:center;margin-top:20%">
      🚫 Blocked for Productivity
    </h1>
  `;
}