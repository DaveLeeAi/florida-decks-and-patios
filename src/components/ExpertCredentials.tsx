import { Shield } from "lucide-react";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const noaChecklist = [
  {
    component: "Decking Boards",
    standard: "Miami-Dade Approved",
    requirement: 'Must bear a permanent label with the manufacturer logo and "Miami-Dade County Product Control Approved" statement.',
  },
  {
    component: "Hardware",
    standard: "316-Grade Stainless",
    requirement: "Corrosion-resistant fasteners (e.g., #12 screws with integrated washers) must meet specific pull-out and uplift pressure ratings.",
  },
  {
    component: "Wind Load",
    standard: "175 MPH+ Rating",
    requirement: "Engineered assemblies must withstand negative Maximum Design Pressure (MDP) of at least -45 to -60.95 psf, depending on location.",
  },
  {
    component: "Engineering",
    standard: "Signed & Sealed",
    requirement: "All drawings must be digitally signed/sealed by a Florida Licensed Professional Engineer to confirm FBC 2026 compliance.",
  },
  {
    component: "Safety",
    standard: "TAS 114 Compliant",
    requirement: "Systems must pass TAS 114 Appendix J uplift testing to satisfy new 2026 code interpretations for composite substrates.",
  },
];

export default function ExpertCredentials() {
  return (
    <section className="mt-12 border-t-2 border-border pt-8">
      <div className="bg-card rounded-xl border border-border p-6 md:p-8">
        {/* Expert badge + heading */}
        <div className="flex items-center gap-5 mb-6">
          <div className="shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground font-bold text-center text-xs leading-tight">
            <span>
              FL DECK
              <br />
              EXPERT
            </span>
          </div>
          <div>
            <h4 className="font-heading text-lg font-bold text-foreground">
              Verified by Florida Deck and Patios Technical Division
            </h4>
            <p className="text-sm text-muted-foreground mt-1">
              <strong className="text-foreground">Credential Check:</strong> FL State Certified Building Contractor | 2026 HVHZ Compliance Certified | 316-Grade Marine Hardware Specialist.
            </p>
          </div>
        </div>

        {/* Trust block */}
        <div className="border-l-[3px] border-primary pl-4 mb-6">
          <p className="text-sm text-foreground/80 leading-relaxed mb-2">
            <strong>Why Trust This Data?</strong> This guide was compiled using 2026{" "}
            <strong>Florida Building Code (FBC)</strong> standards and{" "}
            <strong>Miami-Dade NOA</strong> (Notice of Acceptance) data. Our regional authority stems from 15+ years of specialized deck construction across the Gulf and Atlantic coasts, specifically addressing Florida's unique UV degradation and high-velocity wind loads.
          </p>
          <p className="text-xs text-muted-foreground italic">
            Last Technical Review: March 2026 | Reviewed by Lead Structural Specialist, Florida Deck and Patios.
          </p>
        </div>

        {/* NOA Checklist Table */}
        <div className="mb-6">
          <h5 className="font-heading text-base font-semibold text-foreground mb-3 flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            2026 Miami-Dade NOA Material Checklist
          </h5>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted">
                  <TableHead className="font-semibold text-foreground">Component</TableHead>
                  <TableHead className="font-semibold text-foreground">HVHZ Standard (2026)</TableHead>
                  <TableHead className="font-semibold text-foreground">Verified Authority Requirement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {noaChecklist.map((row) => (
                  <TableRow key={row.component}>
                    <TableCell className="font-medium text-foreground">{row.component}</TableCell>
                    <TableCell className="text-foreground/80">{row.standard}</TableCell>
                    <TableCell className="text-foreground/80 text-xs">{row.requirement}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Authority tags */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
            #GEO-Verified
          </Badge>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
            #FloridaAuthorityEngine
          </Badge>
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
            #2026BuildingCode
          </Badge>
        </div>
      </div>
    </section>
  );
}
