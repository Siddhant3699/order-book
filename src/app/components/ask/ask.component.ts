import { Component, Input } from '@angular/core';
import { COLUMNS } from 'src/app/shared/constants';

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css'],
})
export class AskComponent {
  @Input() public data: Array<number[]>;
  public displayedColumns = COLUMNS.ASKS;
}
