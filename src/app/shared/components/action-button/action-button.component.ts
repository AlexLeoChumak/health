import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonButton } from '@ionic/angular/standalone';

type LabelButtonType =
  | 'войти'
  | 'зарегистрироваться'
  | 'обновить данные'
  | 'пациент'
  | 'медработник';

interface ActionButtonConfigInterface {
  label: LabelButtonType;
  isFormButton: boolean;
  isDisabled: boolean;
  routerLink: string | null;
}

@Component({
  selector: 'health-action-button',
  templateUrl: './action-button.component.html',
  styleUrls: ['./action-button.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, IonButton],
})
export class ActionButtonComponent {
  configProps = input<ActionButtonConfigInterface>({
    label: 'войти',
    isFormButton: true,
    isDisabled: true,
    routerLink: null,
  });

  action = output<void>();

  handleClick(): void {
    if (this.configProps().routerLink === null) {
      this.action.emit();
    }
  }
}
