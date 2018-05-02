import { Component, OnInit, ElementRef,ViewChild,Output,EventEmitter } from '@angular/core';
import {PeticionesService } from '../../services/peticiones.service';
import { Identity,Roles,CarteraS } from "../../services/global";
import {Cartera} from '../../modelo/cartera';
import { ActivatedRoute,Router } from "@angular/router";

@Component({
  selector: 'app-add-cartera',
  templateUrl: './add-cartera.component.html',
  styleUrls: ['./add-cartera.component.css'],
  providers:[PeticionesService]
  
})
export class AddCarteraComponent implements OnInit {

  // @ViewChild('name') carteraNameutput()MessageEvent=new EventEmitter();
  // @ViewChild("close", {read: ElementRef}) close: ElementRef;
  
  public cartera;
  public carteraName;

  constructor(private _peticionesService:PeticionesService) { 
     this.cartera = new Cartera ("",null)
  }

  submitted = false;
  powers = ['Really Smart', 'Super Flexible',
  'Super Hot', 'Weather Changer'];
  model = [, '','', ,"",'', ''];
  onSubmit() { this.submitted = true; }
  ngOnInit() {
  }
  simbolos(nameV){
    var res = false;
    for(var i = 0; i<nameV.length;i++){
      if(nameV[i] == '!' || nameV[i] == '@' || nameV[i] == '#' || nameV[i] == '$' || nameV[i] == '%' || nameV[i] == '^' ){res = true;}
    }
    return res;
  }
  guardar(){
    // console.log("hola pao" + this.cartera.name);
    this.cartera.name=this.carteraName;
    console.log(this.cartera);
    if(this.simbolos(this.carteraName)){
      console.log("hay simbolos");
      window.alert("No se permiten simbolos");
    }else{
      this._peticionesService.crearCartera(this.cartera).subscribe(
        
        result=> {
          var esperado = result;
       // console.log(esperado);
       // this.router.navigate(['home/event', this.eventId]);
        alert('Se Creo correctamente la cartera');
        },
        error=>{}
      )
    }
  }
  save(){
    const name=this.carteraName;

    const newCartera=new Cartera(name,null);
    console.log(newCartera);

    if(this.carteraName==''){

      window.alert("Asegurese que todos los campos no esten vacios")
    }else{
      this._peticionesService.addCartera(newCartera).subscribe(response=>{
        // this.MessageEvent.emit();
  
        // this.close.nativeElement.click();
      })

    }

   
  }

}
