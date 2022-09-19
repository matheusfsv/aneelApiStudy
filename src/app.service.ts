import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { Workbook } from "exceljs";


@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async callAneel(numOfItems,offset,sigUF,city) {
    const aneelData = [];
    let url = 'https://dadosabertos.aneel.gov.br/api/3/action/datastore_search';
    let aneelAnswer = undefined;

    try {
      aneelAnswer = await lastValueFrom(this.httpService.get(url, {
        params: {
          resource_id: 'b1bd71e7-d0ad-4214-9053-cbd58e9564a7',
          limit: numOfItems,
          offset: offset,
          q: `{"SigUF":"${sigUF}","NomMunicipio":"${city}","DscFonteGeracao":"Radiação solar"}`
          //q: `{"NomMunicipio":"${city}","DscFonteGeracao":"Radiação solar"}` //API bug exception
        }
      }));
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

  citiesReference() {
    return [
      {
        cityName: "Teresina",
        cityUF: "PI",
        fileLocation: 'src/files/cities/Teresina.xlsx'
      },
      {
        cityName: "Fortaleza",
        cityUF: "CE",
        fileLocation: 'src/files/cities/Fortaleza.xlsx'
      },
      {
        cityName: "São Paulo",
        cityUF: "SP",
        fileLocation: 'src/files/cities/SãoPaulo.xlsx'
      },
      {
        cityName: "Rio de Janeiro",
        cityUF: "RJ",
        fileLocation: 'src/files/cities/RioDeJaneiro.xlsx'
      },
      {
        cityName: "Brasília",
        cityUF: "DF",
        fileLocation: 'src/files/cities/Brasília.xlsx'
      },
      {
        cityName: "Salvador",
        cityUF: "BA",
        fileLocation: 'src/files/cities/Salvador.xlsx'
      },
      {
        cityName: "Belo Horizonte",
        cityUF: "MG",
        fileLocation: 'src/files/cities/BeloHorizonte.xlsx'
      },
      {
        cityName: "Manaus",
        cityUF: "AM",
        fileLocation: 'src/files/cities/Manaus.xlsx'
      },
      {
        cityName: "Curitiba",
        cityUF: "PR",
        fileLocation: 'src/files/cities/Curitiba.xlsx'
      },
      {
        cityName: "Recife",
        cityUF: "PE",
        fileLocation: 'src/files/cities/Recife.xlsx'
      },
      {
        cityName: "Goiânia",
        cityUF: "GO",
        fileLocation: 'src/files/cities/Goiânia.xlsx'
      },
      {
        cityName: "Belém",
        cityUF: "PA",
        fileLocation: 'src/files/cities/Belém.xlsx'
      },
      {
        cityName: "Porto Alegre",
        cityUF: "RS",
        fileLocation: 'src/files/cities/PortoAlegre.xlsx'
      },
      {
        cityName: "Guarulhos",
        cityUF: "SP",
        fileLocation: 'src/files/cities/Guarulhos.xlsx'
      },
      {
        cityName: "Campinas",
        cityUF: "SP",
        fileLocation: 'src/files/cities/Campinas.xlsx'
      },
      {
        cityName: "São Luís",
        cityUF: "MA",
        fileLocation: 'src/files/cities/SãoLuís.xlsx'
      },
      {
        cityName: "São Gonçalo",
        cityUF: "RJ",
        fileLocation: 'src/files/cities/SãoGonçalo.xlsx'
      },
      {
        cityName: "Maceió",
        cityUF: "AL",
        fileLocation: 'src/files/cities/Maceió.xlsx'
      },
      {
        cityName: "Duque de Caxias",
        cityUF: "RJ",
        fileLocation: 'src/files/cities/DuqueDeCaxias.xlsx'
      },
      {
        cityName: "Campo Grande",
        cityUF: "MS",
        fileLocation: 'src/files/cities/CampoGrande.xlsx'
      },
      {
        cityName: "Natal",
        cityUF: "RN",
        fileLocation: 'src/files/cities/Natal.xlsx'
      },
      {
        cityName: "João Pessoa",
        cityUF: "PB",
        fileLocation: 'src/files/cities/JoãoPessoa.xlsx'
      },
      {
        cityName: "Ribeirão Preto",
        cityUF: "SP",
        fileLocation: 'src/files/cities/RibeirãoPreto.xlsx'
      },
      {
        cityName: "Uberlândia",
        cityUF: "MG",
        fileLocation: 'src/files/cities/Uberlândia.xlsx'
      },
      {
        cityName: "Aracaju",
        cityUF: "SE",
        fileLocation: 'src/files/cities/Aracaju.xlsx'
      },
      {
        cityName: "Cuiabá",
        cityUF: "MT",
        fileLocation: 'src/files/cities/Cuiabá.xlsx'
      },
      {
        cityName: "Porto Velho",
        cityUF: "RO",
        fileLocation: 'src/files/cities/PortoVelho.xlsx'
      },
      {
        cityName: "Caxias do Sul",
        cityUF: "RS",
        fileLocation: 'src/files/cities/CaxiasDoSul.xlsx'
      },
      {
        cityName: "Macapá",
        cityUF: "AP",
        fileLocation: 'src/files/cities/Macapá.xlsx'
      },
      {
        cityName: "Florianópolis",
        cityUF: "SC",
        fileLocation: 'src/files/cities/Florianópolis.xlsx'
      },
      {
        cityName: "Boa Vista",
        cityUF: "RR",
        fileLocation: 'src/files/cities/BoaVista.xlsx'
      },
      {
        cityName: "Rio Branco",
        cityUF: "AC",
        fileLocation: 'src/files/cities/RioBranco.xlsx'
      },
      {
        cityName: "Montes Claros",
        cityUF: "MG",
        fileLocation: 'src/files/cities/MontesClaros.xlsx'
      },
      {
        cityName: "Vitória",
        cityUF: "ES",
        fileLocation: 'src/files/cities/Vitória.xlsx'
      },
      {
        cityName: "Petrolina",
        cityUF: "PE",
        fileLocation: 'src/files/cities/Petrolina.xlsx'
      },
      {
        cityName: "Palmas",
        cityUF: "TO",
        fileLocation: 'src/files/cities/Palmas.xlsx'
      },
      {
        cityName: "Mossoró",
        cityUF: "RN",
        fileLocation: 'src/files/cities/Mossoró.xlsx'
      },
      {
        cityName: "Várzea Grande",
        cityUF: "MT",
        fileLocation: 'src/files/cities/VárzeaGrande.xlsx'
      },
      {
        cityName: "Imperatriz",
        cityUF: "MA",
        fileLocation: 'src/files/cities/Imperatriz.xlsx'
      },
      {
        cityName: "Rondonópolis",
        cityUF: "MT",
        fileLocation: 'src/files/cities/Rondonópolis.xlsx'
      },
      {
        cityName: "Dourados",
        cityUF: "MS",
        fileLocation: 'src/files/cities/Dourados.xlsx'
      },
      {
        cityName: "Sinop",
        cityUF: "MT",
        fileLocation: 'src/files/cities/Sinop.xlsx'
      },
      {
        cityName: "Sorriso",
        cityUF: "MT",
        fileLocation: 'src/files/cities/Sorriso.xlsx'
      }
    ];
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

  adjustDataBackToJSON (dataObject,position) {
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

  async saveInExcel(dataObject, filePath, offsetValue = 0) {
    const excelFileLocal = filePath;

    const workbook = new Workbook();
    await workbook.xlsx.readFile(excelFileLocal);

    const workSheet = await workbook.getWorksheet('Plan1');

    for(let i = 0; i<dataObject.length; i++) {
      workSheet.getRow(i+2 + offsetValue).values = dataObject[i];
    }

    await workbook.xlsx.writeFile(excelFileLocal);
    return;
  }

  async GetAllData(maxValuePerIteration) {
    let offset = 0;
    let stopCondition = true;
    let citiesData = this.citiesReference();
    
    for(let i = 0; i<citiesData.length; i++) {
      while(stopCondition) {
        let aneelDataFromApi = await this.callAneel(maxValuePerIteration,offset,citiesData[i].cityUF,citiesData[i].cityName);
        //let aneelDataFromApi = await this.callAneel(maxValuePerIteration,offset,"AM","Manaus"); //API bug exception

        let aneelDataAdjusted = await this.buildDataObject(aneelDataFromApi);
  
        await this.saveInExcel(aneelDataAdjusted,citiesData[i].fileLocation, offset);
        //await this.saveInExcel(aneelDataAdjusted,'src/files/cities/Manaus.xlsx', offset);  //API bug exception
  
        if(maxValuePerIteration>aneelDataAdjusted.length) {
          stopCondition = false;
          console.log("City " + citiesData[i].cityName + " retrieved!");
        } else {
          console.log("City " + citiesData[i].cityName + " retrieved!");
          offset = offset + maxValuePerIteration;
        }      
      }
      offset = 0;
      stopCondition = true;
    }
    

    return;
  }
  
  async getData() {
    await this.GetAllData(30000);

    return "Success";
  }
}
