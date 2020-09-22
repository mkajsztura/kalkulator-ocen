import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    public dialogRef: MatDialogRef<AddRangeComponent>
  ) {}

}
