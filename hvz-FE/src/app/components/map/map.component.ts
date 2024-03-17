import { Component, Input, OnChanges } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { mapstyles } from './mapstyles';
import { Loader } from '@googlemaps/js-api-loader';
import { Game } from '../../models/Game';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnChanges {
  @Input() public game?: Game;

  ngOnChanges(): void {
    if (this.game) {
      this.loadMap();
    }
  }

  loadMap(): void {
    const loader = new Loader({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
    });

    loader.importLibrary('maps').then(() => {
      console.log('Map is loaded');

      const map = this.createMap();
      const geocoder = new google.maps.Geocoder();

      this.geocodeLocation(geocoder, map);
    });
  }

  createMap(): google.maps.Map {
    const map = new google.maps.Map(document.getElementById('map')!, {
      zoom: 10,
      styles: mapstyles,
    });

    return map;
  }

  geocodeLocation(geocoder: google.maps.Geocoder, map: google.maps.Map): void {
    geocoder
      .geocode({
        address: this.game?.location ? this.game.location : 'Budapest',
      })
      .then((response) => {
        const positionGeo = response.results[0].geometry.location;
        console.log(positionGeo);

        map.setCenter(positionGeo);
        this.addMarker(positionGeo, map);
      })
      .catch((e) =>
        window.alert(
          'Geocoding was not successful for the following reason: ' + e
        )
      );
  }

  addMarker(position: google.maps.LatLng, map: google.maps.Map): void {
    const marker = new google.maps.Marker({
      position,
      map,
      animation: google.maps.Animation.BOUNCE,
    });

    this.addInfoWindow(marker, map);
  }

  addInfoWindow(marker: google.maps.Marker, map: google.maps.Map): void {
    const contentString = `<div>
      <h1 class="title">${this.game?.name ? this.game?.name : 'HvZ'}</h1>
      <p>Start date: ${
        this.game?.date ? this.game?.date : this.getRandomDate()
      }</p>
      <p>Number of players: ${
        this.game?.players ? this.game?.players?.length : '0'
      }</p>
      </div>`;

    const infoWindow = new google.maps.InfoWindow({
      content: contentString,
    });

    marker.addListener('click', () => {
      infoWindow.open({
        anchor: marker,
        shouldFocus: false,
      });
    });

    map.addListener('click', () => {
      infoWindow.close();
    });
  }

  getRandomDate(): string {
    const maxDate = Date.now();
    const timestamp = Math.floor(Math.random() * maxDate);
    return new Date(timestamp).toString();
  }
}
