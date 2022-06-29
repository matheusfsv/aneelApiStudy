import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Data } from "./aneelData";


@Injectable()
export class AppService {
  constructor(private httpService: HttpService, private aneelData: Data) {}

  async callAneel() {
    let city_searched = 'Teresina';
    let state_searched = 'PI';
    let energy_provider = 'Equatorial+PI';
    let init_date = '2021';
    let id = 1;
    //let user_name = 'Metropolitan';

    //With user name
    //let aneelAnswer = await lastValueFrom(this.httpService.get(`https://dadosabertos.aneel.gov.br/api/3/action/datastore_search?resource_id=b1bd71e7-d0ad-4214-9053-cbd58e9564a7&q=${city_searched}&q=${state_searched}&q=${energy_provider}&q=${init_date}&q=${user_name}`));
    //Without user name
    let aneelAnswer = await lastValueFrom(this.httpService.get(`https://dadosabertos.aneel.gov.br/api/3/action/datastore_search?resource_id=b1bd71e7-d0ad-4214-9053-cbd58e9564a7&q=${city_searched}&q=${state_searched}&q=${energy_provider}&q=${init_date}`));
    //let aneelAnswer = await lastValueFrom(this.httpService.get(`https://dadosabertos.aneel.gov.br/api/3/action/datastore_search?resource_id=b1bd71e7-d0ad-4214-9053-cbd58e9564a7&q=${id}`));
    //let aneelAnswer = await lastValueFrom(this.httpService.get(`https://dadosabertos.aneel.gov.br/api/3/action/datastore_search?resource_id=b1bd71e7-d0ad-4214-9053-cbd58e9564a7`));
    return aneelAnswer.data.result.records;
  }

  dataToAdjust (dataObject,position) {
    const adjustedData = {
      "_id": dataObject[position][0],
      "DatGeracaoConjuntoDados":  dataObject[position][1],
      "AnmPeriodoReferencia":  dataObject[position][2],
      "NumCNPJDistribuidora":  dataObject[position][3],
      "SigAgente":  dataObject[position][4],
      "NomAgente":  dataObject[position][5],
      "CodClasseConsumo":  dataObject[position][6],
      "DscClasseConsumo":  dataObject[position][7],
      "CodSubGrupoTarifario":  dataObject[position][8],
      "DscSubGrupoTarifario":  dataObject[position][9],
      "codUFibge":  dataObject[position][10],
      "SigUF":  dataObject[position][11],
      "codRegiao":  dataObject[position][12],
      "NomRegiao":  dataObject[position][13],
      "CodMunicipioIbge":  dataObject[position][14],
      "NomMunicipio":  dataObject[position][15],
      "CodCEP":  dataObject[position][16],
      "SigTipoConsumidor":  dataObject[position][17],
      "NumCPFCNPJ":  dataObject[position][18],
      "NomeTitularEmpreendimento":  dataObject[position][19],
      "CodEmpreendimento":  dataObject[position][20],
      "DthAtualizaCadastralEmpreend":  dataObject[position][21],
      "SigModalidadeEmpreendimento":  dataObject[position][22],
      "DscModalidadeHabilitado":  dataObject[position][23],
      "QtdUCRecebeCredito":  dataObject[position][24],
      "SigTipoGeracao":  dataObject[position][25],
      "DscFonteGeracao":  dataObject[position][26],
      "DscPorte":  dataObject[position][27],
      "MdaPotenciaInstaladaKW": dataObject[position][28],
      "NumCoordNEmpreendimento":  dataObject[position][29],
      "NumCoordEEmpreendimento":  dataObject[position][30],
      "NomSubEstacao":  dataObject[position][31],
      "NumCoordESub":  dataObject[position][32],
      "NumCoordNSub":  dataObject[position][33],
      "rank":  dataObject[position][34]
    }

    return adjustedData;
  }
  
  async getHello() {
    let dataIWillWork = await this.aneelData.data();//await this.callAneel();
    let result = this.dataToAdjust(dataIWillWork,0);
    //console.log(aneelAnswer.length);

    return result;
  }
}
