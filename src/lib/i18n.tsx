import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'FR' | 'AR'

type Bi = { fr: string; ar: string }

// ─── Dictionnaire de traduction ────────────────────────────────────────────
// Toutes les chaînes simples de l'interface. Les listes de contenu (soins,
// forfaits, galerie...) sont définies plus bas, séparément, car elles ont
// une structure plus riche (nom + description, etc.)
const dict = {
  // Nav / commun
  navHome: { fr: 'Accueil', ar: 'الرئيسية' },
  navTreatments: { fr: 'Soins', ar: 'العلاجات' },
  navGallery: { fr: 'Galerie', ar: 'معرض الصور' },
  navAbout: { fr: 'À propos', ar: 'من نحن' },
  navPricing: { fr: 'Tarifs & Offres', ar: 'الأسعار والعروض' },
  navContact: { fr: 'Contact', ar: 'اتصل بنا' },
  bookNowShort: { fr: 'Prendre RDV', ar: 'احجزي موعدك' },
  bookNowLong: { fr: 'Prendre rendez-vous', ar: 'احجزي موعدك' },
  errorGeneric: { fr: "Une erreur est survenue. Merci de réessayer, ou de nous appeler directement.", ar: 'حدث خطأ. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.' },
  thankYou: { fr: 'Merci !', ar: 'شكرًا لكِ!' },

  // Footer
  footerTagline: { fr: 'Médecine morpho-esthétique, anti-âge & laser-thérapie. Dr. Mobesser Esma', ar: 'طب التجميل الشكلي، مكافحة الشيخوخة والعلاج بالليزر. د. مبصر أسماء' },
  footerQuickLinks: { fr: 'Liens rapides', ar: 'روابط سريعة' },
  footerContact: { fr: 'Contact', ar: 'اتصل بنا' },
  footerAddress: { fr: 'Sidi Bel Abbès, Algérie', ar: 'سيدي بلعباس، الجزائر' },
  footerRights: { fr: '© 2024 Mon Espoir · Tous droits réservés', ar: '© 2024 مون إسبوار · جميع الحقوق محفوظة' },

  // Home
  homeEyebrow: { fr: 'Médecine morpho-esthétique · Anti-âge · Laser', ar: 'طب التجميل الشكلي · مكافحة الشيخوخة · الليزر' },
  homeH1Line1: { fr: 'Révélez votre', ar: 'أظهري' },
  homeH1Line2: { fr: 'éclat naturel', ar: 'جمالك الطبيعي' },
  homeIntro: { fr: 'Sous la direction du Dr. Mobesser Esma, notre clinique vous offre une approche personnalisée alliant expertise médicale et soin holistique.', ar: 'تحت إشراف الدكتورة مبصر أسماء، تقدم لكِ عيادتنا مقاربة شخصية تجمع بين الخبرة الطبية والعناية الشاملة.' },
  discoverTreatments: { fr: 'Découvrir nos soins', ar: 'اكتشفي علاجاتنا' },
  badgePatients: { fr: '+500 Patientes', ar: '+500 مريضة' },
  badgeSatisfied: { fr: 'satisfaites', ar: 'راضية' },
  specialtiesEyebrow: { fr: 'Nos spécialités', ar: 'تخصصاتنا' },
  ourTreatmentsTitle: { fr: 'Nos soins', ar: 'علاجاتنا' },
  learnMore: { fr: 'En savoir plus', ar: 'اعرفي المزيد' },
  offersEyebrow: { fr: 'Promotions en cours', ar: 'العروض الحالية' },
  laserOffersTitle: { fr: 'Nos offres laser', ar: 'عروض الليزر لدينا' },
  seeAllPricing: { fr: 'Voir tous les tarifs', ar: 'عرض كل الأسعار' },
  ctaTitle: { fr: 'Prête à commencer votre parcours ?', ar: 'هل أنتِ مستعدة لبدء رحلتك؟' },
  ctaText: { fr: 'Prenez rendez-vous en ligne. Dr. Esma vous rappellera personnellement pour confirmer.', ar: 'احجزي موعدك عبر الإنترنت. ستتصل بكِ الدكتورة أسماء شخصيًا للتأكيد.' },
  ctaButton: { fr: 'Réserver ma consultation', ar: 'احجزي استشارتك' },

  // Treatments page
  treatmentsEyebrow: { fr: 'Expertise & excellence', ar: 'خبرة وتميز' },
  treatmentsIntro: { fr: 'Chaque traitement est personnalisé selon votre morphologie, vos besoins et vos objectifs, par le Dr. Mobesser Esma.', ar: 'كل علاج مصمم خصيصًا حسب شكل جسمك واحتياجاتك وأهدافك، بإشراف الدكتورة مبصر أسماء.' },
  treatmentsBannerTitle: { fr: 'Une question sur un traitement ?', ar: 'لديكِ سؤال حول أحد العلاجات؟' },
  contactUs: { fr: 'Nous contacter', ar: 'اتصلي بنا' },

  // About page
  aboutEyebrow: { fr: 'Notre équipe', ar: 'فريقنا' },
  aboutTitle: { fr: 'À propos', ar: 'من نحن' },
  drTitle: { fr: 'Médecin morpho-esthétique', ar: 'طبيبة تجميل شكلي' },
  drSubtitle: { fr: 'Médecin Morpho-Esthétique · Fondatrice de Mon Espoir', ar: 'طبيبة تجميل شكلي · مؤسسة مون إسبوار' },
  bioP1: { fr: 'Passionnée par la médecine esthétique depuis le début de sa carrière, le Dr. Mobesser Esma a fondé Mon Espoir avec une conviction profonde : chaque patiente mérite une approche sur mesure, bienveillante et fondée sur les dernières avancées scientifiques.', ar: 'شغوفة بطب التجميل منذ بداية مسيرتها المهنية، أسّست الدكتورة مبصر أسماء عيادة مون إسبوار انطلاقًا من قناعة راسخة: كل مريضة تستحق مقاربة مخصصة، إنسانية، ومبنية على أحدث التطورات العلمية.' },
  bioP2: { fr: "Après des années de formation en France et à l'international, spécialisée en médecine morphologique et anti-âge, elle a développé une expertise reconnue dans les traitements injectables, la laser-thérapie et les techniques de remodelage corporel non-invasif.", ar: 'بعد سنوات من التكوين في فرنسا وعلى المستوى الدولي، وتخصصها في طب التجميل الشكلي ومكافحة الشيخوخة، طوّرت خبرة معترف بها في العلاجات بالحقن، العلاج بالليزر، وتقنيات نحت الجسم غير الجراحية.' },
  bioP3: { fr: 'Au cabinet Mon Espoir, son approche est toujours personnalisée : elle prend le temps d\'écouter, d\'analyser et de proposer des protocoles adaptés à la morphologie et aux attentes de chaque patiente — jamais de traitements standardisés.', ar: 'في عيادة مون إسبوار، مقاربتها دائمًا شخصية: تأخذ الوقت الكافي للاستماع والتحليل واقتراح بروتوكولات تتناسب مع شكل جسم وتطلعات كل مريضة — بلا أي علاجات نمطية موحدة.' },
  bioP4: { fr: 'Son philosophy : révéler la beauté naturelle, dans le respect et la durabilité, pour une confiance retrouvée.', ar: 'فلسفتها: إظهار الجمال الطبيعي، باحترام واستدامة، لاستعادة الثقة بالنفس.' },
  credentialsTitle: { fr: 'Diplômes & certifications', ar: 'الشهادات والاعتمادات' },

  // Gallery page
  galleryEyebrow: { fr: 'Résultats réels', ar: 'نتائج حقيقية' },
  galleryTitle: { fr: 'Galerie', ar: 'معرض الصور' },
  galleryConsent: { fr: 'Avec le consentement écrit des patientes. Résultats individuels variables.', ar: 'بموافقة خطية من المريضات. النتائج قد تختلف من شخص لآخر.' },
  before: { fr: 'Avant', ar: 'قبل' },
  after: { fr: 'Après', ar: 'بعد' },
  lightboxConsent: { fr: 'Résultat publié avec consentement écrit. Résultats individuels variables.', ar: 'تم نشر هذه النتيجة بموافقة خطية. النتائج قد تختلف من شخص لآخر.' },
  close: { fr: 'Fermer', ar: 'إغلاق' },

  // Pricing page
  pricingEyebrow: { fr: 'Transparence & confiance', ar: 'الشفافية والثقة' },
  pricingTitle: { fr: 'Tarifs & Offres', ar: 'الأسعار والعروض' },
  pricingIntro: { fr: 'Nos forfaits laser évoluent selon les saisons. Contactez-nous pour connaître les disponibilités actuelles.', ar: 'تتغير باقات الليزر لدينا حسب المواسم. تواصلي معنا لمعرفة العروض المتاحة حاليًا.' },
  packagesTitle: { fr: 'Forfaits Épilation Laser Clarity', ar: 'باقات إزالة الشعر بليزر Clarity' },
  packagesSubtitle: { fr: 'Technologie laser Clarity — efficace sur toutes les carnations', ar: 'تقنية ليزر Clarity — فعّالة على جميع درجات البشرة' },
  zonesIncluded: { fr: 'Zones incluses', ar: 'المناطق المشمولة' },
  freeGift: { fr: '🎁 Offert', ar: '🎁 مجانًا' },
  bookThisPackage: { fr: 'Réserver ce forfait', ar: 'احجزي هذه الباقة' },
  pricingNote: { fr: 'Les tarifs sont disponibles sur demande. Chaque forfait est adapté à votre bilan initial. Contactez-nous pour un devis personnalisé.', ar: 'الأسعار متوفرة عند الطلب. كل باقة تُصمم حسب تقييمك الأولي. تواصلي معنا للحصول على عرض سعر شخصي.' },

  // Contact page
  contactTitle: { fr: 'Contactez-nous', ar: 'اتصلي بنا' },
  contactIntro: { fr: 'Notre équipe vous répond dans les plus brefs délais.', ar: 'سيقوم فريقنا بالرد عليكِ في أقرب وقت ممكن.' },
  sendMessageTitle: { fr: 'Envoyez-nous un message', ar: 'أرسلي لنا رسالة' },
  messageSentText: { fr: 'Votre message a bien été reçu, nous vous répondrons rapidement.', ar: 'تم استلام رسالتك بنجاح، سنقوم بالرد عليكِ قريبًا.' },
  labelFirstName: { fr: 'Prénom', ar: 'الاسم' },
  labelLastName: { fr: 'Nom', ar: 'اللقب' },
  labelEmail: { fr: 'Email', ar: 'البريد الإلكتروني' },
  labelPhone: { fr: 'Téléphone', ar: 'الهاتف' },
  labelSubject: { fr: 'Objet', ar: 'الموضوع' },
  labelMessage: { fr: 'Message', ar: 'الرسالة' },
  optInfoRequest: { fr: "Demande d'information", ar: 'طلب معلومات' },
  optAppointment: { fr: 'Prise de rendez-vous', ar: 'حجز موعد' },
  optTreatmentQuestion: { fr: 'Question sur un soin', ar: 'سؤال حول علاج' },
  optOther: { fr: 'Autre', ar: 'أخرى' },
  sendMessage: { fr: 'Envoyer le message', ar: 'إرسال الرسالة' },
  sending: { fr: 'Envoi...', ar: 'جارٍ الإرسال...' },
  callUs: { fr: 'Appelez-nous', ar: 'اتصلي بنا' },
  callUsHours: { fr: 'Lun – Sam · 9h – 19h', ar: 'الإثنين – السبت · 9 صباحًا – 19 مساءً' },
  emailUsSub: { fr: 'Réponse sous 24h', ar: 'الرد خلال 24 ساعة' },
  ourAddress: { fr: 'Notre adresse', ar: 'عنواننا' },
  addressSub: { fr: 'Accès facile, parking disponible', ar: 'وصول سهل، موقف سيارات متوفر' },
  interactiveMap: { fr: 'Carte interactive', ar: 'خريطة تفاعلية' },
  followUs: { fr: 'Suivez-nous', ar: 'تابعونا' },

  // Book page
  bookTitle: { fr: 'Prendre rendez-vous en ligne', ar: 'احجزي موعدك عبر الإنترنت' },
  bookIntro: { fr: "Après votre demande, nous vous appellerons ou vous enverrons un email pour confirmer la date et l'heure de votre rendez-vous.", ar: 'بعد إرسال طلبك، سنتصل بكِ أو نرسل لكِ بريدًا إلكترونيًا لتأكيد تاريخ ووقت موعدك.' },
  stepContactInfo: { fr: 'Informations de contact', ar: 'معلومات الاتصال' },
  stepChooseTreatment: { fr: 'Choisir un soin', ar: 'اختيار العلاج' },
  tabContact: { fr: 'Contact', ar: 'التواصل' },
  tabTreatment: { fr: 'Soin', ar: 'العلاج' },
  labelAvailability: { fr: 'Disponibilité souhaitée', ar: 'التاريخ المفضل' },
  nextStep: { fr: 'Étape suivante', ar: 'الخطوة التالية' },
  chooseServiceIntro: { fr: 'Sélectionnez le soin pour lequel vous souhaitez prendre rendez-vous.', ar: 'اختاري العلاج الذي ترغبين في حجز موعد من أجله.' },
  back: { fr: 'Retour', ar: 'رجوع' },
  confirmRequest: { fr: 'Confirmer la demande ✓', ar: 'تأكيد الطلب ✓' },
  bookSuccessText: { fr: 'Votre demande a bien été reçue. Nous vous recontactons très vite pour confirmer votre rendez-vous.', ar: 'تم استلام طلبك بنجاح. سنتواصل معكِ قريبًا لتأكيد موعدك.' },

  // Categories (réutilisées à plusieurs endroits)
  catMorpho: { fr: 'Morpho-esthétique', ar: 'التجميل الشكلي' },
  catAntiAge: { fr: 'Anti-âge', ar: 'مكافحة الشيخوخة' },
  catLaser: { fr: 'Laser-thérapie', ar: 'العلاج بالليزر' },
  catMorphoDesc: { fr: 'Remodelage du visage et du corps par des techniques non-invasives adaptées à votre morphologie unique.', ar: 'نحت الوجه والجسم بتقنيات غير جراحية تتناسب مع شكل جسمك الفريد.' },
  catAntiAgeDesc: { fr: 'Traitements de pointe pour atténuer les rides, restaurer la fermeté et retrouver un teint lumineux.', ar: 'علاجات متطورة لتخفيف التجاعيد واستعادة نضارة ومرونة البشرة.' },
  catLaserDesc: { fr: 'Épilation définitive et traitements cutanés par laser Clarity de dernière génération.', ar: 'إزالة الشعر نهائيًا وعلاجات جلدية بتقنية الليزر Clarity من الجيل الأحدث.' },
} satisfies Record<string, Bi>

