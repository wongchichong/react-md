import "../../../../woby/dist/index.es.mjs";
import { z as observable } from "../../../../woby/dist/use_microtask-10cd6273.mjs";
function useDropzone(options) {
  const {
    onDragEnter: propOnDragEnter,
    onDragOver: propOnDragOver,
    onDragLeave: propOnDragLeave,
    onDrop: propOnDrop
  } = options;
  const isOver = observable(false);
  const onDragOver = observable((event) => {
    propOnDragOver == null ? void 0 : propOnDragOver(event);
    event.preventDefault();
    event.stopPropagation();
    isOver(true);
  });
  const onDragEnter = observable((event) => {
    propOnDragEnter == null ? void 0 : propOnDragEnter(event);
    event.preventDefault();
    event.stopPropagation();
    isOver(true);
  });
  const onDrop = observable((event) => {
    propOnDrop == null ? void 0 : propOnDrop(event);
    event.preventDefault();
    event.stopPropagation();
    isOver(false);
  });
  const onDragLeave = observable((event) => {
    propOnDragLeave == null ? void 0 : propOnDragLeave(event);
    event.preventDefault();
    event.stopPropagation();
    if (!event.target || event.currentTarget === event.target || //@ts-ignore
    !event.currentTarget.contains(event.target)) {
      isOver(false);
    }
  });
  return [
    isOver(),
    {
      onDragOver,
      onDragEnter,
      onDrop,
      onDragLeave
    }
  ];
}
export {
  useDropzone
};
