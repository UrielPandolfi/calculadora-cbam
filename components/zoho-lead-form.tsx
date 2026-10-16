'use client';

import {useEffect} from 'react';
import Script from 'next/script';
import {zohoCheck} from '@/lib/zoho-check';

const productivity = ['Menos de $500,000','de $500,000 a $750,000','de $750,001 a $1,000,000','de $1,000,001 a $1,500,000','de $1,500,001 a $3,000,000','de $3,000,000 a $5 MDP','mas de $5 MDP'];
const rent = ['no pago renta','menos de $20,000','de $20,000 a $30,000','mas de $30,000'];
const expenses = ['menos de $30,000','de $30,000 a $50,000','de $50,001 a $60,000','mas de $60,000'];
const property = ['menos de $3 MDP','de $3 a $5 MDP','de $5 a $7 MDP','de $7 a $10 MDP','mas de $10 MDP'];
const calculatorFields = [
  {name:'Radio2',values:productivity},
  {name:'Radio4',values:rent},
  {name:'Radio',values:expenses},
  {name:'Radio3',values:property},
] as const;
const nextStep = [
  ['Solo recibir mi ejercicio','Solo el envío solicitado. Sin contacto posterior.'],
  ['Quiero una llamada','Revisemos inversión, territorio y viabilidad.'],
  ['Quiero una sesión de diagnóstico','Propón una fecha; confirmaremos la disponibilidad.'],
] as const;

function configureZoho() {
  const w = window as Window & {
    zf_SetDateAndMonthRegexBasedOnDateFormate?: (format: string) => string[];
    zf_DateRegex?: RegExp;
    zf_MonthYearRegex?: RegExp;
    zf_MandArray?: string[];
    zf_FieldArray?: string[];
    isSalesIQIntegrationEnabled?: boolean;
    salesIQFieldsArray?: unknown[];
  };
  if (typeof w.zf_SetDateAndMonthRegexBasedOnDateFormate !== 'function') return;
  const formats = w.zf_SetDateAndMonthRegexBasedOnDateFormate('dd-MMM-yyyy');
  w.zf_DateRegex = new RegExp(formats[0]);
  w.zf_MonthYearRegex = new RegExp(formats[1]);
  w.zf_MandArray = ['SingleLine','Email','SingleLine14','Radio2','Radio4','Radio','Radio3','Radio5','SingleLine10','SingleLine12','SingleLine13','Radio1'];
  w.zf_FieldArray = ['SingleLine','Email','Radio6','SingleLine14','SingleLine15','Radio2','Radio4','Radio','Radio3','Radio5','SingleLine10','SingleLine12','SingleLine13','Radio1'];
  w.isSalesIQIntegrationEnabled = false;
  w.salesIQFieldsArray = [];
}

