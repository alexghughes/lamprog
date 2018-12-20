import { NgModule } from '@angular/core';
import {MatToolbarModule, MatFormFieldModule, MatButtonModule, MatDialogModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

@NgModule({
    imports: [MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule, MatCardModule, MatListModule],
    exports: [MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule, MatCardModule, MatListModule],

})

export class AngularMaterialModule {}
