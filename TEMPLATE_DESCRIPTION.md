## Template Titles

**Railway Title:** `Mike [Updated May '26]`
**Railway Description:** `Mike [May '26] (AI Legal Document Analysis & Contract Review) Self Host`
**Spreadsheet Title:** `Mike (Open-Source AI Legal Document Analysis & Contract Review Platform)`
**GitHub Description:** `Mike - open-source AI legal platform for document analysis, contract review, and legal workflows. Deploy on Railway with one click.`

---

![Mike open source AI legal platform for document analysis and contract review](https://res.cloudinary.com/dh2nt6hgh/image/upload/v1777740311/Screenshot_2026-05-02_at_10.15.01_PM_mfgmgn.png "Hosting Mike AI legal platform on Railway")

# Deploy and Host self hosted Mike (Open-Source AI Legal Platform) on Railway

Mike is an open-source AI legal platform that replicates the core capabilities of Harvey AI ($11B) and Legora ($5.5B) at zero cost. It features AI-powered document analysis, verbatim citation with source pages, contract drafting, tabular review for extracting data from hundreds of documents, multi-step legal workflows, and project management. It supports Claude, Gemini, and OpenRouter. Mike is a self-hosted alternative to Harvey AI, Legora, CoCounsel, and Clio.

## About Hosting Mike open-source software on Railway (self hosted Mike template)

Self hosting Mike means your legal documents, client data, and API keys stay on infrastructure you control. Attorney-client privilege is preserved because documents never transit through third-party AI vendor servers. With Railway, the full stack deploys automatically - frontend, backend, Supabase auth, PostgREST, Kong gateway, PostgreSQL, and S3 storage.

## Why Deploy Mike, the Harvey AI alternative on Railway (Railway Free Trial)

Instead of paying for Harvey AI or Legora with enterprise pricing, run Mike with your own API keys and unlimited document processing. Mike supports contract review, tabular extraction, and multi-step workflows out of the box. Railway gives every new user a $5 free trial when signing up with GitHub to test the full AI legal stack.

### Railway vs Other Hosting Providers and VPS for Mike self hosting

| Provider          | What You Get with Railway                                | What You Get with the Other Provider                        |
| ----------------- | -------------------------------------------------------- | ----------------------------------------------------------- |
| **DigitalOcean**  | One-click deploy with Supabase auth, storage & HTTPS     | Manual droplet setup, Supabase config, Nginx reverse proxy  |
| **AWS**           | Transparent pricing, no IAM/ECS/RDS complexity           | Powerful but complex multi-service container orchestration  |
| **Hetzner**       | Managed app with volume, auth, and domain provisioning   | Great VPS price but manual Docker, Kong, and GoTrue setup   |

## Common Use Cases for hosted Mike AI Legal Platform

Here are common use cases for the open-source AI legal document analysis platform:

* Reviewing contracts and legal documents with AI analysis that provides verbatim citations with source page numbers to eliminate hallucinations.
* Extracting structured data from hundreds of documents using tabular review with spreadsheet output and citations for every data point.
* Drafting and editing contracts with Claude or Gemini models through a chat interface with full document context.
* Running multi-step workflows that automate due diligence, compliance review, and document comparison across project folders.
* Managing legal projects with document storage, version tracking, and team collaboration via Supabase auth.

![Mike AI legal platform chat and document analysis interface](https://res.cloudinary.com/dh2nt6hgh/image/upload/v1777740825/Screenshot_2026-05-02_at_10.23.32_PM_eemenb.png "Mike AI legal document chat and analysis")

## Dependencies for Mike Docker hosted on Railway

Mike runs as a six-service stack on Railway: PostgreSQL with Supabase auth schema, GoTrue authentication, PostgREST API, Kong API gateway, Express backend, and Next.js frontend. Document storage uses an S3-compatible Railway storage bucket.

### Deployment Dependencies for Managed Mike Service (OSS AI Legal Platform)

A managed Mike service on Railway requires the PostgreSQL database with GoTrue auth migrations, the Kong API gateway routing auth and REST requests, the Express backend for document processing and LLM integration, and the Next.js frontend serving the legal AI interface.

### Implementation Details for Mike (Using Mike official source build)

This template builds Mike from the official GitHub repository with a multi-service architecture. The backend runs on port 3001 with an entrypoint that waits for GoTrue to initialize auth tables before running the application schema migration. PostgREST auto-reloads via NOTIFY when new tables are created. Key env vars include LLM provider keys (Gemini, Anthropic) and S3 storage credentials via Railway bucket references.

## How does Mike compare against other AI Legal platforms

### Mike vs Harvey AI (Harvey AI Alternative)
* **Open Source:** Mike is fully open source under AGPL-3.0 with complete feature parity. Harvey AI is a closed enterprise platform with $11B valuation and vendor lock-in.
* **Data Ownership:** Your legal documents stay on your server. Harvey AI processes documents through their infrastructure with no self-hosting option.

### Mike vs Legora (Legora Alternative)
* **Zero Cost:** Mike is free to self host with your own LLM API keys. Legora is a $5.5B enterprise platform with per-seat pricing and closed source code.
* **Customization:** Mike is fully extensible - add practice-specific workflows and integrate your document management system. Legora offers limited customization.

### Mike vs CoCounsel (CoCounsel Alternative)
* **Model Freedom:** Mike supports Claude, Gemini, and OpenRouter. CoCounsel is locked to specific providers.
* **Tabular Review:** Mike extracts data from hundreds of documents with verbatim citations. CoCounsel has limited batch processing.

### Mike vs Clio (Clio AI Alternative)
* **AI-First:** Mike is built for AI legal analysis from the ground up. Clio added AI to an existing practice management tool.
* **Self Hosted:** Full control over data and compliance. Clio is cloud-only with no self-hosting option.

## How to use Mike (the OSS AI Legal Platform)?

After deploying, visit the frontend URL to sign up, then configure your LLM provider API key (Gemini or Claude) in the account settings. Create a project, upload legal documents, and start analyzing with AI-powered chat, tabular review, or automated workflows.

## How to self host Mike on other VPS Services (Mike self hosting guide)

### Clone the Repository
Download **Mike** from [GitHub](https://github.com/willchen96/mike) and set up both directories.

### Install Dependencies
Ensure your VPS has **Node.js 22+**, **npm**, and **PostgreSQL 15** with GoTrue and PostgREST.

### Configure Environment Variables
Set up your Supabase credentials, S3-compatible storage, and LLM provider keys:
* `SUPABASE_URL` and `SUPABASE_SECRET_KEY` for auth and database
* `R2_ENDPOINT_URL`, `R2_ACCESS_KEY_ID`, `R2_SECRET_ACCESS_KEY` for document storage
* `GEMINI_API_KEY` or `ANTHROPIC_API_KEY` for AI models

### Start the Mike Application
Run `npm run build && npm start` in both the backend and frontend directories, then access the platform at your configured domain.

## Official Pricing of Mike (Mike pricing)

Mike is free and open source under the **AGPL-3.0 license** with no platform fees, per-seat pricing, or usage limits. You pay only for compute and your LLM API provider. Self hosting on Railway is the most cost-effective way to run an AI legal platform.

## Mike cloud vs self hosted comparison (Pricing, features, costs, and more)

Mike offers a hosted version at app.mikeoss.com and full self-hosting from source. Self hosting gives control over data residency, privilege, and model selection. Railway provides managed infrastructure with volumes, auth, HTTPS, and auto-deploys.

### Monthly cost of self hosting Mike on Railway

The Mike self hosting cost on Railway is typically $10-$20/month for the six-service stack (database, auth, REST API, gateway, backend, frontend) plus storage, plus LLM API costs from your provider.

### System Requirements for Hosting Mike on a VPS

Mike requires at least 2 vCPUs, 2GB RAM, and 5GB storage, with Node.js 22+, PostgreSQL 15, and Docker for GoTrue, PostgREST, and Kong.

## Frequently Asked Questions (FAQs)

### What is Mike self hosted?
Mike self hosted means running the open-source AI legal platform on your own server (Railway, VPS, or Docker). This gives you full data ownership, privilege preservation, and unlimited document processing without enterprise pricing.

### How much does Mike self hosting cost on Railway?
The Mike self hosting cost on Railway is typically $10-$20/month for the full six-service stack, plus LLM API costs from your chosen provider (Gemini, Claude, or OpenRouter).

### Is Mike free to use?
Yes, Mike is fully open source and free under the AGPL-3.0 license. You only pay for infrastructure and LLM API usage. There are no per-seat fees or usage caps.

### What AI models does Mike support?
Mike supports Google Gemini, Anthropic Claude, and OpenRouter (200+ models). You can switch models anytime through the account settings and use your own API keys.

### How does Mike compare to Harvey AI?
Mike is an open-source alternative to Harvey AI with comparable features - document analysis, contract review, tabular extraction, and workflows. Harvey AI costs enterprise pricing with vendor lock-in, while Mike is free to self host with full data ownership.

### What are some alternatives to Mike?
Alternatives include Harvey AI ($11B, enterprise), Legora ($5.5B, closed), CoCounsel (model-locked), and Clio (limited AI). Mike is the only fully open-source option with self-hosting and zero cost.
