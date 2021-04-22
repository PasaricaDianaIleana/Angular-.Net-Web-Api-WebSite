import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from 'src/sections/about/about.component';
import { BlogComponent } from 'src/sections/blog/blog.component';
import { HomeComponent } from 'src/sections/home/home.component';
import { MenuComponent } from 'src/sections/menu/menu.component';
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
