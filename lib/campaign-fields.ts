'use client';

import {useEffect,useState} from 'react';

export const campaignFieldNames = ['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','zc_gad','zf_referrer_name'] as const;

export type CampaignFields = Record<(typeof campaignFieldNames)[number], string>;

const storageKey = 'cbam-campaign';
const empty = Object.fromEntries(campaignFieldNames.map(name=>[name,''])) as CampaignFields;
const landingSources = new Set(['calculadora','emprendedores']);

export function useCampaignFields(landing:'calculadora'|'emprendedores'){
  const [fields,setFields] = useState<CampaignFields>({...empty,utm_source:landing});
  useEffect(()=>{
    const params = new URLSearchParams(window.location.search);
    let stored: Partial<CampaignFields> = {};
    try {
      stored = JSON.parse(sessionStorage.getItem(storageKey)||'{}');
    } catch { /* A broken saved value should not block the form. */ }
    const next: CampaignFields = {...empty,utm_source:landing};
    for (const name of campaignFieldNames) {
      if (name==='utm_source') continue;
      const value = params.get(name)?.trim()||'';
      next[name] = value||(typeof stored[name]==='string'?stored[name]:'');
    }
    const fromLink = params.get('utm_source')?.trim()||'';
    const remembered = typeof stored.utm_source==='string'&&!landingSources.has(stored.utm_source)?stored.utm_source:'';
    next.utm_source = fromLink||remembered||landing;
    if (params.get('gclid')?.trim() && !params.get('zc_gad')?.trim()) next.zc_gad = next.gclid;
    const saved = {...next,utm_source:fromLink||remembered};
    if (campaignFieldNames.some(name=>saved[name])) sessionStorage.setItem(storageKey, JSON.stringify(saved));
    setFields(next);
  },[landing]);
  return fields;
}
