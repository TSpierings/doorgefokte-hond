import * as React from 'react';
import { DogVisualization } from '../dog-visualization/dog-visualization';
import { Knob } from './knob';
import './printout.scss';

interface PrintoutProps {
  name: string,
  selectedParts: Array<number>
}

export class Printout extends React.Component<PrintoutProps, {}> {

  private healthColors = [
    '#D68A7B',
    '#EACDA3',
    '#F6EDA8',
    '#DDE298',
    '#B1CD98'
  ];

  private getHealthText(health: number) {
    switch (health) {
      case 0:
        return (<>
          <span>Kijk uit!</span>
          <span>{this.props.name} bestaat 100% uit hetzelfde ras. Dit betekent dat {this.props.name} extreem veel risico loopt op erfelijke aandoeningen. Arme {this.props.name}... Je hond sterft van de pijn.</span>
        </>)
      case 1:
        return (<>
          <span>Jammer...</span>
          <span>{this.props.name} bestaat 80% uit hetzelfde ras. Dit betekent dat {this.props.name} veel risico loopt op erfelijke aandoeningen. Arme {this.props.name}... Bereid je hond maar voor op zware behandelingen bij de dierenarts.</span>
        </>)
      case 2:
        return (<>
          <span>Kan gezonder...</span>
          <span>{this.props.name} bestaat 60% uit hetzelfde ras. Dit betekent dat {this.props.name} matig risico loopt op erfelijke aandoeningen. Laat {this.props.name} regelmatig door de dierenarts controleren op erfelijke aandoeningen.</span>
        </>)
      case 3:
        return (<>
          <span>Goed op weg.</span>
          <span>{this.props.name} bestaat 40% uit hetzelfde ras. Dit betekent dat {this.props.name} weinig risico loopt op erfelijke aandoeningen. Het is aan te raden om je hond te laten testen bij de dierenarts, want kans op aandoeningen is helaas altijd aanwezig.</span>
        </>)
      case 4:
        return (<>
          <span>Gefeliciteerd!</span>
          <span>{this.props.name} bestaat 20% uit hetzelfde ras. Dit betekent dat {this.props.name} nauwelijks risico loopt op erfelijke aandoeningen. {this.props.name} is gezond! Maar houd de gezondheid van je hond goed in de gaten, want kans op aandoeningen is helaas altijd aanwezig.</span>
        </>)
    }
  }

  private getSecondaryText(health: number) {
    if (health > 2) {
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

  render() {
    const health: number = 2;
    console.log(this.props.selectedParts)

    return <div className='printout'>
      <div className='health'>
        {this.getHealthText(health)}
      </div>
      <div className='dog'>
        <div className='creator' style={{ backgroundColor: this.healthColors[health] }}>
          <DogVisualization
            phase={4}
            selectedParts={this.props.selectedParts}
          />
        </div>
        {this.getSecondaryText(health)}
      </div>
      <div className='races'>
        <Knob percentage={30} type={0}/>
        <Knob percentage={30} type={1}/>
        <Knob percentage={30} type={2}/>
        <Knob percentage={30} type={3}/>
        <Knob percentage={30} type={4}/>
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
          <br/><br/>
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
        <div className='risks'></div>
      </div>
    </div>
  }
}
