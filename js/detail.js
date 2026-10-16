/* Product detail + media post pages — shared shell renderer.
   Each HTML stub only sets body[data-page], body[data-product] or body[data-post].
*/
(function (window, document) {
  'use strict';
  var A = window.AIRREVE;

  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function h(html) {
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstElementChild;
  }

  /* ---------- product detail ---------- */
  function buildProduct(id) {
    var p = A.products.filter(function (x) { return x.id === id; })[0];
    if (!p) { window.location.replace('products.html'); return null; }
    var t = window.AI.t;
    document.title = p.name + ' · ' + A.company.name;

    var other = A.products.filter(function (x) { return x.id !== p.id; });
    var main = h(
      '<main class="d-page"></main>');

    main.appendChild(h(
      '<section class="u-head"><div class="sf-wrap"><nav class="d-crumb" aria-label="Breadcrumb">' +
        '<a href="index.html">Home</a><span> / </span>' +
        '<a href="products.html">Products</a><span> / </span>' +
        '<span>' + esc(p.name) + '</span></nav></div></section>'));

    var top = h(
      '<section><div class="sf-wrap d-top">' +
        '<div class="d-gal">' +
          '<div class="d-main d-main--zoomable" id="d-main" role="group" aria-label="Product images"></div>' +
          '<div class="d-dots" id="d-dots" aria-hidden="true"></div>' +
          '<div class="d-railwrap">' +
            '<button class="d-arrow" type="button" data-gal="-1" aria-label="Previous">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" ' +
              'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 5l-7 7 7 7"></path></svg></button>' +
            '<div class="d-rail" id="d-rail"></div>' +
            '<button class="d-arrow" type="button" data-gal="1" aria-label="Next">' +
              '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" ' +
              'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 5l7 7-7 7"></path></svg></button>' +
          '</div>' +
        '</div>' +
        '<div class="d-info" id="d-info"></div>' +
      '</div></section>');
    main.appendChild(top);

    var body = h(
      '<section class="sf-section--tight"><div class="sf-wrap two">' +
        '<div class="d-body">' +
          '<span class="sf-eyebrow">' + esc(t('eyebrow.description')) + '</span>' +
          '<p class="sf-body sf-muted sf-multiline" id="d-desc"></p>' +
        '</div>' +
        '<div class="d-body">' +
          '<span class="sf-eyebrow">' + esc(t('label.moqShort') === 'MOQ' ? 'Specifications' : '제품 사양') + '</span>' +
          '<dl class="sf-dl spec-list" id="d-specs"></dl>' +
        '</div>' +
      '</div></section>');
    main.appendChild(body);

    main.appendChild(h(
      '<section class="sf-section--tight sec--cert"><div class="sf-wrap">' +
        '<div class="x-head"><div>' +
          '<span class="sf-eyebrow">' + esc(t('eyebrow.certs')) + '</span>' +
          '<h2 class="sf-h3 x-head__h">' + esc(p.certifications.length === 10 ? 'Ten documents on file' : p.certifications.length + ' documents on file') + '</h2>' +
        '</div></div>' +
        '<div id="d-certs"></div>' +
      '</div></section>'));

    if (other.length) {
      main.appendChild(h(
        '<section class="sf-section--tight d-related"><div class="sf-wrap">' +
          '<div class="x-head"><div>' +
            '<span class="sf-eyebrow">' + esc(t('eyebrow.related')) + '</span>' +
            '<h2 class="sf-h3 x-head__h">' + esc(other.length === 1 ? 'One more item' : other.length + ' more items') + '</h2>' +
          '</div>' +
          '<a class="sf-arrow sf-arrow--dual" href="products.html">' +
            '<span class="sf-arrow__long">' + esc(t('cta.allProducts')) + '</span>' +
            '<span class="sf-arrow__short">' + esc(t('cta.all')) + '</span> ' +
            '<span aria-hidden="true">→</span></a>' +
          '</div>' +
          '<div class="g4" id="d-related"></div>' +
        '</div></section>'));
    }
    return main;
  }

  /* ---------- media post ---------- */
  function buildPost(id) {
    var p = A.posts.filter(function (x) { return x.id === id; })[0];
    if (!p) { window.location.replace('media.html'); return null; }
    document.title = p.title + ' · ' + A.company.name;
    var t = window.AI.t;

    var main = h('<main></main>');
    main.appendChild(h(
      '<section class="hm" style="padding-bottom:0"><div class="sf-wrap">' +
        '<a class="sf-arrow mv-back" href="media.html">' + esc(t('media.back')) + '</a>' +
        '<article class="mv-detail">' +
          '<header class="mv-detail__head" id="p-head"></header>' +
        '</article>' +
      '</div></section>'));
    main.appendChild(h(
      '<section><div class="sf-wrap"><article class="mv-detail">' +
        '<figure class="mv-detail__cover" id="p-cover"></figure>' +
        '<div class="mv-detail__body sf-prose" id="p-body"></div>' +
      '</article></div></section>'));
    main.appendChild(h(
      '<section class="sf-section--tight" style="border-top:1px solid var(--border-hair)">' +
        '<div class="sf-wrap"><div class="x-head"><div>' +
          '<span class="sf-eyebrow">More from Media</span>' +
        '</div>' +
        '<a class="sf-arrow sf-arrow--dual" href="media.html">' +
          '<span class="sf-arrow__long">All posts</span><span class="sf-arrow__short">All</span> ' +
          '<span aria-hidden="true">→</span></a></div>' +
        '<div class="lv-feed" id="p-more"></div></div></section>'));
    return main;
  }

  /* ---------- mount ---------- */
  function mount() {
    var shell = document.querySelector('.storefront-shell');
    if (!shell) return;
    var page = document.body.getAttribute('data-page');
    var host = document.querySelector('main.content');
    if (!host) return;

    var node = page === 'product'
      ? buildProduct(document.body.getAttribute('data-product'))
      : buildPost(document.body.getAttribute('data-post'));
    if (!node) return;

    host.innerHTML = '';
    host.appendChild(node);

    if (page === 'product') window.AI.renderProduct();
    if (page === 'post') {
      window.AI.renderPost();
      Array.prototype.slice.call(document.querySelectorAll('#p-body img')).forEach(function (im) {
        im.setAttribute('data-zoom', im.getAttribute('src'));
      });
    }
  }

  document.addEventListener('DOMContentLoaded', mount);
})(window, document);
