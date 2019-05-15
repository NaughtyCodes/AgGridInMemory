import { Component, Input, OnInit } from '@angular/core';
import { GridOptions } from "ag-grid-community";
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormObject } from '../formObject';
import { AppModalForm } from '../app.modal.form';
import { AppCommonService } from '../app.common.service';

@Component({
  selector: 'app-custom-toolbar',
  templateUrl: './custom-toolbar.component.html',
  styleUrls: ['./custom-toolbar.component.css']
})
export class CustomToolbarComponent implements OnInit {

  @Input() gridOptions: GridOptions;
  @Input() formTypes: any[];

  private activeModalRef: NgbModalRef;
  private formObject: FormObject;
  public selectedFormType: any;

  constructor(
    private modalService: NgbModal,
    private appCommonService: AppCommonService
    ) { }

  ngOnInit() {

    this.appCommonService.submitFormData.subscribe((data) => {
      try {

        switch (data['key']) {
          case "AfterSubmitApplyTypeChange": {
              this.selectedFormType = data['data'];
            break;
          } default: {
            break;
          }
        }

      } catch(e) { console.error(e); }
    });
  }

  onFilterTextBoxChanged(event) {
    console.log(event);
    this.gridOptions.api.setQuickFilter(event.target.value);
  }

  addNewRow() {
    this.activeModalRef = this.modalService.open(AppModalForm);
    this.formObject = new FormObject();
    this.formObject.setId(Math.floor(Math.random() * 10000) + 1000);
    this.formObject.setTag('Draft');
    this.formObject.setMake('');
    this.formObject.setModel('');
    this.formObject.setPrice('');
    this.activeModalRef.componentInstance.formObject = this.formObject;
  }

  
  removeRows() {
    //this.appCommonService.submitFormData.next({"data":{},"key":"RemoveRows"});
    let selectedRows = this.gridOptions.api.getSelectedRows();
    this.gridOptions.api.updateRowData({ remove: selectedRows });
    // this.gridOptions.api.forEachNode(function(rowNode, index){
    //    console.log('node ' + JSON.stringify(rowNode.data) + ' is in the grid');
    // });
    }
  
  submitGrid() {
    console.info(this.gridOptions.api.getModel());
  }

  applyTypeChange(event) {
    this.appCommonService.submitFormData.next({"data":event,"key":"ApplyTypeChange"});
  }

}
