import{S as E,i as P}from"./assets/vendor-f3f87f24.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();let g=1;async function b(t){const c=await fetch(`https://pixabay.com/api/?key=42796479-140a0b0d57e5aafe2bfea6b1d&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${g}&per_page=15`);if(!c.ok)throw new Error("Failed to fetch images");const d=await c.json(),m=d.hits,A=d.totalHits;if(!Array.isArray(m)||m.length===0)throw new Error("No images found");return g++,{images:m,totalHits:A}}const $=document.querySelector(".gallery"),h=document.querySelector(".loader");let v=new E(".gallery a");function S(t){const r=t.map(({webformatURL:s,largeImageURL:n,tags:e,likes:o,downloads:a,comments:c,views:d})=>`<li class="gallery-item">
              <a href="${n}" class="gallery-link"><img class="gallery-img" src="${s}" alt="${e}" data-source="${n}" title="${e}" /></a>
              <div class="activity">
              <h3>Likes<p class="activity-item">${o}</p></h3>
              <h3>Views<p class="activity-item">${d}</p></h3>
              <h3>Comments<p class="activity-item">${c}</p></h3>
              <h3>Downloads<p class="activity-item">${a}</p></div></h3>
          </li>`).join("");$.insertAdjacentHTML("beforeend",r),v.refresh(),h.style.display="none"}function i(t){P.error({title:"Ошибка",message:t,position:"topRight"}),h.style.display="none"}function w(){$.innerHTML='<p class="empty-message">По вашему запросу не найдено ни одного изображения. Попробуйте еще раз!</p>',i("Error."),h.style.display="none"}const L=document.querySelector(".gallery"),I=document.querySelector("input"),T=document.querySelector("form"),u=document.querySelector(".loader-container"),l=document.querySelector(".load-more-btn"),p=document.querySelector(".load-more-loader");let f=1,y="";new E(".gallery a");function q(){f=1}function H(){const t=document.querySelector(".gallery-item");if(t){const{height:r}=t.getBoundingClientRect();return r}return 0}function M(t){t.preventDefault();const r=I.value.trim();if(r.length===0){i("Please enter a search term before searching for images.");return}y!==r&&(q(),L.innerHTML="",l.style.display="none"),y=r,u.style.display="block",b(y).then(s=>{const{images:n,totalHits:e}=s;n.length>0?(S(n),n.length>=15&&f*15<e?l.style.display="block":(l.style.display="none",i("We're sorry, but you've reached the end of search results."))):w()}).catch(s=>{console.error("Error fetching images:",s),i("Failed to fetch images. Please try again later.")}).finally(()=>{u.style.display="none"})}function O(){u.style.display="block",p.style.display="block",b(y).then(t=>{const{images:r,totalHits:s}=t;r.length>0?(S(r),f*15>=s?(l.style.display="none",i("We're sorry, but you've reached the end of search results.")):R(H()*3)):(l.style.display="none",i("We're sorry, but you've reached the end of search results."))}).catch(t=>{console.error("Error fetching more images:",t),i("Failed to fetch more images. Please try again later.")}).finally(()=>{u.style.display="none",p.style.display="none"}),f++}function R(t){window.scrollBy({top:t,behavior:"smooth"})}T.addEventListener("submit",M);l.addEventListener("click",O);
//# sourceMappingURL=commonHelpers.js.map