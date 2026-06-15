// ── NTS WORKHOLDING TRANSITIONS ──
window.addEventListener('DOMContentLoaded', () => {

  const nav         = document.querySelector('nav');
  const geoNavy     = document.querySelector('.geo-navy');
  const geoBlue     = document.querySelector('.geo-blue');
  const geoGray     = document.querySelector('.geo-gray');
  const heroLogo    = document.querySelector('.hero-logo');
  const heroLabel   = document.querySelector('.hero-label');
  const heroTitle   = document.querySelector('.hero-title');
  const heroDivider = document.querySelector('.hero-divider');
  const heroTagline = document.querySelector('.hero-tagline');
  const heroBtns    = document.querySelector('.hero-btns');

  function lerp(a, b, t) { return a + (b - a) * t; }
  function easeOutExpo(t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
  function easeOutBack(t) { const c1=1.70158,c3=c1+1; return 1+c3*Math.pow(t-1,3)+c1*Math.pow(t-1,2); }
  function easeInOutCubic(t) { return t<0.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2; }

  function animate(el, props, duration, delay, easing, onDone) {
    if (!el) return;
    easing = easing || easeOutExpo;
    delay  = delay  || 0;
    setTimeout(() => {
      const startTime = performance.now();
      function tick(now) {
        const t = Math.min((now - startTime) / duration, 1);
        const e = easing(t);
        let transform = '';
        Object.keys(props).forEach(k => {
          const val = lerp(props[k].from, props[k].to, e);
          if (k === 'opacity') el.style.opacity = val;
          else if (k === 'translateY') transform += `translateY(${val}px) `;
          else if (k === 'translateX') transform += `translateX(${val}px) `;
          else if (k === 'scale')      transform += `scale(${val}) `;
        });
        if (transform) el.style.transform = transform.trim();
        if (t < 1) requestAnimationFrame(tick);
        else {
          if (onDone) onDone();
        }
      }
      requestAnimationFrame(tick);
    }, delay);
  }

  // ── GEO CLIP MORPH ──
  function setGeoClip(el, p) {
    p = Math.max(0, Math.min(1, p));
    if (el === geoNavy) {
      el.style.clipPath = `polygon(0 0, ${lerp(0,100,p)}% 0, ${lerp(0,72,p)}% 100%, 0 100%)`;
    } else if (el === geoBlue) {
      const top = lerp(100, 0, p);
      el.style.clipPath = `polygon(0 ${top}%, ${lerp(0,86,p)}% ${top}%, ${lerp(0,60,p)}% 100%, 0 100%)`;
    } else if (el === geoGray) {
      const top = lerp(100, 0, p);
      el.style.clipPath = `polygon(0 ${top}%, ${lerp(0,76,p)}% ${top}%, ${lerp(0,50,p)}% 100%, 0 100%)`;
    }
  }

  // ── HIDE EVERYTHING ──
  [nav, geoNavy, geoBlue, geoGray, heroLogo, heroLabel, heroTitle, heroDivider, heroTagline, heroBtns]
    .forEach(el => { if (el) el.style.opacity = '0'; });

  if (geoNavy) geoNavy.style.clipPath = 'polygon(0 0, 0% 0, 0% 100%, 0 100%)';
  if (geoBlue) geoBlue.style.clipPath = 'polygon(0 100%, 0% 100%, 0% 100%, 0 100%)';
  if (geoGray) geoGray.style.clipPath = 'polygon(0 100%, 0% 100%, 0% 100%, 0 100%)';

  // ── SEQUENCE ──

  // 1. Nav
  animate(nav, { translateY: { from: -80, to: 0 }, opacity: { from: 0, to: 1 } }, 700, 100, easeOutExpo);

  // 2. Navy geo
  setTimeout(() => {
    if (!geoNavy) return;
    geoNavy.style.opacity = '1';
    const start = performance.now(), dur = 900;
    function tick(now) {
      const t = easeOutExpo(Math.min((now - start) / dur, 1));
      setGeoClip(geoNavy, t);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, 300);

  // 3. Blue geo
  setTimeout(() => {
    if (!geoBlue) return;
    geoBlue.style.opacity = '1';
    const start = performance.now(), dur = 700;
    function tick(now) {
      const t = easeOutExpo(Math.min((now - start) / dur, 1));
      setGeoClip(geoBlue, t);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, 700);

  // 4. Gray geo
  setTimeout(() => {
    if (!geoGray) return;
    geoGray.style.opacity = '1';
    const start = performance.now(), dur = 600;
    function tick(now) {
      const t = easeOutExpo(Math.min((now - start) / dur, 1));
      setGeoClip(geoGray, t);
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, 900);

  // 5. Label
  animate(heroLabel, { translateY: { from: 20, to: 0 }, opacity: { from: 0, to: 1 } }, 600, 900, easeOutExpo);

  // 6. Title — char by char for NTS, slide for WORKHOLDING
  setTimeout(() => {
    if (!heroTitle) return;
    heroTitle.style.opacity = '1';
    const ntsNode = heroTitle.childNodes[0];
    const subSpan = heroTitle.querySelector('.sub');

    if (ntsNode && ntsNode.nodeType === 3) {
      const text = ntsNode.textContent.trim();
      const wrapper = document.createElement('span');
      wrapper.style.display = 'inline-block';
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(40px)';
        wrapper.appendChild(span);
        setTimeout(() => {
          const s = performance.now(), dur = 500;
          function tick(now) {
            const t = easeOutBack(Math.min((now - s) / dur, 1));
            span.style.opacity = Math.min(t, 1);
            span.style.transform = `translateY(${lerp(40, 0, t)}px)`;
            if (t < 1) requestAnimationFrame(tick);
            else { span.style.opacity = '1'; span.style.transform = 'none'; }
          }
          requestAnimationFrame(tick);
        }, i * 80);
      });
      ntsNode.replaceWith(wrapper);
    }

    if (subSpan) {
      subSpan.style.opacity = '0';
      subSpan.style.transform = 'translateX(-30px)';
      setTimeout(() => {
        const s = performance.now(), dur = 700;
        function tick(now) {
          const t = easeOutExpo(Math.min((now - s) / dur, 1));
          subSpan.style.opacity = t;
          subSpan.style.transform = `translateX(${lerp(-30, 0, t)}px)`;
          if (t < 1) requestAnimationFrame(tick);
          else { subSpan.style.opacity = '1'; subSpan.style.transform = 'none'; }
        }
        requestAnimationFrame(tick);
      }, 350);
    }
  }, 1000);

  // 7. Divider width expand
  setTimeout(() => {
    if (!heroDivider) return;
    heroDivider.style.opacity = '1';
    heroDivider.style.width = '0px';
    const s = performance.now(), dur = 600;
    function tick(now) {
      const t = easeOutExpo(Math.min((now - s) / dur, 1));
      heroDivider.style.width = `${lerp(0, 72, t)}px`;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, 1400);

  // 8. Tagline
  animate(heroTagline, { translateY: { from: 16, to: 0 }, opacity: { from: 0, to: 1 } }, 600, 1550, easeOutExpo);

  // 9. Buttons
  animate(heroBtns, { translateY: { from: 16, to: 0 }, opacity: { from: 0, to: 1 } }, 500, 1750, easeOutBack);

  // 10. Logo — scale in only, no rotation
  setTimeout(() => {
    if (!heroLogo) return;
    heroLogo.style.opacity = '0';
    heroLogo.style.transform = 'scale(0.3)';
    const s = performance.now(), dur = 600;
    function tick(now) {
      const t = easeOutBack(Math.min((now - s) / dur, 1));
      const sc = lerp(0.3, 1, Math.min(t, 1));
      heroLogo.style.transform = `scale(${sc})`;
      heroLogo.style.opacity = Math.min(t * 3, 1);
      if (t < 1) requestAnimationFrame(tick);
      else {
        heroLogo.style.transform = 'none';
        heroLogo.style.opacity = '1';
      }
    }
    requestAnimationFrame(tick);
  }, 1100);

  // ── SCROLL REVEAL ──
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const delay = el.classList.contains('reveal-delay-1') ? 100
                  : el.classList.contains('reveal-delay-2') ? 200
                  : el.classList.contains('reveal-delay-3') ? 300
                  : el.classList.contains('reveal-delay-4') ? 400 : 0;
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      setTimeout(() => {
        const s = performance.now(), dur = 650;
        function tick(now) {
          const t = easeOutExpo(Math.min((now - s) / dur, 1));
          el.style.opacity = t;
          el.style.transform = `translateY(${lerp(28, 0, t)}px)`;
          if (t < 1) requestAnimationFrame(tick);
          else { el.style.opacity = '1'; el.style.transform = 'none'; }
        }
        requestAnimationFrame(tick);
      }, delay);
      io.unobserve(el);
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => { el.style.opacity = '0'; io.observe(el); });

  // ── GEO PARALLAX ON SCROLL ──
  window.addEventListener('scroll', () => {
    const progress = Math.min(window.scrollY / window.innerHeight, 1);
    if (geoNavy) geoNavy.style.transform = `skewY(${lerp(0, -5, progress)}deg)`;
    if (geoBlue) geoBlue.style.transform  = `translateY(${lerp(0, 30, progress)}px)`;
    if (geoGray) geoGray.style.transform  = `translateY(${lerp(0, 50, progress)}px)`;
  }, { passive: true });

});
