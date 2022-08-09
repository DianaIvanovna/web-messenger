import Block from '../../../../utils/ComponentFunctions/Block';

const SettingContainer = () => {
  class SettingContainerBlock extends Block {
    render() {
      return this.compile(`
        разрабатывается..
      `);
    }
  }

  const settingContainerBlock = new SettingContainerBlock('div');

  return settingContainerBlock;
};

export default SettingContainer;
