// background toggle
// let background = document.querySelector(".video-src");

// function reload(){
//   background.src = "/assets/video/binary-background.mp4";
//   var container = document.getElementById("video-viewport");
//   var content = container.innerHTML;
//   container.innerHTML= content;
// }
// setTimeout(() => {
//   reload();
// }, 13900);

// player
let played = false;
const player = document.querySelector(".my-player");
const playBtn = document.querySelector(".fa-play");
const pauseBtn = document.querySelector(".fa-pause");
const songTitle = document.querySelector(".music-title");
const toggleSong = document.querySelectorAll(".next-btn-player");
const eqz = document.getElementById("myCanvas");
const loader = document.querySelector(".preloader-wrapper");
const muteBtn = document.querySelectorAll(".volume-btn");
let muteState = true;

let idx = 0;
const to = "/assets/music/";

const songs = [
  `${to}flipsyde-someday.mp3`,
  `${to}Markul-B.I.D.mp3`,
  `${to}suicideboys-Paris.mp3`,
  `${to}Noize-mc-sohrani-moyu-rech.mp3`,
  `${to}Morgenshtern - Уфф Деньги.mp3`,
  `${to}Duckwrth-Shaboozey-Start-a-Riot.mp3`
];

let songsCount = songs.length - 1;

var sound = new Howl({
  src: songs[idx],
  onend: function() {
    idx++;
    next(idx);
  },
  onplay: function() {
    eqz.style.display = "inline-block";
    loader.style.display = "none";
    updateCurrentSong(idx);
  }
});

muteBtn.forEach(btn => {
  btn.addEventListener("click", function() {
    sound.mute(muteState);
    muteState = !muteState;
    this.style.display = "none";
    if (this.dataset.type === "up") {
      document.querySelector(".fa-volume-mute").style.display = "inline-block";
    } else {
      document.querySelector(".fa-volume-up").style.display = "inline-block";
    }
  });
});

function updateMusicTitle(index) {
  let titleArr = songs[index].split(`${to}`).splice(1, 1);
  let titleArrIdx = titleArr.length - 1;
  let title = titleArr[titleArrIdx].split(".mp3");
  songTitle.innerHTML = title[0];
}

async function next(index) {
  eqz.style.display = "none";
  loader.style.display = "inline-block";
  if (index > songsCount) {
    idx = 0;
    index = 0;
  }
  await sound.stop();
  sound = await new Howl({
    src: songs[index],
    onend: function() {
      idx++;
      next(idx);
    },
    onplay: function() {
      eqz.style.display = "inline-block";
      loader.style.display = "none";
      updateCurrentSong(idx);
    }
  });
  sound.mute(!muteState);
  sound.play();
  updateMusicTitle(index);
}

toggleSong.forEach(btn => {
  btn.addEventListener("click", function() {
    idx += +this.dataset.next;
    if (idx > songsCount) {
      idx = 0;
    } else if (idx < 0) {
      idx = songsCount;
    }
    next(idx);
  });
});

playBtn.addEventListener("click", function() {
  eqz.style.display = "none";
  loader.style.display = "inline-block";
  if (!played) {
    sound.play();
    played = true;
    this.style.display = "none";
    player.style.display = "inline-block";
    pauseBtn.style.display = "inline-block";
  }
  updateMusicTitle(idx);
});

pauseBtn.addEventListener("click", function() {
  if (played) {
    sound.pause();
    played = false;
    this.style.display = "none";
    player.style.display = "none";
    playBtn.style.display = "inline-block";
  }
});

// player playlist

const playlistBlock = document.querySelector(".player-list-block");
const closePlaylist = document.querySelector(".close-playlist");
const openPlaylist = document.querySelector(".fa-list");
const playlist = document.querySelector(".player-list");

songs.forEach((song, idx) => {
  let songSplit = song.split(`${to}`).splice(1, 1);
  let songName = songSplit[0].split(".mp3");
  playlist.innerHTML += `<li class="song" data-songid="${idx}"><i class="fas fa-atom fa-spin" style="display: none"></i></i>${songName[0]}</li>`;
});

openPlaylist.addEventListener("click", function() {
  playlistBlock.style.display = "flex";
});

closePlaylist.addEventListener("click", function() {
  playlistBlock.style.display = "none";
});

document.addEventListener("mousedown", function(e) {
  if (e.target.closest(".player-list") === null) {
    playlistBlock.style.display = "none";
  }
});

const songsList = document.querySelectorAll(".song");

songsList.forEach(song => {
  song.addEventListener("click", function() {
    idx = +this.dataset.songid;
    song.classList.add("loading-song");
    next(idx);
    updateCurrentSong("update-list");
  });
});

function updateCurrentSong(index) {
  songsList.forEach((song, songid) => {
    if (index === songid) {
      song.style.color = "#65DAFB";
      song.children[0].style.display = "inline-block";
      song.style.pointerEvents = "none";
      song.style.fontSize = "22px";
    } else if (index !== songid || typeof index === "string") {
      song.style.color = "#ffff";
      song.children[0].style.display = "none";
      song.style.pointerEvents = "auto";
      song.style.fontSize = "20px";
    }
    if (typeof index === "number") {
      song.classList.remove("loading-song");
    }
  });
}

// equelizer
var maxBarHeight = 50; //30;
var minBarHeight = 10; //15
var barPadding = 2; //space between bars
var barWidth = 1; //width of each bar
var totalBars = 700; //total bars to create
var barColor = "#fff";
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var bar = [];
var fps = 15;
function InitBars() {
  var barHeight = 0;
  var x = 0;
  var y = 0;
  for (var i = 0; i < totalBars; i++) {
    barHeight = RandomizeHeight();
    x = i + i + barPadding;
    y = ComputeYAxis(barHeight);
    bar.push({
      height: barHeight,
      buffHeight: barHeight,
      x: x,
      y: y
    });
    ShrinkBar(i);
  }
}
function ShrinkBar(index) {
  if (bar[index].height > minBarHeight) {
    ctx.fillStyle = barColor;
    ctx.clearRect(bar[index].x, bar[index].y, barWidth, bar[index].height);
    bar[index].height--;
    bar[index].y = ComputeYAxis(bar[index].height);
    ctx.fillRect(bar[index].x, bar[index].y, barWidth, bar[index].height);
    // 	setTimeout(function() {
    requestAnimationFrame(function() {
      ShrinkBar(index);
    });
    //	}, 1000 / fps);
  } else {
    var newHeight = RandomizeHeight();
    while (newHeight == minBarHeight) {
      newHeight = RandomizeHeight();
    }
    bar[index].buffHeight = newHeight;
    GrowBar(index);
  }
}
function GrowBar(index) {
  if (bar[index].height < bar[index].buffHeight) {
    ctx.fillStyle = barColor;
    ctx.clearRect(bar[index].x, bar[index].y, barWidth, bar[index].height);
    bar[index].height++;
    bar[index].y = ComputeYAxis(bar[index].height);
    ctx.fillRect(bar[index].x, bar[index].y, barWidth, bar[index].height);
    //	setTimeout(function() {
    requestAnimationFrame(function() {
      GrowBar(index);
    });
    //	}, 1000 / fps);
  } else {
    ShrinkBar(index); //shrink it again
  }
}
function RandomizeHeight() {
  //generate random seed number
  return Math.floor(Math.random() * maxBarHeight + minBarHeight);
}
function ComputeYAxis(height) {
  //computes the position of the y
  return Math.round((maxBarHeight - height) / 2);
}
InitBars();
