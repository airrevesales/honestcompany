/* Home page — featured product cards */
(function (window, document) {
  'use strict';
  var A = window.AIRREVE;
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
      .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function render() {
    var host = document.getElementById('home-products');
    if (!host) return;
    var t = window.AI.t;
    host.innerHTML = A.products.map(function (p) {
      return '' +
        '<article class="f-card">' +
          '<a class="f-sq" href="' + esc(p.slug) + '"><img src="' + esc(p.images[0]) + '" alt="' + esc(p.name) + '" loading="lazy"></a>' +
          '<a class="f-card__t" href="' + esc(p.slug) + '">' + esc(p.name) + '</a>' +
          '<div class="sf-chip-row">' +
            '<span class="sf-chip">' + esc(t('label.moqShort')) + ' ' + esc(p.moq) + '</span>' +
            '<span class="sf-chip">' + esc(p.origin) + '</span>' +
            '<span class="sf-chip">' + esc(t('label.instock')) + '</span>' +
          '</div>' +
          '<p class="m-card__d">' + esc(p.summary) + '</p>' +
          '<div class="m-card__f">' +
            '<span class="m-card__moq">' + esc(t('label.moqShort')) + ' ' + esc(p.moq) + '</span>' +
            '<button class="m-add" type="button" data-add="' + esc(p.id) + '">' + esc(t('cta.add')) + '</button>' +
          '</div>' +
        '</article>';
    }).join('');
    Array.prototype.slice.call(host.querySelectorAll('[data-add]')).forEach(function (b) {
      b.addEventListener('click', function () { window.AI.cartAdd(b.getAttribute('data-add')); });
    });
  }
  window.HOME_RENDER = render;
  document.addEventListener('DOMContentLoaded', function () {
    render();
    var prev = window.AI.onLangChange;
    window.AI.onLangChange = function () { if (prev) prev(); render(); };
  });
})(window, document);
