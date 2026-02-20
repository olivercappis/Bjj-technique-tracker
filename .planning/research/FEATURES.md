# Feature Landscape: BJJ Game Plan Flowchart Visualization

**Domain:** Interactive technique flowchart / game plan builder for Brazilian Jiu-Jitsu
**Researched:** 2026-02-16
**Confidence:** MEDIUM (based on training data analysis of BJJ apps, graph visualization tools, and sports planning software)

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Drag-to-rearrange nodes** | Standard graph UX — users expect to organize spatial layout | Low | Already supported via React Flow, needs onNodeDragStop handler (implemented) |
| **Pan and zoom canvas** | Essential for large graphs — users need to navigate complex flowcharts | Low | React Flow provides this out-of-box |
| **Visual distinction between node types** | Positions vs techniques must be immediately recognizable | Low | Color coding, shape, or size differences |
| **Edges show directionality** | Users need to see flow direction (arrows on edges) | Low | React Flow MarkerType.ArrowClosed (implemented) |
| **Add techniques to plan from browse/search** | Core interaction — users build plans while exploring library | Medium | Requires "Add to Plan" button on technique pages (mentioned as existing) |
| **Remove techniques from plan** | Cleanup is essential — users need to prune/refine their plans | Low | Delete button on nodes or list view |
| **Persistent storage** | Plans must survive page refreshes | Low | Zustand persist middleware already implemented |
| **Empty state guidance** | First-time users need direction when plan is empty | Low | "Browse techniques to add to your plan" messaging |
| **Multiple game plans** | Users have different strategies (gi vs no-gi, competition vs training, top vs bottom game) | Medium | Store supports this; needs UI for create/switch/delete |
| **Node click → technique details** | Users need to review what each node represents | Medium | Click handler opens technique detail modal or navigates to technique page |
| **Visual feedback for technique types** | Submissions, sweeps, escapes must be visually distinct at a glance | Low | Color coding by type (already planned) |
| **List view fallback** | Mobile users and accessibility — not everyone can parse flowcharts easily | Medium | Implemented as tabbed view alongside flowchart |
| **Auto-layout on initial render** | Users shouldn't manually position 20+ nodes from scratch | Medium | Dagre layout implemented for hierarchical arrangement |

## Differentiators

