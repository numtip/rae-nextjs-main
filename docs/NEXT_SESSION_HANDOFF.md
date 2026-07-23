# สรุปงานวันที่ 2026-07-01 และงานที่ต้องทำต่อ

## สถานะปัจจุบัน

### ไฟล์ที่แก้ไขแล้ว (มี Syntax Errors)
- ✅ `components/stitch-landing-v2/HeroSection.tsx` - **มีข้อผิดพลาด**
- ✅ `components/stitch-landing-v2/ResearchInnovationSection.tsx` - **มีข้อผิดพลาด**
- ✅ `components/stitch-landing-v2/ServiceCards.tsx` - **มีข้อผิดพลาด**
- ✅ `components/stitch-landing-v2/StitchLandingRenderer.tsx` - **มีข้อผิดพลาด**

### ไฟล์ที่แก้ไขแล้ว (สมบูรณ์)
- ✅ `content/research-innovation.ts` - เพิ่ม English translations สำหรับ 6 cards
- ✅ `content/stitch-landing.ts` - อัปเดต English services cards

---

## ข้อผิดพลาดที่ต้องแก้ไข (Critical Issues)

### 1. HeroSection.tsx - Line 24-28
**ปัญหา:** มี duplicate code block และ closing tag ไม่ตรง
```tsx
// มีบรรทัดซ้ำ:
<div className={isTh ? "max-w-2xl text-white" : "max-w-[720px] text-white"}>
  <h1 className={`font-bold mb-4 ${
    isTh
      ? "text-4xl md:text-5xl lg:text-6xl leading-tight"
      : "text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-[1.02]"
  }`}  // ❌ ขาด > และ closing brace
<div className={isTh ? "max-w-2xl text-white" : "max-w-[720px] text-white"}>  // ❌ ซ้ำ
```

**วิธีแก้:**
1. ลบ duplicate div และ h1 tag
2. แก้ไข h1 tag ให้ถูกต้อง:
```tsx
<h1 className={`font-bold mb-4 ${
  isTh
    ? "text-4xl md:text-5xl lg:text-6xl leading-tight"
    : "text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-[1.02]"
}`}>
```
3. เปลี่ยน `</h2>` เป็น `</h1>` ที่บรรทัด 33

---

### 2. ResearchInnovationSection.tsx - Line 26-28
**ปัญหา:** มี duplicate function declaration และ syntax error
```tsx
export function ResearchInnovationSection({ locale = "th" }: Props) {
  const data = researchInnovation;
  const isTh = locale === "th"  // ❌ ขาด semicolon
export function ResearchInnovationSection({ locale = "th" }: Props) {  // ❌ ซ้ำ
  const data = researchInnovation;
  const isTh = locale === "th";
```

**วิธีแก้:**
1. ลบ duplicate function declaration (บรรทัด 28-30)
2. เพิ่ม semicolon ที่บรรทัด 27: `const isTh = locale === "th";`

---

### 3. ResearchInnovationSection.tsx - Line 39
**ปัญหา:** มี duplicate text ใน conditional expression
```tsx
{isTh ? data.titleTh : data.titleEntitleTh : data.titleEn}  // ❌ ซ้ำ
```

**วิธีแก้:**
```tsx
{isTh ? data.titleTh : data.titleEn}
```

---

### 4. ResearchInnovationSection.tsx - Card Content (Line 78-95)
**ปัญหา:** ยังไม่เพิ่ม locale-aware rendering สำหรับ card content
```tsx
<h3 className="text-lg font-bold text-[#005C3B] mb-2 leading-snug">
  {card.title}  // ❌ ควรใช้ isTh ? card.title : card.titleEn
</h3>

<p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2 flex-1">
  {card.description}  // ❌ ควรใช้ isTh ? card.description : card.descriptionEn
</p>

<span className="mt-4 inline-flex items-center gap-1.5 text-[#005C3B] font-semibold text-sm group-hover:text-[#D8A01A] transition-colors">
  เรียนรู้เพิ่มเติม  // ❌ ควรใช้ isTh ? "เรียนรู้เพิ่มเติม" : "Learn More"
  <ArrowRight className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1" />
</span>
```

