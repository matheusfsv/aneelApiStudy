import { HttpService } from '@nestjs/axios';
import { Injectable, ParseArrayPipe } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async callAneel() {
    let aneelAnswer = await lastValueFrom(this.httpService.get('https://dadosabertos.aneel.gov.br/api/3/action/datastore_search?resource_id=b1bd71e7-d0ad-4214-9053-cbd58e9564a7&q=jones'));
    //let aneelAnswerSolved = new Promise(aneelAnswer);
    return aneelAnswer.data.result.records;
  }
  
  async getHello() {
    let aneelAnswer = await this.callAneel();
    let result = 'The query result is: ' + aneelAnswer[0]._id;
    console.log(aneelAnswer[3]);
    
    

    return result;
  }
}
