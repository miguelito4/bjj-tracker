"use client";
import { supabase } from "@/lib/supabase";
import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import {
  Home, BookOpen, BarChart3, Plus, X, Search, Pin, PinOff,
  ChevronDown, ChevronRight, Clock, Flame, ArrowLeft,
  Shield, Target, RefreshCw, ArrowDownCircle, Unlock, Lock,
  Crosshair, ArrowRightCircle, Check, Trash2, Edit3, Zap, Calendar,
  TrendingUp
} from "lucide-react";

/* ─── DATA ─── */
const TECHNIQUES = [
  { id:"t001",name:"Closed Guard Retention",category:"guard",belt:"white",notes:"Hip movement, angle creation, break posture"},
  { id:"t002",name:"Half Guard Underhook",category:"guard",belt:"white",notes:"Get the underhook, come to knees"},
  { id:"t003",name:"De La Riva Guard",category:"guard",belt:"blue",notes:"DLR hook with sleeve and ankle grip"},
  { id:"t004",name:"Spider Guard",category:"guard",belt:"blue",notes:"Bicep control with feet, lasso variations"},
  { id:"t005",name:"Butterfly Guard",category:"guard",belt:"white",notes:"Hooks in, overhook/underhook, elevate"},
  { id:"t006",name:"X-Guard",category:"guard",belt:"purple",notes:"Entry from SLX or butterfly. Sweep by extending"},
  { id:"t007",name:"Rubber Guard",category:"guard",belt:"blue",notes:"Mission control → zombie → gogoplata"},
  { id:"t008",name:"Lasso Guard",category:"guard",belt:"blue",notes:"Deep lasso wrap around bicep"},
  { id:"t009",name:"Single Leg X",category:"guard",belt:"blue",notes:"Inside hook on hip, outside behind knee"},
  { id:"t010",name:"Reverse De La Riva",category:"guard",belt:"purple",notes:"RDLR hook, knee shield, berimbolo entry"},
  { id:"t013",name:"Torreando Pass",category:"passing",belt:"white",notes:"Grip both knees, push to one side, circle"},
  { id:"t014",name:"Knee Slice",category:"passing",belt:"white",notes:"Slide knee through, underhook far arm"},
  { id:"t015",name:"Over/Under Pass",category:"passing",belt:"blue",notes:"One arm over, one under. Pressure walk"},
  { id:"t016",name:"Leg Drag",category:"passing",belt:"blue",notes:"Drag ankle across centerline to hip"},
  { id:"t017",name:"Stack Pass",category:"passing",belt:"white",notes:"Drive legs overhead, walk around"},
  { id:"t018",name:"Long Step Pass",category:"passing",belt:"blue",notes:"Combat base, long step over guard"},
  { id:"t019",name:"Smash Pass",category:"passing",belt:"blue",notes:"Crossface + shoulder pressure"},
  { id:"t020",name:"Body Lock Pass",category:"passing",belt:"purple",notes:"Lock hands around waist, hip switch"},
  { id:"t021",name:"Rear Naked Choke",category:"submissions",belt:"white",notes:"Choking arm under chin, squeeze elbows"},
  { id:"t022",name:"Armbar from Guard",category:"submissions",belt:"white",notes:"Control wrist, hip up, leg over face"},
  { id:"t023",name:"Triangle Choke",category:"submissions",belt:"white",notes:"One arm in one out, figure-four legs"},
  { id:"t024",name:"Guillotine",category:"submissions",belt:"white",notes:"Chin strap grip, close guard, hip up"},
  { id:"t025",name:"Kimura",category:"submissions",belt:"white",notes:"Figure-four on wrist. Paintbrush behind back"},
  { id:"t026",name:"Americana",category:"submissions",belt:"white",notes:"Figure-four grip, push wrist to mat"},
  { id:"t027",name:"Ezekiel Choke",category:"submissions",belt:"blue",notes:"Sleeve grip, thread hand under chin"},
  { id:"t028",name:"Cross Collar Choke",category:"submissions",belt:"white",notes:"Deep collar grips, palms up, pull down"},
  { id:"t029",name:"Brabo Choke",category:"submissions",belt:"blue",notes:"Arm triangle from front headlock"},
  { id:"t069",name:"Head and Arm Triangle",category:"submissions",belt:"white",notes:"Arm triangle from side control. Lock figure-four, squeeze"},
  { id:"t030",name:"Anaconda Choke",category:"submissions",belt:"blue",notes:"Opposite threading. Gator roll"},
  { id:"t031",name:"North-South Choke",category:"submissions",belt:"blue",notes:"Wrap arm around neck, drop hip, squeeze"},
  { id:"t032",name:"Omoplata",category:"submissions",belt:"blue",notes:"Shoulder lock using legs. Sit up, lean"},
  { id:"t033",name:"Inside Heel Hook",category:"submissions",belt:"purple",notes:"Ashi garami, grip heel, rotate. Dangerous"},
  { id:"t034",name:"Outside Heel Hook",category:"submissions",belt:"purple",notes:"From 50/50, external rotation"},
  { id:"t035",name:"Straight Ankle Lock",category:"submissions",belt:"white",notes:"Wrist on Achilles, arch back"},
  { id:"t036",name:"Bow & Arrow Choke",category:"submissions",belt:"blue",notes:"From back, collar + far knee. Extend"},
  { id:"t041",name:"Scissor Sweep",category:"sweeps",belt:"white",notes:"Shin across belly, kick and pull"},
  { id:"t042",name:"Hip Bump Sweep",category:"sweeps",belt:"white",notes:"Post on hand, bump hips into opponent"},
  { id:"t043",name:"Pendulum Sweep",category:"sweeps",belt:"white",notes:"Underhook leg, swing pendulum, roll"},
  { id:"t044",name:"Butterfly Sweep",category:"sweeps",belt:"white",notes:"Overhook + underhook, elevate with hook"},
  { id:"t045",name:"Berimbolo",category:"sweeps",belt:"purple",notes:"Invert from DLR, roll under, take back"},
  { id:"t047",name:"Double Leg",category:"takedowns",belt:"white",notes:"Level change, penetration step, drive"},
  { id:"t048",name:"Single Leg",category:"takedowns",belt:"white",notes:"Grab one leg, head on chest side"},
  { id:"t049",name:"Osoto Gari",category:"takedowns",belt:"white",notes:"Reap outside leg, drive upper body back"},
  { id:"t050",name:"Arm Drag to Back",category:"takedowns",belt:"white",notes:"2-on-1 grip, yank arm, circle to back"},
  { id:"t052",name:"Seoi Nage",category:"takedowns",belt:"blue",notes:"Turn in, load onto back, throw over shoulder"},
  { id:"t054",name:"Bridge & Roll",category:"escapes",belt:"white",notes:"Trap arm + foot, bridge and roll"},
  { id:"t055",name:"Elbow-Knee Escape",category:"escapes",belt:"white",notes:"Frame, hip escape, insert knee"},
  { id:"t056",name:"Side Control Escape",category:"escapes",belt:"white",notes:"Frame neck + hip, shrimp, re-guard"},
  { id:"t057",name:"Back Escape",category:"escapes",belt:"white",notes:"Fight hands, shoulder walk, escape hips"},
  { id:"t059",name:"Side Control",category:"control",belt:"white",notes:"Underhook head + far arm, hip pressure"},
  { id:"t060",name:"Mount",category:"control",belt:"white",notes:"High vs low mount, grapevine, posture up"},
  { id:"t061",name:"Knee on Belly",category:"control",belt:"white",notes:"Knee on solar plexus, collar + far knee"},
  { id:"t064",name:"Seat Belt Control",category:"back",belt:"white",notes:"Over-under grip on chest, hooks in"},
  { id:"t065",name:"Body Triangle",category:"back",belt:"blue",notes:"Lock legs in triangle around torso"},
  { id:"t066",name:"Chair Sit Back Take",category:"back",belt:"blue",notes:"From turtle, hook near leg, sit back"},
];

