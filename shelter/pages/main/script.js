let sliderContainer = document.querySelector('.card__items')
let leftArrow = document.querySelector('.arrow__left');
let rightArrow = document.querySelector('.arrow__right');
let slidesCollection = sliderContainer.children;

let petsHtml = generateHTMLContent(petsData);
let slides = randomizeHTML(petsHtml);

slides.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item))

for (let i = 0 ; i < slidesCollection.length; i++) {

  slidesCollection[i].classList.add('card__item_visible')
}

/*Теперь мне нужно опубликовать карточки */

function generateHTMLContent(data) {

  let result = []

  for (let i = 0; i < data.length; i++) {
    let template = `<div id="${i}" class="card__item">
    <div class="img__wrapper">
        <img src="${data[i].img}" alt="${data[i].type} ${data[i].name}" class="card__img">
    </div>
    <h4 class="card__title">${data[i].name}</h4>
    <a href="#" class="button card__button">Learn more</a>    
</div>
`

result.push(template)
  }
return result;
  
}



function randomizeHTML(HTMLColllection) {

  let browserWidth = window.innerWidth;
  let slideNumbers;
  let visibleSlides = document.querySelectorAll('.card__item_visible');
  let arrayVisibleIndex = [];
  
  for (let i = 0; i < visibleSlides.length; i++) {

    arrayVisibleIndex.push(+visibleSlides[i].id)
  }
  let HTMLArrayIndex = [];

  for (let i = 0; i < HTMLColllection.length; i++) {
    HTMLArrayIndex.push(i);
  }

   if (browserWidth >= 1280) {
     slideNumbers = 3;
   } else if (browserWidth >= 768 && browserWidth < 1280 ) {

    slideNumbers = 2;
   } else  {
     slideNumbers = 1;
   }

   let filtredArray = HTMLArrayIndex.filter(item => !arrayVisibleIndex.includes(item));
   let sortedArray = filtredArray.sort((a,b)=>Math.random()*2-1).slice(0, slideNumbers);

   let result = sortedArray.map(item => HTMLColllection[item]);

   return result;

}


function menu() {
  let body = document.querySelector('body')
  let menuBtn = document.querySelector('.menu__button');
  let modals = document.querySelector('.modals');
  let mobileMenu = modals.querySelector('.mobile__menu');

  menuBtn.classList.toggle('rotate');
  mobileMenu.classList.toggle('mobile__menu_hidden');
  body.classList.toggle('unscrollable');
}


document.addEventListener ('click', (event) => {


  let targetDOM = event.target.classList;
  let targetArray = Array.from(targetDOM);
  
   if (targetArray.includes('menu__button')) {
    menu();
   }
  
   if (targetArray.includes('arrow')) {
    slides = randomizeHTML(petsHtml);
    slides.forEach(item => sliderContainer.insertAdjacentHTML('beforeend', item))
    for (let i = 0; i < slidesCollection.length; i++) {
        if (slidesCollection[i].classList.contains('card__item_visible')) {
         
          slidesCollection[i].remove();
          i--;
        } else {

          slidesCollection[i].classList.add('card__item_visible')
        }

    }
   }

  
  
  })

 






























