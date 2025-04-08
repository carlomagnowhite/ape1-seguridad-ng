import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMsjEncryptionComponent } from './add-msj-encryption.component';

describe('AddMsjEncryptionComponent', () => {
  let component: AddMsjEncryptionComponent;
  let fixture: ComponentFixture<AddMsjEncryptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddMsjEncryptionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddMsjEncryptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
