const links = document.querySelectorAll("ul li a");
//this gets the current path from the URL
let currentPath = window.location.pathname.split("/").pop();
console.log("Current path:", currentPath);

links.forEach((link) => {
  if (currentPath === "") {
    currentPath = "index.html"; // Default to index.html if path is empty
  }
  const linkPath = link.getAttribute("href");
  if (linkPath === currentPath) {
    link.classList.add("active");
  } else {
    link.classList.remove("active");
  }
});
