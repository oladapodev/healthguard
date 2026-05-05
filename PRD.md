# HealthGuard AI PRD

**Status:** Source of truth  
**Last Updated:** 2026-05-05  
**Owner:** HealthGuard AI  
**Related Implementation Source:** [AGENTS.md](/home/dev/Desktop/healthguard/AGENTS.md)

## 1. Project Title

**HealthGuard AI** — Your Friendly, Inclusive Personal Health Companion & Clinical Bridge

## 2. Project Description

HealthGuard AI is a patient-facing multi-agent system that helps everyday users upload and understand their lab results in rich personal and environmental context. It incorporates age- and gender-specific factors, including optional menstrual cycle context for females, daily lifestyle inputs, and local environmental data such as weather, air quality, and pollution.

The app delivers simple explanations, generates a professional Doctor Note, and bridges to clinicians by producing structured, reasoning-rich summaries that doctors can quickly review.

HealthGuard AI must maintain an extremely clean, approachable interface suitable for all ages and tech comfort levels while embedding strong safety, bias mitigation, and clear disclaimers that it is not a substitute for professional medical care.

## 3. Project Goal

Empower patients to feel more informed and prepared for doctor visits while providing clinicians with clear, structured, context-aware summaries.

The system should demonstrate deep AI agentic capabilities, including reasoning, multi-source integration, and structured output, in a defensible, ambitious, and safe way. It should be ambitious in intelligence and context awareness, but safe by never claiming to diagnose or replace licensed professionals.

## 4. Product Principles

- Patient-first: outputs must be understandable by everyday users.
- Clinician-bridge: professional summaries must be structured, concise, and review-oriented.
- Safety-first: never diagnose, never replace care, and always escalate urgent patterns.
- Context-aware: account for age, gender, cycle context, lifestyle, weather, and pollution when relevant.
- Inclusive: avoid stereotypical assumptions and make sensitive health fields optional.
- Source-grounded: medical and environmental insights must draw from reputable sources only.
- Accessible: interface should use large clear controls, calm language, and minimal steps.

## 5. Concrete Features List

### 5.1 User Profile & Onboarding

- Age
- Gender: Male, Female, Other, Prefer not to say
- Blood group
- Height and weight
- Known conditions
- Allergies
- Medications
- Secure, user-controlled profile editing

### 5.2 Gender-Specific, Age-Aware & Intimate Health Handling

- Females: optional menstrual cycle tracking, including last period, cycle length, and symptoms.
- Females: contextual insights where clinically relevant, such as iron levels and menstrual blood loss, with explicit opt-in.
- Males: relevant context for applicable markers, such as PSA and testosterone-related markers.
- Age-adjusted reference ranges and explanations for pediatric, adult, and elderly users where supported by reputable sources.
- Gentle, private, opt-in questioning only when relevant.

### 5.3 Lab Results Analyzer

- PDF upload
- Image upload
- Manual entry fallback
- Auto-extraction from uploaded lab documents
- Age- and gender-adjusted reference ranges where available
- Plain-language explanations
- Color-coded insight levels:
  - Green: normal or reassuring
  - Yellow: attention needed
  - Red: urgent or potentially concerning

### 5.4 Daily Quick Check-In

- Mood emoji input
- Short feeling description through text, and voice later if feasible
- Quick food tags
- Sleep selectors
- Exercise selectors
- Target completion time under 20 seconds

### 5.5 Enhanced Environmental & Pollution Context

- Location-based weather
- Humidity
- Pollen where available
- Air Quality Index
- PM2.5
- PM10
- NO2
- O3
- Other relevant pollutants when data is available
- Contextual correlations, such as pollution with respiratory markers or allergies, grounded in reputable sources like WHO and CDC.

### 5.6 Multi-Agent AI Reasoning Engine

The core intelligence should be implemented as a controllable multi-agent workflow:

- Intake Agent
- Context Agent
- Insights Agent
- Safety Agent
- Note Agent

Structured clinical-style reasoning should include:

