import React from "react";

export default function LocalStorageBackup() {
  // Export localStorage to JSON file
  const handleBackup = () => {
    const data = { ...localStorage };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "parking_backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON file back to localStorage
  const handleRestore = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        Object.entries(data).forEach(([key, value]) => {
          localStorage.setItem(key, value);
        });
        alert("✅ Backup restored! Reloading page...");
        window.location.reload();
      } catch (err) {
        alert("❌ Invalid backup file!");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      className="backup-container"
      style={{ textAlign: "center", marginTop: "20px" }}
    >
      <h3>💾 Local Storage Backup / Restore</h3>
      <button onClick={handleBackup} className="btn btn-primary m-2">
        Export Backup
      </button>
      <label className="btn btn-success m-2">
        Import Backup
        <input
          type="file"
          accept="application/json"
          onChange={handleRestore}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
}
