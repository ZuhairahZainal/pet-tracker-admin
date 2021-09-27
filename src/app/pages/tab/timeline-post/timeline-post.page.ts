import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline-post',
  templateUrl: './timeline-post.page.html',
  styleUrls: ['./timeline-post.page.scss'],
})
export class TimelinePostPage implements OnInit {

  public segment: string = "lostpet";

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

}
