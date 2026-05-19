/**
 * ═══════════════════════════════════════════════════
 * ALLIED COLD STORE — script.js
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
 * ═══════════════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ────────────────────────────────────────────────
     WHATSAPP PHONE NUMBER
     Change this to the actual WhatsApp number.
     Format: country code + number (no + sign, no spaces)
  ──────────────────────────────────────────────── */
  const WA_NUMBER = '233542559031';

  /* ────────────────────────────────────────────────
     PRODUCT DATABASE
     To add/edit products, simply change this array.
     Categories: 'chicken' | 'meats' | 'fish' | 'icecream'
  ──────────────────────────────────────────────── */
  const PRODUCTS = [
    // ── CHICKEN (primary category) ──
    {
  id: 1,
  cat: 'chicken',
  name: 'Whole Frozen Chicken',
  desc: 'Grade-A whole bird, perfectly cleaned and flash-frozen. The family favourite.',
  price: 200.00,
  unit: 'per bird (~1.5kg)',
  icon: 'fas fa-drumstick-bite',
  image: 'https://i.ibb.co/tpGk2ZgY/frozen-whole-chicken.jpg',
  badge: '⭐ Best Seller',
  badgeClass: ''
},
    {
  id: 2,
  cat: 'chicken',
  name: 'Chicken Thighs (1kg)',
  desc: 'Juicy, tender chicken thighs — perfect for stews, grilling, and frying.',
  price: 99.99,
  unit: 'per 1kg pack',
  icon: 'fas fa-drumstick-bite',
  image: 'https://i.ibb.co/gL68Hdp9/Chicken-Thighs-1kg.jpg',
  badge: 'Popular',
  badgeClass: 'badge-blue'
},
    {
  id: 3,
  cat: 'chicken',
  name: 'Chicken Wings (1kg)',
  desc: 'Crispy wings, great for parties and everyday cooking. Always in stock.',
  price: 299.99,
  unit: 'per 1kg pack',
  icon: 'fas fa-drumstick-bite',
  image: 'https://i.ibb.co/mrCzXVs4/Chicken-Wings-1kg.jpg',
  badge: null,
  badgeClass: ''
},
{
  id: 4,
  cat: 'chicken',
  name: 'Chicken Legs (1kg)',
  desc: 'Full chicken legs — a household staple and the most versatile cut we carry.',
  price: 195.00,
  unit: 'per 1kg pack',
  icon: 'fas fa-drumstick-bite',
  image: 'https://i.ibb.co/23bpDngB/Chicken-Legs-1kg.png',
  badge: null,
  badgeClass: ''
},{
  id: 5,
  cat: 'chicken',
  name: 'Chicken Gizzards (1kg)',
  desc: 'Premium gizzards, cleaned and ready to cook. A Ghanaian favourite.',
  price: 175.00,
  unit: 'per 1kg pack',
  icon: 'fas fa-drumstick-bite',
  image: 'https://i.ibb.co/ZpJWQrvM/Chicken-gizzard-1kg.jpg',
  badge: 'Fan Favourite',
  badgeClass: 'badge-green'
},     {
  id: 6,
  cat: 'chicken',
  name: 'Chicken Breast (1kg)',
  desc: 'Lean, healthy chicken breast. Ideal for grilling and clean eating.',
  price: 285.00,
  unit: 'per 1kg pack',
  icon: 'fas fa-drumstick-bite',
  image: 'https://i.ibb.co/wrgxhSVJ/images.jpg',
  badge: null,
  badgeClass: ''
},   {
  id: 7,
  cat: 'chicken',
  name: 'Chicken Feet (1kg)',
  desc: 'Perfectly cleaned chicken feet. Great for soups and traditional dishes.',
  price: 89.00,
  unit: 'per 1kg pack',
  icon: 'fas fa-drumstick-bite',
  image: 'https://i.ibb.co/B2JbDJw7/download.jpg',
  badge: null,
  badgeClass: ''
},   {
  id: 8,
  cat: 'chicken',
  name: 'Mixed Chicken Parts (2kg)',
  desc: 'A great mix of assorted chicken parts — perfect for large family meals.',
  price: 249.99,
  unit: 'per 2kg pack',
  icon: 'fas fa-drumstick-bite',
  image: 'https://i.ibb.co/G3GGr2PJ/download.jpg',
  badge: 'Value Pack',
  badgeClass: 'badge-blue'
},
    // ── MEATS ──
    {
  id: 9,
  cat: 'meats',
  name: 'Beef Stew Cuts (1kg)',
  desc: 'Tender beef cuts, ready for your pot. Perfectly frozen to lock in flavour.',
  price: 65.00,
  unit: 'per 1kg pack',
  icon: 'fas fa-bacon',
  image: 'https://i.ibb.co/tTK80D3Q/download.jpg',
  badge: null,
  badgeClass: ''
},

   {
  id: 10,
  cat: 'meats',
  name: 'Beef Offal (1kg)',
  desc: 'Mixed beef offal — tripe, liver, kidney. A traditional delicacy.',
  price: 42.00,
  unit: 'per 1kg pack',
  icon: 'fas fa-bacon',
  image: 'https://i.ibb.co/xS4C5sFm/download.jpg',
  badge: null,
  badgeClass: ''
},
   {
  id: 11,
  cat: 'meats',
  name: 'Pork Cuts (1kg)',
  desc: 'Premium frozen pork, great for grilling, stewing, and frying.',
  price: 58.00,
  unit: 'per 1kg pack',
  icon: 'fas fa-bacon',
  image: 'https://i.ibb.co/35dnqvwB/download.jpg',
  badge: null,
  badgeClass: ''
},
   {
  id: 12,
  cat: 'meats',
  name: 'Mixed Meat Pack (2kg)',
  desc: 'A variety pack with chicken, beef and pork. Great for households and events.',
  price: 110.00,
  unit: 'per 2kg pack',
  icon: 'fas fa-bacon',
  image: 'https://i.ibb.co/1Y2WPb84/download.jpg',
  badge: 'Value Pack',
  badgeClass: 'badge-blue'
},

    // ── FISH ──
   {
  id: 13,
  cat: 'fish',
  name: 'Whole Tilapia (1kg)',
  desc: 'Fresh tilapia, cleaned and frozen. Ghana\'s most loved fish.',
  price: 40.00,
  unit: 'per 1kg',
  icon: 'fas fa-fish',
  image: 'https://i.ibb.co/q3vBKgdQ/download.jpg',
  badge: 'Popular',
  badgeClass: 'badge-blue'
},    {
  id: 14,
  cat: 'fish',
  name: 'Mackerel / Titus (1kg)',
  desc: 'Classic Titus mackerel — perfect for stews, frying, and grilling.',
  price: 35.00,
  unit: 'per 1kg',
  icon: 'fas fa-fish',
  image: 'https://i.ibb.co/mVvHfN9G/download.jpg',
  badge: null,
  badgeClass: ''
},
   {
  id: 15,
  cat: 'fish',
  name: 'Catfish (1kg)',
  desc: 'Premium frozen catfish. A staple for soups, pepper soups, and stews.',
  price: 45.00,
  unit: 'per 1kg',
  icon: 'fas fa-fish',
  image: 'https://i.ibb.co/Vn0MZ2H/download.jpg',
  badge: null,
  badgeClass: ''
},
   {
  id: 16,
  cat: 'fish',
  name: 'Herrings / Keta School Boys',
  desc: 'Delicious herrings — smoked and frozen for that authentic flavour.',
  price: 28.00,
  unit: 'per pack',
  icon: 'fas fa-fish',
  image: 'https://i.ibb.co/p6v6jpXF/download.jpg',
  badge: null,
  badgeClass: ''
},
    // ── ICE CREAM ──
    {
  id: 17,
  cat: 'icecream',
  name: 'Vanilla Ice Cream (2L)',
  desc: 'Creamy, classic vanilla. A crowd-pleaser for any occasion.',
  price: 45.00,
  unit: 'per 2L tub',
  icon: 'fas fa-ice-cream',
  image: 'https://i.ibb.co/p6gBHT6G/download.jpg',
  badge: null,
  badgeClass: ''
},    {
  id: 18,
  cat: 'icecream',
  name: 'Chocolate Ice Cream (2L)',
  desc: 'Rich chocolate ice cream — everyone\'s second favourite.',
  price: 45.00,
  unit: 'per 2L tub',
  icon: 'fas fa-ice-cream',
  image: 'https://i.ibb.co/xS390Zf1/download.jpg',
  badge: 'Popular',
  badgeClass: 'badge-purple'
},    {
  id: 19,
  cat: 'icecream',
  name: 'Strawberry Ice Cream (2L)',
  desc: 'Light, fruity strawberry ice cream. Great for kids and families.',
  price: 45.00,
  unit: 'per 2L tub',
  icon: 'fas fa-ice-cream',
  image: 'https://i.ibb.co/9mtTdXX5/download.jpg',
  badge: null,
  badgeClass: ''
},
   {
  id: 20,
  cat: 'icecream',
  name: 'Bulk Ice Cream (5L)',
  desc: 'Perfect for parties, events, and celebrations. Multiple flavours available.',
  price: 100.00,
  unit: 'per 5L tub',
  icon: 'fas fa-ice-cream',
  image: 'https://i.ibb.co/Y75qnPG7/download.jpg',
  badge: 'Event Size',
  badgeClass: 'badge-purple'
},  ];

  /* ────────────────────────────────────────────────
     CART STATE
  ──────────────────────────────────────────────── */
  let cart = []; // Array of { product, qty }

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
     1. FOOTER YEAR
  ════════════════════════════════════════════════ */
  if (yrSpan) yrSpan.textContent = new Date().getFullYear();
  /* ── THEME TOGGLE ── */
  const themeBtn = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('acs-theme');
  if (savedTheme === 'dark') document.body.classList.add('dark-mode');

  themeBtn?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('acs-theme', isDark ? 'dark' : 'light');
  });

  /* ════════════════════════════════════════════════
     2. MOBILE NAV
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
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeNav(); });

  /* ════════════════════════════════════════════════
     3. HEADER SCROLL + SCROLL TOP + ACTIVE NAV
  ════════════════════════════════════════════════ */
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
    stt.classList.toggle('show', window.scrollY > 500);
    updateActiveNav();
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  stt?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

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
     4. SMOOTH SCROLL (offset for fixed header)
  ════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const topbarH = document.querySelector('.topbar')?.offsetHeight || 40;
      const navH    = header?.offsetHeight || 70;
      const offset  = topbarH + navH + 10;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });

  /* ════════════════════════════════════════════════
     5. RENDER PRODUCTS
  ════════════════════════════════════════════════ */
  function renderProducts(filter = 'all') {
    if (!productGrid) return;

    const filtered = filter === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.cat === filter);

    productGrid.innerHTML = '';

    filtered.forEach((prod, i) => {
      const card = document.createElement('div');
      card.className = 'prod-card reveal';
      card.style.transitionDelay = `${(i % 4) * 0.07}s`;
      card.dataset.id = prod.id;

      // Check if already in cart
      const inCart = cart.find(c => c.product.id === prod.id);
      const btnText = inCart ? '✓ Added' : '+ Add to Order';
      const btnClass = inCart ? 'pc-add-btn added' : 'pc-add-btn';

     card.innerHTML = `
  <div class="pc-img pc-img-${prod.cat}">
    ${prod.image
      ? `<img src="${prod.image}" alt="${prod.name}" style="width:100%;height:100%;object-fit:cover;display:block;" />`
      : `<i class="${prod.icon}"></i>`
    }
    ${prod.badge ? `<span class="pc-badge ${prod.badgeClass}">${prod.badge}</span>` : ''}
  </div>
  <div class="pc-body">
    <p class="pc-name">${prod.name}</p>
    <p class="pc-desc">${prod.desc}</p>
    <div class="pc-price-row">
      <div class="pc-price">
        GH₵ ${prod.price.toFixed(2)}
        <small>${prod.unit}</small>
      </div>
      <button class="${btnClass}" data-id="${prod.id}">
        <i class="fas fa-plus"></i>
        ${inCart ? 'Added' : 'Add to Order'}
      </button>
    </div>
  </div>
`;
      productGrid.appendChild(card);
    });

    // Observe new cards for reveal animation
    productGrid.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // Bind add-to-order buttons
    productGrid.querySelectorAll('.pc-add-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = parseInt(btn.dataset.id);
        addToCart(id);
      });
    });
  }

  /* ════════════════════════════════════════════════
     6. CATEGORY FILTER TABS
  ════════════════════════════════════════════════ */
  catTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      catTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.cat;
      renderProducts(cat);
    });
  });

  /* ════════════════════════════════════════════════
     7. CART SYSTEM
  ════════════════════════════════════════════════ */

  /* Open / Close cart */
  const openCart = () => {
    cartSidebar.classList.add('open');
    cartOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    cartSidebar.classList.remove('open');
    cartOverlay.classList.remove('show');
    document.body.style.overflow = '';
  };

  cartToggle?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  /* Add to cart */
  function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(c => c.product.id === productId);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ product, qty: 1 });
    }

    updateCart();
    bumpCount();

    // Update the button in the grid
    const btn = productGrid?.querySelector(`.pc-add-btn[data-id="${productId}"]`);
    if (btn) {
      btn.classList.add('added');
      btn.innerHTML = '<i class="fas fa-check"></i> Added';
      btn.style.pointerEvents = 'none';
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-plus"></i> Add More';
        btn.style.pointerEvents = 'auto';
      }, 1200);
    }

    // Auto-open cart on first add
    if (cart.length === 1) {
      setTimeout(openCart, 500);
    }
  }

  /* Remove from cart */
  function removeFromCart(productId) {
    cart = cart.filter(c => c.product.id !== productId);
    updateCart();
  }

  /* Change quantity */
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

  /* Calculate total */
  function getTotal() {
    return cart.reduce((sum, c) => sum + (c.product.price * c.qty), 0);
  }

  /* Get total item count */
  function getTotalItems() {
    return cart.reduce((sum, c) => sum + c.qty, 0);
  }

  /* Render cart items */
  function renderCart() {
    if (!cartBody) return;

    const isEmpty = cart.length === 0;

    // Show/hide empty state
    cartEmpty.style.display = isEmpty ? 'flex' : 'none';
    cartFooter.style.display = isEmpty ? 'none' : 'block';

    // Remove existing cart items (keep the empty state div)
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

      // Bind cart item controls
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

  /* Update all cart UI */
  function updateCart() {
    renderCart();

    const total = getTotal();
    const items = getTotalItems();

    // Header count
    if (cartCount) {
      cartCount.textContent = items;
      cartCount.style.display = items > 0 ? 'flex' : 'none';
    }

    // Sidebar total
    if (cartTotal) cartTotal.textContent = `GH₵ ${total.toFixed(2)}`;

    // Floating CTA
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

  /* Animate count badge */
  function bumpCount() {
    if (!cartCount) return;
    cartCount.classList.remove('bump');
    void cartCount.offsetWidth; // reflow trick
    cartCount.classList.add('bump');
  }

  /* Clear cart */
  clearBtn?.addEventListener('click', () => {
    if (cart.length === 0) return;
    if (confirm('Clear all items from your cart?')) {
      cart = [];
      updateCart();
      // Re-render products to reset button states
      const activeCat = document.querySelector('.cat-tab.active')?.dataset.cat || 'all';
      renderProducts(activeCat);
    }
  });

  /* Floating CTA opens cart */
  fccOpen?.addEventListener('click', openCart);

  /* ════════════════════════════════════════════════
     8. WHATSAPP ORDER MESSAGE
  ════════════════════════════════════════════════ */
  waBtn?.addEventListener('click', () => {
    if (cart.length === 0) return;

    const total = getTotal();
    const lines = cart.map(({ product, qty }) =>
      `• ${product.name} x${qty} = GH₵ ${(product.price * qty).toFixed(2)}`
    );

    const message = [
      '🛒 *New Order — Allied Cold Store*',
      '',
      '*Order Details:*',
      ...lines,
      '',
      `*Total: GH₵ ${total.toFixed(2)}*`,
      '',
      '📍 Please confirm my nearest branch and arrange pickup/delivery.',
      '',
      '_Sent from alliedcoldstore.com_'
    ].join('\n');

    const encodedMsg = encodeURIComponent(message);
    const waURL = `https://wa.me/${WA_NUMBER}?text=${encodedMsg}`;

    window.open(waURL, '_blank');
  });

  /* ════════════════════════════════════════════════
     9. CONTACT FORM VALIDATION
  ════════════════════════════════════════════════ */
  if (contactForm) {
    const fnEl = document.getElementById('fn');
    const fpEl = document.getElementById('fp');
    const fmEl = document.getElementById('fm');

    // Clear errors on input
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
     10. SCROLL REVEAL ANIMATIONS
  ════════════════════════════════════════════════ */
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Observe static reveal elements
  document.querySelectorAll(
    '.af-item, .branch-card, .cic-item, .trust-item, .mini-card, .hq-branch, .story-img-wrap, .about-features'
  ).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    revealObserver.observe(el);
  });

  /* ════════════════════════════════════════════════
     11. INIT — Render products on load
  ════════════════════════════════════════════════ */
  renderProducts('all');
  updateCart();

  // Initial count badge visibility
  if (cartCount) cartCount.style.display = 'none';

  console.log('🐔 Allied Cold Store — Light Mode Ready!');
});