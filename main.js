// 语言切换
const langSwitch = document.getElementById('lang-switch');
function setLang(lang) {
  document.documentElement.lang = lang;
  document.querySelectorAll('.lang').forEach(el => {
    el.textContent = el.getAttribute('data-' + lang);
  });
}
if (langSwitch) {
  langSwitch.addEventListener('change', e => {
    setLang(e.target.value);
    localStorage.setItem('site-lang', e.target.value);
  });
  // 初始化
  const savedLang = localStorage.getItem('site-lang') || 'zh';
  langSwitch.value = savedLang;
  setLang(savedLang);
}
// 轮播图
const carousel = document.querySelector('.carousel');
if (carousel) {
  const imgs = carousel.querySelectorAll('img');
  let idx = 0;
  setInterval(() => {
    imgs.forEach((img, i) => {
      img.style.display = i === idx ? '' : 'none';
    });
    idx = (idx + 1) % imgs.length;
  }, 3000);
}
// 产品分页
const productList = document.getElementById('product-list');
const pagination = document.getElementById('pagination');
const products = [
  {
    img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=400&q=80',
    zh: { name: '棉布', desc: '高品质纯棉面料，柔软舒适，适用于服装、家纺等。' },
    en: { name: 'Cotton Fabric', desc: 'High-quality pure cotton fabric, soft and comfortable, suitable for clothing, home textiles, etc.' }
  },
  {
    img: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80',
    zh: { name: '毛巾', desc: '吸水性强，手感柔软，适合家庭和酒店使用。' },
    en: { name: 'Towel', desc: 'Strong water absorption, soft touch, suitable for home and hotel use.' }
  },
  {
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    zh: { name: '床上用品', desc: '多样化床品套件，舒适健康，提升睡眠品质。' },
    en: { name: 'Bedding', desc: 'Variety of bedding sets, comfortable and healthy, improve sleep quality.' }
  },
  // 复制填充到32个产品
];
while (products.length < 32) {
  products.push(...products.slice(0, Math.min(32 - products.length, 3)));
}
const pageSize = 16;
let currentPage = 1;
function renderProducts(page, lang) {
  if (!productList) return;
  productList.innerHTML = '';
  const start = (page - 1) * pageSize;
  const end = Math.min(start + pageSize, products.length);
  for (let i = start; i < end; i++) {
    const p = products[i];
    const div = document.createElement('div');
    div.className = 'product';
    div.innerHTML = `
      <img src="${p.img}" alt="${p[lang].name}">
      <h3>${p[lang].name}</h3>
      <p>${p[lang].desc}</p>
    `;
    productList.appendChild(div);
  }
}
function renderPagination(pageCount) {
  if (!pagination) return;
  pagination.innerHTML = '';
  for (let i = 1; i <= pageCount; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.className = i === currentPage ? 'active' : '';
    btn.onclick = () => {
      currentPage = i;
      renderProducts(currentPage, getCurrentLang());
      renderPagination(pageCount);
    };
    pagination.appendChild(btn);
  }
}
function getCurrentLang() {
  return (langSwitch && langSwitch.value) || 'zh';
}
function initProductPage() {
  if (!productList) return;
  const pageCount = Math.ceil(products.length / pageSize);
  renderProducts(currentPage, getCurrentLang());
  renderPagination(pageCount);
  if (langSwitch) {
    langSwitch.addEventListener('change', () => {
      renderProducts(currentPage, getCurrentLang());
    });
  }
}
initProductPage(); 