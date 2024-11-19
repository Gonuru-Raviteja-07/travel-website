import { ChangeDetectionStrategy, Component, ElementRef, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import flatpickr from 'flatpickr';
import { format } from 'date-fns';
import { DataService } from '../../ServiceFile/data.service';

@Component({
  selector: 'app-one-way',
  templateUrl: './one-way.component.html',
  styleUrl: './one-way.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneWayComponent {

  constructor(private el: ElementRef) { }

  info = inject(DataService);

  options: string[] = [];
  selectedAirport: string[] = [];

 
  myControl1 = new FormControl('');
  myControl2 = new FormControl('');
  dateControl = new FormControl('');

  timeInput: string = '';

  ngOnInit() {
    this.dateControl.valueChanges.subscribe((value: any) => {
      const todayDate = new Date();
      setTimeout(() => {
        let futuredate = new Date(todayDate.setDate(todayDate.getDate() + parseInt(value)));
        this.info.oneWayTripDate = format(futuredate, 'dd/MM/yyyy');
        this.el.nativeElement.querySelector('.displayDate').value = this.info.oneWayTripDate;
      }, 2000)
    })

    flatpickr(this.el.nativeElement.querySelector('#datePicker'), {
      showMonths: 2,
      dateFormat: 'd/m/y',
      minDate: new Date(),
      onChange: (selectedDates) => {
        const selectedDate = selectedDates[0];
        this.info.oneWayTripDate = format(selectedDate, 'dd/MM/yyyy');
        this.el.nativeElement.querySelector('.displayDate').value = this.info.oneWayTripDate;
      }
    });

    this.myControl1.valueChanges.subscribe((searhText: any) => {
      this.filter(searhText);
      this.info.fromPlace = this.selectedAirport[0];
    })

    this.myControl2.valueChanges.subscribe((searhText: any) => {
      this.filter(searhText);
      this.info.toPlace = this.selectedAirport[0];
    })
  }

  validateTimeFormat(val: string) {
    const timePattern = /^([0-1]\d|2[0-3]):([0-5]\d)$/;
    if (val.length >= 4) {
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
      this.info.getFilteredAirports(searhText).subscribe((data: any) => {
        data.response.forEach((el: any) => {
          if (!this.options.includes(el.airportName)) {
            this.options.push(el.airportName);
            this.selectedAirport.push(el.airportCode);
          }
        });
      })
    }
    else if (searhText.length < 2) {
      this.options = [];
      this.selectedAirport = [];
    }
  }
}


