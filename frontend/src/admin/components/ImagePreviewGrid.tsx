import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, X } from 'lucide-react';

interface ImagePreviewProps {
  id: string;
  photo: {
    preview: string;
    caption: string;
    isExisting: boolean;
    url?: string;
  };
  onRemove: (id: string) => void;
  onCaptionUpdate: (id: string, caption: string, isExisting: boolean) => void;
  attributes?: any;
  listeners?: any;
  style?: React.CSSProperties;
}

// FIX: Destructure the `id` prop and use it for callbacks.
// The `id` prop is the correct unique identifier for both new (upload file id) and existing (photo url) images.
// Accessing `photo.id` was causing an error because the `photo` object for existing images does not have an `id` property.
export const ImagePreview: React.FC<ImagePreviewProps> = ({ id, photo, onRemove, onCaptionUpdate, attributes, listeners, style }) => {
  const removeId = id;
  const captionId = id;
  
  return (
    <div className="relative group border rounded-lg overflow-hidden" style={style}>
      <img src={photo.preview} alt="Preview" className="w-full h-32 object-cover" />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2">
        <div className="flex justify-end">
            <button
              type="button"
              onClick={() => onRemove(removeId)}
              className="bg-white/80 hover:bg-white text-red-600 p-1 rounded-full"
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
        </div>
        <button
          type="button"
          className="absolute top-2 left-2 bg-white/80 hover:bg-white text-gray-600 p-1 rounded-full cursor-grab active:cursor-grabbing"
          {...attributes}
          {...listeners}
          aria-label="Drag to reorder"
        >
          <GripVertical className="h-4 w-4" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Caption..."
        value={photo.caption}
        onChange={(e) => onCaptionUpdate(captionId, e.target.value, photo.isExisting)}
        className="w-full p-2 border-t text-sm focus:ring-1 focus:ring-admin-accent focus:outline-none"
      />
    </div>
  );
};

export const SortableImagePreview: React.FC<Omit<ImagePreviewProps, 'attributes' | 'listeners' | 'style'>> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none', // For better mobile drag experience
  };

  return (
    <div ref={setNodeRef}>
        <ImagePreview {...props} attributes={attributes} listeners={listeners} style={style} />
    </div>
  );
};