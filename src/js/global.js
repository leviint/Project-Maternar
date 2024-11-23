// sidebar

function toggleMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
  
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
    
  }
  
  function closeMenu() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
  
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
  }
  
  // fade-in
  
  window.addEventListener("load", function() {
    document.body.classList.add("loaded");
  });
  
  // identify current page
  
  const navLinks = document.querySelectorAll('.header-hyperlinks a');
  
  const currentPage = window.location.pathname.split('/').pop();
  
  navLinks.forEach(link => {
      if (link.getAttribute('href') === currentPage) {
          link.classList.add('active');
      }
  });