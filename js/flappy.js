onclick = function() {
  const passaro = document.getElementById("passaro");
  let eixoY = parseInt(passaro.style.bottom.split("px"), 10);
  if (eixoY < 640) passaro.style.bottom = `${eixoY + 75}px`;
  else passaro.style.bottom = "640px";
};

const movimento = (parBarreiras, tagName, a, b) => {
  const eixoX = parseInt(parBarreiras.style.right.split("px"), 10);
  if (eixoX <= 1330) {
    parBarreiras.style.right = `${eixoX + 5}px`;
    const again = colisao(a, b, tagName);
    if (eixoX <= -130) randomizar(parBarreiras.children);
    return !again;
  } else {
    parBarreiras.style.right = "-130px";
    parBarreiras.style.display = "flex";
    randomizar(parBarreiras.children);
    return 1;
  }
};

setInterval(function() {
  const passaro = document.getElementById("passaro");
  const eixoY = parseInt(passaro.style.bottom.split("px"), 10);
  if (eixoY > 0) passaro.style.bottom = `${eixoY - 2}px`;
  else passaro.style.bottom = "0px";
}, 10);

const criarBarreiras = (tagName, velocidade) => {
  const parBarreiras = document.getElementById(tagName);
  const barreiras = parBarreiras.children;
  setInterval(function() {
    if (
      !movimento(
        parBarreiras,
        tagName,
        barreiras[0].children[0].style.height,
        barreiras[1].children[1].style.height
      )
    ) {
      console.log("colisao");
      parBarreiras.style.display = "none";
    }
  }, velocidade);
};

function randomizar(barreiras) {
  let Y = Math.floor(Math.random() * 450);
  barreiras[0].children[0].style.height = `${Y}px`;
  barreiras[1].children[1].style.height = `${700 - Y - 250}px`;
}

function colisao(altura1, altura2, tagName) {
  const passaro = document.getElementById("passaro");
  const parBarreiras = document.getElementById(tagName);
  let eixoY = parseInt(passaro.style.bottom.split("px"), 10);
  let eixoX = parseInt(parBarreiras.style.right.split("px"), 10);
  let A = parseInt(altura1.split("px"), 10);
  let B = parseInt(altura2.split("px"), 10);
  const mortes = document.getElementById("morte");
  if (eixoX > 410 && eixoX < 600) {
    if (eixoY - 30 <= B || eixoY + 30 >= 700 - A) {
      progresso(false);
      return true;
    }
  } else if (eixoX === 600 && progresso) progresso(true);
  else if (eixoX === 640 && parBarreiras.style.display === "none")
    mortes.innerHTML = parseInt(mortes.innerHTML, 10) + 1;

  return false;
}

const progresso = reset => {
  const progresso = document.getElementById("numero");
  if (reset) {
    progresso.innerHTML = parseInt(progresso.innerHTML, 10) + 1;
    return true;
  } else if (!reset) {
    progresso.innerHTML = -1;
    return false;
  }
};

criarBarreiras("par-de-barreiras1", 30);
criarBarreiras("par-de-barreiras2", 30);
criarBarreiras("par-de-barreiras3", 30);
criarBarreiras("par-de-barreiras4", 30);
