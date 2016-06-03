const ipc = require('electron').ipcRenderer

const selectDirBtn = document.getElementsByClassName('select-directory')

const pressPadBtn = document.getElementsByClassName('pad');

for (var i = 0; i < selectDirBtn.length; i++) {
  (function (){
    var loc = i;
    selectDirBtn[i].addEventListener('click', applyit, false)
      function applyit(){
        ipc.send('open-file-dialog', loc)
      }
    }());
}

ipc.on('selected-directory', function (event, obj) {
  // alert(document.getElementById('selected-file'))
  alert(obj.loc);
  document.getElementById('selected-file'+obj.loc).src = `${obj.files}`
  document.getElementById('pad-1').classList.add('has-audio')
})

//Start & stop samples by clicking pads
for (var i = 0; i < pressPadBtn.length; i++) {
  pressPadBtn[i].addEventListener('click', function (event) {
    if(!this.classList.contains('playing')){
        this.getElementsByTagName('audio')[0].currentTime = 0;
        this.getElementsByTagName('audio')[0].play();
        this.classList.add('playing');
    } else {
      this.getElementsByTagName('audio')[0].pause();
      this.classList.remove('playing');
    }
  })
}
