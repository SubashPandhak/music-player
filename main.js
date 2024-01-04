let songIndex = 0;
const audioElement = new Audio("./songs/0.mp3");
const masterPlay = document.getElementById("masterPlay");
const myProgress = document.getElementById("myProgress");
const nameAtitle = Array.from(document.getElementsByClassName("nameAtitle"));
const slavePlay = Array.from(document.getElementsByClassName("slavePlay"));
const scover = document.getElementById("scover");
const songn = document.getElementById("songn");
const shuffle = document.getElementById("shuffles");

const songs = [
  {
    songName: "Faded",
    filePath: "./songs/0.mp3",
    coverPath: "./assets/0.jpg",
  },
  {
    songName: "Shape Of You",
    filePath: "./songs/1.mp3",
    coverPath: "./assets/1.jpg",
  },
  {
    songName: "Lost In Japan",
    filePath: "./songs/2.mp3",
    coverPath: "./assets/2.jpg",
  },
  {
    songName: "Senorita",
    filePath: "./songs/3.mp3",
    coverPath: "./assets/3.jpg",
  },
  {
    songName: "Baarishein",
    filePath: "./songs/4.mp3",
    coverPath: "./assets/4.jpg",
  },
  {
    songName: "Alag Aasmaan",
    filePath: "./songs/5.mp3",
    coverPath: "./assets/5.jpg",
  },
  {
    songName: "Stand By Me",
    filePath: "./songs/6.mp3",
    coverPath: "./assets/6.jpg",
  },
  {
    songName: "Naina Da Kya Kasoor",
    filePath: "./songs/7.mp3",
    coverPath: "./assets/7.jpg",
  },
];

nameAtitle.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songNames")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
});

audioElement.addEventListener("timeupdate", () => {
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgress.value = progress;
});

myProgress.addEventListener("change", () => {
  audioElement.currentTime = (myProgress.value * audioElement.duration) / 100;
});

const makeAllPlay = () => {
  slavePlay.forEach((element) => {
    element.classList.remove("fa-circle-pause");
    element.classList.add("fa-circle-play");
  });
};

slavePlay.forEach((element) => {
  element.addEventListener("click", (e) => {
    makeAllPlay();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove("fa-circle-play");
    e.target.classList.add("fa-circle-pause");

    audioElement.src = `songs/${songIndex}.mp3`;
    scover.src = `assets/${songIndex}.jpg`;
    songn.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
  });
});

document.getElementById("nex").addEventListener("click", () => {
  if (songIndex >= 7) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  scover.src = `assets/${songIndex}.jpg`;
  songn.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("prev").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 0;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex}.mp3`;
  scover.src = `assets/${songIndex}.jpg`;
  songn.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

audioElement.addEventListener("ended", () => {
  songIndex++;

  if (songIndex >= songs.length) {
    songIndex = 0;
  }

  audioElement.src = `songs/${songIndex}.mp3`;
  scover.src = `assets/${songIndex}.jpg`;
  songn.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

shuffle.addEventListener("click", () => {
  const shuffledSource = shuffleArray(songs);
  console.log(shuffledSource);
  audioElement.src = shuffledSource[0].filePath;

  audioElement.load();

  scover.src = shuffledSource[0].coverPath;
  songn.innerText = shuffledSource[0].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
