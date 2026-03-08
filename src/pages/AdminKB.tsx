import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Upload, Database, CheckCircle2 } from "lucide-react";

export default function AdminKB() {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [source, setSource] = useState("");
  const [processing, setProcessing] = useState(false);
  const [results, setResults] = useState<{ chunks: number } | null>(null);

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
    } catch (err) {
      console.error("Processing error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to process text");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="section-padding bg-background min-h-screen">
        <div className="container-narrow mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <Database className="h-6 w-6 text-primary" />
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Knowledge Base Manager
            </h1>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Add Knowledge Entry</CardTitle>
              <CardDescription>
                Paste research text below. It will be chunked, embedded, and stored for RAG retrieval by the Suncoast Expert chatbot.
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
                  placeholder="Paste your research text here... It will be automatically split into ~1000 character chunks with overlap for optimal retrieval."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-[300px] font-mono text-sm"
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
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Successfully embedded {results.chunks} chunks
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Knowledge is now available to the Suncoast Expert chatbot
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="shrink-0 mt-0.5 text-xs">1</Badge>
                  Paste full articles, guides, or research — the system auto-chunks at ~1000 chars
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="shrink-0 mt-0.5 text-xs">2</Badge>
                  Use descriptive categories to help organize retrieval context
                </li>
                <li className="flex items-start gap-2">
                  <Badge variant="outline" className="shrink-0 mt-0.5 text-xs">3</Badge>
                  Florida-specific data (codes, costs, permits) produces the best chatbot answers
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
