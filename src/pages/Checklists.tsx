import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { checklists } from "@/data/checklistData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ClipboardCheck, FileCheck, RotateCcw, UserCheck, Download, Mail, Printer, CheckSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";


const iconMap: Record<string, React.ReactNode> = {
  ClipboardCheck: <ClipboardCheck className="h-6 w-6" />,
  FileCheck: <FileCheck className="h-6 w-6" />,
  RotateCcw: <RotateCcw className="h-6 w-6" />,
  UserCheck: <UserCheck className="h-6 w-6" />,
};

function ChecklistCard({ checklist, onDownload }: { checklist: typeof checklists[0]; onDownload: (id: string) => void }) {
  const totalItems = checklist.sections.reduce((sum, s) => sum + s.items.length, 0);

  return (
    <Card className="border-border hover:border-primary/30 transition-colors">
      <CardHeader>
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary shrink-0">
            {iconMap[checklist.icon]}
          </div>
          <div className="flex-1">
            <CardTitle className="text-xl font-heading">{checklist.title}</CardTitle>
            <CardDescription className="mt-1">{checklist.subtitle}</CardDescription>
            <div className="flex gap-2 mt-3">
              <Badge variant="secondary">{checklist.sections.length} Sections</Badge>
              <Badge variant="outline">{totalItems} Items</Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{checklist.description}</p>
        <Button onClick={() => onDownload(checklist.id)} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
          <Download className="h-4 w-4 mr-2" />
          Download Free Checklist
        </Button>
      </CardContent>
    </Card>
  );
}

