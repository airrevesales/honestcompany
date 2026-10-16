/* Airreve storefront — shared header / footer chrome.
   Renders the desktop nav, mobile top bar and site footer into every page
   so that markup lives in one place.
*/
(function (window, document) {
  'use strict';

  var A = window.AIRREVE;

  var NAV = [
    { key: 'nav.home', href: 'index.html', page: 'home' },
    { key: 'nav.products', href: 'products.html', page: 'products', alias: 'product' },
    { key: 'nav.company', href: 'company.html', page: 'company' },
    { key: 'nav.media', href: 'media.html', page: 'media', alias: 'post' },
    { key: 'nav.faq', href: 'faq.html', page: 'faq' }
  ];

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function node(html) {
    var tpl = document.createElement('template');
    tpl.innerHTML = html.trim();
    return tpl.content.firstElementChild;
  }
  function mk(html) { return node(html); }

  function isActive(page, item) {
    return page === item.page || page === item.alias;
  }

  function buildNav(page, t) {
    var nav = mk('<nav class="sf-nav" aria-label="Primary"></nav>');
    nav.appendChild(mk('<a class="sf-nav__brand' + (page === 'home' ? ' sf-nav__link--active' : '') +
      '" href="index.html">' + esc(A.company.name) + '</a>'));

    var burger = mk('<button class="hamburger" type="button" aria-expanded="false" aria-label="Toggle menu" data-menu-open>' +
      '<span></span><span></span><span></span></button>');
    nav.appendChild(burger);

    var ul = mk('<ul class="sf-nav__links"></ul>');
    NAV.forEach(function (item) {
      var on = isActive(page, item);
      var li = mk('<li></li>');
      li.appendChild(mk('<a class="sf-nav__link' + (on ? ' sf-nav__link--active' : '') + '" href="' + item.href +
        '"' + (on ? ' aria-current="page"' : '') + '>' + esc(t(item.key)) + '</a>'));
      ul.appendChild(li);
    });
    nav.appendChild(ul);

    nav.appendChild(mk('<span class="sf-nav__spacer"></span>'));

    var util = mk('<div class="sf-nav__util"></div>');
    util.appendChild(mk('<span></span>'));
    var langWrap = mk('<span class="sf-nav__lang"></span>');
    langWrap.appendChild(mk('<button class="sf-lang__btn" type="button" data-lang="en">EN</button>'));
    langWrap.appendChild(mk('<span class="sf-lang__sep">/</span>'));
    langWrap.appendChild(mk('<button class="sf-lang__btn" type="button" data-lang="ko">KO</button>'));
    util.appendChild(langWrap);
    var cartBtn = mk('<button class="sf-btn sf-btn--sm sf-btn--ghost" type="button" data-cart-open>' +
      esc(t('cta.viewCart')) + ' <span data-cart-count></span></button>');
    util.appendChild(cartBtn);
    nav.appendChild(util);

    return nav;
  }

  function buildMobileTop(page, t) {
    var top = mk('<header class="m-top"></header>');
    top.appendChild(mk('<button class="m-icon m-icon--lead" type="button" aria-label="Menu" data-menu-open>' +
      '<svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.7" ' +
      'stroke-linecap="round" aria-hidden="true"><path d="M3.5 6.5h15M3.5 11h15M3.5 15.5h15"></path></svg></button>'));
    top.appendChild(mk('<span class="m-top__brand">' + esc(A.company.name) + '</span>'));
    var langWrap = mk('<span class="sf-nav__lang"></span>');
    langWrap.appendChild(mk('<button class="sf-lang__btn" type="button" data-lang="en">EN</button>'));
    langWrap.appendChild(mk('<span class="sf-lang__sep">/</span>'));
    langWrap.appendChild(mk('<button class="sf-lang__btn" type="button" data-lang="ko">KO</button>'));
    top.appendChild(langWrap);
    top.appendChild(mk('<button class="m-icon" type="button" aria-label="Quote cart" data-cart-open>' +
      '<svg viewBox="0 0 22 22" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6" ' +
      'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M4 6.5h2l1.6 8.2a1.4 1.4 0 0 0 1.4 1.1h6.4a1.4 1.4 0 0 0 1.4-1.1l1-5.2H6"></path>' +
      '<circle cx="9" cy="18" r="1.2"></circle><circle cx="15.5" cy="18" r="1.2"></circle></svg></button>'));
    return top;
  }

  function buildFooter(t, page) {
    var f = mk('<footer class="sf-footer"></footer>');
    var wrap = mk('<div class="sf-wrap"></div>');
    var grid = mk('<div class="sf-footer__grid"></div>');

    var col1 = mk('<div></div>');
    col1.appendChild(mk('<div class="sf-footer__brand">' + esc(A.company.name) + '</div>'));
    col1.appendChild(mk('<p class="sf-footer__tagline">' + esc(A.company.summary) + '</p>'));
    col1.appendChild(mk('<p class="sf-footer__tagline sf-footer__loc">' + esc(A.company.industry) + ' · ' +
      esc(t('contact.country')) + '</p>'));
    grid.appendChild(col1);

    var col2 = mk('<div></div>');
    col2.appendChild(mk('<div class="sf-footer__head">' + esc(t('footer.explore')) + '</div>'));
    var list2 = mk('<nav class="sf-footer__list" aria-label="' + esc(t('footer.explore')) + '"></nav>');
    [['nav.products', 'products.html'], ['nav.company', 'company.html'], ['nav.media', 'media.html'],
     ['nav.faq', 'faq.html'], ['footer.certs', 'company.html#certifications']].forEach(function (pair) {
      list2.appendChild(mk('<a href="' + pair[1] + '">' + esc(t(pair[0])) + '</a>'));
    });
    col2.appendChild(list2);
    grid.appendChild(col2);

    var col3 = mk('<div></div>');
    col3.appendChild(mk('<div class="sf-footer__head">' + esc(t('footer.details')) + '</div>'));
    var list3 = mk('<div class="sf-footer__list"></div>');
    list3.appendChild(mk('<a href="mailto:' + esc(A.company.email) + '">' + esc(A.company.email) + '</a>'));
    list3.appendChild(mk('<a href="tel:+821062214199">' + esc(A.company.phone) + '</a>'));
    list3.appendChild(mk('<span>' + esc(A.company.address) + '</span>'));
    col3.appendChild(list3);
    grid.appendChild(col3);

    var col4 = mk('<div></div>');
    col4.appendChild(mk('<div class="sf-footer__head">' + esc(t('cta.quote')) + '</div>'));
    var qb = mk('<button class="sf-btn" type="button" data-quote-open>' + esc(t('cta.quote')) + '</button>');
    col4.appendChild(qb);
    grid.appendChild(col4);

    wrap.appendChild(grid);
    var legal = mk('<div class="sf-footer__legal"><span data-i18n="footer.rights"></span>' +
      '<a class="docs-link" href="' + esc(A.company.linkedin) + '" target="_blank" rel="noopener noreferrer">' +
      'LinkedIn <span class="docs-link__ext" aria-hidden="true">\u2197</span></a></div>');
    wrap.appendChild(legal);
    f.appendChild(wrap);
    return f;
  }

  /* Mounts chrome into a page. `page` is the data-page value. */
  window.CHROME = {
    mount: function (page, t) {
      var shell = document.querySelector('.storefront-shell');
      if (!shell) return;
      var navHost = document.createElement('div');
      navHost.className = 'sf-nav-outer';
      navHost.appendChild(buildNav(page, t));
      shell.insertBefore(navHost, shell.firstChild);
      shell.insertBefore(buildMobileTop(page, t), navHost.nextSibling);

      var footerHost = document.querySelector('[data-footer]');
      var footer = buildFooter(t, page);
      if (footerHost) footerHost.parentNode.replaceChild(footer, footerHost);
      else shell.appendChild(footer);
    }
  };
})(window, document);