export type DictKey = keyof typeof dict

// ─── Contenus structurés bilingues ─────────────────────────────────────────

export const treatmentItemsData: Record<'morpho' | 'antiAge' | 'laser', { name: Bi; desc: Bi }[]> = {
  morpho: [
    { name: { fr: 'Mésothérapie visage', ar: 'ميزوثيرابي الوجه' }, desc: { fr: 'Microinjections revitalisantes pour éclat et hydratation profonde.', ar: 'حقن دقيقة منعشة لإشراقة وترطيب عميق.' } },
    { name: { fr: 'Remodelage du corps', ar: 'نحت الجسم' }, desc: { fr: 'Techniques non-invasives pour sculpter et affiner la silhouette.', ar: 'تقنيات غير جراحية لنحت وتحديد القوام.' } },
    { name: { fr: 'Lifting sans chirurgie', ar: 'شد الوجه بدون جراحة' }, desc: { fr: 'Raffermissement cutané par radiofrequence et ultrasons.', ar: 'شد البشرة بالترددات الراديوية والموجات فوق الصوتية.' } },
    { name: { fr: 'Traitement double menton', ar: 'علاج الذقن المزدوجة' }, desc: { fr: "Réduction et redéfinition de l'ovale du visage.", ar: 'تقليل وإعادة تحديد ملامح الوجه.' } },
  ],
  antiAge: [
    { name: { fr: 'Injections Botox®', ar: 'حقن البوتوكس®' }, desc: { fr: "Lissage des rides d'expression pour un regard rafraîchi et naturel.", ar: 'تنعيم تجاعيد التعبير للحصول على إطلالة منتعشة وطبيعية.' } },
    { name: { fr: 'Acide hyaluronique', ar: 'حمض الهيالورونيك' }, desc: { fr: 'Restauration du volume et redéfinition des contours du visage.', ar: 'استعادة الحجم وإعادة تحديد ملامح الوجه.' } },
    { name: { fr: 'Peeling chimique', ar: 'التقشير الكيميائي' }, desc: { fr: 'Renouvellement cellulaire intense pour un teint unifié et lumineux.', ar: 'تجديد خلوي مكثف للحصول على بشرة موحدة ومشرقة.' } },
    { name: { fr: 'PRP (Plasma Riche en Plaquettes)', ar: 'البلازما الغنية بالصفائح (PRP)' }, desc: { fr: 'Régénération naturelle par les propres facteurs de croissance du patient.', ar: 'تجديد طبيعي باستخدام عوامل النمو الخاصة بالمريضة.' } },
  ],
  laser: [
    { name: { fr: 'Épilation laser Clarity', ar: 'إزالة الشعر بليزر Clarity' }, desc: { fr: 'Épilation définitive sur toutes les zones, toutes les carnations.', ar: 'إزالة نهائية لجميع المناطق وجميع درجات البشرة.' } },
    { name: { fr: 'Traitement taches pigmentaires', ar: 'علاج البقع الجلدية' }, desc: { fr: 'Effacement des taches solaires et de vieillesse par laser.', ar: 'إزالة بقع الشمس وبقع التقدم في السن بالليزر.' } },
    { name: { fr: 'Rajeunissement cutané', ar: 'تجديد شباب البشرة' }, desc: { fr: 'Stimulation du collagène et lissage global par laser fractionné.', ar: 'تحفيز الكولاجين وتنعيم شامل بالليزر التجزيئي.' } },
    { name: { fr: 'Traitement acné & cicatrices', ar: 'علاج حب الشباب والندبات' }, desc: { fr: "Réduction des séquelles d'acné et remodelage des cicatrices.", ar: 'تقليل آثار حب الشباب وتحسين مظهر الندبات.' } },
  ],
}

