import {createContext,useContext,useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import {Html} from '@react-three/drei'
import * as THREE from 'three'
import {ROOMS} from './data'
export const Ctx=createContext({})
const G=.1, WOOD='#9a6a3e', WH='#f4f2ec'
const B=({p,s,c='#fff',e,ei=1,sh=true,mat,...r})=><mesh position={p} castShadow={sh} receiveShadow {...r}><boxGeometry args={s}/><meshStandardMaterial color={c} emissive={e||'#000'} emissiveIntensity={e?ei:0} {...mat}/></mesh>
const Cyl=({p,r,h,c,seg=20,...o})=><mesh position={p} castShadow receiveShadow {...o}><cylinderGeometry args={[r,r,h,seg]}/><meshStandardMaterial color={c}/></mesh>
const Ball=({p,r,c,e})=><mesh position={p} castShadow><sphereGeometry args={[r,10,8]}/><meshStandardMaterial color={c} emissive={e||'#000'} emissiveIntensity={e?1.5:0}/></mesh>
const Pipe=({a,b,r=.07,c='#2563eb'})=>{const A=new THREE.Vector3(...a),Z=new THREE.Vector3(...b),d=Z.clone().sub(A)
 const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),d.clone().normalize())
 return <mesh position={A.clone().add(Z).multiplyScalar(.5).toArray()} quaternion={q} castShadow><cylinderGeometry args={[r,r,d.length(),8]}/><meshStandardMaterial color={c}/></mesh>}
const Chain=({pts,...o})=>pts.slice(1).map((p,i)=><Pipe key={i} a={pts[i]} b={p} {...o}/>)
const Sign=({p,t,id})=>{const {pick}=useContext(Ctx);return <Html position={p} center distanceFactor={13} zIndexRange={[5,0]}><div className="sign" onClick={()=>pick(id)}>{t}</div></Html>}
const Furn=({y,l})=>l.map(([x,z,w,h,d,c,lift=0],i)=><B key={i} p={[x,y+lift+h/2,z]} s={[w,h,d]} c={c}/>)

function Wall({a,b,y,h=2.6,gaps=[],ghost,ext,t=.15}){
 const {lights,night,pick}=useContext(Ctx)
 const [x1,z1]=a,[x2,z2]=b,L=Math.hypot(x2-x1,z2-z1),ang=-Math.atan2(z2-z1,x2-x1)
 const segs=[],gl=[],doors=[];let cur=0
 gaps.forEach(([g0,g1,k])=>{segs.push([cur,g0,0,h]);const bot=k==='w'?.9:0
  if(bot)segs.push([g0,g1,0,bot]);segs.push([g0,g1,2.1,h]);k==='w'?gl.push([g0,g1,bot,2.1]):ext&&doors.push([g0,g1]);cur=g1})
 segs.push([cur,L,0,h])
 const glow=lights||night
 return <group position={[x1,y,z1]} rotation={[0,ang,0]}>
  {segs.filter(s=>s[1]-s[0]>.01).map(([s,e,y0,y1],i)=><B key={i} p={[(s+e)/2,(y0+y1)/2,0]} s={[e-s,y1-y0,t]} c={WH} mat={ghost?{transparent:true,opacity:.1,depthWrite:false}:{}} sh={!ghost}/>)}
  {gl.map(([s,e,y0,y1],i)=><B key={'g'+i} p={[(s+e)/2,(y0+y1)/2,0]} s={[e-s,y1-y0,.04]} c="#a7d8f5" e={glow?'#ffc766':null} ei={night?1.3:.5} sh={false} mat={{transparent:true,opacity:ghost?.12:.4,roughness:.1,metalness:.3,depthWrite:false}} onClick={ext?e=>{e.stopPropagation();pick('windows')}:undefined}/>)}
  {doors.map(([s,e],i)=><B key={'d'+i} p={[(s+e)/2,1.05,0]} s={[e-s,2.1,.08]} c={WOOD}/>)}
 </group>}

