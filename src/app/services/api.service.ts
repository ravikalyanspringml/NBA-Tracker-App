import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';
import { IDateID, IGamesDetails, TeamResponse } from '../utils/types';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    'X-RapidAPI-Key': environment.KEY,
    'X-RapidAPI-Host': environment.HOST,
  });

  teamList(): Observable<TeamResponse> {
    return this.http.get<TeamResponse>(`${environment.BASE_URL}/teams`, {
      headers: this.header,
    });
  }

  lastGames(data: IDateID): Observable<IGamesDetails> {
    let Params: HttpParams = new HttpParams();
    data.date.forEach((date: string) => {
      Params = Params.append('dates[]', date);
    });
    Params = Params.append('team_ids[]', data.id);
    return this.http.get<IGamesDetails>(`${environment.BASE_URL}/games`, {
      headers: this.header,
      params: Params,
    });
  }
}
