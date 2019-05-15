import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppModalForm } from './app.modal.form';
import { AppCommonService } from './app.common.service';
import { FormObject } from './formObject';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from './upload.service';
import { GridOptions } from "ag-grid-community";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private gridApi: any;
  private gridColumnApi: any;
  private gridOptions: GridOptions;

  private columnDefs: any;
  private defaultColDef: any;
  private rowData: any[];
  private rowSelection: any;
  private editType: any;

  private formTypes: any[];
  private selectedFormType: any;
  private data: any[];
  private activeModalRef: NgbModalRef;
  

  form: FormGroup;
  error: string;
  selectedFileList: FileList;
  selectedFile:  File; 
  uploadResponse = { status: '', message: '', filePath: '' };
  formData = [];

  private formObject: FormObject

  title = 'AG-Grid-InMemory';
  constructor(
    private modalService: NgbModal,
    private appCommonService: AppCommonService,
    private formBuilder: FormBuilder,
    private uploadService: UploadService
  ) {
    //called first time before the ngOnInit()
    this.gridOptions = <GridOptions>{};
  }

  ngOnInit() {
    //called after the constructor and called  after the first ngOnChanges() 

    /** Form upload code start **/

    this.appCommonService.getFormData().subscribe( 
      (data : any[]) => {
        console.log(JSON.stringify(data));
        this.data = data;
        this.rowData = this.data.filter(e => e.tag == 'Published');
      },
      error => {
        console.log(error);
      }
    );

    this.form = this.formBuilder.group({
      firstName: ['',],
      file: ['']
    });

    /** Form upload code end **/

    this.selectedFormType = "Published";
    this.appCommonService.submitFormData.subscribe((data) => {
      try {

        switch (data['key']) {
          case "SaveToDraft": {
            data['data'].tag = "Draft";
            console.log(data['data']);

            this.data.indexOf(data['data']) === -1 ? this.data.push(data['data']) : (this.data[this.data.indexOf(data['data'])] = data['data']);
            this.selectedFormType = data['data'].tag;
            this.rowData = this.data.filter(e => e.tag == 'Draft');
            this.appCommonService.submitFormData.next({"data":data['data'].tag,"key":"AfterSubmitApplyTypeChange"});

            let formData = new FormData();
            formData.append("data",data["data"]);
            formData.append("file",data["file"]);
            //do post call

            this.modalService.dismissAll();
            break;
          }
          case "SubmitOrUpdate": {
            data['data'].tag = "Published";
            console.log(data['data']);

            this.data.indexOf(data['data']) === -1 ? this.data.push(data['data']) : (this.data[this.data.indexOf(data['data'])] = data['data']);
            this.selectedFormType = data['data'].tag;
            this.rowData = this.data.filter(e => e.tag == 'Published');
            this.appCommonService.submitFormData.next({"data":data['data'].tag,"key":"AfterSubmitApplyTypeChange"});
            

            let formData = new FormData();
            formData.append("data",data["data"]);
            formData.append("file",data["file"]);
            //do post call

            this.modalService.dismissAll();
            break;
          }
          case "ApplyTypeChange": {
            this.applyTypeChange(data['data']);
            break;
          }
          case "RemoveRows": {
            this.removeRows();
            break;
        }
          default: {
            break;
          }
        }

      } catch (e) {
        console.error(e);
      }

    });

    this.formTypes = [
      "Published",
      "InProgress",
      "Draft"
    ];

    this.columnDefs = [
      {
        headerName: 'Make', field: 'make',
        headerCheckboxSelection: true,
        headerCheckboxSelectionFilteredOnly: true,
        checkboxSelection: true
      },
      { headerName: 'Model', field: 'model' },
      { headerName: 'Price', field: 'price' }
    ];

    this.gridOptions.columnDefs = this.columnDefs;
    this.gridOptions.rowSelection = "multiple";
    this.gridOptions.editType = "fullRow";
    this.gridOptions.suppressRowClickSelection = false;
  }

  applyTypeChange(event) {
    console.log(event.target.value);
    this.selectedFormType = event.target.value;

    switch (this.selectedFormType) {
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
    this.activeModalRef = this.modalService.open(AppModalForm, { size: 'lg', backdrop: 'static' });
    this.formObject = selectedRows[0];
    this.activeModalRef.componentInstance.formObject = this.formObject;
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

      /** Form upload code start **/

      onFileChange(event) {
        if (event.target.files.length > 0) {
          this.selectedFile = event.target.files[0];
        }
      }
    
      onSubmit() {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
    
        this.uploadService.upload(formData).subscribe(
          (res) => this.uploadResponse = res,
          (err) => this.error = err
        );
      }
  
      /** Form upload code end **/

}
