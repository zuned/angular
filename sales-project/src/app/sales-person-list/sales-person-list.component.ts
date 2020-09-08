import { Component, OnInit } from '@angular/core';
import {SalesPerson} from './sale-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list.component.html',
  styleUrls: ['./sales-person-list.component.css']
})
export class SalesPersonListComponent implements OnInit {

// create an array of objects
salesPersonList: SalesPerson[] = [
  new SalesPerson("Zuned" , "Ahmed", "za@mailinator.com" , 5000),
  new SalesPerson("Aisha" , "Khan", "ak@mailinator.com" , 4000),
  new SalesPerson("Khadijah" , "Khan", "kk@mailinator.com" , 15000),
  new SalesPerson("Maryam" , "Khan", "mk@mailinator.com" , 25000)
];

  constructor() { }

  ngOnInit(): void {
  }

}
