import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeRepas } from './liste-repas';

describe('ListeRepas', () => {
  let component: ListeRepas;
  let fixture: ComponentFixture<ListeRepas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListeRepas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeRepas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