const CATEGORIES = [
  { id:"guard",label:"Guard",icon:Shield,color:"#3b82f6"},
  { id:"passing",label:"Passing",icon:ArrowRightCircle,color:"#10b981"},
  { id:"submissions",label:"Submissions",icon:Target,color:"#ef4444"},
  { id:"sweeps",label:"Sweeps",icon:RefreshCw,color:"#f59e0b"},
  { id:"takedowns",label:"Takedowns",icon:ArrowDownCircle,color:"#8b5cf6"},
  { id:"escapes",label:"Escapes",icon:Unlock,color:"#06b6d4"},
  { id:"control",label:"Control",icon:Lock,color:"#f97316"},
  { id:"back",label:"Back Attacks",icon:Crosshair,color:"#ec4899"},
];

const SESSION_TYPES = ["Gi","No-Gi","Open Mat","Seminar","Drilling","Competition"];
const BELT_COLORS = {white:"#e4e4e7",blue:"#3b82f6",purple:"#8b5cf6",brown:"#92400e",black:"#18181b"};

const genId = () => crypto.randomUUID();
const fmt = (d: string) => new Date(d).toLocaleDateString("en-US",{month:"short",day:"numeric"});
const fmtFull = (d: string) => new Date(d).toLocaleDateString("en-US",{weekday:"short",month:"short",day:"numeric"});

/* ─── COMPONENTS ─── */

