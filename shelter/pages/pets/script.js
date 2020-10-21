'use strict'

/*Делаю пагинацию: получить 48 элементов
Алгоритм пагинации:

1. Сколько у меня элементов в массиве?
2. Какое сейчас разрешение?
3. Сколько элементов выводится при этом разрешении?
4. На какой странице я находился, когда был клик?
5. На какую страницу надо перейти?

Есть кнопки: 1 страница, предыдущая, текущая, следующая, последняя. 

При загрузке странице кнопок у меня нет физически, значит, их надо создать.
 При загрузке и обновлении страницы должна прогружаться первая страница

*/

/* А нарезать надо не по такому-ли правилу? Номер текущей страницы * количество на страницу
Закончить на предыдущем индексе + количество на страницу

*/
let cardsConainer = document.querySelector('.card__items');
let paginationContainer = document.querySelector('.pagination__container');
let petsHtml = generateHTMLContent(petsData);
let cardsArry = generateRandomArray(petsHtml, 6).map(item => petsHtml[item]); 
let cardsPerPage = getCardPerPage();

generatePagination(cardsArry);
let cards = cardsArry.slice(0, cardsPerPage);

console.log(cardsConainer);

cards.forEach(item => cardsConainer.insertAdjacentHTML('beforeend', item))


function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

function getCardPerPage() {
  let browserWidth = window.innerWidth;
  let slidesPerPage;
  if (browserWidth >= 1280) {
      slidesPerPage = 8;
    } else if (browserWidth >= 768 && browserWidth < 1280 ) {
 
     slidesPerPage = 6;
    } else  {
      slidesPerPage = 3;
    }

    return slidesPerPage;
}


function getPages (array) {
    
    let cardsPerPage = getCardPerPage();
  
   
      let pages = array.length / cardsPerPage;

      return pages;
}


function generatePagination(array) {
  let pages = getPages(array);
 
  let currentPage = paginationContainer.querySelector('.pagination__item_active') ;

  if (currentPage === null) {

    currentPage = 1;
  }
  
  let template = `<button data-firstPage class="pagination__item pagination__item_disabled" >&lt;&lt;</button>
  <button data-previous  class="pagination__item pagination__item_disabled" >&lt;</button>
  <button data-current class="pagination__item pagination__item_active">${currentPage}</button>
  <button data-next class="pagination__item">&gt;</button>
  <button data-lastPage = "${pages}" class="pagination__item">&gt;&gt;</button>`


paginationContainer.insertAdjacentHTML('beforeend', template);

}

function generateRandomArray(data, repeatTimes) {

  let resultArray = [];
for (let i = 0 ; i< data.length * repeatTimes; i++) {

  let item = randomInteger(0, data.length - 1);
  resultArray.push(item);

}

// Пока сойдет. Делаем другую часть этого же задания

return resultArray;
}


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


/*  Алгоритм генерации:

1. Взять пустой сет, 
2. Заполнить его случайными числами от 0 до 7
3. Добавить в массив.
4. Очистить Set
5. Повторить нужное число раз

Делать двумя while? 

*/

document.addEventListener('click', (event) => {

let paginationFirstPage = paginationContainer.querySelector('[data-firstPage]');
let paginationPrevious = paginationContainer.querySelector('[data-previous]');
let paginationCurrent = paginationContainer.querySelector('[data-current]');
let paginationNext = paginationContainer.querySelector('[data-next]');
let paginationLast = paginationContainer.querySelector('[data-lastPage]');
let cardsPerPage = getCardPerPage();
let currentPageNumber = Number(paginationCurrent.innerText);

let pages = getPages(cardsArry);

console.log(event.target);

if (event.target === paginationNext ) {

let nextPage = currentPageNumber + 1;

if (nextPage < pages) {
  cardsConainer.innerHTML = '';
  let startIndex = (nextPage - 1) * cardsPerPage;
  let endIndex = startIndex + cardsPerPage;
  cards = cardsArry.slice(startIndex, endIndex);
  cards.forEach(item => cardsConainer.insertAdjacentHTML('beforeend', item))

  paginationPrevious.classList.remove('pagination__item_disabled');
  paginationFirstPage.classList.remove('pagination__item_disabled');
  paginationCurrent.innerText = nextPage;
} 

if (nextPage === pages) {
  cardsConainer.innerHTML = '';
  let startIndex = (pages - 1) * cardsPerPage;
  let endIndex = startIndex + cardsPerPage;
  cards = cardsArry.slice(startIndex, endIndex);
  cards.forEach(item => cardsConainer.insertAdjacentHTML('beforeend', item))
  paginationNext.classList.add('pagination__item_disabled');
  paginationLast.classList.add('pagination__item_disabled');
  paginationCurrent.innerText = pages;
}

}


if (event.target === paginationLast) {
  cardsConainer.innerHTML = '';
  let startIndex = (pages - 1) * cardsPerPage;
  let endIndex = startIndex + cardsPerPage;
  cards = cardsArry.slice(startIndex, endIndex);
  cards.forEach(item => cardsConainer.insertAdjacentHTML('beforeend', item))
  paginationCurrent.innerText = pages;
  paginationPrevious.classList.remove('pagination__item_disabled');
  paginationFirstPage.classList.remove('pagination__item_disabled');
  paginationNext.classList.add('pagination__item_disabled');
  paginationLast.classList.add('pagination__item_disabled');
}

if (event.target === paginationPrevious) {
  let previousPage = currentPageNumber - 1;

  if (previousPage >= 1) {
    cardsConainer.innerHTML = '';

    let startIndex = (previousPage - 1) * cardsPerPage;
    let endIndex = startIndex + cardsPerPage;

    cards = cardsArry.slice(startIndex, endIndex);
    cards.forEach(item => cardsConainer.insertAdjacentHTML('beforeend', item))
    paginationNext.classList.remove('pagination__item_disabled');
    paginationLast.classList.remove('pagination__item_disabled');
    paginationCurrent.innerText = previousPage;

  }

  if (previousPage === 1) {

    paginationPrevious.classList.add('pagination__item_disabled');
    paginationFirstPage.classList.add('pagination__item_disabled');
  }

}

if (event.target === paginationFirstPage) {
   cardsConainer.innerHTML = '';
   let startIndex = 0;
   let endIndex = startIndex + cardsPerPage;
   cards = cardsArry.slice(startIndex, endIndex);
   cards.forEach(item => cardsConainer.insertAdjacentHTML('beforeend', item));

   paginationPrevious.classList.add('pagination__item_disabled');
  paginationFirstPage.classList.add('pagination__item_disabled');
  paginationNext.classList.remove('pagination__item_disabled');
  paginationLast.classList.remove('pagination__item_disabled');
  paginationCurrent.innerText = '1';

}

  

})






