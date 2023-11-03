console.log("Welcome to Spotify")

// Initilize Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterPlaySong = document.getElementById('masterPlaySong')
let songItems = Array.from(document.getElementsByClassName('songItem'))

let songs = [
    {songName: "Chann Sitare", filePath: "songs/1.mp3", coverPath: "covers/Chann sitre.jpg"},
    {songName: "Kya Loge Tum", filePath: "songs/2.mp3", coverPath: "covers/Kiya Loge tum.jpg"},
    {songName: "Lehenga", filePath: "songs/3.mp3", coverPath: "covers/Lehenga.jpg"},
    {songName: "Leja re", filePath: "songs/4.mp3", coverPath: "covers/Leja-Re.jpg"},
    {songName: "Maan Meri Jaan", filePath: "songs/5.mp3", coverPath: "covers/main meri jaan.jpg"},
    {songName: "Nayan", filePath: "songs/6.mp3", coverPath: "covers/nayan.jpg"},
    {songName: "Tera Fitoor ", filePath: "songs/7.mp3", coverPath: "covers/Tera Fitoor.jpg"},
    {songName: "Teri Jatti", filePath: "songs/8.mp3", coverPath: "covers/tere jetti.jpg"},
    {songName: "Tere Pyar Mein", filePath: "songs/9.mp3", coverPath: "covers/Yere pyaar mein.jpg"},
    {songName: "Zihaal e Miskin", filePath: "ssongs/10.mp3", coverPath: "covers/Zihaal.jpg"}
]

songItems.forEach((element, i)=>{
     element.getElementsByTagName('img')[0].src = songs[i].coverPath
     element.getElementsByClassName('songName')[0].innerText = songs[i].songName
})

// audioElement.play();

// handle play/pause Click button 
masterPlay.addEventListener('click', ()=>{
  if(audioElement.paused || audioElement.currentTime<=0)
  {
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause')
    gif.style.opacity = 1;
  }
  else{
    audioElement.pause();
    masterPlay.classList.remove('fa-circle-pause')
    masterPlay.classList.add('fa-circle-play')
    gif.style.opacity = 0;

  }
})

// Listen to Events 
// audioElement.addEventListener('timeupdate', ()=>{
//     console.log('timeupdate');
//     //  Update Sikkbar
//     let progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
//     console.log(progress);
//     myProgressBar.value = progress;
// })

audioElement.addEventListener('timeupdate', ()=>{ 
  // Update Seekbar
  progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
  myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
  audioElement.currentTime = myProgressBar.value * audioElement.duration/100
})

// audioElement.addEventListener('ended', ()=>{
//    audioElement.src = `${songIndex+1}`
//    myProgressBar.currentTime = 0;
// })

function playNextSong() {
  songIndex = (songIndex + 1)
  audioElement.src = songs[songIndex];
  myProgressBar.currentTime = 0;
  audioElement.play();
}

audioElement.addEventListener('ended', playNextSong);

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.classList.remove('fa-circle-pause');
      element.classList.add('fa-circle-play');
    })
}


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
  element.addEventListener('click', (e)=>{
    if(audioElement.paused)
    {
      console.log(e.target)
      makeAllPlays();
      songIndex = parseInt(e.target.id); 
      e.target.classList.remove('fa-circle-play');
      e.target.classList.add('fa-circle-pause');
      audioElement.src = `songs/${songIndex+1}.mp3`
      audioElement.currentTime = 0;
     audioElement.play();
     masterPlaySong.innerText = songs[songIndex].songName

     masterPlay.classList.remove('fa-circle-play')
     masterPlay.classList.add('fa-circle-pause')
     gif.style.opacity= 1;

    }
    else{
      // makeAllPlays();
      // index = parseInt(e.target.id); 
      e.target.classList.remove('fa-circle-pause');
      e.target.classList.add('fa-circle-play');
      // audioElement.src = `songs/${index+1}.mp3`
      // audioElement.currentTime = 0;
     audioElement.pause();
     masterPlay.classList.remove('fa-circle-play')
     masterPlay.classList.add('fa-circle-pause')
     gif.style.opacity= 0;
    }
  })
})

document.getElementById('next').addEventListener('click', ()=>{
  if(songIndex>=9){
    songIndex = 0;
  }
  else{
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex+1}.mp3`
      audioElement.currentTime = 0;
     audioElement.play();
     masterPlaySong.innerText = songs[songIndex].songName

     masterPlay.classList.remove('fa-circle-play')
     masterPlay.classList.add('fa-circle-pause')
     gif.style.opacity= 1;
})

document.getElementById('previous').addEventListener('click', ()=>{
  if(songIndex<=0){
    songIndex = 9;
  }
  else{
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex+1}.mp3`
      audioElement.currentTime = 0;
     audioElement.play();
     masterPlaySong.innerText = songs[songIndex].songName
     masterPlay.classList.remove('fa-circle-play')
     masterPlay.classList.add('fa-circle-pause')
     gif.style.opacity= 1;
})