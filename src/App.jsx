import { useState, useEffect } from "react";

const C = {
  bg:          "#f8f9fb",
  bgAlt:       "#f0f4f8",
  bgCard:      "#ffffff",
  borderLight: "#dde8f0",
  borderMid:   "#b8d0e0",
  blue1:       "#c8dff0",
  blue2:       "#8fbfd8",
  blue3:       "#5a9cbd",
  green1:      "#c8e6d8",
  green2:      "#8fc4a8",
  green3:      "#5a9e82",
  gold:        "#c8b87a",
  text1:       "#2c3d4f",
  text2:       "#607080",
  text3:       "#99aab8",
  shadow:      "rgba(90,156,189,0.14)",
};

const SKILLS = [
  { id:"Hélicoptère", glyph:"🚁", name:"Hélicoptère",  accent:C.blue3,  accentLight:C.blue1,  image:"/img/image.png", desc:"Découvrez l’île autrement grâce à nos tours en hélicoptère. Survolez des paysages spectaculaires, admirez les lagons, les falaises et les sites naturels emblématiques depuis le ciel. Une expérience unique qui vous offre une vue panoramique inoubliable et vous permet de découvrir la beauté du territoire sous un angle exceptionnel !" },
  { id:"Expeditions",     glyph:"⛰️", name:"Expeditions",    accent:C.green3, accentLight:C.green1, image:"/img/image.jpg", desc:"Partez à l’aventure avec nos expéditions à La Réunion et explorez les merveilles cachées de l’île. Découvrez les impressionnants tunnels de lave, traversez des paysages volcaniques uniques et plongez au cœur d’une nature sauvage et préservée. Encadrées par des guides passionnés, ces explorations offrent une expérience immersive et authentique pour les amoureux de découverte et d’aventure !" },
  { id:"plongée",  glyph:"🤿", name:"plongée",  accent:C.blue2,  accentLight:C.blue1,  image:"/img/plong.jpg", desc:"Explorez les fonds marins exceptionnels de La Réunion lors d’une sortie en plongée. Accompagné de moniteurs certifiés, découvrez un monde sous-marin riche en coraux, poissons tropicaux et paysages marins spectaculaires. Une expérience unique pour observer la biodiversité de l’océan Indien et vivre un moment inoubliable sous l’eau !" },
  { id:"VTT",   glyph:"🚲", name:"VTT",   accent:C.green2, accentLight:C.green1, image:"/img/en-tete6.jpg", desc:"Partez à l’aventure en VTT à La Réunion et découvrez l’île à travers ses sentiers spectaculaires. Entre forêts, montagnes et panoramas sur l’océan, profitez d’itinéraires adaptés à tous les niveaux pour explorer des paysages uniques. Une activité idéale pour les amateurs de sport, de nature et de sensations en plein air !" },
  { id:"Aquatique", glyph:"🌊", name:"Aquatique",   accent:C.gold,   accentLight:"#f0ebd0", image:"/img/sortie-bateaux.jpg", desc:"Embarquez pour une sortie en bateau au large de La Réunion et partez à la découverte de la faune marine. Selon la saison, observez les majestueuses baleines, les dauphins ou admirez simplement les magnifiques paysages de l’île depuis l’océan. Une expérience unique pour profiter de la mer et vivre un moment inoubliable au cœur de l’océan Indien !" },
  {id:"Parapente", glyph:"🪂", name:"Parapente",  accent:C.blue3,  accentLight:C.blue1,  image:"/img/parapante.jpg", desc:"Prenez de la hauteur et découvrez La Réunion autrement avec une sortie en parapente. Accompagné d’un moniteur expérimenté, survolez les paysages spectaculaires de l’île, entre océan, falaises et montagnes. Une expérience aérienne unique qui allie sensations fortes et panoramas à couper le souffle !" },
  {id:"Canyoning", glyph:"🏞️", name:"Canyoning",  accent:C.blue3,  accentLight:C.blue1,  image:"/img/reunion-canoyning-2.jpg", desc:"Vivez une aventure inoubliable avec une sortie en canyoning à La Réunion. Entre cascades, toboggans naturels et descentes en rappel, explorez des paysages spectaculaires au cœur des rivières et des gorges de l’île. Encadrée par des guides professionnels, cette activité allie sensations fortes, nature et découverte dans un cadre exceptionnel !" },
  {id:"Musée", glyph:"🏛️", name:"Musée",  accent:C.blue3,  accentLight:C.blue1,  image:"/img/musee.jpg", desc:"Partez à la découverte des musées de La Réunion et plongez dans l’histoire, la culture et les traditions de l’île. À travers des expositions passionnantes, explorez le patrimoine réunionnais, l’histoire du volcan, la culture créole et la richesse naturelle du territoire. Une activité idéale pour apprendre et comprendre l’identité unique de l’île !" },
  {id:"Commerce artisanal",  glyph:"🛒", name:"Commerce artisanal",  accent:C.blue3,  accentLight:C.blue1,  image:"/img/marché.jpg", desc:"Partez à la rencontre des artisans locaux et découvrez le savoir-faire unique de La Réunion. Dans ces commerces artisanaux, explorez des créations authentiques : bijoux, objets en bois, produits locaux et spécialités créoles. Une expérience idéale pour soutenir les producteurs locaux et repartir avec un souvenir original de l’île !" },
];

