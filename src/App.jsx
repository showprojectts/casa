import {useEffect,useMemo,useRef,useState} from 'react'
import {Canvas,useFrame,useThree} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import * as THREE from 'three'
import House,{Ctx} from './House'
import Rain from './Rain'
import {ROOMS,INFO,CATS,FOCUS,catOf,PROJETO,GRUPO,MOSTRAR_SOBRE,MOSTRAR_COMO_USAR} from './data'

const VIEWS={
 home:{pos:[15,10.5,17],tgt:[0,1.5,-1]},
 top:{pos:[-.5,27,2.5],tgt:[-.5,0,-1]},
 front:{pos:[0,3.6,23],tgt:[0,2.6,0]},
 inner:{pos:[-1,2.6,9],tgt:[-1,1.6,-2]}}
const VIEW_BTNS=[['home','Geral'],['top','Planta'],['front','Fachada'],['inner','Interior']]
const MOSS='#2f6b4a'
const ORDER=CATS.flatMap(k=>k.items)

function Compass({ctl}){
 const {camera}=useThree()
 useFrame(()=>{const c=ctl.current,el=document.getElementById('compass-n');if(!c||!el)return
  el.style.transform='rotate('+(180+Math.atan2(camera.position.x-c.target.x,camera.position.z-c.target.z)*180/Math.PI)+'deg)'})
 return null}

function Rig({view,ctl}){
 const {camera}=useThree(),go=useRef(false)
 const P=useMemo(()=>new THREE.Vector3(...view.pos),[view])
 const T=useMemo(()=>new THREE.Vector3(...view.tgt),[view])
 useEffect(()=>{go.current=true},[view])
 useEffect(()=>{const c=ctl.current;if(!c)return;const f=()=>{go.current=false};c.addEventListener('start',f);return()=>c.removeEventListener('start',f)},[ctl])
 useFrame((_,d)=>{const c=ctl.current;if(!c||!go.current)return
  const k=1-Math.pow(.003,d)
  camera.position.lerp(P,k);c.target.lerp(T,k);c.update()
  if(camera.position.distanceTo(P)<.05&&c.target.distanceTo(T)<.05)go.current=false})
 return null}

const Logo=()=><svg className="logo" viewBox="0 0 40 40" aria-hidden="true">
 <path d="M4 19 20 6l16 13" fill="none" stroke="#2f6b4a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
 <path d="M9 17v16h22V17" fill="#e3efe6" stroke="#2f6b4a" strokeWidth="3" strokeLinejoin="round"/>
 <rect x="16" y="22" width="8" height="11" rx="1" fill="#2f6b4a"/>
 <circle cx="31" cy="9" r="3.4" fill="#d9971a"/></svg>

const Switch=({on,fn,label,hint})=>
 <button role="switch" aria-checked={on} className="sw" onClick={fn}>
  <span className="sw-t">{label}<small>{hint}</small></span><i aria-hidden="true"/></button>

