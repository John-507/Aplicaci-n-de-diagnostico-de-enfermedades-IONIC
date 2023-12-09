import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SintomasPage } from './sintomas.page';

describe('SintomasPage', () => {
  let component: SintomasPage;
  let fixture: ComponentFixture<SintomasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SintomasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
