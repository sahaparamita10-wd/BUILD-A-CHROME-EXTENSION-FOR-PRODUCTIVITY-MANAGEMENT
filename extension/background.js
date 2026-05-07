let activeTab = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  handleTabChange(tab);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === "complete") {
    handleTabChange(tab);
  }
});

function handleTabChange(tab) {
  if (!tab || !tab.url) return; 

  const now = Date.now();

  if (activeTab && startTime && activeTab.url) {
    const duration = now - startTime;
    saveTime(activeTab.url, duration);
  }

  activeTab = tab;
  startTime = now;
}

function saveTime(url, duration) {
  if (!url || !url.startsWith("http")) return; 

  try {
    const domain = new URL(url).hostname;

    chrome.storage.local.get(["tracking"], (data) => {
      let tracking = data.tracking || {};

      tracking[domain] = (tracking[domain] || 0) + duration;

      chrome.storage.local.set({ tracking });

      syncWithBackend(domain, duration);
    });

  } catch (err) {
    console.error("Invalid URL:", url);
  }
}

async function syncWithBackend(domain, duration) {
  const token = await getToken();

  fetch("http://localhost:5000/api/tracking", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify({ domain, duration })
  });
}

function getToken() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["token"], (data) => {
      resolve(data.token);
    });
  });
}