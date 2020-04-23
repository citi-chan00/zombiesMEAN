import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-pedir-cerebros',
  templateUrl: './pedir-cerebros.component.html',
  styleUrls: ['./pedir-cerebros.component.css']
})
export class PedirCerebrosComponent implements OnInit {

  constructor(private dataService: DataService) {
    this.obtenercerebros();
    if (localStorage.getItem('resultado')) {
      this.logeado = true;
    } else {
      this.logeado = false;
      location.replace('/#/login');
    }
  }
  logeado: any;
  cerebros: any;
  sabor: any;
  cantidad: any;
  entrega: any;
  clase: any;
  error: any;
  ngOnInit(): void {}

  obtenercerebros() {
    this.dataService.cerebrosObservable.subscribe((resultado) => {
      this.cerebros = resultado;
    });
    this.dataService.obtenerCerebros();
  }

  Seleccionar(form: NgForm) {
    const d = new Date();
    const fechaPedido = d.getDate() + ' / ' + (d.getMonth() + 1) + ' / ' + d.getFullYear();
    let dias = 0;
    if (this.entrega === 'Gold (De hoy en 3 días)') {
      this.entrega = 'Gold';
      dias = 3;
    } else if (this.entrega === 'Silver (De hoy en 7 días)') {
      this.entrega = 'Silver';
      dias = 7;
    } else if (this.entrega === 'Bronze (De hoy en 15 días)') {
      this.entrega = 'Bronze';
      dias = 15;
    }
    d.setTime(d.getTime() +  (dias * 24 * 60 * 60 * 1000));
    const fechaEntrega = d.getDate() + ' / ' + (d.getMonth() + 1) + ' / ' + d.getFullYear();
    this.dataService.agregarPedido(this.sabor, this.entrega, this.cantidad, fechaPedido, fechaEntrega,
      this.dataService.logedUser.email).subscribe((resultado) => {
        this.clase = 'alert alert-success';
        this.error = 'Su pedido le llegara el dia ' + fechaEntrega;
        form.resetForm();
      }, (error) => {
        this.clase = error.error.clase;
        this.error = error.error.mensaje;
      });
    }

    usuariovalido(cerebro) {
      if (cerebro.usuario == this.dataService.logedUser.email) {
        return true;
      } else if (this.dataService.logedUser.type == 'Administrador') {
        return true;
      } else {
        return false;
      }
    }
}
