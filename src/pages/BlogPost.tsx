import { useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useSiteData } from "@/contexts/SiteDataContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ExpertCredentials from "@/components/ExpertCredentials";
import { TechArticleSchema } from "@/components/seo/JsonLdSchema";
import { Button } from "@/components/ui/button";

function renderInlineMarkdown(text: string): string {
  // Bold
  let result = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  // Internal links [text](/path)
  result = result.replace(
    /\[([^\]]+)\]\(\/([^)]+)\)/g,
    '<a href="/$2" class="text-primary underline hover:text-primary/80">$1</a>'
  );
  return result;
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const { blogPosts } = useSiteData();
  const post = blogPosts.find((p) => p.slug === slug);

  // Scroll to top when navigating between blog posts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [slug]);

  if (!post) return <Navigate to="/blog" replace />;

  // Related posts from relatedSlugs if available, otherwise fallback to category + recency
  const relatedPosts = (post as any).relatedSlugs
    ? ((post as any).relatedSlugs as string[])
        .map((s: string) => blogPosts.find((p) => p.slug === s))
        .filter(Boolean)
        .slice(0, 4)
    : blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  const otherPosts = blogPosts.filter((p) => p.slug !== slug && !relatedPosts.some((r: any) => r.slug === p.slug)).slice(0, 3);

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
            {/* SEO description visible to users */}
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">{post.excerpt}</p>
          </div>

          <div className="prose max-w-none">
            {post.content.split("\n\n").map((block, i) => {
              // H2
              if (block.startsWith("## ")) {
                return <h2 key={i} className="font-heading text-2xl font-bold text-foreground mt-10 mb-4">{block.replace("## ", "")}</h2>;
              }
              // H3
              if (block.startsWith("### ")) {
                return <h3 key={i} className="font-heading text-xl font-semibold text-foreground mt-8 mb-3">{block.replace("### ", "")}</h3>;
              }
              // Table
              if (block.startsWith("| ")) {
                const rows = block.split("\n").filter((r) => !r.startsWith("|--") && !r.match(/^\|\s*-+/));
                const headers = rows[0]?.split("|").filter(Boolean).map((h) => h.trim());
                const data = rows.slice(1).map((r) => r.split("|").filter(Boolean).map((c) => c.trim()));
                return (
                  <div key={i} className="overflow-x-auto my-6">
                    <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
                      <thead><tr className="bg-muted">{headers?.map((h, j) => <th key={j} className="px-4 py-2 text-left font-semibold text-foreground">{h}</th>)}</tr></thead>
                      <tbody>{data.map((row, j) => <tr key={j} className="border-t border-border">{row.map((cell, k) => <td key={k} className="px-4 py-2 text-foreground/80" dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(cell) }} />)}</tr>)}</tbody>
                    </table>
                  </div>
                );
              }
              // Bold-only line (sub-subheading)
              if (block.startsWith("**") && block.endsWith("**") && !block.includes("\n")) {
                return <p key={i} className="font-semibold text-foreground mt-6 mb-2">{block.replace(/\*\*/g, "")}</p>;
              }
              // Horizontal rule
              if (block.trim() === "---") {
                return <hr key={i} className="my-8 border-border" />;
              }
              // Unordered list
              if (block.startsWith("- ")) {
                return (
                  <ul key={i} className="space-y-1.5 mb-6 ml-4">
                    {block.split("\n").map((line, j) => (
                      <li key={j} className="text-foreground/80 list-disc" dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line.replace(/^- /, "")) }} />
                    ))}
                  </ul>
                );
              }
              // Ordered list
              if (block.startsWith("1. ")) {
                return (
                  <ol key={i} className="space-y-1.5 mb-6 ml-4 list-decimal">
                    {block.split("\n").map((line, j) => (
                      <li key={j} className="text-foreground/80" dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(line.replace(/^\d+\. /, "")) }} />
                    ))}
                  </ol>
                );
              }
              // Italic disclaimer
              if (block.startsWith("*") && block.endsWith("*") && !block.startsWith("**")) {
                return <p key={i} className="text-sm text-muted-foreground italic mt-4" dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(block.replace(/^\*|\*$/g, "")) }} />;
              }
              // Regular paragraph
              return <p key={i} className="text-foreground/80 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: renderInlineMarkdown(block) }} />;
            })}
          </div>

          <ExpertCredentials />

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">Suggested Next Reads</h3>
              <p className="text-sm text-muted-foreground mb-6">Continue learning about Florida deck inspections, permits, and code requirements.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedPosts.map((p: any) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="group block p-4 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors">
                    <span className="text-xs text-primary font-medium">{p.category}</span>
                    <h4 className="font-heading text-sm font-semibold text-foreground mt-1 group-hover:text-primary transition-colors leading-tight">{p.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1.5 line-clamp-2">{p.excerpt}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* More Articles */}
          {otherPosts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-6">More Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {otherPosts.map((p) => (
                  <Link key={p.slug} to={`/blog/${p.slug}`} className="group block p-4 rounded-lg border border-border hover:border-primary/30 transition-colors">
                    <span className="text-xs text-primary font-medium">{p.category}</span>
                    <h4 className="font-heading text-sm font-semibold text-foreground mt-1 group-hover:text-primary transition-colors leading-tight">{p.title}</h4>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 rounded-lg border border-primary/20 bg-primary/5 p-6 sm:p-8 text-center space-y-3">
            <h3 className="font-heading text-xl font-bold text-foreground">Need Help With a Failed Inspection or Permit Issue?</h3>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto">
              We help Florida homeowners resolve inspection failures, navigate reinspections, fix code issues, and close out permits. Bring your inspection notice — we'll walk through it with you for free.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <Button asChild>
                <Link to="/contact">
                  Get a Free Inspection Review <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/tools">
                  Use the Inspection Explainer Tool <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
}
