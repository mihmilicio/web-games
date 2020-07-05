const player1 = "x";
const player2 = "o";
var playTime = player1;
var gameOver = false;
let mode;

const radios = document.querySelectorAll('[name="modoJogo"]');
radios.forEach((item) =>
    item.addEventListener("change", (e) => onSelectModo(e))
);

function onSelectModo(e) {
    console.log(e);
    document.getElementById('game').classList.remove('d-none');
    radios.forEach((item) => item.setAttribute("disabled", true));
    const selectedMode = document.querySelector('[name="modoJogo"]:checked').value;
    mode = selectedMode;

    updateMostrador();
    inicializarSpaces();
}

function updateMostrador(){
    if (gameOver) {
        return;
    }
    if (playTime == player1){
        var player = document.querySelectorAll("div#mostrador img")[0]; // ARRUMAR AQUI P H1
        player.setAttribute("src", "imagens/x.png");
    } else{
        var player = document.querySelectorAll("div#mostrador img")[0]; // ARRUMAR AQUI P H1
        player.setAttribute("src", "imagens/o.png");
    }
}

function jogadaPC() {
    var spaces = document.querySelectorAll('.space[round=""]');
    console.log(spaces);
    var selectedIndex = Math.floor(Math.random() * spaces.length); // 0 a *qtde de espaços - 1*
    var selectedSpace = spaces[selectedIndex];
    selectedSpace.innerHTML = "<img src='imagens/o.png'>";
    selectedSpace.setAttribute("round", player2);
    playTime = player1;
}

function inicializarSpaces(){
    var spaces = document.getElementsByClassName("space");
    console.log(spaces);
    for (var i = 0; i < spaces.length; i++) {
        spaces[i].addEventListener("click", function(){
            if (gameOver) {
                return;
            }

            if (mode == '2players') {
                if (this.getElementsByTagName("img").length == 0){
                    if (playTime == player1) {
                        this.innerHTML = "<img src='imagens/x.png'>";
                        this.setAttribute("round", player1);
                        playTime = player2;
                    } else{
                        this.innerHTML = "<img src='imagens/o.png'>";
                        this.setAttribute("round", player2);
                        playTime = player1;
                    }
                    updateMostrador();
                    verificarVencedor();
                }
            } else {
                if (this.getElementsByTagName("img").length == 0){
                    if (playTime == player1) {
                        this.innerHTML = "<img src='imagens/x.png'>";
                        this.setAttribute("round", player1);
                        playTime = player2;

                        updateMostrador();
                        verificarVencedor();

                        if (!gameOver) {
                            jogadaPC();
                            updateMostrador();
                            verificarVencedor();
                        }

                        
                        
                    }
                    
                }
            }
            
        });
    }
}

function verificarVencedor(){ // PLAYER X PLAYER


    var a1 = document.getElementById("a1").getAttribute("round");
    var a2 = document.getElementById("a2").getAttribute("round");
    var a3 = document.getElementById("a3").getAttribute("round");

    var b1 = document.getElementById("b1").getAttribute("round");
    var b2 = document.getElementById("b2").getAttribute("round");
    var b3 = document.getElementById("b3").getAttribute("round");

    var c1 = document.getElementById("c1").getAttribute("round");
    var c2 = document.getElementById("c2").getAttribute("round");
    var c3 = document.getElementById("c3").getAttribute("round");

    var vencedor = "";

    if((a1 == b1 && a1 == c1 && a1 != "") || (a1 == a2 && a1 == a3 && a1 != "") || (a1 == b2 && a1 == c3 && a1 != "")) {
        vencedor = a1;
    }
    else if((b2 == b1 && b2 == b3 && b2 != "") || (b2 == a2 && b2 == c2 && b2 != "") || (b2 == a3 && b2 == c1 && b2 != "")) {
        vencedor = b2;
    }
    else if((c3 == c2 && c3 == c1 && c3 != "") || (c3 == a3 && c3 == b3 && c3 != "")) {
        vencedor = c3;
    }

    if (vencedor != "") {
        gameOver = true;

        setTimeout(() => {
            terminarJogo(vencedor);
        }, 50);

        
    }
    if((a1 != "" && a2 != "" && a3 != "" && b1 !="" && b2 !="" && b3 != "" && c1 != "" && c2 !="" && c3 !="" && vencedor == "")) {
        terminarJogo('empate');
    }
}

function terminarJogo (status) {
    let textVariant;
    if (status == 'empate') {
        textVariant = "Empate!";
    } else if (status == 'x') {
        textVariant = '"x" venceu!';
    } else {
        textVariant = '"o" venceu!';
    }
    let jogarNovamente = confirm(
        `${textVariant}\n\nDeseja jogar novamente?`
    );
  
    if (jogarNovamente) {
        reiniciarJogo();
    } else {
        document
            .querySelectorAll("input, button")
            .forEach((item) => item.setAttribute("disabled", true));

        // resetando event listeners
        var spaces = document.getElementsByClassName("space");
        spaces.forEach(item, () => {
            var old_element = item;
            var new_element = old_element.cloneNode(true);
            old_element.parentNode.replaceChild(new_element, old_element);
        });
    }
}

function reiniciarJogo () {
    var spaces = document.getElementsByClassName("space");
    Array.from(spaces).forEach((item) => {
        item.innerHTML = "";
        item.setAttribute('round', "");
    });
    document.getElementById("game").classList.add('d-none');
    radios.forEach((item) => {
        item.checked = false;
        item.removeAttribute("disabled");
    });
    playTime = player1;
    gameOver = false;
}