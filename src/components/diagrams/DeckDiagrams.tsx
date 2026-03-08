// Technical SVG diagrams for deck construction education
// Each diagram is a self-contained React component

interface DiagramProps {
  className?: string;
}

export function LedgerBoardDiagram({ className = "" }: DiagramProps) {
  return (
    <svg viewBox="0 0 500 350" className={`w-full ${className}`} aria-label="Ledger board attachment diagram">
      {/* House wall */}
      <rect x="20" y="20" width="80" height="310" fill="hsl(40,15%,88%)" stroke="hsl(200,18%,16%)" strokeWidth="2" />
      <text x="60" y="175" textAnchor="middle" className="fill-foreground text-xs font-semibold" fontSize="11">HOUSE</text>
      <text x="60" y="190" textAnchor="middle" className="fill-muted-foreground text-xs" fontSize="9">WALL</text>

      {/* Band/rim joist */}
      <rect x="100" y="100" width="30" height="80" fill="hsl(30,40%,65%)" stroke="hsl(200,18%,16%)" strokeWidth="1.5" />
      <text x="115" y="145" textAnchor="middle" className="fill-foreground" fontSize="8" fontWeight="600">RIM</text>
      <text x="115" y="155" textAnchor="middle" className="fill-foreground" fontSize="8" fontWeight="600">JOIST</text>

      {/* Ledger board */}
      <rect x="130" y="110" width="30" height="70" fill="hsl(30,50%,50%)" stroke="hsl(200,18%,16%)" strokeWidth="1.5" />
      <text x="145" y="150" textAnchor="middle" className="fill-primary-foreground" fontSize="8" fontWeight="700">LEDGER</text>

      {/* Lag bolts */}
      {[125, 145, 165].map((y, i) => (
        <g key={i}>
          <line x1="95" y1={y} x2="165" y2={y} stroke="hsl(200,18%,30%)" strokeWidth="3" />
          <circle cx="165" cy={y} r="4" fill="hsl(200,18%,30%)" />
          <circle cx="95" cy={y} r="3" fill="hsl(200,18%,40%)" />
        </g>
      ))}

      {/* Flashing */}
      <path d="M 95 98 L 165 98 L 165 105 L 130 108 L 95 105 Z" fill="hsl(200,50%,60%)" stroke="hsl(200,18%,16%)" strokeWidth="1" opacity="0.8" />

      {/* Joists */}
      {[120, 145, 170].map((y, i) => (
        <rect key={i} x="160" y={y-5} width="200" height="10" fill="hsl(30,35%,60%)" stroke="hsl(200,18%,16%)" strokeWidth="1" />
      ))}

      {/* Deck boards */}
      <rect x="155" y="100" width="220" height="8" fill="hsl(30,45%,55%)" stroke="hsl(200,18%,16%)" strokeWidth="1" rx="1" />

      {/* Annotations */}
      <line x1="180" y1="98" x2="180" y2="60" stroke="hsl(152,38%,28%)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="185" y="55" className="fill-primary" fontSize="10" fontWeight="600">Flashing (metal drip edge)</text>

      <line x1="145" y1="185" x2="145" y2="230" stroke="hsl(152,38%,28%)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="150" y="225" className="fill-primary" fontSize="10" fontWeight="600">½" lag bolts @ 16" O.C.</text>

      <line x1="300" y1="104" x2="300" y2="75" stroke="hsl(152,38%,28%)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="305" y="72" className="fill-primary" fontSize="10" fontWeight="600">Deck boards</text>

      <line x1="350" y1="145" x2="400" y2="200" stroke="hsl(152,38%,28%)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="330" y="215" className="fill-primary" fontSize="10" fontWeight="600">Joists @ 16" O.C.</text>

      {/* Code reference */}
      <rect x="20" y="270" width="460" height="60" fill="hsl(152,38%,28%)" rx="6" opacity="0.1" />
      <text x="250" y="292" textAnchor="middle" className="fill-foreground" fontSize="11" fontWeight="700">FBC R507.2 — Ledger Board Connection</text>
      <text x="250" y="310" textAnchor="middle" className="fill-muted-foreground" fontSize="10">½" lag screws or through-bolts at 16" on center. Proper flashing required.</text>
      <text x="250" y="322" textAnchor="middle" className="fill-muted-foreground" fontSize="10">#1 cause of deck failures in Florida</text>
    </svg>
  );
}

