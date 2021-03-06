import * as React from 'react';
import { partsByPhase, offsetsByPhase } from '../../interfaces/phases';
import { bodyPositions } from '../../interfaces/bodies';
import './dog-visualization.scss';
import { featureOffsets, features, goldenFeatures } from '../../interfaces/features';

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

  private getFeature() {
    if(this.props.selectedParts[0] === 0) {
      return goldenFeatures[this.props.selectedParts[4]];
    }

    return features[this.props.selectedParts[0]];
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
    
    images.push(new Promise(resolve => {
      const partImage = new Image();
      partImage.src = partsByPhase[4][this.props.selectedParts[4]];
      partImage.onload = () => resolve(partImage);
    }));

    images.push(new Promise(resolve => {
      const partImage = new Image();
      partImage.src = this.getFeature();
      partImage.onload = () => resolve(partImage);
    }));

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

    if (this.props.phase === 4) {
      ctx.save();
      
      const fur = loadedImages[4];
  
      ctx.filter = 'contrast(1) brightness(1)';
      ctx.globalCompositeOperation = 'source-in';
      ctx.drawImage(fur as CanvasImageSource, 580, 0);
  
      ctx.restore();
    }
    
    if (this.props.phase >= 4) {
      const feature = new Image();
      feature.src = this.getFeature();
      const featureOffset = featureOffsets[this.props.selectedParts[0]];
      ctx.drawImage(feature as CanvasImageSource, 800 - featureOffset.x, 400 - featureOffset.y);
    }
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
