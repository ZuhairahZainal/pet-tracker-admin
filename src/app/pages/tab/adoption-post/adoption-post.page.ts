import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adoption-post',
  templateUrl: './adoption-post.page.html',
  styleUrls: ['./adoption-post.page.scss'],
})
export class AdoptionPostPage implements OnInit {

  public segment: string = "approve";

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }
}
