import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { services as defaultServices } from "@/data/siteData";
import { useAdminData } from "@/hooks/useAdminData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AdminServices() {
  const { data, save, reset } = useAdminData("services", defaultServices);
  const [expanded, setExpanded] = useState<number | null>(null);

  const updateService = (index: number, key: string, value: string) => {
    const updated = [...data];
    (updated[index] as any)[key] = value;
    save(updated);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Services</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage your service offerings</p>
      </div>
      <div className="space-y-3">
        {data.map((service, i) => (
          <Card key={service.slug}>
            <CardHeader
              className="cursor-pointer pb-3"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{service.shortTitle}</CardTitle>
                {expanded === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardHeader>
            {expanded === i && (
              <CardContent className="space-y-3 pt-0">
                <div className="space-y-1.5">
                  <Label>Title</Label>
                  <Input value={service.title} onChange={(e) => updateService(i, "title", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Short Title</Label>
                  <Input value={service.shortTitle} onChange={(e) => updateService(i, "shortTitle", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea value={service.description} onChange={(e) => updateService(i, "description", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Price Range</Label>
                  <Input value={service.priceRange} onChange={(e) => updateService(i, "priceRange", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Icon</Label>
                  <Input value={service.icon} onChange={(e) => updateService(i, "icon", e.target.value)} />
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <Button onClick={() => toast.success("Services saved!")}>Save Changes</Button>
        <Button variant="outline" onClick={() => { reset(); toast.info("Reset to defaults"); }}>Reset</Button>
      </div>
    </AdminLayout>
  );
}
