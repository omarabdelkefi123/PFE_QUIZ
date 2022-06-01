import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTestEaluationComponent } from './view-test-ealuation.component';

describe('ViewTestEaluationComponent', () => {
  let component: ViewTestEaluationComponent;
  let fixture: ComponentFixture<ViewTestEaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewTestEaluationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTestEaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
