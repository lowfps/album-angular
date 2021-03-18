export class Foto {
  id: number;
  foto: string;
  descripcion: string;
  fotobase64: string;

  constructor(cod:number, ph: string, descrip: string, fotobase: string) {
    this.id = cod
    this.foto = ph;
    this.descripcion = descrip;
    this.fotobase64 = fotobase;
  }
}
