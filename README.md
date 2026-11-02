# Casa do Futuro 2.0 — maquete 3D interativa
Requisitos: Node.js 18+.
```
npm install
npm run dev      # abre no navegador (http://localhost:5173)
npm run build    # gera a pasta dist/ pronta para hospedar (Netlify, GitHub Pages...)
```
Sem chaves de API e sem modelos externos: toda a geometria é gerada em código (src/House.jsx).
As fontes ficam dentro do projeto, então funciona sem internet.

## Onde mexer
- `src/data.js`: cômodos, textos de cada item, grupos (Energia, Água, Resíduos, Conforto térmico) e para onde a câmera voa ao escolher um item.
- `src/App.jsx`: menu lateral e controles de câmera.
- `src/House.jsx`: a casa, o jardim e o sistema de água.
- `src/styles.css`: cores e visual do menu.
