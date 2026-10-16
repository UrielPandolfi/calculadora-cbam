'use client';

import {useEffect,useRef,useState} from 'react';
import {Select,SelectTrigger,SelectValue,SelectContent,SelectItem} from '@/components/ui/select';
import slide1 from './assets/slide1.png';
import slide2 from './assets/slide2.png';
import slide3 from './assets/slide3.png';
import slide4 from './assets/slide4.png';
import slide5 from './assets/slide5.png';
import {EmprendedoresLeadForm} from './lead-form';
import './emprendedores.css';

const CALCULATOR_URL = 'https://coldwellbanker.com.mx/franquicias/calculadora';
const officeOptions = [
  {value:'Si',label:'Sí'},
  {value:'No',label:'No'},
] as const;
const capitalOptions = ['Menos de 1 MDP','De 1 a 1.5 MDP','De 1.5 a 2 MDP','Mas de 2 MDP'];
const timingOptions = ['Invertir Ahora','De 1 a 2 Meses','Mas de 3 Meses'];

function imageSrc(file:string|{src:string}){
  return typeof file==='string'?file:file.src;
}

export default function EmprendedoresLanding(){
  const [office,setOffice]=useState('');
  const [city,setCity]=useState('');
  const [capital,setCapital]=useState('');
  const [showNext,setShowNext]=useState(false);
  const [showCapital,setShowCapital]=useState(false);
  const [showShield,setShowShield]=useState(false);
  const [startupCapital,setStartupCapital]=useState('');
  const [timing,setTiming]=useState('');
  const [showTools,setShowTools]=useState(false);
  const [showReady,setShowReady]=useState(false);
  const [lightHeader,setLightHeader]=useState(false);
  const [paperHeader,setPaperHeader]=useState(false);
  const scrollTarget=useRef<'cierre'|'contacto'>('cierre');

  useEffect(()=>{
    if(!showNext)return;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('escena-1')?.scrollIntoView({behavior:reduce?'instant':'smooth',block:'start'});
  },[showNext]);

  useEffect(()=>{
    if(!showCapital)return;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('escena-2')?.scrollIntoView({behavior:reduce?'instant':'smooth',block:'start'});
  },[showCapital]);

  useEffect(()=>{
    if(!showShield)return;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('escena-3')?.scrollIntoView({behavior:reduce?'instant':'smooth',block:'start'});
  },[showShield]);

  useEffect(()=>{
    if(!showTools)return;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('escena-4')?.scrollIntoView({behavior:reduce?'instant':'smooth',block:'start'});
  },[showTools]);

  useEffect(()=>{
    if(!showReady)return;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(scrollTarget.current)?.scrollIntoView({behavior:reduce?'instant':'smooth',block:'start'});
  },[showReady]);

  useEffect(()=>{
    const scene=document.getElementById('escena-1');
    if(!scene)return;
    const observer=new IntersectionObserver(entries=>{
      setLightHeader(entries.some(entry=>entry.isIntersecting));
    },{threshold:0,rootMargin:'-45% 0px -45% 0px'});
    observer.observe(scene);
    return()=>observer.disconnect();
  },[showNext]);

  useEffect(()=>{
    const scene=document.getElementById('papel');
    if(!scene)return;
    const observer=new IntersectionObserver(entries=>{
      setPaperHeader(entries.some(entry=>entry.isIntersecting));
    },{threshold:0,rootMargin:'-45% 0px -45% 0px'});
    observer.observe(scene);
    return()=>observer.disconnect();
  },[showReady]);

  function goToForm(){
    scrollTarget.current='contacto';
    setShowReady(true);
    if(!showReady)return;
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('contacto')?.scrollIntoView({behavior:reduce?'instant':'smooth',block:'start'});
  }

  function discover(){
    if(office==='Si'){
      window.location.href=CALCULATOR_URL;
      return;
    }
    if(office==='No')setShowNext(true);
  }

  return <div className="emprendedores">
    <header className={'cinema-header'+(lightHeader?' on-light':paperHeader?' on-paper':'')}>
      <a href="#escena-0" aria-label="Coldwell Banker inicio" className="cinema-brand"><img src={lightHeader||paperHeader?'/logo-blue.svg':'/logo-white.svg'} alt="Coldwell Banker Franquicias Inmobiliarias"/></a>
      <button type="button" className="consultor" onClick={goToForm}>Contactar a un consultor</button>
    </header>
    <main>
      <section className="scene is-active" id="escena-0" aria-labelledby="titulo-oficina">
        <div className="scene-media"><img src={imageSrc(slide1)} alt=""/></div>
        <div className="scene-layout">
          <div className="hero">
            <h1 className="hero-title" id="titulo-oficina">Tu propia <em>agencia inmobiliaria,</em> respaldada <span className="title-tide">paso a paso por Coldwell Banker</span></h1>
            <div className="hero-copy">
              <p>Recupera tu inversión de 12 a 18 meses</p>
              <p>+30,000 propiedades | CRM, App e IA para acelerar tus ventas</p>
            </div>
            <div className="ask">
              <label id="pregunta-oficina" htmlFor="oficina">¿Tienes una oficina inmobiliaria?</label>
              <Select value={office} onValueChange={setOffice}>
                <SelectTrigger id="oficina" aria-labelledby="pregunta-oficina" className="scene-select"><SelectValue placeholder="Selecciona una opción"/></SelectTrigger>
                <SelectContent position="popper" sideOffset={10} className="scene-options">{officeOptions.map(option=><SelectItem key={option.value} value={option.value} className="scene-option">{option.label}</SelectItem>)}</SelectContent>
              </Select>
              <button type="button" className="discover" disabled={!office} onClick={discover}>Descubrir mi oportunidad</button>
            </div>
          </div>
        </div>
      </section>
      {showNext&&<section className="scene light is-active" id="escena-1" aria-labelledby="titulo-ciudad">
        <div className="scene-media"><img src={imageSrc(slide2)} alt=""/></div>
        <div className="scene-layout">
          <div className="hero">
            <h2 className="hero-title" id="titulo-ciudad">Posiciónate como<br/>el <em>líder</em> en el mercado<br/>inmobiliario</h2>
            <div className="ask">
              <label id="pregunta-ciudad" htmlFor="ciudad">Ciudad donde quieres abrir tu franquicia</label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger id="ciudad" aria-labelledby="pregunta-ciudad" className="scene-select"><SelectValue placeholder="Selecciona una opción"/></SelectTrigger>
                <SelectContent position="popper" sideOffset={10} className="scene-options"/>
              </Select>
              <p className="zone-note">Analizamos la viabilidad de tu zona para asegurar que entres al mercado con una ventaja competitiva clara.</p>
              <button type="button" className="discover" disabled={!city} onClick={()=>setShowCapital(true)}>Descubrir mi oportunidad</button>
            </div>
          </div>
        </div>
      </section>}
      {showCapital&&<section className="scene is-active" id="escena-2" aria-labelledby="titulo-capital">
        <div className="scene-media"><img src={imageSrc(slide3)} alt=""/></div>
        <div className="scene-layout">
          <div className="hero">
            <h2 className="hero-title capital-title" id="titulo-capital"><em>Capacitamos</em> a tu<br/>equipo para que<br/>aseguren más<br/>y mejores exclusivas</h2>
            <div className="ask">
              <label id="pregunta-capital" htmlFor="capital">Selecciona el capital de trabajo destinado para tu primer año:</label>
              <Select value={capital} onValueChange={setCapital}>
                <SelectTrigger id="capital" aria-labelledby="pregunta-capital" className="scene-select"><SelectValue placeholder="Selecciona una opción"/></SelectTrigger>
                <SelectContent position="popper" sideOffset={10} className="scene-options">{capitalOptions.map(option=><SelectItem key={option} value={option} className="scene-option">{option}</SelectItem>)}</SelectContent>
              </Select>
              <p className="zone-note on-dark">La Universidad Coldwell Banker capacita a tus <strong>asesores</strong> para cerrar más y mejores exclusivas<br/>y así lograr el 100% de comisión.</p>
              <button type="button" className="discover" disabled={!capital} onClick={()=>setShowShield(true)}>Descubrir mi oportunidad</button>
            </div>
          </div>
        </div>
      </section>}
      {showShield&&<section className="scene is-active" id="escena-3" aria-labelledby="titulo-blinda">
        <div className="scene-media"><img src={imageSrc(slide4)} alt=""/></div>
        <div className="scene-layout">
          <div className="hero">
            <h2 className="hero-title shield-title" id="titulo-blinda"><em>Blinda tu capital</em> de<br/>arranque con nuestro<br/>acompañamiento<br/>directivo 1 a 1.</h2>
            <div className="ask">
              <label id="pregunta-arranque" htmlFor="arranque">¿Cuál es tu capital de trabajo para el primer año de operación?</label>
              <Select value={startupCapital} onValueChange={setStartupCapital}>
                <SelectTrigger id="arranque" aria-labelledby="pregunta-arranque" className="scene-select"><SelectValue placeholder="Selecciona una opción"/></SelectTrigger>
                <SelectContent position="popper" sideOffset={10} className="scene-options">{capitalOptions.map(option=><SelectItem key={option} value={option} className="scene-option">{option}</SelectItem>)}</SelectContent>
              </Select>
              <p className="zone-note on-dark shield-note">Acompañamos tu capital con un consultor de negocios dedicado a ti. A través de nuestro<br/>coaching estratégico, analizamos tus métricas, validamos tus decisiones comerciales y<br/>guiamos a tu franquicia inmobiliaria hacia el punto de equilibrio en tiempo récord.</p>
              <button type="button" className="discover" disabled={!startupCapital} onClick={()=>setShowTools(true)}>Descubrir mi oportunidad</button>
            </div>
          </div>
        </div>
      </section>}
      {showTools&&<section className="scene is-active" id="escena-4" aria-labelledby="titulo-crm">
        <div className="scene-media"><img src={imageSrc(slide5)} alt=""/></div>
        <div className="scene-layout">
          <div className="hero">
            <h2 className="hero-title crm-title" id="titulo-crm">CRM inteligente,<br/>IA y herramientas<br/><em>de seguimiento</em></h2>
            <div className="ask">
              <label id="pregunta-inversion" htmlFor="inversion">¿Cuándo puedes hacer tu inversión?</label>
              <Select value={timing} onValueChange={setTiming}>
                <SelectTrigger id="inversion" aria-labelledby="pregunta-inversion" className="scene-select"><SelectValue placeholder="Selecciona una opción"/></SelectTrigger>
                <SelectContent position="popper" sideOffset={10} className="scene-options">{timingOptions.map(option=><SelectItem key={option} value={option} className="scene-option">{option}</SelectItem>)}</SelectContent>
              </Select>
              <p className="zone-note on-dark crm-note">Automatiza los seguimientos y asegura cada cierre de tu<br/>equipo con nuestro CRM inteligente e IA. Las herramientas<br/>para operar una franquicia exitosa te esperan ahora.</p>
              <button type="button" className="discover" disabled={!timing} onClick={()=>{scrollTarget.current='cierre';setShowReady(true);}}>Descubrir mi oportunidad</button>
            </div>
          </div>
        </div>
      </section>}
      {showReady&&<div id="papel">
      <section className="ready" id="cierre" aria-labelledby="titulo-cierre">
        <h2 id="titulo-cierre">Todo listo para estructurar tu <span className="accent">franquicia</span><br/><span className="accent">inmobiliaria</span> <strong>Coldwell Banker.</strong></h2>
        <ul className="ready-cards">
          <li className="ready-card"><strong>+30,000</strong><span>propiedades<br/>exclusivas</span></li>
          <li className="ready-card"><span>Ecosistema</span><strong>PropTech</strong><small>(CRM impulsado<br/>por IA)</small></li>
          <li className="ready-card"><strong>Universidad<br/>Coldwell Banker</strong><span>para tus asesores</span></li>
          <li className="ready-card"><strong>Coaching<br/>Directivo</strong><span>para ti</span></li>
          <li className="ready-card"><span>Acceso a<br/>compradores</span><strong>extranjeros</strong></li>
        </ul>
        <p className="ready-next">El siguiente paso es <strong>atender la llamada</strong> de nuestros consultores.</p>
        <button type="button" className="discover" onClick={goToForm}>Confirmar mi llamada de evaluación</button>
      </section>
      <section className="contact-block" id="contacto" aria-labelledby="titulo-contacto">
        <EmprendedoresLeadForm capital={startupCapital||capital} timing={timing}/>
      </section>
      </div>}
    </main>
  </div>;
}
