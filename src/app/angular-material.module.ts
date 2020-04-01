import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@NgModule({
    imports: [MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule, MatCardModule, MatListModule],
    exports: [MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule, MatCardModule, MatListModule],

})

export class AngularMaterialModule {}
