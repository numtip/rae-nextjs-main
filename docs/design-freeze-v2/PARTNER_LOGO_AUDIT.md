# Partner Logo Audit

**Date:** 2026-06-30  
**Phase:** K0.5C — Official Partner Logo Acquisition  
**Status:** ✅ **COMPLETE**  

---

## Summary

All 7 partner logos have been acquired from authoritative official sources and stored in `public/assets/partners/`. The 8th partner ("Private Sector & Community Partners") is a generic category that does not have a single logo.

---

## Logo Inventory

| # | Organization | Format | Filename | Size | Source URL | Status |
|---|-------------|--------|----------|------|------------|--------|
| 1 | **Maejo University** | PNG | `maejo.png` | 37.6 KB | `mju.ac.th` (official website header) | ✅ Downloaded |
| 2 | **Chiang Mai University** | PNG | `cmu.png` | 12.8 KB | `cmu.ac.th` (official website header) | ✅ Downloaded |
| 3 | **Department of Agriculture** | PNG | `doa.png` | 30.2 KB | `moac.go.th` (DOA official site blocked by WAF; sourced from parent ministry) | ✅ Downloaded |
| 4 | **NSTDA** | SVG | `nstda.svg` | 4.1 KB | `nstda.or.th` (official website theme logo) | ✅ Downloaded |
| 5 | **Kasetsart University** | SVG | `ku.svg` | 99.4 KB | `ku.ac.th` (official website header logo) | ✅ Downloaded |
| 6 | **NRCT** | PNG | `nrct.png` | 25.7 KB | `nrct.go.th` (official website header) | ✅ Downloaded |
| 7 | **TSRI** | PNG | `tsri.png` | 210 KB | `tsri.or.th` (official website logo) | ✅ Downloaded |
| 8 | **Private Sector & Community Partners** | N/A | N/A | N/A | Generic category — no single logo | ➖ Not applicable |

---

## Quality Verification

| Checklist | Status |
|-----------|--------|
| Transparent background | ✅ All PNGs have transparent bg; SVGs are inherently transparent |
| Readable at 120px | ✅ All logos scale cleanly |
| Official colors preserved | ✅ Original colors maintained |
| No watermark | ✅ No watermarks present |
| No screenshot logos | ✅ All are proper logo files, not screenshots |

---

## Notes

### SVG Priority
- **NSTDA** (`nstda.svg`) and **Kasetsart University** (`ku.svg`) were obtained as SVGs — ideal for crisp rendering at any size.
- The remaining 5 logos are PNG format. If SVGs become available later, they should replace the PNGs.

### Department of Agriculture
- The official DOA website (`doa.go.th`) is protected by a Web Application Firewall (WAF) returning 403 Forbidden.
- The logo was sourced from the parent Ministry of Agriculture and Cooperatives website (`moac.go.th`), which is the authoritative government source.
- **Recommendation:** Contact DOA directly for an official SVG logo file if needed.

### TSRI
- The TSRI website (`tsri.or.th`) currently uses the "Thailand RISE Fund" branding as its primary logo on the public site.
- This is the official logo displayed on the organization's website and has been used accordingly.
- **Recommendation:** Verify with TSRI if they have an alternative/updated logo.

### Private Sector & Community Partners
- This is a generic category representing multiple private-sector and community organizations.
- No single logo can represent this group.
- The card uses the initials fallback (colored circle with "Pr") rather than a logo.

### Ordering
Partners are ordered by relevance to RAE's core mission:
1. Maejo University (parent university — most relevant)
2. Chiang Mai University (closest regional partner)
3. Department of Agriculture (key government partner)
4. NSTDA (national science & technology)
5. Kasetsart University (peer agricultural university)
6. NRCT (national research council)
7. TSRI (research & innovation funding)
8. Private/Community (broad network)

---

## File Locations

```
public/assets/partners/
├── maejo.png    (Maejo University)
├── cmu.png      (Chiang Mai University)
├── doa.png      (Department of Agriculture)
├── nstda.svg    (NSTDA)
├── ku.svg       (Kasetsart University)
├── nrct.png     (NRCT)
└── tsri.png     (TSRI)
```

All files are referenced in `content/stitch-landing.ts` via the `logo` field in each partner item.

---

## Data Integration

The `PartnerItem` type was updated to include an optional `logo` field:

```ts
export type PartnerItem = {
  id: string;
  nameTh: string;
  nameEn: string;
  shortName?: string;
  logo?: string;        // <-- added: path to logo file
  type: string;
};
```

The `PartnersSection.tsx` renders `<img>` when `logo` is present, with a deterministic colored-initials fallback when it's not.

---

## Missing Assets

| Asset | Reason | Action |
|-------|--------|--------|
| DOA SVG | WAF blocked direct access to `doa.go.th` | Contact DOA for official SVG |
| TSRI SVG | Only PNG available on `tsri.or.th` | Request SVG from TSRI |
| Private sector logo | Generic category — no single logo | N/A — initials fallback is appropriate |

---

*End of Partner Logo Audit.*
