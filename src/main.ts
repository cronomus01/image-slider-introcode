import './style.css';

import * as SVG from './typescript.svg';
import * as ASD from './images/asd.png';
import * as ASDD from './images/asdd.png';

import ImageSlider from './image-slider.ts';

// const item1 = new LinkedList();

// item1.prepend(SVG.default)
// item1.prepend(ASD.default);
// item1.prepend(ASD.default);
// item1.prepend(SVG.default)
// item1.prepend(SVG.default)
// item1.prepend(ASDD.default);
// item1.prepend(SVG.default)
// item1.prepend(ASD.default);
// item1.prepend(ASDD.default);
// item1.prepend(ASDD.default);
// item1.prepend(SVG.default)
// item1.prepend(ASD.default);
// item1.prepend(2)
// item1.prepend(3)
// item1.prepend(4)
// item1.prepend(5)
// item1.prepend(6)
// item1.prepend(7)
// item1.prepend(8)
// item1.prepend(9)
// item1.prepend(10)
// item1.prepend(11)
// item1.prepend(12)
// item1.prepend(13)
// item1.prepend(14)
// item1.prepend(15)
// item1.prepend(16)
// item1.prepend(17)
// item1.prepend(18)
// item1.prepend(19)
// item1.prepend(20)
// item1.append(0);
// item1.append(-1);
// item1.reverse();

// console.log(item1.print());
// item1.removeValue(10);
// item1.removeValue(20);
// item1.removeValue(30);
// item1.removeValue(40);
// item1.removeValue(5);
// item1.removeValue(45);
// item1.removeValue(54);
// item1.removeValue(20);
// console.log(item1.print())

// const app = document.querySelector<HTMLDivElement>('#app')!;
// function createList(): string {

//   let node = item1.getHead();
//   let listValues = ``;
  
//   while(node) {
//     let active = item1.getHead()?.id === node?.id ? 'pagination-ls-item active' : 'pagination-ls-item';
//     listValues += `<li class="${active}" data-value="${node?.id}"><span></span></li>`;
//     node = node.next;
//   }

//   return listValues;
// }

// let node = item1.getHead();

// async function loadApp() {

//   app.innerHTML = `
//   <div class="container">
//     <ul class="list-ul">
//       <img class="image" data-id="${node?.id}" src="${node?.value}" />
//     </ul>
//   <ul class="pagination-ls">
//     ${createList()}
//   </ul>

//     <div>
//       <button class="previous">Previous</button>
//       <button class="next">Next</button>
//     </div>
//   </div>
//   `;
// }



// async function loadSelect() {

//   const next = app.querySelector<HTMLButtonElement>('.next')!;
//   const previous = app.querySelector<HTMLButtonElement>('.previous')!;
  

//   document.onkeydown = (e) => {
//     if(e.key === 'ArrowRight')
//     {
//       nextCallback();
//     }
//     if(e.key === 'ArrowLeft')
//     {
//       previousCallback();
//     }
//   } 

//   next.addEventListener('click', nextCallback);
//   previous.addEventListener('click', previousCallback)
// }


// async function nextCallback() {
  
//   const ulListEl = app.querySelector('.list-ul')!;
//   const paginationEl = app.querySelector('.pagination-ls')!;
//   const paginationElChildrens = paginationEl.children;
//   const ulChildrens = ulListEl.children!;

//   const image = app.querySelector('.image')!;



//   // image.setAttribute('src', node?.value);

  
//   if(ulChildrens.length < 2)
//   {

    
//   if(node.next === null) {
//     node = item1.getHead();
//   } else {
//     node = node?.next;
//   }

//   const imgEl = document.createElement('img');
//   imgEl.setAttribute('src', node?.value);
//   imgEl.setAttribute('data-id', node?.id);
//   imgEl.classList.add('set-right');

//     ulListEl.append(imgEl)
    
//     for(let i = 0; i < paginationElChildrens.length; i++)
//     {
//       const child = paginationElChildrens.item(i);
  
//       if(child.dataset.value == node.id)
//       {
//         child?.classList.add('active');
  
//       } else {
//         child?.classList.remove('active');
//       }
  
//     }

//     setTimeout(() => {
//       imgEl.previousElementSibling?.classList.add('traverse-left');
//     }, 100)
  
//     await animation(imgEl, 'turn-right');
//     await removeFirstChild(imgEl, ulListEl, 'turn-right');
//   }





//   console.log(node);
// }


// async function previousCallback() {
  

//   const ulListEl = app.querySelector('.list-ul')!;
//   const ulChildrens = ulListEl.children!;

//   const paginationEl = app.querySelector('.pagination-ls')!;
//   const paginationElChildrens = paginationEl.children;



//   if(ulChildrens.length < 2)
//   {
//     if(node.prev === null) {
//       node = item1.getTail();
//     } else {
//       node = node?.prev;
//     }

//     const imgEl = document.createElement('img');
//     imgEl.setAttribute('src', node?.value);
//     imgEl.setAttribute('data-id', node?.id);
//     imgEl.classList.add('set-left');
  
//     ulListEl.prepend(imgEl)

//     for(let i = 0; i < paginationElChildrens.length; i++)
//     {
//       const child = paginationElChildrens.item(i);
  
//       if(child.dataset.value == node?.id)
//       {
//         child?.classList.add('active');
  
//       } else {
//         child?.classList.remove('active');
//       }
//     }

//     setTimeout(() => {
//       imgEl.nextElementSibling?.classList.add('traverse-right');
//     }, 100)
  
//     await animation(imgEl, 'turn-left');
//     await removeLastChild(imgEl, ulListEl, 'turn-left');

 
//   }

 
// }

// async function animation(child: any, direction) {
//   setTimeout(() => {
//     child.classList.add(direction);
//   }, 100)
// }

// async function removeFirstChild(child, parent, direction) {
//   setTimeout(() => {
//     child.classList.remove(direction);
//     child.classList.add('image');
//     child.classList.remove('set-right');
//     parent.removeChild(child.previousElementSibling!);
//   }, 600)
// }

// async function removeLastChild(child, parent, direction) {

//   setTimeout(() => {
//     child.classList.remove(direction);
//     parent.removeChild(child.nextElementSibling!);
//     child.classList.add('image');
//     child.classList.remove('set-left');
//   },600)
// }




// async function main() {
//   await loadApp();
//   await loadSelect();
// }

// main();

const sliderEl = document.querySelector<HTMLDivElement>('#slider')!;

const images = [
  SVG.default,
  ASD.default,
  ASD.default,
  SVG.default,  
  SVG.default,  
  ASDD.default,
  SVG.default,
  ASD.default,
  ASDD.default,
  ASDD.default,
  SVG.default,  
  ASD.default,
]



const slider = new ImageSlider(sliderEl);

slider.save(images);
slider.reverse();

slider.load();