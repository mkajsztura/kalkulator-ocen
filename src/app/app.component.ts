import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddRangeComponent } from './add-range/add-range.component';
import { filter } from 'rxjs/operators';
export interface IRange {
  index: number;
  value: number;
  grade: string;
}

export interface IResult {
  points: number;
  percentage: number;
  grade: string;
}

const defaultRanges: IRange[] = [
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
  },
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'kalkulator-ocen';
  maxPoints = 10;
  steps: number[] = [0.5, 1];
  step = 1;
  ranges = defaultRanges;
  displayedColumns: string[] = ['value', 'grade'];
  displayedColumns2: string[] = ['points', 'percentage', 'grade'];
  results: IResult[];
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.generateResults();
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddRangeComponent, {
      data: this.ranges,
    });

    dialogRef
      .afterClosed()
      .pipe(filter(Boolean))
      .subscribe((ranges: IRange[]) => {
        this.ranges = ranges;
        this.generateResults();
      });
  }

  generateResults(): void {
    const gradesCount = this.maxPoints / this.step + 1;
    this.results = [...Array(gradesCount)].map((el, i) => {
      const points = i * this.step;
      const percentage = Math.round((points / this.maxPoints) * 100);
      const grade = this.assignGrade(percentage);
      const result: IResult = {
        points,
        percentage,
        grade,
      };

      return result;
    });
  }

  removeRange(index): void {
    this.ranges = this.ranges.filter((range, rangeIndex) => rangeIndex !== index);
    this.generateResults();
  }

  editRange(index): void {

  }

  private assignGrade(percentage): string {
    const firstBiggerIndex = this.ranges.findIndex(
      (range) => range.value > percentage
    );
    if (firstBiggerIndex > -1) {
      const previousIndex = firstBiggerIndex > 0 ? firstBiggerIndex - 1 : 0;
      return this.ranges[previousIndex].grade;
    }
    const lastRange = this.ranges[this.ranges.length - 1];
    return percentage >= lastRange.value ? lastRange.grade : 'brak';
  }
}
