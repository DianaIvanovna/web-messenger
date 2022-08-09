import { BlockInterface } from './types';

export default function renderDOM(query: string, component: BlockInterface) {
  const root: HTMLElement|null = document.querySelector(query);

  if (root) {
    root.appendChild(component.getContent());
  }
  component.dispatchComponentDidMount();

  return root;
}