export default function App(){
 const [view,setView]=useState({...VIEWS.home,id:'home'})
 const [lights,setLights]=useState(true),[night,setNight]=useState(false),[cut,setCut]=useState(false),[vent,setVent]=useState(false)
 const [sel,setSel]=useState(null),ctl=useRef(),stage=useRef()
 const [rain,setRain]=useState(false),[hour,setHour]=useState(12),[winter,setWinter]=useState(false),[about,setAbout]=useState(false),[plano,setPlano]=useState('cima'),[signs,setSigns]=useState(true)
 const [open,setOpen]=useState(()=>window.innerWidth>760)
 const shut=()=>{if(window.innerWidth<=760)setOpen(false)}


 const go=id=>{setView({...VIEWS[id],id});setCut(id==='top'||id==='inner');setSel(null);shut()}
 const reset=()=>{go('home');setLights(true);setNight(false);setVent(false);setRain(false);setHour(12);setWinter(false);setPlano('cima');setSigns(true)}
 const pick=id=>{
  const r=ROOMS.find(q=>q.id===id)
  if(r){const x=(r.x[0]+r.x[1])/2,z=(r.z[0]+r.z[1])/2,y=r.f?4.3:1.5
   setCut(true);setView({pos:[x,y+2.3,9.5],tgt:[x,y-.2,z],id:'room'})}
  setSel(id);shut()}
 const focus=k=>{
  const f=FOCUS[k]
  if(f){setView({pos:f.pos,tgt:f.tgt,id:'focus'});setCut(!!f.cut);if(f.vent)setVent(true);if(f.lights)setLights(true)}
  setSel(k);shut()}

 const hideUpper=view.id==='top'&&plano==='terreo'
 const signMode=view.id==='top'?'plan':!signs?'none':view.id==='room'||view.id==='inner'?'none':view.id==='focus'?'sel':'all'
 useEffect(()=>{const f=()=>{if(window.innerWidth<=760)setOpen(false)};window.addEventListener('resize',f);return()=>window.removeEventListener('resize',f)},[])
 const A_=Math.PI*(hour-6)/12,S=Math.sin(A_),K=winter?{y:.62,z:.55}:{y:.95,z:.12}
 const sunPos=[-22*Math.cos(A_),22*S*K.y+1.5,22*S*K.z],sunI=night?.25:1.7*(.25+.75*S)*(rain?.3:1)
 const idx=ORDER.indexOf(sel)
 const step=d=>focus(ORDER[idx<0?(d>0?0:ORDER.length-1):(idx+d+ORDER.length)%ORDER.length])
 useEffect(()=>{const f=e=>{
  if(e.key==='Escape'){setSel(null);setAbout(false)}
  else if(idx>=0&&(e.key==='ArrowRight'||e.key==='ArrowLeft'))step(e.key==='ArrowRight'?1:-1)}
  window.addEventListener('keydown',f);return()=>window.removeEventListener('keydown',f)},[sel,idx])
 const roomSel=ROOMS.find(r=>r.id===sel),inf=INFO[sel],cat=catOf(sel)
 const accent=roomSel?MOSS:cat?cat.c:MOSS

 return <div className={'app '+(open?'open':'closed')}>
  <aside aria-label="Menu da maquete">
   <header className="brand">
    <Logo/>
    <div><h1>Casa do Futuro 2.0</h1><p>Maquete 3D sustentável</p></div>
    <button className="collapse" aria-label="Recolher menu" onClick={()=>setOpen(false)}>‹</button>
   </header>

   <section>
    <h2>Ponto de vista</h2>
    <div className="seg" role="group" aria-label="Ponto de vista">
     {VIEW_BTNS.map(([id,n])=><button key={id} aria-pressed={view.id===id||(id==='inner'&&view.id==='room')} onClick={()=>go(id)}>{n}</button>)}
    </div>
    {view.id==='top'&&<div className="seg two" role="group" aria-label="Andar da planta"><button aria-pressed={plano==='cima'} onClick={()=>setPlano('cima')}>Andar de cima</button><button aria-pressed={plano==='terreo'} onClick={()=>setPlano('terreo')}>Térreo</button></div>}
   </section>

   <section>
    <h2>Ambiente</h2>
    <div className="switches">
     <Switch on={lights} fn={()=>setLights(!lights)} label="Luzes acesas" hint="Lâmpadas LED da casa e do jardim"/>
     <Switch on={night} fn={()=>setNight(!night)} label="Modo noite" hint="Mostra a casa depois do pôr do sol"/>
     <Switch on={cut} fn={()=>setCut(!cut)} label="Ver por dentro" hint="Deixa as paredes da frente transparentes"/>
     <Switch on={vent} fn={()=>setVent(!vent)} label="Ventilação" hint="Setas do vento atravessando a casa"/>
     <Switch on={rain} fn={()=>setRain(!rain)} label="Chuva" hint="A calha leva a água até a cisterna"/>
     <Switch on={winter} fn={()=>setWinter(!winter)} label="Sol de inverno" hint="Sol mais baixo: veja o que o beiral deixa entrar"/>
     <Switch on={signs} fn={()=>setSigns(!signs)} label="Mostrar placas" hint="Textos flutuando sobre cada item"/>
     <label className="hour"><span>Hora do dia <b>{night?'noite':hour+'h'}</b></span><input type="range" min="6" max="18" step="1" value={hour} disabled={night} onChange={e=>setHour(+e.target.value)}/></label>
    </div>
   </section>

   <section>
    <h2>Cômodos</h2>
    {[1,0].map(f=><div className="floor" key={f}>
     <h3>{f?'Andar de cima':'Térreo'}</h3>
     <ul className="rooms">{ROOMS.filter(r=>r.f===f).map(r=><li key={r.id}>
      <button aria-pressed={sel===r.id} onClick={()=>pick(r.id)}><i style={{background:r.c}} aria-hidden="true"/>{r.n}</button></li>)}</ul>
    </div>)}
   </section>

   <section>
    <h2>Sustentabilidade</h2>
    {CATS.map(k=><div className="cat" key={k.id} style={{'--c':k.c}}>
     <h3><i aria-hidden="true"/>{k.n}</h3>
     <div className="chips">{k.items.map(i=><button key={i} aria-pressed={sel===i} onClick={()=>focus(i)}>{INFO[i][0]}</button>)}</div>
    </div>)}
   </section>

   <footer>
    <button className="solid" onClick={()=>focus(ORDER[0])}>Apresentar os {ORDER.length} itens</button>
    <button className="ghost" onClick={reset}>Voltar ao início</button>
    {MOSTRAR_SOBRE&&<button className="ghost" onClick={()=>setAbout(true)}>Sobre o projeto</button>}
    {MOSTRAR_COMO_USAR&&<details>
     <summary>Como usar</summary>
     <p>Arraste para girar, role para aproximar e use o botão direito (ou dois dedos) para mover. Clique nos cômodos, painéis solares, caixa d’água, lixeiras e composteira, ou escolha tudo por este menu. Esc fecha o quadro de informações e as setas ← → passam de um item para o outro.</p>
    </details>}
   </footer>
  </aside>

  <main>
   {!open&&<button className="tog" aria-label="Abrir menu" onClick={()=>setOpen(true)}><svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>Menu</button>}
   <div className="compass" title="Fachada principal voltada para o norte"><div id="compass-n"><b>N</b><svg viewBox="0 0 30 30" aria-hidden="true"><path d="M15 2 21 17H9Z" fill="#c0392b"/><path d="M15 28 9 17h12Z" fill="#9aa5a0"/></svg></div></div>
   <div className="stage" ref={stage}>
   <Canvas eventSource={stage} aria-label="Maquete 3D da Casa do Futuro 2.0" shadows dpr={[1,1.75]} camera={{position:VIEWS.home.pos,fov:40,near:.1,far:200}}>
    <Ctx.Provider value={{lights,night,cut,vent,sel,pick,focus,signMode,hideUpper,plano,roofOn:!(cut&&view.id==='top')&&!hideUpper}}>
     <color attach="background" args={[night?'#0a1018':rain?'#9aa6ad':'#e6ebe8']}/>
     <hemisphereLight args={[night?'#4a5a88':'#ffffff','#667',night?.35:rain?.6:.8]}/>
     <directionalLight position={sunPos} intensity={sunI} color={night?'#9db4ff':S<.35?'#ffd7a8':'#fff4e0'} castShadow shadow-mapSize={[2048,2048]} shadow-camera-left={-16} shadow-camera-right={16} shadow-camera-top={16} shadow-camera-bottom={-16} shadow-bias={-.0004}/>
     <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.62,0]} receiveShadow><planeGeometry args={[200,200]}/><meshStandardMaterial color={night?'#161c24':'#d3d9d4'}/></mesh>
     <House/>
     {rain&&<Rain/>}
    </Ctx.Provider>
    <OrbitControls ref={ctl} makeDefault enableDamping target={VIEWS.home.tgt} minDistance={2} maxDistance={45} maxPolarAngle={Math.PI/2.02}/>
    <Rig view={view} ctl={ctl}/>
    <Compass ctl={ctl}/>
   </Canvas>
   </div>
   {(roomSel||inf)&&<section className="panel" key={sel} style={{'--c':accent}} aria-live="polite">
    <button className="x" aria-label="Fechar" onClick={()=>setSel(null)}>×</button>
    <span className="tag">{roomSel?(roomSel.f?'Andar de cima':'Térreo'):cat.n}</span>
    <h3>{roomSel?roomSel.n:inf[0]}</h3>
    {roomSel?<><p>{roomSel.d}</p><ul>{roomSel.i.map(i=><li key={i}>{i}</li>)}</ul></>:<p>{inf[1]}</p>}
    {!roomSel&&inf[3]&&<p className="num sci"><b>Conceito científico</b>{inf[3]}</p>}
    {!roomSel&&inf[2]&&<p className="num"><b>Em números (estimativa)</b>{inf[2]}</p>}
    {idx>=0&&<div className="nav"><button onClick={()=>step(-1)}>‹ Anterior</button><span>{idx+1} de {ORDER.length}</span><button onClick={()=>step(1)}>Próximo ›</button></div>}
   </section>}
  </main>
  {MOSTRAR_SOBRE&&about&&<div className="modal" onClick={()=>setAbout(false)}><div className="card" role="dialog" aria-modal="true" aria-label="Sobre o projeto" onClick={e=>e.stopPropagation()}>
   <button className="x" aria-label="Fechar" onClick={()=>setAbout(false)}>×</button>
   <h2>{PROJETO.titulo}</h2>
   {GRUPO.length>0&&<p><b>Integrantes:</b> {GRUPO.join(', ')}</p>}
   <p><b>Objetivo:</b> {PROJETO.objetivo}</p>
   <p><b>Metodologia:</b> {PROJETO.metodologia}</p>
   <p><b>Produto final:</b> {PROJETO.produto}</p>
   <p><b>Orientação solar:</b> {PROJETO.orientacao}</p>
   <h3>Cômodos exigidos</h3>
   <p className="ok">{ROOMS.map(r=>r.n).join(' · ')}</p>
   <h3>Elementos obrigatórios e extras</h3>
   {CATS.map(k=><p key={k.id} className="ok" style={{'--c':k.c}}><b>{k.n}:</b> {k.items.map(i=>INFO[i][0]).join(', ')}</p>)}
  </div></div>}</div>}
