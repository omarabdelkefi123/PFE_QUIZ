import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuetionComponent } from './quetion.component';

describe('QuetionComponent', () => {
  let component: QuetionComponent;
  let fixture: ComponentFixture<QuetionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuetionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuetionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
