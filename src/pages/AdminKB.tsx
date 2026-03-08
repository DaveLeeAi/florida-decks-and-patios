import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Loader2, Upload, Database, CheckCircle2, Trash2, Pencil, X, Save, Search, ChevronDown, ChevronUp,
} from "lucide-react";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface KBEntry {
  id: string;
  content: string;
  metadata: Record<string, string> | null;
  created_at: string;
}

export default function AdminKB() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<{ chunks: number } | null>(null);

  // KB entries state
  const [entries, setEntries] = useState<KBEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editCategory, setEditCategory] = useState("");
  const [editSource, setEditSource] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchEntries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("knowledge_entries")
      .select("id, content, metadata, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load entries");
      console.error(error);
    } else {
      setEntries(data as KBEntry[]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleProcess = async () => {
    if (!text.trim()) {
      toast.error("Please paste some text to process");
      return;
    }

    setProcessing(true);
    setResults(null);

    try {
      const { data, error } = await supabase.functions.invoke("kb-embed", {
        body: {
          text: text.trim(),
          metadata: {
            category: category || "general",
            source: source || "manual",
            addedAt: new Date().toISOString(),
          },
        },
      });

      if (error) throw error;

      setResults({ chunks: data.chunks });
      toast.success(`Successfully processed ${data.chunks} chunks into the knowledge base`);
      setText("");
      fetchEntries();
    } catch (err) {
      console.error("Processing error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to process text");
    } finally {
      setProcessing(false);
    }
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("knowledge_entries").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete entry");
    } else {
      toast.success("Entry deleted");
      setEntries((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const startEdit = (entry: KBEntry) => {
    setEditingId(entry.id);
    setEditContent(entry.content);
    setEditCategory((entry.metadata as Record<string, string>)?.category || "");
    setEditSource((entry.metadata as Record<string, string>)?.source || "");
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;
    const { error } = await supabase
      .from("knowledge_entries")
      .update({
        content: editContent,
        metadata: {
          category: editCategory || "general",
          source: editSource || "manual",
          editedAt: new Date().toISOString(),
        },
      })
      .eq("id", editingId);

    if (error) {
      toast.error("Failed to update entry");
    } else {
      toast.success("Entry updated");
      setEditingId(null);
      fetchEntries();
    }
  };

  const filtered = entries.filter(
    (e) =>
      e.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      JSON.stringify(e.metadata).toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="section-padding bg-background min-h-screen">
        <div className="container-narrow mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <Database className="h-6 w-6 text-primary" />
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Knowledge Base Manager
            </h1>
            <Badge variant="secondary" className="ml-auto">
              {entries.length} entries
            </Badge>
          </div>

          {/* Add new entry */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Add Knowledge Entry</CardTitle>
              <CardDescription>
                Paste research text below. It will be chunked, embedded, and stored for RAG retrieval.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., coastal-durability, permits, roi"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="source">Source</Label>
                  <Input
                    id="source"
                    placeholder="e.g., FBC 2026, internal research"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="text">Research Text</Label>
                <Textarea
                  id="text"
                  placeholder="Paste your research text here..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[200px] font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {text.length} characters · ~{Math.ceil(text.length / 900)} chunks
                </p>
              </div>

              <Button
                onClick={handleProcess}
                disabled={processing || !text.trim()}
                className="w-full bg-primary text-primary-foreground"
                size="lg"
              >
                {processing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing & Embedding...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Process into Knowledge Base
                  </>
                )}
              </Button>

              {results && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                  <p className="text-sm font-medium text-foreground">
                    Successfully embedded {results.chunks} chunks
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Existing entries */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Knowledge Entries</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 h-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : filtered.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  {searchQuery ? "No entries match your search" : "No entries yet"}
                </p>
              ) : (
                <div className="space-y-3">
                  {filtered.map((entry) => {
                    const meta = entry.metadata as Record<string, string> | null;
                    const isEditing = editingId === entry.id;
                    const isExpanded = expandedId === entry.id;

                    return (
                      <div
                        key={entry.id}
                        className="border rounded-lg p-4 bg-card hover:border-primary/30 transition-colors"
                      >
                        {isEditing ? (
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <Input
                                placeholder="Category"
                                value={editCategory}
                                onChange={(e) => setEditCategory(e.target.value)}
                              />
                              <Input
                                placeholder="Source"
                                value={editSource}
                                onChange={(e) => setEditSource(e.target.value)}
                              />
                            </div>
                            <Textarea
                              value={editContent}
                              onChange={(e) => setEditContent(e.target.value)}
                              className="min-h-[150px] font-mono text-sm"
                            />
                            <div className="flex gap-2">
                              <Button size="sm" onClick={handleSaveEdit}>
                                <Save className="h-3.5 w-3.5 mr-1" /> Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditingId(null)}>
                                <X className="h-3.5 w-3.5 mr-1" /> Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                  {meta?.category && (
                                    <Badge variant="secondary" className="text-xs">
                                      {meta.category}
                                    </Badge>
                                  )}
                                  {meta?.source && (
                                    <Badge variant="outline" className="text-xs">
                                      {meta.source}
                                    </Badge>
                                  )}
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(entry.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                                <p className="text-sm text-foreground leading-relaxed">
                                  {isExpanded
                                    ? entry.content
                                    : entry.content.length > 200
                                      ? entry.content.slice(0, 200) + "…"
                                      : entry.content}
                                </p>
                                {entry.content.length > 200 && (
                                  <button
                                    onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                                    className="text-xs text-primary mt-1 flex items-center gap-1 hover:underline"
                                  >
                                    {isExpanded ? (
                                      <>Show less <ChevronUp className="h-3 w-3" /></>
                                    ) : (
                                      <>Show more <ChevronDown className="h-3 w-3" /></>
                                    )}
                                  </button>
                                )}
                              </div>
                              <div className="flex gap-1 shrink-0">
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8"
                                  onClick={() => startEdit(entry)}
                                >
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8 text-destructive hover:text-destructive"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent>
                                    <AlertDialogHeader>
                                      <AlertDialogTitle>Delete this entry?</AlertDialogTitle>
                                      <AlertDialogDescription>
                                        This will permanently remove the knowledge entry. This action cannot be undone.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                                      <AlertDialogAction onClick={() => handleDelete(entry.id)}>
                                        Delete
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
