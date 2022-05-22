import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingsAccountComponent } from './user-settings-account.component';

describe('UserSettingsAccountComponent', () => {
  let component: UserSettingsAccountComponent;
  let fixture: ComponentFixture<UserSettingsAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSettingsAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingsAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
