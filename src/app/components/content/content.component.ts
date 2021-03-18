import { Component, OnInit, TemplateRef } from '@angular/core';
import { Foto } from "../../models/foto";
import { ARREGLO_FOTOS } from "../../mocks/foto-mocks";

import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  public arregloFotos: Foto[];
  public fotoSeleccionada: Foto;

  public modalRef: BsModalRef;
  public modalTitulo: string;
  public modalTexto: string;
  public modalContenido: string;

  constructor(
    public modalService: BsModalService
  ) {
    this.arregloFotos = ARREGLO_FOTOS;
    this.fotoSeleccionada = new Foto('','','');
    this.modalRef = modalService.show('');
    this.modalTitulo = '';
    this.modalTexto = '';
    this.modalContenido = '';
   }

  ngOnInit(): void {
  }

  public eliminar(): void {
    this.eliminarFoto(this.fotoSeleccionada);
    this.modalRef.hide();
  }

  public cancelarEliminar(): void {
    this.modalRef.hide();
  }

  public guardarFoto (input: any):void{
    console.log('entró a guardar foto');

  }

  public eliminarFoto(objFoto: Foto): void {
    this.arregloFotos = this.arregloFotos.filter(
      (element) => element != objFoto
    );
    this.fotoSeleccionada = new Foto('','','');
  }

  public abrirModal(template: TemplateRef<any>, fotoTmp: Foto): void {
    this.fotoSeleccionada = fotoTmp;
    this.modalRef = this.modalService.show(template, { class: 'modal-md' });
    this.modalTitulo = 'Advertencia';
    this.modalTexto = '¿Está seguro de eliminar foto?';
    this.modalContenido = this.fotoSeleccionada.foto;
  }

}
