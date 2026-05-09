(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) {
    return;
  }

  const pages = document.querySelectorAll(".page");

  pages.forEach((page) => {
    const lenses = [...page.querySelectorAll(".lens")];
    if (!lenses.length) {
      return;
    }

    const move = (event) => {
      const rect = page.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      page.classList.add("is-lens-active");
      page.style.setProperty("--spot-x", `${x * 130}px`);
      page.style.setProperty("--spot-y", `${y * 160}px`);
      page.style.setProperty("--spot-opacity", "1");

      lenses.forEach((lens, index) => {
        const depth = 10 + (index % 4) * 6;
        lens.style.setProperty("--lens-offset-x", `${x * depth}px`);
        lens.style.setProperty("--lens-offset-y", `${y * depth * 0.72}px`);
      });
    };

    const reset = () => {
      page.classList.remove("is-lens-active");
      page.style.setProperty("--spot-opacity", "0");
      lenses.forEach((lens) => {
        lens.style.setProperty("--lens-offset-x", "0px");
        lens.style.setProperty("--lens-offset-y", "0px");
      });
    };

    page.addEventListener("pointermove", move);
    page.addEventListener("pointerleave", reset);
  });
})();
