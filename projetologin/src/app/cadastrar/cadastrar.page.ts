import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { usuario } from '../model/usuario.model';
import { DatabaseService } from '../servico/database.service';
import { UtilityService } from '../servico/utility.service';
 import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {

  routeCpf = null;
  usuario: any = {};
  formGroup: FormGroup |any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private banco: DatabaseService,
    private router: Router,
    private util: UtilityService,
    private fb: FormBuilder
  ) { }
  


  ngOnInit() {

    this.routeCpf = this.activatedRoute.snapshot.params['cpf'];
    if (this.routeCpf){
      this.banco.getOneUsuario(this.routeCpf).subscribe(caixa => {this.usuario = caixa});
    }

    this.formGroup = this.fb.group({
      email:[''],
      celular:[''],
      endereco:[''],
      cep:[''],
      dataNasc:[''],
      descricao:[''],
		
		});
   
   }


 update(form: any){
   this.banco.updateUsuario(form.value, this.routeCpf);
   this.router.navigate(['/tab3']);
   this.util.toastando("Item Atualizado com sucesso", "middle", 2000, "medium")
 }

 cadastro(){
     let ref = this.usuario.collection('banco.usuario').doc(this.routeCpf)
    ref.set(this.formGroup.value).then(()=>{
     console.log('Cadastro do perfil com sucesso');
     this.router.navigate(['/perfil']);
      })
    // .catch(err =>{
    //  console.log('Erro ao cadatrar')
    //   console.log(err)
    // })

  
   
   
//this.router.navigate(['/perfil']);

 }
}
