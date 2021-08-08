import * as React from 'react';
import { partsByPhase } from '../../interfaces/phases';
import { bodyRisks, furRisks, headRisks, legsRisks } from '../../interfaces/risks';
import { DogVisualization } from '../dog-visualization/dog-visualization';
import { Knob } from './knob';
import './printout.scss';

interface PrintoutProps {
  name: string,
  selectedParts: Array<number>
}

export class Printout extends React.Component<PrintoutProps, {}> {

  private healthColors = [
    '#B1CD98',
    '#DDE298',
    '#F6EDA8',
    '#EACDA3',
    '#D68A7B'
  ];

  private getHealthText(health: number) {
    switch (health) {
      case 5:
        return (<>
          <span>Kijk uit!</span>
          <span>{this.props.name} bestaat 100% uit hetzelfde ras. Dit betekent dat {this.props.name} extreem veel risico loopt op erfelijke aandoeningen. Arme {this.props.name}... Je hond sterft van de pijn.</span>
        </>)
      case 4:
        return (<>
          <span>Jammer...</span>
          <span>{this.props.name} bestaat 80% uit hetzelfde ras. Dit betekent dat {this.props.name} veel risico loopt op erfelijke aandoeningen. Arme {this.props.name}... Bereid je hond maar voor op zware behandelingen bij de dierenarts.</span>
        </>)
      case 3:
        return (<>
          <span>Kan gezonder...</span>
          <span>{this.props.name} bestaat 60% uit hetzelfde ras. Dit betekent dat {this.props.name} matig risico loopt op erfelijke aandoeningen. Laat {this.props.name} regelmatig door de dierenarts controleren op erfelijke aandoeningen.</span>
        </>)
      case 2:
        return (<>
          <span>Goed op weg.</span>
          <span>{this.props.name} bestaat 40% uit hetzelfde ras. Dit betekent dat {this.props.name} weinig risico loopt op erfelijke aandoeningen. Het is aan te raden om je hond te laten testen bij de dierenarts, want kans op aandoeningen is helaas altijd aanwezig.</span>
        </>)
      case 1:
        return (<>
          <span>Gefeliciteerd!</span>
          <span>{this.props.name} bestaat 20% uit hetzelfde ras. Dit betekent dat {this.props.name} nauwelijks risico loopt op erfelijke aandoeningen. {this.props.name} is gezond! Maar houd de gezondheid van je hond goed in de gaten, want kans op aandoeningen is helaas altijd aanwezig.</span>
        </>)
    }
  }

  private getSecondaryText(health: number) {
    if (health <= 2) {
      return <span>
        Ben jij een echte hondenliefhebber? Kies dan niet voor een rashond. Rashonden mogen er
        dan schattig uitzien, maar daardoor hebben ze veel pijn. Mensen fokken rashonden namelijk
        op uiterlijke kenmerken zoals een korte snuit, overdreven korte poten en huidplooien.
        Dit leidt tot pijnlijke aandoeningen. Gelukkig bestaat jouw hond 50% of minder uit hetzelfde ras.
        Door de verschillende genen wordt de kans op aandoeningen kleiner.
      </span>
    }

    return <span>
      Ben jij een echte hondenliefhebber? Kies dan niet voor een rashond. Rashonden mogen er dan schattig uitzien,
      maar daardoor hebben ze veel pijn. Mensen fokken rashonden namelijk op uiterlijke kenmerken zoals een korte snuit,
      overdreven korte poten en huidplooien. Dit leidt tot pijnlijke aandoeningen.
      Helaas is er een grote kans dat jouw hond hier last van krijgt. Zorg er de volgende keer voor dat je hond 50% of
      minder uit hetzelfde ras bestaat. Door de verschillende genen wordt de kans op aandoeningen kleiner.
      Op deze manier kan jouw hond toch lang en gelukkig leven.
    </span>
  }

  private getPercentage(race: number): number {
    return this.props.selectedParts.filter(part => part === race).length * 20;
  }

  private findOccurences() {
    let counts = [];
    for(let i = 0; i < partsByPhase.length; i++) {
      counts.push(this.props.selectedParts.filter(part => part === i).length);
    }

    return counts.sort().reverse();
  }

  render() {
    const health = this.findOccurences()[0];

    return <div className='printout'>
      <div className='health'>
        {this.getHealthText(health)}
      </div>
      <div className='dog'>
        <div className='creator' style={{ backgroundColor: this.healthColors[health - 1] }}>
          <DogVisualization
            phase={4}
            selectedParts={this.props.selectedParts}
          />
        </div>
        {this.getSecondaryText(health)}
      </div>
      <div className='races'>
        {this.props.selectedParts.map((part, index) => (
          <Knob key={index} percentage={this.getPercentage(index)} type={index} />
        ))}
      </div>

      <div className='page2'>
        <div className='tips'>
          <span>Tips voor de aanschaf van een hond:</span>
          <br /><br />
          <div className='bullet'>
            <span>•</span>
            <span>Kies in plaats van een rashond voor een kruising.</span>
          </div>
          <div className='bullet'>
            <span>•</span>
            <span>Kijk in de Nederlandse asielen voor een leuke hond.</span>
          </div>
          <br /><br />
          <span>Wil je toch een rashond...</span>
          <br /><br />
          <div className='bullet'>
            <span>•</span>
            <span>Kijk van tevoren op www.dierenrecht.nl/ rashondenwijzer welke erfelijke aandoeningen er voorkomen bij het ras.</span>
          </div>
          <div className='bullet'>
            <span>•</span>
            <span>Onthoud dat een stamboom geen garantie is voor een gezonde hond.</span>
          </div>
          <div className='bullet'>
            <span>•</span>
            <span>Vertrouw niet iedere fokker.</span>
          </div>
          <div className='bullet'>
            <span>•</span>
            <span>Laat je vóór de aanschaf adviseren door een deskundige.</span>
          </div>
          <div className='bullet'>
            <span>•</span>
            <span>Lees het koopcontract van tevoren zorgvuldig door.</span>
          </div>

        </div>
        <div className='risks'>
          <img alt='head risks' src={headRisks[this.props.selectedParts[0]]} />
          <img alt='body risks' src={bodyRisks[this.props.selectedParts[1]]} />
          <img alt='leg risks' src={legsRisks[this.props.selectedParts[2]]} />
          <img alt='fur risks' src={furRisks[this.props.selectedParts[4]]} />
        </div>
      </div>
    </div>
  }
}
