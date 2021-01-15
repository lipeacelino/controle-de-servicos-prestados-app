import { Component, OnInit } from '@angular/core';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css']
})
export class ClientesListaComponent implements OnInit {

  clientes: Cliente[];
  clienteSelecionado: Cliente;
  success: boolean = false;
  errors: String;

  constructor(private service: ClientesService) { }

  ngOnInit(): void {
    this.service.getClientes()
      .subscribe(clientes => this.clientes = clientes);
  }

  preDelete(cliente: Cliente) {
    this.clienteSelecionado = cliente;
  }

  deletarCliente(cliente: Cliente) {
    this.service.deletarCliente(cliente)
      .subscribe(() => {
        this.success = true
        this.ngOnInit();
      }, errorResponse => {
        this.errors = errorResponse.error.message;
      })
  }
}
