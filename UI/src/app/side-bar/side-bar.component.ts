import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../ServiceFile/data.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.css'
})
export class SideBarComponent {
  router = inject(Router);
  info = inject(DataService);
  office : any;
  ngOnInit() {
    this.info.getUserNameFromSessionStorage();
    this.office=sessionStorage.getItem('officeSelected');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('');
  }
}
