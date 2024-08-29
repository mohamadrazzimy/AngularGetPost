import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Fixed the property name
})
export class AppComponent implements OnInit {
  title = 'my-angular-project';
  posts: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.http.get<any>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(data => {
        this.posts = data;
      }, error => {
        console.error('Error fetching posts:', error);
      });
  }

  createPost() {
    const postData = {
      title: 'foo',
      body: 'bar',
      userId: 1
    };

    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    });

    this.http.post('https://jsonplaceholder.typicode.com/posts', postData, { headers })
      .subscribe(response => {
        console.log('Post created:', response);
        this.fetchPosts(); // Fetch posts again to include the new post
      }, error => {
        console.error('Error creating post:', error);
      });
  }
}