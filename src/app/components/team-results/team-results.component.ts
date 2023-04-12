import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IResultScores, ICardDetails } from 'src/app/utils/types';

@Component({
  selector: 'app-team-results',
  templateUrl: './team-results.component.html',
  styleUrls: ['./team-results.component.css'],
})
export class TeamResultsComponent implements OnInit {
  resultScores: IResultScores[] = [];
  cardDetails: ICardDetails = {
    name: '',
    abbreviation: '',
    conference: '',
    results: {
      homeTeam: [],
      visitorTeam: [],
      homeTeamScore: [],
      visitorTeamScore: [],
    },
    avgTeamConceded: 0,
    avgTeamScored: 0,
    id: 0,
    winOrLoss: [],
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    let result: ICardDetails[] = JSON.parse(sessionStorage.getItem('result')!);
    let response: ICardDetails[] = result.filter((element: ICardDetails) => {
      return element.id == Number(this.route.snapshot.paramMap.get('teamCode'));
    });
    this.cardDetails = response[0];
    this.gameResults();
  }

  gameResults(): void {
    for (let i = 0; i < this.cardDetails.results.homeTeam.length; i++) {
      let temp: IResultScores = {
        homeTeam: '',
        visitorTeam: '',
        homeTeamScore: '',
        visitorTeamScore: '',
      };
      temp['homeTeam'] = this.cardDetails.results.homeTeam[i];
      temp['visitorTeam'] = this.cardDetails.results.visitorTeam[i];
      temp['homeTeamScore'] = this.cardDetails.results.homeTeamScore[i];
      temp['visitorTeamScore'] = this.cardDetails.results.visitorTeamScore[i];
      this.resultScores.push(temp);
    }
  }
}