function Fence({a,b}){const L=Math.hypot(b[0]-a[0],b[1]-a[1]),ang=-Math.atan2(b[1]-a[1],b[0]-a[0]),n=Math.round(L)
 return <group position={[a[0],G,a[1]]} rotation={[0,ang,0]}>{Array.from({length:n+1},(_,i)=><B key={i} p={[i*L/n,.35,0]} s={[.08,.7,.08]} c={WOOD}/>)}
 <B p={[L/2,.55,0]} s={[L,.06,.04]} c={WOOD}/><B p={[L/2,.25,0]} s={[L,.06,.04]} c={WOOD}/></group>}
const Tree=({p,s=1,lit})=><group position={[p[0],G,p[1]]} scale={s}><Cyl p={[0,.8,0]} r={.12} h={1.6} c="#6b4a2b" seg={8}/>
 <mesh position={[0,2.1,0]} castShadow><icosahedronGeometry args={[1,1]}/><meshStandardMaterial color="#3f8f3a" flatShading/></mesh>
 <mesh position={[.4,2.7,.2]} castShadow><icosahedronGeometry args={[.7,1]}/><meshStandardMaterial color="#58a84a" flatShading/></mesh>
 {lit&&[[.9,2.2,.4],[-.8,1.8,.5],[.2,2.9,.5],[-.3,2.5,.9],[.6,1.5,.8]].map((q,i)=><Ball key={i} p={q} r={.05} c="#ffe9a8" e="#ffd36b"/>)}</group>
const Bush=({p,s=.5,c='#2f7d32'})=><mesh position={[p[0],G+s*.7,p[1]]} castShadow><icosahedronGeometry args={[s,1]}/><meshStandardMaterial color={c} flatShading/></mesh>
const rnd=i=>{const v=Math.sin(i*127.1+311.7)*43758.5453;return v-Math.floor(v)}
const FL=Array.from({length:36},(_,i)=>({p:[-5+rnd(i)*9.5,rnd(i+50)*1.1+1.25],c:['#f43f5e','#facc15','#f472b6','#ffffff','#fb923c'][i%5]}))
const Bed=({p,s,pick})=><group position={[p[0],G,p[1]]} onClick={e=>{e.stopPropagation();pick('horta')}}><B p={[0,.15,0]} s={[s[0],.3,s[1]]} c="#8a6a45"/><B p={[0,.31,0]} s={[s[0]-.2,.04,s[1]-.2]} c="#4a2f1b"/>
 {Array.from({length:Math.floor(s[0]*3)},(_,i)=>[0,1].map(j=><mesh key={i+'-'+j} position={[-s[0]/2+.25+i*.3,.5,(j-.5)*(s[1]-.6)]} castShadow><coneGeometry args={[.12,.4,6]}/><meshStandardMaterial color={['#3fa34d','#6cc24a','#2e8b57','#b7312c'][(i+j)%4]}/></mesh>))}</group>

function Arrows(){const r=useRef(),P=[[-3,1.5],[.5,1.5],[-3.2,4.4],[2,4.4]]
 useFrame(({clock})=>r.current.children.forEach((m,i)=>{m.position.z=2.2-((clock.elapsedTime*.45+(i%3)/3)%1)*7}))
 return <group ref={r}>{P.flatMap(([x,y],k)=>[0,1,2].map(j=><mesh key={k+'-'+j} position={[x,y,0]} rotation={[-Math.PI/2,0,0]}><coneGeometry args={[.15,.5,8]}/><meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={1.2}/></mesh>))}</group>}

