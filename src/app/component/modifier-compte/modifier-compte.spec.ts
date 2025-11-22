import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifierCompte } from './modifier-compte';

describe('ModifierCompte', () => {
  let component: ModifierCompte;
  let fixture: ComponentFixture<ModifierCompte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModifierCompte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifierCompte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
