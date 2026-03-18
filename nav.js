// Initialises the hamburger menu after header.html is injected into the page
function initHamburger() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('main-nav');

  if (!hamburger || !nav) return; // safety check

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when any nav link is tapped
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

// Load the shared header, then init the hamburger
function loadHeader() {
  fetch('header.html')
    .then(r => { if (!r.ok) throw new Error(); return r.text(); })
    .then(data => {
      document.getElementById('shared-header').innerHTML = data;
      initHamburger(); // ← runs AFTER header HTML is in the DOM
    })
    .catch(() => {
      document.getElementById('shared-header').innerHTML = `
        <header>
          <div class="logo"><img src="images/logo.png" alt="CrestPoint Logo"></div>
          <button class="hamburger" id="hamburger" aria-label="Toggle navigation">
            <span></span><span></span><span></span>
          </button>
          <nav id="main-nav">
            <a href="index.html">Home</a>
            <a href="solutions.html">Solutions</a>
            <a href="products.html">Products</a>
            <a href="enquire.html">Enquire</a>
            <a href="contact.html">Contact</a>
          </nav>
        </header>`;
      initHamburger();
    });
}

loadHeader();
