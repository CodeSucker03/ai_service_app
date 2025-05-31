import { CreateAssistantDTO, CreateWorkflowDTO } from "@vapi-ai/web/dist/api";
import { z } from "zod";

export const subjects = [
  "maths",
  "language",
  "science",
  "history",
  "coding",
  "economics",
];

export const subjectsColors = {
  science: "#E5D0FF",
  maths: "#FFDA6E",
  language: "#BDE7FF",
  coding: "#FFC8E4",
  history: "#FFECC8",
  economics: "#C8FFDF",
};

export const voices = {
  male: { casual: "2BJW5coyhAzSr8STdHbE", formal: "c6SfcYrb2t09NHXiT80T" },
  female: { casual: "ZIlrSGI4jZqobxRKprJz", formal: "sarah" },
};

export const recentSessions = [
  {
    id: "1",
    subject: "science",
    name: "Neura the Brainy Explorer",
    topic: "Neural Network of the Brain",
    duration: 45,
    color: "#E5D0FF",
  },
  {
    id: "2",
    subject: "maths",
    name: "Countsy the Number Wizard",
    topic: "Derivatives & Integrals",
    duration: 30,
    color: "#FFDA6E",
  },
  {
    id: "3",
    subject: "language",
    name: "Verba the Vocabulary Builder",
    topic: "English Literature",
    duration: 30,
    color: "#BDE7FF",
  },
  {
    id: "4",
    subject: "coding",
    name: "Codey the Logic Hacker",
    topic: "Intro to If-Else Statements",
    duration: 45,
    color: "#FFC8E4",
  },
  {
    id: "5",
    subject: "history",
    name: "Memo, the Memory Keeper",
    topic: "World Wars: Causes & Consequences",
    duration: 15,
    color: "#FFECC8",
  },
  {
    id: "6",
    subject: "economics",
    name: "The Market Maestro",
    topic: "The Basics of Supply & Demand",
    duration: 10,
    color: "#C8FFDF",
  },
];

export const mappings = {
  "react.js": "react",
  reactjs: "react",
  react: "react",
  "next.js": "nextjs",
  nextjs: "nextjs",
  next: "nextjs",
  "vue.js": "vuejs",
  vuejs: "vuejs",
  vue: "vuejs",
  "express.js": "express",
  expressjs: "express",
  express: "express",
  "node.js": "nodejs",
  nodejs: "nodejs",
  node: "nodejs",
  mongodb: "mongodb",
  mongo: "mongodb",
  mongoose: "mongoose",
  mysql: "mysql",
  postgresql: "postgresql",
  sqlite: "sqlite",
  firebase: "firebase",
  docker: "docker",
  kubernetes: "kubernetes",
  aws: "aws",
  azure: "azure",
  gcp: "gcp",
  digitalocean: "digitalocean",
  heroku: "heroku",
  photoshop: "photoshop",
  "adobe photoshop": "photoshop",
  html5: "html5",
  html: "html5",
  css3: "css3",
  css: "css3",
  sass: "sass",
  scss: "sass",
  less: "less",
  tailwindcss: "tailwindcss",
  tailwind: "tailwindcss",
  bootstrap: "bootstrap",
  jquery: "jquery",
  typescript: "typescript",
  ts: "typescript",
  javascript: "javascript",
  js: "javascript",
  "angular.js": "angular",
  angularjs: "angular",
  angular: "angular",
  "ember.js": "ember",
  emberjs: "ember",
  ember: "ember",
  "backbone.js": "backbone",
  backbonejs: "backbone",
  backbone: "backbone",
  nestjs: "nestjs",
  graphql: "graphql",
  "graph ql": "graphql",
  apollo: "apollo",
  webpack: "webpack",
  babel: "babel",
  "rollup.js": "rollup",
  rollupjs: "rollup",
  rollup: "rollup",
  "parcel.js": "parcel",
  parceljs: "parcel",
  npm: "npm",
  yarn: "yarn",
  git: "git",
  github: "github",
  gitlab: "gitlab",
  bitbucket: "bitbucket",
  figma: "figma",
  prisma: "prisma",
  redux: "redux",
  flux: "flux",
  redis: "redis",
  selenium: "selenium",
  cypress: "cypress",
  jest: "jest",
  mocha: "mocha",
  chai: "chai",
  karma: "karma",
  vuex: "vuex",
  "nuxt.js": "nuxt",
  nuxtjs: "nuxt",
  nuxt: "nuxt",
  strapi: "strapi",
  wordpress: "wordpress",
  contentful: "contentful",
  netlify: "netlify",
  vercel: "vercel",
  "aws amplify": "amplify",
};