export default function House(){
 const {lights,night,cut,vent,sel,pick,roofOn}=useContext(Ctx)
 const glowE=lights?'#fff1c2':null
 const F2=2.9
 return <group>
  {/* base */}
  <B p={[0,-.35,0]} s={[22.8,.5,15.8]} c="#101412"/><B p={[0,-.2,0]} s={[22.9,.05,15.9]} c="#22c55e" sh={false}/>
  <B p={[0,0,0]} s={[22,.2,15]} c="#4c9a3a"/>
  <B p={[0,4.4,-7.6]} s={[22.8,9,.2]} c="#0b0f0c"/><B p={[0,4.4,-7.48]} s={[22.2,8.4,.04]} c="#16a34a" sh={false}/><B p={[0,4.4,-7.44]} s={[21.9,8.1,.04]} c="#0b0f0c" sh={false}/>
  <Html position={[0,7.5,-7.3]} center distanceFactor={14}><div className="backtitle">CASA DO FUTURO <b>2.0</b></div></Html>
  {/* driveway, car, carport */}
  <B p={[-8,G+.02,5]} s={[3.2,.04,5]} c="#3a3d40"/>{[3.4,4.9,6.4].map(z=><B key={z} p={[-8,G+.05,z]} s={[.12,.01,.8]} c="#fff" sh={false}/>)}
  <group position={[-8,G,4.6]}><B p={[0,.45,0]} s={[1.5,.4,3]} c="#f5f5f5"/><B p={[0,.8,-.1]} s={[1.3,.35,1.5]} c="#e5ecf2"/><B p={[0,.82,-.1]} s={[1.32,.22,1.52]} c="#1e293b" sh={false}/>
   {[[-.7,1],[.7,1],[-.7,-1],[.7,-1]].map(([x,z],i)=><Cyl key={i} p={[x,.25,z]} r={.25} h={.2} c="#111" rotation={[0,0,Math.PI/2]}/>)}</group>
  {[[-9.5,2.5],[-6.5,2.5],[-9.5,6.5],[-6.5,6.5]].map((q,i)=><B key={i} p={[q[0],1.6,q[1]]} s={[.15,3.1,.15]} c={WOOD}/>)}
  {[3,4,5,6].map(z=><B key={z} p={[-8,3.2,z]} s={[3.4,.1,.2]} c={WOOD}/>)}
  {/* pergola e varanda */}
  <B p={[-7,G+.03,0]} s={[4,.06,4]} c="#a68a64"/>
  {[[-9,-2],[-9,2]].map((q,i)=><B key={i} p={[q[0],1.6,q[1]]} s={[.15,3.1,.15]} c={WOOD}/>)}
  {[-2,-1,0,1,2].map(z=><B key={z} p={[-7,3.2,z]} s={[4.2,.1,.18]} c={WOOD}/>)}
  <Furn y={G} l={[[-7.5,1.1,2.4,.45,.9,'#c9a27a'],[-7.9,-.3,.9,.45,2,'#c9a27a'],[-7,.2,.9,.35,.9,'#6b4a2b']]}/>
  <Cyl p={[-8.6,.12+G+.7,-1.4]} r={.3} h={1.2} c="#7c5a3a"/><Ball p={[-8.6,2.3,-1.4]} r={.6} c="#3f8f3a"/>
  {/* paredes */}
  {(()=>{const g=cut
   return <>
   <Wall a={[-5,1]} b={[4,1]} y={G} ghost={g} ext gaps={[[.4,2.6,'w'],[3,3.8,'d'],[4.8,6.2,'w'],[7.6,8.4,'w']]}/>
   <Wall a={[-5,-4]} b={[4,-4]} y={G} ext gaps={[[.8,3.2,'w'],[4.8,6.2,'w']]}/>
   <Wall a={[-5,-4]} b={[-5,1]} y={G} ext gaps={[[1.5,3.5,'w']]}/>
   <Wall a={[4,-4]} b={[4,1]} y={G} ext gaps={[[1.8,2.8,'d']]}/>
   <Wall a={[-1,-4]} b={[-1,1]} y={G} gaps={[[.4,1.4,'d']]}/><Wall a={[2,-4]} b={[2,1]} y={G} gaps={[[.4,1.4,'d']]}/>
   <Wall a={[-5,1]} b={[4,1]} y={F2} h={2.5} ghost={g} ext gaps={[[.5,3.2,'w'],[3.7,5.3,'w'],[6,8.5,'w']]}/>
   <Wall a={[-5,-4]} b={[4,-4]} y={F2} h={2.5} ext gaps={[[.8,2.6,'w'],[4,5,'w'],[6,8,'w']]}/>
   <Wall a={[-5,-4]} b={[-5,1]} y={F2} h={2.5} ext gaps={[[1.5,3.5,'w']]}/><Wall a={[4,-4]} b={[4,1]} y={F2} h={2.5} ext gaps={[[1.5,3.5,'w']]}/>
   <Wall a={[-1.5,-4]} b={[-1.5,1]} y={F2} h={2.5} gaps={[[3.6,4.4,'d']]}/><Wall a={[.5,-4]} b={[.5,1]} y={F2} h={2.5} gaps={[[3.6,4.4,'d']]}/>
   <Wall a={[-1.5,-1]} b={[.5,-1]} y={F2} h={2.5} gaps={[[.5,1.3,'d']]}/></>})()}
  {/* lajes e escada */}
  <B p={[-3,2.8,-1.5]} s={[4,.2,5]} c="#e7e5df"/><B p={[-.4,2.8,-2.5]} s={[1.2,.2,3]} c="#e7e5df"/><B p={[2.1,2.8,-1.5]} s={[3.8,.2,5]} c="#e7e5df"/>
  {Array.from({length:9},(_,i)=><B key={i} p={[-.4,G+(i+1)*.15,-2+i*.32+.16]} s={[1.1,(i+1)*.3,.32]} c={WOOD}/>)}
  {/* pisos clicáveis */}
  {ROOMS.map(r=><B key={r.id} p={[(r.x[0]+r.x[1])/2,r.f?F2+.01:G+.01,(r.z[0]+r.z[1])/2]} s={[r.x[1]-r.x[0]-.1,.02,r.z[1]-r.z[0]-.1]} c={r.c} e={sel===r.id?'#4ade80':null} ei={.5} sh={false} onClick={e=>{e.stopPropagation();pick(r.id)}}/>)}
  {/* móveis */}
  <Furn y={G} l={[[-3.4,-1,2.2,.5,.9,'#5b6b7a'],[-3.4,-.5,2.2,.5,.2,'#4a5968',.3],[-3.4,-2.3,1.2,.4,.7,'#a0724a'],[-3.4,-3.7,2,.5,.4,'#3a2a20'],[-3.4,-3.78,1.3,.7,.06,'#111',.95],[-3.4,-1.6,3,.02,2.6,'#e5e7eb',.02],[-4.75,-3.2,.4,1.8,1.2,'#8b5e3c'],
   [.3,-3.6,2.8,.9,.6,'#e5e7eb'],[.3,-3.75,2.8,.7,.35,'#a0724a',1.5],[.7,-3.6,.6,.04,.5,'#111',.9],[-.4,-3.6,.6,.04,.5,'#94a3b8',.9],[1.55,-.9,.7,1.9,.7,'#cbd5e1'],[.9,-2,1,.9,.8,'#8b5e3c'],
   [3.5,-3.4,.7,.9,.7,'#f1f5f9'],[2.6,-3.4,.7,.9,.6,'#cbd5e1'],[3.4,-.8,.5,.6,.5,'#b45309'],[3.85,.3,.3,1.8,1.2,'#8b5e3c']]}/>
  <Cyl p={[3.5,G+.5,-3.04]} r={.2} h={.05} c="#334155" rotation={[Math.PI/2,0,0]}/>
  <Furn y={F2} l={[[-3.8,-2.4,1.6,.5,2,'#e8dcc0'],[-3.8,-3.5,1.2,.15,.4,'#fff',.5],[-1.9,-3.6,1.2,2,.6,'#a0724a'],[-4.6,.3,.7,.75,1.4,'#8b5e3c'],
   [-.7,-3.55,.4,.45,.6,'#fff'],[.1,-3.6,.5,.85,.4,'#f1f5f9'],[2.6,-2.4,1.6,.5,2,'#e8dcc0'],[2.6,-3.5,1.2,.15,.4,'#fff',.5],[3.6,0,.6,2,1.4,'#a0724a'],[1.2,-3.6,1.2,.75,.6,'#8b5e3c']]}/>
  <B p={[-.7,F2+.65,-3.85]} s={[.4,.4,.2]} c="#f8fafc" onClick={e=>{e.stopPropagation();pick('desc')}}/><B p={[-.7,F2+.87,-3.74]} s={[.12,.03,.1]} c="#22c55e" e="#22c55e"/><B p={[-.5,F2+.87,-3.74]} s={[.06,.03,.1]} c="#22c55e" e="#22c55e"/>
  <B p={[-1,F2+1,-1.6]} s={[.9,2,.9]} c="#bae6fd" sh={false} mat={{transparent:true,opacity:.3,depthWrite:false}}/>
  {ROOMS.map(r=>{const x=(r.x[0]+r.x[1])/2,z=(r.z[0]+r.z[1])/2,y=(r.f?F2:G)+2.3
   return <group key={r.id}><Ball p={[x,y,z]} r={.1} c="#fff" e={glowE}/>{lights&&<pointLight position={[x,y-.2,z]} intensity={night?9:4} distance={7} color="#ffd9a0"/>}</group>})}
  {/* sacada, beirais, brise */}
  <B p={[-3,2.84,1.6]} s={[4,.12,1.2]} c={WOOD}/><B p={[-3,3.25,2.15]} s={[4,.5,.3]} c="#7c5a3a"/>
  {[-4.8,-4,-3.2,-2.4,-1.8].map((x,i)=><mesh key={i} position={[x,3.55,2.15]}><icosahedronGeometry args={[.3,1]}/><meshStandardMaterial color="#3f8f3a" flatShading/></mesh>)}
  <B p={[1.2,2.85,1.45]} s={[5.6,.14,.9]} c={WOOD} onClick={e=>{e.stopPropagation();pick('shade')}}/>
  {[-4.6,-3.8,-3,-2.2].map(x=><B key={x} p={[x,5.0,1.1]} s={[.07,.5,.5]} c={WOOD}/>)}
  <B p={[-4.9,4.1,1.08]} s={[.12,2.5,.12]} c={WOOD}/><B p={[-1.3,4.1,1.08]} s={[.12,2.5,.12]} c={WOOD}/>
  {/* telhado e painéis */}
  <group visible={roofOn}>
   <B p={[-.5,5.52,-1.5]} s={[10.4,.25,6.6]} c="#1f2327" onClick={e=>{e.stopPropagation();pick('shade')}}/>
   {[-3.3,-.5,2.3].flatMap(x=>[-2.8,-.7].map(z=><B key={x+'_'+z} p={[x,5.75,z]} s={[2.5,.06,1.7]} c="#1d4ed8" rotation={[-.12,0,0]} mat={{metalness:.7,roughness:.2}} onClick={e=>{e.stopPropagation();pick('solar')}}/>))}
   <B p={[4.75,5.4,-1.5]} s={[.18,.15,6.4]} c="#9ca3af"/>
  </group>
  {/* sistema de água */}
  <Chain pts={[[4.75,5.3,-3.5],[4.75,3.95,-3.5],[6,3.95,-3.5],[6,3.95,-2.2],[6,3.75,-2.2]]}/>
  <B p={[6,1.3,-2.2]} s={[1.6,2.4,1.6]} c={WH}/>
  <Cyl p={[6,3.1,-2.2]} r={.8} h={1.2} c="#1d4ed8" onClick={e=>{e.stopPropagation();pick('tank')}}/><Cyl p={[6,3.8,-2.2]} r={.82} h={.12} c="#1e40af"/>
  <Cyl p={[6,G+.7,-.3]} r={.5} h={1.4} c="#8b97a1" onClick={e=>{e.stopPropagation();pick('tank')}}/>
  <Chain pts={[[6.8,3,-2.2],[7.2,3,-2.2],[7.2,.35,-2.2],[7.2,.35,3.6],[7.2,.5,3.6],[.2,.5,3.6]]}/><Pipe a={[6.5,.6,-.3]} b={[7.2,.6,-.3]}/>
  {[1.2,3.9].map(x=><Bed key={x} p={[x,3.6]} s={[2.4,1.5]} pick={pick}/>)}<Bed p={[8.7,1.6]} s={[2.8,1.6]} pick={pick}/><Chain pts={[[7.2,.5,1.6],[8.9,.5,1.6]]} r={.05}/>
  {[0.4,1.2,2,2.8,3.6,4.4,5.2].map((x,i)=><Cyl key={i} p={[x,.38,3.6]} r={.03} h={.2} c="#60a5fa" seg={6}/>)}
  {/* lixeiras e composteira */}
  {[['#1d4ed8','PAPEL'],['#dc2626','PLÁSTICO'],['#16a34a','VIDRO'],['#facc15','METAL']].map(([c,n],i)=>{const x=6.4+i*1.15
   return <group key={n} onClick={e=>{e.stopPropagation();pick('bins')}}><B p={[x,G+.5,5.8]} s={[.8,1,.8]} c={c}/><B p={[x,G+1.05,5.8]} s={[.9,.1,.9]} c={c}/><Html position={[x,G+.55,6.22]} center distanceFactor={9}><div className="binlabel">{n}</div></Html></group>})}
  <group onClick={e=>{e.stopPropagation();pick('compost')}}><B p={[8.8,G+.6,-4]} s={[2,1.2,1.6]} c="#a47a4a"/><B p={[8.8,G+1.2,-4]} s={[1.7,.08,1.3]} c="#4a2f1b"/>
   {[[8.4,-4.2,'#e11d48'],[9,-3.8,'#f59e0b'],[8.9,-4.3,'#84cc16'],[8.2,-3.8,'#a16207']].map(([x,z,c],i)=><Ball key={i} p={[x,G+1.28,z]} r={.1} c={c}/>)}</group>
  {/* caminho, jardim, cercas */}
  {[2,3,4,5,6,7].map(z=><B key={z} p={[-1.6,G+.03,z]} s={[1.3,.06,.75]} c="#d6d3cd"/>)}
  {FL.map((f,i)=><Ball key={i} p={[f.p[0],G+.25,f.p[1]]} r={.08} c={f.c}/>)}
  {[[-5.6,1.8],[-4.2,2.2],[0,1.7],[1.5,2],[3.5,2],[-6,-3.5],[-5.7,-6],[3,-6],[5,-5.5],[10,3.5],[10,6.5],[-10,6.5],[-4,5.5],[-3,6]].map((p,i)=><Bush key={i} p={p} s={.35+rnd(i)*.3} c={i%3?'#2f7d32':'#4d9a45'}/>)}
  <Tree p={[-3.8,4.6]} s={.9} lit/><Tree p={[-10,-4]} s={1.3}/><Tree p={[-1,-6]} s={1.2}/><Tree p={[2.5,-6.3]} s={1.4}/><Tree p={[10,-1]} s={1.1}/><Tree p={[5,7]} s={.8}/>
  <Fence a={[-10.6,7.2]} b={[-9.6,7.2]}/><Fence a={[-6.4,7.2]} b={[10.6,7.2]}/><Fence a={[-10.6,-7]} b={[-10.6,7.2]}/><Fence a={[10.6,-7]} b={[10.6,7.2]}/>
  {[[-5.6,1.5,'#ffd36b'],[-1,6.5,'#ffd36b']].map(([x,z],i)=><group key={i}><B p={[x,G+.7,z]} s={[.08,1.4,.08]} c="#222"/><Ball p={[x,G+1.5,z]} r={.14} c="#fff" e={lights?'#ffd36b':null}/>{lights&&<pointLight position={[x,G+1.5,z]} intensity={night?7:2} distance={6} color="#ffd9a0"/>}</group>)}
  {vent&&<Arrows/>}
  <Sign p={[-.5,7.1,-1.5]} t="Painéis solares (energia limpa)" id="solar"/>
  <Sign p={[-8.5,4,0]} t="Iluminação natural (luz do sol)" id="windows"/>
  <Sign p={[6,5.1,-2.2]} t="Captação de chuva (reuso da água)" id="tank"/>
  <Sign p={[4.4,1.5,3.6]} t="Reuso da água (lavagem e irrigação)" id="horta"/>
  <Sign p={[-.4,4.6,1.6]} t="Descarte econômico (água)" id="desc"/>
  <Sign p={[8.2,2.3,5.8]} t="Lixeira seletiva (reciclagem)" id="bins"/>
  <Sign p={[8.8,2.7,-4]} t="Compostagem (resíduos orgânicos)" id="compost"/>
  <Sign p={[2.2,6.4,1.6]} t="Janelas (ventilação cruzada)" id="vent"/>
  <Sign p={[1.2,2.3,2.2]} t="Beirais (sombreamento)" id="shade"/>
  <Sign p={[-3.8,4.9,4.6]} t="Vegetação (conforto térmico)" id="plants"/>
 </group>}