Features that set product apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Technique nodes separate from position nodes** | Shows granular technique chains, not just position transitions — competitive advantage over position-only flowcharts | High | Current graph builder nests techniques; requires architectural rework |
| **Submissions styled as "finish" endpoints** | Clear visual goal markers — users see where their attacks terminate | Low | Distinct node styling (e.g., different shape, color, no outbound edges) |
| **Sweep/transition chaining to resulting positions** | Shows realistic flow through positions via specific techniques — not generic transitions | Medium | Graph builder must create edges from technique node → resulting position |
| **Multiple entry points / forest graph** | Handles reality of BJJ: you don't always start from one position | Medium | Graph builder already handles this by creating nodes for all referenced positions |
| **Mini-map for large graphs** | Navigation aid for complex plans with 10+ positions | Low | React Flow MiniMap component (implemented) |
| **Zoom to fit** | Quick reset after zooming/panning | Low | React Flow fitView (implemented) |
| **Highlighting connected subgraphs on hover** | Shows "if I'm here, where can I go?" — educational value | Medium | onNodeMouseEnter → highlight connected edges/nodes |
| **Inline technique preview on edge hover** | Quickly review technique without clicking — reduces navigation | Medium | Custom edge component with tooltip showing technique steps/description |
| **Export graph as image** | Share plans with coach/training partners without requiring app access | Medium | Use html2canvas or React Flow's built-in screenshot API |
| **Count of techniques per position** | Badge on position nodes showing how many techniques branch from it | Low | Calculate in graph builder, render as badge overlay |
| **Breadth vs depth visualization** | Users see if they're specialists (deep on few positions) or generalists (shallow on many) | Medium | Visual density indicators or graph metrics panel |
| **Quick add from flowchart** | "+ Add technique" button on position nodes to add more techniques from that position without navigating away | High | Requires embedded technique picker/dropdown on node |
| **Duplicate game plan** | Start new plan based on existing one (e.g., gi version of no-gi plan) | Low | Clone game plan with new ID and timestamp |
| **Tags/labels on game plans** | Categorize plans (Competition, Fundamentals, Experimental, Gi/No-Gi) | Low | Add tags field to GamePlan type, filter UI |
| **Version history / undo** | Recover from accidental deletions or track how plan evolved | High | Requires state snapshots and time-travel functionality |
| **Shortest path highlighting** | "Show me how to get from Guard to Mount" — pathfinding visualization | Medium | Graph traversal algorithm + visual overlay |
| **Custom node colors/styling** | Personal organization — users assign colors to favorite positions or techniques | Medium | Node metadata + color picker UI |
| **Collapse/expand position nodes** | Hide technique details to see high-level position flow, expand to see specifics | High | Requires parent-child node groups in React Flow |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Automatic technique recommendations** | Presumptuous and skill-level dependent — BJJ is too context-specific | Let users browse and choose; provide filtering/search |
| **Pre-built "best" game plans** | Everyone's game is different; this would be misleading | Offer empty plans and comprehensive technique library |
| **Video embedding in flowchart nodes** | Visual clutter, performance issues, scope creep | Link to external video resources from technique detail pages |
| **Real-time multiplayer editing** | Adds complexity, requires backend infrastructure, unclear value for personal game plans | Defer to future milestone with auth/sync |
| **AI-generated technique descriptions** | Quality control nightmare, potential misinformation in martial arts | Curate accurate technique data manually |
| **Gamification (points, streaks, achievements)** | Game plans are strategic tools, not toys — this undermines seriousness | Focus on utility and clarity |
| **Social feed / community posts** | Social features require moderation, backend, auth — scope creep | Save for future milestone post-auth |
| **In-app technique creation** | Data quality concern — need vetting/curation | Keep technique library static/curated for now |
| **Performance tracking** | Requires integration with mat time data — different product category | Focus on planning, not tracking outcomes |
| **Opponent scouting features** | Niche use case, data privacy concerns | Separate tool if needed |
| **Mobile drag-and-drop editing** | Touch gestures conflict with pan/zoom — poor UX on small screens | Provide list view for mobile; flowchart read-only or desktop-only editing |

## Feature Dependencies

```
Core Graph Rendering
  ├─> Position nodes as separate entities
  ├─> Technique nodes as separate entities
  │     └─> Technique type color coding
  │           ├─> Submissions styled as endpoints
  │           └─> Edges from techniques to resulting positions
  └─> Auto-layout (Dagre)
        └─> Persistent node positions after manual adjustment

Multi-Plan Management
  ├─> Create new plan
  ├─> Switch between plans
  ├─> Rename plan
  └─> Delete plan
        └─> Confirmation dialog (prevent accidental loss)

Interactive Features
  ├─> Click node → show details
  ├─> Hover edge → preview technique
  ├─> Hover node → highlight connections (depends on graph rendering)
  └─> Remove technique from plan
        └─> Update graph (re-render with technique removed)

Export Features
  └─> Requires complete graph rendering first

Advanced Visualizations (deferred)
  ├─> Collapse/expand (requires parent-child grouping)
  └─> Path highlighting (requires graph traversal logic)
```

## MVP Recommendation

### Must Have (Critical Path)
1. **Rework graph builder**: Positions and techniques as separate nodes
2. **Technique type visual distinction**: Color-coded edges or nodes by type (submission/sweep/escape/etc.)
3. **Submission endpoint styling**: Make submissions visually distinct as terminal nodes
4. **Sweep/transition chaining**: Edges from technique → resulting position
5. **Multi-plan UI**: Create, switch, rename, delete game plans
6. **Remove technique**: Delete button in list view and flowchart
7. **Click node → details**: Modal or side panel showing technique/position info

