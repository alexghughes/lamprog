import { NgModule } from '@angular/core';
import {MatToolbarModule, MatFormFieldModule, MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';


@NgModule({
    imports: [MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule],
    exports: [MatToolbarModule, MatInputModule, MatFormFieldModule, MatButtonModule],

})

export class AngularMaterialModule {}
