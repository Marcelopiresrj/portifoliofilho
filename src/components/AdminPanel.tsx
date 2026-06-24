import { useState, useEffect, useCallback, type FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Mail,
  MailOpen,
  LogOut,
  RefreshCw,
  Eye,
  ShieldCheck,
  Inbox,
  Clock,
  X,
  AlertCircle,
  Loader2,
  FolderGit2,
  Plus,
  Trash2,
  Edit2,
  Save,
  UserCircle,
  Users,
} from "lucide-react";
import {
  fetchContactMessages,
  markMessageAsRead,
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  signInWithEmail,
  signOut,
  getSession,
  fetchSiteSettings,
  updateSiteSettings,
  fetchClients,
  createClientRow,
  updateClientRow,
  deleteClientRow,
  type ContactMessageRow,
  type ProjectRow,
  type ClientRow,
  uploadImage,
} from "../lib/supabase";

// ── Login Modal ──────────────────────────────────────────────────────────────
function LoginModal({ onLogin }: { onLogin: (email: string, password: string) => Promise<void> }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onLogin(form.email, form.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao autenticar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-md bg-[#111214] border border-gray-800 rounded-2xl p-8 shadow-2xl"
      >
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-gray-700 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white font-georama">Admin Access</h2>
            <p className="text-xs text-gray-500 font-mono">Authenticate to view dashboard</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1.5">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="admin@example.com"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-950/60 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gray-600 transition-all"
            />
          </div>
          <div>
            <label className="text-xs font-mono text-gray-500 uppercase tracking-widest block mb-1.5">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-800 bg-gray-950/60 text-white placeholder-gray-600 text-sm focus:outline-none focus:border-gray-600 transition-all"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-2 p-3 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-xs"
              >
                <AlertCircle className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-gray-200 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" />Authenticating...</> : <><ShieldCheck className="w-4 h-4" />Sign In</>}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ── Message Components ───────────────────────────────────────────────────────
function MessageCard({
  msg,
  onMarkRead,
  onExpand,
}: {
  key?: string | number;
  msg: ContactMessageRow;
  onMarkRead: (id: string) => void;
  onExpand: (msg: ContactMessageRow) => void;
}) {
  const date = new Date(msg.created_at);
  const dateStr = date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
  const timeStr = date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className={`group relative p-5 rounded-xl border transition-all cursor-pointer ${
        msg.is_read ? "border-gray-900 bg-gray-950/30 hover:border-gray-800" : "border-gray-700 bg-[#111214] hover:border-gray-600"
      }`}
      onClick={() => onExpand(msg)}
    >
      {!msg.is_read && <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-400 ring-2 ring-blue-400/20" />}
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-sm font-semibold ${msg.is_read ? "bg-gray-900 text-gray-500" : "bg-white/5 border border-gray-700 text-white"}`}>
          {msg.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <span className={`text-sm font-semibold ${msg.is_read ? "text-gray-400" : "text-white"}`}>{msg.name}</span>
            {!msg.is_read && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-400/10 text-blue-400 border border-blue-400/20">NEW</span>}
          </div>
          <p className="text-xs text-gray-500 font-mono mb-2">{msg.email}</p>
          <p className={`text-sm leading-relaxed line-clamp-2 ${msg.is_read ? "text-gray-600" : "text-gray-400"}`}>{msg.message}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-900">
        <div className="flex items-center gap-1.5 text-xs text-gray-600 font-mono">
          <Clock className="w-3 h-3" /> {dateStr} · {timeStr}
        </div>
        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {!msg.is_read && (
            <button
              onClick={(e) => { e.stopPropagation(); onMarkRead(msg.id); }}
              className="flex items-center gap-1 text-xs font-mono text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
            >
              <MailOpen className="w-3.5 h-3.5" /> Mark read
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onExpand(msg); }}
            className="flex items-center gap-1 text-xs font-mono text-gray-400 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/5"
          >
            <Eye className="w-3.5 h-3.5" /> View
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function MessageModal({ msg, onClose, onMarkRead }: { msg: ContactMessageRow; onClose: () => void; onMarkRead: (id: string) => void }) {
  const date = new Date(msg.created_at).toLocaleString("pt-BR", { dateStyle: "full", timeStyle: "short" });
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" onClick={onClose}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg bg-[#111214] border border-gray-800 rounded-2xl p-7 shadow-2xl"
        >
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-white/5 border border-gray-700 flex items-center justify-center text-base font-bold text-white">{msg.name.charAt(0).toUpperCase()}</div>
              <div>
                <h3 className="text-base font-semibold text-white">{msg.name}</h3>
                <a href={`mailto:${msg.email}`} className="text-xs text-gray-500 font-mono hover:text-white transition-colors">{msg.email}</a>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all"><X className="w-4 h-4" /></button>
          </div>
          <div className="bg-gray-950/60 border border-gray-900 rounded-xl p-4 mb-5">
            <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600 font-mono flex items-center gap-1.5"><Clock className="w-3 h-3" />{date}</span>
            <div className="flex items-center gap-2">
              {!msg.is_read && (
                <button
                  onClick={() => { onMarkRead(msg.id); onClose(); }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white text-black text-xs font-medium hover:bg-gray-200 transition-all active:scale-95"
                >
                  <MailOpen className="w-3.5 h-3.5" /> Mark as Read
                </button>
              )}
              <a href={`mailto:${msg.email}`} className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-700 text-gray-300 text-xs font-medium hover:border-gray-500 hover:text-white transition-all">
                <Mail className="w-3.5 h-3.5" /> Reply
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

// ── Project Components ───────────────────────────────────────────────────────
function ProjectForm({ 
  project, 
  onSave, 
  onCancel 
}: { 
  project?: ProjectRow, 
  onSave: (p: Partial<ProjectRow>) => Promise<void>, 
  onCancel: () => void 
}) {
  const [form, setForm] = useState<Partial<ProjectRow>>(
    project || {
      title: "",
      category: "",
      description: "",
      youtube_urls: [],
      featured: false,
      order_idx: 0
    }
  );
  const [youtubeUrlsInput, setYoutubeUrlsInput] = useState(project?.youtube_urls?.join("\n") || "");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const youtube_urls = youtubeUrlsInput.split("\n").map(t => t.trim()).filter(t => t.length > 0);
      await onSave({ ...form, youtube_urls });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-[#111214] border border-gray-800 rounded-2xl p-7 max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white font-georama">{project ? 'Edit Project' : 'New Project'}</h3>
          <button onClick={onCancel} className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-gray-500 uppercase block mb-1">Title</label>
              <input required value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-white text-sm focus:border-gray-600 outline-none" />
            </div>
            <div>
              <label className="text-xs font-mono text-gray-500 uppercase block mb-1">Category</label>
              <input required value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-white text-sm focus:border-gray-600 outline-none" />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-gray-500 uppercase block mb-1">Description</label>
            <textarea required rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-white text-sm focus:border-gray-600 outline-none resize-none" />
          </div>

          <div>
            <label className="text-xs font-mono text-gray-500 uppercase block mb-1 text-red-400">YouTube Video URLs (one per line)</label>
            <textarea rows={4} value={youtubeUrlsInput} onChange={e => setYoutubeUrlsInput(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-white text-sm focus:border-red-900 outline-none resize-none" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-gray-500 uppercase block mb-1">Order Index</label>
              <input type="number" value={form.order_idx} onChange={e => setForm({...form, order_idx: parseInt(e.target.value)})} className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-white text-sm focus:border-gray-600 outline-none" />
            </div>
            <div className="flex items-center pt-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
                <input type="checkbox" checked={form.featured} onChange={e => setForm({...form, featured: e.target.checked})} className="rounded bg-gray-900 border-gray-700" />
                Featured Project
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-900 mt-6">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="px-5 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Project
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Main Admin Panel ─────────────────────────────────────────────────────────
type Tab = 'messages' | 'projects' | 'clients' | 'settings';

// ── Client Components ───────────────────────────────────────────────────────
function ClientForm({ 
  client, 
  onSave, 
  onCancel 
}: { 
  client?: ClientRow, 
  onSave: (p: Partial<ClientRow>) => Promise<void>, 
  onCancel: () => void 
}) {
  const [form, setForm] = useState<Partial<ClientRow>>(
    client || {
      name: "",
      subs: "",
      category: "",
      avatar: "https://i.pravatar.cc/150?u=temp",
      order_idx: 0
    }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(form);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-[#111214] border border-gray-800 rounded-2xl p-7 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white font-georama">{client ? 'Edit Client' : 'New Client'}</h3>
          <button onClick={onCancel} className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all"><X className="w-4 h-4" /></button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-gray-500 uppercase block mb-1">Name</label>
            <input required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-white text-sm focus:border-gray-600 outline-none" />
          </div>
          <div>
            <label className="text-xs font-mono text-gray-500 uppercase block mb-1">Subscribers</label>
            <input required value={form.subs} onChange={e => setForm({...form, subs: e.target.value})} placeholder="e.g. 4.7M" className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-white text-sm focus:border-gray-600 outline-none" />
          </div>
          <div>
            <label className="text-xs font-mono text-gray-500 uppercase block mb-1">Category</label>
            <input required value={form.category} onChange={e => setForm({...form, category: e.target.value})} placeholder="e.g. GAMING" className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-white text-sm focus:border-gray-600 outline-none" />
          </div>
          <div>
            <label className="text-xs font-mono text-gray-500 uppercase block mb-1">Avatar Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={async e => {
                if (e.target.files && e.target.files.length > 0) {
                  setLoading(true);
                  try {
                    const url = await uploadImage(e.target.files[0]);
                    setForm({...form, avatar: url});
                  } catch (err) {
                    alert("Error uploading image");
                  } finally {
                    setLoading(false);
                  }
                }
              }} 
              className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-gray-400 text-sm focus:border-gray-600 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-white/10 file:text-white hover:file:bg-white/20" 
            />
            {form.avatar && form.avatar !== "https://i.pravatar.cc/150?u=temp" && (
              <img src={form.avatar} alt="Avatar Preview" className="mt-2 w-10 h-10 rounded-full object-cover border border-gray-700" />
            )}
          </div>
          <div>
            <label className="text-xs font-mono text-gray-500 uppercase block mb-1">Order Index</label>
            <input type="number" required value={form.order_idx} onChange={e => setForm({...form, order_idx: parseInt(e.target.value)})} className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-white text-sm focus:border-gray-600 outline-none" />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-900 mt-6">
            <button type="button" onClick={onCancel} className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
            <button type="submit" disabled={loading} className="px-5 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50 flex items-center gap-2">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Client
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminPanel({ onClose }: { onClose: () => void }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('messages');
  
  // Messages State
  const [messages, setMessages] = useState<ContactMessageRow[]>([]);
  const [msgFilter, setMsgFilter] = useState<"all" | "unread" | "read">("all");
  const [expandedMsg, setExpandedMsg] = useState<ContactMessageRow | null>(null);

  // Projects State
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [editingProject, setEditingProject] = useState<ProjectRow | "new" | null>(null);

  // Clients State
  const [clients, setClients] = useState<ClientRow[]>([]);
  const [editingClient, setEditingClient] = useState<ClientRow | "new" | null>(null);

  // Settings State
  const [aboutText, setAboutText] = useState("");
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("");
  const [photosUrlsInput, setPhotosUrlsInput] = useState("");
  
  const [contactEmail, setContactEmail] = useState("");
  const [contactTwitter, setContactTwitter] = useState("");
  const [contactYoutube, setContactYoutube] = useState("");
  const [contactDiscord, setContactDiscord] = useState("");
  const [wallpaperUrl, setWallpaperUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getSession().then((session) => {
      if (session) setIsAuthenticated(true);
    });
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'messages') {
        const data = await fetchContactMessages();
        setMessages(data);
      } else if (activeTab === 'projects') {
        const data = await fetchProjects();
        setProjects(data);
      } else if (activeTab === 'clients') {
        const data = await fetchClients();
        setClients(data);
      } else if (activeTab === 'settings') {
        const data = await fetchSiteSettings();
        if (data) {
          setAboutText(data.about_text);
          if (data.profile_photo_url) setProfilePhotoUrl(data.profile_photo_url);
          if (data.photos_urls) setPhotosUrlsInput(data.photos_urls.join("\n"));
          if (data.contact_email) setContactEmail(data.contact_email);
          if (data.contact_twitter) setContactTwitter(data.contact_twitter);
          if (data.contact_youtube) setContactYoutube(data.contact_youtube);
          if (data.contact_discord) setContactDiscord(data.contact_discord);
          if (data.wallpaper_url) setWallpaperUrl(data.wallpaper_url);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    if (isAuthenticated) loadData();
  }, [isAuthenticated, loadData]);

  const handleLogin = async (email: string, password: string) => {
    await signInWithEmail(email, password);
    setIsAuthenticated(true);
  };

  const handleLogout = async () => {
    await signOut();
    setIsAuthenticated(false);
    setMessages([]);
    setProjects([]);
  };

  // Messages Handlers
  const handleMarkRead = async (id: string) => {
    try {
      await markMessageAsRead(id);
      setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
    } catch (err) {
      console.error("Erro ao marcar como lida:", err);
    }
  };

  // Projects Handlers
  const handleSaveProject = async (p: Partial<ProjectRow>) => {
    try {
      if (editingProject === "new") {
        await createProject(p as Omit<ProjectRow, "id" | "created_at">);
      } else {
        await updateProject((editingProject as ProjectRow).id, p);
      }
      setEditingProject(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar projeto.");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      await deleteProject(id);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao deletar projeto.");
    }
  };

  // Clients Handlers
  const handleSaveClient = async (c: Partial<ClientRow>) => {
    try {
      if (editingClient === "new") {
        await createClientRow(c as Omit<ClientRow, "id" | "created_at">);
      } else {
        await updateClientRow((editingClient as ClientRow).id, c);
      }
      setEditingClient(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar cliente.");
    }
  };

  const handleDeleteClient = async (id: string) => {
    if (!confirm("Are you sure you want to delete this client?")) return;
    try {
      await deleteClientRow(id);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao deletar cliente.");
    }
  };

  // Settings Handlers
  const handleSaveSettings = async () => {
    setLoading(true);
    setError(null);
    try {
      const photos_urls = photosUrlsInput.split("\n").map(t => t.trim()).filter(t => t.length > 0);
      await updateSiteSettings({ 
        about_text: aboutText,
        profile_photo_url: profilePhotoUrl,
        photos_urls,
        contact_email: contactEmail,
        contact_twitter: contactTwitter,
        contact_youtube: contactYoutube,
        contact_discord: contactDiscord,
        wallpaper_url: wallpaperUrl
      });
      alert("Configurações salvas com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar configurações.");
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter((m) => {
    if (msgFilter === "unread") return !m.is_read;
    if (msgFilter === "read") return m.is_read;
    return true;
  });

  const unreadCount = messages.filter((m) => !m.is_read).length;

  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col bg-[#0a0b0d]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-900 bg-[#0d0e11]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/5 border border-gray-800 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-white font-georama">Dashboard</h1>
              <p className="text-xs text-gray-600 font-mono">Administration Panel</p>
            </div>
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-2 bg-gray-950 p-1 rounded-lg border border-gray-900 absolute left-1/2 -translate-x-1/2">
              <button
                onClick={() => setActiveTab('messages')}
                className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-2 ${activeTab === 'messages' ? "bg-gray-800 text-white" : "text-gray-500 hover:text-white"}`}
              >
                <Inbox className="w-3.5 h-3.5" /> Messages
                {unreadCount > 0 && <span className="px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 text-[10px]">{unreadCount}</span>}
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-2 ${activeTab === 'projects' ? "bg-gray-800 text-white" : "text-gray-500 hover:text-white"}`}
              >
                <FolderGit2 className="w-3.5 h-3.5" /> Projects
              </button>
              <button
                onClick={() => setActiveTab('clients')}
                className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-2 ${activeTab === 'clients' ? "bg-gray-800 text-white" : "text-gray-500 hover:text-white"}`}
              >
                <Users className="w-3.5 h-3.5" /> Clients
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-1.5 rounded-md text-xs font-mono transition-all flex items-center gap-2 ${activeTab === 'settings' ? "bg-gray-800 text-white" : "text-gray-500 hover:text-white"}`}
              >
                <UserCircle className="w-3.5 h-3.5" /> Sobre Mim
              </button>
            </div>
          )}

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button onClick={loadData} disabled={loading} className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all disabled:opacity-30">
                  <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                </button>
                <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600 text-xs font-mono transition-all">
                  <LogOut className="w-3.5 h-3.5" /> Logout
                </button>
              </>
            )}
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-all">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Content */}
        {isAuthenticated ? (
          <div className="flex-1 overflow-auto px-6 py-6 max-w-4xl mx-auto w-full">
            {error && (
              <div className="flex items-center gap-2 p-4 rounded-xl bg-red-950/20 border border-red-900/50 text-red-400 text-sm mb-4">
                <AlertCircle className="w-4 h-4 shrink-0" /> {error}
              </div>
            )}

            {/* MESSAGES TAB */}
            {activeTab === 'messages' && (
              <>
                <div className="flex items-center gap-1 mb-6 p-1 bg-gray-950 border border-gray-900 rounded-xl w-fit">
                  {(["all", "unread", "read"] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setMsgFilter(tab)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${msgFilter === tab ? "bg-white text-black" : "text-gray-500 hover:text-white"}`}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>

                {loading && !messages.length && <div className="py-24 text-center text-gray-600 text-sm font-mono"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-3" />Loading...</div>}
                {!loading && filteredMessages.length === 0 && <div className="py-24 text-center text-gray-700 text-sm font-mono"><Inbox className="w-10 h-10 mx-auto mb-4 opacity-40" />No messages.</div>}
                
                <div className="space-y-3">
                  <AnimatePresence>
                    {filteredMessages.map((msg) => (
                      <MessageCard key={msg.id} msg={msg} onMarkRead={handleMarkRead} onExpand={setExpandedMsg} />
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}

            {/* PROJECTS TAB */}
            {activeTab === 'projects' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-georama text-white font-semibold">Portfolio Projects</h2>
                  <button onClick={() => setEditingProject("new")} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-gray-200 active:scale-95 transition-all">
                    <Plus className="w-3.5 h-3.5" /> Add Project
                  </button>
                </div>

                {loading && !projects.length && <div className="py-24 text-center text-gray-600 text-sm font-mono"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-3" />Loading...</div>}
                {!loading && projects.length === 0 && <div className="py-24 text-center text-gray-700 text-sm font-mono"><FolderGit2 className="w-10 h-10 mx-auto mb-4 opacity-40" />No projects yet.</div>}

                <div className="grid grid-cols-1 gap-4">
                  {projects.map((p) => (
                    <div key={p.id} className="p-4 rounded-xl border border-gray-800 bg-[#111214] flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-gray-900 border border-gray-800 flex items-center justify-center text-xl text-gray-400">
                          <FolderGit2 className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm font-semibold text-white">{p.title}</h3>
                            {p.featured && <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">FEATURED</span>}
                          </div>
                          <p className="text-xs text-gray-500 font-mono mt-0.5">{p.category} · {p.youtube_urls?.length || 0} videos</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingProject(p)} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteProject(p.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* CLIENTS TAB */}
            {activeTab === 'clients' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-georama text-white font-semibold">Clients Showcase</h2>
                  <button onClick={() => setEditingClient("new")} className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black text-xs font-medium hover:bg-gray-200 active:scale-95 transition-all">
                    <Plus className="w-3.5 h-3.5" /> Add Client
                  </button>
                </div>

                {loading && !clients.length && <div className="py-24 text-center text-gray-600 text-sm font-mono"><Loader2 className="w-6 h-6 animate-spin mx-auto mb-3" />Loading...</div>}
                {!loading && clients.length === 0 && <div className="py-24 text-center text-gray-700 text-sm font-mono"><Users className="w-10 h-10 mx-auto mb-4 opacity-40" />No clients yet.</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {clients.map((c) => (
                    <div key={c.id} className="p-4 rounded-xl border border-gray-800 bg-[#111214] flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <img src={c.avatar} alt={c.name} className="w-10 h-10 rounded-full border border-gray-700 object-cover" />
                        <div>
                          <h3 className="text-sm font-semibold text-white">{c.name} <span className="text-[#a0f046] ml-2">{c.subs}</span></h3>
                          <p className="text-xs text-gray-500 font-mono mt-0.5">{c.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setEditingClient(c)} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-all"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteClient(c.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-400 transition-all"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-georama text-white font-semibold">Configurações do Site</h2>
                </div>

                <div className="p-6 rounded-xl border border-gray-800 bg-[#111214] space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-2">SOBRE MIM (ABOUT TEXT)</label>
                    <textarea 
                      value={aboutText}
                      onChange={e => setAboutText(e.target.value)}
                      rows={8}
                      className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white font-sans focus:border-gray-600 focus:outline-none transition-colors leading-relaxed"
                      placeholder="Escreva sobre você aqui... Pressione Enter para novos parágrafos."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-2">FOTO DE PERFIL (PROFILE PHOTO)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={async e => {
                        if (e.target.files && e.target.files.length > 0) {
                          setLoading(true);
                          try {
                            const url = await uploadImage(e.target.files[0]);
                            setProfilePhotoUrl(url);
                          } catch (err) {
                            alert("Error uploading image");
                          } finally {
                            setLoading(false);
                          }
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-gray-400 text-sm focus:border-gray-600 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-white/10 file:text-white hover:file:bg-white/20"
                    />
                    {profilePhotoUrl && (
                      <img src={profilePhotoUrl} alt="Profile Preview" className="mt-2 w-16 h-16 rounded-full object-cover border border-gray-700" />
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-2">FOTOS DA GALERIA (ADICIONE MAIS IMAGENS)</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      multiple
                      onChange={async e => {
                        if (e.target.files && e.target.files.length > 0) {
                          setLoading(true);
                          try {
                            const newUrls = [];
                            for (let i = 0; i < e.target.files.length; i++) {
                              const url = await uploadImage(e.target.files[i]);
                              newUrls.push(url);
                            }
                            const existing = photosUrlsInput ? photosUrlsInput.split('\n').filter(u => u.trim()) : [];
                            setPhotosUrlsInput([...existing, ...newUrls].join('\n'));
                          } catch (err) {
                            alert("Error uploading images");
                          } finally {
                            setLoading(false);
                          }
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-gray-400 text-sm focus:border-gray-600 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-white/10 file:text-white hover:file:bg-white/20"
                    />
                    <textarea 
                      value={photosUrlsInput}
                      onChange={e => setPhotosUrlsInput(e.target.value)}
                      rows={4}
                      className="mt-2 w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white font-sans focus:border-gray-600 focus:outline-none transition-colors leading-relaxed"
                      placeholder="As URLs das imagens aparecerão aqui. Você pode apagar linhas para remover."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-2">TEXTO P/ COPIAR NO EMAIL (CONTACT EMAIL)</label>
                    <input 
                      value={contactEmail}
                      onChange={e => setContactEmail(e.target.value)}
                      className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white font-sans focus:border-gray-600 focus:outline-none transition-colors"
                      placeholder="email@exemplo.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-2">URL TWITTER/X</label>
                    <input 
                      value={contactTwitter}
                      onChange={e => setContactTwitter(e.target.value)}
                      className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white font-sans focus:border-gray-600 focus:outline-none transition-colors"
                      placeholder="https://twitter.com/seuperfil"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-2">URL YOUTUBE</label>
                    <input 
                      value={contactYoutube}
                      onChange={e => setContactYoutube(e.target.value)}
                      className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white font-sans focus:border-gray-600 focus:outline-none transition-colors"
                      placeholder="https://youtube.com/c/seucanal"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-2">TEXTO P/ COPIAR NO DISCORD (CONTACT DISCORD)</label>
                    <input 
                      value={contactDiscord}
                      onChange={e => setContactDiscord(e.target.value)}
                      className="w-full bg-black border border-gray-800 rounded-lg p-3 text-sm text-white font-sans focus:border-gray-600 focus:outline-none transition-colors"
                      placeholder="seu_user_discord"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-mono text-gray-500 mb-2">WALLPAPER DA ÁREA DE TRABALHO</label>
                    <input 
                      type="file" 
                      accept="image/*"
                      onChange={async e => {
                        if (e.target.files && e.target.files.length > 0) {
                          setLoading(true);
                          try {
                            const url = await uploadImage(e.target.files[0]);
                            setWallpaperUrl(url);
                          } catch (err) {
                            alert("Error uploading image");
                          } finally {
                            setLoading(false);
                          }
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-gray-800 bg-gray-950 text-gray-400 text-sm focus:border-gray-600 outline-none file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:bg-white/10 file:text-white hover:file:bg-white/20"
                    />
                    {wallpaperUrl && (
                      <img src={wallpaperUrl} alt="Wallpaper Preview" className="mt-2 w-32 h-20 rounded-lg object-cover border border-gray-700" />
                    )}
                  </div>
                  
                  <div className="flex justify-end pt-2">
                    <button 
                      onClick={handleSaveSettings}
                      disabled={loading}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black text-sm font-medium hover:bg-gray-200 active:scale-95 transition-all disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Salvar Configurações
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <LoginModal onLogin={handleLogin} />
          </div>
        )}
      </div>

      {expandedMsg && <MessageModal msg={expandedMsg} onClose={() => setExpandedMsg(null)} onMarkRead={handleMarkRead} />}
      {editingProject && <ProjectForm project={editingProject === "new" ? undefined : editingProject} onSave={handleSaveProject} onCancel={() => setEditingProject(null)} />}
      {editingClient && <ClientForm client={editingClient === "new" ? undefined : editingClient} onSave={handleSaveClient} onCancel={() => setEditingClient(null)} />}
    </>
  );
}
