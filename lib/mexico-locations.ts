import catalog from './mexico-locations.json';

const byState = catalog as Record<string, string[]>;

export const mexicanStates = Object.keys(byState).sort((a,b)=>a.localeCompare(b,'es-MX'));

const municipalities = Object.fromEntries(
  mexicanStates.map(state=>[state,[...byState[state]].sort((a,b)=>a.localeCompare(b,'es-MX'))]),
) as Record<string, string[]>;

const aliases: Record<string, string> = {
  cdmx:'Ciudad de México',
  df:'Ciudad de México',
  'distrito federal':'Ciudad de México',
  edomex:'México',
  'edo mex':'México',
  'edo. mex.':'México',
  'estado de mexico':'México',
  coahuila:'Coahuila de Zaragoza',
  michoacan:'Michoacán de Ocampo',
  veracruz:'Veracruz de Ignacio de la Llave',
  slp:'San Luis Potosí',
  bc:'Baja California',
  bcs:'Baja California Sur',
  nl:'Nuevo León',
  qro:'Querétaro',
  qroo:'Quintana Roo',
};

export function foldPlace(value:string){
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
}

export function matchState(value:string){
  const folded = foldPlace(value);
  if(!folded)return null;
  if(aliases[folded])return aliases[folded];
  return mexicanStates.find(state=>foldPlace(state)===folded)??null;
}

export function stateSuggestions(query:string){
  const folded = foldPlace(query);
  if(!folded)return mexicanStates;
  return mexicanStates.filter(state=>{
    if(foldPlace(state).includes(folded))return true;
    return Object.entries(aliases).some(([alias,target])=>target===state&&alias.startsWith(folded));
  });
}

export function municipalitySuggestions(state:string|null,query:string){
  if(!state)return [];
  const places = municipalities[state]??[];
  const folded = foldPlace(query);
  if(!folded)return places;
  return places.filter(place=>foldPlace(place).includes(folded));
}
