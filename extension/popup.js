document.addEventListener("DOMContentLoaded", loadStats);

function loadStats() {
  chrome.storage.local.get(["tracking"], (data) => {
    const stats = data.tracking || {};
    let html = "";

    for (let site in stats) {
      const minutes = (stats[site] / 60000).toFixed(2);
      html += `<p>${site}: ${minutes} mins</p>`;
    }

    document.getElementById("stats").innerHTML = html;
  });
}

document.getElementById("blockBtn").addEventListener("click", () => {
  const site = document.getElementById("siteInput").value;

  chrome.storage.local.get(["blocked"], (data) => {
    let blocked = data.blocked || [];
    blocked.push(site);

    chrome.storage.local.set({ blocked });
    alert("Blocked!");
  });
});