# Fitness Tracker

Aplikacja webowa do śledzenia treningów, punktacji, historii, celów sportowych i odżywiania.

## Uruchomienie

1. `npm install`
2. `npm run dev`
3. Otwórz `http://localhost:5173`

## Główne funkcje

- Dashboard z punktacją treningową i statystykami
- Dodawanie i edycja treningów
- Biblioteka ćwiczeń i filtry
- Historia treningów
- Progres w czasie
- Cele sportowe i własne cele
- Dziennik żywienia z kaloriami i makroskładnikami
- LocalStorage z eksportem/importem danych

## Algorytm punktacji

Znajduje się w pliku `src/lib/scoring.ts`.

Wzór bazowy:

`punkty = trudność × seria × powtórzenia × obciążenie × wysiłek`

Dla każdego ćwiczenia obliczane są współczynniki: trudności, liczby serii, liczby powtórzeń, obciążenia oraz wskaźnika RPE. Współczynniki są ograniczone, aby uniknąć absurdalnie wysokiej punktacji.

Parametry można zmieniać w `calculateExercisePoints()`.