const AMOUNTS = [2, 5, 10, 20];

// ─── Breakpoints ──────────────────────────────────────────────────────────────
// xl  ≥ 1600   (1920×1080, grands écrans)
// lg  1280–1599 (laptops 14–15")
// md  1024–1279 (petits laptops / grandes tablettes)
// sm  600–1023  (tablettes)
// xs  < 600     (mobile)
function useBreakpoint() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1920);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  if (w >= 1600) return "xl";
  if (w >= 1280) return "lg";
  if (w >= 1024) return "md";
  if (w >= 600)  return "sm";
  return "xs";
}

const S = {
  // Taille des cartes carousel
  cardW:   { xl:340, lg:290, md:250, sm:210, xs:175 },
  cardH:   { xl:490, lg:410, md:360, sm:305, xs:265 },
  spacing: { xl:440, lg:370, md:320, sm:250, xs:195 },
  // Carousel height
  carH:    { xl:600, lg:510, md:450, sm:370, xs:300 },
  // Glyphe / typo carte
  glyph:   { xl:110, lg:92, md:80, sm:68, xs:58 },
  glyFont: { xl:46, lg:38, md:33, sm:28, xs:23 },
  cName:   { xl:38, lg:32, md:28, sm:23, xs:19 },
  cLabel:  { xl:14, lg:12, md:11, sm:10, xs:9 },
  cSub:    { xl:15, lg:13, md:12, sm:11, xs:10 },
  // Chevron
  chevW:   { xl:96, lg:82, md:70, sm:56, xs:42 },
  chevSvg: { xl:60, lg:50, md:44, sm:36, xs:28 },
  // Titre principal
  titleMin:{ xl:88, lg:70, md:60, sm:42, xs:34 },
  titleMax:{ xl:140, lg:112, md:96, sm:68, xs:52 },
  // Detail page max-width
  detailW: { xl:1060, lg:900, md:780, sm:680, xs:"100%" },
  // Info block image width
  infoImg: { xl:300, lg:260, md:220, sm:200, xs:"100%" },
};

function v(key, bp) { return S[key][bp]; }

