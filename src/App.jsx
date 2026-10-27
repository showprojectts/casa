import {useEffect,useRef,useState} from 'react'
import {Canvas,useFrame,useThree} from '@react-three/fiber'
import {OrbitControls} from '@react-three/drei'
import * as THREE from 'three'
import House,{Ctx} from './House'
import {ROOMS,INFO} from './data'

const VIEWS={
 home:{pos:[15,10.5,17],tgt:[0,1.5,-1]},
 top:{pos:[-.5,27,2.5],tgt:[-.5,0,-1]},
 front:{pos:[0,3.6,23],tgt:[0,2.6,0]},
 inner:{pos:[-1,2.6,9],tgt:[-1,1.6,-2]}}

function Rig({view,ctl}){
 const {camera}=useThree(),go=useRef(false)
 useEffect(()=>{go.current=true},[view])
 useEffect(()=>{const c=ctl.current;if(!c)return;const f=()=>{go.current=false};c.addEventListener('start',f);return()=>c.removeEventListener('start',f)},[ctl])
 useFrame((_,d)=>{const c=ctl.current;if(!c||!go.current)return
  const k=1-Math.pow(.003,d),P=new THREE.Vector3(...view.pos)
  camera.position.lerp(P,k);c.target.lerp(new THREE.Vector3(...view.tgt),k);c.update()
  if(camera.position.distanceTo(P)<.05)go.current=false})
 return null}

export default function App(){
 const [view,setView]=useState({...VIEWS.home,id:'home'})
 const [lights,setLights]=useState(true),[night,setNight]=useState(false),[cut,setCut]=useState(false),[vent,setVent]=useState(false)
 const [sel,setSel]=useState(null),ctl=useRef()
 const [open,setOpen]=useState(()=>window.innerWidth>760)
 const shut=()=>{if(window.innerWidth<=760)setOpen(false)}
 const go=id=>{setView({...VIEWS[id],id});setCut(id==='top'||id==='inner');setSel(null);shut()}
 const pick=id=>{
  const r=ROOMS.find(q=>q.id===id)
  if(r){const x=(r.x[0]+r.x[1])/2,z=(r.z[0]+r.z[1])/2,y=r.f?4.3:1.5
   setCut(true);setView({pos:[x,y+1.3,9],tgt:[x,y-.3,z],id:'room'})}
  setSel(id);shut()}
 const roomSel=ROOMS.find(r=>r.id===sel),inf=INFO[sel]
 const Btn=({on,fn,children})=><button className={on?'on':''} aria-pressed={on} onClick={fn}>{children}</button>
 return <div className={'app '+(open?'open':'closed')}>
  <button className="tog" aria-label={open?'Recolher menu':'Abrir menu'} onClick={()=>setOpen(!open)}>{open?'‹ Recolher':'☰ Menu'}</button>
  <aside>
   <h1>CASA DO FUTURO <span>2.0</span></h1>
   <p className="sub">Tecnologia, sustentabilidade e conforto para um amanhã melhor</p>
   <h2>Câmera</h2>
   <div className="grid"><Btn on={view.id==='home'} fn={()=>go('home')}>Vista 3/4</Btn><Btn on={view.id==='top'} fn={()=>go('top')}>Vista superior</Btn><Btn on={view.id==='front'} fn={()=>go('front')}>Vista frontal</Btn><Btn on={view.id==='inner'||view.id==='room'} fn={()=>go('inner')}>Vista interna</Btn></div>
   <button className="reset" onClick={()=>{go('home');setLights(true);setNight(false);setVent(false)}}>Resetar tudo</button>
   <h2>Ambiente</h2>
   <div className="grid"><Btn on={lights} fn={()=>setLights(!lights)}>{lights?'Luzes ligadas':'Luzes desligadas'}</Btn><Btn on={night} fn={()=>setNight(!night)}>{night?'Noite':'Dia'}</Btn>
   <Btn on={cut} fn={()=>setCut(!cut)}>Ocultar paredes</Btn><Btn on={vent} fn={()=>setVent(!vent)}>Ventilação</Btn></div>
   <h2>Cômodos</h2>
   <div className="chips">{ROOMS.map(r=><button key={r.id} className={sel===r.id?'on':''} onClick={()=>pick(r.id)}>{r.n}</button>)}</div>
   <h2>Sustentabilidade</h2>
   <div className="chips">{Object.keys(INFO).map(k=><button key={k} className={sel===k?'on':''} onClick={()=>{setSel(k);shut()}}>{INFO[k][0]}</button>)}</div>
   <p className="hint">Arraste para girar, role para zoom, botão direito (ou dois dedos) para mover. Clique nos cômodos, painéis, caixa d’água, lixeiras e composteira.</p>
  </aside>
  <main>
   <Canvas shadows dpr={[1,1.75]} camera={{position:VIEWS.home.pos,fov:40,near:.1,far:200}}>
    <Ctx.Provider value={{lights,night,cut,vent,sel,pick,roofOn:!(cut&&view.id==='top')}}>
     <color attach="background" args={[night?'#0a1018':'#e3e8ea']}/>
     <hemisphereLight args={[night?'#4a5a88':'#ffffff','#667',night?.35:.8]}/>
     <directionalLight position={[10,18,12]} intensity={night?.25:1.7} color={night?'#9db4ff':'#fff4e0'} castShadow shadow-mapSize={[2048,2048]} shadow-camera-left={-16} shadow-camera-right={16} shadow-camera-top={16} shadow-camera-bottom={-16} shadow-bias={-.0004}/>
     <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.62,0]} receiveShadow><planeGeometry args={[200,200]}/><meshStandardMaterial color={night?'#161c24':'#cdd3d6'}/></mesh>
     <House/>
    </Ctx.Provider>
    <OrbitControls ref={ctl} makeDefault enableDamping target={VIEWS.home.tgt} minDistance={2} maxDistance={45} maxPolarAngle={Math.PI/2.02}/>
    <Rig view={view} ctl={ctl}/>
   </Canvas>
   {(roomSel||inf)&&<section className="panel"><button className="x" aria-label="Fechar" onClick={()=>setSel(null)}>×</button>
    <h3>{roomSel?roomSel.n:inf[0]}</h3>
    {roomSel?<><p>{roomSel.d}</p><ul>{roomSel.i.map(i=><li key={i}>{i}</li>)}</ul></>:<p>{inf[1]}</p>}</section>}
  </main></div>}
