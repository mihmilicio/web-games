const template = document.createElement("template");
const generateTemplate = (activePage) => {
  template.innerHTML = `
    <header class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Web Games</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <nav class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item ${activePage == "home" && "active"}">
            <a class="nav-link" href="/web-games">Home</a>
          </li>
          <li class="nav-item ${activePage == "velha" && "active"}">
            <a class="nav-link" href="velha.html">Jogo da Velha</a>
          </li>
          <li class="nav-item ${activePage == "forca" && "active"}">
            <a class="nav-link" href="forca.html">Jogo da Forca</a>
          </li>
        </ul>
      </nav>
    </header>
  `;
};

export class MenuComponent extends HTMLElement {
  constructor() {
    super();

    const activePage = this.getAttribute("page");
    generateTemplate(activePage);
    this.appendChild(template.content.cloneNode(true));
  }
}
