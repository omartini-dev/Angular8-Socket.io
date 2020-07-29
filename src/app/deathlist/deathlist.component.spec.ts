import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathlistComponent } from './deathlist.component';

describe('DeathlistComponent', () => {
  let component: DeathlistComponent;
  let fixture: ComponentFixture<DeathlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeathlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
