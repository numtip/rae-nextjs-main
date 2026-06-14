# RAE fal.ai Runtime Setup

**RC4.6 FAL Runtime Readiness Audit** · Installation and configuration guide for fal.ai AI video generation  
**Status:** Reference — NOT yet configured  
**Authority:** Follow this guide to enable fal.ai runtime on the local development environment.

---

## Package Requirements

### Install fal SDK

```bash
rtk npm install @fal-ai/client
```

Verify installation:

```bash
rtk npm list @fal-ai/client
```

Expected output:

```
rae-nextjs-main@0.1.0 F:\projectAi\research-data-lab
└── @fal-ai/client@<version>
```

### Required Node Version

| Requirement | Value |
|-------------|-------|
| Node.js | ≥ 18 (project uses Node 20) |
| npm | ≥ 9 |

---

## Environment Requirements

### API Key Configuration

fal.ai requires an API key set as an environment variable. Two variable names are supported:

| Variable | Status |
|----------|--------|
| `FAL_KEY` | ❌ Not configured |
| `FAL_API_KEY` | ❌ Not configured |

### Setting the API Key

**Windows (PowerShell, current session):**

```powershell
$env:FAL_KEY = "your-fal-api-key-here"
```

**Windows (PowerShell, persistent — User scope):**

```powershell
[Environment]::SetEnvironmentVariable("FAL_KEY", "your-fal-api-key-here", "User")
```

**Git Bash / WSL (current session):**

```bash
export FAL_KEY="your-fal-api-key-here"
```

**.env.local (development only, NOT committed):**

Create `F:\projectAi\research-data-lab\.env.local` with:

```
FAL_KEY=your-fal-api-key-here
```

### Security Rules

| Rule | Enforcement |
|------|-------------|
| Never hardcode key in code | Scripts must read from `process.env.FAL_KEY` |
| Never commit key to repo | `.env.local` is gitignored; verify with `git status` |
| Never print key in logs | Mask or omit in all outputs |
| Rotate key if exposed | Revoke immediately on fal.ai dashboard |
| Restrict key permissions | Use minimal-scope API key (generation only) |

---

## Local Workflow

### 1. One-Time Setup

```bash
# Install SDK
rtk npm install @fal-ai/client

# Configure environment (choose one method)
# PowerShell: $env:FAL_KEY = "your-key"
# Bash: export FAL_KEY="your-key"
# .env.local: FAL_KEY=your-key

# Verify
rtk bash -lc 'env | grep FAL || echo "FAL_KEY not set"'
```

### 2. Generate Motion

After setup, generation uses the prompt rules from `docs/creative/FAL_AI_GENERATION_RULES.md`:

| Requirement | Value |
|-------------|-------|
| Duration | 5–8 seconds |
| Audio | None |
| Text | None (HTML overlay only) |
| Watermarks | None |
| Loop | Seamless |
| Resolution | 1920×1080 max |
| Frame rate | 24 fps |

### 3. Post-Generation Pipeline

Output lands in `F:\ProjectAI\rae-motion-lab\generated\motion\` and follows the production gate:

```
generated/  →  compress-web-video.sh  →  compressed/  →  extract-poster.sh  →  posters/  →  QA  →  approved/
```

See [MOTION_PRODUCTION_GATE.md](../governance/MOTION_PRODUCTION_GATE.md) for full workflow.

---

## Security Rules

| Category | Rule |
|----------|------|
| API Key | Never store in source code, never commit |
| Environment | Use `.env.local` (gitignored) or shell env vars |
| Logging | Never print FAL_KEY value in terminal, logs, or reports |
| Sharing | Never share API key via commit, screenshot, or chat |
| Rotation | Rotate immediately if key exposure is suspected |

### .env.local Template

```
# FAL_KEY=your-api-key-here
# Uncomment and set before first generation
```

This file is gitignored by default. Verify:

```bash
rtk git status --short
```

If `.env.local` appears as untracked, add it to `.gitignore` immediately.

---

## Asset Workflow

```
fal.ai generation
    ↓ (raw output)
rae-motion-lab/generated/motion/<asset>.mp4
    ↓ compress-web-video.sh (FFmpeg H.264)
rae-motion-lab/compressed/<asset>.mp4
    ↓ extract-poster.sh (FFmpeg)
rae-motion-lab/posters/<asset>.jpg
    ↓ QA Review (MOTION_QA_CHECKLIST.md)
rae-motion-lab/approved/motion/<asset>.mp4
    ↓ (future RC4.7+)
rae-nextjs-main/public/assets/motion/<asset>.mp4
```

---

## Troubleshooting

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| `FAL_KEY not configured` | Env var not set | Set `FAL_KEY` in shell or `.env.local` |
| `@fal-ai/client` missing | SDK not installed | Run `npm install @fal-ai/client` |
| `401 Unauthorized` | Invalid API key | Verify key on fal.ai dashboard |
| `402 Payment Required` | Insufficient credits | Add credits to fal.ai account |
| Generation doesn't loop | Wrong model/params | Use loop-safe model + prompt template |
| Output has audio | Post-generation issue | Always use `-an` in compress-web-video.sh |
| Output has watermark | Free tier limitation | Verify paid tier or check fal.ai settings |

---

## Related Documents

- [FAL_AI_GENERATION_RULES.md](../creative/FAL_AI_GENERATION_RULES.md) — Prompt rules and generation constraints
- [MOTION_PRODUCTION_GATE.md](../governance/MOTION_PRODUCTION_GATE.md) — Production gate workflow
- [MOTION_QA_CHECKLIST.md](../creative/MOTION_QA_CHECKLIST.md) — QA checklist
- [ASSET_GOVERNANCE.md](../creative/ASSET_GOVERNANCE.md) — Workspace and naming
- [MOTION_LANGUAGE_BIBLE.md](../creative/MOTION_LANGUAGE_BIBLE.md) — Motion personality
- [../reports/FAL_AI_READINESS_REPORT.md](../reports/FAL_AI_READINESS_REPORT.md) — Previous readiness audit (RC4.5)
- [../reports/RC4_6_FAL_RUNTIME_REPORT.md](../reports/RC4_6_FAL_RUNTIME_REPORT.md) — This sprint report
