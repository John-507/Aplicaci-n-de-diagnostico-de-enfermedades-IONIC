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
  termino: string = '';
  sintomasFiltrados: any[] = [];


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
      this.sintomasFiltrados = sintomas;
      console.log('Lista de síntomas:', this.sintomas);
      //oculta el indicador de carga
      loading.dismiss();
    }, err => {
      // Maneja el error si existe
      console.error('Error al cargar los sintomas:', err);
      loading.dismiss();
    });
  }

  cambiarSeleccion(sintomaId: number, valor: boolean) {
    this.seleccionados[sintomaId] = valor;
    // Actualiza la lista de síntomas filtrados para reflejar el estado de los checkboxes
    this.sintomasFiltrados = this.sintomasFiltrados.map(sintoma => {
      sintoma.seleccionado = this.seleccionados[sintoma.id];
      return sintoma;
    });
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

  buscar() {
    if (this.termino === '') {
      this.sintomasFiltrados = this.sintomas;
    } else {
      const resultados = this.sintomas.filter(sintoma =>
        sintoma.nombre.toLowerCase().includes(this.termino.toLowerCase())
      );
      this.sintomasFiltrados = resultados.sort((a, b) => {
        return a.nombre.toLowerCase().indexOf(this.termino.toLowerCase()) -
               b.nombre.toLowerCase().indexOf(this.termino.toLowerCase());
      });
    }
  }

}
