import { ChangeDetectionStrategy, Component, ElementRef, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import flatpickr from 'flatpickr';
import { format } from 'date-fns';
import { DataService } from '../../ServiceFile/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multi-stop',
  templateUrl: './multi-stop.component.html',
  styleUrl: './multi-stop.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class MultiStopComponent {
  constructor(private el: ElementRef, private fb: FormBuilder) { }

  @ViewChild('Availability') ava!: ElementRef;

  @ViewChildren('fromInput') fromInputs!: QueryList<ElementRef>;
  @ViewChildren('toInput') toInputs!: QueryList<ElementRef>;
  @ViewChildren('inputDate') inputsDate!: QueryList<ElementRef>;

  router = inject(Router);
  info = inject(DataService);

  options: string[] = [];
  selectedAirport: string[] = [];
  myControl = new FormControl('');
  dateControl = new FormControl('');

  displayflights: boolean = false;

  listOfFlights: any[] = [];
  flights: any[] = [];

  errorMsg: string = '';

  selectedFlight: any;

  stops: any[] = [
    { id: 0, from: '', to: '', date: '' },
    { id: 1, from: '', to: '', date: '' },
    { id: 2, from: '', to: '', date: '' }
  ];

  ngOnInit() {
    this.myControl.valueChanges.subscribe((searchText: any) => {
      if (searchText.length === 2) {
        this.info.getFilteredAirports(searchText).subscribe((data: any) => {
          if (Array.isArray(data.response)) {
            data.response.forEach((el: any) => {
              if (!this.options.includes(el.airportName)) {
                this.options.push(el.airportName);
                this.selectedAirport.push(el.airportCode);
              }
            });
          }
        });
      } else if (searchText.length < 2) {
        this.options = [];
        this.selectedAirport = [];
      }
    })
  }

  updateNextStop(index: number) {
    if (index < this.stops.length - 1) {
      const currentToValue = this.toInputs.toArray()[index].nativeElement.value;
      setTimeout(() => {
        this.fromInputs.toArray()[index + 1].nativeElement.value = this.selectedAirport[0];
      }, 2000);
    }
  }

  ngAfterViewInit(): void {
    this.intializeDateIcons();
    this.initializeDateFeilds();
  }

  initializeDateFeilds() {
    this.stops.forEach((stop: any) => {
      const dateFeild = this.el.nativeElement.querySelector(`#dateInput${stop.id}`);
      if (dateFeild) {
        dateFeild.addEventListener('input', (event: any) => {
          const value = event.target.value;
          const todayDate = new Date();
            setTimeout(() => {
              let futuredate = new Date(todayDate.setDate(todayDate.getDate() + parseInt(value)));
              const multiStopTripDate = format(futuredate, 'dd/MM/yyyy');
              dateFeild.value = multiStopTripDate;
              stop.date = multiStopTripDate;
            }, 2000);
        });
      }
    });
  }

  intializeDateIcons() {
    this.stops.forEach((stop: any) => {
      const datePickerIcon = this.el.nativeElement.querySelector(`#datePicker${stop.id}`);
      flatpickr(datePickerIcon, {
        showMonths: 2,
        dateFormat: 'd/m/y',
        minDate: new Date(),
        onChange: (selectedDates) => {
          const selectedDate = selectedDates[0];
          const formattedDate = format(selectedDate, 'dd/MM/yyyy');
          this.el.nativeElement.querySelector(`#dateInput${stop.id}`).value = formattedDate;
        }
      });
    });
  }

  addNewTrip() {
    if (this.stops.length < 8) {
      this.stops.push({ id: this.stops.length, from: '', to: '', date: '' });
    }
    else if (this.stops.length > 8) {
      this.ava.nativeElement.disabled = true;
    }
  }

  deleteTrip(i: number) {
    this.stops.splice(i, 1);
  }

  selectedFlightsInMultiStop: any = [];
  addFlightDataToDisplayInPickItPage(data: any) {
    if (this.selectedFlightsInMultiStop.length < 1) {
      this.selectedFlightsInMultiStop.push(data);
    }
    else if (this.selectedFlightsInMultiStop.includes(data)) {
      this.selectedFlightsInMultiStop.pop(data);
    }
    else {
      this.selectedFlightsInMultiStop.push(data);
    }
  }

  selectCabin(stopIndex: number, flightIndex: number, cabin: string, data: any) {
    if (this.listOfFlights[stopIndex] && this.listOfFlights[stopIndex][flightIndex]) {
      this.listOfFlights[stopIndex][flightIndex].selectedCabin = cabin;
      this.listOfFlights[stopIndex][flightIndex].checked = true; // Mark as checked
      this.addFlightDataToDisplayInPickItPage(data);
    }
  }

  searchFlights() {
    this.info.multiStopFlightSearchData = this.stops.map((stop, index) => ({
      id: stop.id,
      from: this.fromInputs.toArray()[index].nativeElement.value,
      to: this.toInputs.toArray()[index].nativeElement.value,
      date: this.inputsDate.toArray()[index].nativeElement.value
    }));

    if (JSON.stringify(this.stops) === JSON.stringify(this.info.multiStopFlightSearchData)) {
      this.info.errorMsg = 'Please enter all the required feilds';
    }
    else {
      this.info.errorMsg = '';
      this.info.multiStopFlightSearchData.forEach((data: any, index: any) => {
        this.info.getFlightsForMultiStop(data.from, data.to).subscribe((fl: any) => {
          const flightsForCurrentStop = fl.response.map((flight: any) => ({
            ...flight,
            cabins: ['Y', 'B', 'R', 'L', 'J', 'Q'],
            selectedCabin: '',
            checked: false,
            fromDate: data.date,
            toDate: data.date
          }));

          // Ensure listOfFlights has an array for this stop
          if (!this.listOfFlights[index]) {
            this.listOfFlights[index] = [];
          }

          // Only add flights if they are not duplicates
          flightsForCurrentStop.forEach((newFlight: any) => {
            const isDuplicate = this.listOfFlights[index].some((existingFlight: any) =>
              existingFlight.flightNumber === newFlight.flightNumber &&
              existingFlight.from === newFlight.from &&
              existingFlight.to === newFlight.to
            );

            if (!isDuplicate) {
              this.listOfFlights[index].push(newFlight);
            }
          });
          this.displayflights = true;
        });
      });
    }
  }

  pickedFlights() {
    if (this.info.multiStopFlightSearchData.length === this.selectedFlightsInMultiStop.length) {
      this.selectedFlightsInMultiStop.forEach((flight: any) => {
        this.info.pickedFlightsToCart.push(flight);
      })
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

