import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'etudiant'
})
export class EtudiantPipe implements PipeTransform {

    transform(tabcom: any,classe:any,matricule:any,annee:any,motsemestre:any): any {
    console.log(tabcom);
        console.log(motsemestre);
        if(motsemestre){

            tabcom=tabcom.filter(a=>a.semestre.libelle==motsemestre);
            console.log(tabcom);
        }
       if(classe){
            tabcom=tabcom.filter(a=>a.classe.libelle==classe)

        }

        if(matricule){
            tabcom=tabcom.filter(a=>a.nomdocument.indexOf(matricule)!=-1)

        }
        if(annee){
            tabcom=tabcom.filter(a=>a.ref==annee)

        }

        return tabcom;
    }

}
