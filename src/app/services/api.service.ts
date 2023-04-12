import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

export interface ITeamsList {
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  id: string;
  name: string;
}

export interface ICardsList {
  avgTeamScored: number;
  avgTeamConceded: number;
  winOrLoss: Array<string>;
  name: string;
  conference: string;
  abbreviation: string;
  id: string;
  results: Object;
}

export interface IDateID {
  date: string[];
  id: string;
}

export interface IResultScores {
  homeTeam: string;
  visitorTeam: string;
  homeTeamScore: number;
  visitorTeamScore: number;
}

export interface IResults {
  homeTeam: string[];
  visitorTeam: string[];
  homeTeamScore: number[];
  visitorTeamScore: number[];
}

export interface ICardDetails {
  name: string;
  abbreviation: string;
  conference: string;
  results: IResults;
  avgTeamConceded: number;
  avgTeamScored: number;
  id: number;
  winOrLoss: string[];
}

export interface IGame {
  id: number;
  date: string;
  home_team: IVisitorOrHomeTeam;
  home_team_score: string;
  visitor_team: IVisitorOrHomeTeam;
  visitor_team_score: string;
  season: number;
  period: number;
  postseason: boolean;
  status: string;
  time: string;
}

export interface IVisitorOrHomeTeam {
  id: string;
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  constructor(private http: HttpClient) {}

  header = new HttpHeaders({
    'X-RapidAPI-Key': environment.KEY,
    'X-RapidAPI-Host': environment.HOST,
  });

  teamList():Observable<Object>{
    return this.http.get(`${environment.BASE_URL}/teams`, {
      headers: this.header,
    });
  }

  lastGames(data: IDateID):Observable<Object>{
    let Params: HttpParams = new HttpParams();
    data.date.forEach((date: string) => {
      Params = Params.append('dates[]', date);
    });
    Params = Params.append('team_ids[]', data.id);
    return this.http.get(`${environment.BASE_URL}/games`, {
      headers: this.header,
      params: Params,
    });
  }
}