export function JoistSpacingDiagram({ className = "" }: DiagramProps) {
  return (
    <svg viewBox="0 0 500 320" className={`w-full ${className}`} aria-label="Joist spacing diagram">
      {/* Beam */}
      <rect x="30" y="220" width="440" height="20" fill="hsl(30,40%,50%)" stroke="hsl(200,18%,16%)" strokeWidth="1.5" />
      <text x="250" y="235" textAnchor="middle" className="fill-primary-foreground" fontSize="10" fontWeight="700">BEAM</text>

      {/* Joists */}
      {[60, 130, 200, 270, 340, 410].map((x, i) => (
        <g key={i}>
          <rect x={x} y="60" width="12" height="160" fill="hsl(30,35%,60%)" stroke="hsl(200,18%,16%)" strokeWidth="1" />
          {i < 5 && (
            <>
              <line x1={x+12} y1="250" x2={x+70} y2="250" stroke="hsl(152,38%,28%)" strokeWidth="1.5" markerEnd="url(#arrowhead)" markerStart="url(#arrowstart)" />
              <text x={x+41} y="265" textAnchor="middle" className="fill-primary" fontSize="9" fontWeight="600">16"</text>
            </>
          )}
        </g>
      ))}

      {/* Deck boards across top */}
      {[55, 68, 81, 94].map((y, i) => (
        <rect key={i} x="55" y={y-8} width="370" height="6" fill="hsl(30,45%,55%)" stroke="hsl(200,18%,16%)" strokeWidth="0.5" rx="1" />
      ))}

      {/* Arrow markers */}
      <defs>
        <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="hsl(152,38%,28%)" />
        </marker>
        <marker id="arrowstart" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
          <polygon points="8 0, 0 3, 8 6" fill="hsl(152,38%,28%)" />
        </marker>
      </defs>

      {/* Joist hanger detail */}
      {[60, 130, 200, 270, 340, 410].map((x, i) => (
        <path key={i} d={`M ${x-2} 218 L ${x-2} 210 L ${x+14} 210 L ${x+14} 218`} fill="none" stroke="hsl(200,18%,40%)" strokeWidth="2" />
      ))}

      {/* Labels */}
      <text x="250" y="30" textAnchor="middle" className="fill-foreground" fontSize="13" fontWeight="700">Standard Joist Spacing — 16" On Center</text>

      {/* Info box */}
      <rect x="30" y="275" width="440" height="40" fill="hsl(152,38%,28%)" rx="6" opacity="0.1" />
      <text x="250" y="293" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">Wood: 16" O.C. (standard) or 12" O.C. (diagonal boards)</text>
      <text x="250" y="307" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Composite: Follow manufacturer specs — typically 12"–16" O.C. for deck, 12" for stairs</text>
    </svg>
  );
}

