import {useMemo,useRef} from 'react'
import {useFrame} from '@react-three/fiber'
import * as THREE from 'three'
const N=700
const spawn=p=>{p.x=-16+Math.random()*32;p.y=14;p.z=-12+Math.random()*28}
// Chuva: gotas caem no jardim; sobre a casa elas "batem" no telhado (y=5,6)
export default function Rain(){
 const ref=useRef(),d=useMemo(()=>new THREE.Object3D(),[])
 const drops=useMemo(()=>Array.from({length:N},()=>({x:-16+Math.random()*32,y:Math.random()*14,z:-12+Math.random()*28,v:12+Math.random()*5})),[])
 useFrame((_,dt)=>{const m=ref.current;if(!m)return
  const s=Math.min(dt,.05)
  drops.forEach((p,i)=>{p.y-=p.v*s
   const roofed=p.x>-5.7&&p.x<4.7&&p.z>-4.8&&p.z<1.8
   if(p.y<(roofed?5.6:-.5))spawn(p)
   d.position.set(p.x,p.y,p.z);d.updateMatrix();m.setMatrixAt(i,d.matrix)})
  m.instanceMatrix.needsUpdate=true})
 return <instancedMesh ref={ref} args={[null,null,N]} frustumCulled={false}><boxGeometry args={[.012,.55,.012]}/><meshBasicMaterial color="#8fb3e8" transparent opacity={.55}/></instancedMesh>}
