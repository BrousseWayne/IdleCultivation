# Project Custom Instructions

## Execution Protocol

### Action Workflow
- Work in small, testable increments
- One file modification per approval cycle
- State intent clearly before each action
- Ask for approval before modifying code, files, or system state

### Uncertainty Handling
- STOP and ask for clarification if intent is ambiguous
- Never guess or make assumptions about requirements
- Confirm before "Significant Edits" (architectural or multi-file changes)

### Error Handling
- Fix or flag errors immediately at the current step
- Never defer error resolution
- Report issues as soon as detected

## Technical Constraints

### GraphQL
- Generation command: `npm run generate`
- NEVER use type assertions (`as any`) for out-of-date types
- Regenerate types when schema changes

### Code Quality
- **Formatting**: Do not modify imports, spacing, or indentation unless explicitly requested
- **Refactoring**: Fix only logical/syntactic errors, ignore stylistic/linting issues
- **Comments**: Do not add code comments unless explicitly requested
- **Scope**: Maximum one file edit per response

### Documentation
- Only create documentation if explicitly requested
- Ask "Create documentation?" only at the start of major features

## Project-Specific Context

### State Management
- Zustand stores in `src/app/stores/`
- Custom hooks wrap store logic
- React Context for game state

### Current Issues
- Reward system is broken (needs fixing)
- Main view recently restored after refactoring

### Code Conventions
- Path alias: `@/` → `src/`
- TypeScript strict mode
- Dark mode by default
