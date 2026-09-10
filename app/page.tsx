import { AffiliateBanner } from "@/components/content/affiliate-banner";
import { ArticleCard } from "@/components/content/article-card";
import { GameCollection } from "@/components/content/game-collection";
import { GuideCard } from "@/components/content/guide-card";
import { Hero } from "@/components/content/hero";
import { PromoCard } from "@/components/content/promo-card";
import { ReviewCard } from "@/components/content/review-card";
import { SectionHeader } from "@/components/content/section-header";
import { SportCollection } from "@/components/content/sport-collection";
import { Container } from "@/components/layout/container";
import { listingGameFilters } from "@/lib/catalog";
import {
  blogItems,
  gameItems,
  guideItems,
  promoItems,
  reviewItems,
  sportStories,
} from "@/lib/content";
import { paths } from "@/lib/routes";

export default function Home() {
  const [featuredArticle, ...restArticles] = blogItems;

  return (
    <main id="main">
      <Hero />
      <Container className="space-y-10 py-8 md:space-y-12 md:py-10">
        <section>
          <SectionHeader
            title="Editor's choice"
            description="Promotional surfaces with overlays, badges, and room for real photography."
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {promoItems.map((item) => (
              <PromoCard
                key={item.id}
                item={item}
                size={item.featured ? "feature" : "default"}
              />
            ))}
          </div>
        </section>

        <section>
          <SportCollection items={sportStories} href={paths.sports} />
        </section>

        <section id="casino">
          <SectionHeader
            title="Casino floor"
            description="Slots, live rooms, and tables — browse the catalog, then open 1win."
            href={paths.casino}
          />
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <PromoCard item={promoItems[1]} size="feature" className="min-h-72" />
            <PromoCard item={promoItems[2]} size="feature" className="min-h-72" />
          </div>
        </section>

        <section>
          <GameCollection
            items={gameItems}
            href={paths.games}
            initialFilter="all"
            filters={listingGameFilters}
          />
        </section>

        <section id="reviews">
          <SectionHeader
            title="Featured reviews"
            description="Scores, pros, and cons on dark editorial surfaces."
            href={paths.reviews}
          />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {reviewItems.map((item) => (
              <ReviewCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section id="guides">
          <SectionHeader
            title="Latest guides"
            description="Readable walkthroughs with related-content-ready cards."
            href={paths.guides}
          />
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {guideItems.map((item) => (
              <GuideCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        <section id="blog">
          <SectionHeader
            title="From the desk"
            description="A premium editorial grid for longer reads."
            href={paths.blog}
          />
          <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
            {featuredArticle ? (
              <ArticleCard item={featuredArticle} featured />
            ) : null}
            <div className="grid gap-4">
              {restArticles.map((item) => (
                <ArticleCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </section>
      </Container>
      <AffiliateBanner />
      <Container className="grid gap-6 py-8 text-small text-muted-foreground md:grid-cols-3">
        <p id="disclaimer">
          <span className="font-medium text-foreground">Disclaimer. </span>
          WinMoney is an independent information website. It is not operated by,
          endorsed as official, or affiliated as a brand clone of 1win.
        </p>
        <p id="responsible-play">
          <span className="font-medium text-foreground">Responsible play. </span>
          18+ only. Set limits, take breaks, and never chase losses. If gambling
          stops being entertainment, stop and seek help.
        </p>
        <p id="privacy">
          <span className="font-medium text-foreground">Privacy. </span>
          Affiliate links are clearly marked in code and open in a new tab. We
          may earn a commission if you choose to visit 1win.
        </p>
      </Container>
    </main>
  );
}
