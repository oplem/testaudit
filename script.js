document.addEventListener("DOMContentLoaded", () => {
    const shownElements = new WeakSet();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !shownElements.has(entry.target)) {
                entry.target.classList.add('visible');
                shownElements.add(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
});
let latestScroll = 0;
let ticking = false;
const speed = -0.5;
function updateParallax() {
  document.body.style.setProperty(
    "--parallax-shift",
    `${latestScroll * speed}px`
  );
  ticking = false;
}

window.addEventListener("scroll", () => {
  latestScroll = window.scrollY;
  if (!ticking) {
    requestAnimationFrame(updateParallax);
    ticking = true;
  }
});
document.addEventListener("DOMContentLoaded", () => {
    // Анимация появления блоков при скролле
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.2
    });
    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));

    // Раскрытие блоков
    let expandedBlock = null;
    document.querySelectorAll('.chess-block').forEach(block => {
        block.addEventListener('click', () => {
            if (expandedBlock && expandedBlock !== block) {
                expandedBlock.classList.remove('expanded');
            }
            block.classList.toggle('expanded');
            expandedBlock = block.classList.contains('expanded') ? block : null;
        });
    });

    // Работа панели "Содержимое"
    document.querySelectorAll('.side-panel li').forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const targetBlock = document.getElementById(targetId);
            if (targetBlock) {
                targetBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // раскрываем нужный блок, скрываем предыдущий
                document.querySelectorAll('.chess-block.expanded').forEach(b => b.classList.remove('expanded'));
                targetBlock.classList.add('expanded');
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", () => {
const sidePanel = document.querySelector('.side-panel');
const panelToggle = document.querySelector('.panel-toggle');
const panelArrow = document.querySelector('.panel-arrow');

panelToggle.addEventListener('click', () => {
    sidePanel.classList.toggle('hidden');
    panelArrow.classList.toggle('rotated');
});

    // Раскрытие блоков по стрелке
    let expandedBlock = null;
    document.querySelectorAll('.block-arrow').forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            e.stopPropagation();
            const block = arrow.closest('.chess-block');
            if (expandedBlock && expandedBlock !== block) {
                expandedBlock.classList.remove('expanded');
            }
            block.classList.toggle('expanded');
            expandedBlock = block.classList.contains('expanded') ? block : null;
        });
    });

    // Работа панели "Содержимое"
    document.querySelectorAll('.side-panel li').forEach(item => {
        item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            const targetBlock = document.getElementById(targetId);
            if (targetBlock) {
                targetBlock.scrollIntoView({ behavior: 'smooth', block: 'center' });
                document.querySelectorAll('.chess-block.expanded').forEach(b => b.classList.remove('expanded'));
                targetBlock.classList.add('expanded');
            }
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Снять выделение со всех кнопок
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            // Скрыть все вкладки
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            // Показать нужную вкладку и выделить кнопку
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab + '-tab').classList.add('active');
        });
    });
});

function initGallery(blockId, imgList, delay = 4000, initialOffset = 0) {
  const block = document.getElementById(blockId);
  if (!block) return;
  let gallery = block.querySelector('.gallery-bg-gallery');
  if (!gallery) {
    gallery = document.createElement('div');
    gallery.className = 'gallery-bg-gallery';
    gallery.style.position = 'absolute';
    gallery.style.left = '0';
    gallery.style.top = '0';
    gallery.style.width = '100%';
    gallery.style.height = '100%';
    gallery.style.zIndex = '0';
    gallery.style.pointerEvents = 'none';
    gallery.style.borderRadius = 'inherit';
    gallery.style.overflow = 'hidden';
    block.prepend(gallery);
  }
  gallery.innerHTML = '';
  imgList.forEach(src => {
    const img = document.createElement('img');
    img.src = src;
    img.className = 'gallery-bg-img';
    img.style.position = 'absolute';
    img.style.left = '0';
    img.style.top = '0';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.borderRadius = 'inherit';
    img.style.opacity = '0';
    img.style.transition = 'opacity 1.2s';
    gallery.appendChild(img);
  });
  const imgs = gallery.querySelectorAll('.gallery-bg-img');
  let current = initialOffset % imgs.length;
  function showBg(idx) {
    imgs.forEach((img, i) => {
      img.style.opacity = (i === idx) ? '1' : '0';
    });
  }
  showBg(current);
  setTimeout(function cycle() {
    current = (current + 1) % imgs.length;
    showBg(current);
    setTimeout(cycle, delay);
  }, delay + Math.floor(Math.random() * 2000)); // рассинхрон по времени
}

document.addEventListener("DOMContentLoaded", () => {
  initGallery('block-uslugi', ['5.png', '4.png', '3.png'], 4000, 0);
  initGallery('block2', ['9.png', '7.png', '1.png'], 4000, 1);
  initGallery('block3', ['10.png', '8.png', '6.png'], 4000, 2);
  initGallery('block4', ['ogon.png', 'ruki.png', 'spina.png'], 4000, 1);
  initGallery('block5', ['2.png', '13.png', '12.png'], 4000, 2);
  initGallery('block6', ['11.png', '14.png', '15.png'], 4000, 0);
});

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById('contact-modal');
  const overlay = document.getElementById('contact-modal-overlay');
  const closeBtn = document.getElementById('modal-close-btn');
  const contactBtns = document.querySelectorAll('.contact-btn, .last-contact-btn');

  function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  contactBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});

