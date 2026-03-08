import { useState, useRef, useEffect, useCallback, lazy, Suspense } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "sonner";

type Message = { role: "user" | "assistant"; content: string };

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/kb-chat`;

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I'm your **Florida Deck Assistant**. I can help with Florida permit info, material costs, and finding local pros. What can I help you with?",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    let assistantSoFar = "";
    const conversationHistory = messages
      .filter((m) => m !== WELCOME_MESSAGE)
      .concat(userMsg);

    try {
      const resp = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          message: trimmed,
          sessionId,
          history: conversationHistory.slice(-6),
        }),
      });

      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        if (resp.status === 429) {
          toast.error("Rate limit reached. Please wait a moment.");
          return;
        }
        if (resp.status === 402) {
          toast.error("Service temporarily unavailable.");
          return;
        }
        throw new Error(errData.error || "Chat request failed");
      }

      // Get session ID from header
      const sid = resp.headers.get("X-Session-Id");
      if (sid) setSessionId(sid);

      if (!resp.body) throw new Error("No response body");

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && last !== WELCOME_MESSAGE) {
                  return prev.map((m, i) =>
                    i === prev.length - 1
                      ? { ...m, content: assistantSoFar }
                      : m
                  );
                }
                return [
                  ...prev,
                  { role: "assistant", content: assistantSoFar },
                ];
              });
            }
          } catch {
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Flush remaining
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) {
              assistantSoFar += content;
              setMessages((prev) => {
                const last = prev[prev.length - 1];
                if (last?.role === "assistant" && last !== WELCOME_MESSAGE) {
                  return prev.map((m, i) =>
                    i === prev.length - 1
                      ? { ...m, content: assistantSoFar }
                      : m
                  );
                }
                return [
                  ...prev,
                  { role: "assistant", content: assistantSoFar },
                ];
              });
            }
          } catch {
            /* ignore */
          }
        }
      }
      // Log the assistant response to DB
      if (assistantSoFar) {
        const sid = sessionId;
        if (sid) {
          const { supabase } = await import("@/integrations/supabase/client");
          await supabase.from("chat_logs").insert({
            session_id: sid,
            role: "assistant",
            content: assistantSoFar,
            context_used: [],
          }).then(({ error }) => {
            if (error) console.error("Failed to log assistant message:", error);
          });
        }
      }
    } catch (e) {
      console.error("Chat error:", e);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting right now. Please try again in a moment, or call us directly for immediate help.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages, sessionId]);

  const hasCostMention = (text: string) =>
    /\$[\d,]+|cost|price|estimate|budget|quote/i.test(text);

  return (
    <>
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-5 py-3 shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
          aria-label="Open chat assistant"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm font-semibold hidden sm:inline">
            Ask the Expert
          </span>
        </button>
      )}

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-3rem)] flex flex-col bg-card border border-border rounded-2xl shadow-2xl overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center text-xs font-bold">
                FL
              </div>
              <div>
                <p className="text-sm font-semibold">Suncoast Expert</p>
                <p className="text-xs text-primary-foreground/70">
                  Florida Deck & Patio Advisor
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i}>
                <div
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "ml-auto bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted text-foreground rounded-bl-sm"
                  }`}
                >
                  <SimpleMarkdown text={msg.content} />
                </div>

                {/* Cost-triggered CTA */}
                {msg.role === "assistant" &&
                  i > 0 &&
                  hasCostMention(msg.content) && (
                    <div className="mt-2 ml-0">
                      <Link to="/contact">
                        <Button
                          size="sm"
                          className="bg-amber text-charcoal hover:bg-amber-dark text-xs font-semibold"
                        >
                          Get Final Quote →
                        </Button>
                      </Link>
                    </div>
                  )}
              </div>
            ))}

            {loading &&
              messages[messages.length - 1]?.role === "user" && (
                <div className="flex items-center gap-2 text-muted-foreground text-xs">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Thinking...
                </div>
              )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about decks, permits, costs..."
                className="flex-1 bg-muted text-foreground text-sm rounded-lg px-3 py-2 border border-border focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground"
                disabled={loading}
              />
              <Button
                type="submit"
                size="sm"
                disabled={loading || !input.trim()}
                className="bg-primary text-primary-foreground shrink-0"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

/** Lightweight inline markdown: bold + line breaks */
function SimpleMarkdown({ text }: { text: string }) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold">
              {part.slice(2, -2)}
            </strong>
          );
        }
        // Handle line breaks
        const lines = part.split("\n");
        return lines.map((line, j) => (
          <span key={`${i}-${j}`}>
            {line}
            {j < lines.length - 1 && <br />}
          </span>
        ));
      })}
    </>
  );
}