export const generator = {
  name: "Generate Interview",
  nodes: [
    {
      name: "start",
      type: "conversation",
      isStart: true,
      metadata: {
        position: {
          x: 0,
          y: 0,
        },
      },
      prompt:
        "Speak first. Greet the user and help them create a new AI Interviewer",
      voice: {
        model: "aura-2",
        voiceId: "thalia",
        provider: "deepgram",
      },
      variableExtractionPlan: {
        output: [
          {
            title: "level",
            description: "The job experience level.",
            type: "string",
            enum: ["entry", "mid", "senior"],
          },
          {
            title: "amount",
            description: "How many questions would you like to generate?",
            type: "number",
            enum: [],
          },
          {
            title: "techstack",
            description:
              "A list of technologies to cover during the job interview. For example, React, Next.js, Express.js, Node and so on...",
            type: "string",
            enum: [],
          },
          {
            title: "role",
            description:
              "What role should would you like to train for? For example Frontend, Backend, Fullstack, Design, UX?",
            type: "string",
            enum: [],
          },
          {
            title: "type",
            description: "What type of the interview should it be? ",
            type: "string",
            enum: ["behavioural", "technical", "mixed"],
          },
        ],
      },
    },
    {
      name: "apiRequest_1747470739045",
      type: "apiRequest",
      metadata: {
        position: {
          x: -16.075937072883846,
          y: 703.623428447121,
        },
      },
      method: "POST",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/vapi/generate`,
      headers: {
        type: "object",
        properties: {},
      },
      body: {
        type: "object",
        properties: {
          role: {
            type: "string",
            description: "",
            value: "{{ role }}",
          },
          level: {
            type: "string",
            description: "",
            value: "{{ level }}",
          },
          type: {
            type: "string",
            description: "",
            value: "{{ type }}",
          },
          amount: {
            type: "number",
            description: "",
            value: "{{ amount }}",
          },
          userid: {
            type: "string",
            description: "",
            value: "{{ userid }}",
          },
          techstack: {
            type: "string",
            description: "",
            value: "{{ techstack }}",
          },
        },
      },
      output: {
        type: "object",
        properties: {},
      },
      mode: "blocking",
      hooks: [],
    },
    {
      name: "conversation_1747721261435",
      type: "conversation",
      metadata: {
        position: {
          x: -17.547788169718615,
          y: 1003.3409337989506,
        },
      },
      prompt:
        "Thank the user for the conversation and inform them that the interview was generated successfully.",
      voice: {
        provider: "deepgram",
        voiceId: "thalia",
        model: "aura-2",
      },
    },
    {
      name: "conversation_1747744490967",
      type: "conversation",
      metadata: {
        position: {
          x: -11.165436030430953,
          y: 484.94857971060617,
        },
      },
      prompt: "Say that the Interview will be generated shortly.",
      voice: {
        provider: "deepgram",
        voiceId: "thalia",
        model: "aura-2",
      },
    },
    {
      name: "hangup_1747744730181",
      type: "hangup",
      metadata: {
        position: {
          x: 76.01267674000721,
          y: 1272.0665127156606,
        },
      },
    },
  ],
  edges: [
    {
      from: "apiRequest_1747470739045",
      to: "conversation_1747721261435",
      condition: {
        type: "ai",
        prompt: "",
      },
    },
    {
      from: "start",
      to: "conversation_1747744490967",
      condition: {
        type: "ai",
        prompt: "If user provided all the required variables",
      },
    },
    {
      from: "conversation_1747744490967",
      to: "apiRequest_1747470739045",
      condition: {
        type: "ai",
        prompt: "",
      },
    },
    {
      from: "conversation_1747721261435",
      to: "hangup_1747744730181",
      condition: {
        type: "ai",
        prompt: "",
      },
    },
  ],
};

//   name: "Interview",
//   nodes: [
//     {
//       name: "start",
//       type: "conversation",
//       isStart: true,
//       metadata: {
//         position: {
//           x: -116.43624713263682,
//           y: 56.69344576620708,
//         },
//       },
//       prompt: "Greet the user and help them create a new AI Interviewer.",
//       voice: {
//         model: "aura-2",
//         voiceId: "thalia",
//         provider: "deepgram",
//       },
//       variableExtractionPlan: {
//         output: [
//           {
//             title: "level",
//             description: "The job experience level.",
//             type: "string",
//             enum: ["entry", "mid"],
//           },
//           {
//             title: "amount",
//             description: "How many questions would you like to generate?",
//             type: "number",
//             enum: [],
//           },
//           {
//             title: "techstack",
//             description:
//               "A list of technologies to cover during the job interview. For example, React, Next.js, Express.js,",
//             type: "string",
//             enum: [],
//           },
//           {
//             title: "role",
//             description:
//               "What role should would you like to train for? For example Frontend, Backend, Fullstack,",
//             type: "string",
//             enum: [],
//           },
//           {
//             title: "type",
//             description: "What type of the interview should it be?",
//             type: "string",
//             enum: ["behavioural", "technical"],
//           },
//         ],
//       },
//       // messagePlan: {
//       //   firstMessage: "Hey there!",
//       // },
//     },
//     {
//       name: "conversation_1747881446213",
//       type: "conversation",
//       metadata: {
//         position: {
//           x: -131.6887130132009,
//           y: 486.9368711796403,
//         },
//       },
//       prompt: "Say that the Interview will be generated shortly.",
//     },
//     {
//       name: "apiRequest_1747882238813",
//       type: "tool",
//       metadata: {
//         position: {
//           x: 341.5338118939484,
//           y: 83.73875834237842,
//         },
//       },
//       tool: {
//         method: "POST",
//         type: "apiRequest",
//         url: "https://ai-app-voice-chat.vercel.app/api/vapi/generate",
//         headers: {
//           type: "object",
//           properties: {},
//         },
//         body: {
//           type: "object",
//           properties: {
//             role: {
//               type: "string",
//               description: "",
//               value: "{{role}}",
//             },
//             techstack: {
//               type: "string",
//               description: "",
//               value: "{{ techstack }}",
//             },
//             level: {
//               type: "string",
//               description: "",
//               value: "{{ level }}",
//             },
//             amount: {
//               type: "string",
//               description: "",
//               value: "{{ amount }}",
//             },
//             userid: {
//               type: "string",
//               description: "",
//               value: "{{ userid }}",
//             },
//             type: {
//               type: "string",
//               description: "",
//               value: "{{ type }}",
//             },
//           },
//         },
//       },

//       output: {
//         type: "object",
//         properties: {},
//       },
//       mode: "blocking",
//       hooks: [],
//     },
//     {
//       name: "conversation_1747882515393",
//       type: "conversation",
//       metadata: {
//         position: {
//           x: 344.9539232282547,
//           y: 370.49411123339985,
//         },
//       },
//       prompt:
//         "thank the user for their time and informing them that the interview has been generated",
//     },
//     {
//       name: "hangup_1747882568728",
//       type: "hangup",
//       metadata: {
//         position: {
//           x: 438.4903699664503,
//           y: 590.136496650504,
//         },
//       },
//     },
//   ],
//   edges: [
//     {
//       from: "start",
//       to: "conversation_1747881446213",
//       condition: {
//         type: "ai",
//         prompt: "If user provided all the required variables.",
//       },
//     },
//     {
//       from: "conversation_1747881446213",
//       to: "apiRequest_1747882238813",
//       condition: {
//         type: "ai",
//         prompt: "",
//       },
//     },
//     {
//       from: "apiRequest_1747882238813",
//       to: "conversation_1747882515393",
//       condition: {
//         type: "ai",
//         prompt: "",
//       },
//     },
//     {
//       from: "conversation_1747882515393",
//       to: "hangup_1747882568728",
//       condition: {
//         type: "ai",
//         prompt: "",
//       },
//     },
//   ],
// };

export const interviewer: CreateAssistantDTO = {
  name: "Interviewer",
  firstMessage:
    "Hello! Thank you for taking the time to speak with me today. I'm excited to learn more about you and your experience.",
  transcriber: {
    provider: "deepgram",
    model: "nova-2",
    language: "en",
  },
  voice: {
    provider: "11labs",
    voiceId: "sarah",
    stability: 0.4,
    similarityBoost: 0.8,
    speed: 0.9,
    style: 0.5,
    useSpeakerBoost: true,
  },
  model: {
    provider: "openai",
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: `You are a professional job interviewer conducting a real-time voice interview with a candidate. Your goal is to assess their qualifications, motivation, and fit for the role.

Interview Guidelines:
Follow the structured question flow:
{{questions}}

Engage naturally & react appropriately:
Listen actively to responses and acknowledge them before moving forward.
Ask brief follow-up questions if a response is vague or requires more detail.
Keep the conversation flowing smoothly while maintaining control.
Be professional, yet warm and welcoming:

Use official yet friendly language.
Keep responses concise and to the point (like in a real voice interview).
Avoid robotic phrasing—sound natural and conversational.
Answer the candidate’s questions professionally:

If asked about the role, company, or expectations, provide a clear and relevant answer.
If unsure, redirect the candidate to HR for more details.

Conclude the interview properly:
Thank the candidate for their time.
Inform them that the company will reach out soon with feedback.
End the conversation on a polite and positive note.


- Be sure to be professional and polite.
- Keep all your responses short and simple. Use official language, but be kind and welcoming.
- This is a voice conversation, so keep your responses short, like in a real conversation. Don't ramble for too long.`,
      },
    ],
  },
};

