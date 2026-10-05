'use client';

import {useEffect} from 'react';
import Script from 'next/script';

const productivity = ['Menos de $500,000','de $500,000 a $750,000','de $750,001 a $1,000,000','de $1,000,001 a $1,500,000','de $1,500,001 a $3,000,000','de $3,000,000 a $5 MDP','mas de $5 MDP'];
const rent = ['no pago renta','menos de $20,000','de $20,000 a $30,000','mas de $30,000'];
const expenses = ['menos de $30,000','de $30,000 a $50,000','de $50,001 a $60,000','mas de $60,000'];
const property = ['menos de $3 MDP','de $3 a $5 MDP','de $5 a $7 MDP','de $7 a $10 MDP','mas de $10 MDP'];
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
  w.zf_MandArray = ['SingleLine','Email','Radio2','Radio4','Radio','Radio3','Radio5','SingleLine10','SingleLine12','SingleLine13','Radio1'];
  w.zf_FieldArray = ['SingleLine','Email','Email1','Email2','Radio2','Radio4','Radio','Radio3','Radio5','SingleLine10','SingleLine12','SingleLine13','Radio1'];
  w.isSalesIQIntegrationEnabled = false;
  w.salesIQFieldsArray = [];
}

function Choices({name,label,values,selected}:{name:string;label:string;values:readonly string[];selected?:number}) {
  return <fieldset className="zoho-group"><legend>{label} <em>*</em></legend><div className="zoho-choices">{values.map((value,i)=><label key={value} className="zoho-choice"><input type="radio" name={name} value={value} defaultChecked={selected===i} checktype="c1"/>{value}</label>)}</div><p id={`${name}_error`} className="zf-errorMessage">Selecciona una opción.</p></fieldset>;
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
    <h3>Conserva tu ejercicio</h3>
    <div className="form-grid">
      <label>Nombre completo <em>*</em><input name="SingleLine" checktype="c1" maxLength={255} autoComplete="name"/><p id="SingleLine_error" className="zf-errorMessage">Escribe tu nombre.</p></label>
      <label>Correo electrónico <em>*</em><input name="Email" checktype="c5" maxLength={255} autoComplete="email" inputMode="email"/><p id="Email_error" className="zf-errorMessage">Escribe un correo válido.</p></label>
      <label>Nombre de tu agencia<input name="Email1" checktype="c1" maxLength={255}/><p id="Email1_error" className="zf-errorMessage">Revisa el nombre de tu agencia.</p></label>
      <label>Marca actual <span>(opcional)</span><input name="Email2" checktype="c1" maxLength={255} placeholder="Independiente, Century 21, RE/MAX, Alfa u otra"/><p id="Email2_error" className="zf-errorMessage">Revisa la marca actual.</p></label>
    </div>
    <Choices name="Radio2" label="Productividad anual en comisiones" values={productivity} selected={answers[0]}/>
    <Choices name="Radio4" label="Renta mensual actual" values={rent} selected={answers[1]}/>
    <Choices name="Radio" label="Gastos operativos mensuales" values={expenses} selected={answers[2]}/>
    <Choices name="Radio3" label="Valor promedio de las propiedades" values={property} selected={answers[3]}/>
    <fieldset className="zoho-group"><legend>¿Cómo quieres dar el siguiente paso? <em>*</em></legend><div className="zoho-choices">{nextStep.map(([value,detail])=><label key={value} className="zoho-choice"><input type="radio" name="Radio5" value={value} checktype="c1"/><span><strong>{value}</strong><small>{detail}</small></span></label>)}</div><p id="Radio5_error" className="zf-errorMessage">Selecciona una opción.</p></fieldset>
    <div className="form-grid">
      <label>Teléfono / WhatsApp <em>*</em><input name="SingleLine10" checktype="c1" maxLength={255} autoComplete="tel"/><p id="SingleLine10_error" className="zf-errorMessage">Escribe tu teléfono o WhatsApp.</p></label>
      <label>Fecha preferida <em>*</em><input name="SingleLine12" checktype="c1" maxLength={255} placeholder="Por ejemplo, 15 de octubre"/><p id="SingleLine12_error" className="zf-errorMessage">Escribe la fecha que prefieres.</p></label>
      <label>Hora preferida (CDMX) <em>*</em><input name="SingleLine13" checktype="c1" maxLength={255} placeholder="Por ejemplo, 10:00"/><p id="SingleLine13_error" className="zf-errorMessage">Escribe la hora que prefieres.</p></label>
    </div>
    <fieldset className="zoho-group"><legend>Política de privacidad <em>*</em></legend><div className="zoho-choices"><label className="zoho-choice"><input type="radio" name="Radio1" value="Acepto" checktype="c1"/><span>He leído el <a href="https://coldwellbanker.com.mx/aviso-privacidad" target="_blank" rel="noreferrer">aviso de privacidad</a> y acepto el tratamiento de mis datos.</span></label></div><p id="Radio1_error" className="zf-errorMessage">Acepta la política de privacidad.</p></fieldset>
    <button className="primary" type="submit">Enviar mi solicitud</button>
    <Script src="/zoho/validation.js" strategy="afterInteractive" onLoad={configureZoho}/>
  </form>;
}
