const template = document.createElement("template");
template.innerHTML = `
  <header class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Web Games</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <nav class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/velha.html">Jogo da Velha</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/forca.html">Jogo da Forca</a>
        </li>
      </ul>
    </nav>
  </header>
`;

export class MenuComponent extends HTMLElement {
  constructor() {
    super();

    this.appendChild(template.content.cloneNode(true));
  }
}
