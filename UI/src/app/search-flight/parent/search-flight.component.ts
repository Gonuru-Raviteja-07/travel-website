import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { DataService } from '../../ServiceFile/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-flight',
  templateUrl: './search-flight.component.html',
  styleUrl: './search-flight.component.css'
})
export class SearchFlightComponent {

  constructor(private el: ElementRef) { }

  info = inject(DataService);
  router = inject(Router);

  displayRoundTrip: boolean = true;
  displayOneWay: boolean = false;
  displayMultiStop: boolean = false;

  showAvaBtn: boolean = true;

  displayflights: boolean = false;
  displayReturnFlights: boolean = false;

  listOfFlights: any;
  flights: any[] = [];

  listOfReturnFlights: any;
  returnFlights: any[] = [];

  @ViewChild('rt') rt: any;
  @ViewChild('ow') ow: any;
  @ViewChild('ms') ms: any;

  fromPlace: string = '';
  toPlace: string = '';
  departureDate: string = '';
  returnDate: string = '';

  ngOnInit() {
    this.resetData();
  }

  roundTripClicked() {
    this.displayOneWay = false;
    this.displayRoundTrip = true;
    this.displayMultiStop = false;
    this.rt.nativeElement.style.backgroundColor = '#0d6efd';
    this.rt.nativeElement.style.color = 'white';
    this.ow.nativeElement.style.backgroundColor = 'white';
    this.ow.nativeElement.style.color = 'black';
    this.ms.nativeElement.style.backgroundColor = 'white';
    this.ms.nativeElement.style.color = 'black';
    this.displayflights = false;
    this.displayReturnFlights = false;
    this.showAvaBtn = true;
    this.info.errorMsg='';
  }

  oneWayClicked() {
    this.displayOneWay = true;
    this.displayRoundTrip = false;
    this.displayMultiStop = false;
    this.ow.nativeElement.style.backgroundColor = '#0d6efd';
    this.ow.nativeElement.style.color = 'white';
    this.rt.nativeElement.style.backgroundColor = 'white';
    this.rt.nativeElement.style.color = 'black';
    this.ms.nativeElement.style.backgroundColor = 'white';
    this.ms.nativeElement.style.color = 'black';
    this.displayflights = false;
    this.displayReturnFlights = false;
    this.showAvaBtn = true;
    this.info.errorMsg='';
  }

  multiStopClicked() {
    this.displayMultiStop = true;
    this.displayRoundTrip = false;
    this.displayOneWay = false;
    this.ms.nativeElement.style.backgroundColor = '#0d6efd';
    this.ms.nativeElement.style.color = 'white';
    this.ow.nativeElement.style.backgroundColor = 'white';
    this.ow.nativeElement.style.color = 'black';
    this.rt.nativeElement.style.backgroundColor = 'white';
    this.rt.nativeElement.style.color = 'black';
    this.showAvaBtn = false;
    this.info.errorMsg='';
    this.displayflights = false;
    this.displayReturnFlights = false;
  }

  resetData() {
    this.displayflights = false;
    this.displayReturnFlights = false;
    this.listOfFlights = [];
    this.listOfReturnFlights = [];
    this.info.fromPlace = undefined;
    this.info.toPlace = undefined;
    this.info.errorMsg = '';
    this.info.roundTripDate1 = undefined;
    this.info.roundTripDate2 = undefined;
  }

  addFlightDataToDisplayInPickItPage(data: any) {
    if (this.info.pickedFlightsToCart.lenght < 1) {
      this.info.pickedFlightsToCart.push(data);
    }
    else if (this.info.pickedFlightsToCart.includes(data)) {
      this.info.pickedFlightsToCart.pop(data);
    }
    else {
      this.info.pickedFlightsToCart.push(data);
    }
    console.log(this.info.pickedFlightsToCart);
  }

  selectCabin1(flightIndex: number, cabin: string, data: any) {
    this.flights[flightIndex].selectedCabin = cabin;
    this.flights[flightIndex].checked = true;
    this.info.cabin1 = cabin;
    this.addFlightDataToDisplayInPickItPage(data);
  }

