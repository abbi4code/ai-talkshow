export const sidebarLinks = [
    {
      imgURL: "/icons/home.svg",
      route: "/home",
      label: "Home",
    },
    {
      imgURL: "/icons/discover.svg",
      route: "/discover",
      label: "Discover",
    },
    {
      imgURL: "/icons/microphone.svg",
      route: "/create-pod",
      label: "Create Podcast",
    },
  ];
  
  // ElevenLabs Voice Configuration
// Voice IDs from ElevenLabs premade voices
export interface VoiceOption {
  id: number;
  name: string;
  voiceId: string;      // ElevenLabs voice ID
  gender: 'male' | 'female';
  description: string;
}

export const voiceCategories: VoiceOption[] = [
  {
    id: 1,
    name: "Rachel",
    voiceId: "21m00Tcm4TlvDq8ikWAM",
    gender: "female",
    description: "Calm & young American female",
  },
  {
    id: 2,
    name: "Drew",
    voiceId: "29vD33N1CtxCmqQRPOHJ",
    gender: "male",
    description: "Well-rounded American male",
  },
  {
    id: 3,
    name: "Clyde",
    voiceId: "2EiwWnXFnvU5JabPnv8n",
    gender: "male",
    description: "War veteran, deep & intense",
  },
  {
    id: 4,
    name: "Paul",
    voiceId: "5Q0t7uMcjvnagumLfvZi",
    gender: "male",
    description: "Ground reporter, authoritative",
  },
  {
    id: 5,
    name: "Domi",
    voiceId: "AZnzlk1XvdvUeBnXmlld",
    gender: "female",
    description: "Strong & assertive female",
  },
  {
    id: 6,
    name: "Dave",
    voiceId: "CYw3kZ02Hs0563khs1Fj",
    gender: "male",
    description: "Conversational British-Essex",
  },
  {
    id: 7,
    name: "Fin",
    voiceId: "D38z5RcWu1voky8WS1ja",
    gender: "male",
    description: "Sailor, old & raspy Irish",
  },
  {
    id: 8,
    name: "Sarah",
    voiceId: "EXAVITQu4vr4xnSDxMaL",
    gender: "female",
    description: "Soft & expressive American",
  },
  {
    id: 9,
    name: "Antoni",
    voiceId: "ErXwobaYiN019PkySvjV",
    gender: "male",
    description: "Well-rounded young American",
  },
  {
    id: 10,
    name: "Thomas",
    voiceId: "GBv7mTt0atIp3Br8iCZE",
    gender: "male",
    description: "Calm American storyteller",
  },
];
  
  export const podcastData = [
    {
      id: 1,
      title: "The Joe Rogan Experience",
      description: "A long form, in-depth conversation",
      imgURL:
        "https://img.freepik.com/free-psd/music-concept-flyer-square-template_23-2148707328.jpg?t=st=1733761783~exp=1733765383~hmac=cb0e92a60c5556af7a4b675f2bb2b8b61dc7089917ab461214452c4208c14a04&w=740",
    },
    {
      id: 2,
      title: "The Futur",
      description: "This is how the news should sound",
      imgURL:
        "https://img.freepik.com/free-psd/podcast-talk-youtube-social-media-post-template_47987-20335.jpg?t=st=1733762016~exp=1733765616~hmac=32923b484f45ec9b80670f0f16d0e894ec25b5193c598b8fdea121d95c6a6f45&w=740",
    },
    {
      id: 3,
      title: "Waveform",
      description: "Join Michelle Obama in conversation",
      imgURL:
        "https://img.freepik.com/free-psd/music-concept-flyer-square-template_23-2148707328.jpg?t=st=1733761783~exp=1733765383~hmac=cb0e92a60c5556af7a4b675f2bb2b8b61dc7089917ab461214452c4208c14a04&w=740",
    },
    {
      id: 4,
      title: "The Tech Talks Daily Podcast",
      description: "This is how the news should sound",
      imgURL:
        "https://img.freepik.com/free-psd/podcast-talk-youtube-social-media-post-template_47987-20335.jpg?t=st=1733762016~exp=1733765616~hmac=32923b484f45ec9b80670f0f16d0e894ec25b5193c598b8fdea121d95c6a6f45&w=740",
    },
    {
      id: 5,
      title: "GaryVee Audio Experience",
      description: "A long form, in-depth conversation",
      imgURL:
        "https://img.freepik.com/free-psd/music-concept-flyer-square-template_23-2148707328.jpg?t=st=1733761783~exp=1733765383~hmac=cb0e92a60c5556af7a4b675f2bb2b8b61dc7089917ab461214452c4208c14a04&w=740",
    },
    {
      id: 6,
      title: "Syntax ",
      description: "Join Michelle Obama in conversation",
      imgURL:
      "https://img.freepik.com/free-psd/podcast-talk-youtube-social-media-post-template_47987-20335.jpg?t=st=1733762016~exp=1733765616~hmac=32923b484f45ec9b80670f0f16d0e894ec25b5193c598b8fdea121d95c6a6f45&w=740",
    },
    {
      id: 7,
      title: "IMPAULSIVE",
      description: "A long form, in-depth conversation",
      imgURL:
        "https://img.freepik.com/free-psd/music-concept-flyer-square-template_23-2148707328.jpg?t=st=1733761783~exp=1733765383~hmac=cb0e92a60c5556af7a4b675f2bb2b8b61dc7089917ab461214452c4208c14a04&w=740",
    },
    {
      id: 8,
      title: "Ted Tech",
      description: "This is how the news should sound",
      imgURL:
        "https://img.freepik.com/free-psd/podcast-talk-youtube-social-media-post-template_47987-20335.jpg?t=st=1733762016~exp=1733765616~hmac=32923b484f45ec9b80670f0f16d0e894ec25b5193c598b8fdea121d95c6a6f45&w=740",
    },
  ];