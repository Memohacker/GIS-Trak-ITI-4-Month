document.addEventListener("DOMContentLoaded", () => {
  // Initialize the map
  const map = L.map("map", {
    zoomControl: false,
    attributionControl: false,
  }).setView([30.0444, 31.2357], 13); // Default to Cairo coordinates

  // Add different tile layers
  const standard = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 19,
    }
  );

  const satellite = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    {
      maxZoom: 19,
    }
  );

  const dark = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 19,
    }
  );

  const light = L.tileLayer(
    "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
    {
      maxZoom: 19,
    }
  );

  // Add default layer
  standard.addTo(map);

  // Add a marker for the institute
  const instituteMarker = L.marker([30.0444, 31.2357])
    .addTo(map)
    .bindPopup("<b>Information System Institute</b><br>Main Campus")
    .openPopup();

  // Add some sample markers
  const markers = [
    { lat: 30.042, lng: 31.23, title: "Branch Campus" },
    { lat: 30.046, lng: 31.24, title: "Research Center" },
    { lat: 30.04, lng: 31.245, title: "Student Hub" },
  ];

  markers.forEach((marker) => {
    L.marker([marker.lat, marker.lng])
      .addTo(map)
      .bindPopup(`<b>${marker.title}</b>`);
  });

  // DOM Elements
  const widgetPanel = document.getElementById("widgetPanel");
  const widgetForm = document.getElementById("widgetForm");
  const closePanel = document.getElementById("closePanel");
  const closeForm = document.getElementById("closeForm");
  const cancelBtn = document.getElementById("cancelForm");
  const saveBtn = document.getElementById("saveForm");
  const tabs = document.querySelectorAll(".tab");
  const widgetButtons = document.querySelectorAll(".widget-btn");
  const formTitle = document.getElementById("formTitle");
  const notification = document.getElementById("notification");
  const notificationText = document.getElementById("notificationText");
  const zoomInBtn = document.getElementById("zoomIn");
  const zoomOutBtn = document.getElementById("zoomOut");
  const locateMeBtn = document.getElementById("locateMe");
  const styleButtons = document.querySelectorAll(".style-btn");

  // Widget data for dynamic content
  const widgetData = {
    1: { title: "Performance Metrics", icon: "chart-line" },
    2: { title: "User Management", icon: "users" },
    3: { title: "Notifications", icon: "bell" },
    4: { title: "Calendar", icon: "calendar" },
    5: { title: "Reports", icon: "file-alt" },
  };

  // Map layers object
  const mapLayers = {
    standard: standard,
    satellite: satellite,
    dark: dark,
    light: light,
  };

  // Current map style
  let currentStyle = "standard";

  // Show notification function
  function showNotification(message, isSuccess = true) {
    notificationText.textContent = message;
    notification.style.background = isSuccess
      ? "var(--success)"
      : "var(--danger)";
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 3000);
  }

  // Toggle widget panel
  function toggleWidgetPanel() {
    widgetPanel.classList.toggle("active");
  }

  // Show widget form with specific widget data
  function showWidgetForm(widgetId) {
    const data = widgetData[widgetId];
    if (data) {
      formTitle.textContent = `Configure ${data.title}`;
      document.getElementById("widgetName").placeholder = data.title;
    }
    widgetForm.classList.add("active");
  }

  // Hide all overlays
  function hideAllOverlays() {
    widgetPanel.classList.remove("active");
    widgetForm.classList.remove("active");
  }

  // Change map style
  function changeMapStyle(style) {
    mapLayers[currentStyle].remove();
    mapLayers[style].addTo(map);
    currentStyle = style;

    // Update active button
    styleButtons.forEach((btn) => {
      if (btn.dataset.style === style) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  // Event Listeners
  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      toggleWidgetPanel();
    });
  });

  widgetButtons.forEach((widget) => {
    widget.addEventListener("click", () => {
      const widgetId = widget.getAttribute("data-widget");
      showWidgetForm(widgetId);
    });
  });

  // Close buttons
  closePanel.addEventListener("click", hideAllOverlays);
  closeForm.addEventListener("click", hideAllOverlays);
  cancelBtn.addEventListener("click", hideAllOverlays);

  // Save form
  saveBtn.addEventListener("click", () => {
    const widgetName = document.getElementById("widgetName").value;
    if (widgetName) {
      showNotification(`"${widgetName}" widget saved successfully!`);
      hideAllOverlays();
    } else {
      showNotification("Please enter a widget name", false);
    }
  });

  // Map controls
  zoomInBtn.addEventListener("click", () => {
    map.zoomIn();
  });

  zoomOutBtn.addEventListener("click", () => {
    map.zoomOut();
  });

  locateMeBtn.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setView([latitude, longitude], 15);
          L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup("Your location")
            .openPopup();
        },
        (error) => {
          showNotification("Unable to get your location", false);
        }
      );
    } else {
      showNotification(
        "Geolocation is not supported by your browser",
        false
      );
    }
  });

  // Map style buttons
  styleButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      changeMapStyle(btn.dataset.style);
    });
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (
      widgetPanel.classList.contains("active") &&
      !widgetPanel.contains(e.target) &&
      !e.target.classList.contains("tab")
    ) {
      widgetPanel.classList.remove("active");
    }

    if (
      widgetForm.classList.contains("active") &&
      !widgetForm.contains(e.target) &&
      !e.target.classList.contains("widget-btn")
    ) {
      widgetForm.classList.remove("active");
    }
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      hideAllOverlays();
    }
  });
});