declare module "react-canvas-draw" {
    import React from "react";
  
    interface CanvasDrawProps {
      brushColor?: string;
      brushRadius?: number;
      lazyRadius?: number;
      canvasWidth?:number;
      canvasHeight?:number;
      style?:any;
    }
  
    class CanvasDraw extends React.Component<CanvasDrawProps> {
      canvasContainer: any;
      clear(): void;
      undo(): void;
      exportPaths(): any; // Add the missing method
      loadPaths(paths: any): void;
    }
  
    export default CanvasDraw;
  }
  