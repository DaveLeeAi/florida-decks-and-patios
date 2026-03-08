import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FAQSchema } from "@/components/seo/JsonLdSchema";
import { faqEntries, FAQ_CATEGORIES, type FAQCategory } from "@/data/faqData";
import { Search, Shield, ArrowRight, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    let items = faqEntries;
    if (activeTab !== "all") {
      items = items.filter((e) => e.category === activeTab);
    }
    if (q) {
      items = items.filter(
        (e) =>
          e.question.toLowerCase().includes(q) ||
          e.answer.toLowerCase().includes(q)
      );
    }
    return items;
  }, [search, activeTab]);

  const grouped = useMemo(() => {
    const map = new Map<FAQCategory, typeof faqEntries>();
    for (const entry of filtered) {
      const list = map.get(entry.category) || [];
      list.push(entry);
      map.set(entry.category, list);
    }
    return map;
  }, [filtered]);

  const schemaQuestions = useMemo(
    () => faqEntries.map((e) => ({ question: e.question, answer: e.answer })),
    []
  );

  return (
    <Layout>
      <Helmet>
        <title>Florida Deck & Patio FAQ | Common Questions About Outdoor Living</title>
        <meta name="description" content="Answers to common questions about deck installation, patio design, permits, costs, and materials for Florida homeowners. Learn about building outdoor living spaces in Florida's climate." />
      </Helmet>
      <FAQSchema questions={schemaQuestions} />

      {/* Hero */}
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-3">
              <HelpCircle className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">
              Florida Deck &amp; Patio FAQ
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Answers to common questions about building, permitting, and maintaining decks and patios in Florida's unique climate.
            </p>
          </div>

          {/* Search */}
          <div className="relative max-w-xl mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search FAQs… e.g. 'composite' or 'permit'"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex flex-wrap h-auto gap-1 bg-transparent justify-center mb-6">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                All ({faqEntries.length})
              </TabsTrigger>
              {FAQ_CATEGORIES.map((cat) => {
                const count = faqEntries.filter((e) => e.category === cat.id).length;
                return (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    {cat.label} ({count})
                  </TabsTrigger>
                );
              })}
            </TabsList>

            <TabsContent value={activeTab} forceMount className="mt-0">
              {filtered.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p className="text-lg mb-2">No FAQs match your search.</p>
                  <p className="text-sm">Try different keywords or clear the search.</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {(activeTab === "all" ? FAQ_CATEGORIES : FAQ_CATEGORIES.filter((c) => c.id === activeTab)).map((cat) => {
                    const items = grouped.get(cat.id);
                    if (!items || items.length === 0) return null;
                    return (
                      <div key={cat.id} className="bg-card rounded-lg border border-border p-4 md:p-6">
                        <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-1">
                          {cat.label}
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">{cat.description}</p>
                        <Accordion type="multiple" className="w-full">
                          {items.map((faq, idx) => (
                            <AccordionItem key={idx} value={`${cat.id}-${idx}`}>
                              <AccordionTrigger className="text-left text-sm md:text-base font-semibold hover:no-underline">
                                {faq.question}
                              </AccordionTrigger>
                              <AccordionContent>
                                {faq.answerHtml ? (
                                  <p
                                    className="text-sm text-muted-foreground leading-relaxed mb-3"
                                    dangerouslySetInnerHTML={{ __html: faq.answerHtml }}
                                  />
                                ) : (
                                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                    {faq.answer}
                                  </p>
                                )}
                                {(faq.relatedTools || faq.cta) && (
                                  <div className="flex flex-wrap items-center gap-2">
                                    {faq.relatedTools?.map((tool) => (
                                      <Link key={tool.href} to={tool.href}>
                                        <Badge
                                          variant="secondary"
                                          className="cursor-pointer hover:bg-primary/10 transition-colors"
                                        >
                                          {tool.label}
                                          <ArrowRight className="ml-1 h-3 w-3" />
                                        </Badge>
                                      </Link>
                                    ))}
                                    {faq.cta && (
                                      <Link to="/portfolio">
                                        <Badge className="bg-primary text-primary-foreground cursor-pointer">
                                          {faq.cta}
                                          <ArrowRight className="ml-1 h-3 w-3" />
                                        </Badge>
                                      </Link>
                                    )}
                                  </div>
                                )}
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      </div>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Disclaimer */}
          <Alert className="mt-8 border-primary/30 bg-primary/5">
            <Shield className="h-5 w-5 text-primary" />
            <AlertDescription className="text-sm text-foreground leading-relaxed">
              <strong>Disclaimer:</strong> These FAQs are for general informational
              purposes only and do not constitute legal, engineering, or professional
              construction advice. Florida building codes and permit requirements vary
              by municipality — always consult your local building department and a
              licensed contractor for project-specific guidance.
            </AlertDescription>
          </Alert>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary text-primary-foreground">
        <div className="container-narrow mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Planning a Deck or Patio in Florida?
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
            Browse our portfolio of completed Florida deck and patio projects for inspiration, or explore our free planning tools to estimate costs, check permits, and design your outdoor living space.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/portfolio">
              <Button size="lg" variant="secondary" className="text-base px-8">
                View Recent Projects
              </Button>
            </Link>
            <Link to="/tools">
              <Button size="lg" variant="outline" className="text-base px-8 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                Explore Deck &amp; Patio Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
