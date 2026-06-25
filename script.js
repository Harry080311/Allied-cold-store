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
  const WA_NUMBER     = '233542559031';
  const ACS_CUSTOMER  = 'acs-customer';
  const ACS_ORDER     = 'acs-last-order';
  const ACS_SKIPPED   = 'acs-skipped';
  const ACS_DISMISSED = 'acs-dismissed';

  /* ════════════════════════════════════════════════
     PAGE LOADER — wrapped in try/catch so any
     error below never keeps the loader stuck
  ════════════════════════════════════════════════ */
  const pageLoader = document.getElementById('page-loader');

  function hideLoader() {
    if (!pageLoader) return;
    pageLoader.classList.add('hide');
    setTimeout(() => {
      if (pageLoader.parentNode) pageLoader.remove();
    }, 700);
  }

  // Safety net: always hide loader after 4 seconds no matter what
  const loaderSafetyTimeout = setTimeout(hideLoader, 4000);

  if (document.readyState === 'complete') {
    clearTimeout(loaderSafetyTimeout);
    setTimeout(hideLoader, 1500);
  } else {
    window.addEventListener('load', () => {
      clearTimeout(loaderSafetyTimeout);
      setTimeout(hideLoader, 1500);
    });
  }

  /* ════════════════════════════════════════════════
     PRODUCT DATABASE
  ════════════════════════════════════════════════ */
  const PRODUCTS = [
    {
      id: 1, cat: 'chicken',
      name: 'Whole Frozen Chicken',
      desc: 'Grade-A whole bird, perfectly cleaned and flash-frozen. The family favourite.',
      price: 200.00, unit: 'per bird (~1.5kg)', icon: 'fas fa-drumstick-bite',
      image: 'https://i.ibb.co/tpGk2ZgY/frozen-whole-chicken.jpg',
      badge: '⭐ Best Seller', badgeClass: '', inStock: true
    },
    {
      id: 2, cat: 'chicken',
      name: 'Chicken Thighs (1kg)',
      desc: 'Juicy, tender chicken thighs — perfect for stews, grilling, and frying.',
      price: 99.99, unit: 'per 1kg pack', icon: 'fas fa-drumstick-bite',
      image: 'https://i.ibb.co/gL68Hdp9/Chicken-Thighs-1kg.jpg',
      badge: 'Popular', badgeClass: 'badge-blue', inStock: true
    },
    {
      id: 3, cat: 'chicken',
      name: 'Chicken Wings (1kg)',
      desc: 'Crispy wings, great for parties and everyday cooking. Always in stock.',
      price: 299.99, unit: 'per 1kg pack', icon: 'fas fa-drumstick-bite',
      image: 'https://i.ibb.co/mrCzXVs4/Chicken-Wings-1kg.jpg',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 4, cat: 'chicken',
      name: 'Chicken Legs (1kg)',
      desc: 'Full chicken legs — a household staple and the most versatile cut we carry.',
      price: 195.00, unit: 'per 1kg pack', icon: 'fas fa-drumstick-bite',
      image: 'https://i.ibb.co/23bpDngB/Chicken-Legs-1kg.png',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 5, cat: 'chicken',
      name: 'Chicken Gizzards (1kg)',
      desc: 'Premium gizzards, cleaned and ready to cook. A Ghanaian favourite.',
      price: 175.00, unit: 'per 1kg pack', icon: 'fas fa-drumstick-bite',
      image: 'https://i.ibb.co/ZpJWQrvM/Chicken-gizzard-1kg.jpg',
      badge: 'Fan Favourite', badgeClass: 'badge-green', inStock: true
    },
    {
      id: 6, cat: 'chicken',
      name: 'Chicken Breast (1kg)',
      desc: 'Lean, healthy chicken breast. Ideal for grilling and clean eating.',
      price: 285.00, unit: 'per 1kg pack', icon: 'fas fa-drumstick-bite',
      image: 'https://i.ibb.co/wrgxhSVJ/images.jpg',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 7, cat: 'chicken',
      name: 'Chicken Feet (1kg)',
      desc: 'Perfectly cleaned chicken feet. Great for soups and traditional dishes.',
      price: 89.00, unit: 'per 1kg pack', icon: 'fas fa-drumstick-bite',
      image: 'https://i.ibb.co/B2JbDJw7/download.jpg',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 8, cat: 'chicken',
      name: 'Mixed Chicken Parts (2kg)',
      desc: 'A great mix of assorted chicken parts — perfect for large family meals.',
      price: 249.99, unit: 'per 2kg pack', icon: 'fas fa-drumstick-bite',
      image: 'https://i.ibb.co/G3GGr2PJ/download.jpg',
      badge: 'Value Pack', badgeClass: 'badge-blue', inStock: true
    },
    {
      id: 9, cat: 'meats',
      name: 'Beef Stew Cuts (1kg)',
      desc: 'Tender beef cuts, ready for your pot. Perfectly frozen to lock in flavour.',
      price: 65.00, unit: 'per 1kg pack', icon: 'fas fa-bacon',
      image: 'https://i.ibb.co/tTK80D3Q/download.jpg',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 10, cat: 'meats',
      name: 'Beef Offal (1kg)',
      desc: 'Mixed beef offal — tripe, liver, kidney. A traditional delicacy.',
      price: 42.00, unit: 'per 1kg pack', icon: 'fas fa-bacon',
      image: 'https://i.ibb.co/xS4C5sFm/download.jpg',
      badge: null, badgeClass: '', inStock: false
    },
    {
      id: 11, cat: 'meats',
      name: 'Pork Cuts (1kg)',
      desc: 'Premium frozen pork, great for grilling, stewing, and frying.',
      price: 58.00, unit: 'per 1kg pack', icon: 'fas fa-bacon',
      image: 'https://i.ibb.co/35dnqvwB/download.jpg',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 12, cat: 'meats',
      name: 'Mixed Meat Pack (2kg)',
      desc: 'A variety pack with chicken, beef and pork. Great for households and events.',
      price: 110.00, unit: 'per 2kg pack', icon: 'fas fa-bacon',
      image: 'https://i.ibb.co/1Y2WPb84/download.jpg',
      badge: 'Value Pack', badgeClass: 'badge-blue', inStock: true
    },
    {
      id: 13, cat: 'fish',
      name: 'Whole Tilapia (1kg)',
      desc: 'Fresh tilapia, cleaned and frozen. Ghana\'s most loved fish.',
      price: 40.00, unit: 'per 1kg', icon: 'fas fa-fish',
      image: 'https://i.ibb.co/q3vBKgdQ/download.jpg',
      badge: 'Popular', badgeClass: 'badge-blue', inStock: true
    },
    {
      id: 14, cat: 'fish',
      name: 'Mackerel / Titus (1kg)',
      desc: 'Classic Titus mackerel — perfect for stews, frying, and grilling.',
      price: 35.00, unit: 'per 1kg', icon: 'fas fa-fish',
      image: 'https://i.ibb.co/mVvHfN9G/download.jpg',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 15, cat: 'fish',
      name: 'Catfish (1kg)',
      desc: 'Premium frozen catfish. A staple for soups, pepper soups, and stews.',
      price: 45.00, unit: 'per 1kg', icon: 'fas fa-fish',
      image: 'https://i.ibb.co/Vn0MZ2H/download.jpg',
      badge: null, badgeClass: '', inStock: false
    },
    {
      id: 16, cat: 'fish',
      name: 'Herrings / Keta School Boys',
      desc: 'Delicious herrings — smoked and frozen for that authentic flavour.',
      price: 28.00, unit: 'per pack', icon: 'fas fa-fish',
      image: 'https://i.ibb.co/p6v6jpXF/download.jpg',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 17, cat: 'icecream',
      name: 'Vanilla Ice Cream (2L)',
      desc: 'Creamy, classic vanilla. A crowd-pleaser for any occasion.',
      price: 45.00, unit: 'per 2L tub', icon: 'fas fa-ice-cream',
      image: 'https://i.ibb.co/p6gBHT6G/download.jpg',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 18, cat: 'icecream',
      name: 'Chocolate Ice Cream (2L)',
      desc: 'Rich chocolate ice cream — everyone\'s second favourite.',
      price: 45.00, unit: 'per 2L tub', icon: 'fas fa-ice-cream',
      image: 'https://i.ibb.co/xS390Zf1/download.jpg',
      badge: 'Popular', badgeClass: 'badge-purple', inStock: true
    },
    {
      id: 19, cat: 'icecream',
      name: 'Strawberry Ice Cream (2L)',
      desc: 'Light, fruity strawberry ice cream. Great for kids and families.',
      price: 45.00, unit: 'per 2L tub', icon: 'fas fa-ice-cream',
      image: 'https://i.ibb.co/9mtTdXX5/download.jpg',
      badge: null, badgeClass: '', inStock: true
    },
    {
      id: 20, cat: 'icecream',
      name: 'Bulk Ice Cream (5L)',
      desc: 'Perfect for parties, events, and celebrations. Multiple flavours available.',
      price: 100.00, unit: 'per 5L tub', icon: 'fas fa-ice-cream',
      image: 'https://i.ibb.co/Y75qnPG7/download.jpg',
      badge: 'Event Size', badgeClass: 'badge-purple', inStock: true
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
     NAV SEARCH SYSTEM
  ════════════════════════════════════════════════ */
  const navSearchBtn      = document.getElementById('nav-search-btn');
  const navSearchBox      = document.getElementById('nav-search-box');
  const navSearchInput    = document.getElementById('nav-search-input');
  const navSearchClear    = document.getElementById('nav-search-clear');
  const navSearchDropdown = document.getElementById('nav-search-dropdown');
  const nsdInner          = document.getElementById('nsd-inner');

  let navSearchOpen = false;

  function openNavSearch() {
    navSearchOpen = true;
    navSearchBox?.classList.add('open');
    navSearchBtn?.classList.add('active');
    setTimeout(() => navSearchInput?.focus(), 400);
  }

  function closeNavSearch() {
    navSearchOpen = false;
    navSearchBox?.classList.remove('open');
    navSearchBtn?.classList.remove('active');
    navSearchDropdown?.classList.remove('show');
    if (navSearchInput) navSearchInput.value = '';
    navSearchClear?.classList.remove('show');
    if (nsdInner) nsdInner.innerHTML = '';
  }

  navSearchBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    navSearchOpen ? closeNavSearch() : openNavSearch();
  });

  document.addEventListener('click', (e) => {
    const wrap = document.getElementById('nav-search-wrap');
    if (wrap && !wrap.contains(e.target)) closeNavSearch();
  });

  navSearchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNavSearch();
  });

  navSearchClear?.addEventListener('click', () => {
    if (navSearchInput) navSearchInput.value = '';
    navSearchClear.classList.remove('show');
    navSearchDropdown?.classList.remove('show');
    if (nsdInner) nsdInner.innerHTML = '';
    navSearchInput?.focus();
  });

  navSearchInput?.addEventListener('input', function () {
    const term = this.value.trim();
    if (term.length > 0) {
      navSearchClear?.classList.add('show');
      const results = PRODUCTS.filter(p => {
        const name = p.name.toLowerCase();
        const desc = p.desc.toLowerCase();
        const q    = term.toLowerCase();
        return name.includes(q) || desc.includes(q);
      }).slice(0, 6);
      renderNavResults(results, term);
    } else {
      navSearchClear?.classList.remove('show');
      navSearchDropdown?.classList.remove('show');
      if (nsdInner) nsdInner.innerHTML = '';
    }
  });

  function renderNavResults(results, term) {
    if (!nsdInner) return;
    nsdInner.innerHTML = '';
    navSearchDropdown?.classList.add('show');

    const hdr = document.createElement('div');
    hdr.className = 'nsd-header';
    hdr.innerHTML = `
      <span>Search Results</span>
      <span class="nsd-count">${results.length} found</span>
    `;
    nsdInner.appendChild(hdr);

    if (results.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'nsd-empty';
      empty.innerHTML = `
        <i class="fas fa-search"></i>
        <p>No products found</p>
        <span>Try a different search term</span>
      `;
      nsdInner.appendChild(empty);
      return;
    }

    results.forEach(product => {
      const inCart = cart.find(c => c.product.id === product.id);
      const regex  = new RegExp(
        `(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi'
      );
      const highlightedName = product.name.replace(
        regex, '<span class="nsd-highlight">$1</span>'
      );

      const item = document.createElement('div');
      item.className = 'nsd-item';
      item.innerHTML = `
        <div class="nsd-item-icon nsd-icon-${product.cat}">
          <i class="${product.icon}"></i>
        </div>
        <div class="nsd-item-info">
          <p class="nsd-item-name">${highlightedName}</p>
          <span class="nsd-item-cat">${product.cat}</span>
        </div>
        <span class="nsd-item-price">GH₵ ${product.price.toFixed(2)}</span>
        <button class="nsd-add-btn ${inCart ? 'added' : ''}"
                data-id="${product.id}" aria-label="Add to cart">
          <i class="fas fa-${inCart ? 'check' : 'plus'}"></i>
        </button>
      `;

      item.addEventListener('click', (e) => {
        if (e.target.closest('.nsd-add-btn')) return;
        catTabs.forEach(t => t.classList.remove('active'));
        const matchTab = document.querySelector(
          `.cat-tab[data-cat="${product.cat}"]`
        );
        if (matchTab) matchTab.classList.add('active');
        renderProducts(product.cat, product.name);
        const menuSection = document.getElementById('menu');
        if (menuSection) {
          const off = (header?.offsetHeight || 64) + 80;
          window.scrollTo({ top: menuSection.offsetTop - off, behavior: 'smooth' });
        }
        closeNavSearch();
      });

      const addBtn = item.querySelector('.nsd-add-btn');
      addBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product.id);
        addBtn.classList.add('added');
        addBtn.innerHTML = '<i class="fas fa-check"></i>';
        setTimeout(() => {
          addBtn.innerHTML = '<i class="fas fa-plus"></i>';
          addBtn.classList.remove('added');
        }, 1500);
      });

      nsdInner.appendChild(item);
    });

    if (results.length > 0) {
      const footer = document.createElement('div');
      footer.className = 'nsd-footer';
      footer.innerHTML = `
        <button class="nsd-footer-btn" id="nsd-view-all">
          <i class="fas fa-th"></i>
          View all results in menu
          <i class="fas fa-arrow-right"></i>
        </button>
      `;
      nsdInner.appendChild(footer);

      footer.querySelector('#nsd-view-all')?.addEventListener('click', () => {
        const t = navSearchInput?.value.trim() || '';
        catTabs.forEach(t => t.classList.remove('active'));
        document.querySelector('.cat-tab[data-cat="all"]')?.classList.add('active');
        renderProducts('all', t);
        const menuSection = document.getElementById('menu');
        if (menuSection) {
          const off = (header?.offsetHeight || 64) + 80;
          window.scrollTo({ top: menuSection.offsetTop - off, behavior: 'smooth' });
        }
        closeNavSearch();
      });
    }
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
    let results = PRODUCTS;
    if (categoryFilter !== 'all') {
      results = results.filter(p => p.cat === categoryFilter);
    }
    if (!search || search.trim() === '') return results;
    const scored = results.map(product => ({
      product,
      score: getMatchScore(product, search)
    }));
    const matches = scored.filter(item => item.score > 0);
    matches.sort((a, b) => b.score - a.score);
    return matches.map(item => item.product);
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
      const btnText = inCart ? 'Added' : 'Add to Order';
      const btnClass = inCart ? 'pc-add-btn added' : 'pc-add-btn';

      card.innerHTML = `
        <div class="pc-img pc-img-${prod.cat} ${!prod.inStock ? 'pc-img-oos' : ''}">
          ${prod.image
            ? `<img src="${prod.image}" alt="${prod.name}" loading="lazy"
                    style="width:100%;height:100%;object-fit:cover;display:block;" />`
            : `<i class="${prod.icon}"></i>`
          }
          ${prod.badge && prod.inStock
            ? `<span class="pc-badge ${prod.badgeClass}">${prod.badge}</span>`
            : ''
          }
          ${!prod.inStock ? `
            <div class="pc-oos-overlay">
              <div class="pc-oos-inner">
                <i class="fas fa-times-circle"></i>
                <span>Out of Stock</span>
              </div>
            </div>` : ''
          }
        </div>
        <div class="pc-body">
          <p class="pc-name">${prod.name}</p>
          <p class="pc-desc">${prod.desc}</p>
          <div class="pc-price-row">
            <div class="pc-price">
              GH₵ ${prod.price.toFixed(2)}
              <small class="pc-unit-label">📦 ${prod.unit}</small>
            </div>
            ${prod.inStock
              ? `<button class="${btnClass}" data-id="${prod.id}">
                   <i class="fas fa-plus"></i>
                   ${btnText}
                 </button>`
              : `<button class="pc-add-btn pc-oos-btn" disabled>
                   <i class="fas fa-times"></i>
                   Out of Stock
                 </button>`
            }
          </div>
        </div>
      `;

      productGrid.appendChild(card);
    });

    productGrid.querySelectorAll('.reveal').forEach(el =>
      revealObserver.observe(el)
    );

    productGrid.querySelectorAll('.pc-add-btn:not([disabled])').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        if (id) addToCart(id);
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

  function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !product.inStock) return;

    const existing = cart.find(c => c.product.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ product, qty: 1 });
    }

    updateCart();
    bumpCount();

    const btn = productGrid?.querySelector(
      `.pc-add-btn[data-id="${productId}"]`
    );
    if (btn) {
      btn.classList.add('added');
      btn.innerHTML = '<i class="fas fa-check"></i> Added';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-plus"></i> Add More';
        btn.style.pointerEvents = 'auto';
      }, 1200);
    }

    if (cart.length === 1) setTimeout(openCart, 500);
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

  /* ── Single waBtn listener — opens branch modal ── */
  waBtn?.addEventListener('click', () => {
    if (cart.length === 0) return;
    openBranchModal();
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
      acsGreeting.textContent = `Welcome back ${customer.name}! 👋`;
    }
    if (acsOrderSum && lastOrder) {
      const count = lastOrder.items.reduce((s, i) => s + i.qty, 0);
      acsOrderSum.textContent =
        `Last order: ${count} item${count !== 1 ? 's' : ''} · ` +
        `GH₵ ${lastOrder.total.toFixed(2)} · ${lastOrder.date}`;
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
     INIT — Render products & cart on load
  ════════════════════════════════════════════════ */
  renderProducts('all', '');
  updateCart();
  if (cartCount) cartCount.style.display = 'none';

  console.log('🐔 Allied Cold Store — Ready!');

}); // end DOMContentLoaded