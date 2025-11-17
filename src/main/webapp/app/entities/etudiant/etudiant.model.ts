export interface IEtudiant {
  id: number;
  nom?: string | null;
  prenom?: string | null;
  dateNaissance?: string | null;
  tel?: string | null;
  email?: string | null;
  adresse?: string | null;
  etat?: boolean | null;
  matricule?: string | null;
}

export type NewEtudiant = Omit<IEtudiant, 'id'> & { id: null };
