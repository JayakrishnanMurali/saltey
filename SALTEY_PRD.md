# Saltey - Water Sort Puzzle Game PRD

## Project Overview
Saltey is a web-based water sort puzzle game that replicates the popular water sorting mechanics found in mobile games. Players pour colored water between tubes to sort colors into individual containers.

## MVP Phase (Immediate Development)

### Core Game Mechanics
- **Water Physics**: Realistic water pouring animation between tubes
- **Color Sorting**: Sort colored liquids into separate tubes
- **Tube Management**: Click/tap to select source tube, click destination to pour
- **Winning Condition**: All tubes contain single colors or are empty
- **Undo Functionality**: Allow players to undo last move

### Technical Requirements - MVP
- **Mobile-First Design**: Responsive layout optimized for touch devices
- **Smooth Animations**: 60fps animations for water pouring and interactions
- **State Management**: Game state, moves, undo stack
- **Local Storage**: Save game progress locally

### UI/UX - MVP
- Clean, minimalist design with focus on game area
- Large, touch-friendly tube interactions
- Visual feedback for valid/invalid moves
- Simple color palette for water colors
- Responsive design (320px to 1200px+)

### MVP Game Features
- **Single Level**: One difficulty level with 4-6 tubes
- **Basic Scoring**: Move counter (lower is better)
- **Reset Game**: Start over functionality
- **Visual Polish**: Smooth pour animations, color mixing effects

## Future Phases (Post-MVP)

### Phase 2: Level System
- **Progressive Difficulty**: 
  - Easy: 4 tubes, 3 colors
  - Medium: 6 tubes, 4 colors  
  - Hard: 8 tubes, 5+ colors
- **Level Unlock System**: Complete levels to unlock next
- **Star Rating**: 1-3 stars based on moves/time
- **Level Selection**: Grid view of available levels

### Phase 3: Advanced Mechanics
- **New Variables**:
  - Tube capacity variations
  - Obstacles (blocked tubes)
  - Time-limited levels
  - Ice/frozen layers
  - Mixed color starting positions
- **Power-ups**: Extra moves, color hints, undo boost

### Phase 4: User System & Progression
- **User Profiles**: Registration, login, profile management
- **Progress Tracking**: Level completion, best scores, statistics
- **Achievements**: Various gameplay milestones
- **Leaderboards**: Global and friend comparisons

### Phase 5: Enhanced Features
- **Daily Challenges**: Special puzzles with unique rewards
- **Themes**: Different visual themes (ocean, space, candy)
- **Sound Design**: Audio feedback and ambient sounds
- **Offline Mode**: Play without internet connection

## Technical Architecture

### Current Stack Analysis
- ✅ **Next.js 15**: App router, server components
- ✅ **Tailwind CSS**: Utility-first styling
- ✅ **TypeScript**: Type safety
- ✅ **Shadcn/ui**: Component library foundation

### Recommended Additions for MVP
- **Zustand**: State management for game state
- **Framer Motion**: Smooth animations and transitions
- **React Spring**: Physics-based animations for water
- **Canvas/SVG**: Custom drawing for water effects

### State Management Structure
```typescript
interface GameState {
  tubes: Tube[]
  selectedTube: number | null
  moveHistory: Move[]
  isComplete: boolean
  score: { moves: number, time: number }
}

interface Tube {
  id: string
  capacity: number
  colors: Color[]
}
```

### Animation Requirements
- Water pouring: 300-500ms fluid animation
- Tube selection: Hover/active states with smooth transitions
- Color mixing: Gradient transitions between colors
- Victory animation: Celebration effects

## User Experience Flow - MVP

1. **Game Load**: Show game board with pre-filled tubes
2. **Tube Selection**: Tap tube to select (visual highlight)
3. **Pour Action**: Tap destination tube to pour water
4. **Visual Feedback**: Smooth animation of water transfer
5. **Win State**: All colors sorted, show victory screen
6. **Reset/New Game**: Return to initial state

## Success Metrics - MVP

### Technical Performance
- Page load time: < 2 seconds
- Animation framerate: 60fps
- Mobile responsiveness: 100% across devices
- Touch interaction latency: < 100ms

### User Engagement
- Session length: > 5 minutes average
- Game completion rate: > 30%
- Return rate: > 40% within 24 hours

## Development Timeline - MVP

### Week 1: Core Setup
- [ ] Set up Zustand store structure
- [ ] Create basic Tube and GameBoard components
- [ ] Implement click/touch interaction system

### Week 2: Game Logic
- [ ] Water pouring logic and validation
- [ ] Win condition detection
- [ ] Undo functionality
- [ ] Move counting

### Week 3: Animations & Polish
- [ ] Water pouring animations
- [ ] Tube interaction feedback
- [ ] Victory animations
- [ ] Mobile optimization

### Week 4: Testing & Refinement
- [ ] Cross-device testing
- [ ] Performance optimization
- [ ] Bug fixes and polish
- [ ] Deploy MVP

## Risk Mitigation

### Technical Risks
- **Animation Performance**: Use CSS transforms, avoid DOM manipulation
- **Mobile Touch Issues**: Implement proper touch event handling
- **Browser Compatibility**: Test across major browsers

### User Experience Risks
- **Learning Curve**: Include subtle tutorial hints
- **Difficulty Spike**: Start with very simple levels
- **Engagement**: Focus on satisfying animations and feedback

## Future Considerations

### Monetization (Post-MVP)
- Premium levels/themes
- Remove ads option
- Power-up purchases

### Scalability
- Database design for user progress (Supabase)
- Level editor for community content
- Social features and sharing

### Analytics Integration
- User behavior tracking
- Level difficulty analysis
- Performance monitoring

---

*This PRD focuses on delivering a high-quality, engaging MVP that establishes core gameplay mechanics and smooth user experience. Future phases will build upon this foundation to create a comprehensive puzzle game platform.*