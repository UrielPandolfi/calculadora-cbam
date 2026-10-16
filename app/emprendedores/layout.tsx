import type {Metadata} from 'next';

export const metadata: Metadata = {
  title: 'Coldwell Banker | Tu propia agencia inmobiliaria',
  description: 'Da el primer paso para abrir tu agencia inmobiliaria con el respaldo de Coldwell Banker.',
};

export default function EmprendedoresLayout({children}:{children:React.ReactNode}){
  return children;
}
