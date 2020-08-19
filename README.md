# Lottie Animation Component

[![npm version](https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&type=6&v=1.1.0&x2=0)](https://www.npmjs.com/package/@sentinel-one/s1-lottie)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://github.com/Sentinel-One/lottie/blob/master/LICENSE)

Lottie Animation Wrapper Component for Angular 7 or higher. no ionic support.

(Originally forked from: fivethree-team/lottie, this fork is independent and can't get updated in front of forked origin )


## 📦 Installation

```console
TBD as ng add soon

npm i @sentinel-one/s1-lottie lottie-web --save
```

## 🔨 Usage
Import the module into your root application module:

```typescript
import { NgModule } from '@angular/core';
import { LottieModule } from '@sentinel-one/s1-lottie';

@NgModule({
    imports: [
        LottieModule
    ]
})
export class AppModule {}
```

## 🦄 Animation

Add the lottie component to your template:

```html
<s1-lottie
  [options]="lottieParams"
  [width]="500"
  [height]="500"
  [optimize]="false"
  (animationCreated)=onAnimationCreated($event)>
</s1-lottie>
```

You need to setup the `lottieParams` in your component:

```typescript
import { Component } from '@angular/core';
import { S1LottieConfig } from '@sentinel-one/s1-lottie';
import { AnimationItem } from 'lottie-web';

Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  lottieParams: S1LottieConfig = {
    path: 'assets/lottie/empty_box.json',
    renderer: 'canvas',
    loop: true
  };

  onAnimationCreated(animation: AnimationItem) {
    animation.play();
    animation.setSpeed(0.8);
  }
}
```

Save your lottie files in the assets folder and change the `path` param, this way they are copied when building your application.

## API

- width: number - if not specified, the player will take 100% of its host.
- height: if not specified, the player will take 100% of its host.
- options: of type S1LottieConfig mandatory for setting the Lottie player configuration.
- optimize: boolean, if true, will load the lottie instance animation outside of Angular zone to escape change detection, for better performance.

## Contribute:

We'll be happy to get issues/PRs/ from you, please review the TODO.md for future planning
and follow the CONTRIBUTING.md.

Internal (requires permissions): build and publish to npm:
- To build before publishing run:
 ` npm run build:prod:plugin`
 - publish from dist/@sentinel-one/s1-lottie (`npm publish --access public`)
