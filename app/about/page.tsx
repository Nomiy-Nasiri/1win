import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/content/page-hero";
import { Container } from "@/components/layout/container";
import { paths } from "@/lib/routes";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About sports, casino, and game coverage",
  description: `${SITE_NAME} explains how independent sports, casino, and game coverage works, what reviews compare, and how to play responsibly before visiting 1win.`,
};

const sections = [
  {
    title: "What this site covers",
    body: `${SITE_NAME} is an independent information site about sports, casino games, and quick-play titles. The desks list football, basketball, tennis, cricket, and eSports stories, plus slots, live tables, and featured games. Nothing here is an official 1win site or a brand clone.`,
  },
  {
    title: "How to use the sports desk",
    body: "Open Sports to scan the current categories. Each story is a short brief, not a tip service and not a promise of a result. Use it to see which leagues and markets the desk is writing about, then decide for yourself whether a visit to a sportsbook is worth it.",
  },
  {
    title: "Casino and game listings",
    body: "Casino groups slots, live games, and table games. Games adds popular, new, featured, and quick-play filters. Cards show a title, a provider when we have one, and a cover. Affiliate buttons are marked in the page and open in a new tab.",
  },
  {
    title: "Reviews, guides, and the blog",
    body: "Reviews score a product and list pros and cons in plain language. Guides are short walkthroughs. The blog holds longer notes from the desk. Read those before you follow an outbound link, so you know what the page is recommending and what it is not.",
  },
  {
    title: "Responsible play",
    body: "This coverage is for adults 18 and over. Set a limit before you play, take breaks, and stop if it stops feeling like entertainment. Chasing losses is not a strategy. If gambling is causing harm, step away and look for local help.",
  },
];

const links = [
  { href: paths.sports, label: "Sports coverage" },
  { href: paths.casino, label: "Casino listings" },
  { href: paths.games, label: "Game filters" },
  { href: paths.reviews, label: "Reviews" },
  { href: paths.guides, label: "Guides" },
  { href: paths.blog, label: "Blog" },
];

export default function AboutPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow="About"
        title="Independent coverage, written to be read"
        description={`${SITE_NAME} publishes sports, casino, and game notes so you can compare what is on the desk before you choose to visit 1win.`}
      />
      <Container className="max-w-3xl space-y-8 py-8 md:py-10">
        {sections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h2 className="text-h3">{section.title}</h2>
            <p className="text-body text-muted-foreground">{section.body}</p>
          </section>
        ))}
        <section className="space-y-3">
          <h2 className="text-h3">Explore the desks</h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {links.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-body font-medium text-primary underline-offset-4 hover:underline"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </Container>
    </main>
  );
}
