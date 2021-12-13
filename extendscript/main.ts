function makeFade(flag: number, length: number) {
  app.beginUndoGroup("makeFade");
  if (flag) {
    currentFade(flag, length);
  } else {
    endsFade(length);
  }
  app.endUndoGroup();
}

function currentFade(flag: number, length: number) {
  //現在地からフェード
  if (!isCompItem(app.project.activeItem)) return null;
  const activeLayer = app.project.activeItem.selectedLayers[0];
  if (!isAVLayer(activeLayer)) return null;
  const currentTime = activeLayer.time;
  const hasAudio = activeLayer.hasAudio;
  const hasVideo = activeLayer.hasVideo;

  if (flag == 1) {
    if (hasVideo) videoFade(activeLayer, currentTime, length, 0, 100);
    if (hasAudio) audioFade(activeLayer, currentTime, length, -50, 0);
  } else {
    if (hasVideo) videoFade(activeLayer, currentTime - length, length, 100, 0);
    if (hasAudio) audioFade(activeLayer, currentTime - length, length, 0, -50);
  }
}
function endsFade(length: number) {
  //両端をフェード
  if (!isCompItem(app.project.activeItem)) return null;
  const activeLayer = app.project.activeItem.selectedLayers[0];
  const startPoint = activeLayer.inPoint;
  const endPoint = activeLayer.outPoint;
  if (!isAVLayer(activeLayer)) return null;
  const hasAudio = activeLayer.hasAudio;
  const hasVideo = activeLayer.hasVideo;

  if (hasVideo) videoFade(activeLayer, startPoint, length, 0, 100);
  if (hasVideo) videoFade(activeLayer, endPoint - length, length, 100, 0);
  if (hasAudio) audioFade(activeLayer, startPoint, length, -50, 0);
  if (hasAudio) audioFade(activeLayer, endPoint - length, length, 0, -50);
  return;
}

function videoFade(
  layer: AVLayer,
  position: number,
  length: number,
  startOpacity: number,
  endOpadity: number
) {
  const videoOpacity = layer.opacity;

  videoOpacity.setValueAtTime(position, startOpacity);
  videoOpacity.setValueAtTime(position + length, endOpadity);
  return;
}

function audioFade(
  layer: AVLayer,
  position: number,
  length: number,
  startVolume: number,
  endVolume: number
) {
  const audioLevel = layer.audio.audioLevels;
  audioLevel.setValueAtTime(position, [startVolume, startVolume]);
  audioLevel.setValueAtTime(position + length, [endVolume, endVolume]);
  return;
}

const isCompItem = (item: any): item is CompItem => {
  return item.selectedLayers;
};

const isAVLayer = (layer: any): layer is AVLayer => {
  return layer.isNameFromSource;
};
