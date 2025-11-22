import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRepas } from './edit-repas';

describe('EditRepas', () => {
  let component: EditRepas;
  let fixture: ComponentFixture<EditRepas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditRepas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRepas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
