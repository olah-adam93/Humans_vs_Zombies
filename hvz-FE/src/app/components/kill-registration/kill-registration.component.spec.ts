import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KillRegistrationComponent } from './kill-registration.component';

describe('KillRegistrationComponent', () => {
  let component: KillRegistrationComponent;
  let fixture: ComponentFixture<KillRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KillRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KillRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