### Should Have (High Value, Lower Risk)
8. **Mini-map**: Already implemented, ensure visible and functional
9. **Technique count badges**: Show number of techniques on position nodes
10. **Export as image**: Share plans easily
11. **Hover edge → preview**: Tooltip with technique name/type
12. **Empty state**: Guidance for new users

### Nice to Have (Defer to Later Iterations)
13. **Highlight connections on hover**: Visual aid for understanding flow
14. **Duplicate game plan**: Quality-of-life feature
15. **Game plan tags/labels**: Organization for power users
16. **Quick add from flowchart**: Convenience feature, high complexity

### Explicitly Defer
- Version history / undo (complex state management)
- Collapse/expand nodes (requires React Flow parent-child architecture)
- Shortest path highlighting (advanced feature, unclear demand)
- Custom node colors (personalization, low priority)
- Any social/sharing/collaboration features (requires auth milestone)

## Domain-Specific Considerations

### BJJ Flow Logic
- **Positions can recur**: Closed Guard → Sweep → Mount → Opponent escapes → Back to Closed Guard is valid
- **Multiple paths to same position**: Graph may have cycles; layout must handle this
- **Submissions don't chain**: They're terminal states (tap/finish)
- **Transitions vs Sweeps**: Both change position, but sweeps specifically reverse top/bottom
- **Escapes may or may not specify destination**: Some escape "to standing", others "to Guard" — handle missing `resultingPositionId`

### Graph Layout Challenges
- **Hierarchical layout (TB) works for linear flows**: Good for basic game plans
- **Circular/cyclic graphs**: Consider radial or force-directed layout for complex plans
- **User manual adjustments must persist**: Save node positions to prevent re-layout destroying user organization
- **Mobile viewport constraints**: Flowchart needs minimum 600x400px; list view is primary mobile experience

### User Mental Models
- **Positions are nouns, techniques are verbs**: "From Mount (noun), I Armbar (verb) to Finish"
- **Game plan = decision tree**: "If I get here, I do this, which leads to there"
- **Visual density indicates specialization**: Lots of techniques from one position = your game centers there

## Competitive Landscape Insights

Based on analysis of existing BJJ and sports planning tools:

### What Competitors Do Well
- **BJJ Fanatics / Grappler's Guide**: Excellent technique libraries, but no personalized flowchart visualization
- **Mind map tools (MindMeister, Coggle)**: Great flowchart UX, but not domain-specific to BJJ
- **Digitsu**: Technique database with tagging, but static content — no user-created plans
- **Chess opening trainers (Chessable, Lichess)**: Interactive move trees, analogous to technique chains — good UX reference

### What's Missing in the Market
- **Visual game plan builders specific to BJJ**: Existing tools are either generic mind maps (no BJJ semantics) or static technique libraries (no personalization)
- **Technique-level granularity in flowcharts**: Most BJJ game planning is verbal or position-only diagrams
- **Persistent, shareable game plans**: Coaches and students lack collaborative planning tools

### This Product's Niche
- **Bridge the gap**: Combine BJJ domain knowledge (technique types, position relationships, resulting positions) with interactive flowchart UX
- **Competitive advantage**: Separate technique nodes with type-based visual encoding and automatic chaining to resulting positions
- **Future moat**: With auth, becomes a platform for coaches to share curated game plans with students

## Sources

**Confidence Note:** This research is based on training data analysis (knowledge cutoff January 2025) of:
- BJJ instructional platforms (BJJ Fanatics, Grappler's Guide, Digitsu)
- Graph visualization libraries (React Flow, Cytoscape, D3 force graphs)
- Sports training planning tools (TrainingPeaks, Notion templates)
- Mind mapping and flowchart applications (Miro, Lucidchart, Coggle)

**Verification needed:**
- Current state of BJJ app market (2026) — web search blocked
- React Flow 12 best practices (2026 docs) — Context7 access not available
- User research on BJJ practitioners' planning workflows — no primary research conducted

**Recommendation:** Validate table stakes features with target users (BJJ practitioners) before committing to differentiator feature development. The separation of technique nodes from position nodes is architecturally significant and should be prototyped early to validate UX before full implementation.
