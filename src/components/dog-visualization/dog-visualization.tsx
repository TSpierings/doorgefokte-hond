import { isNull } from 'lodash';
import * as React from 'react';
import { headParts } from '../../interfaces/heads';
import { partsByPhase } from '../../interfaces/phases';
import './dog-visualization.scss';

interface DogVisualizationProps {
  phase: number,
  selectedParts: Array<number>
}

export class DogVisualization extends React.Component<DogVisualizationProps, {}> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
  private locationsByPhase = [
    {x: 0, y: 0},
    {x: 455, y: 350},
    {x: 650, y: 650},
    {x: 2275, y: 455}
  ];

  constructor(props: any) {
    super(props);

    this.canvasRef = React.createRef();
  }

  private async drawCanvas() {
    const canvas = this.canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const images = partsByPhase.map((part, index) => {
      return new Promise(resolve => {
        const partImage = new Image();
        partImage.src = part[this.props.selectedParts[index]]
        partImage.onload = () => resolve(partImage);
      });
    });

    const foo = await Promise.all(images);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    foo.forEach((item, index) => {
      const coords = this.locationsByPhase[index];
      ctx.drawImage(item as CanvasImageSource, 800 + coords.x, 250 + coords.y);
    });
  }

  componentDidMount() {
    this.drawCanvas();
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  render() {
    return <div className="dog-visualization">
      <canvas ref={this.canvasRef} width={4800} height={2400} />
    </div>
  }
}
