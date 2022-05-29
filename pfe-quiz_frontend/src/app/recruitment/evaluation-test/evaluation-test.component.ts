import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-evaluation-test',
  templateUrl: './evaluation-test.component.html',
  providers: [MessageService, ConfirmationService],
  styleUrls: ['./evaluation-test.component.scss', '../../../assets/demo/badges.scss']
})
export class EvaluationTestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
