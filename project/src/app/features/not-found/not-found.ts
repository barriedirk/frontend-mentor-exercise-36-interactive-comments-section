import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="txt-grey-800 mt-10 flex flex-col items-center justify-center text-center">
      <h1 class="text-4xl font-bold">404</h1>
      <p class="mt-2 text-lg">Page not found</p>
      <a routerLink="/" class="mt-4 block text-blue-500 underline">Go Home</a>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFound {}
