import * as React from 'react';
import { partsByPhase, offsetsByPhase } from '../../interfaces/phases';
import { bodyPositions } from '../../interfaces/bodies';
import './dog-visualization.scss';
import testfur from '../../assets/testfur.png';

interface DogVisualizationProps {
  phase: number,
  selectedParts: Array<number>
}

export class DogVisualization extends React.Component<DogVisualizationProps, {}> {
  private canvasRef: React.RefObject<HTMLCanvasElement>;
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

    
    const fur = new Image();
    fur.src = testfur;

    images.push(Promise.resolve(fur));

    const loadedImages = await Promise.all(images);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    this.drawOrder.forEach((item, index) => {
      const image = loadedImages[index]
      const positions = bodyPositions[this.props.selectedParts[1]];

      let offset = item === 1 ? positions[1] : {
        x: positions[1].x + positions[item].x - offsetsByPhase[item][this.props.selectedParts[item]].x,
        y: positions[1].y + positions[item].y - offsetsByPhase[item][this.props.selectedParts[item]].y
      };

      ctx.filter = this.props.phase === item ? 'contrast(0.8) brightness(1.2)' : 'contrast(1) brightness(1)';
      ctx.drawImage(image as CanvasImageSource, 800 + offset.x, 400 + offset.y);
    });
    ctx.save();

    ctx.filter = 'contrast(1) brightness(1)';
    ctx.globalCompositeOperation = 'source-in';
    ctx.drawImage(fur, 0, 0);

    ctx.restore();
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
