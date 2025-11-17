import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etudiant'
})
export class EtudiantPipe implements PipeTransform {

    transform(tabcom: any,classe:any,niveau:any,matricule:any,anneeScolaire:any): any {

       if(classe){
            tabcom=tabcom.filter(a=>a.classe.libelle== classe)

        }
        if(niveau){
            tabcom=tabcom.filter(a=>a.niveau.libelle== niveau)

        }
        if(matricule){
            tabcom=tabcom.filter(a=>a.matricule== matricule)

        }
        if(anneeScolaire){
            tabcom=tabcom.filter(a=>a.anneeScolaire.libelle== anneeScolaire)

        }

        return tabcom;
    }

}
