import { Component, OnInit } from '@angular/core';
import { ApiService } from './../servicio/api.service';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-sintomas',
  templateUrl: './sintomas.page.html',
  styleUrls: ['./sintomas.page.scss'],
})
export class SintomasPage implements OnInit {

  sintomas: any[] = [];

  seleccionados: any = {};


  constructor(
    private api:ApiService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.cargarSintomas();
  }

  async cargarSintomas(){
    // Muestra un indicador de carga mientras se obtienen los síntomas
    const loading = await this.loadingCtrl.create({
      message: 'Cargando síntomas...'
    });
    await loading.present();

    // llama al método del servicio para obtener los síntomas
    this.api.obtenerSintomas().subscribe(sintomas => {
      // Asigna los síntomas obtenidos al array 'sintomas'
      this.sintomas = sintomas;
      //oculta el indicador de carga
      loading.dismiss();
    }, err => {
      // Maneja el error si existe
      console.error('Error al cargar los sintomas:', err);
      loading.dismiss();
    });
  }

  cambiarSeleccion(sintoma: string, valor: boolean) {
    // Asigna el valor al objeto 'seleccionados'
    this.seleccionados[sintoma] = valor;
  }

  async enviar() {
    // Mostrar un indicador de carga
    const loading = await this.loadingCtrl.create({
      message: 'Enviando datos...'
    });
    await loading.present();

    // Obtiene los síntomas seleccionados como un array
    const sintomasSeleccionados = Object.keys(this.seleccionados).filter(key => this.seleccionados[key]);

    // Llama al método diagnosticar del servicio ApiService
    this.api.diagnosticar(sintomasSeleccionados).subscribe(res => {
      // Oculta el indicador de carga
      loading.dismiss();

      // Navega a la página de resultado pasando los datos como parámetros
      this.navCtrl.navigateForward(['/resultados'], {
        queryParams: { diagnostico: JSON.stringify(res) }
      });
    }, err => {
      // Maneja el error aquí si ocurre alguno
      console.error('Error al enviar los síntomas:', err);
      loading.dismiss();
    });
  }



}
