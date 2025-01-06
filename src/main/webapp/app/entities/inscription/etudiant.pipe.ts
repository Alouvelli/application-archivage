import { Pipe, PipeTransform } from '@angular/core';
import {InscriptionComponent} from "./inscription.component";
import {LowerCasePipe} from "@angular/common";

@Pipe({
  name: 'etudiant'
})
export class EtudiantPipe implements PipeTransform {
    protected x:InscriptionComponent;
    transform(tabcom: any,niveau:any,classe:any,matricule:any,anneeScolaire:any,motprenomnom:any): any {
    console.log(tabcom);
        if(motprenomnom){
            tabcom=tabcom.filter(a=>a.etudiant.prenom.toLowerCase().indexOf(motprenomnom.toLowerCase() )!=-1)

        }
       if(classe){
            tabcom=tabcom.filter(a=>a.classe.libelle==classe)

        }
        if(niveau){
            tabcom=tabcom.filter(a=>a.classe.niveau.libelle== niveau)

        }
        if(matricule){
            tabcom=tabcom.filter(a=>a.etudiant.matricule.indexOf(matricule)!=-1)

        }
        if(anneeScolaire){
            tabcom=tabcom.filter(a=>a.anneescolaire.libelle== anneeScolaire)

        }

        return tabcom;
    }

}
