import { Component, Input } from '@angular/core';
import { COLUMNS } from 'src/app/shared/constants';

@Component({
  selector: 'app-bid',
  templateUrl: './bid.component.html',
  styleUrls: ['./bid.component.css'],
})
export class BidComponent {
  @Input() public data: Array<number[]>;
  public displayedColumns = COLUMNS.BIDS;
}
