import { playAudio } from "./playAudio";
import { IPlaylist, Track } from "../types/types";

export const endAudioRequest = async (
  track: Track,
  secondsPlayed: number,
  playId: string,
  metadata: string,
  playlist?: IPlaylist
) => {
  const totalSeconds = track.durationMs / 1000;
  if (playlist) {
    await playAudio({
      from: metadata || "web-own_playlists-playlist-track-fridge",
      "track-id": track.id,
      "album-id": track.albums[0].id,
      "play-id": playId,
      "track-length-seconds": totalSeconds,
      "total-played-seconds": secondsPlayed,
      "end-position-seconds": secondsPlayed,
      "playlist-id": `${playlist.owner!.uid}:${playlist.kind}`,
    });
  } else {
    await playAudio({
      from: metadata || "web-own_playlists-playlist-track-fridge",
      "track-id": track.id,
      "album-id": track.albums[0].id,
      "play-id": playId,
      "track-length-seconds": totalSeconds,
      "total-played-seconds": secondsPlayed,
      "end-position-seconds": secondsPlayed,
    });
  }
};
//web-own_playlists-playlist-track-fridge
