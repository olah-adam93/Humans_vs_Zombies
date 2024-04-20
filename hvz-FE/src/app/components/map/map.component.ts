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
    const formattedDate = this.game?.date
      ? this.formatDate(this.game.date)
      : this.formatDate(this.getDateNow());
    const contentString = `
        <div style="max-width: 250px; color: #000">
            <h1 style="font-size: 20px; margin-bottom: 5px;">${
              this.game?.name ? this.game?.name : 'HVZ'
            }</h1>
            <p style="font-size: 12px; margin-bottom: 5px;"><span style="font-size: 14px; font-weight: 500;">Start date: </span>${formattedDate}</p>
            <p style="font-size: 12px; margin-bottom: 5px;"><span style="font-size: 14px; font-weight: 500;">Number of players: </span>${
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

  getDateNow(): string {
    const currentDate = new Date();
    return currentDate.toString();
  }

  formatDate(date: string): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    };
    return new Date(date).toLocaleString('en-US', options);
  }
}
