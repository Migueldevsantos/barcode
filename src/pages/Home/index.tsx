import {useState } from "react"
import JsBarcode from "jsbarcode";
import { useCodeBarContext } from "../../contexts/codeBarContext";
import { useNavigate } from "react-router-dom";

export default function Home () {
    const [codebar, setCodebar] = useState("281432");
    const [largura, setlargura] = useState(0.5);
    const [altura, setAltura] = useState(17);
    const [quantidade, setQuantidade] = useState<number>(1);
    const [checkbox, setCheckBox] = useState(true);
    const [codigosDeBarras, setCodigosDeBarras] = useState([]) as any;
    const [type, setType] = useState("CODE128");

    const { setCodes } = useCodeBarContext();
    const to = useNavigate();
    

    const Imprimir = () => {
       gerarCodigoDeBarras();
       to("/codes");

    }

    const toMM = (width: number, height: number) => {
        let mm = 0.264583;

        let newWidth = width / mm;
        let newHeight = height / mm;

        return {width: newWidth, height: newHeight};
    }

    const gerarCodigoDeBarras = () => {
        let novosCodigos = [];

        for (let i = 0; i < quantidade; i++) {
            const img = document.createElement('img');
            JsBarcode(img, codebar, {
                format: type, // padrão = "CODE128",
                displayValue: checkbox, 
                width: toMM(largura, altura).width,
                height: toMM(largura, altura).height,
            });
            novosCodigos.push(img.src);
        }
        setCodigosDeBarras([...novosCodigos]);
        setCodes([...novosCodigos]);
    };

    return (
        <div>
            <header className="w-full h-20 flex justify-center items-center border-b-2">
                <h1 className="text-3xl font-bold">Gerador de codigo de barras</h1>
            </header>

            <div className="flex gap-14 ml-10 mt-7">
            <form onClick={(e) => e.preventDefault()} className="w-[300px] pl-6 pr-6 pb-6 pt-6 flex flex-col gap-4  rounded-md border">
                <select className="w-full h-8 rounded-sm pl-4 pr-6 outline-none" 
                    onChange={(e) => setType(e.target.value)}
                    value={type}>
                    <option value="CODE128">Code128</option> 
                    <option value="EAN13">EAN13</option> 
                    <option value="EAN8">EAN8</option> 
                    <option value="EAN5">EAN5</option> 
                    <option value="EAN2">EAN2</option> 
                    <option value="UPC">UPC</option> 
                    <option value="CODE39">Code39</option> 
                    <option value="ITF14">ITF14</option> 
                    <option value="MSI">MSI</option> 
                    <option value="Pharmacode">Pharmacode</option> 
                    <option value="Codabar">Codabar</option> 
                    <option value="GS1-128">GS1-128</option>
                </select>

                <label htmlFor="" className="flex flex-col gap-2">
                    <span className="font-medium">Insira um código de barras</span>
                    <input 
                        type="text" 
                        className="w-full h-9 rounded-sm outline-none pl-4 border"
                        value={codebar}
                        onChange={(e) => setCodebar(e.target.value)}
                    />
                </label>

                <label htmlFor="" className="flex gap-6 items-center">
                    <span>Quantidate</span>
                    <input 
                        className="w-20 h-8 rounded-sm outline-none text-black pl-2 border text-center"
                        type="number"
                        placeholder="0,50"
                        value={quantidade}
                        onChange={(e) => setQuantidade(Number(e.target.value))}
                    />
                </label>

                <div className="flex flex-col gap-3">
                    <label htmlFor="" className="flex gap-6 items-center">
                        <span>Unidade de medida</span>
                        <select className="w-20 h-8 rounded-sm text-center">
                            <option value="">mm</option>
                        </select>
                    </label>

                    <label htmlFor="" className="flex gap-6 items-center">
                        <span>Largura da barra</span>
                        <input 
                            className="w-20 h-8 rounded-sm outline-none text-black pl-2 border text-center"
                            type="number"
                            placeholder="0,50"
                            value={largura}
                            onChange={(e) => setlargura(Number(e.target.value))}
                        />
                    </label>

                    <label htmlFor="" className="flex gap-6 items-center">
                        <span>Altura</span>
                        <input 
                            className="w-20 h-8 rounded-sm outline-none text-black pl-2 border text-center"
                            type="number"
                            placeholder="0,50"
                            value={altura}
                            onChange={(e) => setAltura(Number(e.target.value))}
                        />
                    </label>

                    <div className="flex gap-6 items-center">
                        <label onClick={() => setCheckBox(!checkbox)} className="cursor-pointer block">Mostrar texto</label>
                        <div onClick={() => setCheckBox(!checkbox)} className={`w-6 h-6 border cursor-pointer ${checkbox ? "bg-green-600" : "bg-transparent"}`}>
                            {checkbox && <h1 className="text-center text-white">V</h1>}
                        </div>
                    </div>
                    <button onClick={gerarCodigoDeBarras} className="w-full h-10 bg-green-600 text-white text-bold rounded-md">Gerar</button>
                    <button onClick={Imprimir} className="w-full h-10 bg-red-600 text-white text-bold rounded-md">Imprimir</button>
                </div>
            </form>
                <div className="border grid grid-cols-3">
                    {codigosDeBarras.map((codigo: string, index: number) => ( 
                        <img key={index} src={codigo} alt={`Código de Barras ${index + 1}`} /> 
                    ))}
                </div>
            </div>
        </div>
    )
}