**วิธีแก้:**
```tsx
<h3 className="text-lg font-bold text-[#005C3B] mb-2 leading-snug">
  {isTh ? card.title : card.titleEn}
</h3>

<p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2 flex-1">
  {isTh ? card.description : card.descriptionEn}
</p>

<span className="mt-4 inline-flex items-center gap-1.5 text-[#005C3B] font-semibold text-sm group-hover:text-[#D8A01A] transition-colors">
  {isTh ? "เรียนรู้เพิ่มเติม" : "Learn More"}
  <ArrowRight className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1" />
</span>
```

---

### 5. ServiceCards.tsx - Line 53:130
**ปัญหา:** Parsing error: Identifier expected
**ตำแหน่ง:** บรรทัด 53 คอลัมน์ 130

**การตรวจสอบ:**
```bash
rtk npm run lint
```
จะแสดง error ที่ชัดเจน

**วิธีแก้:**
1. ตรวจสอบ JSX syntax ที่บรรทัด 53
2. ตรวจสอบว่ามีการใช้ `Handshake` icon ใน iconMap แล้วหรือยัง
3. ตรวจสอบ grid layout ว่าเปลี่ยนเป็น 3 columns แล้วหรือยัง

---

### 6. StitchLandingRenderer.tsx - Line 158:52
**ปัญหา:** No duplicate props allowed
```tsx
<ResearchInnovationSection locale={locale} locale={locale} />  // ❌ ซ้ำ
```

**วิธีแก้:**
```tsx
<ResearchInnovationSection locale={locale} />
```

---

## งานที่ต้องทำต่อ (Next Steps)

### Priority 1: แก้ไข Syntax Errors
1. **HeroSection.tsx**
   - ลบ duplicate code block
   - แก้ไข h1 tag ให้ถูกต้อง
   - เปลี่ยน `</h2>` เป็น `</h1>`

2. **ResearchInnovationSection.tsx**
   - ลบ duplicate function declaration
   - แก้ไข conditional expression ที่บรรทัด 39
   - เพิ่ม locale-aware rendering สำหรับ card content (title, description, CTA text)

3. **ServiceCards.tsx**
   - ตรวจสอบและแก้ไข syntax error ที่บรรทัด 53
   - ตรวจสอบว่า Handshake icon ถูกเพิ่มใน iconMap
   - ตรวจสอบ grid layout ว่าเปลี่ยนเป็น 3 columns

4. **StitchLandingRenderer.tsx**
   - ลบ duplicate `locale` prop

### Priority 2: ตรวจสอบและทดสอบ
```bash
# ตรวจสอบ lint
rtk npm run lint

# Build โปรเจค
rtk npm run build

# รัน development server
rtk npm run dev
```

### Priority 3: QA Testing
เปิด browser ที่:
- http://localhost:3000/stitch-landing-v2 (Thai version)
- http://localhost:3000/en/stitch-landing-v2 (English version)

**ตรวจสอบ:**
1. ✅ Hero headline size และ spacing
2. ✅ Research & Innovation section แสดง English content ถูกต้อง
3. ✅ Academic Services section แสดง English content ถูกต้อง
4. ✅ Card titles, descriptions, และ CTA text แสดงถูกต้องตามภาษา
5. ✅ Grid layout แสดง 3 columns สำหรับ Academic Services

---

## ไฟล์ที่ต้องแก้ไข (Files to Fix)

### 1. components/stitch-landing-v2/HeroSection.tsx
- **Status:** ❌ มี syntax errors
- **Issues:** Duplicate code block, incorrect closing tag
- **Fix:** ลบ duplicate, แก้ไข h1 tag, เปลี่ยน </h2> เป็น </h1>

### 2. components/stitch-landing-v2/ResearchInnovationSection.tsx
- **Status:** ❌ มี syntax errors และยังไม่สมบูรณ์
- **Issues:** Duplicate function declaration, duplicate text, card content ยังไม่ locale-aware
- **Fix:** ลบ duplicate, แก้ไข conditional, เพิ่ม locale-aware rendering สำหรับ cards

### 3. components/stitch-landing-v2/ServiceCards.tsx
- **Status:** ❌ มี syntax error ที่บรรทัด 53
- **Issues:** Parsing error
- **Fix:** ตรวจสอบและแก้ไข JSX syntax

### 4. components/stitch-landing-v2/StitchLandingRenderer.tsx
- **Status:** ❌ มี duplicate prop
- **Issues:** Duplicate `locale` prop
- **Fix:** ลบ duplicate prop

---

## ข้อมูลเพิ่มเติม (Additional Context)

