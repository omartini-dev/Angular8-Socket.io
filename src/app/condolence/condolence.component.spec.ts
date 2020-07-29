import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondolenceComponent } from './condolence.component';

describe('CondolenceComponent', () => {
  let component: CondolenceComponent;
  let fixture: ComponentFixture<CondolenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondolenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondolenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
