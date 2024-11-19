import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { OfficeComponent } from './office/office.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from './ServiceFile/data.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FlatpickrModule } from 'angularx-flatpickr';
import { OneWayComponent } from './search-flight/one-way/one-way.component';
import { RoundTripComponent } from './search-flight/round-trip/round-trip.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MultiStopComponent } from './search-flight/multi-stop/multi-stop.component';
import { SearchFlightComponent } from './search-flight/parent/search-flight.component';
import { CalendarModule } from 'primeng/calendar';
import { PickItComponent } from './pick-it/pick-it.component';
import { TravelersComponent } from './travelers/travelers.component';
import { PnrSearchComponent } from './pnr-search/pnr-search.component';
import { SideBarComponent } from './side-bar/side-bar.component';

const route: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'office', component: OfficeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'flights', component: SearchFlightComponent },
  { path: 'pickit', component: PickItComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    OfficeComponent,
    SearchFlightComponent,
    OneWayComponent,
    RoundTripComponent,
    MultiStopComponent,
    PickItComponent,
    TravelersComponent,
    PnrSearchComponent,
    SideBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    CalendarModule,
    RouterModule.forRoot(route),
    FlatpickrModule.forRoot()
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch()),
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
