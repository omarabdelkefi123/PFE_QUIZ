import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTestEvaluationComponent } from './edit-test-evaluation.component';

describe('EditTestEvaluationComponent', () => {
  let component: EditTestEvaluationComponent;
  let fixture: ComponentFixture<EditTestEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTestEvaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTestEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
