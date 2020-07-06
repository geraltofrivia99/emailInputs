import EmailsInput from './components/EmailsInput';
// let counter = 1;
// const F = new EmailsInput(document.getElementsByClassName('form')[0]);
// const addBtn = document.getElementsByClassName('btn-add-form')[0];

// addBtn.addEventListener('click', addFormHandler);

// function addFormHandler() {
//     const formWrapper = document.createElement('div');
//     formWrapper.classList.add('form');
//     document.body.appendChild(formWrapper);
//     new EmailsInput(formWrapper);
//     counter++;
// }

var tag = document.createElement('script');
tag.src = "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// some variables (global here, but they don't have to be)
var player;
var videoId = '5MgBikgcWnY';
var videotime = 0;
var timeupdater = null;

// load your player when the API becomes ready
function onYoutubeIframeAPIReady() {
  player = new YT.Player('myPlayer', {
    width: '640',
    height: '390',
    videoId: videoId,
    events: {
      'onReady': onPlayerReady
    }
  });
}

// when the player is ready, start checking the current time every 100 ms.
function onPlayerReady() {
  function updateTime() {
    var oldTime = videotime;
    if(player && player.getCurrentTime) {
      videotime = player.getCurrentTime();
    }
    if(videotime !== oldTime) {
      onProgress(videotime);
    }
  }
  timeupdater = setInterval(updateTime, 100);
}

// when the time changes, this will be called.
function onProgress(currentTime) {
  if(currentTime > 20) {
    console.log("the video reached 20 seconds!");
  }
}

setTimeout(() => { onYoutubeIframeAPIReady() }, 5000)
















