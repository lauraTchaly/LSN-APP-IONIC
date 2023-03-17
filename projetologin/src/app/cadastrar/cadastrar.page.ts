import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { usuario } from '../model/usuario.model';
import { DatabaseService } from '../servico/database.service';
import { UtilityService } from '../servico/utility.service';
@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  routeCpf = null;
  usuario: any = {};

  constructor(
    private activatedRoute: ActivatedRoute,
    private banco: DatabaseService,
    private router: Router,
    private util: UtilityService
  ) { }

  ngOnInit() {

    this.routeCpf = this.activatedRoute.snapshot.params['cpf'];
    if (this.routeCpf){
      this.banco.getOneUsuario(this.routeCpf).subscribe(caixa => {this.usuario = caixa});
    }
  }
 update(form: any){
   this.banco.updateUsuario(form.value, this.routeCpf);
   this.router.navigate(['/tab3']);
   this.util.toastando("Item Atualizado com sucesso", "middle", 2000, "medium")
 }
 cadastro(){
   
 }

}
