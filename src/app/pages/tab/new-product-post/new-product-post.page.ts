import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-product-post',
  templateUrl: './new-product-post.page.html',
  styleUrls: ['./new-product-post.page.scss'],
})
export class NewProductPostPage implements OnInit {

  public segment: string = "approve";

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

}
