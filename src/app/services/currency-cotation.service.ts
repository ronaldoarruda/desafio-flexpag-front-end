import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import  * as moment from 'moment';
import { map, Observable } from 'rxjs';

export interface CotationResponse {
  cotacaoCompra: number;
  cotacaoVenda: number;
  dataHoraCotacao: string;
}

interface FullCotationResponse {
  value: CotationResponse[]
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyCotationService {

  constructor(private http: HttpClient) { }

  public getCurrencyCotation(currency: string, initialDate: string, finalDate: string): Observable<CotationResponse[]> {
    const initialDateFormated = moment(initialDate, 'YYYY-MM-DD').format('MM-DD-YYYY')
    const finalDateFormated = moment(finalDate, 'YYYY-MM-DD').format('MM-DD-YYYY')

    return this.http.get<FullCotationResponse>(`https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoMoedaPeriodo(moeda=@moeda,dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?@moeda=%27${currency}%27&@dataInicial=%27${initialDateFormated}%27&@dataFinalCotacao=%27${finalDateFormated}%27&$top=1000&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao`).pipe(map(data => data.value))
  }
}
