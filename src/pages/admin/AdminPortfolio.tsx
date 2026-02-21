import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { portfolioProjects as defaultPortfolio } from "@/data/siteData";
import { useAdminData } from "@/hooks/useAdminData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

export default function AdminPortfolio() {
  const { data, save, reset } = useAdminData("portfolio", defaultPortfolio);
  const [expanded, setExpanded] = useState<number | null>(null);

  const updateProject = (index: number, key: string, value: string) => {
    const updated = [...data];
    (updated[index] as any)[key] = value;
    save(updated);
  };

  const removeProject = (index: number) => {
    save(data.filter((_, i) => i !== index));
    setExpanded(null);
    toast.success("Project removed");
  };

  const addProject = () => {
    save([...data, { id: Date.now(), title: "New Project", category: "", description: "", location: "", image: "" }]);
    setExpanded(data.length);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage portfolio projects</p>
        </div>
        <Button onClick={addProject} size="sm">Add Project</Button>
      </div>
      <div className="space-y-3">
        {data.map((project, i) => (
          <Card key={project.id}>
            <CardHeader className="cursor-pointer pb-3" onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{project.title}</CardTitle>
                {expanded === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardHeader>
            {expanded === i && (
              <CardContent className="space-y-3 pt-0">
                <div className="space-y-1.5">
                  <Label>Title</Label>
                  <Input value={project.title} onChange={(e) => updateProject(i, "title", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Input value={project.category} onChange={(e) => updateProject(i, "category", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Description</Label>
                  <Textarea value={project.description} onChange={(e) => updateProject(i, "description", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Location</Label>
                  <Input value={project.location} onChange={(e) => updateProject(i, "location", e.target.value)} />
                </div>
                <Button variant="destructive" size="sm" onClick={() => removeProject(i)} className="mt-2">
                  <Trash2 className="h-3 w-3 mr-1" /> Remove
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <Button onClick={() => toast.success("Portfolio saved!")}>Save Changes</Button>
        <Button variant="outline" onClick={() => { reset(); toast.info("Reset to defaults"); }}>Reset</Button>
      </div>
    </AdminLayout>
  );
}
