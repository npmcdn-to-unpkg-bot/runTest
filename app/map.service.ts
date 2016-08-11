import {Injectable} from 'angular2/core';
import {Location} from './location.model';
import {Map, TileLayer} from 'leaflet';

@Injectable()
export class MapService {
  map: Map;
  baseMaps: any;

  constructor() {
    this.baseMaps = {
      OpenStreetMap: new L.TileLayer("http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
      })
    };
  }

  disableMouseEvent(tag: string) {
    var html = L.DomUtil.get(tag);
    L.DomEvent.disableClickPropagation(html);
    L.DomEvent.on(html, 'mousewheel', L.DomEvent.stopPropagation);
  };
}
