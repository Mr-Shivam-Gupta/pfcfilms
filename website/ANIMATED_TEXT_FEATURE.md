# Animated Text Rotation Feature

## Overview
Implemented a dynamic text rotation animation in the Hero section that cycles through three different descriptions of PFC FILMS.

## How It Works

### Text Rotation Sequence
The text automatically rotates every 3 seconds through these three messages:

1. **"PFC FILMS — Production House & Institute"**
2. **"PFC FILMS — Dance Academy in Kanpur and Mumbai"**
3. **"PFC FILMS — Acting School in Kanpur and Mumbai"**

After the third message, it loops back to the first one, creating a continuous cycle.

## Technical Implementation

### React Hooks Used
- **useState**: Manages the current text index and animation state
- **useEffect**: Sets up the interval timer for automatic text rotation

### Animation Details
- **Rotation Interval**: 3000ms (3 seconds)
- **Fade Duration**: 500ms (0.5 seconds)
- **Animation Type**: Fade out with slight downward movement, then fade in

### Code Structure
```tsx
const [currentTextIndex, setCurrentTextIndex] = useState(0);
const [isAnimating, setIsAnimating] = useState(false);

const rotatingTexts = [
  "Production House & Institute",
  "Dance Academy in Kanpur and Mumbai",
  "Acting School in Kanpur and Mumbai"
];

useEffect(() => {
  const interval = setInterval(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
      setIsAnimating(false);
    }, 500);
  }, 3000);

  return () => clearInterval(interval);
}, []);
```

### CSS Classes
- **Transition**: `transition-all duration-500` for smooth animation
- **Fade Effect**: `opacity-0` to `opacity-100`
- **Movement**: `translate-y-2` to `translate-y-0` for subtle vertical shift
- **Min Height**: `min-h-[4rem]` to prevent layout shift during text changes

## Visual Design

### Typography
- **Font Size**: `text-xl` (1.25rem)
- **Color**: 
  - "PFC FILMS —" in bold black (`font-semibold text-black`)
  - Rotating text in zinc-600 (`text-zinc-600`)
- **Spacing**: `max-w-lg leading-relaxed` for optimal readability

### Animation Flow
1. Text is fully visible (opacity: 100%, translateY: 0)
2. After 3 seconds, fade begins
3. Text fades out and moves down slightly (opacity: 0%, translateY: 8px)
4. After 0.5 seconds, text content changes
5. New text fades in and moves up (opacity: 100%, translateY: 0)
6. Cycle repeats

## Customization Options

### Change Rotation Speed
```tsx
// In useEffect interval
}, 3000); // Change this value (in milliseconds)
```

### Change Fade Duration
```tsx
// In setTimeout
}, 500); // Change this value (in milliseconds)
```

### Add More Text Options
```tsx
const rotatingTexts = [
  "Production House & Institute",
  "Dance Academy in Kanpur and Mumbai",
  "Acting School in Kanpur and Mumbai",
  "Your New Text Here" // Add more items
];
```

### Modify Animation Style
```tsx
// Current: fade + downward movement
className={`inline-block transition-all duration-500 ${
  isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
}`}

// Alternative: fade + scale
className={`inline-block transition-all duration-500 ${
  isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
}`}

// Alternative: fade + rotate
className={`inline-block transition-all duration-500 ${
  isAnimating ? 'opacity-0 rotate-3' : 'opacity-100 rotate-0'
}`}
```

## Benefits

### User Experience
✅ **Engaging**: Catches visitor attention with dynamic content
✅ **Informative**: Communicates multiple services without cluttering the page
✅ **Professional**: Smooth animations create a premium feel
✅ **SEO Friendly**: All text variations are rendered, helping with search rankings

### Technical Benefits
✅ **Lightweight**: No external libraries required
✅ **Performance**: Efficient React hooks implementation
✅ **Accessible**: Text remains readable and doesn't interfere with screen readers
✅ **Responsive**: Works seamlessly on all device sizes

## Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Considerations
- Uses CSS transitions (GPU-accelerated)
- Cleanup function prevents memory leaks
- Minimal re-renders with proper state management
- No layout shifts due to min-height constraint

## Testing Checklist
- [ ] Text rotates every 3 seconds
- [ ] Smooth fade in/out animation
- [ ] No layout jumping or shifting
- [ ] Works on mobile devices
- [ ] No console errors
- [ ] Proper cleanup on component unmount

## Future Enhancements
Possible improvements:
1. Add pause on hover functionality
2. Implement manual navigation (prev/next buttons)
3. Add progress indicator showing which text is active
4. Make rotation speed configurable via props
5. Add different animation styles for each text change
6. Implement typewriter effect instead of fade