export function RailingHeightDiagram({ className = "" }: DiagramProps) {
  return (
    <svg viewBox="0 0 500 380" className={`w-full ${className}`} aria-label="Railing height and baluster spacing diagram">
      {/* Ground */}
      <rect x="0" y="320" width="500" height="60" fill="hsl(30,20%,75%)" />
      <text x="60" y="350" className="fill-muted-foreground" fontSize="10">GRADE</text>

      {/* Deck surface */}
      <rect x="120" y="160" width="350" height="12" fill="hsl(30,45%,55%)" stroke="hsl(200,18%,16%)" strokeWidth="1.5" rx="1" />

      {/* Posts */}
      {[140, 300, 450].map((x) => (
        <rect key={x} x={x-6} y="80" width="12" height="240" fill="hsl(30,35%,50%)" stroke="hsl(200,18%,16%)" strokeWidth="1" />
      ))}

      {/* Top rail */}
      <rect x="130" y="80" width="330" height="8" fill="hsl(30,40%,55%)" stroke="hsl(200,18%,16%)" strokeWidth="1" rx="2" />

      {/* Balusters between posts */}
      {[160, 175, 190, 205, 220, 235, 250, 265, 280].map((x) => (
        <rect key={x} x={x} y="88" width="4" height="72" fill="hsl(30,30%,65%)" stroke="hsl(200,18%,16%)" strokeWidth="0.5" />
      ))}
      {[320, 335, 350, 365, 380, 395, 410, 425, 440].map((x) => (
        <rect key={x} x={x} y="88" width="4" height="72" fill="hsl(30,30%,65%)" stroke="hsl(200,18%,16%)" strokeWidth="0.5" />
      ))}

      {/* 36" height measurement */}
      <line x1="115" y1="84" x2="115" y2="166" stroke="hsl(152,38%,28%)" strokeWidth="2" />
      <line x1="108" y1="84" x2="122" y2="84" stroke="hsl(152,38%,28%)" strokeWidth="2" />
      <line x1="108" y1="166" x2="122" y2="166" stroke="hsl(152,38%,28%)" strokeWidth="2" />
      <text x="108" y="130" textAnchor="middle" className="fill-primary" fontSize="12" fontWeight="700">36"</text>
      <text x="108" y="142" textAnchor="middle" className="fill-primary" fontSize="8">MIN</text>

      {/* 30" above grade measurement */}
      <line x1="480" y1="166" x2="480" y2="320" stroke="hsl(38,85%,55%)" strokeWidth="2" />
      <line x1="473" y1="166" x2="487" y2="166" stroke="hsl(38,85%,55%)" strokeWidth="2" />
      <line x1="473" y1="320" x2="487" y2="320" stroke="hsl(38,85%,55%)" strokeWidth="2" />
      <text x="490" y="245" className="fill-secondary" fontSize="10" fontWeight="700" writingMode="tb">30"+ requires railing</text>

      {/* 4" sphere test */}
      <circle cx="182" cy="124" r="11" fill="none" stroke="hsl(0,84%,60%)" strokeWidth="2" strokeDasharray="3,2" />
      <text x="182" y="128" textAnchor="middle" fill="hsl(0,84%,60%)" fontSize="8" fontWeight="700">4"</text>
      <line x1="182" y1="136" x2="182" y2="185" stroke="hsl(0,84%,60%)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="185" y="195" fill="hsl(0,84%,60%)" fontSize="9" fontWeight="600">4" sphere cannot pass</text>

      {/* Info box */}
      <rect x="120" y="210" width="340" height="55" fill="hsl(152,38%,28%)" rx="6" opacity="0.1" />
      <text x="290" y="228" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">Florida Residential Railing Code</text>
      <text x="290" y="242" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Min height: 36" residential / 42" commercial</text>
      <text x="290" y="254" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Baluster spacing: 4" sphere test / 200 lb top load</text>
    </svg>
  );
}

