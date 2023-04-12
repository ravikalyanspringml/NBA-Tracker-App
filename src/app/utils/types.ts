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
  results: IResults;
}

export interface IDateID {
  date: string[];
  id: string;
}

export interface IResultScores {
  homeTeam: string;
  visitorTeam: string;
  homeTeamScore: string;
  visitorTeamScore: string;
}

export interface IResults {
  homeTeam: string[];
  visitorTeam: string[];
  homeTeamScore: string[];
  visitorTeamScore: string[];
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

export interface IGamesDetails {
  data: IGame[];
  meta: IMeta;
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

export interface IMeta {
  current_page: number;
  next_page: number | null;
  per_page: number;
  total_count: number;
  total_pages: number;
}

export interface TeamResponse {
  data: ITeamsList[];
  meta: IMeta;
}
