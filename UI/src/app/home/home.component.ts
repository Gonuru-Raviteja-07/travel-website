import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../ServiceFile/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  info = inject(DataService);
  router = inject(Router);

  @ViewChild('cp') cp!: ElementRef;
  @ViewChild('pnr') pnr!: ElementRef;

  ngOnInit() {
    this.info.passengers = [];
    this.info.show = true;
  }

  displayChoosePassengerContent = true;

  choosePassengerClicked() {
    this.displayChoosePassengerContent = true;
    this.cp.nativeElement.style.color = 'white';
    this.cp.nativeElement.style.backgroundColor = '#0d6efd';
    this.pnr.nativeElement.style.color = 'black';
    this.pnr.nativeElement.style.backgroundColor = 'white';
  }

  pnrSearchClicked() {
    this.displayChoosePassengerContent = false;
    this.cp.nativeElement.style.color = 'black';
    this.cp.nativeElement.style.backgroundColor = 'white';
    this.pnr.nativeElement.style.color = 'white';
    this.pnr.nativeElement.style.backgroundColor = '#0d6efd';
  }

  //deleting all the passengers
  deletePassengers() {
    this.info.passengers = [];
    this.info.show = true;
  }

  //navigate to flight component
  searchflights() {
    this.router.navigateByUrl('/flights');
  }
}
