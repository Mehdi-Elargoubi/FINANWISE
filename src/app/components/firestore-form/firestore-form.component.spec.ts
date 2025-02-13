import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirestoreFormComponent } from './firestore-form.component';

describe('FirestoreFormComponent', () => {
  let component: FirestoreFormComponent;
  let fixture: ComponentFixture<FirestoreFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirestoreFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirestoreFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