  selectCabin2(flightIndex: number, cabin: string, data: any) {
    this.returnFlights[flightIndex].selectedCabin = cabin;
    this.returnFlights[flightIndex].checked = true;
    this.info.cabin2 = cabin;
    this.addFlightDataToDisplayInPickItPage(data);
  }

  searchFlights() {
    if (this.displayOneWay) {
      if (this.info.fromPlace !== undefined && this.info.toPlace && this.info.oneWayTripDate !== undefined) {
        this.info.errorMsg = '';
        this.info.getFlights().subscribe((data) => {
          this.listOfFlights = data.response;
          this.flights = this.listOfFlights.map((flight: any) => ({
            ...flight,
            cabins: ['Y', 'B', 'R', 'L', 'J', 'Q'],
            selectedCabin: '',
            checked: false,
            fromDate: this.info.oneWayTripDate,
            toDate: this.info.oneWayTripDate
          }));
          this.displayflights = this.info.showFlights;
          if (this.flights.length == 0) {
            this.el.nativeElement.querySelector('.showMsg1').textContent = 'No flights available at this moment';
          }
          else {
            this.el.nativeElement.querySelector('.showMsg1').textContent = '';
          }
        })
      }
      else {
        this.info.errorMsg = 'Please enter all the required feilds';
      }
    }

    else if (this.displayRoundTrip) {
      if (this.info.fromPlace !== undefined && this.info.toPlace && this.info.roundTripDate1 !== undefined && this.info.roundTripDate2 !== undefined) {
        this.info.errorMsg = '';
        this.displayflights = this.info.showFlights;
        this.displayReturnFlights = this.info.showFlights;
        this.info.getFlights().subscribe((data) => {
          this.listOfFlights = data.response;
          this.flights = this.listOfFlights.map((flight: any) => ({
            ...flight,
            cabins: ['Y', 'B', 'R', 'L','J', 'Q'],
            selectedCabin: '',
            checked: false,
            fromDate: this.info.roundTripDate1,
            toDate: this.info.roundTripDate2
          }));

          if (this.flights.length == 0) {
            this.el.nativeElement.querySelector('.showMsg1').textContent = 'No flights available at this moment';
          }
          else {
            this.el.nativeElement.querySelector('.showMsg1').textContent = '';
          }
        },
        ((err : any)=>{console.log(err.error.message)})
      )

        this.info.getReturnFlights().subscribe((data) => {
          this.listOfReturnFlights = data.response;
          this.returnFlights = this.listOfReturnFlights.map((flight: any) => ({
            ...flight,
            cabins: ['Y', 'B', 'R', 'L','J', 'Q'],
            selectedCabin: '',
            checked: false,
            fromDate: this.info.roundTripDate1,
            toDate: this.info.roundTripDate2
          }));

          if (this.returnFlights.length == 0) {
            this.el.nativeElement.querySelector('.showMsg2').textContent = 'No return flights available at this moment';
          }
          else {
            this.el.nativeElement.querySelector('.showMsg2').textContent = '';
          }
        }
      )
    }
      else {
        this.info.errorMsg = 'Please enter all the required feilds';
      }
    }
  }


  pickedFlight() {
    if (this.displayRoundTrip) {
      if (this.info.cabin1 !== undefined && this.info.cabin2 !== undefined) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('pickedFlightsToCart', JSON.stringify(this.info.pickedFlightsToCart));
        }
        this.router.navigateByUrl('/pickit');
      }
      else {
        this.info.errorMsg = 'Please select cabin';
      }
    }
    else if (this.displayOneWay) {
      if (this.info.cabin1 !== undefined) {
        if (typeof window !== 'undefined') {
          sessionStorage.setItem('pickedFlightsToCart', JSON.stringify(this.info.pickedFlightsToCart));
        }
        this.router.navigateByUrl('/pickit');
      }
      else {
        this.info.errorMsg = 'Please select cabin';
      }
    }
  }
}
