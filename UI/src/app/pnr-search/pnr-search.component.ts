import { Component, inject } from '@angular/core';
import { DataService } from '../ServiceFile/data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pnr-search',
  templateUrl: './pnr-search.component.html',
  styleUrl: './pnr-search.component.css'
})
export class PnrSearchComponent {
  info = inject(DataService);
  displayResults: boolean = false;
  http = inject(HttpClient);
  pnrNo: any = '';
  errorMsg: boolean = false;
  ListOfBookedFlightsFromDB: any;

  ngOnInit() {
    if (this.pnrNo !== '' || this.info.generatedPNRNumber!==undefined) {
      setTimeout(() => {
        window.alert('PNR No : ' + this.info.generatedPNRNumber);
      }, 1000);
    }
  }

  searchClicked() {
    if (this.pnrNo !== '' && this.pnrNo.length === 6) {
      this.displayResults = true;
      this.errorMsg = false;
      this.http.get('http://localhost:8080/booked-flights/search?pnrNo=' + this.pnrNo).subscribe((data: any) => {
        this.ListOfBookedFlightsFromDB = data;
      },
      ((err : any)=>{console.log(err.error.message)})
    )}
    else {
      this.displayResults = false;
      this.errorMsg = true;
    }
  }
}
