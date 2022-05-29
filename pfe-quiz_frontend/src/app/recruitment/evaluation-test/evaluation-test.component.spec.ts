import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluationTestComponent } from './evaluation-test.component';

describe('EvaluationTestComponent', () => {
  let component: EvaluationTestComponent;
  let fixture: ComponentFixture<EvaluationTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluationTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluationTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
