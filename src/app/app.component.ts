import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppModalForm } from './app.modal.form';
import { AppCommonService } from './app.common.service';
import { FormObject } from './formObject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private gridApi: any;
  private gridColumnApi: any;

  private columnDefs: any;
  private defaultColDef: any;
  private rowData: any[];
  private rowSelection: any;
  private editType: any;

  private formTypes: any[];
  private selectedFormType: any;
  private data: any[];
  private activeModalRef: NgbModalRef;

  private formObject: FormObject

  title = 'BRAVO';
  constructor(
    private modalService: NgbModal,
    private appCommonService: AppCommonService
    ) {
    //called first time before the ngOnInit()
  }

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges() 
    this.selectedFormType = "Published";
    this.appCommonService.submitFormData.subscribe((data) => {
      try {

        switch(data['key']) {
          case "SaveToDraft": {
            data['data'].tag = "Draft";
            console.log(data['data']);
            data['data'].id === -1 ? this.data.push(data['data']) : console.log('Record saved to draft ...!');
            this.rowData = this.data.filter(e => e.tag == 'Draft');
            this.selectedFormType = data['data'].tag;
            this.activeModalRef.close();      
            break;
          }
          case "SubmitOrUpdate": {
            data['data'].tag = "Published";
            console.log(data['data']);
            data['data'].id === -1 ? this.data.push(data['data']) : console.log('Record submit to table ...!');
            this.rowData = this.data.filter(e => e.tag == 'Published');
            this.selectedFormType = data['data'].tag;
            this.activeModalRef.close();
            break;
          }
          default: {
            break;
          }
        }

      } catch(e) {
        console.error(e);
      }
      
    });

    this.formTypes = [
      "Published",
      "InProgress",
      "Draft"
    ];

    this.data = [
      { id: 1, tag:'Published', make: 'Toyota', model: 'Celica', price: 35000 },
      { id: 2, tag:'Published', make: 'Ford', model: 'Mondeo', price: 32000 },
      { id: 3, tag:'Published', make: 'Porsche', model: 'Boxter', price: 72000 },
      { id: 4, tag:'InProgress', make: 'InProcess-Audi', model: 'A9', price: 69000 },
      { id: 5, tag:'InProgress', make: 'InProcess-Jaguar', model: 'Jaguar XF', price: 89000 },
      { id: 6, tag:'Draft', make: 'Draft-Maruti Suzuki', model: 'Vitara Brezza', price: 98000 }
    ];

    this.columnDefs = [
      {
        headerName: 'Make', field: 'make',
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true 
      },
      {headerName: 'Model', field: 'model' },
      {headerName: 'Price', field: 'price'}
    ];

    this.rowData = this.data.filter(e => e.tag == 'Published');
    this.rowSelection = "multiple";
    this.editType = "fullRow";
  } 

  onFilterTextBoxChanged(event) {
    console.log(event);
    this.gridApi.setQuickFilter(event.target.value);
  }

  applyTypeChange(event) {
    console.log(event.target.value);
    this.selectedFormType = event.target.value;

    switch(this.selectedFormType) {
      case "Draft": {
        this.rowData = this.data.filter(e => e.tag == 'Draft');
        break;
      } 
      case "InProgress": {
        this.rowData = this.data.filter(e => e.tag == 'InProgress');
        break;
      } 
      case "Published": {
        this.rowData = this.data.filter(e => e.tag == 'Published');
        break;
      }
      default: {
        this.rowData = this.data.filter(e => e.tag == 'Published');
        break;
      }
    }

  }

  onSelectionChanged() {
    var selectedRows = this.gridApi.getSelectedRows();
    this.activeModalRef = this.modalService.open(AppModalForm);
    this.formObject = selectedRows[0];
    this.activeModalRef.componentInstance.formObject = this.formObject;
  }

  addNewRow() {
    this.activeModalRef = this.modalService.open(AppModalForm);
    this.formObject = new FormObject();
    this.formObject.setId(-1);
    this.formObject.setTag('Draft');
    this.formObject.setMake('');   
    this.formObject.setModel('');
    this.formObject.setPrice('');
    this.activeModalRef.componentInstance.formObject = this.formObject;
  }

  removeRows() {
    var selectedRows = this.gridApi.getSelectedRows();

    for(let i=0; selectedRows.length>i; i++){
      this.data.splice(this.data.indexOf(selectedRows[i]),1);
      //this.data.filter(e => e.id == selectedRows[i].id).length > 0 ? this.data.splice(i,1) : console.log("Nothing record deleted..!");
    }
    this.rowData = this.data.filter(e => e.tag == this.selectedFormType);

  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();

    // this.http
    //   .get(
    //     "https://data.json"
    //   )
    //   .subscribe(data => {
    //     this.rowData = data;
    //   });
  }

}
