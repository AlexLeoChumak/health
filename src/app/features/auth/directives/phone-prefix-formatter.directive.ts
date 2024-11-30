import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  OnInit,
} from '@angular/core';

@Directive({
  selector: '[healthPhonePrefixFormatter]',
  standalone: true,
})
export class PhonePrefixFormatterDirective implements OnInit {
  private readonly prefix: string = '+375';
  private el = inject(ElementRef);

  public ngOnInit(): void {
    const inputElement = this.el.nativeElement;

    // Убедиться, что префикс установлен при инициализации
    if (!inputElement?.value?.startsWith(this.prefix)) {
      inputElement.value = this.prefix;
    }
  }

  @HostListener('ionInput', ['$event'])
  public onInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    // Если пользователь пытается удалить префикс, восстанавливаем его
    if (!inputElement?.value?.startsWith(this.prefix)) {
      inputElement.value = this.prefix;
    }

    // Удалить все недопустимые символы (оставить только цифры после префикса)
    const cleanedValue = inputElement.value
      .replace(this.prefix, '') // Удаляем префикс
      .replace(/\D/g, ''); // Удаляем все нечисловые символы

    const filteredValue: string = this.formatPhoneNumber(cleanedValue);

    // Восстанавливаем значение с префиксом
    inputElement.value = `${this.prefix}-${filteredValue}`;
  }

  private formatPhoneNumber(phoneNumber: string): string {
    const part1 = phoneNumber.slice(0, 2); // Первые 2 цифры (например, "29")
    const part2 = phoneNumber.slice(2, 5); // Следующие 3 цифры (например, "000")
    const part3 = phoneNumber.slice(5, 7); // Следующие 2 цифры (например, "00")
    const part4 = phoneNumber.slice(7, 9); // Последние 2 цифры (например, "00")

    // Склеиваем части с дефисами, игнорируя пустые
    return [part1, part2, part3, part4].filter(Boolean).join('-');
  }

  @HostListener('focusin', ['$event'])
  public onFocus(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    // Убедиться, что префикс всегда есть при фокусе
    if (!inputElement?.value?.startsWith(this.prefix)) {
      inputElement.value = this.prefix;
    }
  }
}