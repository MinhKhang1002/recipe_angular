import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from '../Model/Ingredient.model';
import { ShoppingListService } from './shopping.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients!: Ingredient[];
  isEdit: boolean = false;

  editedItem!: Ingredient;
  ingredientForm!: FormGroup;
  id!: number;
  constructor(
    private shoppingService: ShoppingListService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.initForm();
  }
  initForm() {
    this.ingredientForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.isEdit) {
      this.shoppingService.updateIngredient(this.id, this.ingredientForm.value);
      this.ingredientForm.reset();
      this.isEdit = false;
    } else {
      this.shoppingService.addIngredient(this.ingredientForm.value);
      this.ingredientForm.reset();
    }
  }

  Delete() {
    this.shoppingService.deleteIngredient(this.id);
  }

  editItem(index: number) {
    this.id = index;
    this.isEdit = true;
    const recipe = this.shoppingService.getIngredient(this.id);
    const name = recipe.name;
    const amount = recipe.amount;

    this.ingredientForm = this.fb.group({
      name: [name, Validators.required],
      amount: [amount, Validators.required],
    });
  }
}
