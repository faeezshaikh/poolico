import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { FirebaseProvider } from './../../providers/firebase/firebase';
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';
// import { Observable } from 'angularfire2/database';
import { ContributePage } from '../contribute/contribute';

/**
 * Generated class for the IcodetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-icodetails',
  templateUrl: 'icodetails.html',
})
export class IcodetailsPage {

  ico:any;
  
  // icoDetails: any;
  public icoDetails$: FirebaseObjectObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams,
            public firebaseProvider: FirebaseProvider,public modalCtrl: ModalController) {
    this.ico = this.navParams.get('ico');
    // this.firebaseProvider.getIcoDetails(this.ico.id).subscribe((result) => {
    //   console.log(result); 
    //   this.icoDetails$ = result;
    //   console.log("Ico Details ===> ", this.icoDetails$);
    //  });;

    this.icoDetails$ = this.firebaseProvider.getIcoDetails(this.ico.id);
    console.log("Ico Details ===> ", this.icoDetails$);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IcodetailsPage');
  }

  openModal(icodetails) {
    
        console.log("Ico details ==> ", icodetails);
        let modal = this.modalCtrl.create(ContributePage, { icotitle: icodetails.title,
               presaleMin: icodetails.presaleMinimum, 
               presaleBonus: icodetails.presaleBonu,
              presalePrice: icodetails.presalePrice,
            status:icodetails.status,
          id:icodetails.$key});
        modal.present();
      }

}