export const feedbackSchema = z.object({
  totalScore: z.number(),
  categoryScores: z.tuple([
    z.object({
      name: z.literal("Communication Skills"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Technical Knowledge"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Problem Solving"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Cultural Fit"),
      score: z.number(),
      comment: z.string(),
    }),
    z.object({
      name: z.literal("Confidence and Clarity"),
      score: z.number(),
      comment: z.string(),
    }),
  ]),
  strengths: z.array(z.string()),
  areasForImprovement: z.array(z.string()),
  finalAssessment: z.string(),
});

export const interviewCovers = [
  "/adobe.png",
  "/amazon.png",
  "/facebook.png",
  "/hostinger.png",
  "/pinterest.png",
  "/quora.png",
  "/reddit.png",
  "/skype.png",
  "/spotify.png",
  "/telegram.png",
  "/tiktok.png",
  "/yahoo.png",
];

export const dummyInterviews: Interview[] = [
  {
    id: "1",
    userId: "user1",
    role: "Frontend Developer",
    type: "Technical",
    techstack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    level: "Junior",
    questions: ["What is React?"],
    finalized: false,
    createdAt: "2024-03-15T10:00:00Z",
  },
  {
    id: "2",
    userId: "user1",
    role: "Full Stack Developer",
    type: "Mixed",
    techstack: ["Node.js", "Express", "MongoDB", "React"],
    level: "Senior",
    questions: ["What is Node.js?"],
    finalized: false,
    createdAt: "2024-03-14T15:30:00Z",
  },
];

export const roadmap = [
  {
    id: "0",
    title: "Voice recognition",
    text: "Enable the chatbot to understand and respond to voice commands, making it easier for users to interact with the app hands-free.",
    date: "May 2023",
    status: "done",
    imageUrl: "/assets/roadmap/image-1.png",
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: "/assets/roadmap/image-2.png",
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: "/assets/roadmap/image-3.png",
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: "/assets/roadmap/image-4.png",
  },
];

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "How to use",
    url: "#how-to-use",
  },
  {
    id: "3",
    title: "Roadmap",
    url: "#roadmap",
  },
  {
    id: "4",
    title: "New account",
    url: "#signup",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Sign In",
    url: "sign-in",
    onlyMobile: true,
  },
  {
    id: "6",
    title: "Sign Out",
    url: "sign-in",
    onlyMobile: true,
  },
];
export const brainwaveServices = [
  "Photo generating",
  "Photo enhance",
  "Seamless Integration",
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for teams looking to work smarter.";
export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Top-notch Security",
  },
];

