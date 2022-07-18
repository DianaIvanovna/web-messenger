import MainButton from './components/MainButton/MainButton';

console.log('!!!!!');
const buttonFunc = () => {
  console.log('buttonFunc');
};

const newbtn = MainButton({
  nameButton: 'aaaaaaaaaaaa',
  handlerButton: buttonFunc,
});

document.body.innerHTML = newbtn;
