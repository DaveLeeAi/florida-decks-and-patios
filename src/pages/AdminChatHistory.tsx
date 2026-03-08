import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut, MessageCircle, Search, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

interface ChatMessage {
  id: string;
  session_id: string;
  role: string;
  content: string;
  created_at: string;
  context_used: any;
}

interface SessionSummary {
  session_id: string;
  message_count: number;
  first_message: string;
  last_message: string;
  preview: string;
}

function useAdminGuard() {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login", { replace: true });
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) navigate("/admin/login", { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
}

export default function AdminChatHistory() {
  useAdminGuard();
  const navigate = useNavigate();
  const [sessions, setSessions] = useState<SessionSummary[]>([]);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchSessions = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("chat_logs")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching chat logs:", error);
      setLoading(false);
      return;
    }

    // Group by session
    const sessionMap = new Map<string, ChatMessage[]>();
    for (const msg of data || []) {
      if (!sessionMap.has(msg.session_id)) {
        sessionMap.set(msg.session_id, []);
      }
      sessionMap.get(msg.session_id)!.push(msg);
    }

    const summaries: SessionSummary[] = [];
    sessionMap.forEach((msgs, session_id) => {
      const sorted = msgs.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
      const userMsgs = sorted.filter((m) => m.role === "user");
      summaries.push({
        session_id,
        message_count: sorted.length,
        first_message: sorted[0]?.created_at || "",
        last_message: sorted[sorted.length - 1]?.created_at || "",
        preview: userMsgs[0]?.content?.slice(0, 100) || "(no user message)",
      });
    });

    summaries.sort((a, b) => new Date(b.last_message).getTime() - new Date(a.last_message).getTime());
    setSessions(summaries);
    setLoading(false);
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const loadSession = async (sessionId: string) => {
    if (selectedSession === sessionId) {
      setSelectedSession(null);
      return;
    }
    setSelectedSession(sessionId);
    const { data } = await supabase
      .from("chat_logs")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });
    setMessages(data || []);
  };

  const filteredSessions = searchQuery
    ? sessions.filter(
        (s) =>
          s.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.session_id.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : sessions;

  const formatDate = (d: string) =>
    new Date(d).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> Dashboard
            </Link>
            <span className="text-border">|</span>
            <span className="font-heading font-bold text-foreground flex items-center gap-2">
              <MessageCircle className="h-4 w-4" /> Chat History
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground gap-1"
            onClick={async () => {
              await supabase.auth.signOut();
              navigate("/admin/login");
            }}
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search & Refresh */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <Button variant="outline" size="sm" onClick={fetchSessions} className="gap-1">
            <RefreshCw className="h-4 w-4" /> Refresh
          </Button>
          <span className="text-sm text-muted-foreground">
            {filteredSessions.length} session{filteredSessions.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No chat sessions found</p>
            <p className="text-sm mt-1">Chat conversations will appear here once users start chatting.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredSessions.map((session) => (
              <div key={session.session_id} className="border border-border rounded-lg bg-card overflow-hidden">
                <button
                  onClick={() => loadSession(session.session_id)}
                  className="w-full text-left p-4 hover:bg-muted/50 transition-colors flex items-center justify-between"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">
                        {session.session_id.slice(0, 8)}...
                      </span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">
                        {session.message_count} msg{session.message_count !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <p className="text-sm text-foreground truncate">{session.preview}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDate(session.first_message)}
                      {session.first_message !== session.last_message && ` → ${formatDate(session.last_message)}`}
                    </p>
                  </div>
                  {selectedSession === session.session_id ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-2" />
                  )}
                </button>

                {selectedSession === session.session_id && (
                  <div className="border-t border-border p-4 bg-muted/30 space-y-3 max-h-[500px] overflow-y-auto">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div
                          className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground rounded-br-sm"
                              : "bg-card border border-border text-foreground rounded-bl-sm"
                          }`}
                        >
                          <p className="whitespace-pre-wrap">{msg.content}</p>
                          <p className={`text-[10px] mt-1 ${msg.role === "user" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
                            {formatDate(msg.created_at)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
