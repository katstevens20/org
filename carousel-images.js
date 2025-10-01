// Carousel Images Generator - Images adaptées à la cause de l'association
// Images illustrant la protection des droits des pères et des enfants

class CarouselImagesGenerator {
    // Image 1: Justice marocaine - Balance de justice avec éléments traditionnels marocains
    static generateMoroccanJusticeImage() {
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="justiceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#2c5530;stop-opacity:0.9" />
                        <stop offset="100%" style="stop-color:#4a7c59;stop-opacity:0.9" />
                    </linearGradient>
                    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#ffd700;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#d4af37;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#b8860b;stop-opacity:1" />
                    </linearGradient>
                    <filter id="shadow">
                        <feDropShadow dx="2" dy="2" stdDeviation="3" flood-color="rgba(0,0,0,0.4)"/>
                    </filter>
                    <pattern id="moroccanPattern" patternUnits="userSpaceOnUse" width="40" height="40">
                        <rect width="40" height="40" fill="none"/>
                        <path d="M 20 0 L 20 40 M 0 20 L 40 20" stroke="#d4af37" stroke-width="1" opacity="0.3"/>
                        <circle cx="20" cy="20" r="3" fill="#d4af37" opacity="0.5"/>
                    </pattern>
                </defs>

                <!-- Arrière-plan avec motif géométrique marocain -->
                <rect width="800" height="600" fill="url(#moroccanPattern)"/>

                <!-- Arc marocain décoratif en arrière-plan -->
                <path d="M 150 500 L 150 200 Q 150 100, 250 100 Q 300 100, 300 150 Q 300 100, 350 100 Q 400 100, 400 50 Q 400 100, 450 100 Q 500 100, 500 150 Q 500 100, 550 100 Q 650 100, 650 200 L 650 500 Z"
                      fill="url(#justiceGrad)" opacity="0.2"/>

                <!-- Plateforme de justice marocaine -->
                <ellipse cx="400" cy="520" rx="220" ry="25" fill="url(#justiceGrad)" opacity="0.6"/>
                <rect x="300" y="495" width="200" height="25" fill="url(#goldGrad)" rx="3"/>

                <!-- Pilier central avec design marocain traditionnel -->
                <rect x="385" y="250" width="30" height="245" fill="url(#goldGrad)" rx="5" filter="url(#shadow)"/>
                <!-- Motifs marocains sur le pilier -->
                <rect x="390" y="270" width="20" height="8" fill="#2c5530" opacity="0.4"/>
                <rect x="390" y="300" width="20" height="8" fill="#2c5530" opacity="0.4"/>
                <rect x="390" y="330" width="20" height="8" fill="#2c5530" opacity="0.4"/>
                <rect x="390" y="360" width="20" height="8" fill="#2c5530" opacity="0.4"/>

                <!-- Chapiteau décoratif marocain -->
                <path d="M 370 230 L 370 250 L 430 250 L 430 230 Q 420 225, 400 225 Q 380 225, 370 230 Z" fill="url(#goldGrad)" filter="url(#shadow)"/>
                <!-- Motifs islamiques sur le chapiteau -->
                <circle cx="400" cy="240" r="3" fill="#2c5530" opacity="0.6"/>

                <!-- Barre horizontale de la balance (parfaitement équilibrée) -->
                <rect x="180" y="235" width="440" height="18" fill="url(#goldGrad)" rx="4" filter="url(#shadow)"/>

                <!-- Balance gauche - Droits familiaux -->
                <g>
                    <line x1="240" y1="244" x2="240" y2="330" stroke="url(#goldGrad)" stroke-width="4"/>
                    <ellipse cx="240" cy="340" rx="75" ry="12" fill="url(#goldGrad)" filter="url(#shadow)"/>
                    <path d="M 165 340 Q 165 352, 175 358 L 305 358 Q 315 352, 315 340 Z" fill="url(#goldGrad)" opacity="0.9"/>

                    <!-- Icône famille sur balance -->
                    <circle cx="220" cy="385" r="15" fill="#2c5530"/>
                    <ellipse cx="220" cy="410" rx="12" ry="20" fill="#2c5530"/>
                    <circle cx="240" cy="385" r="12" fill="#d4af37"/>
                    <ellipse cx="240" cy="405" rx="10" ry="18" fill="#d4af37"/>
                    <circle cx="260" cy="385" r="12" fill="#d4af37"/>
                    <ellipse cx="260" cy="405" rx="10" ry="18" fill="#d4af37"/>

                    <text x="240" y="465" text-anchor="middle" font-family="Cairo, Arial" font-size="16" font-weight="bold" fill="#2c5530">الحقوق الأسرية</text>
                </g>

                <!-- Balance droite - Droits des enfants -->
                <g>
                    <line x1="560" y1="244" x2="560" y2="330" stroke="url(#goldGrad)" stroke-width="4"/>
                    <ellipse cx="560" cy="340" rx="75" ry="12" fill="url(#goldGrad)" filter="url(#shadow)"/>
                    <path d="M 485 340 Q 485 352, 495 358 L 625 358 Q 635 352, 635 340 Z" fill="url(#goldGrad)" opacity="0.9"/>

                    <!-- Icônes enfants sur balance -->
                    <circle cx="545" cy="385" r="15" fill="#d4af37"/>
                    <ellipse cx="545" cy="410" rx="12" ry="20" fill="#d4af37"/>
                    <circle cx="575" cy="385" r="15" fill="#d4af37"/>
                    <ellipse cx="575" cy="410" rx="12" ry="20" fill="#d4af37"/>

                    <text x="560" y="465" text-anchor="middle" font-family="Cairo, Arial" font-size="16" font-weight="bold" fill="#2c5530">حقوق الأطفال</text>
                </g>

                <!-- Indicateur d'équilibre au centre -->
                <circle cx="400" cy="244" r="15" fill="url(#justiceGrad)" filter="url(#shadow)"/>
                <text x="400" y="252" text-anchor="middle" font-family="Cairo, Arial" font-size="12" font-weight="bold" fill="#d4af37">⚖</text>

                <!-- Marteau de justice marocain en haut -->
                <g transform="translate(400, 160)">
                    <rect x="-50" y="-10" width="100" height="20" fill="url(#goldGrad)" rx="5" filter="url(#shadow)"/>
                    <rect x="-8" y="10" width="16" height="50" fill="url(#goldGrad)" rx="3"/>
                    <circle cx="0" cy="70" r="25" fill="url(#justiceGrad)" opacity="0.3"/>
                    <!-- Motif marocain sur le marteau -->
                    <path d="M -15 65 Q 0 60, 15 65 Q 0 70, -15 65 Z" fill="#d4af37" opacity="0.7"/>
                </g>

                <!-- Étoiles marocaines décoratives -->
                <g fill="#d4af37" opacity="0.6">
                    <path d="M 100 200 L 105 215 L 120 217 L 107 228 L 110 243 L 100 235 L 90 243 L 93 228 L 80 217 L 95 215 Z"/>
                    <path d="M 700 200 L 705 215 L 720 217 L 707 228 L 710 243 L 700 235 L 690 243 L 693 228 L 680 217 L 695 215 Z"/>
                </g>

                <!-- Titre et sous-titre -->
                <text x="400" y="80" text-anchor="middle" font-family="Cairo, Arial" font-size="40" font-weight="bold" fill="url(#goldGrad)" filter="url(#shadow)">العدالة المغربية</text>
                <text x="400" y="120" text-anchor="middle" font-family="Cairo, Arial" font-size="22" fill="#2c5530" opacity="0.9">توازن الحقوق لمصلحة الأسرة</text>
            </svg>
        `)}`;
    }

