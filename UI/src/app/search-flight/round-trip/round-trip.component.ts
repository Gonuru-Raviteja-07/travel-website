import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import flatpickr from 'flatpickr';
import { DataService } from '../../ServiceFile/data.service';
import { format } from 'date-fns';


@Component({
  selector: 'app-round-trip',
  templateUrl: './round-trip.component.html',
  styleUrl: './round-trip.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RoundTripComponent {

  constructor(private el: ElementRef) { }

  info = inject(DataService);

  options: string[] = [];

  selectedAirport: string[] = [];

  fromOrigin: string = '';
  fromDestination: string = '';
  returnOrigin: string = '';
  returnDestination: string = '';

  noOfDaysToAdd1: number = 0;
  noOfDaysToAdd2: number = 0;

  timeInput1: string = '';
  timeInput2: string = '';

  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  myControl3 = new FormControl('');
  myControl4 = new FormControl('');

  dateOneControl = new FormControl('');
  dateTwoControl = new FormControl('');

  searchedData: any;

  ngOnInit() {
    this.dateOneControl.valueChanges.subscribe((value: any) => {
      if (value.length > 1) {
        let n = parseInt(value.substring(1));
        const todayDate = new Date();
        this.noOfDaysToAdd1 = n;
        setTimeout(() => {
          let futuredate = new Date(todayDate.setDate(todayDate.getDate() + this.noOfDaysToAdd1));
          this.info.roundTripDate1 = format(futuredate, 'dd/MM/yyyy');
          this.el.nativeElement.querySelector('.displayDate1').value = this.info.roundTripDate1;
        }, 2000)
      }
    })

    this.dateTwoControl.valueChanges.subscribe((value: any) => {
      if (value.length > 1) {
        const todayDate = new Date();
        let n = parseInt(value.substring(1));
        this.noOfDaysToAdd2 = n
        setTimeout(() => {
          let futuredate = new Date(todayDate.setDate(todayDate.getDate() + this.noOfDaysToAdd1 + this.noOfDaysToAdd2));
          this.info.roundTripDate2 = format(futuredate, 'dd/MM/yyyy');
          this.el.nativeElement.querySelector('.displayDate2').value = this.info.roundTripDate2;
        }, 2000)
      }
    })

    flatpickr(this.el.nativeElement.querySelector('#datePicker1'), {
      showMonths: 2,
      dateFormat: 'd/m/y',
      minDate: new Date(),
      onChange: (selectedDates) => {
        const selectedDate = selectedDates[0];
        this.info.roundTripDate1 = format(selectedDate, 'dd/MM/yyyy');
        this.el.nativeElement.querySelector('.displayDate1').value = this.info.roundTripDate1;
      }
    });

    flatpickr(this.el.nativeElement.querySelector('#datePicker2'), {
      showMonths: 2,
      dateFormat: 'd/m/y',
      minDate: new Date(),
      onChange: (selectedDates) => {
        const selectedDate = selectedDates[0];
        this.info.roundTripDate2 = format(selectedDate, 'dd/MM/yyyy');
        this.el.nativeElement.querySelector('.displayDate2').value = this.info.roundTripDate2;
      }
    });

    this.myControl1.valueChanges.subscribe((searhText: any) => {
      this.filter(searhText);
      if (this.selectedAirport.length > 0) {
        setTimeout(() => {
          this.returnOrigin = this.selectedAirport[0];
        }, 1000);
      }
      this.info.fromPlace = this.selectedAirport[0];
    })

    this.myControl2.valueChanges.subscribe((searhText: any) => {
      this.filter(searhText);
      if (this.selectedAirport.length > 0) {
        setTimeout(() => {
          this.returnDestination = this.selectedAirport[0];
        }, 1000)
      }
      this.info.toPlace = this.selectedAirport[0];
    })

    this.myControl3.valueChanges.subscribe((searhText: any) => {
      this.filter(searhText);
      if (this.selectedAirport.length > 0) {
        setTimeout(() => {
          this.fromOrigin = this.selectedAirport[0];
        }, 1000)
      }
      this.info.toPlace = this.selectedAirport[0];
    })

    this.myControl4.valueChanges.subscribe((searhText: any) => {
      this.filter(searhText);
      if (this.selectedAirport.length > 0) {
        setTimeout(() => {
          this.fromDestination = this.selectedAirport[0];
        }, 1000)
      }
      this.info.fromPlace = this.selectedAirport[0];
    })
  }

  validateTimeFormat(val: string) {
    const timePattern = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    if (val.length >= 1) {
      if (!timePattern.test(val)) {
        this.info.timeError = 'Please enter a valid time in hh:mm format.';
      }
      else {
        this.info.timeError = '';
      }
    }
  }

  filter(searhText: string) {
    if (searhText.length == 2) {
      this.info.getFilteredAirports(searhText).subscribe(
        (data: any) => {
        data.response.forEach((el: any) => {
          if (!this.options.includes(el.airportName)) {
            this.options.push(el.airportName);
            this.selectedAirport.push(el.airportCode);
          }
        });
      },
      ((err : any)=>{console.log(err.error.message)}))
    }
    else if (searhText.length < 2) {
      this.options = [];
      this.selectedAirport = [];
    }
  }
}
