import type { Case } from '$lib/types/case';

export const mockCases: Case[] = [
  {
    id: '1',
    title: 'SaaS Platform für Freelancer',
    subtitle: 'Ein All-in-One Tool für die Selbstständigkeit',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    createdAt: '2023-01-15',
    updatedAt: '2023-04-02',
    status: 'active',
    meta: {
      vision: 'Eine Plattform schaffen, die alle administrativen Aufgaben für Freelancer automatisiert und integriert',
      hypotheses: [
        'Freelancer verbringen 30% ihrer Zeit mit Administration statt mit bezahlter Arbeit',
        'Eine All-in-One Lösung wird einer Vielzahl einzelner Tools vorgezogen',
        'Automatisierte Buchhaltung ist der größte Schmerzpunkt'
      ],
      strategy: 'Entwicklung eines modularen Systems mit Buchhaltung als Einstiegspunkt, anschließend Erweiterung um CRM und Projektmanagement'
    },
    logEntries: [
      {
        id: 'log1',
        date: '2023-01-15',
        title: 'Projektstart und erste Recherchen',
        content: 'Heute habe ich mit der Recherche zum Freelancer-Markt begonnen. Erste Interviews mit 5 potenziellen Nutzern deuten darauf hin, dass besonders Zeiterfassung und automatisierte Rechnungsstellung große Schmerzpunkte sind.',
        tags: ['Recherche', 'Interviews']
      },
      // Weitere Einträge wie im Original
    ],
    snapshots: [
      {
        id: 'snap1',
        date: '2023-02-15',
        reflections: 'Der erste Monat hat gezeigt, dass die Hypothese über den Zeitaufwand für Administration zutrifft. Interviews mit 15 Freelancern ergaben einen Durchschnitt von 12 Stunden pro Woche für administrative Aufgaben.',
        progress: {
          achieved: [
            'Marktanalyse abgeschlossen',
            'Ersten Prototyp entwickelt',
            'Validierung der Kern-Hypothese'
          ],
          ongoing: [
            'Entwicklung des MVP für das Buchhaltungsmodul',
            'Gespräche mit potenziellen Frühanwendern'
          ],
          challenges: [
            'Technische Integration mit Banken erfordert mehr Ressourcen als geplant',
            'Rechtliche Anforderungen an Buchhaltungssoftware sind komplex'
          ]
        },
        nextSteps: [
          'Rechtliche Beratung für Buchhaltungssoftware einholen',
          'MVP bis Ende März fertigstellen',
          'Beta-Testgruppe von 10 Nutzern aufbauen'
        ]
      }
    ],
    decisions: [
      {
        id: 'dec1',
        date: '2023-02-01',
        title: 'Technologiestapel für MVP',
        options: [
          {
            title: 'React und Firebase',
            pros: ['Schnelle Entwicklung', 'Geringe Serverkosten zu Beginn', 'Gute Skalierbarkeit'],
            cons: ['Begrenzte Datenbankoptionen', 'Abhängigkeit von Google', 'Höhere Kosten bei Skalierung']
          },
          {
            title: 'Vue.js und eigener Server',
            pros: ['Volle Kontrolle über Backend', 'Langfristig geringere Kosten', 'Flexibilität bei Datenbanken'],
            cons: ['Längere Entwicklungszeit', 'Höhere initiale Serverkosten', 'Komplexeres Deployment']
          }
        ],
        decision: 'React und Firebase',
        reasoning: 'Die Geschwindigkeit der Markteinführung ist der wichtigste Faktor für dieses Projekt. Firebase ermöglicht eine schnelle Entwicklung des MVP und kann später bei Bedarf durch eine eigene Lösung ersetzt werden.'
      }
    ]
  },
  // Weitere Cases wie im Original
];