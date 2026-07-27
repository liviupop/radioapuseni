window.RADIO_CONFIG = {
  /*
   * "preview" redă materialele demonstrative locale.
   * După activarea AzuraCast, schimbați în "live".
   */
  mode: "preview",
  stationShortcode: "radio_apuseni",
  streamUrl: "https://stream.radioapuseni.ro/listen/radio_apuseni/radio.mp3",
  nowPlayingApi: "https://stream.radioapuseni.ro/api/nowplaying/radio_apuseni",
  /*
   * Proxy same-origin pentru feed-uri RSS. _worker.js acceptă numai
   * URL-uri HTTPS de pe hostul AzuraCast configurat în wrangler.jsonc.
   */
  rssProxyPath: "/api/feed",
  mockStream: [
    {
      title: "Ploaie, tunete și păsări · demonstrație",
      url: "audio/ploaie-tunete-pasari.mp3"
    },
    {
      title: "Păsări în pădure · demonstrație",
      url: "audio/pasari-padure.mp3"
    },
    {
      title: "Clopote îndepărtate · demonstrație",
      url: "audio/clopote.mp3"
    }
  ],
  feeds: [
    {
      name: "Glasul Locului",
      tagline: "Oamenii dau glas locurilor.",
      /* Copiați URL-ul exact din AzuraCast → Podcasts → RSS. */
      url: null
    },
    {
      name: "Jurnal de Teren",
      tagline: "Înainte de a povesti, mergem pe teren.",
      url: null
    },
    {
      name: "Peisajul Viu",
      tagline: "Locurile și peisajul cultural devin personaje.",
      url: null
    },
    {
      name: "Custodes",
      tagline: "Documentăm, învățăm și creștem împreună.",
      url: null
    },
    {
      name: "Glasul Pădurii",
      tagline: "Pădurea are propriul ei glas.",
      url: null
    }
  ],
  demoEpisodes: [
    {
      show: "Noaptea Apusenilor",
      title: "Ploaie, tunete și păsări — material demonstrativ",
      date: "2026-07-24",
      audio: "audio/ploaie-tunete-pasari.mp3"
    },
    {
      show: "Glasul Pădurii",
      title: "Păsări într-o pădure — material demonstrativ",
      date: "2026-07-23",
      audio: "audio/pasari-padure.mp3"
    },
    {
      show: "Peisajul Viu",
      title: "Clopote în depărtare — material demonstrativ",
      date: "2026-07-22",
      audio: "audio/clopote.mp3"
    }
  ],
  maxEpisodes: 12
};
