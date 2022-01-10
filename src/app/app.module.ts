import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PersonDashboardComponent } from './person-dashboard/person-dashboard.component';
import { AgePipe } from './pipes/age.pipe';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr';
@NgModule({
  declarations: [
    AppComponent,
    PersonDashboardComponent,
    AgePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
