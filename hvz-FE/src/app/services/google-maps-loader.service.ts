export class GoogleMapsLoaderService {
  private googleMapsLoaded = false;

  loadGoogleMaps(apiKey: string): void {
    if (!this.googleMapsLoaded) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&language=en`;

      script.onload = () => {
        this.googleMapsLoaded = true;
        console.log('Map is loaded.');
      };

      script.onerror = () => {
        console.error('Error loading Google Maps script.');
      };

      document.body.appendChild(script);
    } else {
      console.log('Map has already been loaded.');
    }
  }
}
