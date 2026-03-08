import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { useSiteData } from "@/contexts/SiteDataContext";
import RelatedContent from "@/components/RelatedContent";

export default function Blog() {
  const { blogPosts } = useSiteData();

  return (
    <Layout>
      <Helmet>
        <title>Florida Deck & Patio Blog | Tips, Codes & Project Guides</title>
        <meta name="description" content="Expert articles on Florida deck building codes, materials, permits, costs, and outdoor living design. Updated for 2026." />
        <link rel="canonical" href="https://florida-decks-and-patios.lovable.app/blog" />
      </Helmet>
      <section className="section-padding bg-section-alt">
        <div className="container-narrow mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Blog & Resources</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Expert advice, project inspiration, and practical guides for homeowners planning outdoor improvements.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition-all"
              >
                <div className="h-32 bg-gradient-to-br from-primary/15 to-primary/5 flex items-center justify-center">
                  <span className="text-3xl opacity-40">📝</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">{post.category}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </span>
                  </div>
                  <h2 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>

          <RelatedContent topics={["general", "design", "materials"]} title="Explore More" maxLinks={4} className="mt-10" />
        </div>
      </section>
    </Layout>
  );
}
