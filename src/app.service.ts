import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Data } from "./aneelData";
import { Workbook } from "exceljs";
import { readFile } from 'fs';


@Injectable()
export class AppService {
  constructor(private httpService: HttpService, private aneelData: Data) {}

  async callAneel(numOfItems,offset) {
    const aneelData = [];

    try {
      var aneelAnswer = await lastValueFrom(this.httpService.get(`https://dadosabertos.aneel.gov.br/api/3/action/datastore_search?resource_id=b1bd71e7-d0ad-4214-9053-cbd58e9564a7&limit=${numOfItems}&offset=${offset}`));
    }
    catch(error)
    {
      return;
    }
    
    for(let i = 0; i<aneelAnswer.data.result.records.length; i++) {
      aneelData.push(aneelAnswer.data.result.records[i]);
    }

    return aneelData;
  }

  adjustingApiData(dataObject,position) {
    const adjustedData = [
      dataObject[position]._id,
      dataObject[position].DatGeracaoConjuntoDados,
      dataObject[position].AnmPeriodoReferencia,
      dataObject[position].NumCNPJDistribuidora,
      dataObject[position].SigAgente,
      dataObject[position].NomAgente,
      dataObject[position].CodClasseConsumo,
      dataObject[position].DscClasseConsumo,
      dataObject[position].CodSubGrupoTarifario,
      dataObject[position].DscSubGrupoTarifario,
      dataObject[position].codUFibge,
      dataObject[position].SigUF,
      dataObject[position].codRegiao,
      dataObject[position].NomRegiao,
      dataObject[position].CodMunicipioIbge,
      dataObject[position].NomMunicipio,
      dataObject[position].CodCEP,
      dataObject[position].SigTipoConsumidor,
      dataObject[position].NumCPFCNPJ,
      dataObject[position].NomeTitularEmpreendimento,
      dataObject[position].CodEmpreendimento,
      dataObject[position].DthAtualizaCadastralEmpreend,
      dataObject[position].SigModalidadeEmpreendimento,
      dataObject[position].DscModalidadeHabilitado,
      dataObject[position].QtdUCRecebeCredito,
      dataObject[position].SigTipoConsumidor,
      dataObject[position].DscFonteGeracao,
      dataObject[position].DscPorte,
      dataObject[position].MdaPotenciaInstaladaKW,
      dataObject[position].NumCoordNEmpreendimento,
      dataObject[position].NumCoordEEmpreendimento,
      dataObject[position].NomSubEstacao,
      dataObject[position].NumCoordESub,
      dataObject[position].NumCoordNSub,
      dataObject[position].rank
    ];

    return adjustedData;
  }

  adjustData (dataObject,position) {
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

  buildDataObject(dataObject) {
    let dataToExcel = [];

    for(let i = 0; i<dataObject.length; i++) {
      dataToExcel.push(this.adjustingApiData(dataObject,i));
    }

    return dataToExcel;
  }

  async saveInExcel(dataObject, offsetValue = 0) {
    const excelFileLocal = 'src/files/DadosAneel.xlsx';

    const workbook = new Workbook();
    await workbook.xlsx.readFile(excelFileLocal);

    const workSheet = await workbook.getWorksheet('Plan1');

    for(let i = 0; i<dataObject.length; i++) {
      workSheet.getRow(i+2 + offsetValue).values = dataObject[i];
    }

    await workbook.xlsx.writeFile(excelFileLocal);
    return;
  }

  //Resolveria, em tese o problema de estourar o heap, ao salvar em blocos de 10k, precisa ainda de ajustes na função de salvamento do Excel
  async GetAllData(maxValuePerIteration) {
    let offset = 0;
    let stopCondition = true;
    
    while(stopCondition) {
      let aneelDataFromApi = await this.callAneel(maxValuePerIteration,offset);
      
      let aneelDataAdjusted = this.buildDataObject(aneelDataFromApi);

      await this.saveInExcel(aneelDataAdjusted, offset);

      if(maxValuePerIteration>aneelDataAdjusted.length) {
        stopCondition = false;
      } else {
        console.log("A total of " + (offset + maxValuePerIteration) + " items retrieved!");
        offset = offset + maxValuePerIteration;
      }      
    }

    return;
  }
  
  async getData() {

    await this.GetAllData(10000);

    //Return success
    return "Success";
  }
}
