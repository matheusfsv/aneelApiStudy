import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async callAneel() {
    let city_searched = 'Teresina';
    let state_searched = 'PI';
    let energy_provider = 'Equatorial+PI';
    let init_date = '2021';
    let user_name = 'Metropolitan';

    //With user name
    let aneelAnswer = await lastValueFrom(this.httpService.get(`https://dadosabertos.aneel.gov.br/api/3/action/datastore_search?resource_id=b1bd71e7-d0ad-4214-9053-cbd58e9564a7&q=${city_searched}&q=${state_searched}&q=${energy_provider}&q=${init_date}&q=${user_name}`));
    //Without user name
    //let aneelAnswer = await lastValueFrom(this.httpService.get(`https://dadosabertos.aneel.gov.br/api/3/action/datastore_search?resource_id=b1bd71e7-d0ad-4214-9053-cbd58e9564a7&q=${city_searched}&q=${state_searched}&q=${energy_provider}&q=${init_date}`));
    return aneelAnswer.data.result.records;
  }
  
  async getHello() {
    let aneelAnswer = await this.callAneel();
    let result = aneelAnswer;
    console.log(aneelAnswer.length);

    return result;
  }
}
