function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(0px)"
}
function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-500px)"
}


document.addEventListener('DOMContentLoaded', function() { // Ensure the DOM is fully loaded

    const navLinks = document.querySelectorAll('.nav-container .links a'); // Get all the navigation links
    const currentPath = window.location.pathname; // Get the current URL path (e.g., /about, /contact)
  
    navLinks.forEach(link => {
      const linkPath = new URL(link.href).pathname; // Get the link's path
  
      if (linkPath === currentPath) {
        link.classList.add('active'); // Add the 'active' class to the matching link
      } else {
        link.classList.remove('active'); // Remove the 'active' class from other links
      }
    });
  });

