import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { AddRangeComponent } from './add-range/add-range.component';
import { IRange } from './model/range.model';
import { IResult } from './model/result.model';
import { DEFAULT_RANGES } from './default-ranges.const';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  ranges = DEFAULT_RANGES;
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

  generatePdf(): void {
    const doc = new jsPDF();
    const tableStart = `
    <table width="100%">
      <tr>
        <th>Punkty</th>
        <th>Procent</th>
        <th>Ocena</th>
      </tr>`;
    const results = this.results.map((result) => {
      return `<tr>
        <td>${result.points}</td>
        <td>${result.percentage}</td>
        <td>${result.grade}</td>
      </tr>`;
    }).join('');
    const tableEnd = `</table>`;

    const table = tableStart + results + tableEnd;
    console.log(table)
    // doc.fromHTML(table, 1, 1);

    doc.autoTable({
      head: [['Punkty', 'Procent', 'Ocena']],
      body: [
        ...this.results.map((result) => [result.points, result.percentage, result.grade])
        // ...
      ],
    });
    doc.save('wyniki.pdf');
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
