import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { heroSlides as defaultHero, testimonials as defaultTestimonials, trustBadges as defaultBadges } from "@/data/siteData";
import { useAdminData } from "@/hooks/useAdminData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminContent() {
  const heroData = useAdminData("heroSlides", defaultHero);
  const testimonialData = useAdminData("testimonials", defaultTestimonials);
  const badgeData = useAdminData("trustBadges", defaultBadges);
  const [expandedHero, setExpandedHero] = useState<number | null>(null);
  const [expandedTest, setExpandedTest] = useState<number | null>(null);

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Content</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage hero slides, testimonials, and trust badges</p>
      </div>
      <Tabs defaultValue="hero">
        <TabsList>
          <TabsTrigger value="hero">Hero Slides</TabsTrigger>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="badges">Trust Badges</TabsTrigger>
        </TabsList>

        <TabsContent value="hero" className="space-y-3 mt-4">
          {heroData.data.map((slide, i) => (
            <Card key={i}>
              <CardHeader className="cursor-pointer pb-3" onClick={() => setExpandedHero(expandedHero === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{slide.headline}</CardTitle>
                  {expandedHero === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </CardHeader>
              {expandedHero === i && (
                <CardContent className="space-y-3 pt-0">
                  <div className="space-y-1.5">
                    <Label>Headline</Label>
                    <Input value={slide.headline} onChange={(e) => {
                      const d = [...heroData.data]; d[i] = { ...d[i], headline: e.target.value }; heroData.save(d);
                    }} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Subheadline</Label>
                    <Input value={slide.subheadline} onChange={(e) => {
                      const d = [...heroData.data]; d[i] = { ...d[i], subheadline: e.target.value }; heroData.save(d);
                    }} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Alt Text</Label>
                    <Input value={slide.alt} onChange={(e) => {
                      const d = [...heroData.data]; d[i] = { ...d[i], alt: e.target.value }; heroData.save(d);
                    }} />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
          <div className="flex gap-3">
            <Button onClick={() => toast.success("Hero slides saved!")}>Save</Button>
            <Button variant="outline" onClick={() => { heroData.reset(); toast.info("Reset"); }}>Reset</Button>
          </div>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-3 mt-4">
          {testimonialData.data.map((t, i) => (
            <Card key={i}>
              <CardHeader className="cursor-pointer pb-3" onClick={() => setExpandedTest(expandedTest === i ? null : i)}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">{t.name}</CardTitle>
                  {expandedTest === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </div>
              </CardHeader>
              {expandedTest === i && (
                <CardContent className="space-y-3 pt-0">
                  {[
                    { key: "name", label: "Name" },
                    { key: "location", label: "Location" },
                    { key: "text", label: "Testimonial" },
                    { key: "note", label: "Note" },
                  ].map((f) => (
                    <div key={f.key} className="space-y-1.5">
                      <Label>{f.label}</Label>
                      {f.key === "text" ? (
                        <Textarea value={(t as any)[f.key]} onChange={(e) => {
                          const d = [...testimonialData.data]; (d[i] as any)[f.key] = e.target.value; testimonialData.save(d);
                        }} />
                      ) : (
                        <Input value={(t as any)[f.key]} onChange={(e) => {
                          const d = [...testimonialData.data]; (d[i] as any)[f.key] = e.target.value; testimonialData.save(d);
                        }} />
                      )}
                    </div>
                  ))}
                  <div className="space-y-1.5">
                    <Label>Rating (1-5)</Label>
                    <Input type="number" min={1} max={5} value={t.rating} onChange={(e) => {
                      const d = [...testimonialData.data]; d[i] = { ...d[i], rating: Number(e.target.value) }; testimonialData.save(d);
                    }} />
                  </div>
                </CardContent>
              )}
            </Card>
          ))}
          <div className="flex gap-3">
            <Button onClick={() => toast.success("Testimonials saved!")}>Save</Button>
            <Button variant="outline" onClick={() => { testimonialData.reset(); toast.info("Reset"); }}>Reset</Button>
          </div>
        </TabsContent>

        <TabsContent value="badges" className="space-y-3 mt-4">
          {badgeData.data.map((badge, i) => (
            <Card key={i}>
              <CardContent className="pt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Title</Label>
                    <Input value={badge.title} onChange={(e) => {
                      const d = [...badgeData.data]; d[i] = { ...d[i], title: e.target.value }; badgeData.save(d);
                    }} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Icon</Label>
                    <Input value={badge.icon} onChange={(e) => {
                      const d = [...badgeData.data]; d[i] = { ...d[i], icon: e.target.value }; badgeData.save(d);
                    }} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Text</Label>
                  <Input value={badge.text} onChange={(e) => {
                    const d = [...badgeData.data]; d[i] = { ...d[i], text: e.target.value }; badgeData.save(d);
                  }} />
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="flex gap-3">
            <Button onClick={() => toast.success("Trust badges saved!")}>Save</Button>
            <Button variant="outline" onClick={() => { badgeData.reset(); toast.info("Reset"); }}>Reset</Button>
          </div>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
}
