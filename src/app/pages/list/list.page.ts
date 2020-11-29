import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { DataService,Gag } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  gags = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.reloadGags();
  }

  reloadGags(event?){
    this.dataService.getGags().subscribe( res => {
      this.gags = res;
      console.log(event);

      if(event){
        event.target.complete()
      }
    })
  }

  signOut(){
    this.dataService.signOut();
  }
}
