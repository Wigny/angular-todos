import { Component, OnInit } from '@angular/core';
import gql from 'graphql-tag';
import { Apollo } from 'apollo-angular';

const GET_MY_TODOS = gql`
  query getTodos {
    todos(where: {id_user: {_eq: 1}}, order_by: {createdAt: desc}) {
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

  loading: boolean = true;
  todos: [];
  filteredTodos: any;

  constructor(private apollo: Apollo) {

  }

  ngOnInit() {
    this.apollo.watchQuery<any>({
      query: GET_MY_TODOS
    })
      .valueChanges
      .subscribe(({ data, loading }) => {
        this.loading = loading;
        this.todos = data.todos;
        console.log(this.todos)
        this.filteredTodos = this.todos;
      });
  }



}
