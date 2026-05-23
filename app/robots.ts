import type { MetadataRoute } from "next";

const SITE = "https://carte-cauchemar-en-cuisine.vercel.app";

// Explicit allow for major search engines + AI/LLM crawlers so the atlas is
// indexed AND eligible for citation in AI Overviews, ChatGPT, Perplexity,
// Claude, Bing Chat, etc.
const AI_USER_AGENTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot",
  "Applebot-Extended",
  "Bytespider",
  "CCBot",
  "YouBot",
  "cohere-ai",
  "Diffbot",
  "DuckAssistBot",
  "FacebookBot",
  "Meta-ExternalAgent",
  "Amazonbot",
  "MistralAI-User",
  "Bingbot"
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_USER_AGENTS.map((agent) => ({ userAgent: agent, allow: "/" }))
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE
  };
}
