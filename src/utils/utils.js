export function formatDuration(duration) {
    const hours = Math.trunc(duration / 60);
    const minutes = duration % 60;
  
    return `${hours > 0 ? `${hours}ч` : ''}${minutes}м`;
  }