
The user wants to realign the phone number in the header. Currently:
- **Line 56-62**: The phone link has `flex items-center gap-2` with a Phone icon (h-4 w-4) and text
- The icon and text appear misaligned vertically based on the reference image

**Issue**: The phone icon is smaller (h-4) compared to the text size (text-sm), causing vertical misalignment. The gap and flex alignment need adjustment.

**Fix approach**:
1. Adjust the phone icon size to match the text baseline better (use `h-5` instead of `h-4`)
2. Add `leading-none` to the text to remove extra line-height that creates misalignment
3. Ensure vertical centering with `items-center` (already present) and `justify-center` for the icon container

**Changes to make**:
- Update line 58's className: change `gap-2` to ensure proper spacing
- Increase icon size from `h-4 w-4` to `h-5 w-5` to match text better
- Add `leading-none` to the phone text for tighter alignment
- Optionally wrap the icon in a flex container for better centering