    // Image 2: Droits des enfants - Enfants marocains avec symboles de protection
    static generateChildrenRightsImage() {
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="childrenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#e8f4ea;stop-opacity:0.9" />
                        <stop offset="100%" style="stop-color:#d4e8d7;stop-opacity:0.9" />
                    </linearGradient>
                    <linearGradient id="protectionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#d4af37;stop-opacity:0.9" />
                        <stop offset="100%" style="stop-color:#b8860b;stop-opacity:0.9" />
                    </linearGradient>
                    <filter id="glow">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <radialGradient id="flagGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#c1272d;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#006233;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#c1272d;stop-opacity:1" />
                    </radialGradient>
                </defs>

                <!-- Arrière-plan avec ciel marocain -->
                <rect width="800" height="600" fill="url(#childrenGrad)"/>

                <!-- Drapeau marocain en arrière-plan -->
                <g transform="translate(650, 100)" opacity="0.3">
                    <rect x="0" y="0" width="120" height="80" fill="url(#flagGrad)" rx="3"/>
                    <!-- Étoile du drapeau marocain -->
                    <path d="M 60 40 L 63 50 L 75 50 L 66 57 L 69 67 L 60 60 L 51 67 L 54 57 L 45 50 L 57 50 Z" fill="#d4af37"/>
                </g>

                <!-- Cercle de protection autour des enfants -->
                <circle cx="400" cy="300" r="220" fill="none" stroke="url(#protectionGrad)" stroke-width="4" opacity="0.4"/>
                <circle cx="400" cy="300" r="180" fill="none" stroke="url(#protectionGrad)" stroke-width="2" opacity="0.3"/>
                <circle cx="400" cy="300" r="140" fill="none" stroke="url(#protectionGrad)" stroke-width="2" opacity="0.2"/>

                <!-- Enfant marocain 1 (garçon) -->
                <g transform="translate(300, 320)">
                    <ellipse cx="0" cy="25" rx="22" ry="45" fill="#d4af37"/>
                    <circle cx="0" cy="-15" r="18" fill="#d4af37"/>
                    <!-- Vêtements traditionnels marocains -->
                    <path d="M -25 30 Q 0 35, 25 30 L 30 80 L -30 80 Z" fill="#2c5530"/>
                    <!-- Djellaba details -->
                    <path d="M -20 35 L 20 35 L 15 75 L -15 75 Z" fill="#4a7c59" opacity="0.7"/>
                    <ellipse cx="-12" cy="30" rx="6" ry="25" transform="rotate(-10 -12 30)" fill="#d4af37"/>
                    <ellipse cx="12" cy="30" rx="6" ry="25" transform="rotate(10 12 30)" fill="#d4af37"/>
                    <ellipse cx="-8" cy="85" rx="6" ry="30" fill="#d4af37"/>
                    <ellipse cx="8" cy="85" rx="6" ry="30" fill="#d4af37"/>
                </g>

                <!-- Enfant marocain 2 (fille) -->
                <g transform="translate(500, 320)">
                    <ellipse cx="0" cy="25" rx="22" ry="45" fill="#d4af37"/>
                    <circle cx="0" cy="-15" r="18" fill="#d4af37"/>
                    <!-- Robe traditionnelle marocaine -->
                    <path d="M -28 30 Q 0 35, 28 30 L 35 85 Q 30 90, 25 85 L 20 95 L -20 95 L -25 85 Q -30 90, -35 85 Z" fill="#c1272d"/>
                    <!-- Foulard marocain -->
                    <path d="M -25 -10 Q 0 -15, 25 -10 L 20 10 L -20 10 Z" fill="#006233"/>
                    <ellipse cx="-15" cy="30" rx="6" ry="25" transform="rotate(-15 -15 30)" fill="#d4af37"/>
                    <ellipse cx="15" cy="30" rx="6" ry="25" transform="rotate(15 15 30)" fill="#d4af37"/>
                    <ellipse cx="-10" cy="100" rx="6" ry="25" fill="#d4af37"/>
                    <ellipse cx="10" cy="100" rx="6" ry="25" fill="#d4af37"/>
                </g>

                <!-- Symboles de protection autour des enfants -->
                <!-- Livre de droits -->
                <g transform="translate(200, 200)">
                    <rect x="-20" y="-30" width="40" height="50" fill="#F5F5DC" stroke="#8B4513" stroke-width="2" rx="2"/>
                    <rect x="-18" y="-28" width="36" height="46" fill="#FFFFFF"/>
                    <text x="0" y="-5" text-anchor="middle" font-family="Cairo, Arial" font-size="8" font-weight="bold" fill="#2c5530">حقوق</text>
                    <text x="0" y="5" text-anchor="middle" font-family="Cairo, Arial" font-size="8" font-weight="bold" fill="#2c5530">الطفل</text>
                </g>

                <!-- Balance de justice miniature -->
                <g transform="translate(600, 200)">
                    <line x1="-15" y1="0" x2="15" y2="0" stroke="#d4af37" stroke-width="3"/>
                    <line x1="0" y1="-5" x2="0" y2="15" stroke="#d4af37" stroke-width="2"/>
                    <circle cx="-15" cy="10" r="5" fill="#d4af37"/>
                    <circle cx="15" cy="10" r="5" fill="#d4af37"/>
                </g>

                <!-- Cœur symbolisant l'amour parental -->
                <g transform="translate(400, 150)">
                    <path d="M 0 15 C 0 -5, 20 -15, 35 0 C 50 -15, 70 -5, 70 15 C 70 45, 0 75, 0 75 C 0 75, -70 45, -70 15 C -70 -5, -50 -15, -35 0 C -20 -15, 0 -5, 0 15 Z"
                          fill="url(#protectionGrad)" filter="url(#glow)"/>
                    <text x="0" y="-25" text-anchor="middle" font-family="Cairo, Arial" font-size="16" font-weight="bold" fill="#2c5530">الحب والحماية</text>
                </g>

                <!-- Maison familiale marocaine -->
                <g transform="translate(400, 450)">
                    <rect x="-40" y="-20" width="80" height="60" fill="#d4af37" opacity="0.8"/>
                    <path d="M -50 -20 L 0 -50 L 50 -20 Z" fill="#b8860b"/>
                    <!-- Porte marocaine -->
                    <rect x="-8" y="10" width="16" height="30" fill="#8B4513"/>
                    <circle cx="0" cy="25" r="3" fill="#d4af37"/>
                    <!-- Fenêtres -->
                    <rect x="-25" y="0" width="12" height="15" fill="#FFFFFF" opacity="0.7"/>
                    <rect x="13" y="0" width="12" height="15" fill="#FFFFFF" opacity="0.7"/>
                </g>

                <!-- Étoiles marocaines décoratives -->
                <g fill="#d4af37" opacity="0.4">
                    <path d="M 100 100 L 105 115 L 120 117 L 107 128 L 110 143 L 100 135 L 90 143 L 93 128 L 80 117 L 95 115 Z"/>
                    <path d="M 700 100 L 705 115 L 720 117 L 707 128 L 710 143 L 700 135 L 690 143 L 693 128 L 680 117 L 695 115 Z"/>
                </g>

                <!-- Bannière titre -->
                <rect x="200" y="520" width="400" height="50" fill="rgba(44, 85, 48, 0.85)" rx="8"/>
                <text x="400" y="550" text-anchor="middle" font-family="Cairo, Arial" font-size="28" font-weight="bold" fill="#d4af37">حقوق الطفل في المغرب</text>
            </svg>
        `)}`;
    }

