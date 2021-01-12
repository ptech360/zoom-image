import { Component, OnInit, Input, ViewChild, AfterViewInit, ElementRef, OnChanges, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-zoom-image',
  templateUrl: './zoom-image.component.html',
  styleUrls: ['./zoom-image.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZoomImageComponent implements OnInit, AfterViewInit, OnChanges {
  cy: number;
  cx: number;
  @ViewChild('myresult') myresult: ElementRef;
  @ViewChild('image') image: ElementRef;
  @ViewChild('lens') lens: ElementRef;


  @Input() img: HTMLImageElement;
  constructor(
    // private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    console.log(this.image);

  }

  ngAfterViewInit() {

  }


  ngOnChanges() {
    setTimeout(() => {
      this.myresult.nativeElement.style.display = 'block';
      this.image.nativeElement.src = this.img.src;
      /*calculate the ratio between result DIV and lens:*/
      this.cx = this.myresult.nativeElement.offsetWidth / this.lens.nativeElement.offsetWidth;
      this.cy = this.myresult.nativeElement.offsetHeight / this.lens.nativeElement.offsetHeight;
      /*set background properties for the result DIV:*/
      this.myresult.nativeElement.style.backgroundImage = "url('" + this.image.nativeElement.src + "')";
      this.myresult.nativeElement.style.backgroundSize = (this.image.nativeElement.width * this.cx) + "px " + (this.image.nativeElement.height * this.cy) + "px";

    }, 0);
  }

  onMouseOut(e) {
    e.preventDefault();
    e.stopPropagation();
    this.myresult.nativeElement.style.display = 'none';

  }

  onMouseOver(e) {
    e.preventDefault();
    e.stopPropagation();
    this.myresult.nativeElement.style.display = 'block';
  }

  onMouseMove(e) {
    var pos, x, y;
    /*prevent any other actions that may occur when moving over the image:*/
    e.preventDefault();
    e.stopPropagation();
    /*get the cursor's x and y positions:*/
    pos = this.getCursorPos(e);
    /*calculate the position of the lens:*/
    x = pos.x - (this.lens.nativeElement.offsetWidth / 2);
    y = pos.y - (this.lens.nativeElement.offsetHeight / 2);
    /*prevent the lens from being positioned outside the image:*/
    if (x > this.image.nativeElement.width - this.lens.nativeElement.offsetWidth) { x = this.image.nativeElement.width - this.lens.nativeElement.offsetWidth; }
    if (x < 0) { x = 0; }
    if (y > this.image.nativeElement.height - this.lens.nativeElement.offsetHeight) { y = this.image.nativeElement.height - this.lens.nativeElement.offsetHeight; }
    if (y < 0) { y = 0; }
    /*set the position of the lens:*/
    this.lens.nativeElement.style.left = x + "px";
    this.lens.nativeElement.style.top = y + "px";
    /*display what the lens "sees":*/
    this.myresult.nativeElement.style.backgroundPosition = "-" + (x * this.cx) + "px -" + (y * this.cy) + "px";
  }

  getCursorPos(e) {
    var a, x = 0, y = 0;
    e = e || window.event;
    /*get the x and y positions of the image:*/
    a = this.image.nativeElement.getBoundingClientRect();
    /*calculate the cursor's x and y coordinates, relative to the image:*/
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /*consider any page scrolling:*/
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }

}