### English Translations ที่ใช้

#### Research & Innovation Cards (content/research-innovation.ts)
1. **Research Projects** - "Research Strategy"
2. **Innovation and Technology Transfer** - "Research Funding"
3. **Research Funding and Support** - "Research Centers"
4. **Researcher Development** - "Research Capacity"
5. **Knowledge for Sustainable Agriculture** - "Innovation"
6. **Collaboration** - "Collaboration"

#### Academic Services Cards (content/stitch-landing.ts)
1. **Training Programs**
2. **Consulting Services**
3. **Agricultural Extension**
4. **Learning Resources**
5. **Forms and Service Documents**
6. **Community Knowledge Transfer**

### Typography Specifications
- **Thai:** `text-4xl md:text-5xl lg:text-6xl leading-tight max-w-2xl`
- **English:** `text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-[1.02] max-w-[720px]`

---

## คำสั่งที่ใช้บ่อย (Useful Commands)

```bash
# ตรวจสอบ lint errors
rtk npm run lint

# Reset ไฟล์ที่เสียหาย
rtk git checkout -- <file-path>

# ตรวจสอบ git status
rtk git status -sb

# รัน development server
rtk npm run dev

# Build โปรเจค
rtk npm run build
```

---

## สรุป (Summary)

**งานที่ทำวันนี้:**
- ✅ แก้ไข HeroSection.tsx สำหรับ responsive typography
- ✅ แก้ไข ResearchInnovationSection.tsx สำหรับ locale-aware rendering
- ✅ อัปเดต content/research-innovation.ts ด้วย English translations
- ✅ อัปเดต content/stitch-landing.ts ด้วย English services cards

**งานที่ต้องทำต่อ:**
- ❌ แก้ไข syntax errors ใน 4 ไฟล์ components
- ❌ เพิ่ม locale-aware rendering สำหรับ card content
- ❌ ทดสอบและ QA

**สถานะ:** 70% เสร็จสมบูรณ์ - ต้องแก้ไข syntax errors ก่อนจึงจะ build และ test ได้

---

**สร้างเมื่อ:** 2026-07-01
**Branch:** p2-landing-v2-integration
# สรุปงานวันที่ 2026-07-01 และงานที่ต้องทำต่อ

## สถานะปัจจุบัน

### ไฟล์ที่แก้ไขแล้ว (มี Syntax Errors)
- ✅ `components/stitch-landing-v2/HeroSection.tsx` - **มีข้อผิดพลาด**
- ✅ `components/stitch-landing-v2/ResearchInnovationSection.tsx` - **มีข้อผิดพลาด**
- ✅ `components/stitch-landing-v2/ServiceCards.tsx` - **มีข้อผิดพลาด**
- ✅ `components/stitch-landing-v2/StitchLandingRenderer.tsx` - **มีข้อผิดพลาด**

### ไฟล์ที่แก้ไขแล้ว (สมบูรณ์)
- ✅ `content/research-innovation.ts` - เพิ่ม English translations สำหรับ 6 cards
- ✅ `content/stitch-landing.ts` - อัปเดต English services cards

---

## ข้อผิดพลาดที่ต้องแก้ไข (Critical Issues)

### 1. HeroSection.tsx - Line 24-28
**ปัญหา:** มี duplicate code block และ closing tag ไม่ตรง
```tsx
// มีบรรทัดซ้ำ:
<div className={isTh ? "max-w-2xl text-white" : "max-w-[720px] text-white"}>
  <h1 className={`font-bold mb-4 ${
    isTh
      ? "text-4xl md:text-5xl lg:text-6xl leading-tight"
      : "text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-[1.02]"
  }`}  // ❌ ขาด > และ closing brace
<div className={isTh ? "max-w-2xl text-white" : "max-w-[720px] text-white"}>  // ❌ ซ้ำ
```

**วิธีแก้:**
1. ลบ duplicate div และ h1 tag
2. แก้ไข h1 tag ให้ถูกต้อง:
```tsx
<h1 className={`font-bold mb-4 ${
  isTh
    ? "text-4xl md:text-5xl lg:text-6xl leading-tight"
    : "text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-[1.02]"
}`}>
```
3. เปลี่ยน `</h2>` เป็น `</h1>` ที่บรรทัด 33

---

