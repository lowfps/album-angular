export class Foto {
  foto: string;
  descripcion: string;
  fotobase64: string;

  constructor(ph: string, descrip: string, fotobase: string) {
    this.foto = ph;
    this.descripcion = descrip;
    this.fotobase64 = fotobase;
  }
}