function IntensityDots({ level, onChange, size = 28 }: { level: number; onChange?: (n: number) => void; size?: number }) {
  return (
    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
      {[1,2,3,4,5].map(i => (
        <button
          key={i}
          onClick={() => onChange?.(i)}
          style={{
            width:size, height:size, borderRadius:"50%",
            border: i <= level ? "2px solid #3b82f6" : "2px solid #27272a",
            background: i <= level
              ? `rgba(59,130,246,${0.2 + (i/5)*0.6})`
              : "transparent",
            cursor: onChange ? "pointer" : "default",
            transition:"all 0.2s",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}
        >
          {i <= level && <Zap size={size * 0.5} color="#3b82f6" />}
        </button>
      ))}
      <span style={{ fontSize:12, color:"#71717a", marginLeft:4 }}>
        {["","Flow","Light","Moderate","Hard","War"][level]}
      </span>
    </div>
  );
}

function StatCard({ icon:Icon, label, value, sub, accent }: any) {
  return (
    <div style={{
      background:"#18181b", borderRadius:16, padding:"20px 20px",
      border:"1px solid #27272a", flex:1, minWidth:140,
    }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
        <div style={{
          width:32, height:32, borderRadius:10,
          background:`${accent||"#3b82f6"}18`,
          display:"flex", alignItems:"center", justifyContent:"center"
        }}>
          <Icon size={16} color={accent||"#3b82f6"} />
        </div>
        <span style={{ fontSize:12, color:"#71717a", textTransform:"uppercase", letterSpacing:1 }}>{label}</span>
      </div>
      <div style={{ fontSize:28, fontWeight:700, color:"#fafafa", letterSpacing:"-0.02em" }}>{value}</div>
      {sub && <div style={{ fontSize:12, color:"#52525b", marginTop:2 }}>{sub}</div>}
    </div>
  );
}

function QuickLogModal({ open, onClose, onSave, editSession, techniques = TECHNIQUES }: any) {
  const [type, setType] = useState(editSession?.session_type || "");
  const [typeOpen, setTypeOpen] = useState(false);
  const [level, setLevel] = useState(editSession?.intensity_level || 3);
  const [hours, setHours] = useState(editSession?.mat_hours?.toString() || "1.5");
  const [notes, setNotes] = useState(editSession?.notes || "");
  const [date, setDate] = useState(editSession?.session_date || new Date().toISOString().slice(0,10));
  const [techSearch, setTechSearch] = useState("");
  const [selectedTechs, setSelectedTechs] = useState(editSession?.techniques_covered || []);
  const [notesExpanded, setNotesExpanded] = useState(!!editSession?.notes);
  const typeRef = useRef(null);
  const [typeFilter, setTypeFilter] = useState("");

  useEffect(() => {
    if (editSession) {
      setType(editSession.session_type || "");
      setLevel(editSession.intensity_level || 3);
      setHours(editSession.mat_hours?.toString() || "1.5");
      setNotes(editSession.notes || "");
      setDate(editSession.session_date || new Date().toISOString().slice(0,10));
      setSelectedTechs(editSession.techniques_covered || []);
      setNotesExpanded(!!editSession.notes);
    }
  }, [editSession]);

  const filteredTypes = SESSION_TYPES.filter(t =>
    t.toLowerCase().includes(typeFilter.toLowerCase())
  );

  const filteredTechs = techSearch.length > 0
    ? techniques.filter((t: any) => t.name.toLowerCase().includes(techSearch.toLowerCase())).slice(0,6)
    : [];

  const toggleTech = (id: string) => {
    setSelectedTechs((prev: string[]) => prev.includes(id) ? prev.filter((x: string)=>x!==id) : [...prev, id]);
  };

  const handleSave = () => {
    if (!type) return;
    onSave({
      id: editSession?.id || genId(),
      session_date: date,
      session_type: type,
      intensity_level: level,
      mat_hours: parseFloat(hours) || 1.5,
      notes,
      techniques_covered: selectedTechs,
      created_at: editSession?.created_at || new Date().toISOString(),
    });
    setType(""); setLevel(3); setHours("1.5"); setNotes("");
    setDate(new Date().toISOString().slice(0,10));
    setSelectedTechs([]); setTypeFilter(""); setTechSearch("");
    setNotesExpanded(false);
    onClose();
  };

  if (!open) return null;

  return (
    <div style={{
      position:"fixed", inset:0, zIndex:100,
      background:"rgba(0,0,0,0.8)", backdropFilter:"blur(8px)",
      display:"flex", alignItems:"flex-end", justifyContent:"center",
    }} onClick={(e: any)=>{if(e.target===e.currentTarget)onClose()}}>
      <div style={{
        background:"#09090b", borderRadius:"24px 24px 0 0",
        width:"100%", maxWidth:480, maxHeight:"92vh", overflow:"auto",
        border:"1px solid #27272a", borderBottom:"none",
        padding:"24px 20px 20px",
        animation:"slideUp 0.3s ease-out",
      }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
          <h2 style={{ fontSize:20, fontWeight:700, color:"#fafafa", margin:0 }}>
            {editSession ? "Edit Session" : "Log Session"}
          </h2>
          <button onClick={onClose} style={{
            background:"#27272a", border:"none", borderRadius:12,
            width:36, height:36, display:"flex", alignItems:"center",
            justifyContent:"center", cursor:"pointer"
          }}>
            <X size={18} color="#a1a1aa" />
          </button>
        </div>

        {/* Date */}
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:12, color:"#71717a", marginBottom:6, display:"block", textTransform:"uppercase", letterSpacing:1 }}>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e: any) => setDate(e.target.value)}
            style={{
              width:"100%", padding:"12px 14px", borderRadius:12, border:"1px solid #27272a",
              background:"#18181b", color:"#fafafa", fontSize:15, outline:"none",
              colorScheme:"dark", boxSizing:"border-box",
            }}
          />
        </div>

        {/* Session Type Autocomplete */}
        <div style={{ marginBottom:20, position:"relative" }} ref={typeRef}>
          <label style={{ fontSize:12, color:"#71717a", marginBottom:6, display:"block", textTransform:"uppercase", letterSpacing:1 }}>Type</label>
          <div
            onClick={() => setTypeOpen(!typeOpen)}
            style={{
              padding:"12px 14px", borderRadius:12, cursor:"pointer",
              border: typeOpen ? "1px solid #3b82f6" : "1px solid #27272a",
              background:"#18181b", display:"flex", justifyContent:"space-between", alignItems:"center",
            }}
          >
            <span style={{ color: type ? "#fafafa" : "#52525b", fontSize:15 }}>{type || "Select type..."}</span>
            <ChevronDown size={16} color="#71717a" style={{ transform: typeOpen?"rotate(180deg)":"", transition:"0.2s" }} />
          </div>
          {typeOpen && (
            <div style={{
              position:"absolute", top:"100%", left:0, right:0, zIndex:10,
              background:"#18181b", border:"1px solid #27272a", borderRadius:12,
              marginTop:4, overflow:"hidden", boxShadow:"0 8px 32px rgba(0,0,0,0.5)"
            }}>
              <input
                autoFocus
                placeholder="Search..."
                value={typeFilter}
                onChange={(e: any) => setTypeFilter(e.target.value)}
                style={{
                  width:"100%", padding:"10px 14px", border:"none",
                  borderBottom:"1px solid #27272a", background:"transparent",
                  color:"#fafafa", fontSize:14, outline:"none", boxSizing:"border-box",
                }}
              />
              {filteredTypes.map(t => (
                <div
                  key={t}
                  onClick={() => { setType(t); setTypeOpen(false); setTypeFilter(""); }}
                  style={{
                    padding:"10px 14px", cursor:"pointer", fontSize:14,
                    color: type === t ? "#3b82f6" : "#d4d4d8",
                    background: type === t ? "#3b82f618" : "transparent",
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                  }}
                >
                  {t}
                  {type === t && <Check size={14} color="#3b82f6" />}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Intensity */}
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:12, color:"#71717a", marginBottom:8, display:"block", textTransform:"uppercase", letterSpacing:1 }}>Intensity</label>
          <IntensityDots level={level} onChange={setLevel} />
        </div>

        {/* Mat Hours */}
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:12, color:"#71717a", marginBottom:6, display:"block", textTransform:"uppercase", letterSpacing:1 }}>Mat Hours</label>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {[0.5, 1.0, 1.5, 2.0].map(h => (
              <button
                key={h}
                onClick={() => setHours(h.toString())}
                style={{
                  flex:1, padding:"10px 0", borderRadius:10, border:"none",
                  background: parseFloat(hours)===h ? "#3b82f6" : "#18181b",
                  color: parseFloat(hours)===h ? "#fff" : "#a1a1aa",
                  fontSize:14, fontWeight:600, cursor:"pointer",
                  transition:"all 0.15s",
                }}
              >
                {h}h
              </button>
            ))}
            <input
              type="number"
              step="0.5"
              min="0.5"
              max="12"
              value={hours}
              onChange={(e: any) => setHours(e.target.value)}
              style={{
                width:64, padding:"10px 8px", borderRadius:10, textAlign:"center",
                border:"1px solid #27272a", background:"#18181b",
                color:"#fafafa", fontSize:14, outline:"none",
              }}
            />
          </div>
        </div>

        {/* Techniques */}
        <div style={{ marginBottom:20 }}>
          <label style={{ fontSize:12, color:"#71717a", marginBottom:6, display:"block", textTransform:"uppercase", letterSpacing:1 }}>Techniques Covered</label>
          <div style={{ position:"relative" }}>
            <Search size={14} color="#52525b" style={{ position:"absolute", left:12, top:13 }} />
            <input
              placeholder="Search techniques..."
              value={techSearch}
              onChange={(e: any) => setTechSearch(e.target.value)}
              style={{
                width:"100%", padding:"10px 14px 10px 34px", borderRadius:12,
                border:"1px solid #27272a", background:"#18181b",
                color:"#fafafa", fontSize:14, outline:"none", boxSizing:"border-box",
              }}
            />
          </div>
          {filteredTechs.length > 0 && (
            <div style={{
              background:"#18181b", border:"1px solid #27272a", borderRadius:12,
              marginTop:4, overflow:"hidden",
            }}>
              {filteredTechs.map((t: any) => (
                <div
                  key={t.id}
                  onClick={() => { toggleTech(t.id); setTechSearch(""); }}
                  style={{
                    padding:"8px 14px", cursor:"pointer", fontSize:13,
                    color: selectedTechs.includes(t.id) ? "#3b82f6" : "#d4d4d8",
                    display:"flex", alignItems:"center", justifyContent:"space-between",
                  }}
                >
                  <span>{t.name}</span>
                  <span style={{ fontSize:11, color:"#52525b" }}>{t.category}</span>
                </div>
              ))}
            </div>
          )}
          {selectedTechs.length > 0 && (
            <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginTop:8 }}>
              {selectedTechs.map((id: string) => {
                const t = techniques.find((x: any)=>x.id===id);
                if (!t) return null;
                const cat = CATEGORIES.find(c=>c.id===t.category);
                return (
                  <span key={id} onClick={() => toggleTech(id)} style={{
                    padding:"4px 10px", borderRadius:8, fontSize:12, cursor:"pointer",
                    background:`${cat?.color||"#3b82f6"}20`, color:cat?.color||"#3b82f6",
                    border:`1px solid ${cat?.color||"#3b82f6"}40`,
                    display:"flex", alignItems:"center", gap:4,
                  }}>
                    {t.name} <X size={10} />
                  </span>
                );
              })}
            </div>
          )}
        </div>

        {/* Notes */}
        <div style={{ marginBottom:24 }}>
          <button
            onClick={() => setNotesExpanded(!notesExpanded)}
            style={{
              background:"none", border:"none", cursor:"pointer", padding:0,
              display:"flex", alignItems:"center", gap:6, color:"#71717a", fontSize:12,
              textTransform:"uppercase", letterSpacing:1,
            }}
          >
            <Edit3 size={12} /> Rolling Notes
            <ChevronRight size={12} style={{ transform:notesExpanded?"rotate(90deg)":"",transition:"0.2s" }} />
          </button>
          {notesExpanded && (
            <textarea
              placeholder="What I learned today... What to work on next..."
              value={notes}
              onChange={(e: any) => setNotes(e.target.value)}
              rows={4}
              style={{
                width:"100%", padding:"12px 14px", borderRadius:12, marginTop:8,
                border:"1px solid #27272a", background:"#18181b",
                color:"#fafafa", fontSize:14, outline:"none", resize:"vertical",
                lineHeight:1.6, fontFamily:"inherit", boxSizing:"border-box",
              }}
            />
          )}
        </div>

        {/* Submit */}
        <button onClick={handleSave} style={{
          width:"100%", padding:"14px", borderRadius:14, border:"none",
          background: type ? "#3b82f6" : "#27272a",
          color: type ? "#fff" : "#52525b",
          fontSize:16, fontWeight:600, cursor: type ? "pointer" : "not-allowed",
          transition:"all 0.2s",
        }}>
          {editSession ? "Update Session" : "Log Session"}
        </button>
      </div>
    </div>
  );
}

