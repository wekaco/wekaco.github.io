import { component } from 'riot';
import App from './app.riot';

const createApp = component(App);

const oReq = new XMLHttpRequest();
oReq.addEventListener('load', function load() {
  const tracks = JSON.parse(this.responseText);

  createApp(document.getElementById('root'), { tracks });
});
oReq.open('GET', 'data/2019-playlist.json');
oReq.send();
