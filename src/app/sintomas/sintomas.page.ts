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
    private api: ApiService,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    this.cargarSintomas();
  }

  async cargarSintomas() {
    // Muestra un indicador de carga mientras se obtienen los síntomas
    const loading = await this.loadingCtrl.create({
      message: 'Cargando síntomas...'
    });
    await loading.present();

    // llama al método del servicio para obtener los síntomas
    this.api.obtenerSintomas().subscribe(sintomas => {
      // Asigna los síntomas obtenidos al array 'sintomas'
      this.sintomas = sintomas;
      console.log('Lista de síntomas:', this.sintomas);
      //oculta el indicador de carga
      loading.dismiss();
    }, err => {
      // Maneja el error si existe
      console.error('Error al cargar los sintomas:', err);
      loading.dismiss();
    });
  }

  cambiarSeleccion(sintoma: string, valor: boolean) {
    // Convierte el ID de sintoma a un número
    const idNumerico = Number(sintoma);
    this.seleccionados[idNumerico] = valor;

    // Encuentra el objeto de síntoma basado en el ID numérico
    let sintomaObjeto = this.sintomas.find(sintoma => sintoma.id === idNumerico);
    if (sintomaObjeto && sintomaObjeto.nombre) {
      console.log(`ID: ${idNumerico}, Nombre: ${sintomaObjeto.nombre}, Seleccionado: ${valor}`);
    } else {
      console.log(`No se encontró un nombre para el ID: ${idNumerico}`);
    }
  }

  async enviar() {
    const loading = await this.loadingCtrl.create({
      message: 'Enviando datos...'
    });
    await loading.present();

    const sintomasIds = Object.keys(this.seleccionados).filter(key => this.seleccionados[key]);

    const sintomasNombres = sintomasIds.map(id => {
      const sintoma = this.sintomas.find(s => s.id === Number(id));
      return sintoma ? sintoma.nombre : null;
    }).filter(nombre => nombre !== null);

    this.api.diagnosticar(sintomasNombres).subscribe(res => {
      loading.dismiss();
      this.navCtrl.navigateForward(['/resultados'], {
        queryParams: { diagnostico: JSON.stringify(res) }
      });
    }, err => {
      console.error('Error al enviar los síntomas:', err);
      loading.dismiss();
    });
  }

}
