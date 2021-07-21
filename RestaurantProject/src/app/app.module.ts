import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './sections/menu/menu.component';
import { AboutComponent } from './sections/about/about.component';
import { HomeComponent } from './sections/home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogComponent } from './sections/blog/blog.component';
import { RezervareComponent } from './UserActions/rezervare/rezervare.component';
import { LoginComponent } from './UserActions/login/login.component';
import { RegistrationComponent } from './UserActions/registration/registration.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectDateComponent } from './UserActions/select-date/select-date.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule, } from '@angular/forms'
import { SelectReservationComponent } from './UserActions/select-reservation/select-reservation.component';
import { DataService } from './Service/data.service';
import { PopularItemsComponent } from './sections/popular-items/popular-items.component';
import { FooterComponent } from './sections/footer/footer.component';
@NgModule({

  declarations: [
    AppComponent,

    MenuComponent,
    AboutComponent,
    HomeComponent,
    NavbarComponent,
    BlogComponent,
    RezervareComponent,
    LoginComponent,
    RegistrationComponent,
    SelectDateComponent,
    SelectReservationComponent,
    PopularItemsComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: MatDialogRef,
    useValue: {}
  },
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
