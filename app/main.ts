import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HTTP_PROVIDERS} from 'angular2/http';
import {MapService} from './map.service';
import {GeocodingService} from './geocoding.service';

bootstrap(AppComponent, [HTTP_PROVIDERS, MapService, GeocodingService]);
