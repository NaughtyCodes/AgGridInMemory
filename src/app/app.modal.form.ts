import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppCommonService } from './app.common.service';

@Component({
  selector: 'app-modal-form',
  template: `
  <div class="modal-header">
      <h4 class="modal-title">{{formObject.tag}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">

    <form>
    <div class="form-group">
      <label for="make">Make:</label>
      <input type="text" [(ngModel)]="formObject.make" class="form-control" id="make" placeholder="Enter Make" name="make">
    </div>
    <div class="form-group">
      <label for="model">Model:</label>
      <input type="text" [(ngModel)]="formObject.model" class="form-control" id="model" placeholder="Enter Model" name="model">
    </div>
	  <div class="form-group">
      <label for="price">Price:</label>
      <input type="text" [(ngModel)]="formObject.price" class="form-control" id="price" placeholder="Enter Price" name="price">
    </div>
    <div class="form-group">
      <label for="File Upload">File Upload:</label>
    </div>
    <div class="form-group">
      <input type="file" name="file" (change)="onFileChange($event)" />
    </div>
    
    <div class="form-group">
      <button type="submit" (click)="saveToDraft()" style="margin-right:5px;" class="btn btn-primary">Save</button>
      <button type="submit" (click)="submitOrUpdate()" class="btn btn-primary">Submit Or Update</button>
    </div>

</form>
    

    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class AppModalForm implements OnInit {

  @Input() formObject: any;
  private selectedFile: any;

  constructor
  (
      public activeModal: NgbActiveModal,
      private appCommonService: AppCommonService
  ) {}

  saveToDraft() {
    console.log('calling form rxjs => save to draft');
    this.appCommonService.submitFormData.next({"data":this.formObject, "file": this.selectedFile, "key":"SaveToDraft"});
  }

  submitOrUpdate() {
    console.log('calling form rxjs ==> submit or update');
    this.appCommonService.submitFormData.next({"data":this.formObject, "file": this.selectedFile, "key":"SubmitOrUpdate"});
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  ngOnInit() {
    
  }

}