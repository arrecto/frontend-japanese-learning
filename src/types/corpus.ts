// Mirrors app/schemas/corpus.py in backend-japanese-learning.

export type Gender = "M" | "F";
export type Subset = "parallel100" | "nonpara30";
export type PhonemeCategory = "vowel" | "consonant" | "special";
export type AudioFormat = "flac" | "opus";
export type Pitch = "H" | "L";
export type ClipFlag = "short" | "long" | "tight_pause" | "clipped" | (string & {});

export interface Mora {
  kana: string;
  phonemes: string[];
  /** Dictionary-predicted Tokyo accent, not measured per speaker. */
  pitch: Pitch;
  devoiced: boolean;
}

export interface AccentPhrase {
  mora_start: number;
  mora_count: number;
  /** 0 = flat, n = pitch drops after mora n. */
  accent_type: number;
}

/** One phoneme with start/end in ms relative to the start of the stored audio. */
export interface AlignmentSegment {
  p: string;
  s: number;
  e: number;
}

export interface Speaker {
  speaker_id: string;
  corpus: string;
  gender: Gender;
  f0_min_hz: number | null;
  f0_max_hz: number | null;
  /** Decimal, serialized as a string. */
  parallel_minutes: string | null;
  nonpara_minutes: string | null;
  has_alignment: boolean;
}

export interface SpeakerSimilarity {
  speaker_a: string;
  speaker_b: string;
  /** -3 dissimilar .. 3 identical. */
  score: number;
}

export interface Phoneme {
  symbol: string;
  ipa: string;
  category: PhonemeCategory;
  voiced: boolean;
  place: string | null;
  manner: string | null;
  palatalized: boolean;
  example_kana: string | null;
  description: string | null;
  sort_order: number;
}

export interface Utterance {
  utterance_id: string;
  corpus: string;
  subset: Subset;
  text: string;
  phrase_count: number;
  mora_count: number;
}

export interface Phrase {
  phrase_id: number;
  utterance_id: string;
  phrase_index: number;
  text: string | null;
  reading_kana: string;
  phonemes: string[];
  moras: Mora[];
  mora_count: number;
  accent_phrases: AccentPhrase[];
}

/** A playable rendition of a clip. `url` is presigned and short-lived. */
export interface ClipAudio {
  format: AudioFormat;
  content_type: string;
  url: string;
}

export interface Clip {
  clip_id: number;
  phrase_id: number;
  speaker_id: string;
  duration_ms: number;
  pad_before_ms: number;
  pad_after_ms: number;
  pause_before_ms: number;
  pause_after_ms: number;
  speech_rate_mora_per_s: number;
  peak_dbfs: number | null;
  rms_dbfs: number | null;
  alignment: AlignmentSegment[];
  flags: ClipFlag[];
}

export interface PhraseClip {
  clip_id: number;
  subset: Subset;
  utterance_id: string;
  phrase_index: number;
  phrase_id: number;
  text: string | null;
  reading_kana: string;
  mora_count: number;
  speaker_id: string;
  gender: Gender;
  f0_min_hz: number | null;
  f0_max_hz: number | null;
  duration_ms: number;
  speech_rate_mora_per_s: number;
  flags: ClipFlag[];
  audio: ClipAudio[];
}

export interface HealthStatus {
  status: "ok";
  speakers: number | null;
}
