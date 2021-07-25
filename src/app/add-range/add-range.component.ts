import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IRange } from '../model/range.model';

@Component({
  selector: 'app-add-range',
  templateUrl: './add-range.component.html',
  styleUrls: ['./add-range.component.scss']
})
export class AddRangeComponent {
  form = new FormGroup({
    value: new FormControl('', Validators.required),
    grade: new FormControl('', Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<AddRangeComponent>,
    @Inject(MAT_DIALOG_DATA) public ranges: IRange[]
  ) {}

  onSubmit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { value, grade } = this.form.value;
    const index = this.ranges.length;
    const newRange: IRange = {
      value,
      grade,
      index
    };
    const newRanges = [...this.ranges, newRange].sort((a, b) => {
      return a.value - b.value;
    });
    this.dialogRef.close(newRanges);
  }

}
