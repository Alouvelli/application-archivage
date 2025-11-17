import { IEtudiant, NewEtudiant } from './etudiant.model';

export const sampleWithRequiredData: IEtudiant = {
  id: 29477,
  nom: 'à cause de',
  prenom: 'relire membre du personnel membre à vie',
  matricule: 'ouah près',
};

export const sampleWithPartialData: IEtudiant = {
  id: 27091,
  nom: 'proche',
  prenom: 'intéresser affable pas mal',
  tel: 'jusqu’à ce que',
  etat: false,
  matricule: 'jusque à condition que administration',
};

export const sampleWithFullData: IEtudiant = {
  id: 938,
  nom: 'entièrement que lâcher',
  prenom: 'avant-hier',
  dateNaissance: 'population du Québec responsable',
  tel: 'distribuer de manière à ce que souple',
  email: 'Emmanuel.Gauthier13@hotmail.fr',
  adresse: 'peu',
  etat: false,
  matricule: 'concernant patientèle hôte',
};

export const sampleWithNewData: NewEtudiant = {
  nom: 'broum complètement camarade',
  prenom: 'assez près en faveur de',
  matricule: 'auparavant population du Québec chut',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
