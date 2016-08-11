import {Component} from 'angular2/core';
import {CORE_DIRECTIVES, NgClass} from 'angular2/common';
import {MapService} from './map.service';
import {Map, LeafletMouseEvent, Marker} from 'leaflet';

@Component({
    selector: 'marker',
    directives: [CORE_DIRECTIVES],
    template: `
    <button id="add-marker" class="btn btn-default on-map" [ngClass]="{'btn-default': !editing, 'btn-primary': editing}"
        title="Add Marker" (click)="toggleEditing()" btnCheckbox>
      <i class="fa fa-map-marker fa"></i>
    </button>

    <button id="remove-marker" class="btn on-map" [ngClass]="{'btn-default': !removing, 'btn-primary': removing}"
          title="Remove Marker" (click)="toggleRemoving()" btnCheckbox>
      <i class="fa fa-trash fa"></i>
    </button>
    `
})
export class MarkerComponent {
    editing: boolean;
    removing: boolean;
    markerCount: number;

    private mapService: MapService;

    constructor(mapService: MapService) {
        this.editing = false;
        this.removing = false;
        this.markerCount = 0;
        this.mapService = mapService;
    }

    ngOnInit() {
        this.mapService.disableMouseEvent('add-marker');
        this.mapService.disableMouseEvent('remove-marker');
    }

    Initialize() {
        this.mapService.map.on('click', (e: LeafletMouseEvent) => {
            if (this.editing) {
                let marker = L.marker(e.latlng, {
                    // icon: L.icon({
                    //     iconUrl: require<any>('../../../node_modules/leaflet/dist/images/marker-icon.png'),
                    //     shadowUrl: require<any>('../../../node_modules/leaflet/dist/images/marker-shadow.png')
                    // }),
                    draggable: true
                })
                .bindPopup('Marker #' + (this.markerCount + 1).toString(), {
                    offset: L.point(12, 6)
                })
                .addTo(this.mapService.map)
                .openPopup();

                this.markerCount += 1;

                marker.on('click', (event: MouseEvent) => {
                    if (this.removing) {
                        this.mapService.map.removeLayer(marker);
                        this.markerCount -= 1;
                    }
                });
            }
        });
    }

    toggleEditing() {
        this.editing = !this.editing;

        if (this.editing == true && this.removing == true) {
            this.removing = false;
        }
    }

    toggleRemoving() {
        this.removing = !this.removing;

        if (this.editing == true && this.removing == true) {
            this.editing = false;
        }
    }
}
