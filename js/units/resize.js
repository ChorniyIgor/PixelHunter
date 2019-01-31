export const resize = (frame, image) => {
  let sizeCoef = 1;

  if (image.width > frame.width) {
    sizeCoef = frame.width / image.width;
  }

  if (image.height * sizeCoef > frame.height) {
    sizeCoef = frame.height / image.height;
  }

  return {
    width: Math.round(image.width * sizeCoef),
    height: Math.round(image.height * sizeCoef)
  };
};

export function renderImages(imgArr) {
  return Promise.all(
      imgArr.map((item) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.addEventListener(`load`, () => {
            const newSize = resize(
                {
                  width: item.image.width,
                  height: item.image.height
                },
                {
                  width: img.width,
                  height: img.height
                }
          );
            img.width = newSize.width;
            img.height = newSize.height;
            resolve(img);
          });
          img.src = item.image.url;
        });
      })
  );
}
