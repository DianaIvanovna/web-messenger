import Block from "../../utils/ComponentFunctions/Block";
import "./HomePage.scss"

 class HomePageClass extends Block {
    render() {
      // return this.compile(`
      //   <h1 class="home-page__title">CloudTalk</h1>
      // `);
      return this.compile(`
      <div></div>
    `);
    }
  }


  const HomePage =  new HomePageClass('div', {attr: { class: 'home-page' }});

  export  default HomePage;