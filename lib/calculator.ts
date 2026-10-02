import data from './parameters.json';
export const parameters = data;
export const options = [data.productivity, data.rent, data.expenses, data.property];
export const questions = ['Productividad anual en comisiones','Renta mensual actual','Gastos operativos mensuales','Valor promedio de las propiedades'];
export function calculate(a: number[]) {
 if(a.length!==4 || a.some((v,i)=>!Number.isInteger(v)||v<0||v>=options[i].length)) throw new Error('Completa las cuatro respuestas.');
 const p=data.productivity[a[0]],r=data.rent[a[1]],e=data.expenses[a[2]],v=data.property[a[3]];
 if(a[0]===6) return {special:true,fee:null,roi:null,growth:p[2],initial:null,fitout:Number(r[1]),reserve:Number(e[1]),commission:Number(v[1])};
 const fee=Number(p[1])+Number(r[1])+Number(e[1]);
 return {special:false,fee,roi:fee/Number(v[1]),growth:p[2],initial:Number(p[1]),fitout:Number(r[1]),reserve:Number(e[1]),commission:Number(v[1])};
}
export const money=(v:number|string|null)=>typeof v==='number'?new Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN',maximumFractionDigits:0}).format(v):String(v??'');
export function report(a:number[]){const r=calculate(a);return `COLDWELL BANKER MÉXICO\nTu ejercicio de conversión\n\n${questions.map((q,i)=>q+': '+options[i][a[i]][0]).join('\n')}\n\nFEE DE ENTRADA: ${r.special?'REVISIÓN PERSONALIZADA':money(r.fee)}\nOPERACIONES PARA ROI: ${r.special?'REVISIÓN PERSONALIZADA':r.roi}\nCRECIMIENTO MÍNIMO EN IBC: ${money(r.growth)}\n\nEl FEE incluye cuota inicial, acondicionamiento y una reserva equivalente a 6 meses de gastos operativos.\nOperaciones para ROI = inversión estimada ÷ comisión estimada por operación.\nLos resultados son estimaciones comerciales y pueden ajustarse con información financiera específica del proyecto. No representan utilidad neta ni una garantía de resultados. Importes en MXN.\n`;}
