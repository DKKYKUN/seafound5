import { useEffect } from "react";

export function useScrollReveal() {
  useEffect(() => {
    let io: IntersectionObserver | null = null;

    const run = () => {
      if (io) io.disconnect();

      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in-view");
              io?.unobserve(e.target);
            }
          });
        },
        { threshold: 0.01, rootMargin: "0px 0px 100px 0px" }
      );

      // Observe semua elemen scroll-reveal, termasuk yang belum in-view
      document.querySelectorAll<HTMLElement>(".scroll-reveal").forEach((el) => {
        if (!el.classList.contains("in-view")) {
          io?.observe(el);
        }
      });

      // Elemen yang sudah di viewport saat render langsung kasih in-view
      document.querySelectorAll<HTMLElement>(".scroll-reveal:not(.in-view)").forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.classList.add("in-view");
        }
      });
    };

    // Jalankan langsung + retry untuk konten async
    run();
    const t1 = setTimeout(run, 50);
    const t2 = setTimeout(run, 200);
    const t3 = setTimeout(run, 600);

    return () => {
      io?.disconnect();
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  });  // <-- TANPA dependency array: jalankan setiap render
}
