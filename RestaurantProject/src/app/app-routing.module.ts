import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './sections/about/about.component';
import { BlogComponent } from './sections/blog/blog.component';
import { HomeComponent } from './sections/home/home.component';
import { MenuComponent } from './sections/menu/menu.component';
import { RegistrationComponent } from './UserActions/registration/registration.component';
import { RezervareComponent } from './UserActions/rezervare/rezervare.component';


const appRoutes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'menu',component:MenuComponent},
  {path:'about',component:AboutComponent},
  {path:'blog',component:BlogComponent},
  {path:'Rezervare',component:RezervareComponent},
  {path:'Inregistrare',component:RegistrationComponent},
  {path:'',redirectTo:'/home',pathMatch:'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' })
  
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
