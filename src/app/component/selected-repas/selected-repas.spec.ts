import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedRepas } from './selected-repas';

describe('SelectedRepas', () => {
  let component: SelectedRepas;
  let fixture: ComponentFixture<SelectedRepas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedRepas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectedRepas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
