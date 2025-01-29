import { AudioContext } from 'node-web-audio-api';
const Audio = global.Audio || AudioContext;

export default class SoundManager {
  constructor() {
    this.sounds = {
      brickHit: new Audio('assets/sounds/brick-hit.mp3'),
      paddleHit: new Audio('assets/sounds/paddle-hit.mp3'),
      gameOver: new Audio('assets/sounds/game-over.mp3'),
      ballMiss: new Audio('assets/sounds/ball-miss.mp3'),
      win: new Audio('assets/sounds/win.mp3'),
      backgroundMusic: new Audio('assets/sounds/background-music.mp3'),
    };
    this.sounds.backgroundMusic.loop = true;
    this.sounds.backgroundMusic.volume = 0.3;
  }

  play(name) {
    if (this.sounds[name]) {
      this.sounds[name].play();
    }
  }

  startBackgroundMusic() {
    this.sounds.backgroundMusic.play();
  }

  stopBackgroundMusic() {
    this.sounds.backgroundMusic.pause();
  }
}