    // Image 3: Harmonie familiale - Famille marocaine avec symboles d'unité
    static generateFamilyHarmonyImage() {
        return `data:image/svg+xml,${encodeURIComponent(`
            <svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="familyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:#2c5530;stop-opacity:0.8" />
                        <stop offset="50%" style="stop-color:#4a7c59;stop-opacity:0.8" />
                        <stop offset="100%" style="stop-color:#d4af37;stop-opacity:0.8" />
                    </linearGradient>
                    <linearGradient id="unityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#d4af37;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#b8860b;stop-opacity:1" />
                    </linearGradient>
                    <filter id="glowEffect">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <radialGradient id="circleGrad" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style="stop-color:#4a7c59;stop-opacity:0.3" />
                        <stop offset="100%" style="stop-color:#2c5530;stop-opacity:0.6" />
                    </radialGradient>
                </defs>

                <!-- Arrière-plan avec architecture marocaine traditionnelle -->
                <rect width="800" height="600" fill="url(#circleGrad)"/>

                <!-- Architecture marocaine en arrière-plan -->
                <g opacity="0.2" fill="#d4af37">
                    <rect x="200" y="150" width="400" height="300" rx="10"/>
                    <!-- Arc marocain -->
                    <path d="M 180 150 L 400 80 L 620 150 Z"/>
                    <!-- Motifs géométriques -->
                    <rect x="300" y="200" width="200" height="10" fill="#2c5530" opacity="0.5"/>
                    <rect x="300" y="230" width="200" height="10" fill="#2c5530" opacity="0.5"/>
                    <rect x="300" y="260" width="200" height="10" fill="#2c5530" opacity="0.5"/>
                    <!-- Colonnes -->
                    <rect x="250" y="150" width="20" height="300" fill="#b8860b"/>
                    <rect x="530" y="150" width="20" height="300" fill="#b8860b"/>
                </g>

                <!-- Cercle central d'unité familiale -->
                <circle cx="400" cy="300" r="160" fill="url(#familyGrad)" filter="url(#glowEffect)"/>
                <circle cx="400" cy="300" r="120" fill="none" stroke="#d4af37" stroke-width="3" opacity="0.5"/>

                <!-- Famille marocaine unie au centre -->
                <g transform="translate(400, 280)">
                    <!-- Père -->
                    <ellipse cx="-40" cy="20" rx="18" ry="35" fill="#2c5530"/>
                    <circle cx="-40" cy="-15" r="15" fill="#2c5530"/>
                    <!-- Mère -->
                    <ellipse cx="40" cy="20" rx="18" ry="35" fill="#d4af37"/>
                    <circle cx="40" cy="-15" r="15" fill="#d4af37"/>
                    <!-- Enfants -->
                    <ellipse cx="-60" cy="50" rx="12" ry="25" fill="#d4af37"/>
                    <circle cx="-60" cy="25" r="10" fill="#d4af37"/>
                    <ellipse cx="60" cy="50" rx="12" ry="25" fill="#d4af37"/>
                    <circle cx="60" cy="25" r="10" fill="#d4af37"/>
                    <ellipse cx="0" cy="60" rx="12" ry="25" fill="#d4af37"/>
                    <circle cx="0" cy="35" r="10" fill="#d4af37"/>
                </g>

                <!-- Cercle d'unité connectant la famille -->
                <g transform="translate(400, 300)">
                    <!-- Lignes connectant les membres -->
                    <line x1="-40" y1="-20" x2="40" y2="-20" stroke="url(#unityGrad)" stroke-width="3" opacity="0.7"/>
                    <line x1="-40" y1="-20" x2="-60" y2="25" stroke="url(#unityGrad)" stroke-width="2" opacity="0.6"/>
                    <line x1="-40" y1="-20" x2="60" y2="25" stroke="url(#unityGrad)" stroke-width="2" opacity="0.6"/>
                    <line x1="-40" y1="-20" x2="0" y2="35" stroke="url(#unityGrad)" stroke-width="2" opacity="0.6"/>
                    <line x1="40" y1="-20" x2="-60" y2="25" stroke="url(#unityGrad)" stroke-width="2" opacity="0.6"/>
                    <line x1="40" y1="-20" x2="60" y2="25" stroke="url(#unityGrad)" stroke-width="2" opacity="0.6"/>
                    <line x1="40" y1="-20" x2="0" y2="35" stroke="url(#unityGrad)" stroke-width="2" opacity="0.6"/>
                </g>

                <!-- Symboles d'harmonie autour de la famille -->
                <!-- Document juridique (contrat de mariage/modification) -->
                <g transform="translate(200, 200)">
                    <rect x="-25" y="-35" width="50" height="70" fill="#F5F5DC" stroke="#8B4513" stroke-width="2" rx="3"/>
                    <rect x="-20" y="-30" width="40" height="60" fill="#FFFFFF"/>
                    <line x1="-15" y1="-20" x2="15" y2="-20" stroke="#2c5530" stroke-width="1"/>
                    <line x1="-15" y1="-10" x2="15" y2="-10" stroke="#2c5530" stroke-width="1"/>
                    <line x1="-15" y1="0" x2="15" y2="0" stroke="#2c5530" stroke-width="1"/>
                    <text x="0" y="20" text-anchor="middle" font-family="Cairo, Arial" font-size="10" font-weight="bold" fill="#d4af37">عقد أسري</text>
                </g>

                <!-- Balance de justice -->
                <g transform="translate(600, 200)">
                    <line x1="-20" y1="0" x2="20" y2="0" stroke="#d4af37" stroke-width="4"/>
                    <line x1="0" y1="-10" x2="0" y2="20" stroke="#d4af37" stroke-width="3"/>
                    <ellipse cx="-20" cy="15" rx="8" ry="3" fill="#d4af37"/>
                    <ellipse cx="20" cy="15" rx="8" ry="3" fill="#d4af37"/>
                    <text x="0" y="40" text-anchor="middle" font-family="Cairo, Arial" font-size="10" font-weight="bold" fill="#2c5530">العدالة</text>
                </g>

                <!-- Cœur d'amour familial -->
                <g transform="translate(400, 150)">
                    <path d="M 0 20 C 0 0, 25 -10, 40 5 C 55 -10, 80 0, 80 20 C 80 50, 0 80, 0 80 C 0 80, -80 50, -80 20 C -80 0, -55 -10, -40 5 C -25 -10, 0 0, 0 20 Z"
                          fill="url(#unityGrad)" filter="url(#glowEffect)"/>
                    <text x="0" y="-20" text-anchor="middle" font-family="Cairo, Arial" font-size="18" font-weight="bold" fill="#2c5530">الحب الأسري</text>
                </g>

                <!-- Maison familiale -->
                <g transform="translate(400, 450)">
                    <rect x="-50" y="-30" width="100" height="80" fill="#d4af37" opacity="0.8"/>
                    <path d="M -60 -30 L 0 -60 L 60 -30 Z" fill="#b8860b"/>
                    <!-- Porte -->
                    <rect x="-10" y="10" width="20" height="40" fill="#8B4513"/>
                    <!-- Fenêtres -->
                    <rect x="-35" y="-5" width="15" height="20" fill="#FFFFFF" opacity="0.7"/>
                    <rect x="20" y="-5" width="15" height="20" fill="#FFFFFF" opacity="0.7"/>
                    <text x="0" y="70" text-anchor="middle" font-family="Cairo, Arial" font-size="12" font-weight="bold" fill="#2c5530">المنزل الأسري</text>
                </g>

                <!-- Étoiles marocaines décoratives -->
                <g fill="#d4af37" opacity="0.5">
                    <path d="M 100 100 L 105 115 L 120 117 L 107 128 L 110 143 L 100 135 L 90 143 L 93 128 L 80 117 L 95 115 Z"/>
                    <path d="M 700 100 L 705 115 L 720 117 L 707 128 L 710 143 L 700 135 L 690 143 L 693 128 L 680 117 L 695 115 Z"/>
                    <path d="M 100 500 L 105 515 L 120 517 L 107 528 L 110 543 L 100 535 L 90 543 L 93 528 L 80 517 L 95 515 Z"/>
                    <path d="M 700 500 L 705 515 L 720 517 L 707 528 L 710 543 L 700 535 L 690 543 L 693 528 L 680 517 L 695 515 Z"/>
                </g>

                <!-- Titre en haut -->
                <text x="400" y="70" text-anchor="middle" font-family="Cairo, Arial" font-size="38" font-weight="bold" fill="#2c5530" filter="url(#glowEffect)">الوئام الأسري</text>

                <!-- Bannière sous-titre en bas -->
                <rect x="200" y="520" width="400" height="50" fill="rgba(44, 85, 48, 0.85)" rx="8"/>
                <text x="400" y="550" text-anchor="middle" font-family="Cairo, Arial" font-size="24" font-weight="bold" fill="#d4af37">تعزيز الحقوق والمساواة الأسرية</text>
            </svg>
        `)}`;
    }
}

// Export pour utilisation dans le carousel
window.CarouselImagesGenerator = CarouselImagesGenerator;