export const heroIcons = [
  "/assets/home-smile.svg",
  "/assets/file-02.svg",
  "/assets/search-md.svg",
  "/assets/plus-square.svg",
];

export const notificationImages = [
  "/assets/notification/image-4.png",
  "/assets/notification/image-3.png",
  "/assets/notification/image-2.png",
];

export const companyLogos = [
  "/assets/yourlogo.svg",
  "/assets/yourlogo.svg",
  "/assets/yourlogo.svg",
  "/assets/yourlogo.svg",
  "/assets/yourlogo.svg",
];

export const brainwaveServicesIcons = [
  "/assets/recording-03.svg",
  "/assets/recording-01.svg",
  "/assets/disc-02.svg",
  "/assets/chrome-cast.svg",
  "/assets/sliders-04.svg",
];

export const collabApps = [
  {
    id: "0",
    title: "Figma",
    icon: "/assets/collaboration/figma.png",
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "Notion",
    icon: "/assets/collaboration/notion.png",
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "Discord",
    icon: "/assets/collaboration/discord.png",
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "Slack",
    icon: "/assets/collaboration/slack.png",
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "Photoshop",
    icon: "/assets/collaboration/photoshop.png",
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "Protopie",
    icon: "/assets/collaboration/protopie.png",
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "Framer",
    icon: "/assets/collaboration/framer.png",
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "Raindrop",
    icon: "/assets/collaboration/raindrop.png",
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: "0",
    title: "Basic",
    description: "AI chatbot, personalized recommendations",
    price: "0",
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
  {
    id: "1",
    title: "Premium",
    description: "Advanced AI chatbot, priority support, analytics dashboard",
    price: "9.99",
    features: [
      "An advanced AI chatbot that can understand complex queries",
      "An analytics dashboard to track your conversations",
      "Priority support to solve issues quickly",
    ],
  },
  {
    id: "2",
    title: "Enterprise",
    description: "Custom AI chatbot, advanced analytics, dedicated account",
    price: null,
    features: [
      "An AI chatbot that can understand your queries",
      "Personalized recommendations based on your preferences",
      "Ability to explore the app and its features without any cost",
    ],
  },
];

export const benefits = [
  {
    id: "0",
    title: "Ask anything",
    text: "Lets users quickly find answers to their questions without having to search through multiple sources.",
    backgroundUrl: "/assets/benefits/card-1.svg",
    url: "/chat",
    iconUrl: "/assets/benefits/icon-1.svg",
    imageUrl: "/assets/benefits/image-2.png",
  },
  {
    id: "1",
    title: "AI interview",
    text: "Get Interview-Ready with AI-Powered Practice & Feedback",
    backgroundUrl: "/assets/benefits/card-2.svg",
    url: "/interview",
    iconUrl: "/assets/benefits/icon-2.svg",
    imageUrl: "/assets/benefits/image-2.png",
    light: true,
  },
  {
    id: "2",
    title: "Connect everywhere",
    text: "Connect with the AI chatbot from anywhere, on any device, making it more accessible and convenient.",
    url: "/chat",
    backgroundUrl: "/assets/benefits/card-3.svg",
    iconUrl: "/assets/benefits/icon-3.svg",
    imageUrl: "/assets/benefits/image-2.png",
  },
  {
    id: "3",
    title: "Voice recognition",
    text: "The app uses advanced voice recognition technology to understand user and provide accurate and relevant responses.",
    backgroundUrl: "/assets/benefits/card-4.svg",
    url: "/interview",
    iconUrl: "/assets/benefits/icon-4.svg",
    imageUrl: "/assets/benefits/image-2.png",
    light: true,
  },
];

export const socials = [
  {
    id: "0",
    title: "Discord",
    iconUrl: "/assets/socials/discord.svg",
    url: "#",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: "/assets/socials/twitter.svg",
    url: "#",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: "/assets/socials/instagram.svg",
    url: "#",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: "/assets/socials/telegram.svg",
    url: "#",
  },
  {
    id: "4",
    title: "Facebook",
    iconUrl: "/assets/socials/facebook.svg",
    url: "#",
  },
];
