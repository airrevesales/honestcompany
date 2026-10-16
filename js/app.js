/* Airreve storefront — shared behaviour + page renderers
   Vanilla JS, no build step. Global: window.AI (app namespace)
*/
(function (window, document) {
  'use strict';

  var A = window.AIRREVE;
  var T = A.i18n;

  /* ---------- small helpers ---------- */
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function node(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function store(key, val) {
    try {
      if (val === undefined) return window.localStorage.getItem(key);
      window.localStorage.setItem(key, val);
    } catch (e) { /* storage disabled */ }
    return null;
  }

  /* ---------- i18n ---------- */
  var LANG_KEY = 'airreve.lang';
  var lang = store(LANG_KEY) === 'ko' ? 'ko' : 'en';

  // extra keys derived from COMPANY
  T['contact.address'] = { en: A.company.address, ko: A.company.addressKo };
  T['contact.phone'] = { en: A.company.phone, ko: A.company.phoneKo };
  T['contact.website'] = { en: A.company.linkedin, ko: A.company.websiteKo };
  T['contact.country'] = { en: A.company.country, ko: A.company.countryKo };

  function t(key) {
    var row = T[key];
    if (!row) return key;
    return row[lang] || row.en || '';
  }
  function pick(obj) {
    if (obj == null) return '';
    if (typeof obj === 'string') return obj;
    return obj[lang] || obj.en || '';
  }

  function applyI18n(root) {
    qsa('[data-i18n]', root).forEach(function (n) { n.textContent = t(n.getAttribute('data-i18n')); });
    qsa('[data-i18n-html]', root).forEach(function (n) { n.innerHTML = t(n.getAttribute('data-i18n-html')); });
    qsa('[data-i18n-ph]', root).forEach(function (n) { n.setAttribute('placeholder', t(n.getAttribute('data-i18n-ph'))); });
    qsa('[data-i18n-aria]', root).forEach(function (n) { n.setAttribute('aria-label', t(n.getAttribute('data-i18n-aria'))); });
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    store(LANG_KEY, lang);
    document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
    var shell = qs('.sf');
    if (shell) shell.classList.toggle('sf--ko', lang === 'ko');
    syncLangButtons();
    applyI18n(document);
    if (App.onLangChange) App.onLangChange();
  }

  function syncLangButtons() {
    qsa('[data-lang]').forEach(function (b) {
      b.classList.toggle('sf-lang__btn--on', b.getAttribute('data-lang') === lang);
    });
  }

  /* ---------- toast ---------- */
  var toastHost;
  function toast(msg) {
    if (!toastHost) {
      toastHost = node('<div class="sf-toast-host" id="toast-host" aria-live="polite"></div>');
      document.body.appendChild(toastHost);
    }
    var n = node('<div class="sf-toast"></div>');
    n.textContent = msg;
    toastHost.appendChild(n);
    window.setTimeout(function () {
      if (n.parentNode) n.parentNode.removeChild(n);
    }, 2400);
  }

  /* ---------- quote cart ---------- */
  var CART_KEY = 'airreve.cart';
  function cartRead() {
    try { return JSON.parse(store(CART_KEY) || '[]') || []; } catch (e) { return []; }
  }
  function cartWrite(items) {
    store(CART_KEY, JSON.stringify(items));
    cartRender();
    qsa('[data-cart-count]').forEach(function (n) {
      n.textContent = items.length ? String(items.length) : '';
    });
  }
  function cartAdd(id) {
    var p = A.products.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    var items = cartRead();
    if (!items.some(function (x) { return x.id === id; })) {
      items.push({ id: p.id, name: p.name, image: p.images[0], moq: p.moq, slug: p.slug });
      cartWrite(items);
      toast(t('cart.added') + ' · ' + p.name);
    } else {
      cartOpen(true);
      return;
    }
    markAddButtons();
  }
  function cartRemove(id) {
    var items = cartRead().filter(function (x) { return x.id !== id; });
    cartWrite(items);
    markAddButtons();
    toast(t('cart.removed'));
  }
  function markAddButtons() {
    var ids = cartRead().map(function (x) { return x.id; });
    qsa('[data-add]').forEach(function (b) {
      var on = ids.indexOf(b.getAttribute('data-add')) !== -1;
      b.classList.toggle('is-added', on);
      b.textContent = on ? t('cta.added') : t('cta.add');
    });
  }

  var cartScrim, cartPanel;
  function cartBuild() {
    cartScrim = node('<div class="qc-scrim" id="qc-scrim"></div>');
    cartPanel = node(
      '<aside class="qc" id="qc-panel" role="dialog" aria-modal="true" aria-label="' + esc(t('cart.title')) + '">' +
        '<header class="qc__top">' +
          '<span class="qc__title">' + esc(t('cart.title')) + '</span>' +
          '<span class="qc__n" id="qc-n"></span>' +
          '<button class="qc__x" type="button" data-cart-close aria-label="Close">&times;</button>' +
        '</header>' +
        '<div class="qc__body" id="qc-body"></div>' +
        '<div class="qc__foot">' +
          '<button class="sf-btn" type="button" data-quote-open>' + esc(t('cart.add')) + '</button>' +
          '<p class="qc__note">' + esc(t('cart.note')) + '</p>' +
        '</div>' +
      '</aside>');
    document.body.appendChild(cartScrim);
    document.body.appendChild(cartPanel);
    cartScrim.addEventListener('click', function () { cartOpen(false); });
    qs('[data-cart-close]', cartPanel).addEventListener('click', function () { cartOpen(false); });
    qs('[data-quote-open]', cartPanel).addEventListener('click', function () {
      cartOpen(false);
      quoteOpen();
    });
  }
  function cartRender() {
    if (!cartPanel) return;
    var items = cartRead();
    var n = qs('#qc-n', cartPanel);
    if (n) n.textContent = items.length ? items.length + ' ' + t('cart.items') : '';
    var body = qs('#qc-body', cartPanel);
    if (!body) return;
    if (!items.length) {
      body.innerHTML = '<p class="qc__empty">' + esc(t('cart.empty')) + '</p>';
      return;
    }
    body.innerHTML = items.map(function (it) {
      return '' +
        '<div class="qc-item">' +
          '<a class="qc-item__m" href="' + esc(it.slug) + '"><img src="' + esc(it.image) + '" alt="' + esc(it.name) + '"></a>' +
          '<div>' +
            '<a class="qc-item__n" href="' + esc(it.slug) + '">' + esc(it.name) + '</a>' +
            '<div class="qc-item__s">' + esc(t('label.moqShort')) + ' ' + esc(it.moq) + '</div>' +
          '</div>' +
          '<button class="qc-item__x" type="button" data-cart-remove="' + esc(it.id) + '" aria-label="Remove">&times;</button>' +
        '</div>';
    }).join('');
    qsa('[data-cart-remove]', body).forEach(function (b) {
      b.addEventListener('click', function () { cartRemove(b.getAttribute('data-cart-remove')); });
    });
  }
  function cartOpen(open) {
    if (!cartPanel) return;
    cartPanel.classList.toggle('is-open', !!open);
    cartScrim.classList.toggle('is-open', !!open);
    document.body.classList.toggle('cart-open', !!open);
  }

  /* ---------- quote form modal ---------- */
  var quotePanel, quoteScrim;
  function quoteBuild() {
    quoteScrim = node('<div class="qc-scrim" id="quote-scrim"></div>');
    quotePanel = node(
      '<aside class="qc qc--quote" id="quote-panel" role="dialog" aria-modal="true" aria-label="' + esc(t('cta.quote')) + '">' +
        '<header class="qc__top">' +
          '<span class="qc__title">' + esc(t('cta.quote')) + '</span>' +
          '<button class="qc__x" type="button" data-quote-close aria-label="Close">&times;</button>' +
        '</header>' +
        '<div class="qc__body">' +
          '<form class="sf-form" id="quote-form" novalidate>' +
            '<div class="sf-field"><label class="sf-field__label" for="q-name">' + esc(t('quote.name')) + ' *</label>' +
              '<input class="sf-input" id="q-name" name="name" type="text" required autocomplete="name"></div>' +
            '<div class="sf-field"><label class="sf-field__label" for="q-company">' + esc(t('quote.company')) + '</label>' +
              '<input class="sf-input" id="q-company" name="company" type="text" autocomplete="organization"></div>' +
            '<div class="sf-field"><label class="sf-field__label" for="q-email">' + esc(t('quote.email')) + ' *</label>' +
              '<input class="sf-input" id="q-email" name="email" type="email" required autocomplete="email"></div>' +
            '<div class="sf-field"><label class="sf-field__label" for="q-country">' + esc(t('quote.country')) + '</label>' +
              '<input class="sf-input" id="q-country" name="country" type="text" autocomplete="country-name"></div>' +
            '<div class="sf-field sf-form__full"><label class="sf-field__label" for="q-qty">' + esc(t('quote.quantity')) + '</label>' +
              '<input class="sf-input" id="q-qty" name="quantity" type="text" placeholder="e.g. 3,000 sheets / 1 pallet"></div>' +
            '<div class="sf-field sf-form__full"><label class="sf-field__label" for="q-msg">' + esc(t('quote.message')) + ' *</label>' +
              '<textarea class="sf-input sf-input--area" id="q-msg" name="message" required></textarea></div>' +
            '<div class="sf-form__full" id="quote-items"></div>' +
            '<div class="sf-form__full">' +
              '<button class="sf-btn" type="submit" id="quote-submit">' + esc(t('quote.send')) + '</button>' +
            '</div>' +
            '<p class="sf-form__full sf-note" id="quote-status" hidden></p>' +
          '</form>' +
        '</div>' +
      '</aside>');
    document.body.appendChild(quoteScrim);
    document.body.appendChild(quotePanel);
    quoteScrim.addEventListener('click', function () { quoteOpen(false); });
    qs('[data-quote-close]', quotePanel).addEventListener('click', function () { quoteOpen(false); });
    qs('#quote-form', quotePanel).addEventListener('submit', quoteSubmit);
  }
  function quoteOpen(open) {
    if (!quotePanel) return;
    if (open !== false) quoteRenderItems();
    quotePanel.classList.toggle('is-open', open !== false);
    quoteScrim.classList.toggle('is-open', open !== false);
    document.body.classList.toggle('cart-open', open !== false);
    if (open !== false) {
      var first = qs('#q-name', quotePanel);
      if (first) first.focus();
    }
  }
  function quoteRenderItems() {
    var host = qs('#quote-items', quotePanel);
    if (!host) return;
    var items = cartRead();
    if (!items.length) { host.innerHTML = ''; return; }
    host.innerHTML = '<div class="sf-note"><b>' + esc(t('cart.title')) + '</b><br>' +
      items.map(function (it) { return esc(it.name) + ' (MOQ ' + esc(it.moq) + ')'; }).join('<br>') + '</div>';
  }
  function quoteSubmit(ev) {
    ev.preventDefault();
    var form = ev.currentTarget;
    var btn = qs('#quote-submit', form);
    var status = qs('#quote-status', form);
    var data = {
      name: form.name.value.trim(),
      company: form.company.value.trim(),
      email: form.email.value.trim(),
      country: form.country.value.trim(),
      quantity: form.quantity.value.trim(),
      message: form.message.value.trim(),
      language: lang,
      items: cartRead().map(function (it) { return it.name; }).join(' | ')
    };
    if (!data.name || !data.email || !data.message) {
      status.hidden = false;
      status.textContent = t('quote.required');
      return;
    }
    btn.disabled = true;
    btn.textContent = t('quote.sending');
    status.hidden = true;

    window.fetch('tables/quote_requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      status.hidden = false;
      status.textContent = t('quote.ok');
      form.reset();
      quoteRenderItems();
      cartWrite([]);
      markAddButtons();
    }).catch(function () {
      status.hidden = false;
      status.textContent = t('quote.fail');
    }).then(function () {
      btn.disabled = false;
      btn.textContent = t('quote.send');
    });
  }

  /* ---------- AI assistant ---------- */
  var aiRoot, aiStream, aiBusy = false;
  function aiAnswer(text) {
    var q = text.toLowerCase();
    var best = null, bestScore = 0;
    A.knowledge.forEach(function (k) {
      var score = 0;
      k.match.forEach(function (m) {
        if (m && q.indexOf(m.toLowerCase()) !== -1) score += m.length;
      });
      if (score > bestScore) { bestScore = score; best = k; }
    });
    return best || null;
  }
  function aiBubble(html, who) {
    var b = node('<div class="ai__bubble ai__bubble--' + who + '"></div>');
    b.innerHTML = html;
    aiStream.appendChild(b);
    aiStream.scrollTop = aiStream.scrollHeight;
    return b;
  }
  function aiChips(list) {
    if (!list || !list.length) return;
    var wrap = node('<div class="ai__acts"></div>');
    list.forEach(function (c) {
      var btn = node('<button class="ai__act' + (c.action === 'link' ? ' ai__act--ghost' : '') + '" type="button"></button>');
      btn.textContent = c.label;
      btn.addEventListener('click', function () {
        if (c.action === 'quote') { aiBusy = false; quoteOpen(); return; }
        if (c.action === 'link') { window.location.href = c.href; return; }
        aiAsk(c.label);
      });
      wrap.appendChild(btn);
    });
    aiStream.appendChild(wrap);
    aiStream.scrollTop = aiStream.scrollHeight;
  }
  function aiAsk(text) {
    if (!text || aiBusy) return;
    aiBubble(esc(text), 'user');
    aiBusy = true;
    var pending = aiBubble('<span class="ai__dots"><i></i><i></i><i></i></span>', 'bot');
    window.setTimeout(function () {
      var hit = aiAnswer(text);
      if (pending.parentNode) pending.parentNode.removeChild(pending);
      aiBubble(esc(hit ? hit.answer : t('assistant.fallback')), 'bot');
      aiChips(hit ? hit.chips : [{ label: t('cta.quote'), action: 'quote' },
        { label: t('nav.faq'), action: 'link', href: 'faq.html' }]);
      aiBusy = false;
    }, 520);
  }
  function aiBuild() {
    aiRoot = node(
      '<div class="ai" id="assistant">' +
        '<button class="ai__launch" type="button" id="ai-launch">' +
          '<span class="ai__avatar">AI</span>' +
          '<span class="ai__label">' + esc(t('assistant.launch')) + '</span>' +
        '</button>' +
        '<section class="ai__panel" aria-label="' + esc(t('assistant.title')) + '">' +
          '<header class="ai__head">' +
            '<span class="ai__avatar">AI</span>' +
            '<div><div class="ai__ht">' + esc(t('assistant.title')) + '</div>' +
            '<div class="ai__hs">' + esc(t('assistant.sub')) + '</div></div>' +
            '<button class="ai__x" type="button" id="ai-x" aria-label="Close">&times;</button>' +
          '</header>' +
          '<div class="ai__stream" id="ai-stream" aria-live="polite"></div>' +
          '<div class="ai__foot">' +
            '<div class="ai__row">' +
              '<input class="ai__input" id="ai-input" type="text" placeholder="' + esc(t('assistant.placeholder')) + '" aria-label="' + esc(t('assistant.placeholder')) + '">' +
              '<button class="ai__send" type="button" id="ai-send">' + esc(t('assistant.send')) + '</button>' +
            '</div>' +
            '<p class="ai__note">' + esc(t('assistant.note')) + '</p>' +
          '</div>' +
        '</section>' +
      '</div>');
    document.body.appendChild(aiRoot);
    aiStream = qs('#ai-stream', aiRoot);
    aiBubble(esc(t('assistant.greeting')), 'bot');
    aiChips(A.suggested.map(function (s) { return { label: s, action: 'ask' }; }));
    qs('#ai-launch', aiRoot).addEventListener('click', function () {
      aiRoot.classList.add('ai--open');
      document.body.classList.add('ai-open');
      qs('#ai-input', aiRoot).focus();
    });
    qs('#ai-x', aiRoot).addEventListener('click', function () {
      aiRoot.classList.remove('ai--open');
      document.body.classList.remove('ai-open');
    });
    qs('#ai-send', aiRoot).addEventListener('click', function () {
      var inp = qs('#ai-input', aiRoot);
      aiAsk(inp.value.trim());
      inp.value = '';
    });
    qs('#ai-input', aiRoot).addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        aiAsk(e.currentTarget.value.trim());
        e.currentTarget.value = '';
      }
    });
  }

  /* ---------- mobile tabbar + sheet menu ---------- */
  var TABS = [
    { key: 'nav.home', href: 'index.html', page: 'home', icon: '<path d="M3.5 9.2 11 3.6l7.5 5.6v8.3a1 1 0 0 1-1 1h-13a1 1 0 0 1-1-1z"></path>' },
    { key: 'nav.products', href: 'products.html', page: 'products', icon: '<rect x="3.5" y="3.5" width="6.4" height="6.4" rx="1.4"></rect><rect x="12.1" y="3.5" width="6.4" height="6.4" rx="1.4"></rect><rect x="3.5" y="12.1" width="6.4" height="6.4" rx="1.4"></rect><rect x="12.1" y="12.1" width="6.4" height="6.4" rx="1.4"></rect>' },
    { key: 'nav.company', href: 'company.html', page: 'company', icon: '<path d="M4 18.5V6.2a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v12.3"></path><path d="M14 9h4a1 1 0 0 1 1 1v8.5"></path><path d="M3 18.5h16"></path><path d="M7 8h2M7 11.5h2M7 15h2"></path>' },
    { key: 'nav.media', href: 'media.html', page: 'media', icon: '<rect x="3" y="5" width="16" height="12" rx="2"></rect><path d="M9.6 8.9l3.8 2.1-3.8 2.1z"></path>' },
    { key: 'nav.faq', href: 'faq.html', page: 'faq', icon: '<circle cx="11" cy="11" r="7.8"></circle><path d="M8.9 8.7a2.15 2.15 0 1 1 3 2.02c-.6.28-.98.83-.98 1.5v.38"></path><path d="M11 15.6h.01"></path>' }
  ];
  function mobileBuild(page) {
    var tabbar = node('<nav class="m-tabbar" aria-label="Primary"></nav>');
    TABS.forEach(function (tb) {
      var a = node('<a class="m-tab' + (tb.page === page || (page === 'product' && tb.page === 'products') || (page === 'post' && tb.page === 'media') ? ' m-tab--on' : '') + '" href="' + tb.href + '"></a>');
      a.innerHTML = '<svg viewBox="0 0 22 22" width="21" height="21" fill="none" stroke="currentColor" ' +
        'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + tb.icon + '</svg>' +
        '<span>' + esc(t(tb.key)) + '</span>';
      tabbar.appendChild(a);
    });
    document.body.appendChild(tabbar);

    var sheet = node(
      '<div class="sh sh--menu" id="sh-menu" data-open="false">' +
        '<div class="sh__scrim"></div>' +
        '<aside class="sh__panel" role="dialog" aria-modal="true" aria-label="Menu">' +
          '<div class="sh__grab"></div>' +
          '<header class="sh__top">' +
            '<span class="sh__title">' + esc(A.company.name) + '</span>' +
            '<button class="sh__x" type="button" id="sh-x" aria-label="Close">&times;</button>' +
          '</header>' +
          '<div class="sh__body">' +
            '<nav class="mn" aria-label="Menu"></nav>' +
            '<span class="mn__note">' + esc(t('footer.rights').indexOf('©') === 0 ? 'No account required' : '') + '</span>' +
            '<div class="m-wide mn__cta"><button class="sf-btn" type="button" data-quote-open>' + esc(t('cta.quote')) + '</button></div>' +
          '</div>' +
        '</aside>' +
      '</div>');
    var mn = qs('.mn', sheet);
    TABS.forEach(function (tb) {
      var on = tb.page === page || (page === 'product' && tb.page === 'products') || (page === 'post' && tb.page === 'media');
      var a = node('<a class="mn__a' + (on ? ' mn__a--on' : '') + '" href="' + tb.href + '">' + esc(t(tb.key)) + '</a>');
      mn.appendChild(a);
    });
    document.body.appendChild(sheet);

    function setOpen(open) {
      sheet.setAttribute('data-open', open ? 'true' : 'false');
      document.body.classList.toggle('m-menu-open', !!open);
    }
    qs('#sh-x', sheet).addEventListener('click', function () { setOpen(false); });
    qs('.sh__scrim', sheet).addEventListener('click', function () { setOpen(false); });
    qsa('[data-menu-open]').forEach(function (b) {
      b.addEventListener('click', function () { setOpen(true); });
    });
    qs('[data-quote-open]', sheet).addEventListener('click', function () {
      setOpen(false);
      quoteOpen();
    });
  }

  /* ---------- lightbox ---------- */
  function lightboxBuild() {
    var lb = node('<div class="lb" id="lightbox" role="dialog" aria-modal="true">' +
      '<button class="lb__x" type="button" aria-label="Close">&times;</button><img alt=""></div>');
    document.body.appendChild(lb);
    function close() { lb.classList.remove('is-open'); }
    qs('.lb__x', lb).addEventListener('click', close);
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
    document.addEventListener('click', function (e) {
      var trigger = e.target.closest && e.target.closest('[data-zoom]');
      if (!trigger) return;
      e.preventDefault();
      var img = qs('img', lb);
      img.src = trigger.getAttribute('data-zoom');
      lb.classList.add('is-open');
    });
  }

  /* ---------- page renderers ---------- */
  var PAGES = {};

  /* home */
  PAGES.home = function () {
    markAddButtons();
  };

  /* products list */
  PAGES.products = function () {
    var state = { q: '', cat: '', moq: '', sort: 'req', view: 'grid' };
    var tiles = qs('#u-tiles');
    var table = qs('#u-table');
    var tableBody = qs('#u-table-body');
    var cnt = qs('#u-count');
    var sub = qs('#u-sub');
    var cats = [];
    A.products.forEach(function (p) { if (cats.indexOf(p.category) === -1) cats.push(p.category); });

    // category chip buttons
    var chipsHost = qs('#u-chips');
    if (chipsHost) {
      var mk = function (label, val) {
        var b = node('<button type="button" class="u-chip' + (state.cat === val ? ' u-chip--on' : '') + '"></button>');
        b.textContent = label;
        b.addEventListener('click', function () {
          state.cat = val;
          qsa('.u-chip', chipsHost).forEach(function (x) { x.classList.remove('u-chip--on'); });
          b.classList.add('u-chip--on');
          var sel = qs('#u-cat');
          if (sel) sel.value = val;
          render();
        });
        return b;
      };
      chipsHost.appendChild(mk(t('media.all'), ''));
      cats.forEach(function (c) { chipsHost.appendChild(mk(c, c)); });
    }

    // selects
    var catSel = qs('#u-cat');
    if (catSel) {
      catSel.appendChild(node('<option value="">' + esc(t('products.categoryAll')) + '</option>'));
      cats.forEach(function (c) { catSel.appendChild(node('<option value="' + esc(c) + '">' + esc(c) + '</option>')); });
      catSel.addEventListener('change', function () {
        state.cat = catSel.value;
        qsa('.u-chip', chipsHost).forEach(function (x) {
          var on = (x.textContent === t('media.all') && !state.cat) || x.textContent === state.cat;
          x.classList.toggle('u-chip--on', on);
        });
        render();
      });
    }
    var moqSel = qs('#u-moq');
    if (moqSel) {
      [['', 'products.moqAll'], ['1', 'products.moq1'], ['10', 'products.moq10'], ['50', 'products.moq50'], ['100', 'products.moq100']]
        .forEach(function (pair) { moqSel.appendChild(node('<option value="' + pair[0] + '">' + esc(t(pair[1])) + '</option>')); });
      moqSel.addEventListener('change', function () { state.moq = moqSel.value; render(); });
    }
    var sortSel = qs('#u-sort');
    if (sortSel) {
      [['req', 'products.sortReq'], ['moq', 'products.sortMoq'], ['new', 'products.sortNew']]
        .forEach(function (pair) { sortSel.appendChild(node('<option value="' + pair[0] + '">' + esc(t(pair[1])) + '</option>')); });
      sortSel.addEventListener('change', function () { state.sort = sortSel.value; render(); });
    }
    var find = qs('#u-find-input');
    if (find) {
      find.addEventListener('input', function () { state.q = find.value.trim().toLowerCase(); render(); });
      find.setAttribute('placeholder', t('products.search'));
    }
    qsa('[data-view]').forEach(function (b) {
      b.addEventListener('click', function () {
        state.view = b.getAttribute('data-view');
        document.body.setAttribute('data-pview', state.view);
        qsa('[data-view]').forEach(function (x) { x.classList.toggle('u-view__b--on', x === b); });
      });
    });

    function visible() {
      var list = A.products.filter(function (p) {
        if (state.cat && p.category !== state.cat) return false;
        if (state.moq && p.moq > Number(state.moq)) return false;
        if (state.q) {
          var hay = (p.name + ' ' + p.summary + ' ' + p.id).toLowerCase();
          if (hay.indexOf(state.q) === -1) return false;
        }
        return true;
      });
      if (state.sort === 'moq') list.sort(function (a, b) { return a.moq - b.moq; });
      else if (state.sort === 'new') list.sort(function (a, b) { return new Date(b.createdAt) - new Date(a.createdAt); });
      else list.sort(function (a, b) { return a.sortOrder - b.sortOrder; });
      return list;
    }

    function tile(p) {
      return '' +
        '<article class="u-tile">' +
          '<a class="u-tile__m" href="' + esc(p.slug) + '"><img src="' + esc(p.images[0]) + '" alt="' + esc(p.name) + '" loading="lazy"></a>' +
          '<a class="u-tile__n" href="' + esc(p.slug) + '">' + esc(p.name) + '</a>' +
          '<p class="u-tile__d">' + esc(p.summary) + '</p>' +
          '<div class="u-tile__f">' +
            '<span class="u-tile__moq">' + esc(t('label.moqShort')) + ' ' + esc(p.moq) + '</span>' +
            '<button class="sf-btn sf-btn--sm sf-btn--ghost" type="button" data-add="' + esc(p.id) + '">' + esc(t('cta.add')) + '</button>' +
          '</div>' +
        '</article>';
    }
    function row(p) {
      return '' +
        '<tr>' +
          '<td><a class="u-thumb" href="' + esc(p.slug) + '" aria-label="' + esc(p.name) + '">' +
            '<img src="' + esc(p.images[0]) + '" alt="' + esc(p.name) + '" loading="lazy"></a></td>' +
          '<td><a class="u-name" href="' + esc(p.slug) + '">' + esc(p.name) + '</a>' +
            '<div class="u-sub">' + esc(p.summary) + '</div></td>' +
          '<td>' + esc(p.moq) + '</td>' +
          '<td>' + esc(p.leadTime) + '</td>' +
          '<td>' + esc(p.origin) + '</td>' +
          '<td><button class="sf-btn sf-btn--sm sf-btn--ghost" type="button" data-add="' + esc(p.id) + '">' + esc(t('cta.add')) + '</button></td>' +
        '</tr>';
    }

    function render() {
      var list = visible();
      if (cnt) cnt.textContent = list.length + (lang === 'ko' ? '개 제품' : ' products');
      if (sub) {
        var cc = {};
        list.forEach(function (p) { cc[p.category] = 1; });
        var ncat = Object.keys(cc).length;
        var minMoq = list.length ? Math.min.apply(null, list.map(function (p) { return p.moq; })) : 0;
        sub.textContent = list.length + (lang === 'ko' ? '개 제품' : ' items') + ' · ' +
          (ncat || cats.length) + (lang === 'ko' ? '개 카테고리' : ' categories') +
          (list.length ? ' · ' + t('label.moqShort') + ' from ' + minMoq : '');
      }
      if (!list.length) {
        tiles.innerHTML = '<p class="u-empty">' + esc(t('products.none')) + '</p>';
        if (tableBody) tableBody.innerHTML = '';
        return;
      }
      // group by category, preserving category order
      var order = cats.filter(function (c) { return list.some(function (p) { return p.category === c; }); });
      tiles.innerHTML = order.map(function (c) {
        var inCat = list.filter(function (p) { return p.category === c; });
        return '<section class="u-grp"><h2 class="u-grp__h">' + esc(c) + '</h2>' +
          '<div class="u-tiles">' + inCat.map(tile).join('') + '</div></section>';
      }).join('');
      if (tableBody) {
        tableBody.innerHTML = order.map(function (c) {
          var inCat = list.filter(function (p) { return p.category === c; });
          return '<tr class="u-grp__row"><th class="u-grp__th" colspan="6" scope="rowgroup">' + esc(c) + '</th></tr>' +
            inCat.map(row).join('');
        }).join('');
      }
      // wire add buttons
      qsa('[data-add]').forEach(function (b) {
        if (b.getAttribute('data-wired')) return;
        b.setAttribute('data-wired', '1');
        b.addEventListener('click', function () { cartAdd(b.getAttribute('data-add')); });
      });
      markAddButtons();
    }
    App.productsRender = render;
    render();
  };

  /* product detail */
  PAGES.product = function () {
    var id = document.body.getAttribute('data-product');
    var p = A.products.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    document.title = p.name + ' · ' + A.company.name;

    // gallery
    var main = qs('#d-main');
    var rail = qs('#d-rail');
    var dots = qs('#d-dots');
    if (main) {
      main.innerHTML = p.images.map(function (u, i) {
        return '<img src="' + esc(u) + '" alt="' + esc(p.name) + (i ? ' ' + (i + 1) : '') + '"' +
          (i === 0 ? ' class="is-active"' : '') + ' data-zoom="' + esc(u) + '"' + (i === 0 ? '' : ' loading="lazy"') + '>';
      }).join('');
    }
    if (rail) {
      rail.innerHTML = p.images.map(function (u, i) {
        return '<button class="d-thumb' + (i === 0 ? ' d-thumb--on' : '') + '" type="button" data-i="' + i + '" ' +
          'aria-label="' + esc(p.name + ' ' + (i + 1)) + '"><img src="' + esc(u) + '" alt="" loading="lazy"></button>';
      }).join('');
    }
    if (dots) {
      dots.innerHTML = p.images.map(function (u, i) {
        return '<i' + (i === 0 ? ' class="on"' : '') + '></i>';
      }).join('');
    }
    var idx = 0;
    function show(i) {
      idx = (i + p.images.length) % p.images.length;
      qsa('#d-main img').forEach(function (im, n) { im.classList.toggle('is-active', n === idx); });
      qsa('.d-thumb').forEach(function (b, n) { b.classList.toggle('d-thumb--on', n === idx); });
      qsa('#d-dots i').forEach(function (d, n) { d.classList.toggle('on', n === idx); });
      var act = qs('#d-main .is-active');
      if (act && act.scrollIntoView) act.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
    qsa('.d-thumb').forEach(function (b) {
      b.addEventListener('click', function () { show(Number(b.getAttribute('data-i'))); });
    });
    qsa('[data-gal]').forEach(function (b) {
      b.addEventListener('click', function () { show(idx + Number(b.getAttribute('data-gal'))); });
    });
    if (main) {
      main.addEventListener('scroll', function () {
        if (window.innerWidth > 640) return;
        var w = main.clientWidth + 8;
        show(Math.round(main.scrollLeft / w));
      }, { passive: true });
    }

    // info block
    var info = qs('#d-info');
    if (info) {
      info.innerHTML = '' +
        '<span class="sf-eyebrow">' + esc(p.category) + '</span>' +
        '<h1 class="sf-h2">' + esc(p.name) + '</h1>' +
        '<span class="d-badges">' +
          (p.inStock ? '<span class="d-stock">' + esc(t('label.instock')) + '</span>' : '') +
          (p.sampleAvailable ? '<span class="d-stock d-stock--sample">' + esc(t('label.sample')) + '</span>' : '') +
        '</span>' +
        '<p class="sf-body sf-muted sf-multiline">' + esc(p.summary) + '</p>' +
        '<div class="d-terms">' +
          '<div class="d-term"><span>' + esc(t('label.moq')) + '</span><b>' + esc(p.moq) + '</b></div>' +
          '<div class="d-term"><span>' + esc(t('label.lead')) + '</span><b>' + esc(p.leadTime) + '</b></div>' +
          '<div class="d-term"><span>' + esc(t('label.origin')) + '</span><b>' + esc(p.origin) + '</b></div>' +
          '<div class="d-term"><span>' + esc(t('label.packing')) + '</span><b>' + esc(p.packing) + '</b></div>' +
        '</div>' +
        '<div class="d-acts">' +
          '<button class="sf-btn" type="button" data-add="' + esc(p.id) + '">' + esc(t('cta.add')) + '</button>' +
          '<button class="sf-btn sf-btn--ghost" type="button" data-cart-open>' + esc(t('cta.viewCart')) + '</button>' +
          '<span class="d-acts__note">' + esc(t('cart.note')) + '</span>' +
        '</div>';
    }
    var desc = qs('#d-desc');
    if (desc) desc.textContent = p.description;

    var cert = qs('#d-certs');
    if (cert) {
      var strip = node('<div class="c-strip c-rule"></div>');
      strip.appendChild(node('<span class="c-strip__l">' + esc(t('label.certified')) + '</span>'));
      p.certifications.forEach(function (c) { strip.appendChild(node('<span class="c-strip__i">' + esc(c) + '</span>')); });
      cert.appendChild(strip);
    }
    var specs = qs('#d-specs');
    if (specs) {
      specs.innerHTML = p.specs.map(function (s) {
        return '<div class="sf-dl__r"><dt class="sf-dl__k">' + esc(s.key) + '</dt>' +
          '<dd class="sf-dl__v">' + esc(s.value) + '</dd></div>';
      }).join('');
    }
    var related = qs('#d-related');
    if (related) {
      var others = A.products.filter(function (x) { return x.id !== p.id; });
      related.innerHTML = others.map(function (o) {
        return '' +
          '<article class="f-card">' +
            '<a class="f-sq" href="' + esc(o.slug) + '"><img src="' + esc(o.images[0]) + '" alt="' + esc(o.name) + '" loading="lazy"></a>' +
            '<a class="f-card__t" href="' + esc(o.slug) + '">' + esc(o.name) + '</a>' +
            '<div class="sf-chip-row">' +
              '<span class="sf-chip">' + esc(t('label.moqShort')) + ' ' + esc(o.moq) + '</span>' +
              '<span class="sf-chip">' + esc(o.origin) + '</span>' +
              '<span class="sf-chip">' + esc(t('label.instock')) + '</span>' +
            '</div>' +
            '<p class="m-card__d">' + esc(o.summary) + '</p>' +
            '<div class="m-card__f">' +
              '<span class="m-card__moq">' + esc(t('label.moqShort')) + ' ' + esc(o.moq) + '</span>' +
              '<button class="m-add" type="button" data-add="' + esc(o.id) + '">' + esc(t('cta.add')) + '</button>' +
            '</div>' +
          '</article>';
      }).join('');
    }
    var relHead = qs('#d-related-head');
    if (relHead) relHead.textContent = A.posts.length ? '' : '';
    qsa('[data-cart-open]').forEach(function (b) { b.addEventListener('click', function () { cartOpen(true); }); });
    qsa('[data-add]').forEach(function (b) {
      b.addEventListener('click', function () { cartAdd(b.getAttribute('data-add')); });
    });
    document.body.classList.add('has-sticky-cta');
    markAddButtons();
  };

  /* company */
  PAGES.company = function () {
    var terms = qs('#c-terms');
    if (terms) {
      terms.innerHTML = A.companyTerms.map(function (r) {
        return '<div class="sf-dl__r"><dt class="sf-dl__k">' + esc(r.key) + '</dt>' +
          '<dd class="sf-dl__v sf-multiline">' + esc(r.value) + '</dd></div>';
      }).join('');
    }
    var markets = qs('#c-markets');
    if (markets) {
      markets.innerHTML = A.markets.map(function (r) {
        return '<div class="sf-dl__r"><dt class="sf-dl__k">' + esc(r.key) + '</dt>' +
          '<dd class="sf-dl__v sf-multiline">' + esc(r.value) + '</dd></div>';
      }).join('');
    }
    var loc = qs('#c-location');
    if (loc) {
      loc.innerHTML =
        '<div class="sf-dl__r"><dt class="sf-dl__k">' +
          (lang === 'ko' ? '본사' : 'Head office') + '</dt>' +
          '<dd class="sf-dl__v sf-multiline">' + esc(pick({ en: A.company.address, ko: A.company.addressKo })) + '</dd></div>' +
        '<div class="sf-dl__r"><dt class="sf-dl__k">' + esc(t('quote.email')) + '</dt>' +
          '<dd class="sf-dl__v"><a href="mailto:' + esc(A.company.email) + '">' + esc(A.company.email) + '</a></dd></div>';
    }
    qsa('[data-quote-open]').forEach(function (b) {
      b.addEventListener('click', function () { quoteOpen(); });
    });
  };

  /* media list */
  PAGES.media = function () {
    var tabs = qs('#m-tabs');
    var host = qs('#m-feed');
    var kindSel = 'all';
    if (!host) return;
    if (tabs) {
      var mk = function (label, val, count) {
        var b = node('<button type="button" class="lv-tab"></button>');
        b.innerHTML = esc(label) + ' <span>' + count + '</span>';
        if (kindSel === val) b.classList.add('lv-tab--on');
        b.addEventListener('click', function () {
          kindSel = val;
          qsa('.lv-tab', tabs).forEach(function (x) { x.classList.remove('lv-tab--on'); });
          b.classList.add('lv-tab--on');
          render();
        });
        return b;
      };
      tabs.appendChild(mk(t('media.all'), 'all', A.posts.length));
      tabs.appendChild(mk(t('media.blog'), 'Blog', A.posts.filter(function (p) { return p.kind === 'Blog'; }).length));
    }
    function render() {
      var list = A.posts.filter(function (p) { return kindSel === 'all' || p.kind === kindSel; });
      if (!list.length) { host.innerHTML = '<p class="u-empty">' + esc(t('media.none')) + '</p>'; return; }
      var kinds = [];
      list.forEach(function (p) { if (kinds.indexOf(p.kind) === -1) kinds.push(p.kind); });
      host.innerHTML = kinds.map(function (k) {
        var inKind = list.filter(function (p) { return p.kind === k; });
        return '<section class="mv-sec" data-kind="' + esc(k.toLowerCase()) + '">' +
          '<div class="mv-sec__h"><span class="mv-sec__t">' + esc(t('media.' + k.toLowerCase())) + '</span>' +
          '<span class="mv-sec__n">' + inKind.length + ' ' + esc(t('media.posts')) + '</span></div>' +
          '<div class="lv-feed">' + inKind.map(function (p) {
            return '<article class="lv-item"><div class="lv-main">' +
              '<h2 class="lv-title"><a href="' + esc(p.slug) + '">' + esc(p.title) + '</a></h2>' +
              (p.excerpt ? '<a class="lv-text" href="' + esc(p.slug) + '">' + esc(p.excerpt) + '</a>' : '') +
              '<div class="lv-meta">' +
                '<span class="lv-kind">' + esc(p.kind) + '</span>' +
                '<span>' + esc(pick(p.ago)) + '</span>' +
                '<span>' + esc(pick(p.read)) + '</span>' +
              '</div></div></article>';
          }).join('') +
          '</div></section>';
      }).join('');
    }
    App.mediaRender = render;
    render();
  };

  /* media post detail */
  PAGES.post = function () {
    var id = document.body.getAttribute('data-post');
    var p = A.posts.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    document.title = p.title + ' · ' + A.company.name;
    var head = qs('#p-head');
    if (head) {
      head.innerHTML = '<div class="lv-meta">' +
        '<span class="lv-kind">' + esc(p.kind) + '</span>' +
        '<span class="lv-who">' + esc(A.company.name) + '</span>' +
        '<span>' + esc(pick(p.ago)) + '</span>' +
        '<span>' + esc(pick(p.read)) + '</span></div>' +
        '<h1 class="sf-h2">' + esc(p.title) + '</h1>';
    }
    var cover = qs('#p-cover');
    if (cover) {
      if (p.cover) {
        cover.innerHTML = '<img src="' + esc(p.cover) + '" alt="' + esc(p.title) + '">';
      } else {
        cover.hidden = true;
      }
    }
    var body = qs('#p-body');
    if (body) body.innerHTML = p.body;

    var more = qs('#p-more');
    if (more) {
      more.innerHTML = A.posts.filter(function (x) { return x.id !== p.id; }).slice(0, 3).map(function (o) {
        return '<article class="lv-item"><div class="lv-main">' +
          '<h2 class="lv-title"><a href="' + esc(o.slug) + '">' + esc(o.title) + '</a></h2>' +
          '<div class="lv-meta"><span class="lv-kind">' + esc(o.kind) + '</span>' +
          '<span>' + esc(pick(o.ago)) + '</span></div></div></article>';
      }).join('');
    }
  };

  /* faq */
  PAGES.faq = function () {
    var host = qs('#faq-list');
    if (!host) return;
    var cnt = qs('#faq-count');
    if (cnt) cnt.textContent = A.faq.length + ' ' + t('faq.count');
    host.innerHTML = A.faq.map(function (f, i) {
      return '' +
        '<li class="fq-item">' +
          '<button class="fq-q" type="button" id="fq-q-' + i + '" aria-expanded="false" aria-controls="fq-a-' + i + '">' +
            '<span class="fq-q__t">' + esc(f.q) + '</span>' +
            '<span class="fq-badge">' + esc(f.badge) + '</span>' +
            '<svg class="fq-chev" viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" ' +
            'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
            '<path d="M4 6l4 4 4-4"></path></svg>' +
          '</button>' +
          '<div class="fq-a" id="fq-a-' + i + '" role="region" aria-labelledby="fq-q-' + i + '" hidden>' + esc(f.a) + '</div>' +
        '</li>';
    }).join('');
    qsa('.fq-q', host).forEach(function (b) {
      b.addEventListener('click', function () {
        var item = b.parentNode;
        var panel = qs('.fq-a', item);
        var open = item.classList.toggle('fq-item--on');
        b.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.hidden = !open;
      });
    });
  };

  /* ---------- boot ---------- */
  var App = {
    t: t,
    pick: pick,
    esc: esc,
    cartAdd: cartAdd,
    cartOpen: cartOpen,
    quoteOpen: quoteOpen,
    onLangChange: null,
    renderProduct: function () { PAGES.product(); },
    renderPost: function () { PAGES.post(); }
  };
  window.AI = App;

  function boot() {
    var page = document.body.getAttribute('data-page') || 'home';

    document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
    var shell = qs('.sf');
    if (shell) shell.classList.toggle('sf--ko', lang === 'ko');

    // language buttons
    qsa('[data-lang]').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
    });
    syncLangButtons();

    // global buttons
    qsa('[data-cart-open]').forEach(function (b) { b.addEventListener('click', function () { cartOpen(true); }); });
    qsa('[data-quote-open]').forEach(function (b) { b.addEventListener('click', function () { quoteOpen(); }); });
    qsa('[data-add]').forEach(function (b) {
      b.addEventListener('click', function () { cartAdd(b.getAttribute('data-add')); });
    });

    cartBuild();
    quoteBuild();
    if (window.CHROME) window.CHROME.mount(page, t);
    mobileBuild(page);
    aiBuild();
    lightboxBuild();
    cartRender();

    if (PAGES[page] && page !== 'product' && page !== 'post') PAGES[page]();

    // re-render dynamic blocks when language changes
    App.onLangChange = function () {
      if (page === 'product') { PAGES.product(); markAddButtons(); return; }
      if (page === 'post') { PAGES.post(); return; }
      if (PAGES[page]) PAGES[page]();
      if (page === 'products' && App.productsRender) App.productsRender();
      if (page === 'media' && App.mediaRender) App.mediaRender();
      cartRender();
      var n = qs('#cart-count-badge');
      if (n) n.textContent = cartRead().length || '';
    };
    applyI18n(document);
    markAddButtons();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})(window, document);
