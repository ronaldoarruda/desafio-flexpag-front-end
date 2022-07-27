import { dateRangeValidation } from './../../validators/dateRangeValidators';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  formulario: FormGroup;

  currencies = [
    { id:'AUD', text:'Dólar Australiano' },
    { id:'CAD', text:'Dólar Canadense' },
    { id:'EUR', text:'Euro' },
    { id:'USD', text:'Dólar Estadunidense'}
  ]

  show() {

  }

  constructor(private formBuilder: FormBuilder) {
    this.formulario = this.formBuilder.group({
      currency: ['USD', [Validators.required]],
      initialDate: ['', [Validators.required]],
      finalDate: ['', [Validators.required]]
    }, { validators: dateRangeValidation })
  }

  ngOnInit(): void {
    this.formulario.valueChanges.subscribe(e => console.log(this.formulario))
  }

}
