import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(
    private slService: ShoppingListService,
    private loggingService: LoggingService
  ) {}

  mpup = new Map();
  mpdown = new Map();


  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );

    this.loggingService.printLog('Hello from ShoppingListComponent ngOnInit!');
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  togglelike(sentence : any){

   this.mpup[sentence] = !this.mpup[sentence]
   if(this.mpdown[sentence]==true){
    this.mpdown[sentence] = !this.mpdown[sentence]
   }

  }

  toggledislike(sentence: any){
    this.mpdown[sentence] = !this.mpdown[sentence]
    if(this.mpup[sentence]==true){
      this.mpup[sentence] = !this.mpup[sentence]
    }

  }
 

}
