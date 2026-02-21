import AdminLayout from "@/components/AdminLayout";
import { COMPANY } from "@/data/siteData";
import { useAdminData } from "@/hooks/useAdminData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminContact() {
  const { data, save, reset } = useAdminData("contact", {
    phone: COMPANY.phone,
    phoneDisplay: COMPANY.phoneDisplay,
    email: COMPANY.email,
    address: COMPANY.address,
    city: COMPANY.city,
    state: COMPANY.state,
    zip: COMPANY.zip,
    mapEmbed: "",
    businessHours: "Mon-Fri 8am-6pm, Sat 9am-2pm",
  });

  const update = (key: string, value: string) => save({ ...data, [key]: value });

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Contact Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Manage contact page information</p>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          {[
            { key: "phone", label: "Phone" },
            { key: "phoneDisplay", label: "Phone Display" },
            { key: "email", label: "Email" },
            { key: "address", label: "Address" },
            { key: "city", label: "City" },
            { key: "state", label: "State" },
            { key: "zip", label: "ZIP" },
            { key: "businessHours", label: "Business Hours" },
            { key: "mapEmbed", label: "Google Maps Embed URL" },
          ].map((f) => (
            <div key={f.key} className="space-y-1.5">
              <Label>{f.label}</Label>
              <Input value={(data as any)[f.key] || ""} onChange={(e) => update(f.key, e.target.value)} />
            </div>
          ))}
          <div className="flex gap-3 pt-4">
            <Button onClick={() => toast.success("Contact settings saved!")}>Save Changes</Button>
            <Button variant="outline" onClick={() => { reset(); toast.info("Reset"); }}>Reset</Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
