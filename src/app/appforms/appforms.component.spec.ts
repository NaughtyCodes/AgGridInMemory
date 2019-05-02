import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppformsComponent } from './appforms.component';

describe('AppformsComponent', () => {
  let component: AppformsComponent;
  let fixture: ComponentFixture<AppformsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppformsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
