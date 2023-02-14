import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutsComponent } from './abouts/abouts.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent},
  {path:'about',component:AboutsComponent},
  {path:'contact',component:ContactComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
