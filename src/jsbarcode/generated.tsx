/*import JsBarcode from "jsbarcode";
import { useEffect, useRef, useState } from "react";

type BarCodeTypes = {
    code: string;
    largura: number;
    altura: number;
    quantidade: number;
    text: boolean;
}

const Bargenerator = ({code, largura, altura, quantidade, text} : BarCodeTypes) => {
    const canvasRef = useRef(null);

    const [generatedCodes, setGeneratedCodes] = useState<string[]>([]);

    useEffect(() => {
        if (canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');

          // Limpar o canvas
          ctx.clearRect(0, 0, canvas.width, canvas.height); 

          // Calcular largura total do canvas
          canvas.width = largura * quantidade; 
          canvas.height = altura;

          // Gerar códigos de barras com valores incrementados
          const newCodes = [];
          for (let i = 0; i < quantidade; i++) {
            const newCode = `${code}-${i+1}`; // Exemplo de incrementação
            newCodes.push(newCode); 
            JsBarcode(canvas, newCode, { 
              format: 'CODE128', 
              width: largura, 
              height: altura, 
              x: i * largura, 
              y: 0, 
              displayValue: text 
            });
          }

          setGeneratedCodes(newCodes); 

        }
    }, [code, largura, altura, quantidade, text]); 

  return <canvas ref={canvasRef} />;
}

export default Bargenerator;*/