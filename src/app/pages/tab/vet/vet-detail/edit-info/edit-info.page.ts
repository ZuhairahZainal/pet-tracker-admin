import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VET } from 'src/app/models/vet/vet';
import { VetService } from 'src/app/services/vet/vet.service';

@Component({
  selector: 'app-edit-info',
  templateUrl: './edit-info.page.html',
  styleUrls: ['./edit-info.page.scss'],
})
export class EditInfoPage implements OnInit {

  newVetDetails = {
    vetName: '',
    vetAddress: '',
    vetEmail: '',
    vetPhone: '',
    vetMobilePhone: '',
    vetSocMed: '',
    vetService: '',
    vetOpen: null,
    vetClose: null
  }

  id: string;
  public vetDetail: VET;

  updateVetDetailForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private vetService: VetService) {}

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.vetService.getVetDetail(this.id ).subscribe(vetDetail => {
      this.vetDetail = vetDetail;
    });

    this.updateVetDetailForm = new FormGroup({
      vetName: new FormControl(this.newVetDetails.vetName,[
        Validators.required,
        Validators.minLength(5),
      ]),
      vetAddress: new FormControl(this.newVetDetails.vetAddress,[
        Validators.required,
        Validators.minLength(10),
      ]),
      vetEmail: new FormControl(this.newVetDetails.vetEmail,[
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      vetPhone: new FormControl(this.newVetDetails.vetPhone,[
        Validators.required,
        Validators.maxLength(7),
        Validators.minLength(7),
        Validators.pattern('^[0-9]+$')
      ]),
      vetMobilePhone: new FormControl(this.newVetDetails.vetMobilePhone,[
        Validators.required,
        Validators.maxLength(7),
        Validators.minLength(7),
        Validators.pattern('^[0-9]+$')
      ]),
      vetSocMed: new FormControl(this.newVetDetails.vetSocMed,[
        Validators.required,
        Validators.minLength(5),
      ]),
      vetService: new FormControl(this.newVetDetails.vetService,[
        Validators.required,
      ]),
      vetOpen: new FormControl(this.newVetDetails.vetOpen,[
        Validators.required,
      ]),
      vetClose: new FormControl(this.newVetDetails.vetClose,[
        Validators.required,
      ]),
    })
  }

  updateVetDetail(): void{
    this.newVetDetails.vetName = this.updateVetDetailForm.get('vetName').value;
    this.newVetDetails.vetAddress = this.updateVetDetailForm.get('vetAddress').value;
    this.newVetDetails.vetEmail = this.updateVetDetailForm.get('vetEmail').value;
    this.newVetDetails.vetPhone = this.updateVetDetailForm.get('vetPhone').value;
    this.newVetDetails.vetMobilePhone = this.updateVetDetailForm.get('vetMobilePhone').value;
    this.newVetDetails.vetSocMed = this.updateVetDetailForm.get('vetSocMed').value;
    this.newVetDetails.vetService = this.updateVetDetailForm.get('vetService').value;

    this.vetService.updateVetDetail(this.id, this.newVetDetails);
  }


}
