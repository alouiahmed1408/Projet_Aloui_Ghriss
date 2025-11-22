import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRepas } from './add-new-repas';

describe('AddNewRepas', () => {
  let component: AddNewRepas;
  let fixture: ComponentFixture<AddNewRepas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNewRepas]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewRepas);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
