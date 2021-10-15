import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VET } from 'src/app/models/vet/vet';
import { VetService } from 'src/app/services/vet/vet.service';

@Component({
  selector: 'app-edit-detail',
  templateUrl: './edit-detail.page.html',
  styleUrls: ['./edit-detail.page.scss'],
})
export class EditDetailPage implements OnInit {

  updateVetDetails = {
    vetName: '',
    vetAddress: '',
    vetDistrict: '',
    vetEmail: '',
    vetPhone: null,
    vetMobilePhone: null,
    vetSocMed: '',
    vetService: '',
    vetOpen: '',
    vetClose: ''
  }

  petId: string;
  public vetDetails: VET;
  updateDetailForm: FormGroup;

  constructor(private activatedRoute: ActivatedRoute,
              private vetServices: VetService) { }

  ngOnInit() {
    this.petId = this.activatedRoute.snapshot.paramMap.get('vetId');

    this.vetServices.getVetDetail(this.petId).subscribe(vetDetail => {
      this.vetDetails = vetDetail;
    });

    this.updateDetailForm = new FormGroup({
      vetName: new FormControl(this.updateVetDetails.vetName, [
        Validators.required,
        Validators.minLength(5)
      ]),
      vetAddress: new FormControl(this.updateVetDetails.vetAddress, [
        Validators.required,
        Validators.minLength(10)
      ]),
      vetDistrict: new FormControl(this.updateVetDetails.vetDistrict, [
        Validators.required,
      ]),
      vetEmail: new FormControl(this.updateVetDetails.vetEmail, [
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')
      ]),
      vetPhone: new FormControl(this.updateVetDetails.vetPhone, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
        Validators.pattern('^[0-9]+$')
      ]),
      vetMobilePhone: new FormControl(this.updateVetDetails.vetMobilePhone, [
        Validators.required,
        Validators.minLength(7),
        Validators.maxLength(7),
        Validators.pattern('^[0-9]+$')
      ]),
      vetSocMed: new FormControl(this.updateVetDetails.vetSocMed, [
        Validators.required,
        Validators.minLength(5)
      ]),
      vetService: new FormControl(this.updateVetDetails.vetService, [
        Validators.required,
      ]),
      vetOpen: new FormControl(this.updateVetDetails.vetOpen, [
        Validators.required,
      ]),
      vetClose: new FormControl(this.updateVetDetails.vetClose, [
        Validators.required,
      ])
    })
  }

  updateVetDetail(): void{
    this.updateVetDetails.vetName = this.updateDetailForm.get('vetName').value;
    this.updateVetDetails.vetAddress = this.updateDetailForm.get('vetAddress').value;
    this.updateVetDetails.vetDistrict = this.updateDetailForm.get('vetDistrict').value;
    this.updateVetDetails.vetEmail = this.updateDetailForm.get('vetEmail').value;
    this.updateVetDetails.vetPhone = Number(this.updateDetailForm.get('vetPhone').value);
    this.updateVetDetails.vetMobilePhone = Number(this.updateDetailForm.get('vetMobilePhone').value);
    this.updateVetDetails.vetSocMed = this.updateDetailForm.get('vetSocMed').value;
    this.updateVetDetails.vetService = this.updateDetailForm.get('vetService').value;
    this.updateVetDetails.vetOpen = this.updateDetailForm.get('vetOpen').value;
    this.updateVetDetails.vetClose = this.updateDetailForm.get('vetClose').value;

    this.vetServices.updateVetDetail(this.petId, this.updateVetDetails);
  }

}
