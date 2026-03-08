import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useSiteData } from "@/contexts/SiteDataContext";
import { ArrowLeft } from "lucide-react";
import ExpertCredentials from "@/components/ExpertCredentials";
import { TechArticleSchema } from "@/components/seo/JsonLdSchema";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts } = useSiteData();
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return <Navigate to="/blog" replace />;

  const otherPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <Layout>
      <TechArticleSchema
        title={post.title}
        description={post.excerpt}
        slug={post.slug}
        datePublished={post.date}
        category={post.category}
      />
      <article className="section-padding bg-background">
        <div className="container-narrow mx-auto max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>

          <div className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">{post.category}</span>
              <span className="text-sm text-muted-foreground">
                {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </span>
            </div>
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight">{post.title}</h1>
          </div>

          <div className="prose max-w-none">
            {post.content.split("\n\n").map((block, i) => {
              if (block.startsWith("## ")) {
                return <h2 key={i} className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">{block.replace("## ", "")}</h2>;
              }
              if (block.startsWith("| ")) {
                const rows = block.split("\n").filter((r) => !r.startsWith("|--"));
                const headers = rows[0]?.split("|").filter(Boolean).map((h) => h.trim());
                const data = rows.slice(1).map((r) => r.split("|").filter(Boolean).map((c) => c.trim()));
                return (
                  <div key={i} className="overflow-x-auto my-6">
                    <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                      <thead><tr className="bg-muted">{headers?.map((h, j) => <th key={j} className="px-4 py-2 text-left font-semibold text-foreground">{h}</th>)}</tr></thead>
                      <tbody>{data.map((row, j) => <tr key={j} className="border-t border-border">{row.map((cell, k) => <td key={k} className="px-4 py-2 text-foreground/80">{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                );
              }
              if (block.startsWith("**") && block.endsWith("**")) {
                return <h3 key={i} className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">{block.replace(/\*\*/g, "")}</h3>;
              }
              if (block.startsWith("- ")) {
                return (
                  <ul key={i} className="space-y-1.5 mb-6 ml-4">
                    {block.split("\n").map((line, j) => <li key={j} className="text-foreground/80 list-disc">{line.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, "$1")}</li>)}
                  </ul>
                );
              }
              if (block.startsWith("1. ")) {
                return (
                  <ol key={i} className="space-y-1.5 mb-6 ml-4 list-decimal">
                    {block.split("\n").map((line, j) => <li key={j} className="text-foreground/80">{line.replace(/^\d+\. /, "")}</li>)}
                  </ol>
                );
              }
              if (block.startsWith("*") && block.endsWith("*") && !block.startsWith("**")) {
                return <p key={i} className="text-sm text-muted-foreground italic mt-4">{block.replace(/^\*|\*$/g, "")}</p>;
              }
              const formatted = block.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
              return <p key={i} className="text-foreground/80 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: formatted }} />;
            })}
          </div>

          <ExpertCredentials />

          <div className="mt-16 pt-8 border-t border-border">
            <h3 className="font-heading text-xl font-semibold text-foreground mb-6">More Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {otherPosts.map((p) => (
                <a key={p.slug} href={`/blog/${p.slug}`} className="group block p-4 rounded-lg border border-border hover:border-primary/30 transition-colors cursor-pointer">
                  <span className="text-xs text-primary font-medium">{p.category}</span>
                  <h4 className="font-heading text-sm font-semibold text-foreground mt-1 group-hover:text-primary transition-colors leading-tight">{p.title}</h4>
                </a>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
