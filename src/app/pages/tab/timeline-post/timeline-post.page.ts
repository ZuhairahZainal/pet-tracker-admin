import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DonationPost, Feed, LostPetPost } from 'src/app/models/post/post';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'app-timeline-post',
  templateUrl: './timeline-post.page.html',
  styleUrls: ['./timeline-post.page.scss'],
})
export class TimelinePostPage implements OnInit {

  public segment: string = "newsfeed";
  public feedList: Observable<Feed[]>;
  public lostPetList: Observable<LostPetPost[]>;
  public donationList: Observable<DonationPost[]>;

  userId: any;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.feedList = this.postService.getFeedPost();

    this.lostPetList = this.postService.getLostPetPost();

    this.donationList = this.postService.getDonationPost();

  }

  segmentChanged(ev: any) {
    this.segment = ev.detail.value;
  }

}
