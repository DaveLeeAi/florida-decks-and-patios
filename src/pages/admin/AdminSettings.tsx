import AdminLayout from "@/components/AdminLayout";
import { useAdminData } from "@/hooks/useAdminData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const defaultSettings = {
  metaTitle: "Timber & Stone Outdoor | Premium Deck Building",
  metaDescription: "Expert outdoor building services in Roswell, GA. Custom decks, pergolas, porches, and outdoor kitchens.",
  googleAnalyticsId: "",
  favicon: "",
  footerText: "© 2026 Timber & Stone Outdoor. All rights reserved.",
};

export default function AdminSettings() {
  const { data, save, reset } = useAdminData("settings", defaultSettings);
  const update = (key: string, value: string) => save({ ...data, [key]: value });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">General website settings</p>
      </div>
      <div className="space-y-4">
        <Card>
          <CardHeader><CardTitle className="text-base">SEO</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label>Meta Title</Label>
              <Input value={data.metaTitle} onChange={(e) => update("metaTitle", e.target.value)} />
            </div>
            <div className="space-y-1.5">
              <Label>Meta Description</Label>
              <Textarea value={data.metaDescription} onChange={(e) => update("metaDescription", e.target.value)} rows={3} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Integrations</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label>Google Analytics ID</Label>
              <Input value={data.googleAnalyticsId} onChange={(e) => update("googleAnalyticsId", e.target.value)} placeholder="G-XXXXXXXXXX" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">Footer</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <Label>Footer Text</Label>
              <Input value={data.footerText} onChange={(e) => update("footerText", e.target.value)} />
            </div>
          </CardContent>
        </Card>
        <div className="flex gap-3">
          <Button onClick={() => toast.success("Settings saved!")}>Save Changes</Button>
          <Button variant="outline" onClick={() => { reset(); toast.info("Reset"); }}>Reset</Button>
        </div>
      </div>
    </AdminLayout>
  );
}