export function StairGeometryDiagram({ className = "" }: DiagramProps) {
  return (
    <svg viewBox="0 0 500 380" className={`w-full ${className}`} aria-label="Stair geometry and code requirements diagram">
      {/* Stair steps */}
      {[0, 1, 2, 3, 4].map((i) => {
        const x = 80 + i * 75;
        const y = 280 - i * 50;
        return (
          <g key={i}>
            {/* Tread */}
            <rect x={x} y={y} width="75" height="10" fill="hsl(30,45%,55%)" stroke="hsl(200,18%,16%)" strokeWidth="1.5" rx="1" />
            {/* Riser */}
            <rect x={x} y={y+10} width="10" height="40" fill="hsl(30,35%,60%)" stroke="hsl(200,18%,16%)" strokeWidth="1" />
          </g>
        );
      })}

      {/* Deck platform at top */}
      <rect x="380" y="70" width="100" height="12" fill="hsl(30,45%,50%)" stroke="hsl(200,18%,16%)" strokeWidth="1.5" rx="1" />
      <text x="430" y="65" textAnchor="middle" className="fill-muted-foreground" fontSize="9">DECK</text>

      {/* Stringer */}
      <line x1="85" y1="330" x2="385" y2="78" stroke="hsl(30,40%,45%)" strokeWidth="3" />

      {/* Riser measurement */}
      <line x1="55" y1="240" x2="55" y2="290" stroke="hsl(152,38%,28%)" strokeWidth="2" />
      <line x1="48" y1="240" x2="62" y2="240" stroke="hsl(152,38%,28%)" strokeWidth="2" />
      <line x1="48" y1="290" x2="62" y2="290" stroke="hsl(152,38%,28%)" strokeWidth="2" />
      <text x="40" y="270" textAnchor="middle" className="fill-primary" fontSize="11" fontWeight="700">7.75"</text>
      <text x="40" y="282" textAnchor="middle" className="fill-primary" fontSize="8">MAX</text>

      {/* Tread measurement */}
      <line x1="155" y1="300" x2="230" y2="300" stroke="hsl(38,85%,55%)" strokeWidth="2" />
      <line x1="155" y1="294" x2="155" y2="306" stroke="hsl(38,85%,55%)" strokeWidth="2" />
      <line x1="230" y1="294" x2="230" y2="306" stroke="hsl(38,85%,55%)" strokeWidth="2" />
      <text x="192" y="318" textAnchor="middle" className="fill-secondary" fontSize="11" fontWeight="700">10" MIN</text>
      <text x="192" y="330" textAnchor="middle" className="fill-muted-foreground" fontSize="8">Tread depth</text>

      {/* Handrail */}
      <line x1="70" y1="250" x2="370" y2="40" stroke="hsl(200,18%,35%)" strokeWidth="3" strokeLinecap="round" />

      {/* Handrail height */}
      <line x1="250" y1="140" x2="250" y2="187" stroke="hsl(152,38%,28%)" strokeWidth="1.5" strokeDasharray="3,3" />
      <text x="260" y="168" className="fill-primary" fontSize="9" fontWeight="600">34"–38"</text>

      {/* Width annotation */}
      <text x="250" y="355" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">Min width: 36" between stringers</text>

      {/* Info box */}
      <rect x="20" y="340" width="460" height="35" fill="hsl(152,38%,28%)" rx="6" opacity="0.1" />
      <text x="250" y="358" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">FBC R311.7 — Max riser 7.75" / Min tread 10" / Uniform within 3/8"</text>
      <text x="250" y="370" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Handrail required on stairs with 4+ risers</text>
    </svg>
  );
}

