document.addEventListener('DOMContentLoaded', () => {
  // 1. Set current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2. Mobile Navigation Toggle
  const menuToggle = document.getElementById('menuToggle');
  const navList = document.getElementById('navList');
  if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navList.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Render Services Accordion
  const segmentsData = [
    { icon: "🏦", name: "Islamic Banks", items: ["Islamic banking product research", "Product benchmarking", "Shariah/AAOIFI research support", "Market and competitor analysis", "Data analytics and dashboards"] },
    { icon: "💼", name: "Islamic Finance Companies", items: ["Product development research", "Business strategy", "Market-entry research", "Customer insights", "Financial/business analytics"] },
    { icon: "📈", name: "Halal Investment Companies", items: ["Halal stock screening support", "Investment research", "Market data analysis", "Portfolio analytics", "Research reports"] },
    { icon: "🧾", name: "Islamic Fintech Companies", items: ["Islamic product research", "Product management", "User/customer research", "Growth strategy", "Data analytics"] },
    { icon: "🏢", name: "Halal Businesses", items: ["Business research", "Competitor analysis", "Branding", "Digital strategy", "Market opportunity analysis"] },
    { icon: "📊", name: "Islamic Asset Management Companies", items: ["Investment research", "Fund/product research", "Market intelligence", "Data analysis", "Reporting dashboards"] },
    { icon: "💰", name: "Takaful Companies", items: ["Market research", "Product research", "Customer insights", "Competitor analysis", "Business analytics"] },
    { icon: "📜", name: "Sukuk & Islamic Capital Market Firms", items: ["Sukuk market research", "Industry analysis", "Data and reporting", "Competitor intelligence", "Research support"] },
    { icon: "🚀", name: "Startups Entering the Halal Economy", items: ["Business model research", "Market-entry analysis", "Product development", "Competitor research", "Growth strategy"] },
    { icon: "🎓", name: "Islamic Finance Institutions & Training Providers", items: ["Research support", "Educational content", "Islamic finance training", "Data analytics training", "YouTube/learning content development"] }
  ];

  const segmentsContainer = document.getElementById('segments');
  if (segmentsContainer) {
    segmentsData.forEach((seg, i) => {
      const el = document.createElement('div');
      el.className = 'segment';
      el.dataset.open = 'false';
      el.innerHTML = `
        <button class="segment-head" aria-expanded="false" aria-controls="seg-body-${i}">
          <span class="label"><span class="icon">${seg.icon}</span>${seg.name}</span>
          <span class="plus">+</span>
        </button>
        <div class="segment-body" id="seg-body-${i}">
          <div class="segment-body-inner">
            <ul>${seg.items.map(item => `<li>${item}</li>`).join('')}</ul>
          </div>
        </div>`;
      segmentsContainer.appendChild(el);

      const head = el.querySelector('.segment-head');
      const body = el.querySelector('.segment-body');
      head.addEventListener('click', () => {
        const isOpen = el.dataset.open === 'true';
        el.dataset.open = (!isOpen).toString();
        head.setAttribute('aria-expanded', (!isOpen).toString());
        body.style.maxHeight = isOpen ? null : body.scrollHeight + 'px';
      });
    });
  }

  // 4. Sliding Tabs Logic
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) targetPanel.classList.add('active');
    });
  });

  // 5. Dynamic Data Sources

  // Alphabetical Research Papers
  const researchPapers = [
    { title: "AAOIFI Governance & Shariah Standards Compliance", cat: "Governance", price: "$49", desc: "A comparative framework analyzing implementation challenges across South Asian Islamic financial institutions." },
    { title: "Asset-Backed vs Asset-Based Sukuk Structures", cat: "Capital Markets", price: "$65", desc: "Structural risk assessment and legal ownership analysis under international commercial laws." },
    { title: "Fintech & Smart Contracts in Murabaha Agreements", cat: "Fintech", price: "$39", desc: "Automating trade execution while maintaining AAOIFI Shariah compliance parameters." },
    { title: "Liquidity Management in Islamic Banking Institutions", cat: "Banking", price: "$55", desc: "Strategic evaluation of central bank Shariah facilities and interbank Islamic money market instruments." },
    { title: "Takaful Surplus Distribution Models Explored", cat: "Takaful", price: "$45", desc: "Comparative analysis of Wakala, Mudaraba, and Hybrid risk-sharing structures." }
  ].sort((a, b) => a.title.localeCompare(b.title));

  // Market Insights Cards
  const marketInsights = [
    { tag: "Market Analysis", title: "Global Sukuk Issuance Trends 2026", desc: "Quarterly review of corporate and sovereign Sukuk performance across GCC and Southeast Asia." },
    { tag: "Banking Insights", title: "Digital Islamic Banking Benchmarking", desc: "Evaluating user experience, onboarding speed, and Shariah automation in digital Islamic banks." },
    { tag: "Macro Analysis", title: "Monetary Policy & Islamic Yield Curves", desc: "Impact of interest rate fluctuations on benchmark pricing in profit-sharing financing contracts." }
  ];

  // Stock Screening Data
  const stockScreeningData = [
    { ticker: "AAPL (Apple Inc.)", musaffa: "Compliant", islamicly: "Compliant", zoya: "Compliant", zamzam: "Compliant", status: "Pass" },
    { ticker: "MSFT (Microsoft Corp.)", musaffa: "Compliant", islamicly: "Compliant", zoya: "Compliant", zamzam: "Compliant", status: "Pass" },
    { ticker: "NVDA (NVIDIA Corp.)", musaffa: "Compliant", islamicly: "Compliant", zoya: "Compliant", zamzam: "Compliant", status: "Pass" },
    { ticker: "TSLA (Tesla Inc.)", musaffa: "Non-Compliant", islamicly: "Questionable", zoya: "Compliant", zamzam: "Review Needed", status: "Review" },
    { ticker: "AMZN (Amazon.com)", musaffa: "Compliant", islamicly: "Compliant", zoya: "Compliant", zamzam: "Compliant", status: "Pass" }
  ];

  // Sukuk & Takaful Cards
  const sukukData = [
    { tag: "Sukuk Paper", title: "Green Sukuk Frameworks for Sustainable Infrastructure", desc: "ESG alignment within Shariah-compliant capital market structures." },
    { tag: "Takaful Paper", title: "Insurtech Solutions in Retakaful Operations", desc: "Improving claims processing speed through distributed ledger technology." }
  ];

  // Blogs Data with YouTube links
  const blogsData = [
    {
      title: "Understanding Mudaraba vs. Musharaka in Modern Startups",
      desc: "An in-depth guide on structuring equity funding for ethical startups without interest-based loans.",
      videoId: "UCZNhj4EBGkq_GonO-0J9yBA" 
    },
    {
      title: "How Shariah Stock Screening Algorithms Work",
      desc: "A technical breakdown of financial ratios, debt-to-market-cap thresholds, and non-halal income purification.",
      videoId: "UCZNhj4EBGkq_GonO-0J9yBA" 
    },
    {
      title: "Case Study: Sukuk Defaults & Legal Precedents",
      desc: "Examining historical restructuring scenarios in Islamic capital markets and investor protection mechanisms.",
      videoId: "UCZNhj4EBGkq_GonO-0J9yBA" 
    }
  ];

  // 6. Render Functions

  // Render Research Papers (With Search Filter)
  const papersContainer = document.getElementById('papersContainer');
  const paperSearchInput = document.getElementById('paperSearchInput');

  function renderPapers(filterText = '') {
    if (!papersContainer) return;
    papersContainer.innerHTML = '';

    const filtered = researchPapers.filter(p => 
      p.title.toLowerCase().includes(filterText.toLowerCase()) || 
      p.desc.toLowerCase().includes(filterText.toLowerCase()) ||
      p.cat.toLowerCase().includes(filterText.toLowerCase())
    );

    if (filtered.length === 0) {
      papersContainer.innerHTML = '<p style="padding: 16px; color: var(--ink-soft);">No research papers found matching your query.</p>';
      return;
    }

    filtered.forEach(p => {
      const row = document.createElement('div');
      row.className = 'paper-row';
      row.innerHTML = `
        <div class="paper-info">
          <h4>${p.title}</h4>
          <p>${p.desc}</p>
        </div>
        <div class="paper-action">
          <span class="card-price">${p.price}</span>
          <button class="btn btn-primary btn-sm btn-purchase" data-title="${p.title}" data-price="${p.price}" data-desc="${p.desc}">Get Access</button>
        </div>
      `;
      papersContainer.appendChild(row);
    });

    // Attach Modal Triggers
    document.querySelectorAll('.btn-purchase').forEach(btn => {
      btn.addEventListener('click', (e) => {
        openPaymentModal(
          e.target.getAttribute('data-title'),
          e.target.getAttribute('data-price'),
          e.target.getAttribute('data-desc')
        );
      });
    });
  }

  if (paperSearchInput) {
    paperSearchInput.addEventListener('input', (e) => renderPapers(e.target.value));
  }
  renderPapers();

  // Render Market Cards
  const marketCardsContainer = document.getElementById('marketCardsContainer');
  if (marketCardsContainer) {
    marketInsights.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div>
          <span class="card-tag">${item.tag}</span>
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
        <div class="card-footer">
          <a href="https://forms.gle/Wtq2EEhE5vZyKUEj8" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">Request Full Brief</a>
        </div>
      `;
      marketCardsContainer.appendChild(card);
    });
  }

  // Render Screener Table
  const screenerTableBody = document.getElementById('screenerTableBody');
  if (screenerTableBody) {
    stockScreeningData.forEach(row => {
      const tr = document.createElement('tr');
      const badgeClass = row.status === 'Pass' ? 'badge-pass' : 'badge-review';
      tr.innerHTML = `
        <td><strong>${row.ticker}</strong></td>
        <td>${row.musaffa}</td>
        <td>${row.islamicly}</td>
        <td>${row.zoya}</td>
        <td>${row.zamzam}</td>
        <td><span class="badge ${badgeClass}">${row.status}</span></td>
      `;
      screenerTableBody.appendChild(tr);
    });
  }

  // Render Sukuk Cards
  const sukukCardsContainer = document.getElementById('sukukCardsContainer');
  if (sukukCardsContainer) {
    sukukData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div>
          <span class="card-tag">${item.tag}</span>
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
        <div class="card-footer">
          <a href="https://forms.gle/Wtq2EEhE5vZyKUEj8" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Download Executive Summary</a>
        </div>
      `;
      sukukCardsContainer.appendChild(card);
    });
  }

  // Render Blogs
  const blogsContainer = document.getElementById('blogsContainer');
  if (blogsContainer) {
    blogsData.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <div>
          <span class="card-tag">Blog &amp; Commentary</span>
          <h4>${item.title}</h4>
          <p>${item.desc}</p>
        </div>
        <div class="card-footer">
          <button class="btn btn-ghost btn-sm btn-watch-video" data-title="${item.title}" data-videoid="${item.videoId}">
            Watch Video Explanation ➔
          </button>
        </div>
      `;
      blogsContainer.appendChild(card);
    });

    document.querySelectorAll('.btn-watch-video').forEach(btn => {
      btn.addEventListener('click', (e) => {
        openVideoModal(
          e.currentTarget.getAttribute('data-title'),
          e.currentTarget.getAttribute('data-videoid')
        );
      });
    });
  }

  // 7. Modals Logic
  const paymentModal = document.getElementById('paymentModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalPaperTitle = document.getElementById('modalPaperTitle');
  const modalPaperPrice = document.getElementById('modalPaperPrice');
  const modalPaperDesc = document.getElementById('modalPaperDesc');
  const btnConfirmPay = document.getElementById('btnConfirmPay');

  function openPaymentModal(title, price, desc) {
    if (!paymentModal) return;
    modalPaperTitle.textContent = title;
    modalPaperPrice.textContent = price;
    modalPaperDesc.textContent = desc;
    paymentModal.classList.add('open');
    paymentModal.setAttribute('aria-hidden', 'false');
  }

  function closePaymentModal() {
    if (!paymentModal) return;
    paymentModal.classList.remove('open');
    paymentModal.setAttribute('aria-hidden', 'true');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closePaymentModal);
  if (btnConfirmPay) {
    btnConfirmPay.addEventListener('click', () => {
      alert('Payment processing simulation complete. Redirecting to booking form for report fulfillment...');
      window.open('https://forms.gle/Wtq2EEhE5vZyKUEj8', '_blank');
      closePaymentModal();
    });
  }

  // Video Modal
  const videoModal = document.getElementById('videoModal');
  const videoModalCloseBtn = document.getElementById('videoModalCloseBtn');
  const videoModalTitle = document.getElementById('videoModalTitle');
  const videoIframe = document.getElementById('videoIframe');

  function openVideoModal(title, videoId) {
    if (!videoModal) return;
    videoModalTitle.textContent = title;
    // Embed channel or search link safely inside modal iframe
    videoIframe.src = `https://www.youtube.com/embed?listType=playlist&list=UUZNhj4EBGkq_GonO-0J9yBA`;
    videoModal.classList.add('open');
    videoModal.setAttribute('aria-hidden', 'false');
  }

  function closeVideoModal() {
    if (!videoModal) return;
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    videoIframe.src = '';
  }

  if (videoModalCloseBtn) videoModalCloseBtn.addEventListener('click', closeVideoModal);

  // Close modals on backdrop click
  window.addEventListener('click', (e) => {
    if (e.target === paymentModal) closePaymentModal();
    if (e.target === videoModal) closeVideoModal();
  });
});
