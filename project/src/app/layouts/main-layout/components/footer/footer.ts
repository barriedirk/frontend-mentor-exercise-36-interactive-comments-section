import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer class="attribution text-preset-3 txt-purple-200 py-4 text-center text-xs">
      Challenge by
      <a
        className="m-0.5 "
        href="https://www.frontendmentor.io/profile/barriedirk/solutions"
        target="_blank"
        rel="noopener"
        aria-label="View solutions by Barrie Freyre on Frontend Mentor"
      >
        Frontend Mentor
      </a>
      . Coded by
      <a
        className="m-0.5"
        href="https://www.linkedin.com/in/barriefreyre/"
        target="_blank"
        rel="noopener"
        aria-label="Visit Barrie Freyre's LinkedIn profile"
      >
        Barrie Freyre
      </a>
      .
    </footer>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Footer {}
