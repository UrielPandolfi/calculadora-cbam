'use client';

import {useEffect} from 'react';
import Script from 'next/script';
import {useCampaignFields} from '@/lib/campaign-fields';
import {zohoCheck} from '@/lib/zoho-check';

const franchiseOptions = ['Menos de $500,000','500 mil pesos','Mas de 500 mil pesos'];
const capitalOptions = ['Menos de 1 MDP','De 1 a 1.5 MDP','De 1.5 a 2 MDP','Mas de 2 MDP'];
const timingOptions = ['Invertir Ahora','De 1 a 2 Meses','Mas de 3 Meses'];

function configureZoho(){
  const w = window as Window & {
    zf_SetDateAndMonthRegexBasedOnDateFormate?: (format:string)=>string[];
    zf_DateRegex?: RegExp;
    zf_MonthYearRegex?: RegExp;
    zf_MandArray?: string[];
    zf_FieldArray?: string[];
    isSalesIQIntegrationEnabled?: boolean;
    salesIQFieldsArray?: unknown[];
  };
  if(typeof w.zf_SetDateAndMonthRegexBasedOnDateFormate!=='function')return;
  const formats = w.zf_SetDateAndMonthRegexBasedOnDateFormate('dd-MMM-yyyy');
  w.zf_DateRegex = new RegExp(formats[0]);
  w.zf_MonthYearRegex = new RegExp(formats[1]);
  w.zf_MandArray = ['SingleLine','Email','SingleLine10','SingleLine12','Radio2','Radio4','Radio','Radio1'];
  w.zf_FieldArray = ['SingleLine','Email','SingleLine10','SingleLine12','Radio6','Radio2','Radio4','Radio','Radio1'];
  w.isSalesIQIntegrationEnabled = false;
  w.salesIQFieldsArray = [];
}

export function EmprendedoresLeadForm({city,franchise,capital,timing}:{city:string;franchise:string;capital:string;timing:string}){
  const campaign = useCampaignFields('emprendedores');
  useEffect(()=>{configureZoho();},[]);
  function onSubmit(e:React.FormEvent<HTMLFormElement>){
    const validate = (window as Window & {zf_ValidateAndSubmit?:()=>boolean}).zf_ValidateAndSubmit;
    if(!validate||!validate())e.preventDefault();
  }
  return <form className="lead-form" action="https://forms.zohopublic.com/coldwellbankeraffiliatesdeme1/form/LandingCBAMBafflerEmprendedores/formperma/P0V6enu3Wlalypvyav5vvDoOfLZKNGMAItjS8PumAN4/htmlRecords/submit" name="form" method="POST" acceptCharset="UTF-8" encType="multipart/form-data" id="form" onSubmit={onSubmit}>
    <input type="hidden" name="zf_referrer_name" value={campaign.zf_referrer_name}/>
    <input type="hidden" name="zf_redirect_url" value=""/>
    <input type="hidden" name="zc_gad" value={campaign.zc_gad}/>
    <input type="hidden" name="utm_source" value={campaign.utm_source}/>
    <input type="hidden" name="utm_medium" value={campaign.utm_medium}/>
    <input type="hidden" name="utm_campaign" value={campaign.utm_campaign}/>
    <input type="hidden" name="utm_term" value={campaign.utm_term}/>
    <input type="hidden" name="utm_content" value={campaign.utm_content}/>
    <input type="hidden" name="gclid" value={campaign.gclid}/>
    <div hidden aria-hidden="true">
      <input name="SingleLine12" value={city} {...zohoCheck('c1')} onChange={()=>{}}/>
      <input type="radio" name="Radio6" value="Si" {...zohoCheck('c1')} onChange={()=>{}}/>
      <input type="radio" name="Radio6" value="No" checked {...zohoCheck('c1')} onChange={()=>{}}/>
      {franchiseOptions.map(option=><input key={option} type="radio" name="Radio2" value={option} checked={franchise===option} onChange={()=>{}} {...zohoCheck('c1')}/>)}
      {capitalOptions.map(option=><input key={option} type="radio" name="Radio4" value={option} checked={capital===option} onChange={()=>{}} {...zohoCheck('c1')}/>)}
      {timingOptions.map(option=><input key={option} type="radio" name="Radio" value={option} checked={timing===option} onChange={()=>{}} {...zohoCheck('c1')}/>)}
    </div>
    <h3 id="titulo-contacto">Tus datos de contacto</h3>
    <div className="form-grid">
      <label>Nombre completo <em>*</em><input name="SingleLine" {...zohoCheck('c1')} maxLength={255} autoComplete="name"/><p id="SingleLine_error" className="zf-errorMessage">Escribe tu nombre.</p></label>
      <label>Correo electrónico <em>*</em><input name="Email" {...zohoCheck('c5')} maxLength={255} autoComplete="email" inputMode="email"/><p id="Email_error" className="zf-errorMessage">Escribe un correo válido.</p></label>
    </div>
    <label className="contact-phone">Teléfono / WhatsApp <em>*</em><input name="SingleLine10" {...zohoCheck('c1')} maxLength={255} autoComplete="tel"/><p id="SingleLine10_error" className="zf-errorMessage">Escribe tu teléfono o WhatsApp.</p></label>
    <p id="SingleLine12_error" className="zf-errorMessage">Escribe la ciudad para abrir tu franquicia.</p>
    <p id="Radio2_error" className="zf-errorMessage">Selecciona el monto disponible para adquirir la franquicia.</p>
    <p id="Radio6_error" className="zf-errorMessage">Selecciona una opción.</p>
    <p id="Radio4_error" className="zf-errorMessage">Selecciona tu capital de trabajo en los paneles anteriores.</p>
    <p id="Radio_error" className="zf-errorMessage">Selecciona cuándo puedes hacer tu inversión.</p>
    <fieldset className="zoho-group"><legend>Política de privacidad <em>*</em></legend><div className="zoho-choices"><label className="zoho-choice"><input type="radio" name="Radio1" value="Acepto" {...zohoCheck('c1')}/><span>He leído el <a href="https://coldwellbanker.com.mx/aviso-privacidad" target="_blank" rel="noreferrer">aviso de privacidad</a> y acepto el tratamiento de mis datos.</span></label></div><p id="Radio1_error" className="zf-errorMessage">Acepta la política de privacidad.</p></fieldset>
    <button className="primary" type="submit">Confirmar mi llamada de evaluación</button>
    <Script src="/zoho/validation.js" strategy="afterInteractive" onLoad={configureZoho}/>
  </form>;
}
