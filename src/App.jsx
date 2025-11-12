import React, { useState } from "react";
import {
  Moon,
  Wifi,
  Battery,
  Bell,
  X,
  Minus,
  Maximize2,
  Folder,
  Settings,
  Music2,
  Image as ImageIcon,
  Globe,
  ChevronUp,
  Search,
  Play,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  Home,
  Sliders,
  Palette,
  Shield,
  Info
} from "lucide-react";

const DockIcon = ({ icon: Icon, label, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center justify-center gap-1 w-16 h-16 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md shadow-md transition-all hover:scale-105 text-[#EAF4FF]"
  >
    <Icon className="w-6 h-6" />
    <span className="text-[10px] opacity-80">{label}</span>
  </button>
);

const TopBar = () => (
  <div className="absolute top-0 inset-x-0 h-14 px-4 flex items-center justify-between text-sm text-[#EAF4FF]/90">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-[#4F5D95]/60 flex items-center justify-center shadow-inner">
        <Moon className="w-4 h-4" />
      </div>
      <span className="font-semibold tracking-wide">Lunaris OS</span>
      <span className="text-xs opacity-60">Tranquil Mode</span>
    </div>
    <div className="flex items-center gap-3">
      <Wifi className="w-4 h-4 opacity-80" />
      <Battery className="w-4 h-4 opacity-80" />
      <Bell className="w-4 h-4 opacity-80" />
      <div className="ml-2 px-2 py-1 rounded-lg bg-[#4F5D95]/50 border border-[#7AC7E3]/20">11:42</div>
    </div>
  </div>
);

const WindowChrome = ({ title, onClose }) => (
  <div className="flex items-center justify-between px-4 py-2 border-b border-[#7AC7E3]/20 bg-[#0D0F1A]/70">
    <span className="text-sm font-medium text-[#EAF4FF]">{title}</span>
    <div className="flex items-center gap-2">
      <button className="grid rounded-md w-7 h-7 place-items-center bg-white/10 hover:bg-white/20"><Minus className="w-4 h-4" /></button>
      <button className="grid rounded-md w-7 h-7 place-items-center bg-white/10 hover:bg-white/20"><Maximize2 className="w-4 h-4" /></button>
      <button onClick={onClose} className="w-7 h-7 grid place-items-center rounded-md bg-white/10 hover:bg-[#7AC7E3]/70 hover:text-[#0D0F1A]"><X className="w-4 h-4" /></button>
    </div>
  </div>
);

const AppWindow = ({ title, open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[860px] rounded-3xl overflow-hidden bg-[#0D0F1A]/80 border border-[#7AC7E3]/30 backdrop-blur-2xl shadow-2xl">
      <WindowChrome title={title} onClose={onClose} />
      <div className="p-6 text-[#EAF4FF] text-sm">{children}</div>
    </div>
  );
};

const FileGlyph = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="opacity-80">
    <path d="M7 3h6l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M13 3v5h5" stroke="currentColor" strokeWidth="1.5"/>
  </svg>
);

const FilesContent = () => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 text-xs opacity-70">
      <Home className="w-4 h-4" /> / Home / Projects / Lunaris
    </div>
    <div className="grid grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-24 rounded-2xl bg-[#1A1C2C]/60 border border-[#7AC7E3]/20 flex flex-col items-center justify-center gap-2">
          <Folder className="w-7 h-7 opacity-80" />
          <span className="text-[11px] opacity-80">Folder {i + 1}</span>
        </div>
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i+100} className="h-24 rounded-2xl bg-[#1A1C2C]/40 border border-[#7AC7E3]/10 flex flex-col items-center justify-center gap-2">
          <FileGlyph />
          <span className="text-[11px] opacity-80">File_{i + 1}.fig</span>
        </div>
      ))}
    </div>
  </div>
);

