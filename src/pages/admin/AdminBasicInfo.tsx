import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { COMPANY } from "@/data/siteData";
import { useAdminData } from "@/hooks/useAdminData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

export default function AdminBasicInfo() {
  const { data, save, reset } = useAdminData("company", COMPANY);

  const handleChange = (key: string, value: string) => {
    save({ ...data, [key]: value });
  };

  const fields = [
    { key: "name", label: "Company Name" },
    { key: "phone", label: "Phone" },
    { key: "phoneDisplay", label: "Phone Display" },
    { key: "email", label: "Email" },
    { key: "address", label: "Address" },
    { key: "city", label: "City" },
    { key: "state", label: "State" },
    { key: "zip", label: "ZIP" },
    { key: "tagline", label: "Tagline" },
  ];

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-heading font-bold text-foreground">Basic Info</h1>
        <p className="text-muted-foreground text-sm mt-1">Edit your company information</p>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-4">
          {fields.map((f) => (
            <div key={f.key} className="space-y-1.5">
              <Label>{f.label}</Label>
              <Input
                value={(data as any)[f.key] || ""}
                onChange={(e) => handleChange(f.key, e.target.value)}
              />
            </div>
          ))}
          <div className="flex gap-3 pt-4">
            <Button onClick={() => { save(data); toast.success("Saved!"); }}>Save Changes</Button>
            <Button variant="outline" onClick={() => { reset(); toast.info("Reset to defaults"); }}>Reset</Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
