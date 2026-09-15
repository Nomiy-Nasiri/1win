import { GameRow } from "@/components/content/game-row";
import { HomeLobbyHero } from "@/components/content/lobby-hero";
import { Container } from "@/components/layout/container";
import {
  getAllGamesRow,
  getLiveGameRow,
  getPopularGameRow,
  getTwinGameRow,
} from "@/lib/lobby";
import { paths } from "@/lib/routes";

export default function Home() {
  return (
    <main id="main">
      <Container className="space-y-8 py-5 md:space-y-10 md:py-7">
        <HomeLobbyHero />
        <GameRow
          title="1win games"
          items={getTwinGameRow()}
          href={paths.games}
          priority
        />
        <GameRow title="All games" items={getAllGamesRow()} href={paths.games} />
        <GameRow title="Popular" items={getPopularGameRow()} href={paths.games} />
        <GameRow
          title="Live casino"
          items={getLiveGameRow()}
          href={`${paths.casino}?category=live`}
        />
        <div className="grid gap-6 pt-4 text-small text-muted-foreground md:grid-cols-3">
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
        </div>
      </Container>
    </main>
  );
}