export const credentialsData: Bi[] = [
  { fr: "Diplôme d'État de Docteur en Médecine", ar: 'دكتوراه في الطب (شهادة دولة)' },
  { fr: 'DES en Médecine Esthétique & Morphologique', ar: 'دراسات عليا متخصصة في طب التجميل والشكل' },
  { fr: 'Certification Laser Clarity — Protocoles avancés', ar: 'شهادة في تقنية ليزر Clarity — بروتوكولات متقدمة' },
  { fr: 'Formation internationale en techniques anti-âge', ar: 'تكوين دولي في تقنيات مكافحة الشيخوخة' },
  { fr: 'Membre de la SFME (Société Française de Médecine Esthétique)', ar: 'عضو في الجمعية الفرنسية لطب التجميل (SFME)' },
]

export const galleryCasesData: { label: Bi; before: Bi; after: Bi }[] = [
  { label: { fr: 'Remodelage du menton', ar: 'نحت الذقن' }, before: { fr: 'Double menton marqué', ar: 'ذقن مزدوجة واضحة' }, after: { fr: 'Ovale affiné & redéfini', ar: 'ملامح وجه أدق وأكثر تحديدًا' } },
  { label: { fr: 'Acide hyaluronique lèvres', ar: 'حمض الهيالورونيك للشفاه' }, before: { fr: 'Volume insuffisant', ar: 'حجم غير كافٍ' }, after: { fr: 'Lèvres harmonieuses & naturelles', ar: 'شفاه متناسقة وطبيعية' } },
  { label: { fr: 'Remodelage du profil', ar: 'نحت ملامح الوجه' }, before: { fr: 'Profil déséquilibré', ar: 'ملامح غير متوازنة' }, after: { fr: 'Contours harmonisés', ar: 'ملامح متناسقة' } },
]

