import {Component, ViewChild} from 'angular2/core';
import {MapService} from './map.service';
import {GeocodingService} from './geocoding.service';
import {MarkerComponent} from './marker.component';
import {Location} from './location.model';

@Component({
    selector: 'app',
    template: '<div id="map"></div>'
})
export class AppComponent {
  private mapService: MapService;
  private geocoder: GeocodingService;

  @ViewChild(MarkerComponent) markerComponent:MarkerComponent;

  constructor(mapService: MapService, geocoder: GeocodingService) {
    this.mapService = mapService;
    this.geocoder = geocoder;
  }

  ngOnInit() {
    var map = new L.Map('map', {
      zoomControl: false,
      center: new L.LatLng(40.731253, -73.996139),
      zoom: 12,
      minZoom: 4,
      maxZoom: 19,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    L.control.zoom({ position: 'topright' }).addTo(map);
    L.control.layers(this.mapService.baseMaps).addTo(map);
    L.control.scale().addTo(map);

    this.mapService.map = map;

    this.geocoder.getCurrentLocation()
    .subscribe(
      location => map.panTo([location.latitude, location.longitude]),
      err => console.error(err)
    );
  }

  ngAfterViewInit() {
        this.markerComponent.Initialize();
    }
}
