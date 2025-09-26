// // Most commonly used navigator properties
// // document.write("User Agent: " + navigator.userAgent + "<br>");
// // document.write("App Name: " + navigator.appName + "<br>");
// // document.write("App Version: " + navigator.appVersion + "<br>");
// // document.write("App Code Name: " + navigator.appCodeName + "<br>");
// // document.write("Language: " + navigator.language + "<br>");
// // document.write("Online: " + navigator.onLine + "<br>");
// // document.write("Platform: " + navigator.platform + "<br>");
// // document.write("Hardware Concurrency (CPU cores): " + navigator.hardwareConcurrency + "<br>");
// // document.write("Device Memory (GB): " + (navigator.deviceMemory || "N/A") + "<br>");
// // Geolocation example (requires user permission)
// // if ("geolocation" in navigator) {
// //   navigator.geolocation.getCurrentPosition(
// //     (position) => {
// //       document.write("Latitude: " + position.coords.latitude + "<br>");
// //       document.write("Longitude: " + position.coords.longitude + "<br>");
// //     },
// //     (error) => {
// //       document.write("Geolocation error: " + error.message + "<br>");
// //     }
// //   );
// // } else {
// //   document.write("Geolocation is not supported by this browser.<br>");
// // }

// // Use all document methods to style and update the div, h3, and p
// // Get elements by id, class, tag, and selector
// var infoDiv = document.getElementById("infoDiv");
// var infoClass = document.getElementsByClassName("info-class")[0];

// // Select the div using all required document methods
// var divById = document.getElementById("infoDiv");
// var divByClass = document.getElementsByClassName("info-class")[0];

// //Style the div
// // if (divById) {
// //   divById.style.color="red";

// // }
// if (divByClass) {
//   divByClass.style.color="yellow";
// }




// // Update content using JS
// infoTitle.textContent = "Navigator & Hardware Info";
// infoText.innerHTML =
//   "User Agent: " + navigator.userAgent + "<br>" +
//   "App Name: " + navigator.appName + "<br>" +
//   "App Version: " + navigator.appVersion + "<br>" +
//   "App Code Name: " + navigator.appCodeName + "<br>" +
//   "Language: " + navigator.language + "<br>" +
//   "Online: " + navigator.onLine + "<br>" +
//   "Platform: " + navigator.platform + "<br>" +
//   "Hardware Concurrency (CPU cores): " + navigator.hardwareConcurrency + "<br>" +
//   "Device Memory (GB): " + (navigator.deviceMemory || "N/A") + "<br>";

// Ensure the new <p> appears in the page by setting its display and adding to the div
// var divById = document.getElementById("infoDiv");
// var welcomeP = document.createElement("p");
// welcomeP.textContent = "Welcome to GIS team";
// divById.appendChild(welcomeP);

// // Create and append the welcome paragraph
// var div = document.getElementById("infoDiv");
// div.innerHTML = '<p id="welcometext">Welcome, guest!</p>';

// // Create and append the button
// var btn = document.createElement("button");
// btn.textContent = "Change Welcome Text";
// btn.onclick = function() {
//   document.getElementById("welcometext").textContent = "Welcome to GIS team!";
// };
// div.appendChild(btn);

// document.getElementById("redBtn").onclick = function() {
//   document.body.style.backgroundColor = "lightcoral";
// };
// document.getElementById("greenBtn").onclick = function() {
//   document.body.style.backgroundColor = "lightgreen";
// };
// document.getElementById("blueBtn").onclick = function() {
//   document.body.style.backgroundColor = "lightblue";
// };
document.getElementById("addBtn").onclick = function() {
  var input = document.getElementById("todoInput");
  var text = input.value.trim();
  
  if (!text) {
    alert("Please enter a task.");
    return;
  }

  var li = document.createElement("li");
  li.textContent = text;
  document.getElementById("todoList").appendChild(li);
  input.value = "";
};

// Add a button that escapes from the click
var escapeBtn = document.createElement("button");
escapeBtn.textContent = "Escaping Button";
escapeBtn.style.position = "absolute";
document.body.appendChild(escapeBtn);

escapeBtn.onclick = function() {
  // Move to a random position on click
  escapeBtn.style.left = Math.floor(Math.random() * (window.innerWidth - escapeBtn.offsetWidth)) + "px";
  escapeBtn.style.top = Math.floor(Math.random() * (window.innerHeight - escapeBtn.offsetHeight)) + "px";
};

var addBtn = document.getElementById("addBtn");
addBtn.style.position = "absolute";
addBtn.onmouseover = function() {
  addBtn.style.left = Math.floor(Math.random() * (window.innerWidth - addBtn.offsetWidth)) + "px";
  addBtn.style.top = Math.floor(Math.random() * (window.innerHeight - addBtn.offsetHeight)) + "px";
};