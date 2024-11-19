import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { DataService } from '../ServiceFile/data.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrl: './office.component.css'
})
export class OfficeComponent implements OnInit {
  info = inject(DataService);
  router = inject(Router);
  errorMsg: string='';

  control = new FormControl('');
  ListOfOffices: string[] = ['PASS_Hyderabad', 'PASS_Germany', 'PASS_Mumbai', 'PASS_USA', 'PASS_Turkey', 'PASS_Japan', 'PASS_China', 'PASS_Africa'];
  filteredOffices: Observable<string[]> | undefined;

  ngOnInit(): void {
    this.info.getUserNameFromSessionStorage();

    this.filteredOffices = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.control.valueChanges.subscribe(value => {
      this.info.officeSelected = value || ''; // Assign selected office to the variable
    });
  }

  private _filter(value: string): string[] {
    const filterValue = this._normalizeValue(value);
    return this.ListOfOffices.filter(office => this._normalizeValue(office).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

  officeSelected() {
    if (this.info.officeSelected === '') {
      this.errorMsg = 'please select office';
    }
    else {
      this.router.navigateByUrl('/home');
    }
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('officeSelected', this.info.officeSelected);
    }
  }
}