const BrowserContent = () => {
  const [tab, setTab] = useState('Lunaris');

  const Tab = ({ label }) => (
    <button
      onClick={() => setTab(label)}
      className={`px-3 py-1 rounded-lg text-xs border transition ${
        tab === label
          ? 'bg-[#7AC7E3]/20 border-[#7AC7E3]/40'
          : 'opacity-70 hover:opacity-100 border-transparent'
      }`}
    >
      {label}
    </button>
  );

  const AddressBar = () => (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 px-2 py-1 border bg-white/5 border-white/10 rounded-xl">
        {['Lunaris', 'Docs', 'Playground'].map((t) => (
          <Tab key={t} label={t} />
        ))}
      </div>
      <div className="relative flex-1 ml-2">
        <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 opacity-60" />
        <input
          className="w-full py-2 pr-3 border outline-none pl-9 rounded-xl bg-white/10 border-white/10 backdrop-blur placeholder:text-white/50"
          placeholder="Search or type a URL"
          value={
            tab === 'Lunaris'
              ? 'https://lunaris.example'
              : tab === 'Docs'
              ? 'https://lunaris.example/docs'
              : 'https://lunaris.example/playground'
          }
          readOnly
        />
      </div>
    </div>
  );

  const HomeLanding = () => (
    <>
      <div className="rounded-2xl p-6 bg-[#1A1C2C]/60 border border-[#7AC7E3]/20">
        <div className="mb-2 text-xs uppercase opacity-70">Featured</div>
        <div className="text-lg font-medium">Design under the moonlight</div>
        <p className="mt-1 opacity-80">Explore calm UI patterns, soft glows, and motion that feels like tidal breathing.</p>
        <button className="mt-4 px-3 py-2 rounded-lg bg-[#7AC7E3]/20 border border-[#7AC7E3]/40 text-sm">Read more</button>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {['Guides','Components','Showcase'].map((t, i) => (
          <div key={i} className="rounded-2xl p-4 bg-[#1A1C2C]/40 border border-[#7AC7E3]/20">
            <div className="mb-1 font-medium">{t}</div>
            <p className="text-xs opacity-80">Sample card content to show multi-column article lists with balanced density.</p>
          </div>
        ))}
      </div>
    </>
  );

  const DocsPage = () => (
    <div className="grid grid-cols-12 gap-6">
      <aside className="col-span-3 rounded-2xl p-3 bg-[#1A1C2C]/60 border border-[#7AC7E3]/20">
        <div className="mb-2 text-xs uppercase opacity-70">Docs</div>
        <nav className="space-y-1 text-sm">
          {['Getting Started','Design Tokens','Components','Layouts','Motion'].map((i, idx) => (
            <div key={idx} className={`px-3 py-2 rounded-lg ${idx===0? 'bg-[#4F5D95]/30 border border-[#7AC7E3]/30' : 'bg-white/5 border border-white/10 opacity-90'}`}>{i}</div>
          ))}
        </nav>
      </aside>
      <article className="col-span-9 rounded-2xl p-6 bg-[#1A1C2C]/60 border border-[#7AC7E3]/20">
        <h2 className="text-lg font-medium">Getting Started</h2>
        <p className="mt-2 opacity-80">Lunaris UI embraces bioluminescent highlights, generous radii, and glass layers.</p>
        <h3 className="mt-4 font-medium">Install</h3>
        <pre className="mt-2 p-3 rounded-xl bg-black/40 border border-white/10 text-[12px] overflow-x-auto">npm i @lunaris/ui
# or
yarn add @lunaris/ui</pre>
      </article>
    </div>
  );

  const PlaygroundPage = () => (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-4 rounded-2xl p-4 bg-[#1A1C2C]/60 border border-[#7AC7E3]/20">
        <div className="mb-2 text-sm font-medium">Controls</div>
        <label className="block mb-1 text-xs opacity-80">Card Title</label>
        <input className="w-full px-3 py-2 mb-3 border rounded-lg bg-white/10 border-white/10" defaultValue="Prototype Card" />
        <label className="block mb-1 text-xs opacity-80">Density</label>
        <input type="range" defaultValue={16} min={8} max={32} className="w-full" />
      </div>
      <div className="col-span-8 rounded-2xl p-6 bg-[#1A1C2C]/60 border border-[#7AC7E3]/20">
        <div className="mb-2 text-sm font-medium">Preview</div>
        <div className="rounded-2xl p-6 bg-[#1A1C2C]/60 border border-[#7AC7E3]/20">
          <div className="text-base font-medium">Prototype Card</div>
          <p className="mt-1 text-xs opacity-80">This live preview area is where component experiments show up.</p>
          <div className="flex items-center gap-2 mt-3">
            <button className="px-3 py-2 rounded-lg bg-[#7AC7E3]/20 border border-[#7AC7E3]/40">Action</button>
            <button className="px-3 py-2 border rounded-lg bg-white/10 border-white/10">Secondary</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      <AddressBar />
      {tab === 'Lunaris' && <HomeLanding />}
      {tab === 'Docs' && <DocsPage />}
      {tab === 'Playground' && <PlaygroundPage />}
    </div>
  );
};

const MusicContent = () => (
  <div className="grid grid-cols-12 gap-6">
    <div className="col-span-4">
      <div className="aspect-square rounded-2xl bg-gradient-to-br from-[#4F5D95] to-[#7AC7E3] border border-[#7AC7E3]/40" />
      <div className="mt-3">
        <div className="text-base font-medium">Celestial Drift</div>
        <div className="text-xs opacity-70">Nova — Dream Sequence</div>
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button className="p-2 border rounded-xl bg-white/10 border-white/10"><SkipBack className="w-5 h-5" /></button>
        <button className="p-3 rounded-xl bg-[#7AC7E3]/20 border border-[#7AC7E3]/40"><Play className="w-6 h-6" /></button>
        <button className="p-2 border rounded-xl bg-white/10 border-white/10"><SkipForward className="w-5 h-5" /></button>
        <button className="p-2 ml-2 border rounded-xl bg-white/10 border-white/10"><Shuffle className="w-5 h-5" /></button>
        <button className="p-2 border rounded-xl bg-white/10 border-white/10"><Repeat className="w-5 h-5" /></button>
      </div>
      <div className="mt-3">
        <div className="h-1.5 w-full rounded-full bg-white/10">
          <div className="h-1.5 w-2/5 rounded-full bg-[#7AC7E3]" />
        </div>
        <div className="flex justify-between text-[10px] opacity-70 mt-1"><span>1:24</span><span>3:58</span></div>
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs opacity-80">
        <Volume2 className="w-4 h-4" />
        <div className="w-32 h-1 rounded-full bg-white/10"><div className="h-1 w-2/3 rounded-full bg-[#7AC7E3]" /></div>
      </div>
    </div>
    <div className="col-span-8">
      <div className="mb-2 text-xs uppercase opacity-70">Playlist</div>
      <div className="space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#1A1C2C]/50 border border-[#7AC7E3]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#4F5D95]/40" />
              <div>
                <div className="text-sm">Track {i + 1}</div>
                <div className="text-xs opacity-70">Artist {i + 1}</div>
              </div>
            </div>
            <div className="text-xs opacity-70">3:{(20 + i).toString().padStart(2,'0')}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const PhotosContent = () => (
  <div className="space-y-4">
    <div className="text-xs uppercase opacity-70">Gallery</div>
    <div className="grid grid-cols-6 gap-3">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="aspect-square rounded-xl bg-[#1A1C2C]/60 border border-[#7AC7E3]/20" />
      ))}
    </div>
  </div>
);