function PrintableChecklist({ checklist }: { checklist: typeof checklists[0] }) {
  return (
    <div className="space-y-6 print:space-y-4">
      <div className="text-center border-b border-border pb-4">
        <h2 className="text-2xl font-heading font-bold">{checklist.title}</h2>
        <p className="text-muted-foreground">{checklist.subtitle}</p>
        <p className="text-xs text-muted-foreground mt-2">Provided by Florida Decks & Patios • FloridaDecksAndPatios.com</p>
      </div>

      {checklist.sections.map((section, si) => (
        <div key={si}>
          <h3 className="font-heading font-bold text-lg mb-2 text-primary">{section.title}</h3>
          <div className="space-y-1.5">
            {section.items.map((item, ii) => (
              <div key={ii} className="flex items-start gap-3 py-1">
                <div className="mt-0.5 h-4 w-4 border-2 border-muted-foreground/40 rounded-sm shrink-0 print:border-black" />
                <div>
                  <span className="text-sm font-medium">{item.text}</span>
                  {item.detail && (
                    <span className="block text-xs text-muted-foreground mt-0.5">{item.detail}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="border-t border-border pt-4 mt-6">
        <p className="text-xs text-muted-foreground italic">{checklist.footer}</p>
      </div>
    </div>
  );
}

export default function Checklists() {
  const [gateOpen, setGateOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [unlocked, setUnlocked] = useState<Set<string>>(new Set());

  const handleDownloadClick = (id: string) => {
    if (unlocked.has(id)) {
      openPrintView(id);
      return;
    }
    setSelectedId(id);
    setGateOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !selectedId) return;

    setSubmitting(true);
    try {
      const cl = checklists.find(c => c.id === selectedId);
      await supabase.from("leads").insert({
        name,
        email,
        service: `Checklist Download: ${cl?.title ?? selectedId}`,
        message: `Downloaded ${cl?.title}`,
      });
    } catch {}

    setUnlocked(prev => new Set(prev).add(selectedId!));
    setGateOpen(false);
    setSubmitting(false);
    toast.success("Checklist unlocked! Opening print view…");
    setTimeout(() => openPrintView(selectedId!), 500);
  };

  const openPrintView = (id: string) => {
    const el = document.getElementById(`print-${id}`);
    if (!el) return;
    el.classList.remove("hidden");

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html><head><title>${checklists.find(c => c.id === id)?.title}</title>
        <style>
          body { font-family: system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 24px; color: #1a1a1a; }
          h2 { font-size: 24px; margin-bottom: 4px; }
          h3 { font-size: 16px; color: #2d5a27; margin-top: 20px; margin-bottom: 8px; border-bottom: 1px solid #e5e5e5; padding-bottom: 4px; }
          .item { display: flex; gap: 10px; padding: 4px 0; align-items: flex-start; }
          .checkbox { width: 14px; height: 14px; border: 2px solid #666; border-radius: 2px; margin-top: 3px; flex-shrink: 0; }
          .text { font-size: 13px; }
          .detail { font-size: 11px; color: #666; margin-top: 2px; }
          .footer { border-top: 1px solid #ddd; margin-top: 24px; padding-top: 12px; font-size: 11px; color: #888; font-style: italic; }
          .center { text-align: center; }
          .subtitle { color: #666; font-size: 14px; }
          .brand { font-size: 11px; color: #999; margin-top: 8px; }
          @media print { body { padding: 12px; } }
        </style>
        </head><body>
        <div class="center">
          <h2>${checklists.find(c => c.id === id)?.title}</h2>
          <p class="subtitle">${checklists.find(c => c.id === id)?.subtitle}</p>
          <p class="brand">Florida Decks & Patios • FloridaDecksAndPatios.com • (239) 555-0147</p>
        </div>
        ${checklists.find(c => c.id === id)?.sections.map(s => `
          <h3>${s.title}</h3>
          ${s.items.map(i => `
            <div class="item">
              <div class="checkbox"></div>
              <div>
                <div class="text">${i.text}</div>
                ${i.detail ? `<div class="detail">${i.detail}</div>` : ""}
              </div>
            </div>
          `).join("")}
        `).join("")}
        <div class="footer">${checklists.find(c => c.id === id)?.footer}</div>
        </body></html>
      `);
      printWindow.document.close();
      printWindow.print();
    }

    el.classList.add("hidden");
  };

  const selectedChecklist = checklists.find(c => c.id === selectedId);

  return (
    <Layout>
      <Helmet>
        <title>Free Florida Deck Checklists | Inspection, Permit & Contractor Guides</title>
        <meta name="description" content="Download free checklists for Florida deck inspections, permit applications, contractor vetting, and project planning." />
        <link rel="canonical" href="https://florida-decks-and-patios.lovable.app/checklists" />
      </Helmet>
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container-narrow mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <Badge variant="outline" className="mb-4">
              <Download className="h-3.5 w-3.5 mr-1" />
              Free Lead Magnets
            </Badge>
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Free Deck Checklists for Florida Homeowners
            </h1>
            <p className="text-muted-foreground text-lg">
              Professional-grade checklists covering inspections, permits, reinspections, and contractor vetting.
              Download, print, and use on your next deck project.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {checklists.map((cl) => (
              <ChecklistCard key={cl.id} checklist={cl} onDownload={handleDownloadClick} />
            ))}
          </div>

          {/* Inline preview of all checklists */}
          <div className="space-y-8">
            <h2 className="text-2xl font-heading font-bold text-center">Preview All Checklists</h2>
            {checklists.map((cl) => (
              <Card key={cl.id} id={`preview-${cl.id}`} className="border-border">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary">
                      {iconMap[cl.icon]}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{cl.title}</CardTitle>
                      <CardDescription>{cl.sections.reduce((s, sec) => s + sec.items.length, 0)} checklist items</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="multiple" className="space-y-2">
                    {cl.sections.map((section, si) => (
                      <AccordionItem key={si} value={`${cl.id}-${si}`} className="border-border">
                        <AccordionTrigger className="text-sm font-semibold hover:no-underline">
                          <span className="flex items-center gap-2">
                            <CheckSquare className="h-4 w-4 text-primary" />
                            {section.title}
                            <Badge variant="secondary" className="ml-2 text-xs">{section.items.length}</Badge>
                          </span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="space-y-2 pl-2">
                            {section.items.map((item, ii) => (
                              <li key={ii} className="flex items-start gap-2.5 text-sm">
                                <div className="mt-1 h-3.5 w-3.5 border-2 border-muted-foreground/30 rounded-sm shrink-0" />
                                <div>
                                  <span>{item.text}</span>
                                  {item.detail && (
                                    <span className="block text-xs text-muted-foreground mt-0.5">{item.detail}</span>
                                  )}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>

                  <div className="mt-4 flex justify-end">
                    <Button size="sm" onClick={() => handleDownloadClick(cl.id)}>
                      <Printer className="h-4 w-4 mr-1" />
                      Print This Checklist
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Card className="bg-primary/5 border-primary/20 max-w-xl mx-auto">
              <CardContent className="py-8">
                <h3 className="text-xl font-heading font-bold mb-2">Need Help With Your Deck Project?</h3>
                <p className="text-muted-foreground mb-4">
                  Our team handles permits, inspections, and builds across South Florida.
                </p>
                <Link to="/contact">
                  <Button className="bg-amber text-charcoal hover:bg-amber-dark font-bold px-8">
                    Get Free Estimate
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hidden print containers */}
      {checklists.map((cl) => (
        <div key={cl.id} id={`print-${cl.id}`} className="hidden">
          <PrintableChecklist checklist={cl} />
        </div>
      ))}

      {/* Email gate dialog */}
      <Dialog open={gateOpen} onOpenChange={setGateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Download {selectedChecklist?.title}
            </DialogTitle>
            <DialogDescription>
              Enter your info to unlock the printable checklist. We'll also send you helpful deck tips.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Unlocking…" : "Unlock & Print Checklist"}
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              No spam. Unsubscribe anytime. See our <Link to="/privacy" className="underline">Privacy Policy</Link>.
            </p>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