export const offersData: { desc: Bi; badge: Bi | null }[] = [
  { desc: { fr: 'Corps complet + bras offerts', ar: 'الجسم كامل + الذراعين مجانًا' }, badge: { fr: 'POPULAIRE', ar: 'الأكثر طلبًا' } },
  { desc: { fr: 'Zones intimes + maillot offert', ar: 'المناطق الحساسة + منطقة البكيني مجانًا' }, badge: null },
  { desc: { fr: 'Visage complet + lèvres offertes', ar: 'الوجه كامل + الشفاه مجانًا' }, badge: { fr: 'NOUVEAU', ar: 'جديد' } },
]

const zone = (fr: string, ar: string): Bi => ({ fr, ar })
export const zonesDict = {
  jambesCompletes: zone('Jambes complètes', 'الساقين كاملتين'),
  demiJambes: zone('Demi-jambes', 'نصف الساقين'),
  demiBras: zone('Demi-bras', 'نصف الذراعين'),
  maillot: zone('Maillot', 'منطقة البكيني'),
  aisselles: zone('Aisselles', 'الإبطين'),
  sillonInterFessier: zone('Sillon inter-fessier', 'الأخدود بين الأليتين'),
  sillonsInterFessiers: zone('Sillons inter-fessier', 'الأخدود بين الأليتين'),
  levreSuperieure: zone('Lèvre supérieure (Moustache)', 'الشفة العليا (الشارب)'),
  ligneMediane: zone('Ligne médiane', 'الخط الأوسط'),
}

