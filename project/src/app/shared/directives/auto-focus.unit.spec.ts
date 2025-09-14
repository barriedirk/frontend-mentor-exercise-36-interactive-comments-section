import { Component, provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoFocus } from './auto-focus';

@Component({
  standalone: true,
  imports: [AutoFocus],
  template: `<input type="text" [appAutoFocus] />`,
})
class TestComponent {}

describe('AutoFocus Directive (Karma + Jasmine)', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should focus the input element after view init', async () => {
    const inputEl = fixture.nativeElement.querySelector('input') as HTMLInputElement;

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.activeElement).toBe(inputEl);
  });
});