export function ZohoLeadForm({answers}:{answers:number[]}) {
  useEffect(()=>{configureZoho();},[]);
  function onSubmit(e:React.FormEvent<HTMLFormElement>) {
    const validate = (window as Window & {zf_ValidateAndSubmit?:()=>boolean}).zf_ValidateAndSubmit;
    if (!validate || !validate()) e.preventDefault();
  }
  return <form className="lead-form" action="https://forms.zohopublic.com/coldwellbankeraffiliatesdeme1/form/LandingCBAMBaffler/formperma/ML04gLsKgoYcfd_o65m7hpiO6tKOXK8idNBsfbX1ccY/htmlRecords/submit" name="form" method="POST" acceptCharset="UTF-8" encType="multipart/form-data" id="form" onSubmit={onSubmit}>
    <input type="hidden" name="zf_referrer_name" value=""/>
    <input type="hidden" name="zf_redirect_url" value=""/>
    <input type="hidden" name="zc_gad" value=""/>
    <input type="hidden" name="utm_source" value=""/>
    <input type="hidden" name="utm_medium" value=""/>
    <input type="hidden" name="utm_campaign" value=""/>
    <input type="hidden" name="utm_term" value=""/>
    <input type="hidden" name="utm_content" value=""/>
    <input type="hidden" name="gclid" value=""/>
    <div className="zoho-scroll-answers" hidden aria-hidden="true">
      {calculatorFields.map((field,index)=>field.values.map((value,option)=><input key={`${field.name}-${option}`} type="radio" name={field.name} value={value} checked={answers[index]===option} onChange={()=>{}} {...zohoCheck('c1')}/>))}
      <p id="Radio2_error" className="zf-errorMessage">Selecciona tu productividad.</p>
      <p id="Radio4_error" className="zf-errorMessage">Selecciona tu renta.</p>
      <p id="Radio_error" className="zf-errorMessage">Selecciona tus gastos.</p>
      <p id="Radio3_error" className="zf-errorMessage">Selecciona el valor de tus propiedades.</p>
    </div>
    <h3>Conserva tu ejercicio</h3>
    <div className="form-grid">
      <label>Nombre completo <em>*</em><input name="SingleLine" {...zohoCheck('c1')} maxLength={255} autoComplete="name"/><p id="SingleLine_error" className="zf-errorMessage">Escribe tu nombre.</p></label>
      <label>Correo electrónico <em>*</em><input name="Email" {...zohoCheck('c5')} maxLength={255} autoComplete="email" inputMode="email"/><p id="Email_error" className="zf-errorMessage">Escribe un correo válido.</p></label>
    </div>
    <div hidden aria-hidden="true"><input type="radio" name="Radio6" value="Si" defaultChecked {...zohoCheck('c1')}/><input type="radio" name="Radio6" value="No" {...zohoCheck('c1')}/><p id="Radio6_error" className="zf-errorMessage">Selecciona una opción.</p></div>
    <div className="form-grid">
      <label>Nombre de tu agencia <em>*</em><input name="SingleLine14" {...zohoCheck('c1')} maxLength={255}/><p id="SingleLine14_error" className="zf-errorMessage">Escribe el nombre de tu agencia.</p></label>
      <label>Marca actual <span>(opcional)</span><input name="SingleLine15" {...zohoCheck('c1')} maxLength={255} placeholder="Independiente, Century 21, RE/MAX, Alfa u otra"/><p id="SingleLine15_error" className="zf-errorMessage">Revisa la marca actual.</p></label>
    </div>
    <fieldset className="zoho-group"><legend>¿Cómo quieres dar el siguiente paso? <em>*</em></legend><div className="zoho-choices">{nextStep.map(([value,detail])=><label key={value} className="zoho-choice"><input type="radio" name="Radio5" value={value} {...zohoCheck('c1')}/><span><strong>{value}</strong><small>{detail}</small></span></label>)}</div><p id="Radio5_error" className="zf-errorMessage">Selecciona una opción.</p></fieldset>
    <div className="form-grid">
      <label>Teléfono / WhatsApp <em>*</em><input name="SingleLine10" {...zohoCheck('c1')} maxLength={255} autoComplete="tel"/><p id="SingleLine10_error" className="zf-errorMessage">Escribe tu teléfono o WhatsApp.</p></label>
      <label>Fecha preferida <em>*</em><input name="SingleLine12" {...zohoCheck('c1')} maxLength={255} placeholder="Por ejemplo, 15 de octubre"/><p id="SingleLine12_error" className="zf-errorMessage">Escribe la fecha que prefieres.</p></label>
      <label>Hora preferida (CDMX) <em>*</em><input name="SingleLine13" {...zohoCheck('c1')} maxLength={255} placeholder="Por ejemplo, 10:00"/><p id="SingleLine13_error" className="zf-errorMessage">Escribe la hora que prefieres.</p></label>
    </div>
    <fieldset className="zoho-group"><legend>Política de privacidad <em>*</em></legend><div className="zoho-choices"><label className="zoho-choice"><input type="radio" name="Radio1" value="Acepto" {...zohoCheck('c1')}/><span>He leído el <a href="https://coldwellbanker.com.mx/aviso-privacidad" target="_blank" rel="noreferrer">aviso de privacidad</a> y acepto el tratamiento de mis datos.</span></label></div><p id="Radio1_error" className="zf-errorMessage">Acepta la política de privacidad.</p></fieldset>
    <button className="primary" type="submit">Enviar mi solicitud</button>
    <Script src="/zoho/validation.js" strategy="afterInteractive" onLoad={configureZoho}/>
  </form>;
}
