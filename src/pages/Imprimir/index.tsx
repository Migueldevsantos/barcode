import { useEffect, useState } from "react";
import { useCodeBarContext } from "../../contexts/codeBarContext"
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

export default function Imprimir () {
    const { codes } = useCodeBarContext();
    const [ocultar, setOcultar] = useState(false);
    const [colunas, setColunas] = useState("4");
    const to = useNavigate();

    const ToPdf = async () => {
        const doc = new jsPDF(); 
        let x = 10; 
        let y = 10; 
        const colSpacing = 50; 
        const rowSpacing = 30; 
        const maxCols = parseInt(colunas); 
        codes.forEach((codigo, index) => { 
            if ((index + 1) % maxCols === 0) { 
                y += rowSpacing; x = 10; 
            } else { 
                x += colSpacing; 
            } 
            doc.addImage(codigo, "JPEG", x, y, 40, 20); 
        }); 
        doc.save("codigos_de_barras.pdf");
    }

    const Impresso = async () => {
        await setOcultar(true);
        window.print();
    }
    
    window.onafterprint = () => { 
        setOcultar(false); 
    };

    useEffect(() => {
        const load = async () => {
            if(!codes || codes.length <= 0) {
                to("/");
            }
        }
        load();
    }, []);

    return (
        <div className="flex gap-14 pt-16 pl-7"> 
            <div className={`${ocultar ? "hidden" : "flex"} w-[300px] h-60 pt-5 pb-5 border flex-col justify-center gap-5 items-center rounded-md`}>
                <label htmlFor="" className="flex items-center gap-5">
                    <span>Colunas</span>
                    <select 
                        className="w-12 h-10 text-center" 
                        value={colunas} 
                        onChange={(e) => setColunas(e.target.value)}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                    </select>
                </label>
                <button onClick={ToPdf} className="w-32 h-10 bg-red-600 text-white rounded-sm hover:bg-green-700">Baixar pdf</button>
                <button onClick={Impresso} className="w-32 h-10 bg-green-500 text-white rounded-sm hover:bg-green-700">Imprimir</button>
                <button 
                    onClick={() => to("/")} 
                    className="w-32 h-10 bg-orange-500 text-white rounded-sm hover:bg-green-700"
                >
                    Voltar
                </button>
            </div>
            
            <div className={`grid ${colunas === "1" && "grid-cols-1"} ${colunas === "2" && "grid-cols-2"} ${colunas === "3" && "grid-cols-3"} ${colunas === "4" && "grid-cols-4"} ${colunas === "5" && "grid-cols-5"}`}>
                {codes.map((codigo: string, index: number) => ( 
                    <img key={index} src={codigo} alt={`Código de Barras ${index + 1}`} /> 
                ))}
            </div>
        </div>
    )
}