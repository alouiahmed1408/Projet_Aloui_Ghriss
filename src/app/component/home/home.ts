import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SiteKoulTounsi } from '../../model/site-koul-tounsi';
import { RepasService } from '../../services/repas-service';
import { WeatherService } from '../../services/weather-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  repas: SiteKoulTounsi[] = [];
  weather: any;
  city: string = '';

  private repasService: RepasService = inject(RepasService);
  private weatherService: WeatherService = inject(WeatherService);
  private http: HttpClient = inject(HttpClient);

  @ViewChild('slider') slider!: ElementRef;

  ngOnInit(): void {
    this.repasService.getRepas().subscribe(data => {
      this.repas = data;
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;

          this.weatherService.getWeather(lat, lon)
            .subscribe((data: any) => this.weather = data.current_weather);

          this.http.get<any>(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)
            .subscribe(res => {
              this.city = res.address.city || res.address.town || res.address.village || 'Unknown';
            });

        },
        error => {
          console.error("Erreur de géolocalisation:", error);

          const lat = 36.8065;
          const lon = 10.1815;

          this.weatherService.getWeather(lat, lon)
            .subscribe((data: any) => this.weather = data.current_weather);

          this.city = 'Tunis';
        }
      );
    } else {
      console.warn("La géolocalisation n'est pas supportée par ce navigateur.");

      const lat = 36.8065;
      const lon = 10.1815;

      this.weatherService.getWeather(lat, lon)
        .subscribe((data: any) => this.weather = data.current_weather);

      this.city = 'Tunis';
    }
  }

  scrollLeft() {
    this.slider.nativeElement.scrollBy({ left: -220, behavior: 'smooth' });
  }

  scrollRight() {
    this.slider.nativeElement.scrollBy({ left: 220, behavior: 'smooth' });
  }
}
