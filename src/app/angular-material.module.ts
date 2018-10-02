import { NgModule } from '@angular/core';
import {MatToolbarModule, MatFormFieldModule, MatButtonModule, MatDialogModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    imports: [MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule],
    exports: [MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatDialogModule],

})

export class AngularMaterialModule {}
