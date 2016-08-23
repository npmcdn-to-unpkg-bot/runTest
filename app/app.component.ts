import {Component, ViewChild} from 'angular2/core';
import {MapService} from './map.service';
import {GeocodingService} from './geocoding.service';
import {MarkerComponent} from './marker.component';
import {Location} from './location.model';

@Component({
    selector: 'app',
    directives: [MarkerComponent],
    template: `
    <nav class="navbar nav-default navbar-fixed-top" role="navigation">
      <div class="navbar-header">
          <a class="navbar-brand" href="#" scroll-to="welcome" offset="50"><span>Run</span></a>
      </div>
    </nav>

    <div id="map">
      <marker></marker>
    </div>
    `
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
      center: new L.LatLng(45.535, -122.645),
      zoom: 13,
      minZoom: 10,
      maxZoom: 19,
      layers: [this.mapService.baseMaps.OpenStreetMap]
    });

    L.control.zoom({ position: 'topright' }).addTo(map);
    L.control.layers(this.mapService.baseMaps).addTo(map);
    L.control.scale().addTo(map);


    // var pointA = new L.LatLng(45.561463, -122.63170);
    // var pointB = new L.LatLng(45.550480, -122.631775);
    // var pointB = new L.LatLng(45.549714, -122.629404);
    var pointList = [
      new L.LatLng(45.561463, -122.63170),
      new L.LatLng(45.550480, -122.631775),
      new L.LatLng(45.549714, -122.629404),
      new L.LatLng(45.549663, -122.625521),
      new L.LatLng(45.548987, -122.625521),
      new L.LatLng(45.548964, -122.624942),
      new L.LatLng(45.547572, -122.624940),
      new L.LatLng(45.546700, -122.624103),
      new L.LatLng(45.545603, -122.623497),
      new L.LatLng(45.545627, -122.623550),
      new L.LatLng(45.545200, -122.624290),
      new L.LatLng(45.544674, -122.623973),
      new L.LatLng(45.535141, -122.623972),
      new L.LatLng(45.535161, -122.623004),
      new L.LatLng(45.534905, -122.622903),
      new L.LatLng(45.519384, -122.622951),
      new L.LatLng(45.519276, -122.607878),
      new L.LatLng(45.516517, -122.607835),
      new L.LatLng(45.516532, -122.607020),
      new L.LatLng(45.516765, -122.606473),
      new L.LatLng(45.516804, -122.598819),
      new L.LatLng(45.516954, -122.597725),
      new L.LatLng(45.516926, -122.592253),
      new L.LatLng(45.515701, -122.592244),
      new L.LatLng(45.515323, -122.592351),
      new L.LatLng(45.514992, -122.592037),
      new L.LatLng(45.514479, -122.592697),
      new L.LatLng(45.514276, -122.592898),
      new L.LatLng(45.513916, -122.593482),
      new L.LatLng(45.513280, -122.593274),
    ];

    var firstpolyline = new L.Polyline(pointList, {
      color: 'black',
      weight: 5,
      opacity: 0.6,
      smoothFactor: 1

    });
    firstpolyline.addTo(map);

    this.mapService.map = map;

    // this.geocoder.getCurrentLocation()
    // .subscribe(
    //   location => map.panTo([location.latitude, location.longitude]),
    //   err => console.error(err)
    // );
  }

  ngAfterViewInit() {
        this.markerComponent.Initialize();
    }
}
