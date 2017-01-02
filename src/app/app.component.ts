import { Component } from '@angular/core';

import {
  createStore,
  Store,
  compose,
  StoreEnhancer
} from 'redux';
import { AppStore } from './app-store';
import {
  AppState,
  default as reducer
} from './reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
}
