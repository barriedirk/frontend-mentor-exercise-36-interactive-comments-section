import { beforeEach, describe, expect, it } from 'vitest';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Comments } from './comments';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Comments (Vitest)', () => {
  let component: Comments;
  let fixture: ComponentFixture<Comments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Comments],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Comments);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
