import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ajax } from 'rxjs/ajax';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  username!: string;
  isLogged:boolean=false;

  officeSelected = '';

  passengerName: any = '';
  passengerSurname: any = '';

  passengers: any = [];
  show: any = true;

  fromPlace: any;
  toPlace: any;

  oneWayTripDate: any;

  roundTripDate1: any;
  roundTripDate2: any;

  multiStopFlightSearchData: any;

  cabin1: any;
  cabin2: any;

  showFlights: boolean = true;

  pickedFlightsToCart: any = [];

  timeError: any = '';
  errorMsg: any = '';

  generatedPNRNumber!: string;

  http = inject(HttpClient);

  usersURL = 'http://localhost:8080/users';

  airportsURL = 'http://localhost:8080/airports';

  flightsURL = 'http://localhost:8080/flights';

  getUsers() {
    return this.http.get(this.usersURL);
  }

  saveUserNameInSessionStorage(name: any) {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('username', name);
    }
  }

  getUserNameFromSessionStorage() {
    if (typeof window !== 'undefined') {
      this.username = sessionStorage.getItem('username') || '';
    }
  }

  getAirports() {
    return this.http.get(this.airportsURL);
  }

  getFilteredAirports(searhText: any) {
    return ajax({
      url: 'http://localhost:8080/airports/search?search=' + searhText,
      method: 'GET'
    })
  }

  getFlights() {
    return ajax({
      url: 'http://localhost:8080/flights/search?from=' + this.fromPlace + '&to=' + this.toPlace,
      method: 'GET'
    })
  }

  getReturnFlights() {
    return ajax({
      url: 'http://localhost:8080/flights/return?to=' + this.fromPlace + '&from=' + this.toPlace,
      method: 'GET'
    })
  }

  getFlightsForMultiStop(from: any, to: any) {
    return ajax({
      url: 'http://localhost:8080/flights/search?from=' + from + '&to=' + to,
      method: 'GET'
    })
  }
}
