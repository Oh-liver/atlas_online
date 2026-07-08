# Atlas Guess

Bezplatný klon GeoGuessr-u (klasický mód) — hráš 5 kôl, pozeráš sa na fotku
ulice z Mapillary a hádaš miesto na mape. Beží zadarmo na Vercel.

## Ako to funguje

- **Fotky ulíc**: [Mapillary](https://www.mapillary.com/) — plne bezplatné,
  crowdsourcované, žiadna platobná karta. Pokrytie je nerovnomerné, preto hra
  náhodne vyberá miesto z ~130 vopred vybraných lokalít po celom svete
  (`lib/cities.ts`) a v okolí hľadá reálnu fotku.
- **Mapa na hádanie**: OpenStreetMap cez Leaflet — úplne zadarmo, netreba
  žiadny kľúč.
- **Hosting**: Vercel free tier (Next.js App Router).

Jediná vec, ktorú potrebuješ zohnať, je bezplatný Mapillary token.

## 1. Získanie Mapillary tokenu (zadarmo, 2 minúty)

1. Choď na https://www.mapillary.com/dashboard/developers
2. Zaregistruj sa / prihlás sa (stačí email, žiadna karta).
3. Klikni na **Register application**, vyplň ľubovoľný názov.
4. Skopíruj **Client Token** (vyzerá ako `MLY|123456|abcdef...`).

Tento token použiješ v dvoch premenných prostredia (viď nižšie) — je to ten
istý token na oboch miestach.

## 2. Lokálne spustenie

```bash
npm install
cp .env.example .env.local
# do .env.local vlož svoj Mapillary token na obe miesta
npm run dev
```

Otvor http://localhost:3000

## 3. Nasadenie na Vercel (zadarmo)

1. Nahraj tento priečinok do vlastného GitHub repozitára:
   ```bash
   git init
   git add .
   git commit -m "Atlas Guess"
   git branch -M main
   git remote add origin https://github.com/TVOJ_UCET/atlas-guess.git
   git push -u origin main
   ```
2. Choď na https://vercel.com, prihlás sa cez GitHub.
3. **Add New... → Project**, vyber repo `atlas-guess`.
4. Framework preset sa nastaví automaticky na Next.js.
5. Pred deploy klikni na **Environment Variables** a pridaj:
   - `MAPILLARY_TOKEN` = tvoj token
   - `NEXT_PUBLIC_MAPILLARY_TOKEN` = ten istý token
6. Klikni **Deploy**. O minútu máš appku na `https://atlas-guess-xxxx.vercel.app`.

Vercel free (Hobby) plán pokryje bežnú návštevnosť bez problémov — nič sa
neplatí, kým appku nezačnú používať tisíce ľudí naraz.

## Štruktúra projektu

```
app/
  page.tsx                    – hlavná hra (intro, kolá, hádanie, výsledky)
  layout.tsx                  – fonty, globálny layout
  api/random-location/route.ts – nájde náhodné pokryté miesto cez Mapillary
components/
  StreetView.tsx    – mapillary-js viewer (360° pohľad na fotku)
  GuessMap.tsx       – Leaflet mapa na tipovanie + reveal s líniou vzdialenosti
  RoundResult.tsx    – kompasové odhalenie vzdialenosti/bodov po kole
  GameHUD.tsx        – horný panel s kolom a skóre
  FinalScore.tsx     – súhrn po 5 kolách
lib/
  cities.ts   – ~130 kurátorovaných lokalít pre náhodný výber (svetový rozsah)
  scoring.ts  – vzdialenosť (haversine), bodovanie, azimut na kompas
  types.ts    – zdieľané typy, TOTAL_ROUNDS = 5
```

## Úpravy, ktoré môžeš ľahko spraviť

- **Počet kôl**: zmeň `TOTAL_ROUNDS` v `lib/types.ts`.
- **Iba jedna krajina/región**: zúž zoznam v `lib/cities.ts` na body danej
  krajiny (napr. len slovenské a české mestá) — hra bude hádať len tam.
- **Prísnejšie/miernejšie bodovanie**: uprav `scaleKm` v `lib/scoring.ts`
  (nižšia hodnota = strmší pokles bodov so vzdialenosťou).
