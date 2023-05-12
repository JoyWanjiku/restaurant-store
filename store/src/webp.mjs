import imagemin from 'imagemin';
import webp from 'imagemin-webp';

const outputFolder = './assets/webp';

const produceWebP = async () => {
  await imagemin(['assets/*.png', 'assets/logo/*.png', 'assets/payment/*.png'], {
    destination: outputFolder,
    plugins: [
      webp({
        lossless: true,
      }),
    ],
  });
  console.log('PNGs processed');
  await imagemin(['assets/*.{jpg,jpeg}', 'assets/404/*.{jpg,jpeg}', 'assets/card/*.{jpg,jpeg}'], {
    destination: outputFolder,
    plugins: [
      webp({
        quality: 65,
      }),
    ],
  });
  console.log('JPGs and JPEGs processed');
};

produceWebP();
