import { Component, inject } from '@angular/core';
import { DataService } from '../ServiceFile/data.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pick-it',
  templateUrl: './pick-it.component.html',
  styleUrl: './pick-it.component.css'
})
export class PickItComponent {

  info = inject(DataService);
  router = inject(Router);
  http = inject(HttpClient);

  errorMsg: any = false;
  successMsg: any = false;

  flights: any[]=[];
  ngOnInit() {
    if (typeof window !== 'undefined') {
      const flights: any = sessionStorage.getItem('pickedFlightsToCart');
      if (flights) {
        this.flights = JSON.parse(flights);
      }
    }
  }

  generatePNR(length: number = 6): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return result;
  }

  body: any[] = [];
  jsonData: any[] = [];
  mapPNRnumberToFlightsData(flights: any, number: any, name: any) {
    this.body = flights.map((flight: any) => ({
      ...flight,
      pnrNumber: number,
      fullName: name
    }));
    this.jsonData.push(this.body);
  }

  passengerFullName: string='';

  bookCartClicked() {
    if (this.info.passengerName !== '' && this.info.passengerSurname !== '') {
      this.successMsg = true;
      this.passengerFullName = this.info.passengerSurname + ' ' + this.info.passengerName;
      this.info.generatedPNRNumber = this.generatePNR();
      this.mapPNRnumberToFlightsData(this.info.pickedFlightsToCart, this.info.generatedPNRNumber, this.passengerFullName);

      this.jsonData.forEach((data: any) => {
        this.http.post('http://localhost:8080/booked-flights/save', data).subscribe(
          (data: any) => { console.log(data) },
          ((err : any)=>{console.log(err.error.message)})
        );
      })

      if (typeof window !== 'undefined') {
        this.info.pickedFlightsToCart=[];
        sessionStorage.setItem('pickedFlightsToCart', JSON.stringify(this.info.pickedFlightsToCart));
      }

      setTimeout(() => {
        this.router.navigateByUrl('/home');
      }, 2000);
      this.errorMsg = false;
    }
    else {
      this.errorMsg = 'Please select atleast one passenger';
    }
  }
}
