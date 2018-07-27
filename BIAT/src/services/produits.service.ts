import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Produit } from "../model/model.produit";
import { Observable } from "rxjs";


@Injectable()
export class ProduitsService{

    constructor(public http:HttpClient) { }

getProduits(): Observable<Produit[]>
{
        return this.http.get<Produit[]>("http://192.168.1.3:8080/MyCatalogue-0.0.1-SNAPSHOT/all");
}

getProduitByReference(reference:number): Observable<Produit>
{
        return this.http.get<Produit>("http://192.168.1.3:8080/MyCatalogue-0.0.1-SNAPSHOT/getProduit/"+reference);
}

getProduitByRefe(reference:number): Observable<Produit[]>
{
        return this.http.get<Produit[]>("http://192.168.1.3:8080/MyCatalogue-0.0.1-SNAPSHOT/getProduit/"+reference);
}

getProduitByRef(reference:number): Observable<Produit>
{
        return this.http.get<Produit>("http://192.168.1.3:8080/MyCatalogue-0.0.1-SNAPSHOT/produitsByReference/"+reference);
}

getProduitsParMc(motCle:string,pageNumber:number): Observable<Produit[]>
{
        return this.http.get<Produit[]>("http://192.168.1.3:8080/MyCatalogue-0.0.1-SNAPSHOT/produitsParMotCle?motCle="+motCle+"&page="+pageNumber);
}

getProduitsWithMc(motCle:string,pageNumber:number): Observable<Produit>
{
    return this.http.get<Produit>("http://192.168.1.3:8080/MyCatalogue-0.0.1-SNAPSHOT/produitsParMotCle?motCle="+motCle+"&page="+pageNumber);
}

addProduit(produit:Produit):Observable<Produit>
{

         return this.http.post<Produit>("http://192.168.1.3:8080/MyCatalogue-0.0.1-SNAPSHOT/save?designation="+produit.designation+
         "&prix="+produit.prix+
         "&date="+produit.date
         ,produit);
}

modifierProduit(produit:Produit){
        return this.http.put("http://192.168.1.3:8080/MyCatalogue-0.0.1-SNAPSHOT/updateProduit/",produit);
}

supprimerProduit(reference:number): Observable<{}>
{
        return this.http.delete("http://192.168.1.3:8080/MyCatalogue-0.0.1-SNAPSHOT/deleteProduit/"+reference);
}

}

