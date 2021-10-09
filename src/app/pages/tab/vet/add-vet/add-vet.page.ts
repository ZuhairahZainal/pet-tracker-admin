import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Camera } from '@ionic-native/camera/ngx';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, tap } from "rxjs/operators"
import { FILE } from 'src/app/models/vet/vet';

@Component({
  selector: 'app-add-vet',
  templateUrl: './add-vet.page.html',
  styleUrls: ['./add-vet.page.scss'],
})
export class AddVetPage implements OnInit {

  ngFireUploadTask: AngularFireUploadTask;

  progressNum: Observable<number>;

  progressSnapshot: Observable<any>;

  fileUploadedPath: Observable<string>;

  files: Observable<FILE[]>;

  FileName: string;
  FileSize: number;

  isImgUploading: boolean;
  isImgUploaded: boolean;

  private ngFirestoreCollection: AngularFirestoreCollection<FILE>;

  vetDetail = {
    adminApproval: 'Approved',
    createdAt: new Date(),
    vetId: '',
    vetName: '',
    vetAddress: '',
    vetEmail: null,
    vetPhone: null,
    vetMobilePhone: null,
    vetSocMed: null,
    vetPhoto: null,
    vetService: '',
    vetOpen: null,
    vetClose: null
  }

  addVetForm: FormGroup;

  constructor(private loadingCtrl: LoadingController,
              private firestore: AngularFirestore,
              private storage: AngularFireStorage,
              private camera: Camera,
              private router: Router) {
                this.isImgUploading = false;
                this.isImgUploaded = false;

                this.ngFirestoreCollection = firestore.collection<FILE>('vet');
                this.files = this.ngFirestoreCollection.valueChanges();
               }

  ngOnInit() {
    this.addVetForm = new FormGroup({
    vetName: new FormControl(this.vetDetail.vetName,[
      Validators.required,
      Validators.minLength(5),
    ]),
    vetAddress: new FormControl(this.vetDetail.vetAddress,[
      Validators.required,
      Validators.minLength(10),
    ]),
    vetEmail: new FormControl(this.vetDetail.vetEmail,[
      Validators.required,
      Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
    ]),
    vetPhone: new FormControl(this.vetDetail.vetPhone,[
      Validators.required,
      Validators.maxLength(7),
      Validators.minLength(7),
      Validators.pattern('^[0-9]+$')
    ]),
    vetMobilePhone: new FormControl(this.vetDetail.vetMobilePhone,[
      Validators.required,
      Validators.maxLength(7),
      Validators.minLength(7),
      Validators.pattern('^[0-9]+$')
    ]),
    vetSocMed: new FormControl(this.vetDetail.vetSocMed,[
      Validators.required,
      Validators.minLength(5),
    ]),
    vetService: new FormControl(this.vetDetail.vetService,[
      Validators.required,
    ]),
    vetOpen: new FormControl(this.vetDetail.vetOpen,[
      Validators.required,
    ]),
    vetClose: new FormControl(this.vetDetail.vetClose,[
      Validators.required,
    ]),
  });

  }

  async addVet(): Promise<void>{
    const loading = await this.loadingCtrl.create();
    loading.present();

    this.vetDetail.vetId = this.firestore.createId();
    this.vetDetail.vetName = this.addVetForm.get('vetName').value;
    this.vetDetail.vetAddress = this.addVetForm.get('vetAddress').value;
    this.vetDetail.vetEmail = this.addVetForm.get('vetEmail').value;
    this.vetDetail.vetPhone = this.addVetForm.get('vetPhone').value;
    this.vetDetail.vetMobilePhone = this.addVetForm.get('vetMobilePhone').value;
    this.vetDetail.vetSocMed = this.addVetForm.get('vetSocMed').value;
    this.vetDetail.vetService = this.addVetForm.get('vetService').value;
    this.vetDetail.vetOpen = this.addVetForm.get('vetOpen').value;
    this.vetDetail.vetClose = this.addVetForm.get('vetClose').value;

    this.firestore.collection('vet').doc(this.vetDetail.vetId)
    .set(this.vetDetail).then(() => {
      loading.dismiss().then(() => {
        this.addVetForm = null;
        this.router.navigateByUrl('tab/vet');
        });
      },
      error => {
       loading.dismiss().then(() => {
         console.error(error);
       });
    })
  }

  fileUpload(event: Event) {

    let file = (event.target as HTMLInputElement).files[0];

    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!')
      return;
    }

    this.isImgUploading = true;
    this.isImgUploaded = false;

    this.FileName = file.name;

    const fileStoragePath = `vet/${new Date().getTime()}_${file.name}`;

    const imageRef = this.storage.ref(fileStoragePath);

    this.ngFireUploadTask = this.storage.upload(fileStoragePath, file);

    this.progressNum = this.ngFireUploadTask.percentageChanges();
    this.progressSnapshot = this.ngFireUploadTask.snapshotChanges().pipe(

      finalize(() => {
        this.fileUploadedPath = imageRef.getDownloadURL();

        this.fileUploadedPath.subscribe(resp=>{
          this.vetDetail.vetPhoto = resp;

          this.isImgUploading = false;
          this.isImgUploaded = true;
        },error => {
          console.log(error);
        })
      }),
      tap(snap => {
          this.FileSize = snap.totalBytes;
      })
    )
}

}
