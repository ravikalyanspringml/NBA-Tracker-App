import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApiService,
  ICardsList,
  IDateID,
  IGame,
  ITeamsList,
} from 'src/app/services/api.service';

@Component({
  selector: 'app-team-selection',
  templateUrl: './team-selection.component.html',
  styleUrls: ['./team-selection.component.css'],
})
export class TeamSelectionComponent implements OnInit {
  teams: ITeamsList[] = [];
  selectedTeam: string = 'Select a team';
  last12Days: string[] = [];
  cardsList: ICardsList[] = [];

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getTeams();
    this.getLast12Days();

    if (sessionStorage.getItem('result') != null) {
      this.cardsList = JSON.parse(sessionStorage.getItem('result')!);
    }
  }

  getTeams(): void {
    this.api.teamList().subscribe((resp: Object) => {
      const TeamDataResponse = resp as { data: ITeamsList[] };
      this.teams = TeamDataResponse.data;
    });
  }

  getLast12Days(): void {
    const todayDate: Date = new Date();
    for (let i = 0; i < 12; i++) {
      const date: Date = new Date(
        todayDate.getFullYear(),
        todayDate.getMonth(),
        todayDate.getDate() - (i - 1)
      );
      const dateString: string = date.toISOString().slice(0, 10);
      this.last12Days.push(dateString);
    }
  }

  trackTeam(): void {
    let data: IDateID = {
      date: this.last12Days,
      id: this.selectedTeam,
    };

    let teamTracked: boolean = false;

    this.cardsList.forEach((element: ICardsList) => {
      if (element.id == data.id) {
        teamTracked = true;
      }
    });

    if (!teamTracked) {
      this.getGameResults(data);
    }
  }

  getGameResults(data: IDateID): void {
    this.api.lastGames(data).subscribe((resp: Object) => {
      let name: string = '';
      let abbreviation: string = '';
      let conference: string = '';
      let visitorTeamScore: string[] = [];
      let visitorTeam: string[] = [];
      let homeTeamScore: string[] = [];
      let homeTeam: string[] = [];
      let id: string = '';
      let tempWinOrLoss: string[] = [];
      let teamScored: number = 0;
      let teamConceded: number = 0;

      const cardDataResponse = resp as { data: IGame[] };

      cardDataResponse.data.forEach((value: IGame) => {
        visitorTeamScore.push(value.visitor_team_score);
        homeTeamScore.push(value.home_team_score);
        homeTeam.push(value.home_team.abbreviation);
        visitorTeam.push(value.visitor_team.abbreviation);

        if (value.home_team.id == this.selectedTeam) {
          name = value.home_team.full_name;
          abbreviation = value.home_team.abbreviation;
          conference = value.home_team.conference;
          id = value.home_team.id;

          teamScored = teamScored + Number(value.home_team_score);
          teamConceded = teamConceded + Number(value.visitor_team_score);

          if (value.home_team_score > value.visitor_team_score) {
            tempWinOrLoss.push('W');
          } else if (value.home_team_score < value.visitor_team_score) {
            tempWinOrLoss.push('L');
          }
        } else {
          name = value.visitor_team.full_name;
          abbreviation = value.visitor_team.abbreviation;
          conference = value.visitor_team.conference;
          id = value.visitor_team.id;

          teamScored = teamScored + Number(value.visitor_team_score);
          teamConceded = teamConceded + Number(value.home_team_score);

          if (value.home_team_score < value.visitor_team_score) {
            tempWinOrLoss.push('W');
          } else if (value.home_team_score > value.visitor_team_score) {
            tempWinOrLoss.push('L');
          } else {
            return;
          }
        }
      });

      this.cardsList.push({
        avgTeamScored: Math.round(teamScored / cardDataResponse.data.length),
        avgTeamConceded: Math.round(
          teamConceded / cardDataResponse.data.length
        ),
        winOrLoss: tempWinOrLoss,
        name: name,
        conference: conference,
        abbreviation: abbreviation,
        id: id,
        results: {
          visitorTeamScore: visitorTeamScore,
          homeTeamScore: homeTeamScore,
          homeTeam: homeTeam,
          visitorTeam: visitorTeam,
        },
      });
    });
  }

  nextPage(cardDetails: ICardsList): void {
    sessionStorage.setItem('result', JSON.stringify(this.cardsList));
    this.router.navigate([`/results/${cardDetails.id}`]);
  }

  removeCard(index: number): void {
    this.cardsList.splice(index, 1);
    sessionStorage.setItem('result', JSON.stringify(this.cardsList));
  }
}
