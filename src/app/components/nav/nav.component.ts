import { finalize, Observable } from 'rxjs';
import { dateRangeValidation } from 'src/app/validators/date-range.validator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { CotationResponse, CurrencyCotationService } from 'src/app/services/currency-cotation.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  currencies = [
    { id: 'AUD', text: 'Dólar Australiano' },
    { id: 'CAD', text: 'Dólar Canadense' },
    { id: 'EUR', text: 'Euro' },
    { id: 'USD', text: 'Dólar Estadunidense' }
  ]
  loading = false;
  formulario: FormGroup;

  data$!: CotationResponse[]

  constructor(private formBuilder: FormBuilder, private service: CurrencyCotationService) {
    this.formulario = this.formBuilder.group({
      currency: ['USD', [Validators.required]],
      initialDate: ['', [Validators.required]],
      finalDate: ['', [Validators.required]]
    }, { validators: dateRangeValidation })
  }

  ngOnInit(): void {
  }

  handleSubmit() {
    this.loading = true;
    const { currency, initialDate, finalDate } = this.formulario.value;
    this.service.getCurrencyCotation(currency, initialDate, finalDate)
      .pipe(finalize(() => {
        this.loading = false
      }))
      .subscribe((data) => {
        this.data$ = data
      })
      ;
  }
}
