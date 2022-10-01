import Block from "./Block";

export default function renderDOM(query: string, component: Block) {
  const root: HTMLElement|null = document.querySelector(query);

  if (root) {
    root.appendChild(component.getContent());
  }
  component.dispatchComponentDidMount();

  return root;
}
 