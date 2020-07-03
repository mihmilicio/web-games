const template = document.createElement("template");
template.innerHTML = `
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <footer class="footer bg-light text-center py-2">
    <p class="m-0">&copy; Desenvolvido por Gabriela Del Conti & Milena Milicio
  </footer>
`;

export class FooterComponent extends HTMLElement {
  constructor() {
    super();

    this.appendChild(template.content.cloneNode(true));
  }
}
