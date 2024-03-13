import { Component, Input, OnChanges } from '@angular/core';
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
      let loader = new Loader({
        apiKey: '',
      });

      // Load the google map on the browser
      loader.importLibrary('maps').then(() => {
        console.log('Map is loaded');

        // Location of the Game
        // Static location - Budapest
        const location = {
          lat: 47.497913,
          lng: 19.040236,
        };

        // Map
        const map = new google.maps.Map(document.getElementById('map')!, {
          zoom: 10,
          styles: mapstyles,
        });

        // Geocoder
        const geocoder = new google.maps.Geocoder();

        // Geocoding passed str location
        geocoder
          .geocode({
            address: this.game?.location ? this.game.location : 'Budapest',
          })
          .then((response) => {
            const positionGeo = response.results[0].geometry.location;
            console.log(positionGeo);

            map.setCenter(positionGeo);
            marker.setPosition(positionGeo);
          })
          .catch((e) =>
            window.alert(
              'Geocoding was not successful for the following reason: ' + e
            )
          );

        // Marker
        const marker = new google.maps.Marker({
          map: map,
          animation: window.google.maps.Animation.BOUNCE,
        });

        // InfoWindow
        const contentString = `<div>
      <h1 class="title">${this.game?.name ? this.game?.name : 'HvZ'}</h1>
      <p>Start date: ${this.game?.date ? this.game?.date : getRandomDate()}</p>
      <p>Number of players: ${
        this.game?.players ? this.game?.players?.length : '0'
      }</p>
      </div>`;

        const infoWindow = new google.maps.InfoWindow({
          content: contentString,
        });

        // Open the window
        marker.addListener('click', () => {
          infoWindow.open({
            anchor: marker,
            shouldFocus: false,
          });
        });

        // Close the window
        map.addListener('click', () => {
          if (infoWindow) {
            infoWindow.close();
          }
        });

        // Random date generator
        function getRandomDate() {
          const maxDate = Date.now();
          const timestamp = Math.floor(Math.random() * maxDate);
          return new Date(timestamp);
        }
      });
    }
  }
  title = 'google-maps';
}
