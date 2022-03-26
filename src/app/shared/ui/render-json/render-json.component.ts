import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-render-json',
  templateUrl: './render-json.component.html',
  styleUrls: ['./render-json.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RenderJsonComponent {
  public parsedJson: any;

  @Input() set json(value: string) {
    this.parsedJson = JSON.parse(value);
  }
}
