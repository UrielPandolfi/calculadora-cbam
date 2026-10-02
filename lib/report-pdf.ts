import {PDFDocument,StandardFonts,rgb,PDFName,PDFString} from 'pdf-lib';
import {calculate,options,questions,money} from './calculator';
import {reportLogo} from './report-logo';
const origin='https://coldwell-tu-siguiente-nivel.baffler781210.chatgpt.site';
export async function createReportPdf(answers:number[]){
 const r=calculate(answers);const doc=await PDFDocument.create();doc.setTitle('Tu ejercicio de conversión | Coldwell Banker');doc.setAuthor('Coldwell Banker México');
 const page=doc.addPage([595.28,841.89]);const regular=await doc.embedFont(StandardFonts.Helvetica);const bold=await doc.embedFont(StandardFonts.HelveticaBold);const serif=await doc.embedFont(StandardFonts.TimesRoman);
 const navy=rgb(.025,.19,.34),blue=rgb(.04,.3,.49),muted=rgb(.36,.44,.5),pale=rgb(.92,.95,.98);const W=499;
 function text(t:string,x:number,y:number,size=10,font=regular,color=navy){page.drawText(t,{x,y,size,font,color});}
 function wrap(t:string,x:number,y:number,width=W,size=10,line=14,font=regular,color=muted){let current='';for(const word of t.split(' ')){const next=current?current+' '+word:word;if(font.widthOfTextAtSize(next,size)>width&&current){text(current,x,y,size,font,color);y-=line;current=word;}else current=next;}if(current)text(current,x,y,size,font,color);return y-line;}
 page.drawRectangle({x:0,y:726,width:595.28,height:116,color:navy});const logo=await doc.embedPng(reportLogo);page.drawImage(logo,{x:407,y:748,width:140,height:140*logo.height/logo.width});text('TU EJERCICIO DE CONVERSIÓN',48,806,9,bold,rgb(.78,.86,.92));text('Tu siguiente capítulo,',48,777,23,serif,rgb(1,1,1));text('en números.',48,748,23,serif,rgb(1,1,1));
 text('SIGUES AL MANDO. CON UN HORIZONTE MÁS PRÓSPERO.',48,700,10,bold,blue);
 text('TU AGENCIA HOY',48,668,9,bold,muted);wrap(String(options[0][answers[0]][0]),48,647,230,15,19,bold,navy);text('Productividad anual en comisiones',48,599,9,regular,muted);
 text('POTENCIAL CON COLDWELL BANKER',315,668,9,bold,blue);wrap(money(r.growth),315,638,232,r.special?17:29,32,bold,blue);text('Crecimiento mínimo en IBC del modelo',315,599,9,regular,muted);
 page.drawRectangle({x:48,y:505,width:W,height:70,color:pale});text('FEE DE ENTRADA',63,554,9,bold,muted);if(r.special){text('REVISIÓN',63,535,11,bold);text('PERSONALIZADA',63,519,11,bold);}else text(money(r.fee),63,528,22,bold);text('OPERACIONES PARA ROI',315,554,9,bold,muted);if(r.special){text('REVISIÓN',315,535,11,bold);text('PERSONALIZADA',315,519,11,bold);}else text(new Intl.NumberFormat('es-MX',{maximumFractionDigits:2}).format(r.roi!),315,528,22,bold);
 text('TUS RESPUESTAS',48,480,10,bold,blue);let y=458;questions.forEach((q,i)=>{text(q,48,y,9,regular,muted);const value=String(options[i][answers[i]][0]);text(value,547-regular.widthOfTextAtSize(value,10),y,10,regular,navy);page.drawLine({start:{x:48,y:y-9},end:{x:547,y:y-9},thickness:.5,color:rgb(.84,.88,.91)});y-=29;});
 if(!r.special){text('INVERSIÓN ESTIMADA',48,329,10,bold,blue);wrap(`Cuota inicial: ${money(r.initial)}   |   Acondicionamiento: ${money(r.fitout)}   |   Reserva de 6 meses: ${money(r.reserve)}`,48,309,W,9,13);text(`Comisión estimada por operación: ${money(r.commission)}. ROI = inversión ÷ comisión por operación.`,48,279,9,regular,muted);}else wrap('Tu volumen requiere una revisión personalizada de inversión, operaciones para ROI y crecimiento.',48,325,W,10,14);
 text('UNA SESIÓN DE TRABAJO PARA TOMAR UNA DECISIÓN INFORMADA',48,248,10,bold,blue);wrap('Un especialista conocerá tu agencia y revisará contigo cifras reales, inversión, territorio y metodología para construir un ejercicio financiero más preciso y evaluar si la conversión conviene a ambas partes.',48,229,W,10,14);
 const url=origin+'/?session=1&answers='+encodeURIComponent(JSON.stringify(answers));page.drawRectangle({x:48,y:146,width:W,height:40,color:blue});text('AGENDAR SESIÓN DE SEGUIMIENTO',177,162,11,bold,rgb(1,1,1));const link=doc.context.register(doc.context.obj({Type:'Annot',Subtype:'Link',Rect:[48,146,547,186],Border:[0,0,0],A:{Type:'Action',S:'URI',URI:PDFString.of(url)}}));page.node.set(PDFName.of('Annots'),doc.context.obj([link]));
 wrap('La solicitud está sujeta a confirmación. También puedes llamar al 55 4162 1060 e indicar que deseas revisar la conversión de tu agencia.',48,130,W,9,12);
 wrap('Estimaciones comerciales en MXN, sujetas a revisión. El crecimiento en IBC se conserva como salida del modelo: no se suma al rango actual ni representa utilidad neta o ingreso garantizado. El FEE incluye cuota inicial, acondicionamiento y reserva de 6 meses. Las operaciones para ROI no equivalen a meses.',48,91,W,8,10);
 text('Si solicitas solo el ejercicio, no habrá llamadas ni mensajes de seguimiento.',48,36,8,regular,muted);text('1 / 1',525,36,8,regular,muted);
 return doc.save();
}
