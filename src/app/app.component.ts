import { Component } from '@angular/core';

interface Range {
  index: number;
  value: number;
  grade: string;
}
const defaultRanges: Range[] = [
  {
    index: 0,
    value: 0,
    grade: '1',
  },
  {
    index: 1,
    value: 35,
    grade: '2',
  },
  {
    index: 2,
    value: 50,
    grade: '3',
  },
  {
    index: 3,
    value: 70,
    grade: '4',
  },
  {
    index: 4,
    value: 90,
    grade: '5',
  },
  {
    index: 5,
    value: 100,
    grade: '6',
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'kalkulator-ocen';
  maxPoints = 12;
  step = 1;
  dataSource = defaultRanges;
  displayedColumns: string[] = ['value', 'grade'];
}
