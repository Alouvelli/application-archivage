export interface IDocumentexcel {
  id: number;
  excel?: string | null;
  excelContentType?: string | null;
}

export type NewDocumentexcel = Omit<IDocumentexcel, 'id'> & { id: null };