### 2. ResearchInnovationSection.tsx - Line 26-28
**ปัญหา:** มี duplicate function declaration และ syntax error
```tsx
export function ResearchInnovationSection({ locale = "th" }: Props) {
  const data = researchInnovation;
  const isTh = locale === "th"  // ❌ ขาด semicolon
export function ResearchInnovationSection({ locale = "th" }: Props) {  // ❌ ซ้ำ
  const data = researchInnovation;
  const isTh = locale === "th";
```

**วิธีแก้:**
1. ลบ duplicate function declaration (บรรทัด 28-30)
2. เพิ่ม semicolon ที่บรรทัด 27: `const isTh = locale === "th";`

---

### 3. ResearchInnovationSection.tsx - Line 39
**ปัญหา:** มี duplicate text ใน conditional expression
```tsx
{isTh ? data.titleTh : data.titleEntitleTh : data.titleEn}  // ❌ ซ้ำ
```

**วิธีแก้:**
```tsx
{isTh ? data.titleTh : data.titleEn}
```

---

### 4. ResearchInnovationSection.tsx - Card Content (Line 78-95)
**ปัญหา:** ยังไม่เพิ่ม locale-aware rendering สำหรับ card content
```tsx
<h3 className="text-lg font-bold text-[#005C3B] mb-2 leading-snug">
  {card.title}  // ❌ ควรใช้ isTh ? card.title : card.titleEn
</h3>

<p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2 flex-1">
  {card.description}  // ❌ ควรใช้ isTh ? card.description : card.descriptionEn
</p>

<span className="mt-4 inline-flex items-center gap-1.5 text-[#005C3B] font-semibold text-sm group-hover:text-[#D8A01A] transition-colors">
  เรียนรู้เพิ่มเติม  // ❌ ควรใช้ isTh ? "เรียนรู้เพิ่มเติม" : "Learn More"
  <ArrowRight className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1" />
</span>
```

**วิธีแก้:**
```tsx
<h3 className="text-lg font-bold text-[#005C3B] mb-2 leading-snug">
  {isTh ? card.title : card.titleEn}
</h3>

<p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2 flex-1">
  {isTh ? card.description : card.descriptionEn}
</p>

<span className="mt-4 inline-flex items-center gap-1.5 text-[#005C3B] font-semibold text-sm group-hover:text-[#D8A01A] transition-colors">
  {isTh ? "เรียนรู้เพิ่มเติม" : "Learn More"}
  <ArrowRight className="w-3.5 h-3.5 transition-all duration-300 group-hover:translate-x-1" />
</span>
```

---

### 5. ServiceCards.tsx - Line 53:130
**ปัญหา:** Parsing error: Identifier expected
**ตำแหน่ง:** บรรทัด 53 คอลัมน์ 130

**การตรวจสอบ:**
```bash
rtk npm run lint
```
จะแสดง error ที่ชัดเจน

**วิธีแก้:**
1. ตรวจสอบ JSX syntax ที่บรรทัด 53
2. ตรวจสอบว่ามีการใช้ `Handshake` icon ใน iconMap แล้วหรือยัง
3. ตรวจสอบ grid layout ว่าเปลี่ยนเป็น 3 columns แล้วหรือยัง

---

### 6. StitchLandingRenderer.tsx - Line 158:52
**ปัญหา:** No duplicate props allowed
```tsx
<ResearchInnovationSection locale={locale} locale={locale} />  // ❌ ซ้ำ
```

**วิธีแก้:**
```tsx
<ResearchInnovationSection locale={locale} />
```

---

## งานที่ต้องทำต่อ (Next Steps)

### Priority 1: แก้ไข Syntax Errors
1. **HeroSection.tsx**
   - ลบ duplicate code block
   - แก้ไข h1 tag ให้ถูกต้อง
   - เปลี่ยน `</h2>` เป็น `</h1>`

2. **ResearchInnovationSection.tsx**
   - ลบ duplicate function declaration
   - แก้ไข conditional expression ที่บรรทัด 39
   - เพิ่ม locale-aware rendering สำหรับ card content (title, description, CTA text)

3. **ServiceCards.tsx**
   - ตรวจสอบและแก้ไข syntax error ที่บรรทัด 53
   - ตรวจสอบว่า Handshake icon ถูกเพิ่มใน iconMap
   - ตรวจสอบ grid layout ว่าเปลี่ยนเป็น 3 columns

