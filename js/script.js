/* ==========================================================
   VALOREM - interações do site
   ========================================================== */

/* 1) CONFIGURAÇÃO: troque aqui o número e a mensagem do WhatsApp */
const WHATSAPP_NUMERO = "5534999649518"; // 55 (Brasil) + DDD + número
const WHATSAPP_MENSAGEM = "Olá! Gostaria de saber mais sobre a consultoria financeira da Valorem.";

document.documentElement.classList.add("js");

/* 2) Todos os botões com data-whatsapp abrem a conversa */
const linkWhats = `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(WHATSAPP_MENSAGEM)}`;
document.querySelectorAll("[data-whatsapp]").forEach((el) => {
  el.setAttribute("href", linkWhats);
  el.setAttribute("target", "_blank");
  el.setAttribute("rel", "noopener");
});

/* 3) Cabeçalho muda ao rolar */
const header = document.querySelector(".header");
const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* 4) Menu do celular */
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu");
const fecharMenu = () => {
  menu.classList.remove("is-open");
  toggle.setAttribute("aria-expanded", "false");
};
toggle.addEventListener("click", () => {
  const aberto = menu.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(aberto));
});
menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", fecharMenu));

/* 5) Elementos aparecem suavemente ao rolar */
const itens = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const obs = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          obs.unobserve(e.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  itens.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 80}ms`;
    obs.observe(el);
  });
} else {
  itens.forEach((el) => el.classList.add("is-visible"));
}

/* 6) Números que contam até o valor final */
const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const contadores = document.querySelectorAll("[data-count]");
const animar = (el) => {
  const fim = Number(el.dataset.count);
  const prefixo = el.dataset.prefix || "";
  const sufixo = el.dataset.suffix || "";
  if (reduzir || fim === 0) { el.textContent = `${prefixo}${fim}${sufixo}`; return; }
  const duracao = 1400;
  const inicio = performance.now();
  const passo = (agora) => {
    const t = Math.min((agora - inicio) / duracao, 1);
    const valor = Math.round(fim * (1 - Math.pow(1 - t, 3)));
    el.textContent = `${prefixo}${valor}${sufixo}`;
    if (t < 1) requestAnimationFrame(passo);
  };
  requestAnimationFrame(passo);
};
if ("IntersectionObserver" in window) {
  const obsNum = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (e.isIntersecting) { animar(e.target); obsNum.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  contadores.forEach((el) => obsNum.observe(el));
}

/* 7) Ano do rodapé automático */
document.getElementById("ano").textContent = new Date().getFullYear();
