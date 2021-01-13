import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'zoom-image';
  selectImageToPreview: any;
  images = ['./../assets/images/sofa.jpg',
    './../assets/images/2.jpg',
    './../assets/images/3.jpg']
}