export const packagesData: {
  subtitle: Bi
  badge: Bi | null
  zones: Bi[]
  offert: Bi[]
}[] = [
  {
    subtitle: { fr: 'Corps & zones mixtes', ar: 'الجسم ومناطق متعددة' },
    badge: { fr: 'POPULAIRE', ar: 'الأكثر طلبًا' },
    zones: [zonesDict.jambesCompletes, zonesDict.maillot, zonesDict.aisselles, zonesDict.sillonsInterFessiers],
    offert: [zonesDict.levreSuperieure, zonesDict.ligneMediane],
  },
  {
    subtitle: { fr: 'Zones intimes', ar: 'المناطق الحساسة' },
    badge: null,
    zones: [zonesDict.aisselles, zonesDict.maillot, zonesDict.sillonInterFessier],
    offert: [zonesDict.ligneMediane, zonesDict.levreSuperieure],
  },
  {
    subtitle: { fr: 'Demi-corps', ar: 'نصف الجسم' },
    badge: null,
    zones: [zonesDict.demiJambes, zonesDict.maillot, zonesDict.aisselles, zonesDict.sillonsInterFessiers],
    offert: [zonesDict.levreSuperieure, zonesDict.ligneMediane],
  },
  {
    subtitle: { fr: 'Corps complet', ar: 'الجسم كامل' },
    badge: { fr: 'BEST VALUE', ar: 'الأفضل قيمة' },
    zones: [zonesDict.demiBras, zonesDict.demiJambes, zonesDict.maillot, zonesDict.aisselles, zonesDict.sillonsInterFessiers],
    offert: [zonesDict.levreSuperieure, zonesDict.ligneMediane],
  },
]

export const contactInfoData: { titleKey: DictKey; content: string; subKey: DictKey }[] = [
  { titleKey: 'callUs', content: '0699 99 20 07', subKey: 'callUsHours' },
  { titleKey: 'labelEmail', content: 'dr.esthetic.sba@gmail.com', subKey: 'emailUsSub' },
  { titleKey: 'ourAddress', content: '', subKey: 'addressSub' }, // content translated via footerAddress
]

// ─── Contexte React ─────────────────────────────────────────────────────────

interface LangContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: DictKey) => string
  bi: (item: Bi) => string
}

const LangContext = createContext<LangContextValue | null>(null)

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('FR')
  const t = (key: DictKey) => dict[key][lang === 'AR' ? 'ar' : 'fr']
  const bi = (item: Bi) => item[lang === 'AR' ? 'ar' : 'fr']
  return <LangContext.Provider value={{ lang, setLang, t, bi }}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within a LangProvider')
  return ctx
}
