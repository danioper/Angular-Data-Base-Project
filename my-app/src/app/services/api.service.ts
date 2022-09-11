import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postCampaign(data:any){
    return this.http.post<any>("http://localhost:3000/campaignList/",data)
  }

  getCampaign(){
    return this.http.get<any>("http://localhost:3000/campaignList/");
  }

  updateCampaign(data:any, id: number){
    return this.http.put<any>("http://localhost:3000/campaignList/"+id,data)
  }

  deleteCampaign(id: number){
    return this.http.delete<any>("http://localhost:3000/campaignList/"+id)
  }
}
