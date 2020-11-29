import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService,Gag } from 'src/app/services/data.service';
import { Plugins, CameraResultType, CameraSource } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'app-new-gag',
  templateUrl: './new-gag.page.html',
  styleUrls: ['./new-gag.page.scss'],
})
export class NewGagPage implements OnInit {


  gag: Gag = {
    title: '',
    image: '',
    creator: null
  }

  captureImage = null;

  constructor( private dataService: DataService,
    private loadingControler: LoadingController,
    private router: Router) { }

  ngOnInit() {
  }

  async addImage(){
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: true,
      source: CameraSource.Photos,
      resultType: CameraResultType.Base64
    });

    console.log(image);

    this.captureImage = `data:image/jpeg;base64,${image.base64String}`;
    this.gag.image = image.base64String;
    console.log(this.gag);
  }
  
  async save(){
    const loading = await this.loadingControler.create();
    await loading.present();


    this.dataService.addGag(this.gag).subscribe((res) => {
      console.log(res);
      loading.dismiss();
      this.router.navigateByUrl("/");
    });
  }

}