const Toggle = ({ on = true }) => (
  <div className={`w-10 h-6 rounded-full border ${on ? 'bg-[#7AC7E3]/40 border-[#7AC7E3]/60' : 'bg-white/10 border-white/20'} relative`}>
    <div className={`absolute top-1/2 -translate-y-1/2 ${on ? 'left-6' : 'left-1'} w-4 h-4 rounded-full bg-white/90`} />
  </div>
);

const SettingsContent = () => {
  const [active, setActive] = useState('Appearance');

  const NavItem = ({ icon: Icon, label }) => (
    <button
      onClick={() => setActive(label)}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl border bg-[#1A1C2C]/50 border-[#7AC7E3]/20 text-left transition ${
        active === label ? 'ring-1 ring-[#7AC7E3]/40 bg-[#1A1C2C]/70' : 'hover:bg-[#1A1C2C]/60'
      }`}
    >
      <Icon className="w-4 h-4 opacity-80" />
      <span className="text-sm">{label}</span>
    </button>
  );

  const Section = ({ title, children }) => (
    <div className="rounded-2xl p-4 bg-[#1A1C2C]/60 border border-[#7AC7E3]/20 space-y-3">
      <div className="font-medium">{title}</div>
      {children}
    </div>
  );

  const AppearancePanel = () => (
    <div className="space-y-4">
      <Section title="Theme">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center justify-between px-3 py-2 border rounded-xl bg-white/5 border-white/10">
            <span>Dark Mode</span>
            <Toggle on />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border rounded-xl bg-white/5 border-white/10">
            <span>Glass Effects</span>
            <Toggle on />
          </div>
        </div>
      </Section>
      <Section title="Accent Color">
        <div className="flex items-center gap-3">
          {['#4F5D95','#7AC7E3','#8B5CF6','#14B8A6','#F59E0B'].map((c,i)=> (
            <button key={i} className="w-10 h-10 rounded-xl border border-[#7AC7E3]/20" style={{background:c}} />
          ))}
        </div>
      </Section>
      <Section title="Wallpaper">
        <div className="grid grid-cols-5 gap-3">
          {Array.from({length:5}).map((_,i)=> (
            <div key={i} className="aspect-[16/10] rounded-xl border border-[#7AC7E3]/20 bg-[#1A1C2C]/70" />
          ))}
        </div>
      </Section>
    </div>
  );

  const NetworkPanel = () => (
    <div className="space-y-4">
      <Section title="Wi‑Fi">
        <div className="flex items-center justify-between px-3 py-2 border rounded-xl bg:white/5 border-white/10">
          <span>Wi‑Fi</span>
          <Toggle on />
        </div>
        <div className="mt-3 space-y-2">
          {['Starlink_5G','LunaLab','Guest_Net','OrionMesh'].map((n,i)=> (
            <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-xl border ${i===0? 'bg-[#4F5D95]/30 border-[#7AC7E3]/40' : 'bg-[#1A1C2C]/50 border-[#7AC7E3]/20'}`}>
              <div className="flex items-center gap-2">
                <Wifi className="w-4 h-4" />
                <span className="text-sm">{n}</span>
              </div>
              <span className="text-xs opacity-70">{i===0?'Connected':'Secure'}</span>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  const PrivacyPanel = () => (
    <div className="space-y-4">
      <Section title="Permissions">
        <div className="grid grid-cols-2 gap-3">
          {['Location','Camera','Microphone','Diagnostics'].map((label, i)=> (
            <div key={i} className="flex items-center justify-between px-3 py-2 border rounded-xl bg-white/5 border-white/10">
              <span>{label}</span>
              <Toggle on={i%2===0} />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );

  const AboutPanel = () => (
    <div className="space-y-4">
      <Section title="Software">
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="px-3 py-2 border rounded-xl bg-white/5 border-white/10">Lunaris OS 1.0</div>
          <div className="px-3 py-2 border rounded-xl bg-white/5 border-white/10">Build: 24.11.12</div>
          <div className="px-3 py-2 border rounded-xl bg-white/5 border-white/10">Channel: Tranquil</div>
        </div>
      </Section>
    </div>
  );

  const panels = {
    'Appearance': <AppearancePanel />,
    'Network': <NetworkPanel />,
    'Privacy': <PrivacyPanel />,
    'About': <AboutPanel />,
    'System': (
      <div className="space-y-4">
        <Section title="System Preferences">
          <div className="grid grid-cols-1 gap-4 text-sm">
            <div className="px-3 py-2 border rounded-xl bg-white/5 border-white/10">
              <div className="flex items-center justify-between">
                <span>Brightness</span>
                <span className="text-xs opacity-70">72%</span>
              </div>
              <div className="mt-2 h-1.5 w-full rounded-full bg-white/10">
                <div className="h-1.5 w-3/4 rounded-full bg-[#7AC7E3]" />
              </div>
            </div>
          </div>
        </Section>
      </div>
    ),
  };

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-3 space-y-2">
        <button onClick={()=>setActive('System')} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border bg-[#1A1C2C]/50 border-[#7AC7E3]/20 text-left"><Sliders className="w-4 h-4"/><span className="text-sm">System</span></button>
        <button onClick={()=>setActive('Appearance')} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border bg-[#1A1C2C]/50 border-[#7AC7E3]/20 text-left"><Palette className="w-4 h-4"/><span className="text-sm">Appearance</span></button>
        <button onClick={()=>setActive('Network')} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border bg-[#1A1C2C]/50 border-[#7AC7E3]/20 text-left"><Wifi className="w-4 h-4"/><span className="text-sm">Network</span></button>
        <button onClick={()=>setActive('Privacy')} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border bg-[#1A1C2C]/50 border-[#7AC7E3]/20 text-left"><Shield className="w-4 h-4"/><span className="text-sm">Privacy</span></button>
        <button onClick={()=>setActive('About')} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl border bg-[#1A1C2C]/50 border-[#7AC7E3]/20 text-left"><Info className="w-4 h-4"/><span className="text-sm">About</span></button>
      </div>
      <div className="col-span-9 space-y-4">
        {panels[active]}
      </div>
    </div>
  );
};

export default function App() {
  const [windows, setWindows] = useState({
    files: true,
    browser: true,
    music: true,
    photos: true,
    settings: true,
  });

  const openWindow = (name) => setWindows({ ...windows, [name]: true });
  const closeWindow = (name) => setWindows({ ...windows, [name]: false });

  return (
    <div className="relative w-full h-screen overflow-hidden font-sans" style={{ background: "radial-gradient(circle at 20% 30%, #4F5D95 0%, transparent 60%), radial-gradient(circle at 80% 90%, #7AC7E3 0%, transparent 70%), #0D0F1A" }}>
      <TopBar />

      <AppWindow title="Files" open={windows.files} onClose={() => closeWindow('files')}>
        <FilesContent />
      </AppWindow>

      <AppWindow title="Browser" open={windows.browser} onClose={() => closeWindow('browser')}>
        <BrowserContent />
      </AppWindow>

      <AppWindow title="Music" open={windows.music} onClose={() => closeWindow('music')}>
        <MusicContent />
      </AppWindow>

      <AppWindow title="Photos" open={windows.photos} onClose={() => closeWindow('photos')}>
        <PhotosContent />
      </AppWindow>

      <AppWindow title="Settings" open={windows.settings} onClose={() => closeWindow('settings')}>
        <SettingsContent />
      </AppWindow>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex items-center gap-4 p-3 rounded-3xl bg-[#0D0F1A]/70 backdrop-blur-xl border border-[#7AC7E3]/30 shadow-2xl">
        <DockIcon icon={Folder} label="Files" onClick={() => openWindow('files')} />
        <DockIcon icon={Globe} label="Browser" onClick={() => openWindow('browser')} />
        <DockIcon icon={Music2} label="Music" onClick={() => openWindow('music')} />
        <DockIcon icon={ImageIcon} label="Photos" onClick={() => openWindow('photos')} />
        <DockIcon icon={Settings} label="Settings" onClick={() => openWindow('settings')} />
        <button className="ml-2 px-4 h-16 rounded-2xl bg-[#7AC7E3]/10 hover:bg-[#7AC7E3]/20 border border-[#7AC7E3]/20 flex items-center gap-2 text-[#EAF4FF]">
          <ChevronUp className="w-5 h-5" />
          <span className="text-sm">Launcher</span>
        </button>
      </div>
    </div>
  );
}
