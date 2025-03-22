const keys = document.querySelectorAll(".key"),
  note = document.querySelector(".nowplaying");


function playNoteByKeyCode(keyCode) {
  const audio = document.querySelector(`audio[data-key="${keyCode}"]`),
    key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!key) 
    return;
  const keyNote = key.getAttribute("data-note");
  key.classList.add("playing");
  note.innerHTML = keyNote;
  audio.currentTime = 0;
  showMusicImage();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

window.addEventListener("keydown", e => playNoteByKeyCode(e.keyCode));

keys.forEach(key => {
  key.addEventListener("transitionend", removeTransition);
  key.addEventListener("touchstart", e =>{
    e.preventDefault();
    const keyCode = key.getAttribute("data-key");
    playNoteByKeyCode(keyCode);
  });
});


document.addEventListener("mousemove", function (event) {
  let note = document.createElement("img");
  note.src = "m.png";
  note.classList.add("note");
  document.body.appendChild(note);

  note.style.left = event.pageX + "px";
  note.style.top = event.pageY + "px";

  setTimeout(() => {
    note.style.opacity = "0";
    note.style.transform = "translateY(-20px)";
  }, 50);

  setTimeout(() => {
    note.remove();
  }, 500);
});

function showMusicImage() {
  const image = document.createElement("img");
  image.src = "m.png";
  image.classList.add("note");
  document.body.appendChild(image);

  image.style.left = `${Math.random() * 80 + 10}%`;
  image.style.top = `${Math.random() * 50 + 20}%`;

  setTimeout(() => {
    image.style.opacity = "0";
    image.style.transform = "scale(1.5)";
    setTimeout(() => image.remove(), 500);
  }, 500);
}


