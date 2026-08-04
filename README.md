# Azur Dream: A Saint-Tropez Welcome

Crée la navigation et le Hero d'un site premium pour Villa Rêve d'Azur, villa historique méditerranéenne à Saint-Tropez, Côte d'Azur.

NAVIGATION
- Fixed top, transparent au chargement, fond #FFFFFF + backdrop-filter blur(12px) au scroll
- Hauteur 80px desktop / 64px mobile
- Gauche : "Villa Rêve d'Azur" serif Playfair Display 20px, letter-spacing 0.05em, couleur #0D0D0D
- Centre desktop : "La Villa" · "Galerie" · "Tarifs" · "Saint-Tropez" · "Contact" — sans-serif Inter 14px uppercase letter-spacing 0.12em couleur #0D0D0D
- Droite : bouton "Réserver" fond #C9A96E texte #FFFFFF padding 14px 28px radius 2px uppercase 13px letter-spacing 0.12em
- Mobile : burger, overlay plein écran fond #FFFFFF, liens centrés 28px Playfair Display
- Transition 300ms ease

HERO
- Hauteur 100vh desktop / 92vh mobile
- Image plein écran object-fit cover center → utilise cette URL : https://www.villanovo.fr/photos/10916/cote-dazur-villa-stg-102248455669a583357a0882.61075939.1920.jpg (façade principale de la Villa Rêve d'Azur)
- Overlay linear-gradient(180deg, rgba(0,0,0,0.35), rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.45))
- Centré :
  · Surtitre "SAINT-TROPEZ · VAR" sans-serif Inter 13px uppercase letter-spacing 0.2em blanc 0.85
  · H1 "Villa Rêve d'Azur" serif Playfair Display 88px / 42px mobile, blanc, letter-spacing -0.02em, line-height 1.05
  · Accroche "Plage privée, bouée d'ancrage, vue mer — à 500 m de la place des Lices." serif italic Playfair Display 24px / 18px mobile, blanc 0.92, max-width 640px
  · Séparateur 1px × 60px blanc 0.4, marge 32px vertical
  · Métadonnées "20 personnes · 10 chambres · 550 m²" sans-serif Inter 14px letter-spacing 0.1em blanc 0.85
  · CTA "Réserver directement" fond #C9A96E texte #FFFFFF padding 18px 44px radius 2px uppercase 13px letter-spacing 0.12em, marge-top 40px. Hover : fond #FFFFFF texte #C9A96E border 1px solid #C9A96E transition 250ms
- Flèche scroll bas centrée 24px blanc 0.7, animation CSS bounce 2s infinite
- Aucun JS sur le hero

RESPONSIVE
≥1024px layout ci-dessus · 768-1023px H1 64px padding 48px · <768px H1 42px, accroche 18px, métadonnées 2 lignes, bouton pleine largeur

COULEURS fond #FFFFFF · texte #0D0D0D · accent #C9A96E · secondaire #8C8C8C
TYPO titres Playfair Display (Google Fonts) · corps Inter (Google Fonts)

CONTRAINTES : zéro texte en image · lazy loading sauf hero · structure HTML sémantique

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/c062caaf-c5cd-4681-bbb0-76cb9599e2e5).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
