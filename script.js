const keys = document.querySelectorAll(".key"),
  note = document.querySelector(".nowplaying");

function playNote(e) {
  let key, audio;

  if (e.type === "keydown") {
    audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  } else {
    key = e.currentTarget;
    audio = document.querySelector(`audio[data-key="${key.getAttribute("data-key")}"]`);
  }

  if (!key || !audio) return;

  const keyNote = key.getAttribute("data-note");
  key.classList.add("playing");
  note.innerHTML = keyNote;
  audio.currentTime = 0;

  // منع الخطأ عند تشغيل الصوت على الجوال
  audio.play().catch(() => { });

  showMusicImage();
}

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

keys.forEach(key => key.addEventListener("transitionend", removeTransition));
window.addEventListener("keydown", playNote);

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

keys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
  
  key.addEventListener("touchstart", (e) => {
    e.preventDefault(); 
    playNote(e);
  });

  key.addEventListener("touchend", (e) => {
    e.currentTarget.classList.remove("playing");
  });
});
