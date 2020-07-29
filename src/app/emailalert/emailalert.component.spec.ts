import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailalertComponent } from './emailalert.component';

describe('EmailalertComponent', () => {
  let component: EmailalertComponent;
  let fixture: ComponentFixture<EmailalertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailalertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
