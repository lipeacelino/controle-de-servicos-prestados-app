import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientesService } from 'src/app/clientes.service';
import { Cliente } from '../cliente';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success: boolean = false;
  errors: String[];
  id: number;

  constructor(private service: ClientesService, private activatedRoute: ActivatedRoute, private route: Router) {
    this.cliente = new Cliente();
  }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(response => {
        this.id = response['id'];
        if (this.id) {
          this.service.getClienteById(this.id).subscribe(
            cliente => {
              this.cliente = cliente;
            },
            () => {
              this.cliente = new Cliente();
            })
        }
      })
  }
  //console.log(this.activatedRoute.params.(response => console.log(response['id'])));
  //console.log(this.activatedRoute.snapshot.paramMap.get('id'));

  onSubmit() {
    if (this.id) {
      this.service.editarCliente(this.cliente).subscribe(
        () => {
          this.success = true;
        },
        errorResponse => {
          this.errors = errorResponse.error.messageList;
          this.success = false;
        });
    } else {
      this.service.salvar(this.cliente).subscribe(
        cliente => {
          this.success = true;
          this.errors = null;
          this.cliente = cliente;
          this.route.navigate([ '/clientes-lista' ]);
        },
        errorResponse => {
          this.errors = errorResponse.error.messageList;
        });
    }
  }
}
