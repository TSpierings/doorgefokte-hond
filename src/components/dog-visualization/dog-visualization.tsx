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
    { x: 0, y: 0 },
    { x: 455, y: 350 },
    { x: 650, y: 650 },
    { x: 2275, y: 455 }
  ];
  private drawOrder = [0, 2, 3, 1];

  constructor(props: any) {
    super(props);

    this.canvasRef = React.createRef();
  }

  private async drawCanvas() {
    const canvas = this.canvasRef.current as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

    const images = this.drawOrder.map(item => {
      const part = partsByPhase[item];
      return new Promise(resolve => {
        const partImage = new Image();
        partImage.src = part[this.props.selectedParts[item]]
        partImage.onload = () => resolve(partImage);
      });
    });

    const loadedImages = await Promise.all(images);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.drawOrder.forEach((item, index) => {
      const image = loadedImages[index]
      const coords = this.locationsByPhase[item];
      ctx.filter = this.props.phase === item ? 'contrast(0.8) brightness(1.2)' : 'contrast(1) brightness(1)';
      ctx.drawImage(image as CanvasImageSource, 800 + coords.x, 250 + coords.y);
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
