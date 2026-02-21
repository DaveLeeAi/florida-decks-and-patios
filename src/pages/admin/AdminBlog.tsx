import { useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import { blogPosts as defaultPosts } from "@/data/siteData";
import { useAdminData } from "@/hooks/useAdminData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";

export default function AdminBlog() {
  const { data, save, reset } = useAdminData("blog", defaultPosts);
  const [expanded, setExpanded] = useState<number | null>(null);

  const updatePost = (index: number, key: string, value: string) => {
    const updated = [...data];
    (updated[index] as any)[key] = value;
    save(updated);
  };

  const removePost = (index: number) => {
    save(data.filter((_, i) => i !== index));
    setExpanded(null);
  };

  const addPost = () => {
    save([...data, { slug: `post-${Date.now()}`, title: "New Post", excerpt: "", date: new Date().toISOString().split("T")[0], category: "", content: "" }]);
    setExpanded(data.length);
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">Blog</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage blog posts</p>
        </div>
        <Button onClick={addPost} size="sm">Add Post</Button>
      </div>
      <div className="space-y-3">
        {data.map((post, i) => (
          <Card key={post.slug}>
            <CardHeader className="cursor-pointer pb-3" onClick={() => setExpanded(expanded === i ? null : i)}>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base truncate">{post.title}</CardTitle>
                {expanded === i ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>
            </CardHeader>
            {expanded === i && (
              <CardContent className="space-y-3 pt-0">
                <div className="space-y-1.5">
                  <Label>Title</Label>
                  <Input value={post.title} onChange={(e) => updatePost(i, "title", e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Slug</Label>
                  <Input value={post.slug} onChange={(e) => updatePost(i, "slug", e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label>Category</Label>
                    <Input value={post.category} onChange={(e) => updatePost(i, "category", e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Date</Label>
                    <Input type="date" value={post.date} onChange={(e) => updatePost(i, "date", e.target.value)} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label>Excerpt</Label>
                  <Textarea value={post.excerpt} onChange={(e) => updatePost(i, "excerpt", e.target.value)} rows={2} />
                </div>
                <div className="space-y-1.5">
                  <Label>Content (Markdown)</Label>
                  <Textarea value={post.content} onChange={(e) => updatePost(i, "content", e.target.value)} rows={8} />
                </div>
                <Button variant="destructive" size="sm" onClick={() => removePost(i)}>
                  <Trash2 className="h-3 w-3 mr-1" /> Remove
                </Button>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
      <div className="flex gap-3 mt-4">
        <Button onClick={() => toast.success("Blog saved!")}>Save Changes</Button>
        <Button variant="outline" onClick={() => { reset(); toast.info("Reset to defaults"); }}>Reset</Button>
      </div>
    </AdminLayout>
  );
}