export function HurricaneConnectorDiagram({ className = "" }: DiagramProps) {
  return (
    <svg viewBox="0 0 500 400" className={`w-full ${className}`} aria-label="Hurricane connector continuous load path diagram">
      {/* Title */}
      <text x="250" y="25" textAnchor="middle" className="fill-foreground" fontSize="14" fontWeight="700">Continuous Load Path</text>
      <text x="250" y="40" textAnchor="middle" className="fill-muted-foreground" fontSize="10">Every connection resists wind uplift</text>

      {/* Deck board */}
      <rect x="60" y="60" width="380" height="12" fill="hsl(30,45%,55%)" stroke="hsl(200,18%,16%)" strokeWidth="1" rx="1" />
      <text x="250" y="55" textAnchor="middle" className="fill-muted-foreground" fontSize="9">DECK BOARDS</text>

      {/* Screws into joists */}
      {[120, 180, 240, 300, 360].map((x) => (
        <line key={x} x1={x} y1="72" x2={x} y2="82" stroke="hsl(200,18%,30%)" strokeWidth="2" />
      ))}

      {/* Joists */}
      {[100, 180, 260, 340].map((x, i) => (
        <rect key={i} x={x} y="80" width="12" height="60" fill="hsl(30,35%,60%)" stroke="hsl(200,18%,16%)" strokeWidth="1" />
      ))}
      <text x="420" y="115" className="fill-muted-foreground" fontSize="9">JOISTS</text>

      {/* Hurricane ties at joist-to-beam */}
      {[100, 180, 260, 340].map((x, i) => (
        <g key={i}>
          <path d={`M ${x-3} 138 L ${x-3} 148 L ${x+15} 148 L ${x+15} 138`} fill="none" stroke="hsl(0,84%,50%)" strokeWidth="2.5" />
          <circle cx={x+1} cy="144" r="2" fill="hsl(0,84%,50%)" />
          <circle cx={x+11} cy="144" r="2" fill="hsl(0,84%,50%)" />
        </g>
      ))}

      {/* Beam */}
      <rect x="60" y="148" width="380" height="18" fill="hsl(30,40%,50%)" stroke="hsl(200,18%,16%)" strokeWidth="1.5" />
      <text x="250" y="161" textAnchor="middle" className="fill-primary-foreground" fontSize="10" fontWeight="700">BEAM</text>

      {/* Hurricane tie label */}
      <line x1="355" y1="143" x2="430" y2="135" stroke="hsl(0,84%,50%)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="435" y="133" fill="hsl(0,84%,50%)" fontSize="9" fontWeight="700">Hurricane Ties</text>
      <text x="435" y="143" fill="hsl(0,84%,50%)" fontSize="8">(Simpson H2.5A)</text>

      {/* Posts */}
      {[130, 310].map((x) => (
        <rect key={x} x={x} y="166" width="16" height="100" fill="hsl(30,35%,55%)" stroke="hsl(200,18%,16%)" strokeWidth="1" />
      ))}
      <text x="420" y="220" className="fill-muted-foreground" fontSize="9">POSTS</text>

      {/* Post-to-beam connectors */}
      {[130, 310].map((x) => (
        <g key={x}>
          <rect x={x-4} y="162" width="24" height="10" fill="hsl(200,18%,40%)" stroke="hsl(200,18%,16%)" strokeWidth="1" rx="1" />
        </g>
      ))}

      {/* Post-to-beam label */}
      <line x1="146" y1="167" x2="50" y2="200" stroke="hsl(152,38%,28%)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="20" y="198" className="fill-primary" fontSize="9" fontWeight="600">Post-beam</text>
      <text x="20" y="208" className="fill-primary" fontSize="9" fontWeight="600">connector</text>

      {/* Footings */}
      {[115, 295].map((x) => (
        <g key={x}>
          <rect x={x} y="266" width="46" height="50" fill="hsl(200,10%,75%)" stroke="hsl(200,18%,16%)" strokeWidth="1" rx="3" />
          <text x={x+23} y="295" textAnchor="middle" className="fill-muted-foreground" fontSize="8">FOOTING</text>
        </g>
      ))}

      {/* Hold-down connectors */}
      {[130, 310].map((x) => (
        <g key={x}>
          <rect x={x-2} y="262" width="20" height="8" fill="hsl(38,85%,50%)" stroke="hsl(200,18%,16%)" strokeWidth="1" />
        </g>
      ))}

      {/* Hold-down label */}
      <line x1="328" y1="266" x2="400" y2="285" stroke="hsl(38,85%,55%)" strokeWidth="1" strokeDasharray="3,3" />
      <text x="405" y="283" className="fill-secondary" fontSize="9" fontWeight="700">Hold-down</text>
      <text x="405" y="293" className="fill-secondary" fontSize="8">(Simpson HD series)</text>

      {/* Ground */}
      <rect x="0" y="316" width="500" height="10" fill="hsl(30,20%,75%)" />

      {/* Uplift arrow */}
      <path d="M 250 50 L 250 35 L 240 35 L 250 20 L 260 35 L 250 35" fill="hsl(0,84%,50%)" opacity="0.6" />
      <text x="275" y="30" fill="hsl(0,84%,50%)" fontSize="9" fontWeight="600">WIND UPLIFT</text>

      {/* Info box */}
      <rect x="20" y="335" width="460" height="55" fill="hsl(152,38%,28%)" rx="6" opacity="0.1" />
      <text x="250" y="355" textAnchor="middle" className="fill-foreground" fontSize="10" fontWeight="600">Florida Wind Zone Compliance</text>
      <text x="250" y="368" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Every connection must resist uplift: board → joist → beam → post → footing</text>
      <text x="250" y="381" textAnchor="middle" className="fill-muted-foreground" fontSize="9">Design wind speeds: 110 mph (interior) to 185 mph (Miami-Dade coast)</text>
    </svg>
  );
}
