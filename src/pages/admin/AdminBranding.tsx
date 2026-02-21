import AdminLayout from "@/components/AdminLayout";
import { useAdminData } from "@/hooks/useAdminData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const defaultBranding = {
  primaryColor: "#2d5a27",
  secondaryColor: "#8b7355",
  accentColor: "#d4a843",
  logoEmoji: "🪵",
  headingFont: "Playfair Display",
  bodyFont: "Inter",
};

export default function AdminBranding() {
  const { data, save, reset } = useAdminData("branding", defaultBranding);
  const update = (key: string, value: string) => save({ ...data, [key]: value });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Branding</h1>
        <p className="text-muted-foreground text-sm mt-1">Customize colors, fonts, and logo</p>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle className="text-base">Colors</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { key: "primaryColor", label: "Primary Color" },
              { key: "secondaryColor", label: "Secondary Color" },
              { key: "accentColor", label: "Accent Color" },
            ].map((f) => (
              <div key={f.key} className="flex items-center gap-3">
                <input
                  type="color"
                  value={(data as any)[f.key]}
                  onChange={(e) => update(f.key, e.target.value)}
                  className="h-10 w-10 rounded border cursor-pointer"
                />
                <div className="flex-1 space-y-1">
                  <Label>{f.label}</Label>
                  <Input value={(data as any)[f.key]} onChange={(e) => update(f.key, e.target.value)} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Typography & Logo</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label>Logo Emoji</Label>
              <Input value={data.logoEmoji} onChange={(e) => update("logoEmoji", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Heading Font</Label>
              <Input value={data.headingFont} onChange={(e) => update("headingFont", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Body Font</Label>
              <Input value={data.bodyFont} onChange={(e) => update("bodyFont", e.target.value)} />
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-3">
          <Button onClick={() => toast.success("Branding saved!")}>Save Changes</Button>
          <Button variant="outline" onClick={() => { reset(); toast.info("Reset"); }}>Reset</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
