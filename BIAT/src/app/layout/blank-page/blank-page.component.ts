import { Component, OnInit, Input,ChangeDetectionStrategy  } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ProduitsService } from '../../../services/produits.service';
import { Produit } from '../../../model/model.produit';
import { Router,ActivatedRoute } from '@angular/router';
import { PaysService } from '../../../services/pays.service';
import { Pays } from '../../../model/model.pays';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DataSharingService } from '../../../services/data-sharing.service';


@Component({
    selector: 'app-blank-page',
    templateUrl: './blank-page.component.html',
    styleUrls: ['./blank-page.component.scss'],
    animations: [routerTransition()]
    //changeDetection: ChangeDetectionStrategy.OnPush

})
export class BlankPageComponent implements OnInit  {

    pageProduits:any;
    pagePays:any;
    pays:Pays[];
    paysNew:Pays;
    produit:Produit=new Produit();
    @Input() reference:number;
    cols: any[];
    referenceInput:number=0;
    errorMessage:string;
    product:String;

    constructor(public paysService:PaysService,public produitsService:ProduitsService,public router:Router,
        public activatedRoute:ActivatedRoute,private serviceSharing : DataSharingService) {
    }

        ngOnInit(){
            console.log('OnInit');
            //  this.reference=+this.activatedRoute.snapshot.params['reference'];
            //  console.log("Ref1 :"+JSON.stringify(this.reference));
             this.activatedRoute.params.subscribe(params => this.reference = params['reference']);
            console.log("Ref2 :"+JSON.stringify(this.reference));
             //this.serviceSharing.currentReference.subscribe(reference=>this.reference=reference)
             //console.log("Ref3 :"+JSON.stringify(this.reference));
            /*this.serviceSharing.currentProduit.subscribe(produitInput=>this.produit=produitInput);
            console.log("Produit"+JSON.stringify(this.produit));

            this.serviceSharing.currentPays.subscribe(paysInput=>this.pays=paysInput);
            console.log("Pays"+JSON.stringify(this.pays));

           this.serviceSharing.currentReference.subscribe(referenceInput=>this.reference=referenceInput)
           console.log("Ref3 :"+JSON.stringify(this.reference));

           if(this.reference===0){
               this.activatedRoute.params.subscribe(params => this.reference = params['reference']);
                console.log("Ref2 :"+JSON.stringify(this.reference));
                this.serviceSharing.newId(this.reference);
           }
            //console.log("Ref_Input :"+JSON.stringify(this.referenceInput));
*/
        this.getData(this.reference);
        }





        getData(reference : number){
             // this.reference=+this.activatedRoute.snapshot.params['reference'];
    this.activatedRoute.params.subscribe(params => reference = reference);
    //this.serviceSharing.currentReference.subscribe(referenceInput=>this.reference=referenceInput)
    //this.router.navigated = false;
    //this.router.navigate(['/blank-page',reference]);
    //this.activatedRoute.params
    //.forEach(params => {
// This will be triggered every time the params change
// Add your code to reload here. i.e.
      //const reference = params['reference'];
     // this.router.navigate(['/blank-page',reference]);

    // Liste des Produits
    this.produitsService.getProduitByRef(reference)
    .subscribe(data=>{
      this.pageProduits = data;
      this.produit=data;
      console.log(this.pageProduits);
      this.serviceSharing.newProd(this.produit);
      this.serviceSharing.currentProduit.subscribe(produit=>this.produit=produit);
      console.log("JSON System :"+JSON.stringify(this.produit));
      this.product=JSON.stringify(this.produit);

      if(this.product === "null"){
      alert("Error : Numéro de téléphone Introuvable ");
      }
    },err=>{
      console.log(err);
    })


    this.cols = [
        { field: 'codePays', header: 'CODE PAYS' },
        { field: 'paysName', header: 'NOM PAYS' },
        { field: 'libelle', header: 'LIBELLE' },
    ];

    //Liste des Pays
    this.paysService.getPaysByRef(reference)
    .subscribe(data=>{
      this.pagePays=data;
      this.pays=[this.pagePays];
      this.paysNew=this.pagePays;
      this.serviceSharing.newPays(this.pays);
     this.serviceSharing.currentPays.subscribe(pays=>this.pays=pays);
      //OU BIEN
      //this.pays=[this.pageProduits.pays]
      console.log("pays"+this.pays);
      console.log("pays page"+[this.pagePays]);

    },err=>{
      console.log(err);

    })

    //** ************************************************************************************** */
    console.log("reference blank : "+ reference);
    console.log("produit blank : "+JSON.stringify(this.produit));
    console.log("pays blank : "+this.pays);

    //** ************************************************************************************** */

    // });
}

       /* onEditProduit_Ref(reference:number){
            this.router.navigate(['/blank-page',reference]);
            console.log("Ena Houna");
           // window.location.reload(true);
          }*/



}
