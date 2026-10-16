/* Airreve storefront — site content
   Transcribed from https://store.tflowx.com/airreve (company, catalogue, posts, FAQ).
   Global: window.AIRREVE
*/
(function (window) {
  'use strict';

  var CDN = 'https://cnxxaoru6nyd.compat.objectstorage.ap-seoul-1.oraclecloud.com/tflow-public/';
  var LOCAL_IMAGES = 'Images/';

  var IMG = {
    heroWide: LOCAL_IMAGES + 'background.png',
    heroMobile: LOCAL_IMAGES + 'background.png',
    heroMain: LOCAL_IMAGES + 'background.png',
    p75: [
      LOCAL_IMAGES + 'item.png',
      LOCAL_IMAGES + 'detail.png',
      LOCAL_IMAGES + 'fabric.png',
      LOCAL_IMAGES + 'ingredients.png',
      LOCAL_IMAGES + 'size.png'
    ],
    p55: [
      LOCAL_IMAGES + 'item.png',
      LOCAL_IMAGES + 'detail.png',
      LOCAL_IMAGES + 'fabric.png',
      LOCAL_IMAGES + 'ingredients.png',
      LOCAL_IMAGES + 'size.png'
    ],
    postCatalog: [
      CDN + 'storefront/airreve/posts/1791972890637-9h33hv.jpg',
      CDN + 'storefront/airreve/posts/1791972892020-rytfbr.jpg',
      CDN + 'storefront/airreve/posts/1791972892987-yk5vs0.jpg',
      CDN + 'storefront/airreve/posts/1791972893710-54v3e8.jpg'
    ],
    postMomCover: CDN + 'storefront/honestcompany/posts/1791878273069-mbyo15.png',
    postHoclCover: CDN + 'storefront/honestcompany/posts/1791872487032-v0mfrk.png'
  };

  /* ---- i18n: UI chrome. Keys missing a KO entry fall back to EN. ---- */
  var I18N = {
    'nav.home': { en: 'Home', ko: 'Home' },
    'nav.products': { en: 'Products', ko: 'Products' },
    'nav.company': { en: 'Company', ko: 'Company' },
    'nav.media': { en: 'Media', ko: 'Media' },
    'nav.faq': { en: 'FAQ', ko: 'FAQ' },

    'cta.browse': { en: 'Browse products', ko: '제품 둘러보기' },
    'cta.quote': { en: 'Request a quote', ko: '견적 문의' },
    'cta.profile': { en: 'Read the full profile', ko: '회사 소개 전체 보기' },
    'cta.allProducts': { en: 'All products', ko: '전체 제품' },
    'cta.all': { en: 'All', ko: '전체' },
    'cta.add': { en: 'Add', ko: '담기' },
    'cta.added': { en: 'Added', ko: '담김' },
    'cta.viewCart': { en: 'View cart', ko: '장바구니 보기' },

    'eyebrow.company': { en: 'Company', ko: '회사' },
    'eyebrow.about': { en: 'About Us', ko: 'About Us' },
    'eyebrow.companyInfo': { en: 'Company', ko: '회사 정보' },
    'eyebrow.markets': { en: 'Export markets', ko: '수출 시장' },
    'eyebrow.location': { en: 'Location', ko: '위치' },
    'eyebrow.quote': { en: 'Get a quote', ko: '견적 문의' },
    'eyebrow.description': { en: 'Description', ko: '제품 설명' },
    'eyebrow.certs': { en: 'Certifications & records', ko: '인증 및 기록' },
    'eyebrow.related': { en: 'Related products', ko: '관련 제품' },

    'footer.explore': { en: 'Explore', ko: '둘러보기' },
    'footer.details': { en: 'Company details', ko: '회사 정보' },
    'footer.certs': { en: 'Certifications', ko: '인증' },
    'footer.rights': { en: '© 2026 Airreve. All rights reserved.', ko: '© 2026 에어레브. All rights reserved.' },

    'label.moq': { en: 'Minimum order quantity', ko: '최소 주문 수량' },
    'label.lead': { en: 'Lead time', ko: '리드타임' },
    'label.origin': { en: 'Country of origin', ko: '원산지' },
    'label.packing': { en: 'Packing', ko: '포장' },
    'label.instock': { en: 'In stock', ko: '재고 있음' },
    'label.sample': { en: 'Samples available', ko: '샘플 제공' },
    'label.moqShort': { en: 'MOQ', ko: 'MOQ' },
    'label.certified': { en: 'Certified', ko: '인증' },

    'quote.heading': { en: 'Questions and quote requests.', ko: '궁금한 점과 견적 요청.' },
    'quote.body': {
      en: 'Tell us what you need, and we will provide the information or a quote.',
      ko: '필요한 내용을 알려 주시면 정보나 견적으로 답해 드립니다. 회사명과 연락처를 남겨 주세요.'
    },
    'quote.name': { en: 'Contact name', ko: '담당자명' },
    'quote.company': { en: 'Company', ko: '회사명' },
    'quote.email': { en: 'Email', ko: '이메일' },
    'quote.country': { en: 'Country', ko: '국가' },
    'quote.quantity': { en: 'Estimated quantity', ko: '예상 수량' },
    'quote.message': { en: 'What do you need?', ko: '문의 내용' },
    'quote.send': { en: 'Send request', ko: '문의 보내기' },
    'quote.sending': { en: 'Sending…', ko: '전송 중…' },
    'quote.ok': { en: 'Thank you. Your request has been received.', ko: '감사합니다. 문의가 접수되었습니다.' },
    'quote.fail': { en: 'Could not send your request. Please try again.', ko: '문의 전송에 실패했습니다. 다시 시도해 주세요.' },
    'quote.required': { en: 'Please fill in your name, email and message.', ko: '담당자명, 이메일, 문의 내용을 입력해 주세요.' },

    'cart.title': { en: 'Quote cart', ko: '견적 장바구니' },
    'cart.empty': { en: 'Your quote cart is empty.', ko: '견적 장바구니가 비어 있습니다.' },
    'cart.note': { en: 'Request one quote for everything in your cart.', ko: '장바구니의 모든 품목을 한 번에 견적 요청할 수 있습니다.' },
    'cart.items': { en: 'items', ko: '개 품목' },
    'cart.add': { en: 'Request a quote', ko: '견적 요청' },
    'cart.added': { en: 'Added to quote cart', ko: '견적 장바구니에 담았습니다' },
    'cart.removed': { en: 'Removed from quote cart', ko: '견적 장바구니에서 삭제했습니다' },

    'assistant.title': { en: 'Ernie · AI assistant', ko: '어니스트 · AI 상담' },
    'assistant.sub': { en: 'Airreve concierge', ko: '에어레브 안내 도우미' },
    'assistant.placeholder': { en: 'Ask about MOQ, lead time, materials…', ko: 'MOQ, 리드타임, 원단 등을 물어보세요' },
    'assistant.send': { en: 'Send', ko: '전송' },
    'assistant.note': { en: 'Answers come from this store\u2019s own product and FAQ content.', ko: '이 사이트의 제품·FAQ 내용을 바탕으로 답변합니다.' },
    'assistant.launch': { en: 'Chatbot', ko: '챗봇' },
    'assistant.greeting': {
      en: 'Hello, this is an AI representative from Airreve. Please enter your inquiry, and we will assist you promptly.',
      ko: '안녕하세요, 에어레브 AI 담당자입니다. 문의 내용을 입력해 주시면 신속히 도와드리겠습니다.'
    },
    'assistant.fallback': {
      en: 'I could not find that in this store\u2019s content. Try asking about MOQ, lead time, HOCl, fabric, certifications or OEM/ODM — or send a quote request and our team will follow up.',
      ko: '사이트 내 정보에서 답을 찾지 못했습니다. MOQ, 리드타임, HOCl, 원단, 인증, OEM/ODM 중 하나를 물어보시거나 견적 문의를 남겨 주세요.'
    },
    'assistant.contact': { en: 'Contact us', ko: '문의하기' },
    'assistant.topics': { en: 'Try a question', ko: '추천 질문' },

    'products.title': { en: 'Products', ko: '제품' },
    'products.search': { en: 'Search products by name or SKU', ko: '제품명 또는 SKU 검색' },
    'products.categoryAll': { en: 'Category: All', ko: '카테고리: 전체' },
    'products.moqAll': { en: 'MOQ: All', ko: 'MOQ: 전체' },
    'products.moq1': { en: 'MOQ: 1 or fewer', ko: 'MOQ: 1 이하' },
    'products.moq10': { en: 'MOQ: 10 or fewer', ko: 'MOQ: 10 이하' },
    'products.moq50': { en: 'MOQ: 50 or fewer', ko: 'MOQ: 50 이하' },
    'products.moq100': { en: 'MOQ: 100 or fewer', ko: 'MOQ: 100 이하' },
    'products.sortReq': { en: 'Sort: Most requested', ko: '정렬: 문의 많은 순' },
    'products.sortMoq': { en: 'Sort: Lowest MOQ', ko: '정렬: MOQ 낮은 순' },
    'products.sortNew': { en: 'Sort: Newest', ko: '정렬: 최신순' },
    'products.grid': { en: 'Grid', ko: '그리드' },
    'products.table': { en: 'Table', ko: '표' },
    'products.none': { en: 'No products match these filters.', ko: '조건에 맞는 제품이 없습니다.' },
    'products.colProduct': { en: 'Product', ko: '제품' },
    'products.colMoq': { en: 'MOQ', ko: 'MOQ' },
    'products.colLead': { en: 'Lead time', ko: '리드타임' },
    'products.colOrigin': { en: 'Origin', ko: '원산지' },

    'media.title': { en: 'Media', ko: '미디어' },
    'media.blog': { en: 'Blog', ko: '블로그' },
    'media.all': { en: 'All', ko: '전체' },
    'media.posts': { en: 'posts', ko: '개 글' },
    'media.back': { en: '\u2190 Back to Media', ko: '\u2190 미디어로 돌아가기' },
    'media.none': { en: 'Nothing published yet.', ko: '아직 등록된 콘텐츠가 없습니다.' },

    'faq.title': { en: 'FAQ', ko: 'FAQ' },
    'faq.count': { en: 'questions', ko: '개 질문' }
  };

  /* ---- Company facts ---- */
  var COMPANY = {
    name: 'Airreve',
    nameKo: '에어레브',
    summary: 'Gentle on skin. Considered in every detail.',
    industry: 'Cosmetic',
    country: 'Republic of Korea',
    countryKo: '대한민국',
    founded: '2013',
    capacity: '30 million units / year',
    introduction:
      'We create lifestyle essentials for everyday comfort, from bedding to body care, ' +
      'with skin-friendly materials and natural-origin ingredients.\n\n' +
      'With a trusted network of Korean manufacturers, OEM·ODM inquiries are welcome.',
    email: 'c6079@honestm.co.kr',
    phone: 'Whatsapp +82 10 6221 4199',
    phoneKo: '02-335-8008',
    linkedin: 'https://www.linkedin.com/in/hyejun-lee-329954429',
    websiteKo: 'http://www.honestm.co.kr/',
    address: '182, Hyanggi-ro, Deogyang-gu, Goyang-si, Gyeonggi-do, Republic of Korea',
    addressKo: '경기도 고양시 덕양구 향기로182 현대테라타워향동 T201, T202, HL129'
  };

  var COMPANY_TERMS = [
    { key: 'Country of origin', value: 'Republic of Korea · Made in Korea' },
    { key: 'Lead time', value: '3-5 weeks' },
    {
      key: 'Certifications',
      value: 'ISO 9001:2015 · OEKO-TEX\u00ae STANDARD 100 · ECOCERT: Organic Bamboo Raw Material'
    },
    { key: 'Facility', value: 'Cosmetic · Republic of Korea' }
  ];

  var MARKETS = [
    { key: 'Shopee', value: 'Singapore, Taiwan, Tailand, Malaysia, Vietnam, Philippines, Mexico' },
    { key: 'Korea', value: 'Coupang, Naver / 500+ positive review' }
  ];

  /* ---- Catalogue ---- */
  var PRODUCTS = [
    {
      id: '75',
      slug: 'product-75.html',
      name: 'KOOL UP Shower Roll Body Refresh (Sample)',
      category: 'Wet wipes',
      categoryId: '24',
      summary: 'Full-body shower roll that allows showering with just one sheet without water',
      moq: 1,
      leadTime: '2-4 weeks',
      origin: 'Made in Korea',
      packing: '30 sets per carton(120 units)',
      inStock: true,
      sampleAvailable: true,
      sortOrder: 1,
      createdAt: '2026-10-15T07:04:20.000Z',
      images: IMG.p75,
      certifications: [
        'OEKO-TEX\u00ae STANDARD 100',
        'ISO 9001:2015',
        'ECOCERT: Organic Bamboo Raw Material',
        'Fabric Basic Quality Test',
        'Safety Test Report: Hypochlorous Acid Solution Applied to Wet Towel Base',
        'Cooling Performance Test: Contact & Absorption Cooling',
        'Human Patch Test: Primary Skin Irritation',
        'Material Safety Data Sheet (MSDS)',
        'Cosmetics Responsible Seller Registration',
        'Cosmetics Manufacturing Business Registration'
      ],
      specs: [
        { key: 'Product Name', value: 'KOOL UP Shower Roll Body Refresh (\ucfe8\uc5c5 \uc0e4\uc6cc\ub864 \ubc14\ub514 \ub9ac\ud504\ub808\uc26c)' },
        { key: 'Brand', value: 'Airreve (\uc5d0\uc5b4\ub808\ube0c)' },
        { key: 'Product Type', value: 'Cosmetics (body cleansing and moisturizing care)' },
        { key: 'Sheet Size', value: '670x320mm, roll type' },
        { key: 'Fabric', value: 'Natural spunlace cross-hemp embossed, 90gsm' },
        { key: 'Packaging', value: 'Individually Wrapped / 3-Side Seal Pouch (4 pcs, 260x230mm)' },
        { key: 'Country of origin', value: 'Made in Korea' }
      ],
      description:
        'Whenever a Shower Is Out of Reach\n' +
        'After Sports & Golf: Ideal for golf courses, where players sweat heavily and can rarely shower right after a round. Our product has already been supplied to golf courses in Korea.\n' +
        'Postpartum & Care: A gentle, skin-care wet towel for women in their 20s and 30s who find it hard to shower after childbirth. Dermatologically low-irritation tested.\n' +
        'Camping & Trekking: Full-body freshening where water is limited.\n' +
        'Makeup & Sunscreen Removal: Cleanses the face and body with a single sheet.\n\n' +
        'A full-body shower in one sheet, no water needed\n\n' +
        '1. Mildly Acidic pH5 HOCl Water\n' +
        'Skin-friendly, colorless and odorless hypochlorous acid (HOCl) water, produced by electrolyzing water (H\u2082O) and salt (NaCl)\n' +
        'Close to the pH 5.5 of human skin\n' +
        'Patented 4-step purification delivers skin-friendly pH5 HOCl water\n\n' +
        '2. Cleansing and Moisturizing with 6 Nature-Derived Ingredients\n' +
        'Soothing: Heartleaf (Houttuynia cordata), Artemisia capillaris, Witch Hazel\n' +
        'Hydrating: Aloe Saponaria, Yuzu, Allantoin\n' +
        'Skin hydration increased 1.8x after use (32% \u2192 60%)\n' +
        'Clean formula: free of peppermint, artificial fragrance, and limonene\n\n' +
        '3. Cooling and Odor Care with Natural Essential Oils\n' +
        'Plant-based cooling ingredients, plus herbal and phytoncide oils, refresh the skin after sweating\n' +
        'Hinoki (cypress) phytoncide, Indian tea tree, and Tasmanian lavender help control sweat odor at the source rather than masking it with fragrance\n\n' +
        '4. Full-Body Care in a Compact Roll\n' +
        'Extra-large 670\u00d7320mm sheet, individually wrapped for easy carrying in a bag or pocket\n\n' +
        '5. Fabric Made for Skin Contact\n' +
        'Eco-friendly: 0% microplastics, biodegradable\n' +
        'Skin-friendly: soft rayon and bamboo fibers\n' +
        'Durable: 50:50 fiber blend resists tearing\n' +
        'Functional: absorbent, stretchy, and breathable'
    },
    {
      id: '55',
      slug: 'product-55.html',
      name: 'Kool Up Large Shower Roll',
      category: 'Wet wipes',
      categoryId: '24',
      summary: 'Full-body shower roll that allows showering with just one sheet without water',
      moq: 30,
      leadTime: '2-4 weeks',
      origin: 'Made in Korea',
      packing: '30 sets per carton(120 units)',
      inStock: true,
      sampleAvailable: true,
      sortOrder: 2,
      createdAt: '2026-10-15T07:10:00.000Z',
      images: IMG.p55,
      certifications: [
        'ISO 9001:2015',
        'OEKO-TEX\u00ae STANDARD 100',
        'ECOCERT: Organic Bamboo Raw Material',
        'Fabric Basic Quality Test',
        'Material Safety Data Sheet (MSDS)',
        'Human Patch Test: Primary Skin Irritation',
        'Safety Test Report: Hypochlorous Acid Solution Applied to Wet Towel Base',
        'Cooling Performance Test: Contact & Absorption Cooling',
        'Cosmetics Manufacturing Business Registration',
        'Cosmetics Responsible Seller Registration'
      ],
      specs: [
        { key: 'Product Name', value: 'Kool Up Large Shower Roll' },
        { key: 'Brand', value: 'Airreve (\uc5d0\uc5b4\ub808\ube0c)' },
        { key: 'Product Type', value: 'Cosmetics (body cleansing and moisturizing care)' },
        { key: 'Sheet Size', value: '670x320mm, roll type' },
        { key: 'Fabric', value: 'Natural spunlace cross-hemp embossed, 90gsm' },
        { key: 'Packaging', value: 'Individually Wrapped / 3-Side Seal Pouch (4 pcs, 260x230mm)' },
        { key: 'Country of origin', value: 'Made in Korea' }
      ],
      description:
        'A full-body shower in one sheet, no water needed\n\n' +
        '1. Mildly Acidic pH5 HOCl Water\n' +
        'Skin-friendly, colorless and odorless hypochlorous acid (HOCl) water, produced by electrolyzing water (H\u2082O) and salt (NaCl)\n' +
        'Close to the pH 5.5 of human skin\n' +
        'Patented 4-step purification delivers skin-friendly pH5 HOCl water\n\n' +
        '2. Cleansing and Moisturizing with 6 Nature-Derived Ingredients\n' +
        'Soothing: Heartleaf (Houttuynia cordata), Artemisia capillaris, Witch Hazel\n' +
        'Hydrating: Aloe Saponaria, Yuzu, Allantoin\n' +
        'Skin hydration increased 1.8x after use (32% \u2192 60%)\n' +
        'Clean formula: free of peppermint, artificial fragrance, and limonene\n\n' +
        '3. Cooling and Odor Care with Natural Essential Oils\n' +
        'Plant-based cooling ingredients, plus herbal and phytoncide oils, refresh the skin after sweating\n' +
        'Hinoki (cypress) phytoncide, Indian tea tree, and Tasmanian lavender help control sweat odor at the source rather than masking it with fragrance\n\n' +
        '4. Full-Body Care in a Compact Roll\n' +
        'Extra-large 670\u00d7320mm sheet, individually wrapped for easy carrying in a bag or pocket\n\n' +
        '5. Fabric Made for Skin Contact\n' +
        'Eco-friendly: 0% microplastics, biodegradable\n' +
        'Skin-friendly: soft rayon and bamboo fibers\n' +
        'Durable: 50:50 fiber blend resists tearing\n' +
        'Functional: absorbent, stretchy, and breathable\n\n' +
        'Whenever a Shower Is Out of Reach\n' +
        'After Sports & Golf: Ideal for golf courses, where players sweat heavily and can rarely shower right after a round. Our product has already been supplied to golf courses in Korea.\n' +
        'Postpartum & Care: A gentle, skin-care wet towel for women in their 20s and 30s who find it hard to shower after childbirth. Dermatologically low-irritation tested.\n' +
        'Camping & Trekking: Full-body freshening where water is limited.\n' +
        'Makeup & Sunscreen Removal: Cleanses the face and body with a single sheet.'
    }
  ];

  /* ---- FAQ (source content is Korean) ---- */
  var FAQ = [
    {
      q: 'MOQ\uac00 \uc5b4\ub5bb\uac8c \ub418\ub098\uc694?',
      badge: 'MOQ',
      a: '30\uac1c \uc774\uc0c1\uc774\uba74 \uac00\ub2a5\ud569\ub2c8\ub2e4. MOQ \uc870\uc815\uc740 \ub2f4\ub2f9\uc790\uc5d0\uac8c \ubb38\uc758\ud574\uc8fc\uc138\uc694.'
    },
    {
      q: '\uc81c\uc870 \uacf5\uc7a5\uc744 \uc9c1\uc811 \ubcf4\uc720\ud558\uace0 \uc788\ub098\uc694?',
      badge: 'Company',
      a: '\uacbd\uc7c1\ub825 \uc788\ub294 \ub300\ud55c\ubbfc\uad6d \uc81c\uc870 \uacf5\uc7a5\ub4e4\uacfc \ud611\ub825\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4.'
    },
    {
      q: '\ubb3c \uc5c6\uc774\ub3c4 \uc815\ub9d0 \uc53b\uc740 \uac83\ucc98\ub7fc \uac1c\uc6b4\ud55c\uac00\uc694?',
      badge: 'Other',
      a:
        '\ub124. 32\u00d767cm \ub300\ud615 \uc2dc\ud2b8 \ud55c \uc7a5\uc73c\ub85c \uc5bc\uad74\ubd80\ud130 \uc804\uc2e0\uae4c\uc9c0 \ub2e6\uc744 \uc218 \uc788\uc2b5\ub2c8\ub2e4. ' +
        '\uc2dd\ubb3c \ucd94\ucd9c\ubb3c \uae30\ubc18 \uc138\uc815 \uc131\ubd84\uacfc \uc5d0\uc13c\uc15c\uc624\uc77c\uc774 \ub540\uacfc \ub0c4\uc0c8\ub97c \uc815\ub3c8\ud558\uace0, ' +
        '\ucc9c\uc5f0 \ucfe8\ub9c1 \uc6d0\ub8cc\uac00 \uc2dc\uc6d0\ud568\uc744 \ub354\ud574 \uc90d\ub2c8\ub2e4. \ub450\uaed8 90gsm\uc758 \ub450\uafc8\uc740 \uc6d0\ub2e8\uc73c\ub85c ' +
        '\uc804\uc2e0\uc744 \ub2e6\uc544\ub3c4 \uc27d\uac8c \ud5e4\uc9c0\uc9c0 \uc54a\ub294 \ub0b4\uad6c\uc131\uc744 \uac00\uc9c0\uace0 \uc788\uc2b5\ub2c8\ub2e4.'
    },
    {
      q: '\ud574\uc678 \uc218\ucd9c \uc11c\ub958\uac00 \uc788\ub098\uc694?',
      badge: 'Other',
      a:
        '\uc804\uc131\ubd84(INCI) \ubaa9\ub85d\uacfc SDS \ub4f1 \uae30\ubcf8 \uc11c\ub958\ub97c \ubcf4\uc720\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4. ' +
        '\uad6c\uccb4\uc801\uc778 \ubcf4\uc720 \uc11c\ub958 \ubaa9\ub85d\uc740 \ubb38\uc758 \ub0a8\uaca8\uc8fc\uc2dc\uba74 \ub2f4\ub2f9\uc790\uac00 \ud655\uc778 \ud6c4 \uc548\ub0b4\ub4dc\ub9bd\ub2c8\ub2e4.'
    },
    {
      q: '\uac00\uaca9\uc774 \uc5b4\ub5bb\uac8c \ub418\ub098\uc694?',
      badge: 'MOQ',
      a: '\uad6c\ub9e4 \uc218\ub7c9\uacfc \uad6c\uc131\uc5d0 \ub530\ub77c \ubcc0\ub3d9\ub429\ub2c8\ub2e4. \ubb38\uc758 \ub0a8\uaca8\uc8fc\uc2dc\uba74 \ub2f4\ub2f9\uc790\uac00 \ud655\uc778 \ud6c4 \ub9de\ucd98 \uacac\uc801\uc744 \uc548\ub0b4\ub4dc\ub9ac\uaca0\uc2b5\ub2c8\ub2e4.'
    },
    {
      q: '\uc77c\ubc18 \ubb3c\ud2f0\uc2ac\uacfc \ubb50\uac00 \ub2e4\ub978\uac00\uc694?',
      badge: 'Other',
      a: '\uc77c\ubc18 \ubb3c\ud2f0\uc2ac(160\u00d7120mm, 40gsm) \ub300\ube44 \ud06c\uace0 \ub450\uafc8\uc73c\uba70, \ucc9c\uc5f0\uc720\ub798 \uc2a4\ud0a8\ucf00\uc5b4 \uc131\ubd84\uc744 \ud48d\ubd80\ud558\uac8c \ud568\uc720\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4.'
    },
    {
      q: 'HOCl(\ucc28\uc544\uc5fc\uc18c\uc0b0)\uc774 \ubb54\uac00\uc694? \ud53c\ubd80\uc5d0 \uc548\uc804\ud55c\uac00\uc694?',
      badge: 'Other',
      a:
        '\uc778\uccb4 \uba74\uc5ed \uc138\ud3ec\uc5d0\uc11c \uc0dd\uc131\ub418\ub294 \uc778\uccb4\uc5d0 \ubb34\ud574\ud55c \ud56d\uad70 \uc131\ubd84\uc785\ub2c8\ub2e4. ' +
        '\ud2b9\ud5c8 \ubc1b\uc740 \uc758\ub8cc\uc6a9 \ubb3c\ud2f0\uc2ac \uc81c\uc870 \uc124\ube44\ub97c \uc774\uc6a9\ud574 4\ub2e8\uacc4 \uc815\uc81c \uacfc\uc815\uc744 \uac70\uccd0 \uc548\uc804\ud569\ub2c8\ub2e4. ' +
        'pH \uc870\uc808\u00b7\ud53c\ubd80 \ucee8\ub514\uc154\ub2dd \ubaa9\uc801\uc758 \uc131\ubd84\uc785\ub2c8\ub2e4. \uc548\uc804\uc131 \uc2dc\ud5d8 \uc644\ub8cc\ub85c \ubbfc\uac10\ud55c \ud53c\ubd80\uc5d0\ub3c4 \uc0ac\uc6a9 \uac00\ub2a5\ud569\ub2c8\ub2e4.'
    }
  ];

  /* ---- Media / blog ---- */
  var POSTS = [
    {
      id: 'e037033c-44c4-4d41-932d-a81b2bd3f7fc',
      slug: 'media-koolup-catalog.html',
      title: 'Airreve Koolup Catalog(Eng)',
      kind: 'Blog',
      ago: { en: '24 hours ago', ko: '24\uc2dc\uac04 \uc804' },
      read: { en: '1 min read', ko: '1\ubd84' },
      excerpt: 'Product catalogue for Airreve Koolup shower roll.',
      images: IMG.postCatalog,
      body:
        '<h2>Airreve Koolup Catalog</h2>' +
        '<p>The English catalogue for the Airreve KOOL UP Shower Roll line \u2014 product shots, ' +
        'packaging options and specification sheets for buyers.</p>' +
        '<p><img src="' + IMG.postCatalog[0] + '" alt="Airreve Koolup catalog page 1" loading="lazy"></p>' +
        '<p><img src="' + IMG.postCatalog[1] + '" alt="Airreve Koolup catalog page 2" loading="lazy"></p>' +
        '<p><img src="' + IMG.postCatalog[2] + '" alt="Airreve Koolup catalog page 3" loading="lazy"></p>' +
        '<p><img src="' + IMG.postCatalog[3] + '" alt="Airreve Koolup catalog page 4" loading="lazy"></p>' +
        '<p>For the full catalogue file or printed samples, send a quote request from the ' +
        '<a href="company.html">Company</a> page or ask the assistant.</p>'
    },
    {
      id: '1b865cbf-ab8f-48bd-ab10-a13ae11010df',
      slug: 'media-postpartum.html',
      title: '\u201cAfter Giving Birth, How Should I Shower?\u201d A One-Sheet Care Solution for New Moms',
      kind: 'Blog',
      ago: { en: '2 days ago', ko: '2\uc77c \uc804' },
      read: { en: '5 min read', ko: '5\ubd84' },
      excerpt:
        '\u201cHow am I supposed to shower after giving birth?\u201d It\u2019s a worry that expectant mothers around the world share. ' +
        'Postpartum shower timing depends on your recovery, but there\u2019s always a window when you de\u2026',
      cover: IMG.postMomCover,
      body:
        '<p><strong>\u201cHow am I supposed to shower after giving birth?\u201d</strong></p>' +
        '<p>It\u2019s a worry that expectant mothers around the world share. Postpartum shower timing depends on your ' +
        'recovery, but there\u2019s always a window when you desperately want to refresh, yet a full shower feels like too much</p>' +
        '<p>Good hygiene is crucial for recovery. You need a gentle solution that keeps you clean without straining your body.</p>' +
        '<p>In this post, we\u2019ll introduce a way to <strong>clean up easily after birth, take care of your body, ' +
        'and do your body skincare in one step.</strong></p>' +
        '<h3><strong>How Postpartum Cleansing Differs by Country</strong></h3>' +
        '<p>\ud83c\uddf0\ud83c\uddf7 <strong>Korea</strong></p>' +
        '<ul><li>Right after birth, many mothers skip the shower and <strong>simply wipe away sweat and impurities.</strong></li>' +
        '<li>That\u2019s why <strong>body wipes</strong> are often listed as a must-have when packing a hospital bag.</li></ul>' +
        '<p>\ud83c\uddfb\ud83c\uddf3 <strong>Vietnam</strong></p>' +
        '<ul><li>For the first 1 to 2 days after birth, it\u2019s common to wipe the body with a towel instead of rinsing with water.</li>' +
        '<li>Keeping the body warm is considered important, so warm-natured herbs are often used in postpartum care.</li></ul>' +
        '<p>Both countries share one thing: right after birth, mothers look for a way to ' +
        '<strong>get clean easily, without water, and without putting strain on their bodies.</strong></p>' +
        '<h3><strong>But Is Wiping with a Towel Really Okay?</strong></h3>' +
        '<p>A towel is the most familiar method, but it has some drawbacks.</p>' +
        '<ul><li>1) <strong>Friction</strong> while wiping can be a burden on sensitive skin.</li>' +
        '<li>2) You have to wet, wring out, and dry the towel, which is <strong>a hassle.</strong></li>' +
        '<li>3) After birth, there\u2019s little energy left to manage towels and keep them clean.</li></ul>' +
        '<p>That\u2019s why more and more mothers are turning to <strong>single-use shower towels.</strong></p>' +
        '<h3><strong>How the Airreve Shower Roll Is Different</strong></h3>' +
        '<p>The <strong>Airreve Shower Roll</strong> is a <strong>large-size shower towel</strong> that cleans and cares ' +
        'for your skin in a single sheet. It wipes everything from your face to your whole body without water, making it a ' +
        'good fit for the days right after birth when showering is hard.</p>' +
        '<p>\u2705 <strong>Irritation index of 0.00</strong><br>It was rated as non-irritating in a skin irritation test on sensitive skin.</p>' +
        '<p>\u2705 <strong>Soft fabric</strong><br>It uses a soft fabric certified by <strong>Ecocert</strong> and ' +
        '<strong>OEKO-TEX</strong> \u2014 two of the world\u2019s most rigorous global safety certifications ensuring ' +
        'eco-friendly quality and toxic-free safety, so it puts <strong>less strain on your skin than a regular towel.</strong></p>' +
        '<p>\u2705 <strong>Packed with herbal and naturally derived ingredients</strong><br>It contains plenty of ' +
        'warm-natured herbal and naturally derived ingredients.</p>' +
        '<ul><li><strong>Ginger:</strong> A signature warming ingredient, widely used in traditional care cultures across many Asian countries.</li>' +
        '<li><strong>Mugwort:</strong> An herb long loved as an ingredient for caring for the body with warmth.</li>' +
        '<li><strong>Cinnamon:</strong> A skin-conditioning ingredient and a cozy herbal ingredient with a sweet, spicy character.</li></ul>' +
        '<p>\u2705 <strong>Body skincare ingredients for moisturized, comfortable skin</strong></p>' +
        '<ul><li><strong>Heartleaf:</strong> Helps comfort skin that tends to become sensitive.</li>' +
        '<li><strong>Allantoin:</strong> Helps keep skin soft and smooth.</li>' +
        '<li><strong>Yuja (citron):</strong> Adds vitality and freshness to the skin.</li>' +
        '<li><strong>Aloe:</strong> Helps with moisture and soothing care.</li>' +
        '<li><strong>Hyaluronic acid:</strong> A signature ingredient that fills the skin with moisture.</li></ul>' +
        '<p><strong>Mom Care, Done in One Sheet</strong></p>' +
        '<p><strong>Cleansing + body skincare at the same time, with just one towel!</strong></p>' +
        '<p>During the precious time you spend recovering after birth, Airreve is here to lightly lend a helping hand.</p>'
    },
    {
      id: 'ba6680f2-2973-48ff-9b93-7443fa75c0af',
      slug: 'media-vietnam-golf.html',
      title: 'Tips for Staying Refreshed During a Round of Golf in Vietnam',
      kind: 'Blog',
      ago: { en: '3 days ago', ko: '3\uc77c \uc804' },
      read: { en: '4 min read', ko: '4\ubd84' },
      excerpt:
        'Staying Fresh on Vietnam Golf Trips Autumn is already here. Winter is coming, and with it the season when ' +
        'courses freeze over, so more and more golfers head somewhere warm for a golf trip. One of the \u2026',
      body:
        '<h2>Staying Fresh on Vietnam Golf Trips</h2>' +
        '<p>Autumn is already here. Winter is coming, and with it the season when courses freeze over, so more and more ' +
        'golfers head somewhere warm for a golf trip. One of the most popular destinations is <strong>Vietnam</strong>.</p>' +
        '<p>According to the Vietnam National Authority of Tourism, golf tourism visits to Vietnam from Korean and ' +
        'Taiwanese travelers have grown by an average of 10 to 15% every year. With plenty of direct flights and ' +
        'affordable costs, it has become a place golfers return to year after year.</p>' +
        '<h3>One Challenge for Golf in Vietnam: Sweat</h3>' +
        '<p>Vietnam has a hot and humid climate. In summer especially, your clothes are soaked after just a few holes, ' +
        'and even your palms are dripping. Damp hands make your glove uncomfortable to put on, and your grip gets ' +
        'slippery. Sweat mixes with sunscreen and leaves your face and neck sticky. On many days, you can\u2019t shower ' +
        'right after the round.</p>' +
        '<p>What about regular wet wipes? Many have a strong alcohol scent that stings the skin, are too thin to get ' +
        'the job done with one sheet, or leave a sticky feeling that makes you feel even less fresh.</p>' +
        '<h3>The Shower Towel to Pack: Airreve KOOL UP Shower Roll</h3>' +
        '<p>The <strong>Airreve KOOL UP Shower Roll</strong> is a body care towel designed to leave you feeling ' +
        'refreshed, as if you had showered, without any water. It has recently become a must-have item at golf courses ' +
        'in Korea.</p>' +
        '<h3>One Sheet for Sweaty Hands and Face</h3>' +
        '<p>The Airreve KOOL UP Shower Roll contains gentle HOCl (hypochlorous acid), so it can be used comfortably ' +
        'even on sensitive skin. (Skin irritation index of 0.00 in a human patch test.) HOCl is a skincare ingredient ' +
        'gaining attention in Korea for its skin-soothing and antibacterial properties.</p>' +
        '<p>Wipe your sweaty hands so your glove goes on dry and comfortable, then cleanse your face, neck, and arms ' +
        'with the same sheet. It\u2019s also nice to drape around your neck between holes on a hot day.</p>' +
        '<p>Plant-derived cooling ingredients and natural essential oils such as India tea tree add a refreshing ' +
        'feel and neatly take care of sweat odor.</p>' +
        '<h3>Pack Your KOOL UP Shower Roll Before Your Vietnam Round</h3>' +
        '<p>If you want to finish a round in sweaty Vietnam feeling fresh instead of sticky, give the Airreve KOOL UP ' +
        'Shower Roll a try.</p>'
    },
    {
      id: 'f748f720-af0f-446d-99b0-d028c95d2648',
      slug: 'media-hocl.html',
      title:
        'Heartleaf, PDRN, and Retinol, What\u2019s Next? Meet Hypochlorous Acid (HOCl), the Fastest-Growing Skincare Ingredients',
      kind: 'Blog',
      ago: { en: '3 days ago', ko: '3\uc77c \uc804' },
      read: { en: '5 min read', ko: '5\ubd84' },
      excerpt:
        'What do consumers look at most when choosing products that touch their face and body? It used to be price or ' +
        'packaging first. Now more and more people are checking the ingredients carefully. Even hard\u2026',
      cover: IMG.postHoclCover,
      body:
        '<h2>What do consumers look at most when choosing products that touch their face and body?</h2>' +
        '<p>It used to be price or packaging first. Now more and more people are checking the <strong>ingredients</strong> ' +
        'carefully. Even hard-to-pronounce names like Heartleaf, PDRN, and Retinol get researched and compared before ' +
        'anyone decides to buy.</p>' +
        '<p>So what\u2019s the next ingredient to watch?</p>' +
        '<p>It\u2019s <strong>Hypochlorous acid (HOCl)</strong>.</p>' +
        '<p>Google Trends shows that interest in this ingredient is growing worldwide. \ud83d\udcc8</p>' +
        '<p><strong>HOCl sounds complicated. Here\u2019s the simple version.</strong></p>' +
        '<p>Hypochlorous acid, or <strong>HOCl</strong> for short, is a tiny molecule that dissolves in water. The name ' +
        'may sound unfamiliar, but it isn\u2019t foreign to your body at all. It\u2019s a natural antibacterial substance ' +
        'that our own immune cells produce. It leaves little sticky residue and is body-friendly, which makes it a great ' +
        'fit for products you use several times a day.</p>' +
        '<h3>Is it really that widely used?</h3>' +
        '<p>The market numbers say yes. According to the October 2026 report from the global market research firm Future ' +
        'Market Insights (FMI), the cosmetic-grade HOCl ingredient market grew from about ' +
        '<strong>$85.1 million in 2025</strong> to about <strong>$89 million in 2026</strong>, and is projected to ' +
        'reach about <strong>$139.5 million by 2036</strong> (4.6% CAGR).</p>' +
        '<p>Products are multiplying fast, too:</p>' +
        '<ul><li>\ud83d\uded2 In the <strong>U.S.</strong>, HOCl skincare brands are sold at Target, Ulta, Amazon, and ' +
        'more than 1,000 specialty retailers.</li>' +
        '<li>\ud83e\uddf4 In March 2026, an <strong>HOCl line for sensitive skin</strong> aimed at the dermatology channel ' +
        'was launched.</li>' +
        '<li>\ud83c\udfeC In August 2026, a major healthcare company introduced <strong>seven HOCl products</strong> to ' +
        'large retail chains such as Walmart, CVS, and Walgreens.</li>' +
        '<li>\ud83c\udfed On the ingredient side, companies are acquiring HOCl manufacturers to ' +
        '<strong>control everything from production to packaging</strong> themselves.</li></ul>' +
        '<h3><strong>Where do brands use HOCl?</strong></h3>' +
        '<p>HOCl is used in three main directions.</p>' +
        '<p><strong>\u2460 Facial skincare (about 40% of demand)</strong><br>Because it is water-based and leaves little ' +
        'residue, it suits <strong>mists and toners</strong>, leave-on products used several times a day.</p>' +
        '<p><strong>\u2461 Anti-aging (about 32% of functional demand, the largest share)</strong><br>It is formulated ' +
        'alongside wrinkle- and firmness-care ingredients and serves as a ' +
        '<strong>supportive partner that keeps skin comfortable</strong> in multi-functional products.</p>' +
        '<p><strong>\u2462 Sensitive and soothing care</strong><br>It is considered the most direct use of HOCl, in ' +
        'products for reactive skin.</p>' +
        '<h2><strong>So what about Airreve?</strong></h2>' +
        '<p>Airreve\u2019s <strong>Kool Up Large Shower Roll</strong> also contains hypochlorous acid ionized water.</p>' +
        '<p>With HOCl, <strong>how it\u2019s made</strong> matters as much as <strong>what\u2019s in it</strong>. ' +
        'Because it\u2019s a water-based ingredient, water management during production shapes the quality.</p>' +
        '<p>\u2714 <strong>Ionized water made through a 4-stage water purification system</strong><br>Airreve holds a ' +
        'patent for wet wipe manufacturing equipment that generates ionized water through a 4-stage purification ' +
        'process. Managing quality from the very first step of making the water is Airreve\u2019s strength.</p>' +
        '<p>If you\u2019re a buyer interested in HOCl products, please feel free to get in touch. We\u2019ll be happy to ' +
        'share samples and detailed materials. \ud83d\ude0a</p>' +
        '<p><em>Source: Future Market Insights, \u201cCosmetic-Grade Hypochlorous Acid Market\u201d (October 2026)</em></p>'
    }
  ];

  /* ---- Assistant knowledge base (answered from this site's own content) ---- */
  var KNOWLEDGE = [
    {
      id: 'oem',
      match: ['oem', 'odm', 'manufactur', 'factory', '공장', '제조', 'oem\u00b7odm', '제조사'],
      answer:
        'Airreve works with a trusted network of competitive Korean manufacturers rather than owning a single plant. ' +
        'OEM and ODM inquiries are welcome \u2014 leave your requirement in a quote request and our team will follow up.',
      chips: [{ label: 'Request a quote', action: 'quote' }]
    },
    {
      id: 'spec',
      match: ['spec', 'sheet', 'size', 'fabric', 'gsm', 'specification', '스펙', '사이즈', '원단', '규격'],
      answer:
        'Both shower rolls share the same base spec: 670\u00d7320mm roll sheet, natural spunlace cross-hemp embossed ' +
        'fabric at 90gsm, individually wrapped (3-side seal pouch, 4 pcs, 260\u00d7230mm), packed 30 sets per carton ' +
        '(120 units).',
      chips: [{ label: 'Open product page', action: 'link', href: 'product-75.html' }]
    },
    {
      id: 'moq',
      match: ['moq', 'minimum', 'minimum order', '최소', '최소수량', '수량'],
      answer:
        'MOQ depends on the item. The KOOL UP Shower Roll Body Refresh sample is MOQ 1, and the Kool Up Large ' +
        'Shower Roll is MOQ 30. MOQ can be adjusted \u2014 ask our team with a quote request.',
      chips: [{ label: 'Request a quote', action: 'quote' }]
    },
    {
      id: 'lead',
      match: ['lead time', 'leadtime', 'how long', 'delivery', '리드타임', '납기', '기간'],
      answer:
        'Lead time is 2-4 weeks for the KOOL UP Shower Roll Body Refresh sample and 3-5 weeks for the Kool Up Large ' +
        'Shower Roll. Company-level lead time is quoted at 3-5 weeks.',
      chips: [{ label: 'Ask for a schedule', action: 'quote' }]
    },
    {
      id: 'hocl',
      match: ['hocl', 'hypochlorous', '차아염소산', 'ph5', 'ph 5', '살균'],
      answer:
        'HOCl (hypochlorous acid) is the antibacterial substance our own immune cells produce. Airreve electrolyzes ' +
        'water (H\u2082O) and salt (NaCl) and runs a patented 4-step purification to get mildly acidic pH5 HOCl water, ' +
        'close to the pH 5.5 of human skin. A human patch test recorded a skin irritation index of 0.00.',
      chips: [
        { label: 'Read the HOCl article', action: 'link', href: 'media-hocl.html' },
        { label: 'Request a quote', action: 'quote' }
      ]
    },
    {
      id: 'cert',
      match: ['cert', 'certification', 'oeko', 'ecocert', 'iso', 'msds', 'sds', 'inci', '인증', '서류', '성적서'],
      answer:
        'Ten documents are on file for the KOOL UP Shower Roll, including OEKO-TEX\u00ae STANDARD 100, ISO 9001:2015, ' +
        'ECOCERT (organic bamboo raw material), FITI fabric and cooling performance tests, a human patch test, MSDS, ' +
        'and MFDS cosmetics registrations. INCI lists and SDS are available on request.',
      chips: [{ label: 'See the company profile', action: 'link', href: 'company.html' }]
    },
    {
      id: 'difference',
      match: ['different', 'vs', 'versus', 'regular wipe', 'difference', '차이', '물티슈'],
      answer:
        'Against a regular wet wipe (160\u00d7120mm, 40gsm) the shower roll sheet is far larger and thicker at ' +
        '670\u00d7320mm / 90gsm, and it carries a full set of nature-derived skincare ingredients \u2014 heartleaf, ' +
        'artemisia capillaris, witch hazel, aloe saponaria, yuzu and allantoin. Hydration measured 1.8x higher after use ' +
        '(32% \u2192 60%).',
      chips: [{ label: 'Compare products', action: 'link', href: 'products.html' }]
    },
    {
      id: 'fabric',
      match: ['biodegradable', 'microplastic', 'eco', 'rayon', 'bamboo', '환경', '생분해'],
      answer:
        'The fabric is made for skin contact: 0% microplastics and biodegradable, soft rayon and bamboo fibers, and a ' +
        '50:50 fiber blend that resists tearing while staying absorbent, stretchy and breathable.',
      chips: [{ label: 'Open product page', action: 'link', href: 'product-55.html' }]
    },
    {
      id: 'usage',
      match: ['how to use', 'use', 'usage', 'when', 'golf', 'camping', 'postpartum', '사용', '골프', '캠핑', '산후'],
      answer:
        'One sheet covers face to full body with no water: after sports and golf rounds, for postpartum and care ' +
        'situations, while camping or trekking, and for makeup and sunscreen removal.',
      chips: [{ label: 'Read the postpartum guide', action: 'link', href: 'media-postpartum.html' }]
    },
    {
      id: 'price',
      match: ['price', 'cost', 'quote', 'quotation', '가격', '견적', '단가'],
      answer:
        'Pricing varies with order quantity and configuration, so quotes are prepared per inquiry. Add items to the ' +
        'quote cart or leave your details and our team will send a tailored quotation.',
      chips: [{ label: 'Request a quote', action: 'quote' }]
    },
    {
      id: 'contact',
      match: ['contact', 'email', 'phone', 'whatsapp', 'address', '연락', '이메일', '주소', '전화'],
      answer:
        'Email c6079@honestm.co.kr, Whatsapp +82 10 6221 4199, or use the quote form on this site. We are based at ' +
        '182, Hyanggi-ro, Deogyang-gu, Goyang-si, Gyeonggi-do, Republic of Korea.',
      chips: [{ label: 'Request a quote', action: 'quote' }]
    },
    {
      id: 'company',
      match: ['company', 'about', 'founded', 'capacity', '회사', '소개', '설립'],
      answer:
        'Airreve (에어레브) creates lifestyle essentials for everyday comfort \u2014 from bedding to body care \u2014 with ' +
        'skin-friendly materials and natural-origin ingredients, founded in 2013 with capacity of 30 million units ' +
        'per year. Lead time is 3-5 weeks and origin is Republic of Korea.',
      chips: [{ label: 'See the full profile', action: 'link', href: 'company.html' }]
    },
    {
      id: 'market',
      match: ['market', 'export', 'where', 'sell', 'shopee', 'coupang', '수출', '판매', '시장'],
      answer:
        'Export markets include Shopee across Singapore, Taiwan, Tailand, Malaysia, Vietnam, Philippines and Mexico. ' +
        'In Korea the product is sold through Coupang and Naver with 500+ positive reviews.',
      chips: [{ label: 'See the full profile', action: 'link', href: 'company.html' }]
    }
  ];

  window.AIRREVE = {
    cdn: CDN,
    img: IMG,
    i18n: I18N,
    company: COMPANY,
    companyTerms: COMPANY_TERMS,
    markets: MARKETS,
    products: PRODUCTS,
    faq: FAQ,
    posts: POSTS,
    knowledge: KNOWLEDGE,
    suggested: [
      'Do you offer OEM and ODM production?',
      'Please provide a brief specification of the Koolup product.',
      'MOQ\uac00 \uc5b4\ub5bb\uac8c \ub418\ub098\uc694?',
      'Lead time\uc774 \uc5b4\ub5bb\uac8c \ub418\ub098\uc694?'
    ]
  };
})(window);
