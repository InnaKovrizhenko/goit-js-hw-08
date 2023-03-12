import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const STORAGE_KEY = 'videoplayer-current-time';

const time = player.on(
  'timeupdate',
  throttle(function (data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, 1000)
);

currentTimeFunction();

function currentTimeFunction() {
  const array = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (array) {
    const currentTime = array['seconds'];
    player.setCurrentTime(currentTime);
  }
}
