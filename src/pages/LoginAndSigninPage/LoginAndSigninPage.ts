// import renderDOM from '../../utils/ComponentFunctions/renderDom';
// import LoginForm from './modules/LoginForm';
// import RegForm from './modules/RegForm';

// const loginAndSigninPage = () => {
//   const renderForm = (form:'regForm'|'loginForm') => {
//     const root:HTMLElement|null = document.querySelector('.root');
//     if (root) {
//       root.innerHTML = '';
//     }
//     if (form === 'loginForm') {
//       renderDOM('.root', loginForm);
//     } else {
//       renderDOM('.root', regForm);
//     }
//   };

//   const loginForm = LoginForm(() => {
//     renderForm('regForm');
//   });
//   const regForm = RegForm(() => {
//     renderForm('loginForm');
//   });

//   renderForm('loginForm');
// };

// //export default loginAndSigninPage(); 

// const AuthPage = () => {

//   const renderForm = (form:'regForm'|'loginForm') => {
//     const root:HTMLElement|null = document.querySelector('.root');
//     if (root) {
//       root.innerHTML = '';
//     }
//     if (form === 'loginForm') {
//       renderDOM('.root', loginForm);
//     } else {
//       renderDOM('.root', regForm);
//     }
//   };

//   const loginForm = LoginForm(() => {
//     renderForm('regForm');
//   });
//   const regForm = RegForm(() => {
//     renderForm('loginForm');
//   });

//   renderForm('loginForm');
// };