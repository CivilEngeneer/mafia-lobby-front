import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: '<div>Такой страницы не существует.</div>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotFoundComponent {

}
