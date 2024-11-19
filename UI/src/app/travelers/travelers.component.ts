import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { DataService } from '../ServiceFile/data.service';

@Component({
  selector: 'app-travelers',
  templateUrl: './travelers.component.html',
  styleUrl: './travelers.component.css'
})
export class TravelersComponent {

  info = inject(DataService);
  inpVal: any;

  control = new FormControl('');
  List: string[] = ['add new passenger', 'Raviteja'];
  filteredPassengers: Observable<string[]> | undefined;

  listOfPassengers: any = [];
  ngOnInit(): void {
    this.filteredPassengers = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || '')),
    );

    this.control.valueChanges.subscribe((data) => {
      if (data === 'add new passenger') {
        this.info.passengers.push({
          sname: '',
          name: ''
        });
        this.info.show = false;
      }
      else if (data === 'Raviteja') {
        this.info.passengerSurname = 'Gonuru';
        this.info.passengerName = 'Raviteja';
        this.info.passengers.push({
          sname: this.info.passengerSurname,
          name: this.info.passengerName
        });
        this.info.show = false;
      }
    })
  }


  filter(value: string): string[] {
    const filterValue = this.normalizeValue(value);
    return this.List.filter(street => this.normalizeValue(street).includes(filterValue));
  }

  normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  deletePassenger(p: any) {
    this.info.passengers.pop(p);
  }
}
