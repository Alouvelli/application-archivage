export interface ITypeDocument {
  id: number;
  libelle?: string | null;
  description?: string | null;
  etat?: boolean | null;
}

export type NewTypeDocument = Omit<ITypeDocument, 'id'> & { id: null };
