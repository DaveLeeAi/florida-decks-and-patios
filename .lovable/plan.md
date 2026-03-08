## Florida Deck Permit Requirement Checker

### What it does

A new interactive tool component (`src/components/tools/PermitChecker.tsx`) that takes user inputs about their deck project and outputs a detailed permit assessment. Added to the Tools page alongside the existing Budget Estimator, Repair Checker, and Violation Decoder.

### Inputs (step-by-step form)

1. **City/Region** — dropdown populated from `cityData.ts` (9 cities), plus "Other Florida location"
2. **Deck size** — slider or number input (sq ft)
3. **Height above grade** — select: ground-level (<12"), low (12–30"), elevated (30–60"), high (60"+)
4. **Attached vs freestanding** — radio toggle
5. **Stairs** — yes/no toggle; if yes, number of steps select
6. **Roof/pergola cover** — none / open pergola / solid roof
7. **Electrical** — none / lighting only / outlets & fans

### Output (generated on "Check Requirements")

- **Permit likelihood** — color-coded badge (Almost Certainly Required / Likely Required / Possibly Exempt) with explanation
- **Required inspections** — ordered list (footings, framing, electrical, final) based on selections
- **Estimated timeline** — permit processing + construction window
- **Common mistakes** — 3–4 contextual warnings based on inputs (e.g., "Attached decks in Miami-Dade require NOA-approved connectors")
- **Estimated permit fees** — pulled from `cityData.costData.permitFeeBasic/Complex`
- **Next steps** — actionable checklist with link to city permit department from `cityData.permitLink`

### Disclaimer

Prominent alert at top and bottom: "This tool provides general guidance only. Permit requirements vary by jurisdiction. Always confirm with your local building department before starting work."

### Technical approach

- Pure client-side logic — no database needed, all data derived from existing `cityData.ts` + hardcoded permit rules
- Follow the same card-based UI pattern as `BudgetEstimator.tsx` (card with icon header, form inputs, calculate button, result panel)
- Add the component to `Tools.tsx` between the Budget Estimator and Repair Checker sections
- Use existing UI primitives: `Select`, `Button`, `Alert`, radio groups via toggle buttons, `Slider`

### Files changed

1. **Create** `src/components/tools/PermitChecker.tsx` — the full interactive component
2. **Edit** `src/pages/Tools.tsx` — import and render `<PermitChecker />` in the tools list

Upgrade the existing Florida Deck Permit Requirement Checker tool and make it significantly more accurate, helpful, and homeowner-friendly.

The goal is to turn it into one of the most useful tools on the site.

Do NOT remove the current functionality — expand it.

-------------------------------------

PART 1 — IMPROVE INPUTS

Add additional form inputs that better reflect how Florida building departments determine permit requirements.

Current inputs already include:

City/Region

Deck size

Height

Attached vs freestanding

Stairs

Roof/pergola

Electrical

Expand this to include:

City dropdown expanded to include at least 20 Florida cities:

Miami

Tampa

Orlando

Jacksonville

St Petersburg

Fort Lauderdale

Sarasota

Naples

Palm Beach

Tallahassee

St Augustine

Daytona Beach

Pensacola

Lakeland

Bradenton

Cape Coral

Clearwater

Gainesville

Port St Lucie

Ocala

Deck height categories:

Ground level (<12")

Low deck (12–30")

Elevated deck (30–72")

Second story

Attachment type:

Ledger attached to house

Freestanding

Attached to masonry

Attached to stucco wall

HOA status:

Yes

No

Not sure

Flood zone awareness:

Yes

No

Not sure

Deck materials:

Pressure treated wood

Composite

Mixed materials

Railings required:

Yes

No

-------------------------------------

PART 2 — BETTER RESULTS OUTPUT

Improve the output panel so results are easier to understand.

Include the following sections:

Permit Likelihood

Show a visual indicator such as a bar or colored badge:

Almost Certainly Required

Likely Required

Possibly Required

Permit Possibly Not Required

Required Inspections

Show a clear sequence:

Permit Issued

Footing Inspection

Framing Inspection

Electrical Inspection (if applicable)

Final Inspection

Estimated Permit Fee

Show a typical range:

Example:

$120 – $450 typical permit range depending on city and project size.

Construction Timeline

Permit processing estimate

Typical inspection timeline

Construction duration

Special Requirements

Examples:

HVHZ connector requirements

Miami-Dade NOA considerations

HOA approval requirement

Flood zone review

-------------------------------------

PART 3 — ADD PERMIT RISK WARNING

If the user scenario indicates a permit is required, display a warning block explaining risks of building without a permit:

Possible failed inspections

Stop-work orders

Permit penalties

Difficulty selling home

Forced demolition of unpermitted work

Keep wording educational, not legal advice.

-------------------------------------

PART 4 — ADD DOWNLOADABLE CHECKLIST

Add a button below the results:

Download Deck Permit Checklist

The checklist should include:

Verify local permit requirements

Confirm HOA rules

Prepare site plan

Confirm structural details

Confirm connectors and materials

Schedule inspections

The checklist should be printable.

-------------------------------------

PART 5 — ADD CALL TO ACTION

Below the results add a CTA block:

Need help pulling a permit or preparing for inspection?

Button:

Request Deck Consultation

This should link to the contact page.

-------------------------------------

PART 6 — IMPROVE TOOL UX

Add these improvements:

Visual progress bar for the step-by-step form

Clear step navigation

Mobile-friendly layout

Helpful tooltips for technical inputs

Example tooltip:

"Elevated decks typically require additional structural review."

-------------------------------------

PART 7 — SEO SUPPORT

Add a FAQ section below the tool with questions such as:

Do decks require permits in Florida?

Do pergolas require permits?

How high can a deck be without permit?

What inspections are required for decks?

Add structured FAQ schema to support search engine visibility.

-------------------------------------

PART 8 — ARCHITECTURE IMPROVEMENTS

Create a separate rules file for permit logic.

Example file:

permitRules.ts

This file should contain simple rule structures so the tool can be expanded later with more jurisdictions.

Avoid hardcoding all rules inside the component.

-------------------------------------

PART 9 — INTERNAL LINKING

Add links from the tool results to related tools:

Deck Cost Estimator

Violation Code Decoder

Deck Repair Cost Estimator

-------------------------------------

PART 10 — DATA EXPANDABILITY

Design the tool so new cities and permit rules can easily be added in the future.

The tool should not depend on a single hardcoded dataset.

-------------------------------------

Ensure the tool remains educational and clearly states that final permit requirements should always be confirmed with the local building department.

&nbsp;