/* ─── PAGES ─── */

function DashboardPage({ sessions, pinnedTechs, techniques = TECHNIQUES, onUnpin, onOpenLog, onEditSession, onDeleteSession }: any) {
  const totalHours = useMemo(() => sessions.reduce((s: number,x: any)=>s+x.mat_hours,0), [sessions]);
  const now = new Date();
  const thisMonth = sessions.filter((s: any) => {
    const d = new Date(s.session_date);
    return d.getMonth()===now.getMonth() && d.getFullYear()===now.getFullYear();
  });
  const monthHours = thisMonth.reduce((s: number,x: any)=>s+x.mat_hours,0);
  const monthSessions = thisMonth.length;
  const avgIntensity = sessions.length > 0
    ? (sessions.reduce((s: number,x: any)=>s+x.intensity_level,0)/sessions.length).toFixed(1) : "0";

  const weeklyData = useMemo(() => {
    const weeks: any[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - (i * 7));
      weeks.push({
        weekStart: d,
        week: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        sessions: 0,
        hours: 0,
      });
    }
    sessions.forEach((s: any) => {
      const [y, m, d] = s.session_date.split("-").map(Number);
      const sd = new Date(y, m - 1, d);
      const weekStart = new Date(y, m - 1, d - sd.getDay());
      for (const w of weeks) {
        if (weekStart.getTime() === w.weekStart.getTime()) {
          w.sessions++;
          w.hours += s.mat_hours;
          break;
        }
      }
    });
    return weeks;
  }, [sessions]);

  const pinned = techniques.filter((t: any) => pinnedTechs.includes(t.id));

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom:28 }}>
        <p style={{ fontSize:13, color:"#52525b", margin:"0 0 2px", textTransform:"uppercase", letterSpacing:1.5 }}>BJJ Tracker</p>
        <h1 style={{ fontSize:26, fontWeight:800, color:"#fafafa", margin:0, letterSpacing:"-0.03em" }}>Dashboard</h1>
      </div>

      {/* Stats */}
      <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
        <StatCard icon={Clock} label="Total Hours" value={totalHours.toFixed(1)} sub="All time" accent="#3b82f6" />
        <StatCard icon={Calendar} label="This Month" value={monthHours.toFixed(1)} sub={`${monthSessions} sessions`} accent="#10b981" />
        <StatCard icon={Flame} label="Avg Intensity" value={avgIntensity} sub="Out of 5" accent="#f59e0b" />
      </div>

      {/* Consistency Chart */}
      <div style={{
        background:"#18181b", borderRadius:16, padding:"18px 16px",
        border:"1px solid #27272a", marginBottom:24,
      }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
          <TrendingUp size={14} color="#3b82f6" />
          <span style={{ fontSize:13, fontWeight:600, color:"#a1a1aa", textTransform:"uppercase", letterSpacing:1 }}>Weekly Consistency</span>
        </div>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={weeklyData} barSize={20}>
            <XAxis dataKey="week" tick={{ fill:"#52525b", fontSize:11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill:"#52525b", fontSize:11 }} axisLine={false} tickLine={false} width={20} allowDecimals={false} domain={[0,"dataMax+1"]} />
            <Tooltip
              cursor={false}
              contentStyle={{ background:"#27272a", border:"1px solid #3f3f46", borderRadius:10, fontSize:13 }}
              labelStyle={{ color:"#a1a1aa" }}
              itemStyle={{ color:"#fafafa" }}
            />
            <Bar dataKey="sessions" radius={[6,6,0,0]}>
              {(weeklyData as any[]).map((entry: any, i: number) => (
                <Cell key={i} fill={entry.sessions > 0 ? "#3b82f6" : "#27272a"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pinned Techniques */}
      {pinned.length > 0 && (
        <div style={{ marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:12 }}>
            <Pin size={13} color="#f59e0b" />
            <span style={{ fontSize:13, fontWeight:600, color:"#a1a1aa", textTransform:"uppercase", letterSpacing:1 }}>Focus Techniques</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
            {pinned.map((t: any) => (
              <div key={t.id} style={{
                background:"#18181b", borderRadius:12, padding:"12px 14px",
                border:"1px solid #27272a", display:"flex", justifyContent:"space-between",
                alignItems:"center",
              }}>
                <div>
                  <div style={{ fontSize:14, fontWeight:600, color:"#fafafa" }}>{t.name}</div>
                  <div style={{ fontSize:12, color:"#52525b", marginTop:2 }}>{t.notes}</div>
                </div>
                <button onClick={()=>onUnpin(t.id)} style={{
                  background:"none", border:"none", cursor:"pointer", padding:4,
                }}>
                  <PinOff size={14} color="#f59e0b" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Sessions */}
      <div>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#a1a1aa", textTransform:"uppercase", letterSpacing:1 }}>Recent Sessions</span>
        </div>
        {sessions.length === 0 && (
          <div style={{ textAlign:"center", padding:40, color:"#52525b" }}>
            <Clock size={32} style={{ marginBottom:8, opacity:0.3 }} />
            <p style={{ margin:0 }}>No sessions yet. Hit + to log your first!</p>
          </div>
        )}
        <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
          {sessions.slice(0,8).map((s: any) => {
            const typeColors: any = {
              "Gi":"#3b82f6","No-Gi":"#10b981","Open Mat":"#8b5cf6",
              "Seminar":"#f59e0b","Drilling":"#06b6d4","Competition":"#ef4444"
            };
            return (
              <div key={s.id} style={{
                background:"#18181b", borderRadius:14, padding:"14px 16px",
                border:"1px solid #27272a",
                borderLeft:`3px solid ${typeColors[s.session_type]||"#3b82f6"}`,
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                      <span style={{
                        fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:6,
                        background:`${typeColors[s.session_type]||"#3b82f6"}20`,
                        color:typeColors[s.session_type]||"#3b82f6",
                      }}>{s.session_type}</span>
                      <span style={{ fontSize:12, color:"#52525b" }}>{fmtFull(s.session_date)}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", gap:12, marginTop:6 }}>
                      <span style={{ fontSize:13, color:"#a1a1aa", display:"flex", alignItems:"center", gap:4 }}>
                        <Clock size={12} /> {s.mat_hours}h
                      </span>
                      <IntensityDots level={s.intensity_level} size={14} />
                    </div>
                    {s.notes && (
                      <p style={{ fontSize:13, color:"#71717a", margin:"8px 0 0", lineHeight:1.5 }}>{s.notes}</p>
                    )}
                  </div>
                  <div style={{ display:"flex", gap:4, marginLeft:8 }}>
                    <button onClick={()=>onEditSession(s)} style={{
                      background:"none", border:"none", cursor:"pointer", padding:4,
                    }}>
                      <Edit3 size={13} color="#52525b" />
                    </button>
                    <button onClick={()=>onDeleteSession(s.id)} style={{
                      background:"none", border:"none", cursor:"pointer", padding:4,
                    }}>
                      <Trash2 size={13} color="#52525b" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LibraryPage({ pinnedTechs, onTogglePin, techniques = TECHNIQUES, onAddTechnique }: any) {
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState<string | null>(null);
  const [expandedTech, setExpandedTech] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [newTech, setNewTech] = useState({ name:"", category:"guard", belt:"white", notes:"" });

  const filtered = useMemo(() => {
    let list = techniques;
    if (activeCat) list = list.filter((t: any) => t.category === activeCat);
    if (search) list = list.filter((t: any) => t.name.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [search, activeCat, techniques]);

  const grouped = useMemo(() => {
    const g: any = {};
    filtered.forEach((t: any) => {
      if (!g[t.category]) g[t.category] = [];
      g[t.category].push(t);
    });
    return g;
  }, [filtered]);

  return (
    <div>
      <div style={{ marginBottom:24 }}>
        <p style={{ fontSize:13, color:"#52525b", margin:"0 0 2px", textTransform:"uppercase", letterSpacing:1.5 }}>BJJ Tracker</p>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <h1 style={{ fontSize:26, fontWeight:800, color:"#fafafa", margin:0, letterSpacing:"-0.03em" }}>Technique Library</h1>
          <button
            onClick={() => setAddOpen(!addOpen)}
            style={{
              width:36, height:36, borderRadius:10, border:"none",
              background: addOpen ? "#27272a" : "#3b82f618",
              cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all 0.2s",
            }}
          >
            {addOpen ? <X size={16} color="#a1a1aa" /> : <Plus size={16} color="#3b82f6" />}
          </button>
        </div>
      </div>

      {/* Add Technique Form */}
      {addOpen && (
        <div style={{
          background:"#18181b", borderRadius:14, padding:16,
          border:"1px solid #27272a", marginBottom:16,
          animation:"slideUp 0.2s ease-out",
        }}>
          <input
            autoFocus
            placeholder="Technique name"
            value={newTech.name}
            onChange={(e: any) => setNewTech((p: any) => ({...p, name:e.target.value}))}
            style={{
              width:"100%", padding:"10px 12px", borderRadius:10, marginBottom:10,
              border:"1px solid #27272a", background:"#09090b",
              color:"#fafafa", fontSize:14, outline:"none", boxSizing:"border-box",
            }}
          />
          <div style={{ display:"flex", gap:8, marginBottom:10 }}>
            <select
              value={newTech.category}
              onChange={(e: any) => setNewTech((p: any) => ({...p, category:e.target.value}))}
              style={{
                flex:1, padding:"8px 10px", borderRadius:10,
                border:"1px solid #27272a", background:"#09090b",
                color:"#fafafa", fontSize:13, outline:"none",
              }}
            >
              {CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
            </select>
            <select
              value={newTech.belt}
              onChange={(e: any) => setNewTech((p: any) => ({...p, belt:e.target.value}))}
              style={{
                flex:1, padding:"8px 10px", borderRadius:10,
                border:"1px solid #27272a", background:"#09090b",
                color:"#fafafa", fontSize:13, outline:"none",
              }}
            >
              {["white","blue","purple","brown","black"].map(b => <option key={b} value={b}>{b} belt</option>)}
            </select>
          </div>
          <input
            placeholder="Notes (optional)"
            value={newTech.notes}
            onChange={(e: any) => setNewTech((p: any) => ({...p, notes:e.target.value}))}
            style={{
              width:"100%", padding:"10px 12px", borderRadius:10, marginBottom:12,
              border:"1px solid #27272a", background:"#09090b",
              color:"#fafafa", fontSize:13, outline:"none", boxSizing:"border-box",
            }}
          />
          <button
            onClick={() => {
              if (!newTech.name.trim()) return;
              onAddTechnique(newTech);
              setNewTech({ name:"", category:"guard", belt:"white", notes:"" });
              setAddOpen(false);
            }}
            style={{
              width:"100%", padding:"10px", borderRadius:10, border:"none",
              background: newTech.name.trim() ? "#3b82f6" : "#27272a",
              color: newTech.name.trim() ? "#fff" : "#52525b",
              fontSize:14, fontWeight:600, cursor: newTech.name.trim() ? "pointer" : "not-allowed",
              transition:"all 0.15s",
            }}
          >
            Add to Library
          </button>
        </div>
      )}

      {/* Search */}
      <div style={{ position:"relative", marginBottom:16 }}>
        <Search size={16} color="#52525b" style={{ position:"absolute", left:14, top:13 }} />
        <input
          placeholder="Search techniques..."
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          style={{
            width:"100%", padding:"12px 14px 12px 40px", borderRadius:14,
            border:"1px solid #27272a", background:"#18181b",
            color:"#fafafa", fontSize:15, outline:"none", boxSizing:"border-box",
          }}
        />
      </div>

      {/* Category Chips */}
      <div style={{ display:"flex", gap:6, overflowX:"auto", paddingBottom:4, marginBottom:20, WebkitOverflowScrolling:"touch" }}>
        <button
          onClick={() => setActiveCat(null)}
          style={{
            padding:"6px 14px", borderRadius:10, border:"none", whiteSpace:"nowrap",
            background: !activeCat ? "#3b82f6" : "#18181b",
            color: !activeCat ? "#fff" : "#a1a1aa",
            fontSize:13, fontWeight:500, cursor:"pointer",
          }}
        >All</button>
        {CATEGORIES.map(c => (
          <button
            key={c.id}
            onClick={() => setActiveCat(activeCat===c.id ? null : c.id)}
            style={{
              padding:"6px 14px", borderRadius:10, border:"none", whiteSpace:"nowrap",
              background: activeCat===c.id ? c.color : "#18181b",
              color: activeCat===c.id ? "#fff" : "#a1a1aa",
              fontSize:13, fontWeight:500, cursor:"pointer",
              transition:"all 0.15s",
            }}
          >{c.label}</button>
        ))}
      </div>

      {/* Techniques */}
      {Object.entries(grouped).map(([catId, techs]: [string, any]) => {
        const cat = CATEGORIES.find(c=>c.id===catId);
        const CatIcon = cat?.icon || Shield;
        return (
          <div key={catId} style={{ marginBottom:24 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
              <CatIcon size={14} color={cat?.color} />
              <span style={{ fontSize:13, fontWeight:700, color:cat?.color, textTransform:"uppercase", letterSpacing:1 }}>{cat?.label}</span>
              <span style={{ fontSize:11, color:"#52525b" }}>({techs.length})</span>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
              {techs.map((t: any) => {
                const isPinned = pinnedTechs.includes(t.id);
                const isExpanded = expandedTech === t.id;
                return (
                  <div key={t.id} style={{
                    background:"#18181b", borderRadius:12,
                    border:"1px solid #27272a", overflow:"hidden",
                  }}>
                    <div
                      onClick={() => setExpandedTech(isExpanded ? null : t.id)}
                      style={{
                        padding:"12px 14px", cursor:"pointer",
                        display:"flex", justifyContent:"space-between", alignItems:"center",
                      }}
                    >
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <span style={{
                          width:8, height:8, borderRadius:"50%",
                          background: (BELT_COLORS as any)[t.belt] || "#e4e4e7",
                          border: t.belt==="white" ? "1px solid #52525b" : "none",
                          flexShrink:0,
                        }} />
                        <span style={{ fontSize:14, color:"#fafafa", fontWeight:500 }}>{t.name}</span>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        <button
                          onClick={(e: any) => { e.stopPropagation(); onTogglePin(t.id); }}
                          style={{ background:"none", border:"none", cursor:"pointer", padding:4 }}
                        >
                          {isPinned
                            ? <Pin size={14} color="#f59e0b" fill="#f59e0b" />
                            : <Pin size={14} color="#3f3f46" />
                          }
                        </button>
                        <ChevronRight size={14} color="#52525b" style={{ transform:isExpanded?"rotate(90deg)":"", transition:"0.2s" }} />
                      </div>
                    </div>
                    {isExpanded && (
                      <div style={{ padding:"0 14px 12px", borderTop:"1px solid #27272a22" }}>
                        <p style={{ fontSize:13, color:"#71717a", margin:"8px 0 0", lineHeight:1.6 }}>{t.notes}</p>
                        <div style={{ marginTop:8, display:"flex", gap:8 }}>
                          <span style={{
                            fontSize:11, padding:"2px 8px", borderRadius:6,
                            background: `${(BELT_COLORS as any)[t.belt]}20`,
                            color: t.belt==="white" ? "#a1a1aa" : (BELT_COLORS as any)[t.belt],
                            border: t.belt==="white" ? "1px solid #3f3f46" : "none",
                          }}>{t.belt} belt</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {filtered.length === 0 && (
        <div style={{ textAlign:"center", padding:40, color:"#52525b" }}>
          <Search size={32} style={{ marginBottom:8, opacity:0.3 }} />
          <p>No techniques found</p>
        </div>
      )}
    </div>
  );
}

function StatsPage({ sessions, techniques = TECHNIQUES }: any) {
  const totalHours = sessions.reduce((s: number,x: any)=>s+x.mat_hours,0);
  const totalSessions = sessions.length;
  const now = new Date();

  const monthlyData = useMemo(() => {
    const months: any = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const key = d.toISOString().slice(0,7);
      months[key] = {
        month: d.toLocaleDateString("en-US",{month:"short"}),
        hours:0, sessions:0, avgIntensity:0, intensitySum:0
      };
    }
    sessions.forEach((s: any) => {
      const key = s.session_date.slice(0,7);
      if (months[key]) {
        months[key].hours += s.mat_hours;
        months[key].sessions++;
        months[key].intensitySum += s.intensity_level;
      }
    });
    return Object.values(months).map((m: any) => ({
      ...m,
      hours: +m.hours.toFixed(1),
      avgIntensity: m.sessions > 0 ? +(m.intensitySum/m.sessions).toFixed(1) : 0,
    }));
  }, [sessions]);

  const typeBreakdown = useMemo(() => {
    const types: any = {};
    sessions.forEach((s: any) => {
      if (!types[s.session_type]) types[s.session_type] = { count:0, hours:0 };
      types[s.session_type].count++;
      types[s.session_type].hours += s.mat_hours;
    });
    return Object.entries(types).map(([type,data]: [string, any])=>({type,...data,hours:+data.hours.toFixed(1)}))
      .sort((a: any,b: any)=>b.count-a.count);
  }, [sessions]);

  const techFrequency = useMemo(() => {
    const freq: any = {};
    sessions.forEach((s: any) => {
      (s.techniques_covered||[]).forEach((id: string) => {
        freq[id] = (freq[id]||0) + 1;
      });
    });
    return Object.entries(freq)
      .map(([id,count]: [string, any])=>({ tech:techniques.find((t: any)=>t.id===id), count }))
      .filter((x: any)=>x.tech)
      .sort((a: any,b: any)=>b.count-a.count)
      .slice(0,8);
  }, [sessions, techniques]);

  const typeColors: any = {
    "Gi":"#3b82f6","No-Gi":"#10b981","Open Mat":"#8b5cf6",
    "Seminar":"#f59e0b","Drilling":"#06b6d4","Competition":"#ef4444"
  };

  return (
    <div>
      <div style={{ marginBottom:28 }}>
        <p style={{ fontSize:13, color:"#52525b", margin:"0 0 2px", textTransform:"uppercase", letterSpacing:1.5 }}>BJJ Tracker</p>
        <h1 style={{ fontSize:26, fontWeight:800, color:"#fafafa", margin:0, letterSpacing:"-0.03em" }}>Analytics</h1>
      </div>

      <div style={{ display:"flex", gap:10, marginBottom:24, flexWrap:"wrap" }}>
        <StatCard icon={Clock} label="Total Hours" value={totalHours.toFixed(1)} accent="#3b82f6" />
        <StatCard icon={BarChart3} label="Sessions" value={totalSessions} accent="#10b981" />
      </div>

      {/* Monthly Hours Chart */}
      <div style={{
        background:"#18181b", borderRadius:16, padding:"18px 16px",
        border:"1px solid #27272a", marginBottom:20,
      }}>
        <span style={{ fontSize:13, fontWeight:600, color:"#a1a1aa", textTransform:"uppercase", letterSpacing:1 }}>Monthly Hours</span>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={monthlyData} barSize={28}>
            <XAxis dataKey="month" tick={{ fill:"#52525b", fontSize:11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              cursor={false}
              contentStyle={{ background:"#27272a", border:"1px solid #3f3f46", borderRadius:10, fontSize:13 }}
              labelStyle={{ color:"#a1a1aa" }}
            />
            <Bar dataKey="hours" fill="#3b82f6" radius={[6,6,0,0]} name="Hours" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Sessions Chart */}
      <div style={{
        background:"#18181b", borderRadius:16, padding:"18px 16px",
        border:"1px solid #27272a", marginBottom:20,
      }}>
        <span style={{ fontSize:13, fontWeight:600, color:"#a1a1aa", textTransform:"uppercase", letterSpacing:1 }}>Monthly Sessions</span>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={monthlyData} barSize={28}>
            <XAxis dataKey="month" tick={{ fill:"#52525b", fontSize:11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              cursor={false}
              contentStyle={{ background:"#27272a", border:"1px solid #3f3f46", borderRadius:10, fontSize:13 }}
              labelStyle={{ color:"#a1a1aa" }}
            />
            <Bar dataKey="sessions" fill="#10b981" radius={[6,6,0,0]} name="Sessions" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Type Breakdown */}
      <div style={{
        background:"#18181b", borderRadius:16, padding:"18px 16px",
        border:"1px solid #27272a", marginBottom:20,
      }}>
        <span style={{ fontSize:13, fontWeight:600, color:"#a1a1aa", textTransform:"uppercase", letterSpacing:1 }}>Session Breakdown</span>
        <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:10 }}>
          {typeBreakdown.map((t: any) => (
            <div key={t.type}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:13, color:"#d4d4d8" }}>{t.type}</span>
                <span style={{ fontSize:12, color:"#71717a" }}>{t.count} × {t.hours}h</span>
              </div>
              <div style={{ height:6, borderRadius:3, background:"#27272a", overflow:"hidden" }}>
                <div style={{
                  height:"100%", borderRadius:3,
                  width:`${(t.count/totalSessions)*100}%`,
                  background:typeColors[t.type]||"#3b82f6",
                  transition:"width 0.5s ease",
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Techniques */}
      {techFrequency.length > 0 && (
        <div style={{
          background:"#18181b", borderRadius:16, padding:"18px 16px",
          border:"1px solid #27272a",
        }}>
          <span style={{ fontSize:13, fontWeight:600, color:"#a1a1aa", textTransform:"uppercase", letterSpacing:1 }}>Most Practiced</span>
          <div style={{ marginTop:14, display:"flex", flexDirection:"column", gap:8 }}>
            {techFrequency.map((item: any, i: number) => {
              const cat = CATEGORIES.find(c=>c.id===item.tech.category);
              return (
                <div key={item.tech.id} style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <span style={{ fontSize:12, color:"#52525b", width:18, textAlign:"right" }}>#{i+1}</span>
                  <span style={{
                    width:8, height:8, borderRadius:"50%", background:cat?.color||"#3b82f6", flexShrink:0,
                  }} />
                  <span style={{ fontSize:13, color:"#d4d4d8", flex:1 }}>{item.tech.name}</span>
                  <span style={{ fontSize:12, color:"#52525b" }}>{item.count}×</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── APP ─── */
export default function BJJTracker() {
  const [page, setPage] = useState("home");
  const [sessions, setSessions] = useState<any[]>([]);
  const [pinnedTechs, setPinnedTechs] = useState<string[]>([]);
  const [logOpen, setLogOpen] = useState(false);
  const [editSession, setEditSession] = useState<any>(null);
  const [techniques, setTechniques] = useState(TECHNIQUES);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user and data on mount
  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);

        const { data: sessionsData } = await supabase
          .from("sessions")
          .select("*")
          .eq("user_id", user.id)
          .order("session_date", { ascending: false });
        if (sessionsData) setSessions(sessionsData);

        const { data: pinsData } = await supabase
          .from("pinned_techniques")
          .select("technique_id")
          .eq("user_id", user.id);
        if (pinsData) setPinnedTechs(pinsData.map((p: any) => p.technique_id));
      }
      setLoading(false);
    };
    init();
  }, []);

  const handleAddTechnique = useCallback((tech: any) => {
    setTechniques(prev => [...prev, { ...tech, id: `custom_${crypto.randomUUID()}` }]);
  }, []);

  const handleSave = useCallback(async (session: any) => {
    if (!userId) return;
    const payload = {
      id: session.id,
      user_id: userId,
      session_date: session.session_date,
      session_type: session.session_type,
      intensity_level: session.intensity_level,
      mat_hours: session.mat_hours,
      notes: session.notes,
      techniques_covered: session.techniques_covered,
    };

    const exists = sessions.find(s => s.id === session.id);
    if (exists) {
      await supabase.from("sessions").update(payload).eq("id", session.id);
    } else {
      await supabase.from("sessions").insert(payload);
    }

    const { data } = await supabase
      .from("sessions")
      .select("*")
      .eq("user_id", userId)
      .order("session_date", { ascending: false });
    if (data) setSessions(data);
    setEditSession(null);
  }, [userId, sessions]);

  const handleDelete = useCallback(async (id: string) => {
    await supabase.from("sessions").delete().eq("id", id);
    setSessions(prev => prev.filter(s => s.id !== id));
  }, []);

  const handleEdit = useCallback((session: any) => {
    setEditSession(session);
    setLogOpen(true);
  }, []);

  const togglePin = useCallback(async (id: string) => {
    if (!userId) return;
    const isPinned = pinnedTechs.includes(id);

    if (isPinned) {
      await supabase
        .from("pinned_techniques")
        .delete()
        .eq("user_id", userId)
        .eq("technique_id", id);
      setPinnedTechs(prev => prev.filter(x => x !== id));
    } else {
      await supabase
        .from("pinned_techniques")
        .insert({ user_id: userId, technique_id: id });
      setPinnedTechs(prev => [...prev, id]);
    }
  }, [userId, pinnedTechs]);

  const navItems = [
    { id:"home", icon:Home, label:"Home" },
    { id:"library", icon:BookOpen, label:"Library" },
    { id:"stats", icon:BarChart3, label:"Stats" },
  ];

  if (loading) return (
    <div style={{
      background:"#09090b", minHeight:"100vh",
      display:"flex", alignItems:"center", justifyContent:"center",
    }}>
      <p style={{ color:"#52525b" }}>Loading...</p>
    </div>
  );

  return (
    <div style={{
      background:"#09090b", minHeight:"100vh", maxWidth:480, margin:"0 auto",
      fontFamily:"'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      position:"relative", color:"#fafafa",
      paddingBottom:100,
    }}>
      {/* Content */}
      <div style={{ padding:"20px 16px 20px" }}>
        {page === "home" && (
          <DashboardPage
            sessions={sessions}
            pinnedTechs={pinnedTechs}
            techniques={techniques}
            onUnpin={togglePin}
            onOpenLog={() => setLogOpen(true)}
            onEditSession={handleEdit}
            onDeleteSession={handleDelete}
          />
        )}
        {page === "library" && (
          <LibraryPage pinnedTechs={pinnedTechs} onTogglePin={togglePin} techniques={techniques} onAddTechnique={handleAddTechnique} />
        )}
        {page === "stats" && (
          <StatsPage sessions={sessions} techniques={techniques} />
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => { setEditSession(null); setLogOpen(true); }}
        style={{
          position:"fixed", bottom:88, right:"calc(50% - 200px)", zIndex:50,
          width:52, height:52, borderRadius:16, border:"none",
          background:"#3b82f6", boxShadow:"0 4px 24px rgba(59,130,246,0.4)",
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          transition:"transform 0.2s",
        }}
      >
        <Plus size={24} color="#fff" strokeWidth={2.5} />
      </button>

      {/* Bottom Nav */}
      <nav style={{
        position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)",
        width:"100%", maxWidth:480,
        background:"#09090bee", backdropFilter:"blur(20px)",
        borderTop:"1px solid #27272a",
        padding:"8px 0 8px",
        display:"flex", justifyContent:"space-around",
        zIndex:40,
      }}>
        {navItems.map(item => {
          const active = page === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              style={{
                background:"none", border:"none", cursor:"pointer",
                display:"flex", flexDirection:"column", alignItems:"center", gap:2,
                padding:"6px 20px", borderRadius:12, position:"relative",
              }}
            >
              {active && <div style={{
                position:"absolute", top:0, left:"50%", transform:"translateX(-50%)",
                width:20, height:2, borderRadius:1, background:"#3b82f6",
              }} />}
              <item.icon size={20} color={active ? "#3b82f6" : "#52525b"} strokeWidth={active ? 2.2 : 1.8} />
              <span style={{
                fontSize:10, fontWeight:active ? 700 : 500,
                color:active ? "#3b82f6" : "#52525b",
                letterSpacing:0.5,
              }}>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Log Modal */}
      <QuickLogModal
        open={logOpen}
        onClose={() => { setLogOpen(false); setEditSession(null); }}
        onSave={handleSave}
        editSession={editSession}
        techniques={techniques}
      />

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; }
        input, textarea, button, select { font-family: inherit; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1); }
      `}</style>
    </div>
  );
}
