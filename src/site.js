// Highlights the chat step in view and shows the matching screen in the sticky phone.
(() => {
  const steps = [...document.querySelectorAll('.steps li')];
  const screens = [...document.querySelectorAll('.how .screen > *')];
  if (!steps.length || !('IntersectionObserver' in window)) return;
  const show = (index) => {
    steps.forEach((step, i) => step.classList.toggle('on', i === index));
    screens.forEach((screen, i) => screen.classList.toggle('on', i === index));
  };
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) if (entry.isIntersecting) show(steps.indexOf(entry.target));
    },
    { rootMargin: '-45% 0px -45% 0px' },
  );
  steps.forEach((step) => observer.observe(step));
  show(0);
})();