// ─── TipBlock ─────────────────────────────────────────────────────────────────
function TipBlock({ skill, bp }) {
  const [selected, setSelected] = useState(5);
  const [custom,   setCustom]   = useState("");
  const [done,     setDone]     = useState(false);

  const finalAmount = custom !== "" ? parseFloat(custom) || 0 : selected;
  const isXs = bp === "xs";
  const pad  = isXs ? "24px 20px 28px" : bp === "xl" ? "44px 44px 48px" : "32px 32px 36px";
  const h3   = bp === "xl" ? 30 : bp === "lg" ? 26 : bp === "xs" ? 20 : 24;

  return (
    <div style={{ background:C.bgCard, borderRadius:20, border:`1px solid ${C.borderLight}`, padding:pad, boxShadow:`0 8px 40px ${C.shadow}` }}>
      {done ? (
        <div style={{ textAlign:"center", padding:"24px 0" }}>
          <div style={{ width:72, height:72, borderRadius:"50%", margin:"0 auto 20px", background:`linear-gradient(135deg,${C.green1},${C.bgAlt})`, border:`1px solid ${C.green2}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:32 }}>🌿</div>
          <p style={{ fontSize:10, letterSpacing:"0.22em", color:C.text3, textTransform:"uppercase", marginBottom:8 }}>Merci infiniment</p>
          <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:h3+2, fontWeight:600, fontStyle:"italic", color:C.text1, marginBottom:12 }}>Don de {finalAmount} € reçu</h3>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:bp==="xl"?17:15, color:C.text2, lineHeight:1.7, maxWidth:400, margin:"0 auto 28px" }}>Votre générosité contribue directement à notre mission. Chaque geste compte.</p>
          <div style={{ height:1, background:`linear-gradient(90deg,transparent,${C.borderMid},transparent)`, marginBottom:24 }} />
          <button onClick={() => { setDone(false); setCustom(""); setSelected(5); }}
            style={{ padding:"10px 28px", borderRadius:10, border:`1.5px solid ${C.borderMid}`, background:"transparent", color:C.text2, fontFamily:"'Cormorant Garamond',serif", fontSize:14, letterSpacing:"0.1em", cursor:"pointer" }}
            onMouseEnter={e=>e.currentTarget.style.borderColor=C.green3}
            onMouseLeave={e=>e.currentTarget.style.borderColor=C.borderMid}
          >Faire un autre don</button>
        </div>
      ) : (
        <>
          <div style={{ marginBottom:bp==="xl"?28:22 }}>
            <p style={{ fontSize:10, letterSpacing:"0.22em", color:C.text3, textTransform:"uppercase", marginBottom:7 }}>Soutenir l'association</p>
            <h3 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:h3, fontWeight:600, color:C.text1, marginBottom:12 }}>Laisser un pourboire</h3>
            <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:bp==="xl"?16:bp==="xs"?13:14, color:C.text2, lineHeight:1.8 }}>Votre soutien nous permet de continuer notre travail. Choisissez un montant ou entrez le vôtre.</p>
          </div>

          <div style={{ display:"flex", gap:12, marginBottom:18, flexWrap:"wrap" }}>
            {AMOUNTS.map(amt => {
              const isActive = custom === "" && selected === amt;
              return (
                <button key={amt} onClick={() => { setSelected(amt); setCustom(""); }}
                  style={{ flex:"1 1 60px", padding:bp==="xl"?"16px 0":"12px 0", borderRadius:12, border:`1.5px solid ${isActive?skill.accent:C.borderLight}`, background:isActive?skill.accentLight:"transparent", color:isActive?skill.accent:C.text2, fontFamily:"'Cormorant Garamond',serif", fontSize:bp==="xl"?22:18, fontWeight:600, letterSpacing:"0.04em", cursor:"pointer", transition:"all .18s" }}
                  onMouseEnter={e=>{ if(!isActive) e.currentTarget.style.borderColor=skill.accent; }}
                  onMouseLeave={e=>{ if(!isActive) e.currentTarget.style.borderColor=C.borderLight; }}
                >{amt} €</button>
              );
            })}
          </div>

          <div style={{ marginBottom:bp==="xl"?28:22 }}>
            <div style={{ display:"flex", alignItems:"center", border:`1.5px solid ${custom?skill.accent:C.borderLight}`, borderRadius:12, background:C.bgAlt, overflow:"hidden", transition:"border-color .18s" }}>
              <span style={{ padding:"0 16px", fontSize:bp==="xl"?18:16, color:C.text3, fontFamily:"'Cormorant Garamond',serif", userSelect:"none" }}>€</span>
              <input type="number" min="1" placeholder="Autre montant" value={custom}
                onChange={e=>setCustom(e.target.value)}
                onFocus={e=>e.target.parentElement.style.borderColor=skill.accent}
                onBlur={e=>e.target.parentElement.style.borderColor=custom?skill.accent:C.borderLight}
                style={{ flex:1, border:"none", background:"transparent", padding:bp==="xl"?"16px 14px 16px 0":"13px 12px 13px 0", fontFamily:"'Cormorant Garamond',serif", fontSize:bp==="xl"?18:16, color:C.text1, outline:"none" }}
              />
            </div>
          </div>

          <div style={{ height:1, background:`linear-gradient(90deg,transparent,${C.borderLight},transparent)`, marginBottom:bp==="xl"?28:22 }} />

          <button onClick={() => { if(finalAmount>0) setDone(true); }} disabled={finalAmount<=0}
            style={{ width:"100%", padding:bp==="xl"?"18px 0":"15px 0", borderRadius:14, border:"none", background:finalAmount>0?`linear-gradient(135deg,${skill.accentLight},${skill.accent})`:C.borderLight, color:finalAmount>0?"#fff":C.text3, fontFamily:"'Cormorant Garamond',serif", fontSize:bp==="xl"?19:16, letterSpacing:"0.16em", cursor:finalAmount>0?"pointer":"not-allowed", transition:"all .2s", boxShadow:finalAmount>0?`0 6px 24px ${skill.accent}33`:"none" }}
            onMouseEnter={e=>{ if(finalAmount>0) e.currentTarget.style.boxShadow=`0 10px 36px ${skill.accent}55`; }}
            onMouseLeave={e=>{ if(finalAmount>0) e.currentTarget.style.boxShadow=`0 6px 24px ${skill.accent}33`; }}
          >{finalAmount>0?`Donner ${finalAmount} €`:"Choisir un montant"}</button>

          <p style={{ textAlign:"center", fontFamily:"'Cormorant Garamond',serif", fontSize:11, color:C.text3, marginTop:16, letterSpacing:"0.1em" }}>🔒 &nbsp; Paiement sécurisé · 100% reversé à l'association</p>
        </>
      )}
    </div>
  );
}

// ─── Page détail ──────────────────────────────────────────────────────────────
function DetailPage({ skill, onBack, bp }) {
  const maxW    = v("detailW", bp);
  const px      = bp === "xs" ? "0 16px" : bp === "xl" ? "0 40px" : "0 28px";
  const imgW    = v("infoImg", bp);
  const isXs    = bp === "xs";
  const infoDir = isXs ? "column" : "row";
  const imgH    = isXs ? 200 : "100%";
  const h2size  = bp==="xl"?40:bp==="lg"?34:bp==="md"?30:bp==="sm"?26:22;
  const descSize= bp==="xl"?17:bp==="xs"?13:15;

  return (
    <div style={{ position:"relative", zIndex:10, width:"100%", display:"flex", flexDirection:"column", alignItems:"center", paddingTop:bp==="xs"?24:bp==="xl"?52:36, paddingBottom:80 }}>

      {/* Retour */}
      <div style={{ width:"100%", maxWidth:maxW, padding:`0 ${isXs?"16px":bp==="xl"?"40px":"28px"} ${bp==="xl"?32:22}px` }}>
        <button onClick={onBack}
          style={{ display:"flex", alignItems:"center", gap:8, background:"transparent", border:"none", cursor:"pointer", fontFamily:"'Cormorant Garamond',serif", fontSize:bp==="xl"?16:13, color:C.text3, letterSpacing:"0.1em", transition:"color .2s" }}
          onMouseEnter={e=>e.currentTarget.style.color=C.text1}
          onMouseLeave={e=>e.currentTarget.style.color=C.text3}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M19 12H5M5 12l7-7M5 12l7 7"/></svg>
          Retour
        </button>
      </div>

      {/* Titre page */}
      <div style={{ width:"100%", maxWidth:maxW, padding:`0 ${isXs?"16px":bp==="xl"?"40px":"28px"} ${bp==="xl"?32:24}px`, textAlign:"center" }}>
        <p style={{ fontSize:bp==="xl"?11:9, letterSpacing:"0.38em", color:C.text3, textTransform:"uppercase", marginBottom:10 }}>✦ &nbsp; {skill.name} &nbsp; ✦</p>
        <div style={{ height:1, width:bp==="xl"?220:160, margin:"0 auto", background:`linear-gradient(90deg,transparent,${C.borderMid},transparent)` }} />
      </div>

      <div style={{ width:"100%", maxWidth:maxW, padding:px, display:"flex", flexDirection:"column", gap:bp==="xl"?28:20 }}>

        {/* Info */}
        <div style={{ display:"flex", flexDirection:infoDir, background:C.bgCard, borderRadius:22, border:`1px solid ${C.borderLight}`, overflow:"hidden", boxShadow:`0 12px 56px ${C.shadow}` }}>
          <div style={{ width:imgW, flexShrink:0, position:"relative", minHeight:isXs?imgH:bp==="xl"?260:200 }}>
            <img src={skill.image} alt={skill.name} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", minHeight:isXs?imgH:bp==="xl"?260:200 }} />
            {!isXs && <div style={{ position:"absolute", inset:0, background:`linear-gradient(to right,transparent 55%,${C.bgCard})` }} />}
            {isXs  && <div style={{ position:"absolute", inset:0, background:`linear-gradient(to bottom,transparent 55%,${C.bgCard})` }} />}
          </div>
          <div style={{ padding:isXs?"16px 20px 24px":bp==="xl"?"40px 44px 40px 16px":"28px 32px 28px 14px", display:"flex", flexDirection:"column", justifyContent:"center", gap:bp==="xl"?18:12 }}>
            <div>
              <p style={{ fontSize:10, letterSpacing:"0.22em", color:C.text3, textTransform:"uppercase", marginBottom:8 }}>Discipline</p>
              <h2 style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:h2size, fontWeight:600, fontStyle:"italic", color:C.text1, marginBottom:12 }}>{skill.name}</h2>
              <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:descSize, color:C.text2, lineHeight:1.75 }}>{skill.desc}</p>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            </div>
          </div>
        </div>

        {/* Pourboire */}
        <TipBlock skill={skill} bp={bp} />
      </div>
    </div>
  );
}

// ─── Carousel card ────────────────────────────────────────────────────────────
function SkillCard({ skill, idx, offset, onShift, onOpen, bp }) {
  const spacing = v("spacing", bp);
  const cardW   = v("cardW",   bp);
  const cardH   = v("cardH",   bp);
  const gs      = v("glyph",   bp);
  const gf      = v("glyFont", bp);
  const cn      = v("cName",   bp);
  const cl      = v("cLabel",  bp);
  const cs      = v("cSub",    bp);

  const getY = o => {
    const d = bp==="xl"?[90,44,40,120]:bp==="lg"?[76,38,34,104]:bp==="md"?[66,32,28,90]:bp==="sm"?[54,24,22,72]:[42,18,16,56];
    return o===0?-d[0]:Math.abs(o)===1?-d[1]:Math.abs(o)===2?d[2]:d[3];
  };
  const rotX = Math.abs(offset)===3?-12:Math.abs(offset)===2?-8:Math.abs(offset)===1?-4:0;
  const sc   = offset===0?1.08:0.84;
  const op   = offset===0?1:Math.abs(offset)>=3?0:Math.abs(offset)===2?0.18:0.50;
  const filt = offset===0?"none":"brightness(0.85) blur(1.5px) saturate(0.65)";
  const z    = offset===0?20:10-Math.abs(offset);
  const gap  = bp==="xl"?26:bp==="lg"?22:18;
  const pad  = bp==="xl"?"44px 36px":bp==="lg"?"38px 32px":"28px 22px";

  return (
    <div style={{ position:"absolute", transform:`translateX(${offset*spacing}px) translateY(${getY(offset)}px) rotateX(${rotX}deg) scale(${sc})`, opacity:op, zIndex:z, filter:filt, cursor:offset!==0?"pointer":"default", transition:"all 500ms cubic-bezier(.4,0,.2,1)" }}
      onClick={() => offset!==0 && onShift(offset)}>
      <div style={{ width:cardW, height:cardH, borderRadius:28, background:C.bgCard, border:`1.5px solid ${offset===0?skill.accent:C.borderLight}`, boxShadow:offset===0?`0 40px 90px ${C.shadow},0 0 0 1px ${skill.accentLight}`:`0 6px 24px rgba(44,61,79,.05)`, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap, padding:pad, position:"relative", transition:"all 500ms cubic-bezier(.4,0,.2,1)" }}>
        <div style={{ position:"absolute", top:0, left:"18%", right:"18%", height:4, borderRadius:"0 0 6px 6px", background:`linear-gradient(90deg,${skill.accentLight},${skill.accent},${skill.accentLight})` }} />
        <div style={{ width:gs, height:gs, borderRadius:"50%", background:`linear-gradient(135deg,${skill.accentLight},${C.bgAlt})`, border:`1px solid ${skill.accent}28`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:gf, color:skill.accent, fontFamily:"serif", boxShadow:`0 4px 20px ${skill.accent}22` }}>{skill.glyph}</div>
        <div style={{ textAlign:"center" }}>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:cl, letterSpacing:"0.2em", color:C.text3, textTransform:"uppercase", marginBottom:7 }}>Discipline</p>
          <p style={{ fontFamily:"'Cormorant Garamond',serif", fontSize:cn, fontWeight:600, color:C.text1, letterSpacing:"0.03em" }}>{skill.name}</p>
        </div>
        <div style={{ width:"100%" }}>
        </div>
        {offset===0 && (
          <button
            style={{ width:"100%", padding:bp==="xl"?"16px 0":bp==="lg"?"14px 0":"11px 0", borderRadius:14, border:`1.5px solid ${skill.accent}`, background:"transparent", color:skill.accent, fontFamily:"'Cormorant Garamond',serif", fontSize:bp==="xl"?17:bp==="lg"?15:13, letterSpacing:"0.16em", cursor:"pointer", transition:"all .2s" }}
            onMouseEnter={e=>{e.currentTarget.style.background=skill.accent;e.currentTarget.style.color="#fff";}}
            onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=skill.accent;}}
            onClick={e=>{e.stopPropagation();onOpen(skill);}}
          >Commencer</button>
        )}
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const bp = useBreakpoint();
  const [selIdx,    setSelIdx]    = useState(0);
  const [dragging,  setDragging]  = useState(false);
  const [dragX,     setDragX]     = useState(0);
  const [openSkill, setOpenSkill] = useState(null);

  const dragStart = x => { setDragging(true); setDragX(x); };
  const dragMove  = x => { if(!dragging) return; if(Math.abs(dragX-x)>=60){ setSelIdx(p=>dragX-x>0?p+1:p-1); setDragging(false); }};
  const dragEnd   = () => setDragging(false);

  const items = Array.from({length:7},(_,i)=>{
    const offset=i-3;
    let di=(selIdx+offset)%SKILLS.length; if(di<0)di+=SKILLS.length;
    return{...SKILLS[di],originalIdx:di,offset,key:selIdx+offset};
  });

  const carH  = v("carH",  bp);
  const chevW = v("chevW", bp);
  const chevS = v("chevSvg", bp);
  const tMin  = v("titleMin", bp);
  const tMax  = v("titleMax", bp);
  const mt    = bp==="xl"?56:bp==="xs"?22:40;
  const mb    = bp==="xl"?60:bp==="xs"?26:44;
  const subFs = bp==="xl"?14:bp==="xs"?10:12;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        input[type=number]::-webkit-inner-spin-button,
        input[type=number]::-webkit-outer-spin-button{-webkit-appearance:none;}
        @keyframes fadeUp   {from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes slideIn  {from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:translateX(0)}}
        @keyframes chevFloat{0%,100%{opacity:.45}50%{opacity:.82}}
        .fu  {animation:fadeUp   .78s ease both;}
        .si  {animation:slideIn  .44s cubic-bezier(.4,0,.2,1) both;}
        .chev{animation:chevFloat 2.8s ease-in-out infinite;}
        html,body,#root{width:100vw !important;max-width:100vw !important;margin:0 !important;padding:0 !important;overflow-x:hidden;}
        body>div,#root>div{width:100vw !important;max-width:100vw !important;}
      `}</style>

      <div style={{ minHeight:"100vh", width:"100vw", maxWidth:"100vw", display:"flex", flexDirection:"column", alignItems:"center", background:C.bg, fontFamily:"'Cormorant Garamond',serif", position:"relative", overflowX:"hidden" }}>

        {/* Barres couleur */}
        <div style={{ position:"absolute", top:0, left:0, right:0, height:bp==="xl"?4:3, background:`linear-gradient(90deg,transparent,${C.blue2},${C.green2},${C.blue2},transparent)` }} />
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:bp==="xl"?3:2, background:`linear-gradient(90deg,transparent,${C.green2},${C.blue2},${C.green2},transparent)`, zIndex:5 }} />

        {/* Blobs */}
        <div style={{ position:"absolute", top:"-12%", right:"-8%", width:bp==="xl"?800:500, height:bp==="xl"?800:500, borderRadius:"50%", background:`radial-gradient(circle,${C.blue1}48,transparent 68%)`, pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-14%", left:"-6%", width:bp==="xl"?740:480, height:bp==="xl"?740:480, borderRadius:"50%", background:`radial-gradient(circle,${C.green1}38,transparent 68%)`, pointerEvents:"none" }} />

        {openSkill ? (
          <div className="si" style={{ width:"100%" }}>
            <DetailPage skill={openSkill} onBack={() => setOpenSkill(null)} bp={bp} />
          </div>
        ) : (
          <>
            {/* Ornement */}
            <div className="fu" style={{ position:"relative", zIndex:10, marginTop:mt, textAlign:"center" }}>
              <p style={{ fontSize:bp==="xl"?11:9, letterSpacing:"0.40em", color:C.text3, textTransform:"uppercase", marginBottom:8 }}>✦ &nbsp; Epitech &nbsp; ✦</p>
              <div style={{ height:1, width:bp==="xl"?260:200, margin:"0 auto", background:`linear-gradient(90deg,transparent,${C.borderMid},transparent)` }} />
            </div>

            {/* Titre */}
            <h1 className="fu" style={{ position:"relative", zIndex:10, fontSize:`clamp(${tMin}px,7.5vw,${tMax}px)`, fontWeight:600, fontStyle:"italic", color:C.text1, letterSpacing:"0.04em", marginTop:bp==="xl"?20:16, marginBottom:10, textShadow:`0 2px 32px rgba(91,156,189,.14)`, animationDelay:".1s", textAlign:"center", padding:"0 20px" }}>Starf</h1>

            {/* Sous-titre */}
            <p className="fu" style={{ position:"relative", zIndex:10, fontSize:subFs, letterSpacing:"0.30em", color:C.text3, textTransform:"uppercase", marginBottom:mb, animationDelay:".18s", textAlign:"center" }}>Excellence &amp; Raffinement</p>

            {/* Carousel */}
            <div style={{ position:"relative", width:"100%", zIndex:10, height:carH }}>
              <button className="chev" onClick={()=>setSelIdx(p=>p-1)}
                style={{ position:"absolute", left:0, top:0, height:"100%", width:chevW, border:"none", background:`linear-gradient(to right,rgba(240,244,248,.88),transparent)`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:30 }}>
                <svg width={chevS} height={carH} viewBox="0 0 60 450">
                  <path d="M 50 25 Q 15 225 50 425" stroke={C.blue2} strokeWidth={bp==="xl"?"7":"5.5"} fill="none" strokeLinecap="round"/>
                </svg>
              </button>
              <button className="chev" onClick={()=>setSelIdx(p=>p+1)}
                style={{ position:"absolute", right:0, top:0, height:"100%", width:chevW, border:"none", background:`linear-gradient(to left,rgba(240,244,248,.88),transparent)`, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", zIndex:30 }}>
                <svg width={chevS} height={carH} viewBox="0 0 60 450">
                  <path d="M 10 25 Q 45 225 10 425" stroke={C.blue2} strokeWidth={bp==="xl"?"7":"5.5"} fill="none" strokeLinecap="round"/>
                </svg>
              </button>

              <div style={{ position:"relative", width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", perspective:"1200px", cursor:dragging?"grabbing":"grab" }}
                onMouseDown={e=>dragStart(e.clientX)} onMouseMove={e=>dragMove(e.clientX)} onMouseUp={dragEnd} onMouseLeave={dragEnd}
                onTouchStart={e=>dragStart(e.touches[0].clientX)}
                onTouchMove={e=>{e.preventDefault();dragMove(e.touches[0].clientX);}}
                onTouchEnd={dragEnd}
              >
                {items.map(item=>(
                  <SkillCard key={item.key} skill={item} idx={item.originalIdx} offset={item.offset}
                    onShift={o=>setSelIdx(p=>p+o)} onOpen={setOpenSkill} bp={bp} />
                ))}
              </div>
            </div>

            {/* Hint */}
            <div className="fu" style={{ position:"relative", zIndex:10, textAlign:"center", marginTop:bp==="xl"?36:bp==="xs"?16:28, marginBottom:bp==="xl"?48:bp==="xs"?24:36, animationDelay:".25s" }}>
              <div style={{ height:1, width:bp==="xl"?180:140, margin:"0 auto 10px", background:`linear-gradient(90deg,transparent,${C.borderMid},transparent)` }} />
              <p style={{ fontSize:bp==="xl"?10:9, letterSpacing:"0.32em", color:C.text3, textTransform:"uppercase" }}>Glisser pour naviguer</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}