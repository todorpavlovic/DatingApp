import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private route:ActivatedRoute ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.getImages();
    console.log(this.getImages());
}

  getImages() {
    const imageUrls = [];

    for(let i = 0; i < this.user.photos.length; i++) {
      imageUrls.push(this.user.photos[i])
    }
    return imageUrls;
  }

}
