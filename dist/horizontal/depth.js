(() => {
  const gallery = document.querySelector('.gallery');
  const original = document.querySelector('.network-stage');
  const desktop = matchMedia('(min-width:901px) and (min-height:601px) and (hover:hover) and (pointer:fine)');
  const controllers = [...document.querySelectorAll('.scene')].map(scene => {
    let stage = scene.querySelector('.network-stage');
    if (!stage) {stage = original.cloneNode(true);scene.prepend(stage);}
    return createController(scene, stage.querySelector('.network-sculpture'));
  });
  const stopAll = () => controllers.forEach(controller => controller.stop());
  gallery.addEventListener('scroll', () => controllers.forEach(controller => controller.checkVisibility()), {passive:true});
  desktop.addEventListener('change', stopAll);
  document.addEventListener('visibilitychange', stopAll);
  window.addEventListener('horizontal-motion-change', stopAll);
  window.addEventListener('horizontal-panel-change', stopAll);

  function createController(scene, sculpture) {
    let targetX = 0, targetY = 0, currentX = 0, currentY = 0;
    let frame = 0;
    let lastTime = 0;
    const allowed = () => desktop.matches && !document.hidden && document.documentElement.classList.contains('motion-enabled') && !document.querySelector('dialog[open]');
    function paint() {
      sculpture.style.setProperty('--pointer-x', (currentX * 14).toFixed(3) + 'deg');
      sculpture.style.setProperty('--pointer-y', (-currentY * 9).toFixed(3) + 'deg');
    }
    function stop() {
      if (!frame && !targetX && !targetY && !currentX && !currentY) return;
      cancelAnimationFrame(frame);frame = 0;
      targetX = targetY = currentX = currentY = 0;
      paint();
    }
    function tick(time) {
      frame = 0;
      if (!allowed()) {stop();return;}
      const elapsed = Math.min(40, Math.max(1, time - lastTime));
      lastTime = time;
      const ease = 1 - Math.exp(-elapsed / 110);
      currentX += (targetX - currentX) * ease;
      currentY += (targetY - currentY) * ease;
      if (Math.abs(targetX - currentX) + Math.abs(targetY - currentY) < 0.001) {
        currentX = targetX;currentY = targetY;paint();return;
      }
      paint();frame = requestAnimationFrame(tick);
    }
    function animate() {
      if (!frame) {lastTime = performance.now();frame = requestAnimationFrame(tick);}
    }
    scene.addEventListener('pointermove', event => {
      if (!allowed() || event.pointerType === 'touch') return;
      const rect = scene.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetX = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
      targetY = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
      animate();
    });
    scene.addEventListener('pointerleave', () => {
      targetX = targetY = 0;
      if (allowed()) animate();else stop();
    });
    scene.addEventListener('pointercancel', stop);
    return {stop, checkVisibility() {
      const rect = scene.getBoundingClientRect();
      if (rect.right <= 0 || rect.left >= innerWidth) stop();
    }};
  }
})();
