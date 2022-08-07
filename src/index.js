/* eslint max-classes-per-file: "off" */

import './style.scss';
// import HTTPTransport from './utils/HTTPTransport/HTTPTransport';

// function fetchWithRetry(url, options = {}) {
//   console.log('fetchWithRetry');
//   const { tries = 1 } = options;

//   function onError(err) {
//     const triesLeft = tries - 1;
//     if (!triesLeft) {
//       throw err;
//     }

//     return fetchWithRetry(url, { ...options, tries: triesLeft });
//   }

//   return new HTTPTransport().request(url, options).catch(onError);
// }

// fetchWithRetry('https://dev.psyon.pro/api/specialist/getallnames/', {
//   method: 'GET',
// })
//   .then((res) => { console.log('res', res); });

// import Block from './utils/ComponentFunctions/Block';
// import renderDOM from './utils/ComponentFunctions/renderDom';

// class PageX extends Block {
//   render() {
//     return this.compile(`
//     <p>
//       {{title}}
//       {{text}}
//       {{button}}
//       <button  class="button_2" > button 2  </button>
//     </p>`);
//   }
// }

// class Button extends Block {
//   render() {
//     return this.compile(`
//     <button>
//       {{textButton}}
//     </button>`);
//   }
// }
// // 1.27

// const button = new Button('div', {
//   textButton: 'button1',
//   attr: { class: 'button_1' },
//   events: [
//     {
//       class: '.button_1',
//       event: 'click',
//       handler: (e) => {
//         console.log('e.target', e.target);
//       },
//     },
//   ],
// });

// const page = new PageX('div', {
//   title: 'Заголовок',
//   text: 'text',
//   button,
//   attr: { class: 'classAttr' },
//   events: [
//     {
//       class: '.button_1',
//       event: 'click',
//       handler: (e) => {
//         console.log('e.target', e.target);
//       },
//     },
//     {
//       class: '.button_2',
//       event: 'click',
//       handler: (e) => {
//         console.log('e.target', e.target);
//       },
//     },
//   ],
// });
// renderDOM('.test', page);

// setTimeout(() => {
//   console.log('setTimeout!');
//   page.setProps({
//     button: new Button('div', {
//       textButton: 'новый button1',
//       attr: { class: 'button_1' },
//       events: [
//         {
//           class: '.button_1',
//           event: 'click',
//           handler: (e) => {
//             console.log('e.target', e.target);
//           },
//         },
//       ],
//     }),
//   });
// }, 2000);

// setTimeout(() => {
//   console.log('setTimeout!');
//   page.setProps({
//     title: 'Заголовокdede',
//     text: 'text',
//   });
// }, 2000);
