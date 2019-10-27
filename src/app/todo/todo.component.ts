import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

const GET_TODOS = gql`
  subscription getTodos($user_id: Int!) {
    todos(where: {id_user: {_eq: $user_id}}) {
      id
      text
    }
  }
`;

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  loading = true;
  todos: [];

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo
      .subscribe({
        query: GET_TODOS,
        variables: {
          user_id: 1
        }
      })
      .subscribe(({ data }: any) => {
        this.todos = data.todos;
        this.loading = false;
      });
  }
}
