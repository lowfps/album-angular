import { Component, OnInit, TemplateRef } from '@angular/core';
import { Foto } from '../../models/foto';
import { ARREGLO_FOTOS } from '../../mocks/foto-mocks';

import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
})
export class ContentComponent implements OnInit {
  public arregloFotos: Foto[];
  public fotoSeleccionada: Foto;

  public tmpBase64: any;

  public modalRef: BsModalRef;
  public modalTitulo: string;
  public modalTexto: string;
  public modalContenido: string;

  constructor(
    public modalService: BsModalService,
    private toastr: ToastrService
  ) {
    this.arregloFotos = ARREGLO_FOTOS;
    this.fotoSeleccionada = new Foto(0, '', '', '');
    this.modalRef = modalService.show('');
    this.modalTitulo = '';
    this.modalTexto = '';
    this.modalContenido = '';
  }

  ngOnInit(): void {}

  public seleccionar(tmpFoto: Foto): void {
    this.fotoSeleccionada = tmpFoto;
  }
  public cancelar(): void {
    this.fotoSeleccionada= new Foto(0, '', '', '');
  }

  public cancelarEliminar(): void {
    this.modalRef.hide();
  }

  public eliminar(): void {
    this.eliminarFoto(this.fotoSeleccionada);
    this.modalRef.hide();
  }

  public grabarRegistro(): boolean {
    if (this.fotoSeleccionada.descripcion === '') {
      const parametros = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 8000,
      };
      this.toastr.error(
        'No se pueden crear foto <br/> con campos vacíos',
        'Advertencia',
        parametros
      );
      return false;
    } else {
      this.fotoSeleccionada.id = this.arregloFotos.length + 1;
      this.arregloFotos.push(this.fotoSeleccionada);
      return true;
    }
  }

  public procesarRegistro() {
    if (this.fotoSeleccionada.id === 0) {
      this.grabarRegistro();
    }
    this.fotoSeleccionada = new Foto(0, '', '', '');
    // console.log('entró a procesarRegistro');
  }

  public guardarFoto(input: any): any {
    if (!input.target.files[0] || input.target.files[0].length === 0) {
      return;
    }
    //mimeType hace referencia al tipo de dato permitido
    const mimeType = input.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      const parametros = {
        closeButton: true,
        enableHtml: true,
        progressBar: true,
        positionClass: 'toast-top-right',
        timeOut: 8000,
      };
      this.toastr.error(
        'Solo se permiten imagenes <br/> jpeg y png',
        'Advertencia',
        parametros
      );
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(input.target.files[0]);
    reader.onload = () => {
      this.tmpBase64 = reader.result;
      this.fotoSeleccionada.fotobase64 = this.tmpBase64;
      this.fotoSeleccionada.foto = input.target.files[0].name;
    };
  }

  public eliminarFoto(objFoto: Foto): void {
    this.arregloFotos = this.arregloFotos.filter(
      (element) => element != objFoto
    );
    this.fotoSeleccionada = new Foto(0, '', '', '');
  }

  public abrirModal(template: TemplateRef<any>, fotoTmp: Foto): void {
    this.fotoSeleccionada = fotoTmp;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'Advertencia';
    this.modalTexto = '¿Está seguro de eliminar foto?';
    this.modalContenido = this.fotoSeleccionada.foto;
  }
}
