# Agency Agents — Skills Index

**Project:** RAE Next.js Main  
**Path:** `/home/rae_admin/rae-nextjs-main/`

Supervisor **must** select skill(s) before Builder execution. See `AGENT_WORKFLOW.md`.

| Skill | File | Owner role | When invoked | Required inputs | Expected output |
|-------|------|------------|--------------|-----------------|-----------------|
| Token Savior Workflow | `skills/TOKEN_SAVIOR_WORKFLOW.md` | Supervisor | Session start; before reads | Target file list from brief | `TOKEN_SAVIOR: OK` + read set |
| Build Verification | `skills/BUILD_VERIFICATION.md` | Frontend, QA | After code edits; pre-commit | Node 20 via nvm | `BUILD: PASS/FAIL` |
| Homepage Review | `skills/HOMEPAGE_REVIEW.md` | Frontend, QA | Homepage section work | Section IDs; visual system ref | `HOMEPAGE_REVIEW: PASS/WARN/FAIL` |
| A11y Review | `skills/A11Y_REVIEW.md` | QA, Frontend | Heading/link/nav changes | Touched component paths | `A11Y_REVIEW: PASS/WARN/FAIL` |
| Release Safety Check | `skills/RELEASE_SAFETY_CHECK.md` | Supervisor, DevOps, QA | Pre-commit; pre-push | `git status`; build result | `RELEASE_SAFETY: PASS/FAIL` |

## Default slice stack

1. TOKEN_SAVIOR_WORKFLOW  
2. HOMEPAGE_REVIEW (if homepage)  
3. A11Y_REVIEW (if UI structure)  
4. BUILD_VERIFICATION  
5. RELEASE_SAFETY_CHECK  

## Related

- `docs/agent/AGENCY_AGENTS_POLICY.md`
- `docs/agent/AGENT_WORKFLOW.md`