- Case summary
- Key signals and patterns
- Environmental and lifestyle correlations
- Gender, age, and cycle considerations
- Suggested questions or data to bring to the doctor
- Explicit framing that these are not diagnoses

### 5.7 Doctor Note + Clinical Bridge Output

- Patient-friendly summary
- Professional clinician-facing version
- Step-by-step reasoning
- Risk flags
- "For clinician review" framing
- One-click PDF export
- Clean printable layout
- Prominent disclaimers

### 5.8 Safety, Ethics & Bias Mitigation

- Prominent disclaimers across analysis and note surfaces.
- Urgent flags should use clear guidance such as "See a doctor today" where appropriate.
- Bias mitigation across gender and age.
- Use sex- and age-specific reference ranges where supported.
- Use diverse testing prompts and outputs.
- Avoid stereotypical language.
- Apply intersectional awareness, especially age by gender interactions.
- Provide transparent sourcing and fairness checks.
- Refuse or redirect high-risk queries that ask for diagnosis, emergency replacement, self-harm guidance, or medication changes without clinician oversight.

### 5.9 Simple Chat Mode

- Conversational entry point for users who do not know where to start.
- Chat should route users toward profile completion, lab upload, analysis, or doctor note generation.
- Chat must keep medical safety boundaries explicit.

### 5.10 Clean, Inclusive UX

- Large buttons
- Minimal steps
- Calm medical color palette
- Accessibility-focused typography and spacing
- Plain-language explanations
- Avoid dense medical jargon unless viewing the clinician summary

## 6. Clinical Decision Support Alignment

HealthGuard AI correlates well with Clinical Decision Support concepts and should be strengthened by them without changing the core patient-friendly direction.

The app already performs structured reasoning and Doctor Note generation. This should be elevated by making clinician-facing output more professional through reasoning breakdowns, key signals, and next-step suggestions framed as "considerations for review."

This direction makes the project stronger for hackathon judging because it combines patient empowerment and clinician support in one tool.

The system must stay safe by remaining a patient tool that helps users prepare for clinicians. It must not overclaim, diagnose, prescribe, or replace medical professionals.

## 7. Integration Recommendation

Keep the primary flow patient-facing, simple, and approachable.

Automatically generate a "Clinician Summary" toggle or tab with more formal reasoning language. This gives the product both an easy user experience and a more impressive clinical reasoning layer while keeping the risk posture defensible.

## 8. Research Basis

Medical insights and environmental correlations must be grounded in reputable sources only:

- Mayo Clinic resources for lab interpretation and patient education.
- National Institutes of Health and MedlinePlus for reference ranges and explanations.
- Centers for Disease Control and Prevention for public health and environmental health guidance.
- World Health Organization for air pollution, AQI-related health impacts, and global health framing.

All AI outputs should reference or draw from these categories of sources. Any future RAG knowledge base must preserve source metadata so the app can explain where medical or environmental claims came from.

## 9. Safety Language Requirements

Every analysis and note output must include a disclaimer equivalent to:

```text
HealthGuard AI is not a diagnosis and is not a substitute for professional medical care. Please review these results with a qualified clinician, especially if symptoms are severe, worsening, or urgent.
```

Urgent outputs must avoid vague reassurance and should clearly advise the user to seek timely medical care.

## 10. MVP Scope

The first usable version should prove the full product loop:

- Profile setup
- Lab upload or manual lab entry
- Basic parsing
- Context capture
- AI analysis
- Patient summary
- Clinician summary
- Doctor note export
- Safety disclaimer and urgent flag handling

## 11. Non-Goals

- No diagnosis claims.
- No medication adjustment recommendations without clinician framing.
- No emergency triage replacement.
- No broad unsupported medical claims.
- No mandatory intimate health data collection.
- No hidden use of sensitive demographic fields without user control and clear purpose.

## 12. Implementation Source Link

Technical structure, stack choices, folder layout, command contracts, and implementation checklists live in [AGENTS.md](/home/dev/Desktop/healthguard/AGENTS.md).

Product intent, safety posture, feature scope, and research grounding live in this `PRD.md`.
