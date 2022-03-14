import { Component, OnInit } from '@angular/core';
import { FutureThingsService } from '../../services/future-things.service';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrls: ['./voting.component.scss']
})
export class VotingComponent implements OnInit {

  futureThings: string[] = [];

  constructor(private futureThingsService: FutureThingsService) { }

  ngOnInit(): void {
    this.futureThingsService.futureThings.subscribe(futureThings => {
      this.futureThings = futureThings;
    })
  }

}
