'use client';

import {useEffect,useId,useRef,useState} from 'react';
import {zohoCheck} from '@/lib/zoho-check';
import {foldPlace,matchState,municipalitySuggestions,stateSuggestions} from '@/lib/mexico-locations';

function SuggestField({label,name,errorId,error,placeholder,value,onValue,getOptions,emptyMessage}:{label:string;name:string;errorId:string;error:string;placeholder:string;value:string;onValue:(value:string)=>void;getOptions:(query:string,browsing:boolean)=>string[];emptyMessage?:string}){
  const listId = useId();
  const fieldRef = useRef<HTMLLabelElement>(null);
  const [open,setOpen] = useState(false);
  const [browsing,setBrowsing] = useState(false);
  const [highlighted,setHighlighted] = useState(false);
  const [active,setActive] = useState(0);
  const options = getOptions(value,browsing);
  const visible = open&&(options.length>0||Boolean(emptyMessage));
  useEffect(()=>{setActive(0);},[value,options.length,open]);
  useEffect(()=>{
    if(!visible)return;
    const option = document.getElementById(`${listId}-${active}`);
    option?.scrollIntoView({block:'nearest'});
  },[active,visible,listId]);
  useEffect(()=>{
    if(!open)return;
    function onPointerDown(event:PointerEvent){
      if(!fieldRef.current?.contains(event.target as Node))setOpen(false);
    }
    document.addEventListener('pointerdown',onPointerDown);
    return ()=>document.removeEventListener('pointerdown',onPointerDown);
  },[open]);
  function choose(option:string){
    onValue(option);
    setOpen(false);
  }
  function onKeyDown(event:React.KeyboardEvent<HTMLInputElement>){
    if(event.key==='ArrowDown'){
      event.preventDefault();
      setHighlighted(true);
      if(!open){setOpen(true);return;}
      setActive(index=>Math.min(index+1,Math.max(options.length-1,0)));
    }else if(event.key==='ArrowUp'){
      event.preventDefault();
      setHighlighted(true);
      setActive(index=>Math.max(index-1,0));
    }else if(event.key==='Escape'){
      setOpen(false);
    }else if(event.key==='Enter'&&open&&options[active]&&(!browsing||highlighted)){
      event.preventDefault();
      choose(options[active]);
    }
  }
  return <label className="location-suggest" ref={fieldRef}>{label} <em>*</em><span className="location-field"><input name={name} value={value} {...zohoCheck('c1')} maxLength={255} autoComplete="off" placeholder={placeholder} role="combobox" aria-autocomplete="list" aria-expanded={visible} aria-controls={listId} onChange={event=>{setBrowsing(false);setHighlighted(false);onValue(event.target.value);setOpen(true);}} onFocus={()=>{setBrowsing(true);setHighlighted(false);setOpen(true);}} onPointerDown={()=>{setBrowsing(true);setHighlighted(false);setOpen(true);}} onKeyDown={onKeyDown}/><ul className="location-menu" id={listId} role="listbox" hidden={!visible}>{options.map((option,index)=><li key={`${option}-${index}`} role="presentation"><button type="button" role="option" id={`${listId}-${index}`} aria-selected={index===active} className={index===active?'is-active':undefined} onMouseEnter={()=>{setHighlighted(true);setActive(index);}} onMouseDown={event=>event.preventDefault()} onClick={()=>choose(option)}>{option}</button></li>)}{options.length===0&&emptyMessage?<li className="location-empty">{emptyMessage}</li>:null}</ul></span><p id={errorId} className="zf-errorMessage">{error}</p></label>;
}

export function MexicoResidenceFields({stateName,stateErrorId,municipalityName,municipalityErrorId}:{stateName:string;stateErrorId:string;municipalityName:string;municipalityErrorId:string}){
  const [state,setState] = useState('');
  const [municipality,setMunicipality] = useState('');
  const resolvedState = matchState(state);
  function updateState(next:string){
    const previous = matchState(state);
    const nextState = matchState(next);
    setState(next);
    if(!previous||!nextState||previous===nextState||!municipality)return;
    const previousPlaces = municipalitySuggestions(previous,'');
    if(previousPlaces.some(place=>foldPlace(place)===foldPlace(municipality)))setMunicipality('');
  }
  return <>
    <SuggestField label="¿En qué Estado resides actualmente?" name={stateName} errorId={stateErrorId} error="Escribe el estado donde resides." placeholder="Escribe o elige un estado" value={state} onValue={updateState} getOptions={(query,browsing)=>stateSuggestions(browsing?'':query)}/>
    <SuggestField label="¿Cuál es tu alcaldía o municipio de residencia?" name={municipalityName} errorId={municipalityErrorId} error="Escribe tu alcaldía o municipio." placeholder={resolvedState?'Escribe o elige una alcaldía o municipio':'Elige un estado o escribe el tuyo'} value={municipality} onValue={setMunicipality} getOptions={(query,browsing)=>municipalitySuggestions(resolvedState,browsing?'':query)} emptyMessage={resolvedState?undefined:'Elige un estado para ver sus alcaldías o municipios.'}/>
  </>;
}
