import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import components
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';
import { EditPersonComponent } from './event/editPerson/editPerson.component';
import { ReportsComponent } from './graphicReports/reports/reports.component';
import { ReportTrimestralComponent} from './graphicReports/report-trimestral/report-trimestral.component';
import { ReportEventComponent } from './graphicReports/report-event/report-event.component';
import { CarteraComponent } from "./cartera/cartera.component";
import { InfoCarteraComponent } from "./cartera/info-cartera/info-cartera.component";
import { EditCarteraComponent } from "./cartera/edit-cartera/edit-cartera.component";
import { EjecutivoComponent } from "./ejecutivo/ejecutivo.component";
import { EditEjecutivoComponent } from './ejecutivo/edit-ejecutivo/edit-ejecutivo.component';
import { PersonaComponent } from "./event/persona/persona.component";
import { EditComponent } from "./event/persona/edit/edit.component";
import { AddSucursalComponent } from './sucursal/addSucursal/addsucursal.component';
import { HeroFormComponent } from "./hero-form/hero-form.component";
import { DetalleCajaComponent } from './sucursal/detalle-caja/detalle-caja.component';
import { DetallePersonalComponent } from './sucursal/detalle-personal/detalle-personal.component';

import { AddEjecutivoComponent } from "./ejecutivo/add-ejecutivo/add-ejecutivo.component";
import { Programa } from './modelo/programa';
import { ProgramaComponent } from './programa/programa.component';
import { ModuloComponent } from './programa/modulo/modulo.component';
import {EditProgramaComponent} from './programa/edit-programa/edit-programa.component';

import { InfoEjecutivoComponent } from "./ejecutivo/info-ejecutivo/info-ejecutivo.component";
import { VistaCajaComponent } from "./caja/vista-caja/vista-caja.component";

import { CajaChicaComponent } from "./caja/caja-chica/caja-chica.component";
import { IngresoComponent } from "./caja/ingreso/ingreso.component";
import { EgresoComponent } from './caja/egreso/egreso.component';
import { AddCorrelativeComponent } from './correlative/add-correlative/add-correlative.component';



const appRoutes: Routes = [
   { path: '', component: HomeComponent },//ruta basica
   { path: 'login', component: LoginComponent },
   {
      path: 'home', component: HomeComponent,
      children: [
         { path: 'home', redirectTo: 'home', pathMatch: 'full' },
         { path: 'events', component: EventsComponent },
         { path: 'event/:id', component: EventComponent },
         { path: 'editPerson/:id', component: EditPersonComponent },
         { path: 'reports', component: ReportsComponent },
         { path: 'trimestral', component: ReportTrimestralComponent },
         { path: 'reportEvent/:id', component: ReportEventComponent },
         { path: 'persons', component: PersonaComponent},
         { path: 'persons/edit/:id', component: EditComponent},
         { path: 'cartera', component:CarteraComponent},
         { path: 'cartera/:id',component:InfoCarteraComponent},
         { path: 'cartera/edit/:name',component:EditCarteraComponent},
         { path: 'ejecutivo', component:EjecutivoComponent},
         { path: 'ejecutivo/add',component:AddEjecutivoComponent},
         { path: 'ejecutivo/:id',component:InfoEjecutivoComponent},
         { path: 'ejecutivo/edit/:active', component:EditEjecutivoComponent},
         { path: 'sucursal/add', component: AddSucursalComponent},
         { path: 'sucursal/detalleCaja', component: DetalleCajaComponent},
         { path: 'sucursal/personal', component: DetallePersonalComponent},
         { path: 'formulariobase',component:HeroFormComponent},
         { path: 'formulariobase',component:HeroFormComponent},
         { path: 'programs', component: ProgramaComponent},
         { path: 'modulo/:id', component: ModuloComponent},
         { path: 'program/edit/:id', component: EditProgramaComponent},
         { path: 'sucursal/detalleCaja', component: DetalleCajaComponent},
         { path: 'sucursal/personal', component: DetallePersonalComponent},
         { path: 'formulariobase',component:HeroFormComponent},
         { path: 'formulariobase',component:HeroFormComponent},
         { path: 'caja', component:CajaChicaComponent},
         { path: 'caja/vistacaja', component:VistaCajaComponent}
         { path: 'caja/ingreso', component:IngresoComponent},
         { path: 'caja/egreso', component:EgresoComponent},
         { path: 'correlative/add', component:AddCorrelativeComponent}

      ]
   },

   //{path: '', component: LoginFormComponent}
   { path: '**', component: HomeComponent }//ruta redir

];

export const appRoutingProviders: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);