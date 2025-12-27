import { useState, useRef, useEffect } from 'react';
import { Badge } from './badge';
// import { Tag } from 'lucide-react';

const TagsWithOverflow = ({ tags, className = "" }) => {
  const [visibleTags, setVisibleTags] = useState(tags);
  const [hiddenCount, setHiddenCount] = useState(0);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const updateVisibleTags = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();
      setContainerWidth(containerRect.width);

      // Create a temporary container to measure tag widths
      const tempContainer = document.createElement('div');
      tempContainer.style.position = 'absolute';
      tempContainer.style.visibility = 'hidden';
      tempContainer.style.whiteSpace = 'nowrap';
      tempContainer.style.display = 'flex';
      tempContainer.style.gap = '8px';
      document.body.appendChild(tempContainer);

      let totalWidth = 0;
      let visibleCount = 0;
      const maxWidth = containerRect.width - 60; // Reserve space for "+X more" badge

      for (let i = 0; i < tags.length; i++) {
        const tempBadge = document.createElement('div');
        tempBadge.className =
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors';
        tempBadge.innerHTML = `<svg class="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>${tags[i]}`;
        tempContainer.appendChild(tempBadge);

        const badgeWidth = tempBadge.getBoundingClientRect().width;

        if (totalWidth + badgeWidth + (i > 0 ? 8 : 0) <= maxWidth) {
          totalWidth += badgeWidth + (i > 0 ? 8 : 0);
          visibleCount++;
        } else {
          break;
        }
      }

      document.body.removeChild(tempContainer);

      setVisibleTags(tags.slice(0, visibleCount));
      setHiddenCount(tags.length - visibleCount);
    };

    updateVisibleTags();

    const resizeObserver = new ResizeObserver(updateVisibleTags);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [tags]);

  return (
    <div ref={containerRef} className={`flex items-center gap-2 ${className}`}>
      {visibleTags.map((tag, idx) => (
        <Badge
          key={`${tag}-${idx}`}
          variant="outline"
          className="rounded-full flex-shrink-0"
        >
          {/* <Tag className="w-3 h-3 mr-1" /> */}
          {tag}
        </Badge>
      ))}
      {hiddenCount > 0 && (
        <Badge variant="secondary" className="rounded-full flex-shrink-0">
          +{hiddenCount}
        </Badge>
      )}
    </div>
  );
};

export default TagsWithOverflow;
