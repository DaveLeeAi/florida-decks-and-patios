import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { useAdminData } from "@/hooks/useAdminData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Trash2, GripVertical } from "lucide-react";

const defaultNav = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Tools", path: "/tools" },
  { label: "Portfolio", path: "/portfolio" },
  { label: "Blog", path: "/blog" },
  { label: "Contact", path: "/contact" },
];

export default function AdminNavigation() {
  const { data, save, reset } = useAdminData("navigation", defaultNav);

  const update = (i: number, key: string, value: string) => {
    const updated = [...data];
    (updated[i] as any)[key] = value;
    save(updated);
  };

  const remove = (i: number) => save(data.filter((_, idx) => idx !== i));
  const add = () => save([...data, { label: "New Link", path: "/new" }]);

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Navigation</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage header menu links</p>
        </div>
        <Button onClick={add} size="sm">Add Link</Button>
      </div>
      <Card>
        <CardContent className="pt-6 space-y-3">
          {data.map((link, i) => (
            <div key={i} className="flex items-center gap-3">
              <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 grid grid-cols-2 gap-2">
                <Input placeholder="Label" value={link.label} onChange={(e) => update(i, "label", e.target.value)} />
                <Input placeholder="Path" value={link.path} onChange={(e) => update(i, "path", e.target.value)} />
              </div>
              <Button variant="ghost" size="icon" onClick={() => remove(i)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
          <div className="flex gap-3 pt-4">
            <Button onClick={() => toast.success("Navigation saved!")}>Save Changes</Button>
            <Button variant="outline" onClick={() => { reset(); toast.info("Reset"); }}>Reset</Button>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
