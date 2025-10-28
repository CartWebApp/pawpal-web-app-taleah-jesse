// date.js — updates the current date in the navbar

function updateDate() {
    const dateElement = document.getElementById("current-date");
    if (!dateElement) return; // exit if element not found
  
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const today = new Date().toLocaleDateString(undefined, options);
    dateElement.textContent = today;
  }
  
  // Run when the page loads
  document.addEventListener("DOMContentLoaded", () => {
    updateDate();
  
    // Update again at midnight (so it stays accurate)
    const now = new Date();
    const msUntilMidnight =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();
  
    setTimeout(() => {
      updateDate();
      setInterval(updateDate, 24 * 60 * 60 * 1000); // update every 24 hours
    }, msUntilMidnight);
  });
  