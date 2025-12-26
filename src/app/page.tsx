import { Player } from "@/components/Player";
import { PlayerProvider } from "@/providers/PlayerContext";

export default function Home() {
  return (
    <PlayerProvider>
      <Player />
    </PlayerProvider>
  );
}