4. **StitchLandingRenderer.tsx**
   - ลบ duplicate `locale` prop

### Priority 2: ตรวจสอบและทดสอบ
```bash
# ตรวจสอบ lint
rtk npm run lint

# Build โปรเจค
rtk npm run build

# รัน development server
rtk npm run dev
```

### Priority 3: QA Testing
เปิด browser ที่:
- http://localhost:3000/stitch-landing-v2 (Thai version)
- http://localhost:3000/en/stitch-landing-v2 (English version)

**ตรวจสอบ:**
1. ✅ Hero headline size และ spacing
2. ✅ Research & Innovation section แสดง English content ถูกต้อง
3. ✅ Academic Services section แสดง English content ถูกต้อง
4. ✅ Card titles, descriptions, และ CTA text แสดงถูกต้องตามภาษา
5. ✅ Grid layout แสดง 3 columns สำหรับ Academic Services

---

## ไฟล์ที่ต้องแก้ไข (Files to Fix)

### 1. components/stitch-landing-v2/HeroSection.tsx
- **Status:** ❌ มี syntax errors
- **Issues:** Duplicate code block, incorrect closing tag
- **Fix:** ลบ duplicate, แก้ไข h1 tag, เปลี่ยน </h2> เป็น </h1>

### 2. components/stitch-landing-v2/ResearchInnovationSection.tsx
- **Status:** ❌ มี syntax errors และยังไม่สมบูรณ์
- **Issues:** Duplicate function declaration, duplicate text, card content ยังไม่ locale-aware
- **Fix:** ลบ duplicate, แก้ไข conditional, เพิ่ม locale-aware rendering สำหรับ cards

### 3. components/stitch-landing-v2/ServiceCards.tsx
- **Status:** ❌ มี syntax error ที่บรรทัด 53
- **Issues:** Parsing error
- **Fix:** ตรวจสอบและแก้ไข JSX syntax

### 4. components/stitch-landing-v2/StitchLandingRenderer.tsx
- **Status:** ❌ มี duplicate prop
- **Issues:** Duplicate `locale` prop
- **Fix:** ลบ duplicate prop

---

## ข้อมูลเพิ่มเติม (Additional Context)

### English Translations ที่ใช้

#### Research & Innovation Cards (content/research-innovation.ts)
1. **Research Projects** - "Research Strategy"
2. **Innovation and Technology Transfer** - "Research Funding"
3. **Research Funding and Support** - "Research Centers"
4. **Researcher Development** - "Research Capacity"
5. **Knowledge for Sustainable Agriculture** - "Innovation"
6. **Collaboration** - "Collaboration"

#### Academic Services Cards (content/stitch-landing.ts)
1. **Training Programs**
2. **Consulting Services**
3. **Agricultural Extension**
4. **Learning Resources**
5. **Forms and Service Documents**
6. **Community Knowledge Transfer**

### Typography Specifications
- **Thai:** `text-4xl md:text-5xl lg:text-6xl leading-tight max-w-2xl`
- **English:** `text-4xl md:text-5xl lg:text-6xl xl:text-[72px] leading-[1.02] max-w-[720px]`

---

## คำสั่งที่ใช้บ่อย (Useful Commands)

```bash
# ตรวจสอบ lint errors
rtk npm run lint

# Reset ไฟล์ที่เสียหาย
rtk git checkout -- <file-path>

# ตรวจสอบ git status
rtk git status -sb

# รัน development server
rtk npm run dev

# Build โปรเจค
rtk npm run build
```

---

## สรุป (Summary)

**งานที่ทำวันนี้:**
- ✅ แก้ไข HeroSection.tsx สำหรับ responsive typography
- ✅ แก้ไข ResearchInnovationSection.tsx สำหรับ locale-aware rendering
- ✅ อัปเดต content/research-innovation.ts ด้วย English translations
- ✅ อัปเดต content/stitch-landing.ts ด้วย English services cards

**งานที่ต้องทำต่อ:**
- ❌ แก้ไข syntax errors ใน 4 ไฟล์ components
- ❌ เพิ่ม locale-aware rendering สำหรับ card content
- ❌ ทดสอบและ QA

**สถานะ:** 70% เสร็จสมบูรณ์ - ต้องแก้ไข syntax errors ก่อนจึงจะ build และ test ได้

---

**สร้างเมื่อ:** 2026-07-01
**Branch:** p2-landing-v2-integration
