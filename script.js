/**
 * ═══════════════════════════════════════════════════
 * ALLIED COLD STORE — script.js (FIXED & UPGRADED)
 * Features:
 *  1. Mobile Nav Toggle
 *  2. Header scroll effect
 *  3. Active nav link tracking
 *  4. PRODUCT DATA & rendering
 *  5. Category filter tabs
 *  6. CART SYSTEM (add, remove, qty, total)
 *  7. WhatsApp order message builder
 *  8. Floating cart CTA
 *  9. Contact form validation
 * 10. Scroll to top
 * 11. Scroll reveal animations
 * 12. Footer year
 * 13. ACS Reorder System
 * 14. Branch Selector Modal
 * ═══════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ════════════════════════════════════════════════
     CONSTANTS — Declared FIRST to avoid any
     "used before declaration" errors
  ════════════════════════════════════════════════ */
 const WA_NUMBER     = '233247221043';
  const ACS_CUSTOMER  = 'acs-customer';
  const ACS_ORDER     = 'acs-last-order';
  const ACS_SKIPPED   = 'acs-skipped';
  const ACS_DISMISSED = 'acs-dismissed';

    /* ════════════════════════════════════════════════
     PRODUCT DATABASE
  ════════════════════════════════════════════════ */
  const PRODUCTS = [
    {
      id: 1, cat: 'chicken',
      name: 'Whole Frozen Chicken',
      desc: 'Grade-A whole bird, perfectly cleaned and flash-frozen. The family favourite.',
      price: 200.00, unit: 'per bird (~1.5kg)', icon: 'fas fa-drumstick-bite',
      image: './images/Products/frozen-whole-chicken.webp',
      badge: '⭐ Best Seller', badgeClass: '', inStock: true
    },
    {
      id: 2, cat: 'chicken',
      name: 'Chicken Thighs (1kg)',
      desc: 'Juicy, tender chicken thighs — perfect for stews, grilling, and frying.',
      price: 99.99, unit: 'per 1kg pack', icon: 'fas fa-drumstick-bite',
      image: './images/Products/chicken-thighs.webp',
      badge: 'Popular', badgeClass: 'badge-blue', inStock: true
    },
    {
      id: 3, cat: 'chicken',
      name: 'Chicken Wings (1kg)',
      desc: 'Crispy wings, great for parties and everyday cooking. Always in stock.',
      price: 299.99, unit: 'per 1kg pack', icon: 'fas fa-drumstick-bite',
      image: './images/Products/chicken-wings.webp',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 4, cat: 'chicken',
      name: 'Chicken Legs (1kg)',
      desc: 'Full chicken legs — a household staple and the most versatile cut we carry.',
      price: 195.00, unit: 'per 1kg pack', icon: 'fas fa-drumstick-bite',
      image: './images/Products/chicken-legs.webp',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 5, cat: 'chicken',
      name: 'Chicken Gizzards (1kg)',
      desc: 'Premium gizzards, cleaned and ready to cook. A Ghanaian favourite.',
      price: 175.00, unit: 'per 1kg pack', icon: 'fas fa-drumstick-bite',
      image: './images/Products/chicken-gizzards.webp',
      badge: 'Fan Favourite', badgeClass: 'badge-green', inStock: true
    },
    {
      id: 6, cat: 'chicken',
      name: 'Chicken Breast (1kg)',
      desc: 'Lean, healthy chicken breast. Ideal for grilling and clean eating.',
      price: 285.00, unit: 'per 1kg pack', icon: 'fas fa-drumstick-bite',
      image: './images/Products/chicken-breast.webp',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 7, cat: 'chicken',
      name: 'Chicken Feet (1kg)',
      desc: 'Perfectly cleaned chicken feet. Great for soups and traditional dishes.',
      price: 89.00, unit: 'per 1kg pack', icon: 'fas fa-drumstick-bite',
      image: './images/Products/chicken-feet.webp',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 8, cat: 'chicken',
      name: 'Mixed Chicken Parts (2kg)',
      desc: 'A great mix of assorted chicken parts — perfect for large family meals.',
      price: 249.99, unit: 'per 2kg pack', icon: 'fas fa-drumstick-bite',
      image: './images/Products/mixed-chicken.webp',
      badge: 'Value Pack', badgeClass: 'badge-blue', inStock: true
    },
    {
      id: 9, cat: 'meats',
      name: 'Beef Stew Cuts (1kg)',
      desc: 'Tender beef cuts, ready for your pot. Perfectly frozen to lock in flavour.',
      price: 65.00, unit: 'per 1kg pack', icon: 'fas fa-bacon',
      image: './images/Products/beef-stew.webp',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 10, cat: 'meats',
      name: 'Beef Offal (1kg)',
      desc: 'Mixed beef offal — tripe, liver, kidney. A traditional delicacy.',
      price: 42.00, unit: 'per 1kg pack', icon: 'fas fa-bacon',
      image: './images/Products/beef-offal.webp',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 11, cat: 'meats',
      name: 'Pork Cuts (1kg)',
      desc: 'Premium frozen pork, great for grilling, stewing, and frying.',
      price: 58.00, unit: 'per 1kg pack', icon: 'fas fa-bacon',
      image: './images/Products/pork-cuts.webp',
      badge: null, badgeClass: '', inStock: false
    },
    {
      id: 12, cat: 'meats',
      name: 'Mixed Meat Pack (2kg)',
      desc: 'A variety pack with chicken, beef and pork. Great for households and events.',
      price: 110.00, unit: 'per 2kg pack', icon: 'fas fa-bacon',
      image: './images/Products/mixed-meat.webp',
      badge: 'Value Pack', badgeClass: 'badge-blue', inStock: true
    },
    {
      id: 13, cat: 'fish',
      name: 'Whole Tilapia (1kg)',
      desc: 'Fresh tilapia, cleaned and frozen. Ghana\'s most loved fish.',
      price: 40.00, unit: 'per 1kg', icon: 'fas fa-fish',
      image: './images/Products/tilapia.webp',
      badge: 'Popular', badgeClass: 'badge-blue', inStock: true
    },
    {
      id: 14, cat: 'fish',
      name: 'Mackerel / Titus (1kg)',
      desc: 'Classic Titus mackerel — perfect for stews, frying, and grilling.',
      price: 35.00, unit: 'per 1kg', icon: 'fas fa-fish',
      image: './images/Products/mackerel.webp',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 15, cat: 'fish',
      name: 'Catfish (1kg)',
      desc: 'Premium frozen catfish. A staple for soups, pepper soups, and stews.',
      price: 45.00, unit: 'per 1kg', icon: 'fas fa-fish',
      image: './images/Products/catfish.webp',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 16, cat: 'fish',
      name: 'Herrings 1 KG',
      desc: 'Delicious herrings — smoked and frozen for that authentic flavour.',
      price: 28.00, unit: 'per pack', icon: 'fas fa-fish',
      image: './images/Products/herrings.webp',
      badge: null, badgeClass: '', inStock: false
    },
    {
      id: 17, cat: 'icecream',
      name: 'Vanilla Ice Cream (2L)',
      desc: 'Creamy, classic vanilla. A crowd-pleaser for any occasion.',
      price: 45.00, unit: 'per 2L tub', icon: 'fas fa-ice-cream',
      image: './images/Products/vanilla-icecream.webp',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 18, cat: 'icecream',
      name: 'Chocolate Ice Cream (2L)',
      desc: 'Rich chocolate ice cream — everyone\'s second favourite.',
      price: 45.00, unit: 'per 2L tub', icon: 'fas fa-ice-cream',
      image: './images/Products/chocolate-icecream.webp',
      badge: 'Popular', badgeClass: 'badge-purple', inStock: true
    },
    {
      id: 19, cat: 'icecream',
      name: 'Strawberry Ice Cream (2L)',
      desc: 'Light, fruity strawberry ice cream. Great for kids and families.',
      price: 45.00, unit: 'per 2L tub', icon: 'fas fa-ice-cream',
      image: './images/Products/strawberry-icecream.webp',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 20, cat: 'icecream',
      name: 'Bulk Ice Cream (5L)',
      desc: 'Perfect for parties, events, and celebrations. Multiple flavours available.',
      price: 100.00, unit: 'per 5L tub', icon: 'fas fa-ice-cream',
      image: './images/Products/bulk-icecream.webp',
      badge: 'Event Size', badgeClass: 'badge-purple', inStock: false
    },
    // ═══════════════════════════════════════════════════
    // WHOLESALE PRODUCTS (Chicken & Fish only)
    // ═══════════════════════════════════════════════════
    
    // WHOLESALE CHICKEN
    {
      id: 101, cat: 'wholesale-chicken',
      name: 'Whole Frozen Chicken (Carton)',
      desc: 'Bulk pack of premium whole chickens — perfect for restaurants, events, and bulk buyers.',
      price: 1800.00, originalPrice: 2000.00, savings: 10,
      unit: 'per carton (10 birds)', icon: '🐔',
      image: null,
      badge: '🏢 Wholesale', badgeClass: 'badge-wholesale', inStock: true,
      isWholesale: true
    },
    {
      id: 102, cat: 'wholesale-chicken',
      name: 'Chicken Thighs (10kg Bulk)',
      desc: 'Premium chicken thighs in bulk packaging — ideal for caterers and food businesses.',
      price: 850.00, originalPrice: 999.90, savings: 15,
      unit: 'per 10kg pack', icon: '🍗',
      image: null,
      badge: '🏢 Wholesale', badgeClass: 'badge-wholesale', inStock: false,
      isWholesale: true
    },
    {
      id: 103, cat: 'wholesale-chicken',
      name: 'Chicken Wings (10kg Bulk)',
      desc: 'Crispy chicken wings in bulk — perfect for parties, events, and wholesale buyers.',
      price: 2700.00, originalPrice: 2999.90, savings: 10,
      unit: 'per 10kg pack', icon: '🍗',
      image: null,
      badge: '🏢 Wholesale', badgeClass: 'badge-wholesale', inStock: true,
      isWholesale: true
    },
    {
      id: 104, cat: 'wholesale-chicken',
      name: 'Chicken Legs (10kg Bulk)',
      desc: 'Full chicken legs in bulk packaging — staple for restaurants and large families.',
      price: 1850.00, originalPrice: 1950.00, savings: 5,
      unit: 'per 10kg pack', icon: '🍗',
      image: null,
      badge: '🏢 Wholesale', badgeClass: 'badge-wholesale', inStock: true,
      isWholesale: true
    },
    {
      id: 105, cat: 'wholesale-chicken',
      name: 'Chicken Gizzards (10kg Bulk)',
      desc: 'Premium gizzards in bulk — popular for traditional dishes and restaurants.',
      price: 1600.00, originalPrice: 1750.00, savings: 9,
      unit: 'per 10kg pack', icon: '🐔',
      image: null,
      badge: '🏢 Wholesale', badgeClass: 'badge-wholesale', inStock: true,
      isWholesale: true
    },
    {
      id: 106, cat: 'wholesale-chicken',
      name: 'Chicken Breast (10kg Bulk)',
      desc: 'Lean chicken breast in bulk — perfect for healthy meal preparation businesses.',
      price: 2700.00, originalPrice: 2850.00, savings: 5,
      unit: 'per 10kg pack', icon: '🍗',
      image: null,
      badge: '🏢 Wholesale', badgeClass: 'badge-wholesale', inStock: true,
      isWholesale: true
    },
    {
      id: 107, cat: 'wholesale-chicken',
      name: 'Chicken Feet (10kg Bulk)',
      desc: 'Cleaned chicken feet in bulk — great for soup vendors and traditional dishes.',
      price: 800.00, originalPrice: 890.00, savings: 10,
      unit: 'per 10kg pack', icon: '🐔',
      image: null,
      badge: '🏢 Wholesale', badgeClass: 'badge-wholesale', inStock: true,
      isWholesale: true
    },
    {
      id: 108, cat: 'wholesale-chicken',
      name: 'Mixed Chicken Parts (20kg Bulk)',
      desc: 'Assorted chicken parts in bulk — best value for large events and caterers.',
      price: 2300.00, originalPrice: 2499.90, savings: 8,
      unit: 'per 20kg pack', icon: '🍗',
      image: null,
      badge: '🏢 Wholesale', badgeClass: 'badge-wholesale', inStock: true,
      isWholesale: true
    },
    
    // WHOLESALE FISH
    {
      id: 109, cat: 'wholesale-fish',
      name: 'Whole Tilapia (20kg Carton)',
      desc: 'Fresh tilapia in bulk — popular for restaurants, hotels, and fish vendors.',
      price: 750.00, originalPrice: 800.00, savings: 6,
      unit: 'per 20kg carton', icon: '🐟',
      image: null,
      badge: '🏢 Wholesale', badgeClass: 'badge-wholesale', inStock: true,
      isWholesale: true
    },
    {
      id: 110, cat: 'wholesale-fish',
      name: 'Mackerel / Titus (20kg Carton)',
      desc: 'Classic Titus mackerel in bulk — best price for wholesale buyers.',
      price: 650.00, originalPrice: 700.00, savings: 7,
      unit: 'per 20kg carton', icon: '🐠',
      image: null,
      badge: '🏢 Wholesale', badgeClass: 'badge-wholesale', inStock: true,
      isWholesale: true
    },
    {
      id: 111, cat: 'wholesale-fish',
      name: 'Catfish (20kg Carton)',
      desc: 'Premium frozen catfish in bulk — perfect for soup vendors and restaurants.',
      price: 850.00, originalPrice: 900.00, savings: 6,
      unit: 'per 20kg carton', icon: '🐟',
      image: null,
      badge: '🏢 Wholesale', badgeClass: 'badge-wholesale', inStock: true,
      isWholesale: true
    },
    {
      id: 112, cat: 'wholesale-fish',
      name: 'Herrings (10kg Carton)',
      desc: 'Smoked herrings in bulk — popular for bulk distribution.',
      price: 280.00, originalPrice: 330.00, savings: 15,
      unit: 'per 10kg carton', icon: '🐟',
      image: null,
      badge: '🏢 Wholesale', badgeClass: 'badge-wholesale', inStock: true,
      isWholesale: true
    },
  ];
  /* ════════════════════════════════════════════════
     CART STATE
  ════════════════════════════════════════════════ */
  let cart = [];

  /* ════════════════════════════════════════════════
     ELEMENT REFS
  ════════════════════════════════════════════════ */
  const header       = document.getElementById('header');
  const burger       = document.getElementById('burger');
  const navMenu      = document.getElementById('nav-menu');
  const navOverlay   = document.getElementById('nav-overlay');
  const allNm        = document.querySelectorAll('.nm');
  const sections     = document.querySelectorAll('section[id]');
  const cartToggle   = document.getElementById('cart-toggle');
  const cartSidebar  = document.getElementById('cart-sidebar');
  const cartClose    = document.getElementById('cart-close');
  const cartOverlay  = document.getElementById('cart-overlay');
  const cartBody     = document.getElementById('cart-body');
  const cartEmpty    = document.getElementById('cart-empty');
  const cartFooter   = document.getElementById('cart-footer');
  const cartCount    = document.getElementById('cart-count');
  const cartTotal    = document.getElementById('cart-total-price');
  const waBtn        = document.getElementById('wa-order-btn');
  const clearBtn     = document.getElementById('cart-clear');
  const productGrid  = document.getElementById('product-grid');
  const catTabs      = document.querySelectorAll('.cat-tab');
  const floatingCta  = document.getElementById('floating-cta');
  const fccOpen      = document.getElementById('fcc-open');
  const fccText      = document.getElementById('fcc-text');
  const fccPrice     = document.getElementById('fcc-price');
  const contactForm  = document.getElementById('contact-form');
  const formSuccess  = document.getElementById('form-success');
  const stt          = document.getElementById('stt');
  const yrSpan       = document.getElementById('yr');

  /* ════════════════════════════════════════════════
     FOOTER YEAR
  ════════════════════════════════════════════════ */
  if (yrSpan) yrSpan.textContent = new Date().getFullYear();

  /* ════════════════════════════════════════════════
     THEME TOGGLE
  ════════════════════════════════════════════════ */
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('acs-theme');
  if (savedTheme === 'dark') document.body.classList.add('dark-mode');

  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('acs-theme', isDark ? 'dark' : 'light');
  });

  /* ════════════════════════════════════════════════
     MOBILE NAV
  ════════════════════════════════════════════════ */
  const openNav = () => {
    navMenu.classList.add('open');
    burger.classList.add('open');
    navOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    navMenu.classList.remove('open');
    burger.classList.remove('open');
    navOverlay.classList.remove('show');
    document.body.style.overflow = '';
  };

  burger?.addEventListener('click', () =>
    navMenu.classList.contains('open') ? closeNav() : openNav()
  );

  navOverlay?.addEventListener('click', closeNav);
  allNm.forEach(l => l.addEventListener('click', closeNav));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closeNav();
      closeNavSearch();
    }
  });

  /* ════════════════════════════════════════════════
     HEADER SCROLL + SCROLL TOP + ACTIVE NAV
  ════════════════════════════════════════════════ */
  const onScroll = () => {
    if (header) header.classList.toggle('scrolled', window.scrollY > 40);
    if (stt) stt.classList.toggle('show', window.scrollY > 500);
    updateActiveNav();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  stt?.addEventListener('click', () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })
  );

  function updateActiveNav() {
    const mid = window.scrollY + window.innerHeight / 2.5;
    sections.forEach(sec => {
      if (mid >= sec.offsetTop && mid < sec.offsetTop + sec.offsetHeight) {
        allNm.forEach(l => l.classList.remove('active'));
        const match = document.querySelector(`.nm[href="#${sec.id}"]`);
        if (match) match.classList.add('active');
      }
    });
  }

  /* ════════════════════════════════════════════════
     SMOOTH SCROLL
  ════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const navH   = header?.offsetHeight || 64;
      const offset = navH + 10;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

   /* ════════════════════════════════════════════════
     NAV SEARCH — SCROLL TO PRODUCTS (NEW VERSION)
  ════════════════════════════════════════════════ */
  var navSearchBtn = document.getElementById('nav-search-btn');
  var productSearchInput = document.getElementById('product-search');
  var productSearchBox = document.querySelector('.search-box');

  if (navSearchBtn) {
    navSearchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile nav if open
      closeNav();
      
      // Get the menu section
      var menuSection = document.getElementById('menu');
      if (!menuSection) return;
      
      // Calculate scroll position
      var headerHeight = header?.offsetHeight || 64;
      var scrollOffset = headerHeight + 20;
      var targetY = menuSection.offsetTop - scrollOffset;
      
      // Smooth scroll to product search (500ms via CSS scroll-behavior)
      window.scrollTo({
        top: targetY,
        behavior: 'smooth'
      });
      
      // After scroll completes, focus the search input and add pulse animation
      setTimeout(function() {
        if (productSearchInput) {
          // Clear any previous search
          productSearchInput.value = '';
          currentSearch = '';
          
          // Reset the products to show all
          if (typeof renderProducts === 'function') {
            renderProducts(currentFilter || 'all', '');
          }
          
          // Focus the input (this opens mobile keyboard too)
          productSearchInput.focus();
        }
        
        // Add pulse animation to the search box
        if (productSearchBox) {
          productSearchBox.classList.add('pulse-highlight');
          
          // Remove animation class after it completes
          setTimeout(function() {
            productSearchBox.classList.remove('pulse-highlight');
          }, 1500);
        }
      }, 600); // Wait for scroll to mostly complete
    });
  }

  // Helper function for closing mobile nav (in case it's open)
  function closeNavSearch() {
    // Kept as empty function for compatibility with old code references
  }
  /* ════════════════════════════════════════════════
     SMART FUZZY SEARCH SYSTEM
  ════════════════════════════════════════════════ */
  const searchInput  = document.getElementById('product-search');
  const searchClear  = document.getElementById('search-clear');
  const searchInfo   = document.getElementById('search-info');
  const searchInfoTx = document.getElementById('search-info-text');

  let currentSearch = '';
  let currentFilter = 'all';

  function fuzzyMatch(target, search) {
    if (!search) return true;
    target = target.toLowerCase();
    search = search.toLowerCase().trim();
    if (target.includes(search)) return true;
    let searchIndex = 0;
    for (let i = 0; i < target.length; i++) {
      if (target[i] === search[searchIndex]) searchIndex++;
      if (searchIndex === search.length) return true;
    }
    return false;
  }

  function getMatchScore(product, search) {
    if (!search) return 100;
    const name = product.name.toLowerCase();
    const desc = product.desc.toLowerCase();
    const term = search.toLowerCase().trim();
    if (name === term)             return 100;
    if (name.startsWith(term))     return 80;
    if (name.includes(term))       return 60;
    if (desc.includes(term))       return 40;
    if (fuzzyMatch(name, term) || fuzzyMatch(desc, term)) return 20;
    return 0;
  }

    function getSearchResults(search, categoryFilter) {
    var results;
    
    // If user is searching (typed something), show ALL products including wholesale
    if (search && search.trim() !== '') {
      results = PRODUCTS; // Include everything when searching
    } else {
      // If not searching, only show retail products (wholesale has its own section)
      results = PRODUCTS.filter(function(p) {
        return p.isWholesale !== true;
      });
    }
    
    if (categoryFilter !== 'all') {
      results = results.filter(function(p) {
        return p.cat === categoryFilter;
      });
    }
    
    if (!search || search.trim() === '') return results;
    
    var scored = results.map(function(product) {
      return {
        product: product,
        score: getMatchScore(product, search)
      };
    });
    
    var matches = scored.filter(function(item) { return item.score > 0; });
    matches.sort(function(a, b) { return b.score - a.score; });
    return matches.map(function(item) { return item.product; });
  }
  function updateSearchUI(search, resultCount, totalCount) {
    if (!searchClear || !searchInfo || !searchInfoTx) return;
    if (search && search.trim() !== '') {
      searchClear.style.display = 'flex';
      searchInfo.style.display  = 'flex';
      if (resultCount === 0) {
        searchInfoTx.textContent = `No products found for "${search}"`;
      } else if (resultCount === totalCount) {
        searchInfoTx.textContent = `Showing all ${resultCount} products`;
      } else {
        searchInfoTx.textContent =
          `Found ${resultCount} product${resultCount !== 1 ? 's' : ''} for "${search}"`;
      }
    } else {
      searchClear.style.display = 'none';
      searchInfo.style.display  = 'none';
    }
  }

  if (searchInput) {
    searchInput.addEventListener('input', function () {
      currentSearch = this.value;
      renderProducts(currentFilter, currentSearch);
    });

    searchClear?.addEventListener('click', function () {
      searchInput.value = '';
      currentSearch = '';
      searchInput.focus();
      renderProducts(currentFilter, '');
    });

    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        this.value = '';
        currentSearch = '';
        renderProducts(currentFilter, '');
        this.blur();
      }
    });
  }

  /* ════════════════════════════════════════════════
     RENDER PRODUCTS
  ════════════════════════════════════════════════ */
  function renderProducts(filter = 'all', search = '') {
    if (!productGrid) return;

    currentFilter = filter;
    currentSearch = search;

    const filtered = getSearchResults(search, filter);

    productGrid.innerHTML = '';

    const totalInCategory = filter === 'all'
      ? PRODUCTS.length
      : PRODUCTS.filter(p => p.cat === filter).length;

    updateSearchUI(search, filtered.length, totalInCategory);

    if (filtered.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.innerHTML = `
        <div class="no-results-icon">
          <i class="fas fa-search"></i>
        </div>
        <h4>No products found</h4>
        <p>We couldn't find any products matching
        "<strong>${search}</strong>". Try a different word.</p>
        <button class="no-results-clear" id="no-results-clear">
          <i class="fas fa-times"></i> Clear Search
        </button>
      `;
      productGrid.appendChild(noResults);
      document.getElementById('no-results-clear')?.addEventListener('click', () => {
        if (searchInput) {
          searchInput.value = '';
          currentSearch = '';
        }
        renderProducts(currentFilter, '');
      });
      return;
    }

    filtered.forEach((prod, i) => {
      const card = document.createElement('div');
      card.className = 'prod-card reveal';
      card.style.transitionDelay = `${(i % 4) * 0.07}s`;
      card.dataset.id = prod.id;

      const inCart  = cart.find(c => c.product.id === prod.id);
      const btnText = inCart ? 'Added' : 'Add to Cart';
      const btnClass = inCart ? 'pc-add-btn added' : 'pc-add-btn';

      let cardHTML = '';
      cardHTML += '<div class="pc-img pc-img-' + prod.cat + ' ' + (!prod.inStock ? 'pc-img-oos' : '') + '">';
      
      if (prod.image) {
        cardHTML += '<img src="' + prod.image + '" alt="' + prod.name + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;" />';
      } else {
        cardHTML += '<i class="' + prod.icon + '"></i>';
      }
      
      if (prod.badge && prod.inStock) {
        cardHTML += '<span class="pc-badge ' + prod.badgeClass + '">' + prod.badge + '</span>';
      }
      
      if (!prod.inStock) {
        cardHTML += '<div class="pc-oos-overlay"><div class="pc-oos-inner"><i class="fas fa-times-circle"></i><span>Out of Stock</span></div></div>';
      }
      
      cardHTML += '</div>';
      cardHTML += '<div class="pc-body">';
      cardHTML += '<p class="pc-name">' + prod.name + '</p>';
      cardHTML += '<p class="pc-desc">' + prod.desc + '</p>';
      cardHTML += '<div class="pc-price">GH₵ ' + prod.price.toFixed(2) + '<small class="pc-unit-label">📦 ' + prod.unit + '</small></div>';
      
      if (prod.inStock) {
        cardHTML += '<div class="pc-actions">';
        cardHTML += '<div class="pc-qty-selector" data-id="' + prod.id + '">';
        cardHTML += '<button class="pc-qty-btn pc-qty-minus" data-id="' + prod.id + '" aria-label="Decrease quantity"><i class="fas fa-minus"></i></button>';
        cardHTML += '<input type="number" class="pc-qty-input" data-id="' + prod.id + '" value="1" min="1" max="99" aria-label="Quantity" />';
        cardHTML += '<button class="pc-qty-btn pc-qty-plus" data-id="' + prod.id + '" aria-label="Increase quantity"><i class="fas fa-plus"></i></button>';
        cardHTML += '</div>';
        cardHTML += '<button class="' + btnClass + '" data-id="' + prod.id + '"><i class="fas fa-shopping-basket"></i> ' + btnText + '</button>';
        cardHTML += '</div>';
      } else {
        cardHTML += '<button class="pc-add-btn pc-oos-btn" disabled><i class="fas fa-times"></i> Out of Stock</button>';
      }
      
      cardHTML += '</div>';
      
      card.innerHTML = cardHTML;
      productGrid.appendChild(card);
    });

    productGrid.querySelectorAll('.reveal').forEach(el => {
      revealObserver.observe(el);
    });

    // Add to Cart button handlers
    productGrid.querySelectorAll('.pc-add-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        const qtyInput = productGrid.querySelector('.pc-qty-input[data-id="' + id + '"]');
        const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
        if (id) addToCart(id, qty);
      });
    });

    // Quantity minus button handlers
    productGrid.querySelectorAll('.pc-qty-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const input = productGrid.querySelector('.pc-qty-input[data-id="' + id + '"]');
        if (input) {
          let val = parseInt(input.value) || 1;
          if (val > 1) {
            input.value = val - 1;
            input.classList.add('bumped');
            setTimeout(() => input.classList.remove('bumped'), 200);
          }
        }
      });
    });

    // Quantity plus button handlers
    productGrid.querySelectorAll('.pc-qty-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const input = productGrid.querySelector('.pc-qty-input[data-id="' + id + '"]');
        if (input) {
          let val = parseInt(input.value) || 1;
          if (val < 99) {
            input.value = val + 1;
            input.classList.add('bumped');
            setTimeout(() => input.classList.remove('bumped'), 200);
          }
        }
      });
    });

    // Validate quantity input
    productGrid.querySelectorAll('.pc-qty-input').forEach(input => {
      input.addEventListener('input', () => {
        let val = parseInt(input.value) || 1;
        if (val < 1) val = 1;
        if (val > 99) val = 99;
        input.value = val;
      });

      input.addEventListener('blur', () => {
        if (!input.value || parseInt(input.value) < 1) {
          input.value = 1;
        }
      });
    });
  }
  /* ════════════════════════════════════════════════
     CATEGORY FILTER TABS
  ════════════════════════════════════════════════ */
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentFilter = tab.dataset.cat;
      renderProducts(currentFilter, currentSearch);
    });
  });
  /* ════════════════════════════════════════════════
     TOAST NOTIFICATION SYSTEM
  ════════════════════════════════════════════════ */
  const toastContainer = document.getElementById('toast-container');

  function showToast(product, qty = 1) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';

    const subtotal = (product.price * qty).toFixed(2);

    toast.innerHTML = `
      <div class="toast-icon">
        <i class="fas fa-check"></i>
      </div>
      <div class="toast-content">
        <p class="toast-title">
          <i class="fas fa-shopping-basket"></i>
          Added to cart!
        </p>
        <p class="toast-name">${product.name}</p>
        <p class="toast-meta">Qty: ${qty} · <strong>GH₵ ${subtotal}</strong></p>
      </div>
      <button class="toast-action" data-action="view-cart">
        View Cart
      </button>
      <div class="toast-progress"></div>
    `;

    toastContainer.appendChild(toast);

    // Auto-dismiss after 3 seconds
    const dismissTimer = setTimeout(() => dismissToast(toast), 3000);

    // Click "View Cart" button
    toast.querySelector('.toast-action')?.addEventListener('click', (e) => {
      e.stopPropagation();
      clearTimeout(dismissTimer);
      dismissToast(toast);
      setTimeout(openCart, 200);
    });

    // Click toast body to dismiss
    toast.addEventListener('click', () => {
      clearTimeout(dismissTimer);
      dismissToast(toast);
    });

    // Limit max 3 toasts on screen
    const allToasts = toastContainer.querySelectorAll('.toast');
    if (allToasts.length > 3) {
      dismissToast(allToasts[0]);
    }
  }
  function showOrderIdToast(orderId, totalItems, total) {
    if (!toastContainer) return;

    var toast = document.createElement('div');
    toast.className = 'toast toast-info';

    var toastHTML = '';
    toastHTML += '<div class="toast-icon"><i class="fas fa-receipt"></i></div>';
    toastHTML += '<div class="toast-content">';
    toastHTML += '<p class="toast-title"><i class="fas fa-check-circle"></i> Order Created!</p>';
    toastHTML += '<p class="toast-name">' + orderId + '</p>';
    toastHTML += '<p class="toast-meta">' + totalItems + ' items · <strong>GH₵ ' + total.toFixed(2) + '</strong></p>';
    toastHTML += '</div>';
    toastHTML += '<div class="toast-progress"></div>';

    toast.innerHTML = toastHTML;
    toastContainer.appendChild(toast);

    // This toast stays longer (5 seconds) so customer can see the Order ID
    var dismissTimer = setTimeout(function() {
      dismissToast(toast);
    }, 5000);

    toast.addEventListener('click', function() {
      clearTimeout(dismissTimer);
      dismissToast(toast);
    });
  }
  function dismissToast(toast) {
    if (!toast || toast.classList.contains('toast-hide')) return;
    toast.classList.add('toast-hide');
    setTimeout(() => {
      if (toast.parentNode) toast.remove();
    }, 350);
  }
  /* ════════════════════════════════════════════════
     ORDER ID GENERATOR
  ════════════════════════════════════════════════ */
  function generateOrderId() {
    // Get current date
    var now = new Date();
    var year = now.getFullYear();
    var month = String(now.getMonth() + 1).padStart(2, '0');
    var day = String(now.getDate()).padStart(2, '0');
    var dateStr = '' + year + month + day;

    // Generate 4 random alphanumeric characters (uppercase)
    var chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var randomStr = '';
    for (var i = 0; i < 4; i++) {
      randomStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return 'ACS-' + dateStr + '-' + randomStr;
  }
  /* ════════════════════════════════════════════════
     CART SYSTEM
  ════════════════════════════════════════════════ */
  const openCart = () => {
    cartSidebar?.classList.add('open');
    cartOverlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    cartSidebar?.classList.remove('open');
    cartOverlay?.classList.remove('show');
    document.body.style.overflow = '';
  };

  cartToggle?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

function addToCart(productId, qty = 1) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    // Ensure qty is a valid number
    qty = parseInt(qty) || 1;
    if (qty < 1) qty = 1;
    if (qty > 99) qty = 99;

    const existing = cart.find(c => c.product.id === productId);
    if (existing) {
      existing.qty += qty;
      // Cap at 99
      if (existing.qty > 99) existing.qty = 99;
    } else {
      cart.push({ product, qty });
    }

    updateCart();
    bumpCount();
    showToast(product, qty);

    // Reset quantity selector to 1 after adding
    const qtyInput = productGrid?.querySelector(`.pc-qty-input[data-id="${productId}"]`);
    if (qtyInput) qtyInput.value = 1;

    const btn = productGrid?.querySelector(
      `.pc-add-btn[data-id="${productId}"]`
    );
    if (btn) {
      btn.classList.add('added');
      btn.innerHTML = '<i class="fas fa-check"></i> Added';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-shopping-basket"></i> Add to Cart';
        btn.style.pointerEvents = 'auto';
      }, 1200);
    }
  }
  function removeFromCart(productId) {
    cart = cart.filter(c => c.product.id !== productId);
    updateCart();
  }

  function changeQty(productId, delta) {
    const item = cart.find(c => c.product.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeFromCart(productId);
    } else {
      updateCart();
    }
  }

  function getTotal() {
    return cart.reduce((sum, c) => sum + (c.product.price * c.qty), 0);
  }

  function getTotalItems() {
    return cart.reduce((sum, c) => sum + c.qty, 0);
  }

  function renderCart() {
    if (!cartBody) return;
    const isEmpty = cart.length === 0;
    if (cartEmpty)  cartEmpty.style.display  = isEmpty ? 'flex'  : 'none';
    if (cartFooter) cartFooter.style.display  = isEmpty ? 'none'  : 'block';

    cartBody.querySelectorAll('.cart-item').forEach(el => el.remove());

    if (!isEmpty) {
      cart.forEach(({ product, qty }) => {
        const subtotal = (product.price * qty).toFixed(2);
        const item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
          <div class="ci-icon cat-${product.cat}">
            <i class="${product.icon}"></i>
          </div>
          <div class="ci-info">
            <p class="ci-name">${product.name}</p>
            <p class="ci-price">GH₵ ${product.price.toFixed(2)} / ${product.unit}</p>
            <div class="ci-controls">
              <button class="ci-btn" data-action="dec" data-id="${product.id}">
                <i class="fas fa-minus"></i>
              </button>
              <span class="ci-qty">${qty}</span>
              <button class="ci-btn" data-action="inc" data-id="${product.id}">
                <i class="fas fa-plus"></i>
              </button>
              <button class="ci-btn remove" data-action="remove" data-id="${product.id}">
                <i class="fas fa-trash"></i>
              </button>
            </div>
          </div>
          <div class="ci-subtotal">GH₵ ${subtotal}</div>
        `;
        cartBody.appendChild(item);
      });

      cartBody.querySelectorAll('.ci-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const id     = parseInt(btn.dataset.id);
          const action = btn.dataset.action;
          if (action === 'inc')    changeQty(id, 1);
          if (action === 'dec')    changeQty(id, -1);
          if (action === 'remove') removeFromCart(id);
        });
      });
    }
  }

  function updateCart() {
    renderCart();
    const total = getTotal();
    const items = getTotalItems();

    if (cartCount) {
      cartCount.textContent    = items;
      cartCount.style.display  = items > 0 ? 'flex' : 'none';
    }

    if (cartTotal) cartTotal.textContent = `GH₵ ${total.toFixed(2)}`;

    if (floatingCta && fccText && fccPrice) {
      if (items > 0) {
        floatingCta.style.display = 'flex';
        fccText.textContent = `View Order (${items} item${items !== 1 ? 's' : ''})`;
        fccPrice.textContent = `GH₵ ${total.toFixed(2)}`;
      } else {
        floatingCta.style.display = 'none';
      }
    }
  }

  function bumpCount() {
    if (!cartCount) return;
    cartCount.classList.remove('bump');
    void cartCount.offsetWidth;
    cartCount.classList.add('bump');
  }

  clearBtn?.addEventListener('click', () => {
    if (cart.length === 0) return;
    if (confirm('Clear all items from your cart?')) {
      cart = [];
      updateCart();
      renderProducts(
        document.querySelector('.cat-tab.active')?.dataset.cat || 'all'
      );
    }
  });

  fccOpen?.addEventListener('click', openCart);
  /* ════════════════════════════════════════════════
     ORDER CONFIRMATION MODAL
  ════════════════════════════════════════════════ */
  const confirmModalOverlay = document.getElementById('confirm-modal-overlay');
  const confirmModal        = document.getElementById('confirm-modal');
  const cmCloseBtn          = document.getElementById('cm-close');
  const cmEditBtn           = document.getElementById('cm-edit-btn');
  const cmConfirmBtn        = document.getElementById('cm-confirm-btn');
  const cmItemsList         = document.getElementById('cm-items-list');
  const cmTotalItems        = document.getElementById('cm-total-items');
  const cmTotalPrice        = document.getElementById('cm-total-price');
  const cmBranchSelect      = document.getElementById('cm-branch-select');
  const cmBranchErr         = document.getElementById('cm-branch-err');

  function openConfirmModal() {
    if (!confirmModal || !confirmModalOverlay) return;

    // Render order items
    cmItemsList.innerHTML = '';
    cart.forEach(({ product, qty }) => {
      const subtotal = (product.price * qty).toFixed(2);
      const item = document.createElement('div');
      item.className = 'cm-item';
      item.innerHTML = `
        <div class="cm-item-icon">
          <i class="${product.icon}"></i>
        </div>
        <div class="cm-item-info">
          <p class="cm-item-name">${product.name}</p>
          <p class="cm-item-meta">Qty: ${qty} · ${product.unit}</p>
        </div>
        <span class="cm-item-price">GH₵ ${subtotal}</span>
      `;
      cmItemsList.appendChild(item);
    });

    // Update totals
    cmTotalItems.textContent = getTotalItems();
    cmTotalPrice.textContent = `GH₵ ${getTotal().toFixed(2)}`;

    // Reset branch selector
    cmBranchSelect.value = '';
    cmBranchSelect.classList.remove('err');
    cmBranchErr.textContent = '';

    // Show modal
    confirmModalOverlay.classList.add('show');
    confirmModal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeConfirmModal() {
    if (!confirmModal || !confirmModalOverlay) return;
    confirmModalOverlay.classList.remove('show');
    confirmModal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Close handlers
  cmCloseBtn?.addEventListener('click', closeConfirmModal);
  confirmModalOverlay?.addEventListener('click', closeConfirmModal);

  // Edit cart button — close modal & open cart
  cmEditBtn?.addEventListener('click', () => {
    closeConfirmModal();
    setTimeout(openCart, 300);
  });

  // Clear error on branch change
  cmBranchSelect?.addEventListener('change', () => {
    cmBranchSelect.classList.remove('err');
    cmBranchErr.textContent = '';
  });

  // Confirm & Send button
  cmConfirmBtn?.addEventListener('click', function() {
    var selectedBranch = cmBranchSelect.value;

    if (!selectedBranch) {
      cmBranchSelect.classList.add('err');
      cmBranchErr.textContent = '⚠️ Please select a branch to continue.';
      cmBranchSelect.focus();
      return;
    }

    // Generate unique Order ID
    var orderId = generateOrderId();

    var total = getTotal();
    var totalItems = getTotalItems();

    // Build order lines
    var lines = [];
    cart.forEach(function(item) {
      var subtotal = (item.product.price * item.qty).toFixed(2);
      lines.push('• ' + item.product.name + ' x' + item.qty + ' — GH₵ ' + subtotal + ' (' + item.product.unit + ')');
    });

    // Build WhatsApp message with Order ID
    var message = '🛒 *New Order — Allied Cold Store*\n';
    message += '\n';
    message += '📦 *Order ID: ' + orderId + '*\n';
    message += '\n';
    message += '🏪 *Branch: ' + selectedBranch + '*\n';
    message += '\n';
    message += '*Order Details:*\n';
    message += lines.join('\n') + '\n';
    message += '\n';
    message += '📊 *Items: ' + totalItems + '*\n';
    message += '*Total: GH₵ ' + total.toFixed(2) + '*\n';
    message += '\n';
    message += '📍 Please confirm my order and arrange pickup/delivery.\n';
    message += '\n';
    message += '_Order ID: ' + orderId + '_\n';
    message += '_Sent from alliedcoldstore.com_';

    // Save last order with Order ID
    var orderData = {
      orderId: orderId,
      items: cart.map(function(item) {
        return {
          id:    item.product.id,
          name:  item.product.name,
          price: item.product.price,
          unit:  item.product.unit,
          icon:  item.product.icon,
          cat:   item.product.cat,
          qty:   item.qty
        };
      }),
      total:  total,
      branch: selectedBranch,
      date:   new Date().toLocaleDateString('en-GH', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    };
    localStorage.setItem(ACS_ORDER, JSON.stringify(orderData));

    // Show Order ID toast before opening WhatsApp
    showOrderIdToast(orderId, totalItems, total);

    closeConfirmModal();
    closeCart();

    // Small delay so user sees the Order ID toast first
    setTimeout(function() {
      window.open(
        'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message),
        '_blank'
      );
    }, 800);
  });

  // ESC key closes modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && confirmModal?.classList.contains('show')) {
      closeConfirmModal();
    }
  });
  /* ════════════════════════════════════════════════
     BRANCH SELECTOR MODAL
     — waBtn listener lives HERE ONLY (not duplicated)
  ════════════════════════════════════════════════ */
  const branchModalOverlay = document.getElementById('branch-modal-overlay');
  const branchModal        = document.getElementById('branch-modal');
  const branchConfirm      = document.getElementById('branch-confirm');
  const branchCancel       = document.getElementById('branch-cancel');
  const branchErr          = document.getElementById('branch-err');
  const branchOptBtns      = document.querySelectorAll('.branch-opt-btn');

  let selectedBranch = '';

  function openBranchModal() {
    if (!branchModalOverlay || !branchModal) return;
    branchModalOverlay.style.display = 'block';
    branchModal.style.display        = 'block';
    document.body.style.overflow     = 'hidden';
    selectedBranch = '';
    if (branchErr) branchErr.textContent = '';
    branchOptBtns.forEach(b => {
      b.style.borderColor = 'var(--border)';
      b.style.background  = 'var(--bg-section)';
    });
  }

  function closeBranchModal() {
    if (!branchModalOverlay || !branchModal) return;
    branchModalOverlay.style.display = 'none';
    branchModal.style.display        = 'none';
    document.body.style.overflow     = '';
  }

  branchOptBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      branchOptBtns.forEach(b => {
        b.style.borderColor = 'var(--border)';
        b.style.background  = 'var(--bg-section)';
      });
      btn.style.borderColor = '#25d366';
      btn.style.background  = 'rgba(37,211,102,0.08)';
      selectedBranch = btn.dataset.branch;
      if (branchErr) branchErr.textContent = '';
    });
  });

  branchCancel?.addEventListener('click', closeBranchModal);
  branchModalOverlay?.addEventListener('click', closeBranchModal);

  branchConfirm?.addEventListener('click', () => {
    if (!selectedBranch) {
      if (branchErr) branchErr.textContent = 'Please select a branch to continue.';
      return;
    }

    const total = getTotal();
    const lines = cart.map(({ product, qty }) =>
      `• ${product.name} x${qty} — GH₵ ${(product.price * qty).toFixed(2)} (${product.unit})`
    );

    const message = [
      '🛒 *New Order — Allied Cold Store*',
      '',
      `🏪 *Branch: ${selectedBranch}*`,
      '',
      '*Order Details:*',
      ...lines,
      '',
      `*Total: GH₵ ${total.toFixed(2)}*`,
      '',
      '📍 Please confirm my order and arrange pickup/delivery.',
      '',
      '_Sent from alliedcoldstore.com_'
    ].join('\n');

    /* Save last order */
    const order = {
      items: cart.map(({ product, qty }) => ({
        id:    product.id,
        name:  product.name,
        price: product.price,
        unit:  product.unit,
        icon:  product.icon,
        cat:   product.cat,
        qty
      })),
      total:  getTotal(),
      branch: selectedBranch,
      date:   new Date().toLocaleDateString('en-GH', {
        day: 'numeric', month: 'short', year: 'numeric'
      })
    };
    localStorage.setItem(ACS_ORDER, JSON.stringify(order));

    closeBranchModal();
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  });

  /* ── waBtn listener — opens NEW confirmation modal ── */
  waBtn?.addEventListener('click', () => {
    if (cart.length === 0) return;
    openConfirmModal();
  });
  /* ════════════════════════════════════════════════
     CONTACT FORM VALIDATION
  ════════════════════════════════════════════════ */
  if (contactForm) {
    const fnEl = document.getElementById('fn');
    const fpEl = document.getElementById('fp');
    const fmEl = document.getElementById('fm');

    [fnEl, fpEl, fmEl].forEach(el => {
      el?.addEventListener('input', () => {
        el.classList.remove('err');
        const errEl = document.getElementById(`ferr-${el.id}`);
        if (errEl) errEl.textContent = '';
      });
    });

    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      let valid = true;

      if (!fnEl?.value.trim()) {
        setErr(fnEl, 'ferr-fn', 'Please enter your name.');
        valid = false;
      }

      const phone = fpEl?.value.trim().replace(/\s/g, '');
      if (!phone) {
        setErr(fpEl, 'ferr-fp', 'Please enter your phone number.');
        valid = false;
      } else if (phone.length < 10) {
        setErr(fpEl, 'ferr-fp', 'Enter a valid Ghanaian phone number.');
        valid = false;
      }

      if (!fmEl?.value.trim()) {
        setErr(fmEl, 'ferr-fm', 'Please enter your message.');
        valid = false;
      }

      if (valid) {
        contactForm.style.display = 'none';
        formSuccess?.classList.add('show');
        contactForm.reset();
        setTimeout(() => {
          formSuccess?.classList.remove('show');
          contactForm.style.display = 'flex';
        }, 9000);
      }
    });
  }

  function setErr(field, errId, msg) {
    field?.classList.add('err');
    const el = document.getElementById(errId);
    if (el) el.textContent = msg;
  }

  /* ════════════════════════════════════════════════
     SCROLL REVEAL ANIMATIONS
  ════════════════════════════════════════════════ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.af-item, .branch-card, .cic-item, .trust-item, .mini-card, ' +
    '.hq-branch, .story-img-wrap, .about-features, .test-card'
  ).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    revealObserver.observe(el);
  });

  /* ════════════════════════════════════════════════
     ACS REORDER SYSTEM
  ════════════════════════════════════════════════ */
  const acsOverlay    = document.getElementById('acs-overlay');
  const acsPopup      = document.getElementById('acs-popup');
  const acsSave       = document.getElementById('acs-save');
  const acsSkip       = document.getElementById('acs-skip');
  const acsNameEl     = document.getElementById('acs-name');
  const acsPhoneEl    = document.getElementById('acs-phone');
  const acsErrEl      = document.getElementById('acs-err');
  const acsBanner     = document.getElementById('acs-banner');
  const acsGreeting   = document.getElementById('acs-greeting');
  const acsOrderSum   = document.getElementById('acs-order-summary');
  const acsReorderBtn = document.getElementById('acs-reorder-btn');
  const acsCloseBtn   = document.getElementById('acs-close-btn');
  const acsOdDetails  = document.getElementById('acs-order-details');
  const acsOdInner    = document.getElementById('acs-od-inner');

  function acsShowPopup() {
    if (!acsPopup || !acsOverlay) return;
    acsOverlay.style.display     = 'block';
    acsPopup.style.display       = 'block';
    document.body.style.overflow = 'hidden';
  }

  function acsHidePopup() {
    if (!acsPopup || !acsOverlay) return;
    acsOverlay.style.display     = 'none';
    acsPopup.style.display       = 'none';
    document.body.style.overflow = '';
  }
  function acsShowBanner(customer, lastOrder) {
    if (!acsBanner) return;
    if (acsGreeting) {
      acsGreeting.textContent = 'Welcome back ' + customer.name + '! 👋';
    }
    if (acsOrderSum && lastOrder) {
      var count = lastOrder.items.reduce(function(s, i) { return s + i.qty; }, 0);
      var itemText = count !== 1 ? 's' : '';
      var orderIdText = lastOrder.orderId ? ' · ' + lastOrder.orderId : '';
      acsOrderSum.textContent = 'Last order: ' + count + ' item' + itemText + ' · GH₵ ' + lastOrder.total.toFixed(2) + ' · ' + lastOrder.date + orderIdText;
    }
    acsBanner.style.display = 'block';
    if (lastOrder) acsRenderDetails(lastOrder);
  }
  function acsRenderDetails(lastOrder) {
    if (!acsOdInner) return;
    acsOdInner.innerHTML = '';

    lastOrder.items.forEach(item => {
      const sub = (item.price * item.qty).toFixed(2);
      const el  = document.createElement('div');
      el.style.cssText = `
        display:flex;align-items:center;justify-content:space-between;
        gap:10px;padding:10px 12px;background:#ffffff;
        border:1px solid #e2e8f0;border-radius:12px;
      `;
      el.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;">
          <div style="
            width:36px;height:36px;border-radius:8px;
            background:#fff7ed;color:#f97316;
            display:flex;align-items:center;justify-content:center;
            font-size:0.9rem;flex-shrink:0;">
            <i class="${item.icon}"></i>
          </div>
          <div>
            <p style="font-family:'Fredoka',sans-serif;font-size:0.82rem;
              font-weight:700;color:#0f172a;margin-bottom:2px;">
              ${item.name}
            </p>
            <p style="font-size:0.72rem;color:#64748b;">
              Qty: ${item.qty} · ${item.unit}
            </p>
          </div>
        </div>
        <span style="font-family:'Fredoka',sans-serif;font-size:0.82rem;
          font-weight:800;color:#f97316;white-space:nowrap;">
          GH₵ ${sub}
        </span>
      `;
      acsOdInner.appendChild(el);
    });

    const totalEl = document.createElement('div');
    totalEl.style.cssText = `
      display:flex;align-items:center;justify-content:space-between;
      padding:10px 12px;background:#eff4ff;
      border:1px solid #dbeafe;border-radius:12px;
    `;
    totalEl.innerHTML = `
      <span style="font-family:'Fredoka',sans-serif;font-size:0.82rem;
        font-weight:700;color:#64748b;">Order Total</span>
      <strong style="font-family:'Fredoka',sans-serif;font-size:1rem;
        font-weight:900;color:#1a56db;">
        GH₵ ${lastOrder.total.toFixed(2)}
      </strong>
    `;
    acsOdInner.appendChild(totalEl);

    const actionsEl = document.createElement('div');
    actionsEl.style.cssText = 'display:flex;gap:10px;margin-top:4px;';
    actionsEl.innerHTML = `
      <button id="acs-do-reorder" style="
        flex:1;padding:12px;
        background:linear-gradient(135deg,#25d366,#128c4e);
        color:#ffffff;border:none;border-radius:999px;
        font-family:'Fredoka',sans-serif;font-size:0.82rem;
        font-weight:700;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:8px;
        box-shadow:0 3px 12px rgba(37,211,102,0.3);">
        <i class="fas fa-redo"></i> Reorder This
      </button>
      <button id="acs-do-browse" style="
        flex:1;padding:12px;background:#ffffff;color:#1a56db;
        border:2px solid #dbeafe;border-radius:999px;
        font-family:'Fredoka',sans-serif;font-size:0.82rem;
        font-weight:700;cursor:pointer;
        display:flex;align-items:center;justify-content:center;gap:8px;">
        <i class="fas fa-th"></i> Browse Menu
      </button>
    `;
    acsOdInner.appendChild(actionsEl);

    document.getElementById('acs-do-reorder')?.addEventListener('click', () => {
      cart = [];
      lastOrder.items.forEach(item => {
        const product = PRODUCTS.find(p => p.id === item.id);
        if (product) cart.push({ product, qty: item.qty });
      });
      updateCart();
      bumpCount();
      acsDismissBanner();
      setTimeout(openCart, 400);
      const menuSec = document.getElementById('menu');
      if (menuSec) {
        window.scrollTo({ top: menuSec.offsetTop - 80, behavior: 'smooth' });
      }
    });

    document.getElementById('acs-do-browse')?.addEventListener('click', () => {
      acsDismissBanner();
      const menuSec = document.getElementById('menu');
      if (menuSec) {
        window.scrollTo({ top: menuSec.offsetTop - 80, behavior: 'smooth' });
      }
    });
  }

  function acsDismissBanner() {
    if (acsBanner) acsBanner.style.display = 'none';
    localStorage.setItem(ACS_DISMISSED, 'true');
  }

  acsSave?.addEventListener('click', () => {
    const name  = acsNameEl?.value.trim();
    const phone = acsPhoneEl?.value.trim().replace(/\s/g, '');

    if (!name) {
      if (acsErrEl) acsErrEl.textContent = 'Please enter your name.';
      acsNameEl?.focus();
      return;
    }

    if (!phone || phone.length < 10) {
      if (acsErrEl) acsErrEl.textContent = 'Please enter a valid phone number.';
      acsPhoneEl?.focus();
      return;
    }

    localStorage.setItem(ACS_CUSTOMER, JSON.stringify({ name, phone }));

    const popupBody = acsPopup?.querySelector('div:last-child');
    if (popupBody) {
      popupBody.innerHTML = `
        <div style="
          display:flex;flex-direction:column;align-items:center;
          justify-content:center;gap:16px;padding:30px 20px;text-align:center;">
          <div style="
            width:70px;height:70px;
            background:linear-gradient(135deg,#25d366,#128c4e);
            border-radius:50%;display:flex;align-items:center;
            justify-content:center;font-size:2rem;
            box-shadow:0 8px 24px rgba(37,211,102,0.35);">✅</div>
          <div>
            <h3 style="font-family:'Fredoka',sans-serif;font-size:1.2rem;
              font-weight:900;color:#0f172a;margin-bottom:8px;">
              You're all set ${name}! 🎉
            </h3>
            <p style="font-size:0.82rem;color:#64748b;line-height:1.65;">
              Your details have been saved. We'll remember your orders next time!
            </p>
          </div>
          <button id="acs-start-btn" style="
            width:100%;padding:13px;
            background:linear-gradient(135deg,#f97316,#ea6c0a);
            color:#ffffff;border:none;border-radius:999px;
            font-family:'Fredoka',sans-serif;font-size:0.92rem;
            font-weight:700;cursor:pointer;
            box-shadow:0 4px 20px rgba(249,115,22,0.35);
            display:flex;align-items:center;justify-content:center;gap:8px;">
            🛒 Start Shopping
          </button>
        </div>
      `;
      document.getElementById('acs-start-btn')?.addEventListener('click', () => {
        acsHidePopup();
        const menuSec = document.getElementById('menu');
        if (menuSec) {
          window.scrollTo({ top: menuSec.offsetTop - 80, behavior: 'smooth' });
        }
      });
    }
  });

  acsSkip?.addEventListener('click', () => {
    localStorage.setItem(ACS_SKIPPED, 'true');
    acsHidePopup();
  });

  acsReorderBtn?.addEventListener('click', () => {
    if (!acsOdDetails) return;
    acsOdDetails.style.display =
      acsOdDetails.style.display === 'none' ? 'block' : 'none';
  });

  acsCloseBtn?.addEventListener('click', acsDismissBanner);

  /* ── ACS Init ── */
  (function acsInit() {
    const customer  = JSON.parse(localStorage.getItem(ACS_CUSTOMER) || 'null');
    const lastOrder = JSON.parse(localStorage.getItem(ACS_ORDER)    || 'null');
    const skipped   = localStorage.getItem(ACS_SKIPPED);
    const dismissed = localStorage.getItem(ACS_DISMISSED);

    if (customer && lastOrder && !dismissed) {
      setTimeout(() => acsShowBanner(customer, lastOrder), 1500);
      return;
    }

    if (!customer && !skipped) {
      setTimeout(acsShowPopup, 3000);
    }
  })();
  /* ════════════════════════════════════════════════
     WHOLESALE PRODUCTS RENDERING
  ════════════════════════════════════════════════ */
  var wholesaleGrid = document.getElementById('wholesale-grid');
  var wholesaleTabs = document.querySelectorAll('#wholesale-tabs .cat-tab');
  var currentWholesaleFilter = 'all';

  function renderWholesale(filter) {
    if (!wholesaleGrid) return;
    
    currentWholesaleFilter = filter || 'all';
    
    // Get wholesale products only
    var wholesaleProducts = PRODUCTS.filter(function(p) {
      return p.isWholesale === true;
    });
    
    // Apply category filter
    var filtered;
    if (currentWholesaleFilter === 'all') {
      filtered = wholesaleProducts;
    } else {
      filtered = wholesaleProducts.filter(function(p) {
        return p.cat === currentWholesaleFilter;
      });
    }
    
    wholesaleGrid.innerHTML = '';
    
    if (filtered.length === 0) {
      var noResults = document.createElement('div');
      noResults.className = 'no-results';
      noResults.innerHTML = '<div class="no-results-icon"><i class="fas fa-box-open"></i></div><h4>No wholesale products in this category</h4><p>Please check other categories or contact us for custom orders.</p>';
      wholesaleGrid.appendChild(noResults);
      return;
    }
    
    filtered.forEach(function(prod, i) {
      var card = document.createElement('div');
      card.className = 'prod-card reveal';
      card.style.transitionDelay = (i % 4) * 0.07 + 's';
      card.dataset.id = prod.id;
      
      var inCart = cart.find(function(c) { return c.product.id === prod.id; });
      var btnText = inCart ? 'Added' : 'Add to Cart';
      var btnClass = inCart ? 'pc-add-btn added' : 'pc-add-btn';
      
      var cardHTML = '';
      cardHTML += '<div class="pc-img ' + (!prod.inStock ? 'pc-img-oos' : '') + '">';
      
      if (prod.image) {
        cardHTML += '<img src="' + prod.image + '" alt="' + prod.name + '" loading="lazy" style="width:100%;height:100%;object-fit:cover;display:block;" />';
      } else {
        // Use sticker emoji as placeholder
        cardHTML += '<span style="font-size:inherit;">' + prod.icon + '</span>';
      }
      
      if (prod.badge && prod.inStock) {
        cardHTML += '<span class="pc-badge ' + prod.badgeClass + '">' + prod.badge + '</span>';
      }
      
      if (!prod.inStock) {
        cardHTML += '<div class="pc-oos-overlay"><div class="pc-oos-inner"><i class="fas fa-times-circle"></i><span>Out of Stock</span></div></div>';
      }
      
      cardHTML += '</div>';
      cardHTML += '<div class="pc-body">';
      cardHTML += '<p class="pc-name">' + prod.name + '</p>';
      cardHTML += '<p class="pc-desc">' + prod.desc + '</p>';
      
      // Wholesale price with savings
      cardHTML += '<div class="pc-price pc-wholesale-price">';
      cardHTML += '<span>GH₵ ' + prod.price.toFixed(2) + '</span>';
      if (prod.originalPrice) {
        cardHTML += '<span class="pc-original-price">Was GH₵ ' + prod.originalPrice.toFixed(2) + '</span>';
      }
      cardHTML += '<small class="pc-unit-label">📦 ' + prod.unit + '</small>';
      if (prod.savings) {
        cardHTML += '<span class="pc-savings-badge">💰 Save ' + prod.savings + '%</span>';
      }
      cardHTML += '</div>';
      
      if (prod.inStock) {
        cardHTML += '<div class="pc-actions">';
        cardHTML += '<div class="pc-qty-selector" data-id="' + prod.id + '">';
        cardHTML += '<button class="pc-qty-btn pc-qty-minus" data-id="' + prod.id + '" aria-label="Decrease quantity"><i class="fas fa-minus"></i></button>';
        cardHTML += '<input type="number" class="pc-qty-input" data-id="' + prod.id + '" value="1" min="1" max="99" aria-label="Quantity" />';
        cardHTML += '<button class="pc-qty-btn pc-qty-plus" data-id="' + prod.id + '" aria-label="Increase quantity"><i class="fas fa-plus"></i></button>';
        cardHTML += '</div>';
        cardHTML += '<button class="' + btnClass + '" data-id="' + prod.id + '"><i class="fas fa-shopping-basket"></i> ' + btnText + '</button>';
        cardHTML += '</div>';
      } else {
        cardHTML += '<button class="pc-add-btn pc-oos-btn" disabled><i class="fas fa-times"></i> Out of Stock</button>';
      }
      
      cardHTML += '</div>';
      
      card.innerHTML = cardHTML;
      wholesaleGrid.appendChild(card);
    });
    
    // Animate reveal
    wholesaleGrid.querySelectorAll('.reveal').forEach(function(el) {
      revealObserver.observe(el);
    });
    
    // Add to Cart button handlers
    wholesaleGrid.querySelectorAll('.pc-add-btn:not([disabled])').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = parseInt(btn.dataset.id);
        var qtyInput = wholesaleGrid.querySelector('.pc-qty-input[data-id="' + id + '"]');
        var qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
        if (id) addToCart(id, qty);
      });
    });
    
    // Quantity minus button handlers
    wholesaleGrid.querySelectorAll('.pc-qty-minus').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.dataset.id;
        var input = wholesaleGrid.querySelector('.pc-qty-input[data-id="' + id + '"]');
        if (input) {
          var val = parseInt(input.value) || 1;
          if (val > 1) {
            input.value = val - 1;
            input.classList.add('bumped');
            setTimeout(function() { input.classList.remove('bumped'); }, 200);
          }
        }
      });
    });
    
    // Quantity plus button handlers
    wholesaleGrid.querySelectorAll('.pc-qty-plus').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var id = btn.dataset.id;
        var input = wholesaleGrid.querySelector('.pc-qty-input[data-id="' + id + '"]');
        if (input) {
          var val = parseInt(input.value) || 1;
          if (val < 99) {
            input.value = val + 1;
            input.classList.add('bumped');
            setTimeout(function() { input.classList.remove('bumped'); }, 200);
          }
        }
      });
    });
    
    // Validate quantity input
    wholesaleGrid.querySelectorAll('.pc-qty-input').forEach(function(input) {
      input.addEventListener('input', function() {
        var val = parseInt(input.value) || 1;
        if (val < 1) val = 1;
        if (val > 99) val = 99;
        input.value = val;
      });
      
      input.addEventListener('blur', function() {
        if (!input.value || parseInt(input.value) < 1) {
          input.value = 1;
        }
      });
    });
  }
  
  // Wholesale tab handlers
  wholesaleTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      wholesaleTabs.forEach(function(t) { t.classList.remove('active'); });
      tab.classList.add('active');
      renderWholesale(tab.dataset.wcat);
    });
  });
/* ════════════════════════════════════════════════
     INIT — Render products & cart on load
  ════════════════════════════════════════════════ */
  renderProducts('all', '');
  renderWholesale('all');                              /* ← NEW LINE ADDED */
  updateCart();
  if (cartCount) cartCount.style.display = 'none';

  console.log('🐔 Allied Cold Store — Ready!');

}); // end DOMContentLoaded