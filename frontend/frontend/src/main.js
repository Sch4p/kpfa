import { createApp } from 'vue';
import App from './App.vue';
import router from './router';


import { createI18n } from 'vue-i18n';
import { createPinia } from 'pinia';


import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './assets/styles.css';
//import { values } from 'core-js/core/array';

// Define translations
const messages = {
  en: {
    auth: {
      username: "Username",
      email:    "Email",
      password: "Password",
      confirm_password: "Confirm Password",
      login:            "Login",
      register: "Register",
      submit:         "Sign Up", 
      already_account: "Already Have an Account?",
      dont_have_account: "Don't Have an Account?",
      forgot_password: "Forgot Password?",
      logout: "Logout",
    },

    players: {
      title: "Our Players",
      name: "Name",
      age: "Age",
      position: "Position",
    },
    
    
    teams: {
      title: "Our Teams",
      coach: "Coach",
      founded: "Founded",
      men: "Men",
      women: "Women",
      junior: "Junior",
    
    },

    player:{
      search: "Search by player name",
      position: "Position",
      country: "Country"
      
    },

    our_team: {
      men_squad: "Men's Squad (U-21)",
      women_squad: "Women's Squad (U-21)",
      junior_squad: "Junior Squad (U-17)",
    },

    eshop: {
      heading: "KPFA OFFICIAL STORE",
      subhead: "Top-Quality Football Kits and General Sports Merchandise",
      category: "Category",
      search: "Search",
      go: "Go",
      reset: "Reset Filters",
      cart: "Cart"
    },

 
    matches: {
      list: "View All Matches",
      upcoming: "Upcoming Match",
      upcoming_fixtures: "Fixtures",
      recent: "Recent Matches",
      date: "Date",
      time: "time",
      location: "Location",
      score: "Score",
      home_team: "Home",
      men:"Men",
      women: "Women",
      junior: "Junior",
      away_team: "Away",
    },

    news: {
      title: "Latest News",
      read_more: "Read More",
      comments: "Comments",
      hide_comments: "Hide Comments",
      show_comments: "Show Comments",
      back_to_list: "Back To News Page",

     
      
    },


 

    comments: {
      placeholder: "Write a comment...",
      post: "Post Comment",
      login_to_comment: "Please log in to comment.",
      no_comment_yet: "No comments yet. Be the first!",
      reply: "Reply",
    },

    navbar: {
      home: "Home",
      players: "Players",
      teams: "Teams",
      matches: "Matches",
      videos: "Videos",
      news: "News",
      eshop: "eShop",
      greetings: "Welcome",
      aboutcontact: "About Us",
    },

    aboutcontact: {
      about_kpfa: "About Kutty Philips Football Academy",
      contact_us: "Contact Us",
      cu_content: "We’d love to hear from you! Please reach out to us using the form below or via our contact details.",
      form_fname: "Full name",
      form_email: "Email",
      form_msg:"Message",
      form_pn:  "Enter your full name",
      form_pe:  "Enter your email",
      form_pm:  "Write your message...",
      form_button: "Send Message",
      academy_address: "Academy Address",
      abt1: "At",
      abt2: "Kutty Philips Football Academy",
      abt3: ", we are committed to nurturing the next generation of football talents.",
      abt4: "Our mission is to combine technical excellence with education, discipline,",
      abt5: " and teamwork to produce top-performing athletes on and off the pitch.",
      vision_title: "Our Vision",
      mission_title: "Our Mission",
      core_values_title: "Core Values",
      vision: "To become Africa’s leading football talent academy, producing players that excel globally.",
      mission: "To develop skilled, disciplined, and educated footballers who embody sportsmanship and excellence.",
      core_values: "Integrity, Teamwork, Discipline, and Continuous Growth"
    },

    banner: {
      title: "Kutty Philips Football Academy",
      tagline: '"Nurturing Young Talents, Building Future Champions"',
      building_champions: "Building Champions of Tomorrow",
      
    },

    form: {
      header: "Application Form for Kutty Philips Football Academy",
      candidate_info_title: "Candidate Information",
      first_name: "First Name",
      surname: "Surname",
      date_of_birth: "Date of Birth",
      gender: "Gender",
      country_code: "Country Code",
      phone_number: "Phone Number",
      email: "Email",
      state_of_origin: "State of Origin",
      country: "Country",
      position: "Preferred Position",
      team: "Team",
      profile_picture: "Profile Picture (Optional)",
      guardian_info_title: "Guardian Information",
      guardian_info_note: "(This section MUST be filled if the candidate is under 18 Years Old)",
      guardian_name: "Guardian's Name",
      guardian_contact_code: "Guardian's Country Code",
      guardian_contact_number: "Guardian's Contact Number",
      guardian_email: "Guardian's Email",
      address: "Address",
      guardian_address: "Guardian's Address",
      submit: "Submit Application",

      holder: {
        select_code: "Select Code",
        select_country: "Select Country",
        select_state: "Select State",
        select_team: "Select Team",
        select_position: "Select Position",
        choose_file: "Choose File",
        no_file: "No file chosen",

      },
      errors: { 
        first_name: "First name is required",
        surname: "Surname is required",
        date_of_birth:  "Date of Birth is required",
        gender:   "Gender is required",
        phone_country_code: "Phone Code is required",
        phone_number: "Phone number is required",
        email:  "Email is required",
        state_of_origin: "State is required",
        country: "Country is required",
        address: "Address is required",
        position: "Preferred Position is required",
        team: "Team Selection is required",
        guardian_name: "Guardian name is required",
        guardian_contact_code: "Guardian Code is required",
        guardian_contact_number: "Guardian phone is required",
        guardian_email: "Guardian email is required",
        guardian_address: "Guardian address is required",
      },
    },
    home_subheaders: {
      about_us: "About Us",
      about_us_cont: "Kutty Philips Football Academy nurtures young football talents through structured coaching, education, and mentorship — combining fitness, technique and character development to build tomorrow’s champions.",
      our_teams: "Our Teams",
      upcoming_matches: "Upcoming Matches",
      news_videos: "News and Video Highlights",
      kpfa_eshop: "KPFA eShop Highlights",
    },
      
    buttons: {
      join: "Join Us Now",
      login: "Sign-Up/Login",
      visit_eshop:  "Visit eShop",
      view_teams: "View Teams",
      view_team: "View Team",
      view: "View",
      add_to_cart: "Add",
      view_products: "View All Products",
      home_videos: "See All Videos",
      loadmore:"Load More",
    },

    product: {
      buy_now: "Buy Now",
      qnty: "Quantity",
      reviews:"Reviews",
      no_reviews:"No reviews yet",
    },

 

    cta_banner: {
      title: "Ready to join the next generation of champions?",

    },

    footer: {
      copyright: "© 2025 Kutty Philips Football Academy. All rights reserved.",
      developer: "Developed by Schap Systems."
    },
  },
  fr: {

    auth: {
      username: "Nom d’utilisateur",
      email: "Email",
      password: "Mot de passe",
      confirm_password: "Confirmer le mot de passe",
      login: "Connexion",
      register: "S’inscrire",
      submit: "Soumettre",
      already_account: "Vous avez déjà un compte ?",
      forgot_password: "Mot de passe oublié ?",
      dont_have_account:"Vous n’avez pas de compte ?",
      logout:"Se déconnecter",
    },
    players: {
      title: "Nos Joueurs",
      name: "Nom",
      age: "Âge",
      position: "Poste"
    },
    teams: {
      title: "Nos Équipes",
      coach: "Entraîneur",
      founded: "Fondé",
      men: "Hommes",
      women: "Femmes",
      junior: "Jeunes",
      

    },
   player:{
      seacrh: "Rechercher par nom du joueur",
      position: "Poste",
      country: "Pays"
      
    },


    our_team: {
      men_squad: "Équipe masculine",
      women_squad: "Équipe féminine",
      junior_squad: "Équipe junior",
    },

    
    eshop: {
      heading: "Boutique officielle KPFA",
      subhead: "Équipements de football de haute qualité et articles de sport généraux",
      category: "Catégorie",
      search: "	Rechercher",
      go: "Aller",
      reset: "Réinitialiser les filtres",
      cart: "	Panier"
    },

    matches: {
      list: "Voir tous les matchs",
      upcoming: "Match à venir",
      upcoming_fixtures: "Matchs à Venir",
      recent: "Matchs récents",
      date: "Date",
      time: "Heure",
      location: "Lieu",
      score: "Score",
      men: "masculine",
      women: "féminine",
      junior: "junior",
      home: "Domicile",
      away: "Extérieure",
      home_team: "Équipe Domicile",
      away_team: "Équipe Extérieure",
    },
    news: {
      title: "Dernières Nouvelles",
      read_more: "Lire la suite",
      comments: "Commentaires",
      hide_comments: "",
      show_comments: "",
      
  
    },
    comments: {
      placeholder: "Écrire un commentaire...",
      post: "Publier un commentaire",
      login_to_comment: "Veuillez vous connecter pour commenter.",
      reply: "Répondre",
    },

    navbar: {
      home: "Accueil",
      teams: "Équipes",
      matches: "Matchs",
      news: "Actualités",
      videos:"Vidéos",
      eshop: "Boutique en ligne",
      aboutcontact: "À propos de nous",
      greetings: "Bienvenue",
    },

    aboutcontact: { 
      about_kpfa: "À propos de l'Académie de Football Kutty Philips",
      contact_us: "Contactez-nous",
      cu_content:"Nous serions ravis d’avoir de vos nouvelles ! Veuillez nous contacter en utilisant le formulaire ci-dessous ou nos coordonnées.", 
      form_fname: "Nom complet",
      form_email: "E-mail",
      form_msg:"Message",
      form_pn:  "Entrez votre nom complet",
      form_pe:  "Entrez votre e-mail",
      form_pm:  "Écrivez votre message...",
      form_button: "Envoyer le message",
      academy_address: "Adresse de l’Académie",
      abt1: "À",
      abt2: "l’Académie de Football Kutty Philips,",
      abt3: " nous nous engageons à former la prochaine génération de talents du football.",
      abt4: "Notre mission est de combiner l’excellence technique avec l’éducation, la discipline",
      abt5: " et l’esprit d’équipe pour produire des athlètes performants sur le terrain comme en dehors.",
      vision_title: "Notre Vision",
      mission_title: "Notre Mission",
      core_values_title: "Nos Valeurs Fondamentales",
      vision: "Devenir la principale académie de football en Afrique, formant des joueurs qui excellent à l’échelle mondiale.",
      mission: "Former des footballeurs compétents, disciplinés et instruits qui incarnent l’esprit sportif et l’excellence.",
      core_values: "Intégrité, travail d’équipe, discipline et croissance continue.",
    },

    banner: {
      title: "Académie de Football KPFA",
      tagline: '"Former les jeunes talents, Construire les champions de demain"', // to be changed to "Former les jeunes talents, Construire les champions de demain"
      building_champions: "Former les champions de demain",
    },

    form: {
      header: "Formulaire de candidature pour l'Académie de Football Kutty Philips",
      candidate_info_title: "Informations du candidat",
      first_name: "Prénom",
      surname: "Nom",
      date_of_birth: "Date de naissance",
      gender: "",
      country_code: "Indicatif du pays",
      phone_number: "Numéro de téléphone",
      email: "Email",
      state_of_origin: "État d'origine",
      country: "Pays",
      position: "Position préférée",
      team: "Équipe",
      profile_picture: "Photo de profil (Optionnelle)",
      guardian_info_title: "Informations sur le tuteur",
      guardian_info_note: "(Cette section DOIT être remplie si le candidat a moins de 18 ans)",
      guardian_name: "Nom du tuteur",
      guardian_contact_code: "Indicatif du pays du tuteur",
      guardian_contact_number: "Numéro du tuteur",
      guardian_email: "Email du tuteur",
      address: "Adresse",
      guardian_address: "Adresse du tuteur",
      submit: "Soumettre la candidature", // to be changed to "Soumettre la candidature"


      holder: {
        select_code: "Sélectionner le code",
        select_country: "Sélectionner le pays",
        select_state: "Sélectionner l'état",
        select_team: "Sélectionner l'équipe",
        select_position: "Sélectionner la position",
        choose_file: "Choisir le fichier",
        no_file: "Aucun fichier choisi"
      },

      errors: {
       
        first_name: "Le prénom est requis.",
        surname: "Le nom de famille est requis.",
        date_of_birth: "La date de naissance est requise.",
        gender:   "Le genre est requis",
        phone_country_code: "L'indicatif téléphonique est requis.",
        phone_number: "Le numéro de téléphone est requis.",
        email: "L'adresse e-mail est requise.",
        state_of_origin: "L'état est requis.",
        country: "Le pays est requis.",
        address: "adresse est requise.",
        position: "Le poste préféré est requis.",
        team: "La sélection de l'équipe est requise.",      
        guardian_name: "Le nom du tuteur est requis.",
        guardian_contact_code: "L'indicatif téléphonique du tuteur est requis.",
        guardian_contact_number: "Le numéro de téléphone du tuteur est requis.",
        guardian_email: "L'adresse e-mail du tuteur est requise.",
        guardian_address: "L'adresse du tuteur est requise.",
      

      },
    },

    home_subheaders: {
      about_us: "About Us",
      about_us_cont:"L'Académie de Football Kutty Philips forme les jeunes talents du football grâce à un encadrement structuré, une éducation et un mentorat — combinant forme physique, technique et développement du caractère pour façonner les champions de demain.",
      our_teams: "Our Teams",
      upcoming_matches: "Upcoming Matches",
      news_videos: "Actualités et faits saillants vidéo",
      kpfa_eshop: "Points forts de la boutique KPFA",
    },
    buttons: {
      join: "Rejoignez-nous",
      login: "S'inscrire/Se connecter",
      visit_eshop:  "Visitez la boutique en ligne",
      view_teams: "Voir les équipes",
      view_team: "Voir l'équipe",
      view: "Voir",
      add_to_cart: "Ajouter",
      view_products: "Voir tous les produits",
      home_videos: "Derniers extraits vidéo",
      loadmore: "Charger plus",
    },
    product: {
      buy_now: "Acheter maintenant",
      qnty: "Quantité",
      reviews:"Avis",
      no_reviews:"Pas encore d'avis",
      
    },

    cta_banner: {
      title: "Prêt(e) à rejoindre la prochaine génération de champions ?",

    },

    footer: {
      copyright: "© 2025 Académie de football Kutty Philips. Tous droits réservés.",
      developer: "Développé par Schap Systems.",
    },

  },
  yo: { // Yoruba

    auth: {
      username: "Orukọ olumulo",
      email: "Imeeli",
      password: "Ọrọ aṣíri",
      confirm_password: "Jẹ́risi Ọrọ aṣíri",
      login: "Wọlé",
      register: "Forúkọsílẹ̀",
      submit: "Fọwọ́sí",
      already_account: "Ṣe o ti ní àkọọ́lẹ̀ tẹlẹ?",
      dont_have_account: "Ṣe o ní àkọọ́lẹ̀?",
      forgot_password: "Gbagbe Ọrọ aṣíri?",
      logout: "Jade",
    },

    players: {
      title: "Àwọn Ẹlẹsẹ̀ Wa",
      name: "Orúkọ",
      age: "Ọjọ́ orí",
      position: "Ipò"
    },

    
    teams: {
      title: "Àwọn Ẹgbẹ́ Wa",
      coach: "Olùkọ́ni",
      founded: "Ti dá sílẹ̀",
      men: "Ọkùnrin",
      women: "Obirin",
      junior:"Omode",
    },

    player:{
      seacrh: "Wa nipasẹ orukọ ẹrọ orin",
      position: "Ipo",
      country: "Orilẹ̀-èdè"
      
    },

    our_team: {
      men_squad: "	Ẹgbẹ́ àwọn ọkùnrin",
      women_squad: "Ẹgbẹ́ àwọn obìnrin",
      junior_squad: "Ẹgbẹ́ àwọn Omode",
    },

    eshop: {
      heading: "Ile itaja osise KPFA",
      subhead: "	Àwọ̀n aṣọ bọ́ọ̀lù tó dára jù lọ àti àwọn nǹkan eré idaraya gbogbogbò",
      category: "Ẹ̀ka",
      search: "Wa",
      go: "Lọ",
      reset: "Tun àyẹ̀wò pada",
      cart: "Aṣọjà"
    },

    matches: {
      list: "Wo gbogbo awọn ere",
      upcoming: "Eré tó ń bọ̀",
      upcoming_fixtures: "Awọn Eré Tó ń Bọ̀",
      recent: "Àwọn Eré tó ṣẹ̀ṣẹ̀ ṣẹlẹ̀",
      date: "Ọjọ́",
      time: "Àkókò",
      location: "Ibi",
      score: "Àbájáde",
      men: "Ọkùnrin",
      women: "Ọbìnrin",
      junior: "Omode",
      home: "Ilé",
      away: "ita",
      home_team: "Ẹgbẹ́ Ilé",
      away_team: "Ẹgbẹ́ Àlejò"
    },

    news: {
      title: "Ìròyìn Tó Ṣẹ́yìn",
      read_more: "Ka Síi",
      comments: "Àwọn Àlàyé",
      log_in_to_comment: "Jọ̀wọ́ wọlé kí o lè sọ àlàyé.",
       hide_comments: "",
      show_comments: "",
  
    },
    comments: {
      placeholder: "Kọ àlàyé kan...",
      post: "Fọwọ́si Àlàyé",
      login_to_comment: "Jọ̀wọ́ wọlé kí o lè sọ àlàyé.",
      no_comment_yet: "Kò sí àlàyé kankan sibẹ̀. Ṣe ẹni àkọ́kọ́!",
      reply: "Dáhùn",
    },

    navbar: {
      home: "Ile",
      teams: "Awon Egbe",
      matches: "Awon Idije",
      news: "Iroyin",
      eshop: "Ibi Isowo",
      videos: "Fídíò",
      aboutcontact: "Nipa Wa",
      greetings: "Káàbọ̀",
    },


    aboutcontact: {
      about_kpfa: "Nípa Ile-ẹ̀kọ́ Bọ́ọ̀lù Kutty Philips",
      contact_us: "Kan Sí Wa",
      cu_content: "A yoo fẹ lati gbọ lati ọdọ rẹ! Jọwọ kan si wa nipa fọọmu ti o wa ni isalẹ tabi nipa awọn alaye olubasọrọ wa.",
      form_fname: "Orukọ kikun ",
      form_email: "Imeeli ",
      form_msg:"Ifiranṣẹ",
      form_pn:  "Tẹ orukọ kikun rẹ",
      form_pe:  "Tẹ imeeli rẹ",
      form_pm:  "Kọ ifiranṣẹ rẹ...",
      form_button: "Firanṣẹ",
      academy_address: "Àdírẹ́sì Ilé-ẹ̀kọ́",
      abt1: "",
      abt2: "Nílé-ẹ̀kọ́ bọ́ọ̀lù Kutty Philips,",
      abt3: "  a jẹ́wọ́ pé a máa tọ́jú ìran tuntun ti àwọn olóṣèré bọ́ọ̀lù. Ìpinnu wa ni láti darapọ̀",
      abt4: "àṣeyọrí nípa imọ̀ ẹ̀rọ pẹ̀lú ẹ̀kọ́, ìdánilẹ́kọ̀ọ́, àti ìṣọ̀kan láti ṣe àfihàn àwọn aṣáájú tó dára jù lọ níta àti nínú pápá.",
      abt5:"",
      vision_title: "Ọ̀nà ànfàní Wa", 
      mission_title: "Ìpinnu Wa",
      core_values_title: "Àwọn Iye Pataki Wa",
      vision: "Láti di ile-ẹkọ́ agbábọ́ọ̀lù tó ga jùlọ ní Afirika, tí ń ṣe àgbékalẹ̀ àwọn agbábọ́ọ̀lù tó ń ṣàṣeyọrí káàkiri ayé.",
      mission: "Láti ṣe àgbékalẹ̀ àwọn agbábọ́ọ̀lù tó ní ọgbọ́n, tó ní ìdákẹ́jẹ, tí wọ́n sì ní ẹ̀kọ́, tí ń ṣàfihàn ìwà rere àti àṣeyọrí.",
      core_values: "Iwà rere, iṣèpọ̀, ìdákẹ́jẹ, àti ìdàgbàsókè títílọ́.",
    },
    banner: {
      title: "Ile-ẹkọ́ Bọọlu Kutty Philips",
      tagline: '"Ntọ́jú awọn ọmọde lati di irawọ ọjọ́ iwájú"', // to be changed 
      building_champions: "Kíkọ àwọn aṣáájú ọ̀la",
    },
    form: {
      candidate_info_title: "Alaye Oludije",
      header: "Fọọmu Ìforúkọsílẹ̀ fún Ile-ẹkọ́ Bọọlu Kutty Philips", 
      first_name: "Orukọ àkọ́kọ́",
      surname: "Orukọ ìdílé",
      date_of_birth: "Ọjọ́ ìbí",
      gender: "Ìbálòpọ̀",
      country_code: "Koodu Orílẹ̀-èdè",
      phone_number: "Nọmba Foonu",
      email: "Imeeli",
      state_of_origin: "Ìpínlẹ̀",
      country: "Orilẹ̀-èdè",
      position: "Ipo Ayanfẹ",
      team: "Ẹgbẹ́",
      profile_picture: "Aworan Profaili (Aṣayan)",
      guardian_info_title: "Alaye Olùtọ́jú",
      guardian_info_note: "(Apá yìí GBỌ́DỌ̀ kún tí oludije bá jẹ́ abẹ́ ọjọ́-ori 18)",
      guardian_name: "Orukọ Olùtọ́jú",
      guardian_contact_code: "Koodu Orílẹ̀-èdè Olùtọ́jú",
      guardian_contact_number: "Nọmba Olùtọ́jú",
      guardian_email: "Imeeli Olùtọ́jú",
      address: "Adirẹsi",
      guardian_address: "Adirẹsi Olùtọ́jú",
      submit: "Firanṣẹ",

      holder: {
        select_code: "Yan Koodu",
        select_country: "Yan Orilẹ̀-èdè",
        select_state: "Yan Ìpínlẹ̀",
        select_team: "Yan Ẹgbẹ́",
        select_position: "Yan Ipo",
        choose_file: "Yan Faili",
        no_file: "Kò sí faili tí a yàn" ,

      },
      errors: {
        first_name: "Orukọ akọkọ jẹ dandan.",
        surname: "Orukọ idile jẹ dandan.",
        date_of_birth:  "Ọjọ ibi jẹ dandan.",
        gender: "Ìbálòpọ̀ jẹ́ dandan",
        phone_country_code: "Koodu foonu jẹ dandan.",
        phone_number: "Nọmba foonu jẹ dandan.",
        email:  "Imeeli jẹ dandan.",
        state_of_origin: "Ipinle jẹ dandan.",
        country: "Orilẹ-ede jẹ dandan.",
        address: "Adirẹsi jẹ dandan.",
        position: "Ipo ayanfẹ jẹ dandan.",
        team: "Yiyan ẹgbẹ jẹ dandan.",
        guardian_name: "Orukọ alabojuto jẹ dandan.",
        guardian_contact_code: "Koodu foonu alabojuto jẹ dandan.",
        guardian_contact_number: "Nọmba foonu alabojuto jẹ dandan.",
        guardian_email: "Imeeli alabojuto jẹ dandan.",
        guardian_address: "Adirẹsi alabojuto jẹ dandan."

      },

    },

    home_subheaders: {
      about_us: "About Us",
      about_us_cont:"Ile-ẹ̀kọ́ Bọ́ọ̀lù Kutty Philips n tọ́jú àwọn ọmọ ọdẹ bọ́ọlu nípasẹ̀ ikẹ́kọ̀ọ́ tó dálórí àtẹ̀jáde, ẹ̀kọ́ àti ìtọ́sọ́nà — pẹ̀lú amúgbálẹgbẹ́, ọgbọ́n ìdárayá àti ìdàgbàsókè ìwà rere láti dá àwọn aṣáájú ọjọ́ ọ̀la.",
      our_teams: "Our Teams",
      upcoming_matches: "Upcoming Matches",
      news_videos: "Ìròyìn àti àfihàn fidíò pàtàkì",
      kpfa_eshop: "Àwọn àfihàn pàtàkì ti ile itaja KPFA",
    },
    buttons: {
      join: "Darapọ mọ Wa",
      login: "Forukọsilẹ/Wọlé",
      visit_eshop:  "Ṣàbẹwò Si Itaja Ori Ayelujara",
      view_teams: "Wo Awọn Ẹgbẹ",
      view_team: "Wo Ẹgbẹ́",
      view: "Wo",
      add_to_cart: "Fi Kun",
      add: "Fi Kun",
      view_products: "Wo Gbogbo Awọn Ọja",
      home_videos: "Àfihàn Fidio tuntun",
      loadmore: "Gbe diẹ sii",

    },

    product: {
      buy_now: "Ra nísinsin yìí",
      qnty: "Iye",
      reviews:"Àtúnwò",
      no_reviews:"Ko si àtúnwò kankan nísin",
    },

    cta_banner: {
      title: "Ṣe o ti ṣetan lati darapọ mọ iran tuntun ti awọn aṣaju?",
    },

    footer: {
      copyright: "© 2025 Ile-ẹ̀kọ́ Bọ́ọ̀lù Kutty Philips. Gbogbo ẹ̀tọ́ jẹ́ ti a dáàbò bo.",
      developer:  "Ti a ṣe nipasẹ Schap Systems.",
    },
  },
  ha: { // Hausa

    auth: {
      username: "Sunan mai amfani",
      email: "Imel",
      password: "Kalmar sirri",
      confirm_password: "Tabbatar da Kalmar sirri",
      login: "Shiga",
      register: "Yi rijista",
      submit: "Aika",
      already_account: "Kana da asusu?",
      forgot_password: "Ka manta kalmar sirri?",
      dont_have_account: "Ba ka da asusu ba?",
      logout: "Fita",
    },
    players: {
      title: "’Yan wasanmu",
      name: "Suna",
      age: "Shekara",
      position: "Matsayi"
    },
    teams: {
      title: "Kungiyoyinmu",
      coach: "Koci",
      founded: "An kafa",
      men: "Maza",
      women: "Mata",
      junior:"Yara",
    },

    player:{
      seacrh: "Nema ta sunan ɗan wasa",
      position: "Matsayi",
      country: "Ƙasa",
      
    },

    our_team: {
      men_squad: "Ƙungiyar maza",
      women_squad: "Ƙungiyar mata",
      junior_squad: "Ƙungiyar yara ƙanana",
    },

    eshop: {
      heading: "Amintaccen Shagon KPFA",
      subhead: "Kayan kwallon ƙafa masu inganci da kayan wasanni gaba ɗaya",
      category: "Rukuni",
      search: "Nema",
      go: "Je",
      reset: "Sake tacewa",
      cart: "Kwando"
    },

    matches: {
      list: "Duba dukkan wasanni",
      upcoming: "Wasan Gaba",
      upcoming_fixtures: "Wasannin Gaba",
      recent: "Sababbin Wasanni",
      date: "Kwanan Wata",
      time: "lokacin Wasa",
      location: "Wurin Wasa",
      score: "Sakamako",
      men: "Maza",
      women: "Mata",
      junior: "Yara",
      home: "Gida",
      away: "Baƙi",
      home_team: "Kungiyar Gida",
      away_team: "Kungiyar Baƙi"
    },
    news: {
      title: "Labarai Na Baya-Bayan Nan", 	
      read_more: "Kara Karantawa",
      comments: "Sharhi",
      hide_comments: "",
      show_comments: "",
      
 
    },
    comments: {
      placeholder: "Rubuta sharhi...",
      post: "Aika Sharhi",
      login_to_comment: "Da fatan ka shiga don rubuta sharhi.",
      no_comment_yet:  "Babu sharhi tukuna. Ka zama na farko!",
      amsa: "Amsa", 
    },

    navbar: {
      home: "Gida",
      teams: "Ƙungiyoyi",
      matches: "Wasanni",
      news: "Labarai",
      videos: "Bidiyo",
      eshop: "Kanti",
      aboutcontact: "Game Da Mu",
      greetings: "Barka da zuwa",
    },

 

    aboutcontact: {
      about_kpfa: "Game Da Makarantar Kwallon Ƙafa Ta Kutty Philips",
      contact_us: "Tuntuɓe Mu",
      cu_content: "Za mu so mu ji daga gare ku! Da fatan za a tuntuɓe mu ta hanyar fom ɗin da ke ƙasa ko ta bayanan tuntuɓar mu.",
      form_fname: "Suna da sunan mahaifi",
      form_email: "Imel",
      form_msg:"Saƙo",
      form_pn:  "Shigar da sunanka da kuma sunan mahaifinka",
      form_pe:  "Shigar da imel ɗinka",
      form_pm:  "Rubuta saƙonka...",
      form_button: "Aika Saƙo",
      academy_address: "Adireshin Makaranta",
      abt1: "",
      abt2: "A Makarantar Kwallon Ƙafa ta Kutty Philips,",
      abt3: ", mun himmatu wajen renon sabbin hazikan 'yan kwallo na gaba.",
      abt4: "Manufarmu ita ce haɗa ƙwarewar fasaha da ilimi, ladabi, da aiki tare don samar da 'yan wasa masu ƙwarewa a fili da wajen fili.",
      abt5: "",
      vision_title: "Burinmu",
      mission_title: "Manufarmu",
      core_values_title: "Muhimman ƙimominmu",
      vision: "Zama cibiyar horar da ƙwararrun 'yan kwallon kafa ta Afrika, tana samar da 'yan wasa da ke yin fice a duniya.",
      mission: "Haɓaka 'yan kwallon kafa masu ƙwarewa, ladabi, da ilimi waɗanda ke nuna halin wasanni da ƙwarewa.",
      core_values: "Gaskiya, aiki tare, ladabi, da ci gaba mai ɗorewa.",
    },

    banner: {
      title: "Makarantar Ƙwallon Ƙafa Ta Kutty Philips",
      tagline: '"Horar Da Matasa Su Zama Taurarin Gobe"',
      building_champions: "Gina Zakarun Gobe",
      
    },
    form: {
      header: "Fom Ɗin Shiga Makarantar Ƙungiyar Ƙwallon Ƙafa Ta Kutty Philips",
      candidate_info_title: "Bayanin Ɗan Wasa", 
      first_name: "Sunan Farko",
      surname: "Sunan Ƙarshe",
      date_of_birth: "Ranar Haihuwa",
      gender: "Jinsi",
      country_code: "Lambar Ƙasa",
      phone_number: "Lambar Waya",
      email: "Imel",
      state_of_origin: "Jihar Asali",
      country: "Ƙasa",
      position: "Matsayi Da Aka Fi So",
      team: "Ƙungiya",
      profile_picture: "Hoton Ɗan Wasa (Zaɓi)",
      guardian_info_title: "Bayanin Mai Kula",
      guardian_info_note: "(Wannan sashe DOLE a cika idan ɗan wasa yana ƙasa da shekaru 18)",
      guardian_name: "Sunan Mai Kula",
      guardian_contact_code: "Lambar Ƙasa Ta Mai Kula",
      guardian_contact_number: "Lambar Mai Kula",
      guardian_email: "Imel Ɗin Mai Kula",
      address: "Adireshi",
      guardian_address: "Adireshin Mai Kula",
      submit: "Tura",

      holder: {
        select_code: "Zaɓi Lamba",
        select_country: "Zaɓi Ƙasa",
        select_state: "Zaɓi Jiha",
        select_team: "Zaɓi Ƙungiya",
        select_position: "Zaɓi Matsayi",
        choose_file: "Zaɓi Fayil",
        no_file: "Babu fayil ɗin da aka zaɓa"
      },

      errors: {	
        first_name: "Sunan farko yana da muhimmanci.",
        surname: "Sunan mahaifi yana da muhimmanci.",
        date_of_birth:  "Ranar haihuwa tana da muhimmanci.",
        gender: "Jinsi yana da muhimmanci",
        phone_country_code: "Lambar wayar ƙasa tana da muhimmanci.",
        phone_number: "Lambar waya tana da muhimmanci.",
        email:  "Imel yana da muhimmanci.",
        state_of_origin: "Jiha tana da muhimmanci.",
        country: "Ƙasa tana da muhimmanci.",
        address: "Adireshi tana da muhimmanci.",
        position: "Matsayi da aka fi so yana da muhimmanci.",
        team: "Zaɓin ƙungiya yana da muhimmanci.",
        guardian_name: "Sunan mai kula yana da muhimmanci.",
        guardian_contact_code: "Lambar ƙasa ta mai kula tana da muhimmanci.",
        guardian_contact_number: " Lambar waya ta mai kula tana da muhimmanci.",
        guardian_email: "Imel na mai kula yana da muhimmanci.",
        guardian_address: "Adireshin mai kula tana da muhimmanci."

      },

    },  


    home_subheaders: {
      about_us: "About Us",
      about_us_cont:"Kutty Philips Football Academy na renon matasan 'yan kwallon kafa ta hanyar horo mai tsari, ilimi da jagoranci — haɗa lafiyar jiki, fasaha da haɓaka hali don gina zakarun gobe.",
      our_teams: "Our Teams",
      upcoming_matches: "Upcoming Matches",
      news_videos: "Labarai da fitattun bidiyo",
      kpfa_eshop: "Manyan abubuwa na KPFA eShop",
    },
    buttons: {
      join: "Shiga KPFA",
      login: "Yi Rijista/Shiga",
      visit_eshop:  "Ziyarci kantin yanar gizo",
      view_teams: "Duba ƙungiyoyi",
      view_team: "Duba Ƙungiya",
      view: "Duba",
      add_to_cart: "Saka a Kwandon Siyayya",
      loadmmore: "Ƙaro Yan Wasa",
      view_products: "Duba Duk Kayayyaki",
      home_videos: "Fitattun Bidiyo Na Baya-Bayan Nan",
    },
    product: {
      buy_now: "Siya Yanzu",
      qnty: "Guda Nawa",
      reviews:"Sharhi",
      no_reviews:"Babu sharhi tukunna",
    },

    cta_banner: {
      title: "A shirye kake ka shiga sabon ƙarni na zakaru?",
    },

    footer: {
      copyright: "© 2025 Makarantar Kwallon Ƙafa ta Kutty Philips. An tanadi duk haƙƙoƙi.",
      developer: "ƙira Daga Schap Systems."
    }
  },
  ig: { // Igbo

    auth: {
      username: "Aha onye ọrụ",
      email: "Email",
      password: "Okwuntughe",
      confirm_password: "Kwenye Okwuntughe",
      login: "Banye",
      register: "Debanye aha",
      submit: "Zipu",
      already_account: "Ị nwere akaụntụ?",
      forgot_password: "Chefuru okwuntughe?",
      dont_have_account: "Ị nweghị akaụntụ?",
      logout: "pụọ",
    },
    players: {
      title: "Ndị egwuregwu anyị",
      name: "Aha",
      age: "Afọ",
      position: "Ọnọdụ"
    },
    teams: {
      title: "Otu Anyị",
      coach: "Onye Nkuzi",
      founded: "E Guzobere",
      men: "Ụmụ Nwoke",
      women: "Ụmụ Nwanyị",
      junior:"Nwa Nta",
    },

    player:{
      seacrh: "Chọọ aha onye egwuregwu",
      position: "Ọnọdụ",
      country: "Ụlọ̀ọrụ̀ mba"
      
    },

    our_team: {
      men_squad: "Òtù Ụmụ Nwoke",
      women_squad: "Òtù Ụmụ Nwanyị",
      junior_squad: "Òtù Ụmụaka Nta",
    },
    eshop: {
      heading: "Ụlọ ahịa gọọmentị KPFA",
      subhead: "Ngwugwu egwuregwu bọọlụ dị elu na ngwa egwuregwu n'ozuzu",
      category: "Ụdị",
      search: "Chọ",
      go: "Gaa",
      reset: "Tọgharịa ihe nchịkọta",
      cart: "Ngwugwu ahịa"
    },

    matches: {
      list: "Lee Egwuregwu Niile",
      upcoming: "Asọmpi Na-abịa",
      upcoming_fixtures: "Egwuregwu Na-abịa",
      recent: "Egwuregwu ọhụrụ",
      date: "Ụbọchị",
      time: "Oge",
      location: "Ebe",
      score: "Nsonaazụ",
      men: "ụmụ Nwoke",
      women: "ụmụ Nwanyị",
      junior: "Nwa Nta",
      home: "Ụlọ",
      away: "Ọbịa",
      home_team: "Otu Ụlọ",
      away_team: "Otu Ọbịa"
    },
    news: {
      title: "Ozi ọhụrụ",
      read_more: "Gụọkwuo",
      comments: "Nzaghachi",
      hide_comments: "",
      show_comments: "",

    },
    comments: {
      placeholder: "Dee okwu...",
      post: "Zipu Okwu",
      login_to_comment: "Biko banye ka kọọ okwu.",
      no_comment_yet: "Ọ dịghị okwu ugbu a. Bụ onye mbụ!",
      reply: "Azịza",
    },

    navbar: {
      home: "Ụlọ",
      teams: "Ụmụotu",
      matches: "Egwuregwu",
      news: "Ozi",
      eshop: "",
      videos: "Vidiyo",
      aboutcontact: "Banyere Anyị",
      greetings: "Nnọọ",
    },

     aboutcontact: { 
      about_kpfa: "Banyere Ụlọ Akwụkwọ Bọọlụ Kutty Philips",
      contact_us: "Kpọtụrụ Anyị",
      cu_content: "Anyị ga-enwe obi ụtọ ịnụ gị! Biko kpọtụrụ anyị site na fọm dị n'okpuru ma ọ bụ site na nkọwa kọntaktị anyị.",
      form_fname: "Aha zuru ezu",
      form_email: "Email",
      form_msg:"Ozi",
      form_pn:  "Tinye aha gị zuru ezu",
      form_pe:  "Tinye email gị",
      form_pm:  "Dee ozi gị...",
      form_button: "Zipu Ozi",
      academy_address: "Adreesị ụlọ akwụkwọ",
      abt1: "",
      abt2: "Na Kutty Philips Football Academy,",
      abt3: ", anyị kwere nkwa ịzụlite ọgbọ ọhụrụ nke ndị egwuregwu bọọlụ nwere nkà.",
      abt4: "Ebumnuche anyị bụ ijikọ nka teknụzụ na agụmakwụkwọ, omume ọma, na imekọrịta ọnụ iji mepụta ndị egwuregwu kacha mma n’ime na n’èzí pitch.",
      abt5: "",
      vision_title: "Ọhụụ Anyị",
      mission_title: "Ebumnuche Anyị",
      core_values_title: "Ọrụ Aka Anyị Dị Mkpa",
      vision: "Ịghọ ụlọ akwụkwọ nka egwuregwu bọọlụ kacha elu na Afrịka, na-emepụta ndị egwuregwu na-eme nke ọma n'ụwa nile.",
      mission: "Ịzụlite ndị egwuregwu bọọlụ nwere nka, ịdị n’usoro, na mmụta, ndị na-eme mmemme egwuregwu na ịdị mma.",
      core_values: "Ịdị n’eziokwu, imekọrịta ọnụ, ịdị n’usoro, na uto na-aga n’ihu.",
    },

    banner: {
      title: "Ụlọ Akwụkwọ Bọọlụ Kutty Philips",
      tagline: '"Ịzụlite ụmụaka ka ha bụrụ kpakpando nọdịnihu"',
      building_champions: "	Ịrụpụta ndị mmeri nke echi",
    },
    form: {
      header: "Fọm Ndebanye aha maka Ụlọ Akwụkwọ Bọọlụ Kutty Philips",
      candidate_info_title: "Ozi Onye Na-achọ Ịbanye", 
      first_name: "Aha mbụ",
      surname: "Aha ezinụlọ",
      date_of_birth: "Ụbọchị ọmụmụ",
      country_code: "Koodu mba",
      phone_number: "Nọmba ekwentị",
      email: "Email",
      state_of_origin: "Steeti",
      country: "Mba",
      position: "Ọnọdụ ahọrọ",
      team: "Ụmụotu",
      profile_picture: "Foto profaịlụ (Nhọrọ)",
      guardian_info_title: "Ozi Nlekọta",
      guardian_info_note: "(A ghaghị izute akụkụ a ma ọ bụrụ na onye na-achọ ịbanye dị n'okpuru afọ 18)",
      guardian_name: "Aha onye nlekọta",
      guardian_contact_code: "Koodu mba onye nlekọta",
      guardian_contact_number: "Nọmba onye nlekọta",
      guardian_email: "Email onye nlekọta",
      address: "Adreesị",
      guardian_address: "Adreesị onye nlekọta",
      submit: "Zipu",

      holder: {
        select_code: "Họrọ Koodu",
        select_country: "Họrọ Mba",
        select_state: "Họrọ Steeti",
        select_team: "Họrọ Ụmụotu",
        select_position: "Họrọ Ọnọdụ",
        choose_file: "Họrọ Faịlụ",
        no_file: "Enweghị faịlụ ahọpụtara"
      },
    errors:{  
      first_name: "Aha mbụ dị mkpa.",
      surname: "Aha ezinụlọ dị mkpa.",
      date_of_birth:  "Ubochi amụma dị mkpa.",
      gender: "A chọrọ mkpụrụ nwoke ma ọ bụ nwanyị",
      phone_country_code: "Koodu ekwentị dị mkpa.",
      phone_number: "Nọmba ekwentị dị mkpa.",
      email:  "Email dị mkpa.",
      state_of_origin: "Steeti dị mkpa.",
      country: "Mba dị mkpa..",
      address: "Adreesị dị mkpa.",
      position: "Ọkwa masịrị gị dị mkpa.",
      team: "Nhọrọ otu dị mkpa.",
      guardian_name: "Aha onye nlekọta dị mkpa.",
      guardian_contact_code: " Koodu ekwentị onye nlekọta dị mkpa.",
      guardian_contact_number: " Nọmba ekwentị onye nlekọta dị mkpa.",
      guardian_email: " Email onye nlekọta dị mkpa.",
      guardian_address: "Adreesị onye nlekọta dị mkpa.",

    },

    }, 
    
    home_subheaders: {
      about_us: "About Us",
      about_us_cont:"Kutty Philips Football Academy na-elekọta ndị ntorobịa nwere nkà n’egwuregwu bọlsite n’ịzụlite ha n'ụzọ haziri, mmụta na nduzi — jikọtara ike, nka na mmepe agwa iji wuo ndị mmeri nke echi.",
      our_teams: "Our Teams",
      upcoming_matches: "Upcoming Matches",
      news_videos: "Akụkọ na ihe ngosi vidiyo kachasị mkpa",
      kpfa_eshop: "Ihe ngosi pụrụ iche nke KPFA eShop",
    },

    buttons: {
      join: "Soro Anyi",
      login: "Debanye aha/Banye",
      visit_eshop:  "Gaa leta ụlọ ahịa n'ịntanetị",
      view_teams: "Lelee ndị otu",
      view_team: "Lelee Otu",
      view: "Lee",
      add_to_cart: "Tinye",
      view_products: "Lelee Ngwaahịa niile",
      home_videos: "Ihe Ngosi Vidiyo Kacha Ohụrụ",
      loadmore: "Bugharịkwu ọzọ",
    },

    product: {
      buy_now: "Zụta Ugbu",
      qnty: "Ọnụ ọgụgụ",
      reviews:"Nyocha",
      no_reviews:"Enweghị nyocha ugbu a",
    },

    cta_banner: {
      title: "Ị dị njikere ịbanye n’ọgbọ ọhụrụ nke ndị mmeri?",
    },

    footer: {
      copyright: "© 2025 Ụlọ akwụkwọ bọọlụ Kutty Philips. A chekwara ikike niile.",
      developer: "E mepụtara ya site na Schap Systems."
    }
  },
  tw: { // Twi (Akan)

    auth: {
      username: "Din pa din",
      email: "Email",
      password: "Kasafua",
      confirm_password: "San kasafua bio",
      login: "Kɔ mu",
      register: "Kyerɛw din",
      submit: "Soma",
      already_account: "Wo wɔ akawnt dada?",
      forgot_password: "Wofirii kasafua?",
      dont_have_account: "Wo nni akawnt anaa?",
      logout: "Tu mfi mu",

    },

    players: {
      title: "Yɛn Agorɔfoɔ",
      name: "Din",
      age: "Mfeɛ",
      position: "Gyinabea"
    },
    teams: {
      title: "Yɛn Nkɔmmɔkuo",
      coach: "Ɔkyerɛkyerɛfoɔ",
      founded: "Wɔde hyɛɛ ase",
      men: "Mmarima",
      women: "Mmaa",
      junior:"Abofra",
    },

    player:{
      seacrh: "Hwe din agorɔni",
      position: "Ɔdan",
      country: "	Ɔman"
      
    },

    our_team: {
      men_squad: "Mmarima akuw",
      women_squad: "Mmaa akuw",
      junior_squad: "Nkɔla akuw",
    },

    eshop: {
      heading: "KPFA dodo so adwadie",
      subhead: "Ahodwiriɛ bɔɔlobɔ ne agorɔ nneɛma a ɛyɛ pa",
      category: "Nkyerɛmu",
      search: "Hwehwɛ",
      go: "Kɔ",
      reset: "San nsɛmfua",
      cart: "Tɔte"
    },

    matches: {
      list: "Hwɛ mpɛɛɛ no nyinaa",
      upcoming: "Ɔko a ɛreba",
      upcoming_fixtures: "Mmoa a ɛreba",
      recent: "Agorɔ a atwam",
      date: "Da",
      time: "Bere",
      location: "Bea",
      score: "Nsɛm",
      men: "Mmarima",
      women: "Mmaa",
      junior: "Junior",
      home: "Fie",
      away: "Abɔnten",
      home_team: "Fie Kuw",
      away_team: "Abɔnten Kuw"
    },
    news: {
      title: "Nsɛm Foforɔ",
      read_more: "Kenkan bio",
      comments: "Nkyerɛmu",
      hide_comments: "",
      show_comments: "",
    },
    comments: {
      placeholder: "Kyerɛw asɛm...",
      post: "Soma Asɛm",
      login_to_comment: "Mepa wo kyɛw, kɔ mu na kyerɛ asɛm.",
      reply: "Mmuaeɛ",
    },

    navbar: {
      home: "Fie",
      players: "Agorɔfoɔ",
      teams: "Agodwumayɛ",
      matches: "Agorɔ",
      news: "Nsɛm",
      eshop: "Intanɛt Duka",
      videos: "Videos",
      aboutcontact: "Yɛ Ho Nsɛm",
      greetings: "Akwaaba",
    },
 
    aboutcontact: {
      about_kpfa: "Fa Kutty Philips Bɔɔlobɔ Sukuu Ho",
      contact_us: "Frɛ Yɛn",
      cu_content: "Yɛpɛ sɛ yɛte wo ho asɛm! Mesrɛ, fa form no a ɛwɔ ase no anaa yɛn kontak nsɛm so frɛ yɛn.",
      form_fname: "Din pa din",
      form_email: "Email",
      form_msg:"Asɛm",
      form_pn:  "Kyerɛ wo din pa din",
      form_pe:  "Kyerɛ wo email",
      form_pm:  "Twerɛ wo asɛm...",
      form_button: "Tua Asɛmpa",
      academy_address: "Ga	Akademi gbɛi",
      abt1: "",
      abt2: "Wɔ Kutty Philips Football Academy no,",
      abt3: ", yɛahyɛ bɔ sɛ yɛbɛma awofoɔ foforɔ a wɔwɔ bɔɔlobɔɔ akɔnnɔ no anya mmoa.",
      abt4: "Yɛbotae ne sɛ yɛde ɔsɛmpɛ a ɛwɔ bɔɔlobɔɔ mu bɛka ne sukuu, suban pa, ne boafoɔ adwuma na yɛbɛyɛ agodiefoɔ a wɔyɛ papa wɔ pitch so ne ne akyi.",
      abt5: "", 
      vision_title: "Yɛn Daakye Adwene", 
      mission_title: "Yɛn Botaeɛ",
      core_values_title: "Yɛn Nsɛnteɛ Ahodoɔ",
      vision: "Sɛ yɛbɛyɛ Afrika mu suapɔn a ɛdi kan wɔ bɔɔlobɔfo sukuu mu, a ɛma agyapadefo a wɔyɛ papa wɔ wiase nyinaa.",
      mission: "Sɛ yɛbɛyɛ agyapadefo a wɔwɔ nimdeɛ, ɔbrɛ ne sukuu mu adeɛ a wɔda ɔdɔ ne papa adi wɔ agodie mu.",
      core_values: "Nokwaredi, adwumayɛ mu ntɔkwa, ɔbrɛ ne nkɔso a ɛnsa da.",
    },


    banner: {
      title: "Kɔtɛ Philips Bɔɔlobɔ Adehyeman",
      tagline: '"Rehyɛ mmofra nkɔsoɔ ma wɔayɛ nsoromma ɛnnɛkyɛ"',
      building_champions: "Sisi akɛsefoɔ a ɛreba ɔkyena",
      
    },
    form: {
      header: "Kɔtɛ Philips Bɔɔlobɔ Adehyeman Mframa No Mu Fɔm",
      candidate_info_title: "Nsɛm fa dibeaperefoɔ ho",
      first_name: "Din a ɛdi Kan",
      surname: "Din Abusua",
      date_of_birth: "Awoda",
      country_code: "Ɔman Koodu",
      phone_number: "Fon nɔmba",
      email: "Email",
      state_of_origin: "Amannɔ",
      country: "Ɔman",
      position: "Beae a Wopɛ",
      team: "Agodwumayɛ",
      profile_picture: "Profaili Mfonini (Paw)",
      guardian_info_title: "Nsɛm fa ɔhwɛfoɔ ho",
      guardian_info_note: "(Apakan yi ɛsɛ sɛ wɔhyɛ mu sɛ dibeaperefoɔ no yɛ mfe 18 anaa ketewa.)",
      guardian_name: "Ɔhwɛfoɔ Din",
      guardian_contact_code: "Ɔhwɛfoɔ Amannɔ Koodu",
      guardian_contact_number: "Ɔhwɛfoɔ Nɔmba",
      guardian_email: "Ɔhwɛfoɔ Email",
      address: "Abɔdin",
      guardian_address: "Ɔhwɛfoɔ Abɔdin",
      submit: "Tua",

      holder: {
        select_code: "Paw kɔd",
      select_country: "Paw ɔman",
      select_state: "Paw mantam",
      select_team: "Paw kurotia",
      select_position: "Paw beae",
      choose_file: "Paw fael",
      no_file: "Fael biara nni hɔ" 
      },

      errors: {
        first_name: "Din edin ho hia..", 
        surname: "Abusua din ho hia.",
        date_of_birth:  "Awo da ho hia.",
        gender: "Ɛho hia sɛ wode ɔban no ka ho",
        phone_country_code: "FFɔn kɔd no ho hia.",
        phone_number: "Fɔn nɔma no ho hia.",
        email:  "Email no ho hia.",
        state_of_origin: "Ɔman no ho hia.",
        country: "Ɔmantam no ho hia.",
        address: "Fie din ho hia.",
        position: "Pɔzishɛn a wopɛ no ho hia.",
        team: "Team a wopɛ no ho hia.",
        guardian_name: "Din a wodi so no ho hia.",
        guardian_contact_code: "Fɔn kɔd a wodi so no ho hia.",
        guardian_contact_number: "Fɔn nɔma a wodi so no ho hia.",
        guardian_email: "Ɔhwɛfo no email ho hia.",
        guardian_address: "Fie din a wodi so no ho hia."
      },
    },

    home_subheaders: {
      about_us: "About Us",
      about_us_cont:"Kutty Philips Football Academy bɔ mmɔden sɛ ɔbɛkyerɛkyerɛ mmofra a wɔwɔ bɔɔlobɔ nkɔso wɔ ɔkwan a ɛyɛ pɛ so, sukuu ne akyerɛkyerɛ — de hoɔden, bɔɔlobɔ nimdeɛ ne suban a ɛyɛ pa bɔ wɔn a wɔbɛyɛ mpanimfoɔ daakye.",
      our_teams: "Our Teams",
      upcoming_matches: "Upcoming Matches",
      news_videos: "Nsem ne video nsɛm a ɛyɛ fɛ",
      kpfa_eshop: "KPFA eShop nsɛm a ɛda ho adi",
    },

    buttons: {
      join: "Ka Ho",
      login: "Kyerɛw Din/Kɔ mu",
      visit_eshop:  "Kɔ eShop no",
      view_teams: "Hwɛ Nnɔbaeɛ",
      view_team: "Hwɛ ɔteam no",
      view: "Hwɛ",
      add_to_cart: "Ka ho",
      view_products: "Hwɛ Nnwuma Nyinaa",
      home_videos: "Nsɛntitiriw Video Foforɔ",
      loadmore:"Tɔ so bio",
    },

    product: {
      buy_now: "Tɔ Seisei Ara",
      qnty: "Dodow",
      reviews:"Nsɛnkɔm",
      no_reviews:"Nsɛnkɔm biara nni hɔ",
    },

    cta_banner:{
      title: "Wo ho yɛ ready sɛ wobɛka ho ama champions foforɔ no?"
    },

     footer: {
      copyright: "© 2025 Kutty Philips bɔɔlobɔ sukuu. Ahɔhoɔ nyinaa wɔ hɔ.",
      developer: "Wɔyɛɛ no wɔ Schap Systems.",
    },
  },
  ga: { // Ga

    auth: {
      username: "Jisaa lɛ",
      email: "Email",
      password: "Hie mli",
      confirm_password: "Fɛɛ hie mli",
      login: "Hɔmɔ",
      register: "Kɛ jisaa",
      submit: "Sɔɔmɔ",
      already_account: "Nyɛ wo le jisaa lɛ?",
      forgot_password: "Hie mli shɔ?",
      dont_have_account: "Nyɛ wo le jisaa lɛ?",
      logout: "Ba Mli"
    },

    players: {
      title: "Mliŋtsɛ lɛi",
      name: "Jisaa",
      age: "Nyɔŋmɔ",
      position: "Gbɛi"
    },

    our_team: {
      men_squad: "Mɔ ko lɛ akɛ team",
      women_squad: "Nyɔ ko lɛ akɛ team",
      junior_squad: "Nɔ lɛ mli akɛ team ji etsɔɔ",
    },

    eshop: {
      heading: "KPFA gbɛi shɔp",
      subhead: "Nɔni tsɔɔ football kits kɛ sports merchandise lɛ eba sane",
      category: "Kɛtegori",
      search: "Hɔmɔ",
      go: "Kɔ",
      reset: "Reset filters",
      cart: "Shɔp basket"
    },

    teams: {
      title: "Kpakpa lɛi",
      coach: "Shikpon",
      founded: "Tsɔɔ",
      men: "Mɔni",
      women: "Mɛi",
      junior:"Kɛkɛ",
    },

    player:{
      search: "Hwe agboŋŋmli lɛ",
      position: "Gbɛjɛ",
      country: "Gbɛmlɛ"
      
    },
    matches: {
      list: "Hiɛ gbɛi lɛ mɔ ko",
      upcoming: "Kɛjiɛ nɛɛ wɔmɔ",
      upcoming_fixtures: "Ga	Gboɔ ni eba",
      recent: "Gbɛi tsui",
      date: "Da",
      time: "Time",
      men: "Mɔni",
      women: "Mɛi",
      junior: "Kɛkɛ",
      location: "Fɛɛ",
      score: "Gbɔmɔ",
      home: "Afi",
      away: "kɛ tsui",
      home_team: "Fɛɛ Kpakpa",
      away_team: "Fɛɛ kɛ tsui"
    },
    news: {
      title: "Nɔni Akɛkɛ",
      read_more: "Kenɔ mli",
      comments: "Gbɛimɔ",
      hide_comments: "",
      show_comments: "",
    },
    comments: {
      placeholder: "Kɛ gbɛimɔ...",
      post: "Sɔ gbɛimɔ",
      login_to_comment: "Mɔ ko lɛ, kɛ gbɛimɔ.",
      no_comment_yet:  "Gbɛimɔ mli lɛ. Nyɛ niŋŋ ko!",
      reply: "Dɔmɔ",
    },

    navbar: {
      home: "Shia",
      players: "Agboi",
      teams: "Gbɔmɔi",
      matches: "Agboi lɛ",
      news: "Nyuemɔ",
      eshop: "Shɔp wɔ Internet",
      videos: "Videos",
      aboutcontact: "Mli yɛ ni",
      greetings: "Atuu",
    },

    aboutcontact: { 
      about_kpfa: "Gbɛi Lɛ Ni Yɛ Kutty Philips Bɔɔlobɔfo Sukuu Lɛ",
      contact_us: "Tɛ Yɛ",
      cu_content: "Mɛni tsɔ gbɛi lɛ! Gbɛi ni yɛ mli form lɛ ni eba ni yɛ kontak gbɛi lɛ.",
      form_fname: "Nɔ ni tsɔ ni",
      form_email: "Imɛl",
      form_msg:"Gbɛi",
      form_pn:  "Tɔ nɔ ni tsɔ ni",
      form_pe:  "Tɔ imɛl",
      form_pm:  "Kɔ gbɛi ni...",
      form_button: "Gbo Mli",
      abt1: "",
      abt2: "Wɔ Kutty Philips Football Academy lɛ",
      abt3: ", yɛtsɔ gbɛi ni yɛkɛ hewalɔi lɛ eba.",
      abt4: " Yɛ gbɛɛ ni yɛkɛ niŋ hewalɔi lɛ yɛkɛ gbɛi lɛ, yɛkɛ shikpon, gbɛi gbɛi, ni shishi gbɛi lɛ, kɛ yɛkɛ hewalɔi lɛ ni wɔyɛ nɔ lɛ mli kɛ nɔ lɛ mli gbɛi.",
      abt5: "",
      vision_title: "Yɛ Gbɛi Lɛ",
      mission_title: "Yɛ Botae",
      core_values_title: "Yɛ Gbɛi Kɛ Hewalɛi Lɛ",
      vision: "Yɛ Africa gbɛi lɛ eba football sukuu kɛ hewalɛi, ni yɛ hewalɛi lɛ ni yɛ shishi wɔ gbɛi nyɛ.",
      mission: "Yɛ football hewalɛi ni wɔɔ ni tsɔɔ, gbɛi, kɛ shikpon, ni yɛ shishi sports gbɛi kɛ gbɛi lɛ.",
      core_values: "Gbɛi lɛ, yɛ shishi, gbɛi, kɛ gbɛi lɛ ni yɛ daa shishi.",
    },

    banner: {
      title: "Gbɛjmɔi Bɔɔlu Kutty Philips",
      tagline: '"Shishii enɔ nii mli kɛ amɛ yɛɔ irawɔ lɛ mli"',
      building_champions: "	Nɔ lɛ mli kɛ hewalɔi lɛ eba gbɛi",
      
    },
    form: {
      
      header: "Kutty Philips Bɔɔlu Adehyeman Foɔm",
      candidate_info_title: "Dzidodo mli",
      first_name: "Sane gbã",
      surname: "Sane ŋmã",
      date_of_birth: "Kɛseɛ Miɛlɛdɔɔ",
      country_code: "Ŋmɔlɛ Nɔmba",
      phone_number: "Kɔmɔi nɔmba",
      email: "Email",
      state_of_origin: "Gbɛi",
      country: "Kɛji",
      position: "Nɔni Nɔ Nyaayi",
      team: "Gbɔmɔ",
      profile_picture: "Sɛɛbio Åhe Nɔ Omɔi (Tɛɛ Nɔ Ebaŋŋ)",
      guardian_info_title: "Ngɔŋ mli",
      guardian_info_note: "(This section MUST be filled if the candidate is under 18 Years Old)",
      guardian_name: "Mɔ ko shi sane",
      guardian_contact_code:"Agbɛŋ Maaji Ŋmɔlɛ Nɔmba",
      guardian_contact_number: "Mɔ ko shi nɔmba",
      guardian_email: "Mɔ ko shi email",
      address: "Atsii",
      guardian_address: "Mɔ ko shi atsii",
      submit: "Kɔ",

      holder: {
        select_code: "Yi Ŋmɔlɛ Nɔmba",
        select_country: "Yi Kɛji",
        select_state: "Yi Gbɛi",
        select_team: "Yi Gbɔmɔ",
        select_position: "Yi Nɔni",
        choose_file: "Yi Fael",
        no_file: "Fael nɔ ni ebaŋŋ"
        },

      errors: {
        first_name: "Nitsumɔ lɛ hewalɔ",
        surname: "Nitsumɔ gbɛi lɛ hewalɔ.",
        date_of_birth:  "Nɔtsumɔ da lɛ hewalɔ.",
        gender: "Gbɛi lɛ hewalɔ ni eba sane",
        phone_country_code: "Fɔn kɔd lɛ hewalɔ",
        phone_number: "Fɔn nɔmba lɛ hewalɔ.",
        email:  "Email lɛ hewalɔ.",
        state_of_origin: "State lɛ hewalɔ.",
        country: "Gbɛmlɛ lɛ hewalɔ.",
        address: "Gbɛjɛ lɛ hewalɔ.",
        position: "Gbɛi ni ɔyaa lɛ hewalɔ.",
        team: "gbɛi lɛ hewalɔ.",
        guardian_name: "ɔhwɛfo nitsumɔ lɛ hewalɔ.",
        guardian_contact_code: "ɔhwɛfo kɔd lɛ hewalɔ.",
        guardian_contact_number: "ɔhwɛfo fɔn lɛ hewalɔ.",
        guardian_email: "ɔhwɛfo email lɛ hewalɔ",
        guardian_address: "ɔhwɛfo gbɛjɛ lɛ hewalɔ."
      }
    },
     home_subheaders: {
      about_us: "About Us",
      about_us_cont:"Kutty Philips Football Academy lɛ mli kɛ hewalɛi lɛ eba football shishi lɛ, kɛ coaching, sukuu ni gbɛi — lɛ fitness, technique ni gbɛi juma lɛ, lɛ eba champions lɛ daŋŋ.",
      our_teams: "Our Teams",
      upcoming_matches: "Upcoming Matches",
      news_videos: "Nɔ ni video gbɛi kɛ hewalɔ",
      kpfa_eshop: "KPFA eShop niŋmɔ ni eha",
    },

    buttons: {
      join: "Ba shi lɛ",
      login: "Kyerɛw din/Kɔ ni",
      visit_eshop:  "Kɛ eShop lɛ",
      view_teams: "Hiɛ team gbɛi",
      view_team: "Hiɔ team lɛ",
      view: "Hiɛ",
      add_to_cart: "Tsɔ",
      view_products: "Hiɛ gbɛi ni nyɛ mɔ ko",
      home_videos: "Video Kɛ Hewalɔ Kɛ Baa",
      loadmore: "Hɔɔ kɛ nyɛ",
    },

    product: {
      buy_now: "Tɛŋ lɛ",
      qnty: "Kɛjiɛ",
      reviews:"Nɔtsui",
      no_reviews:"Nɔtsui kɛ nɔ baa",
    },

    cta_banner: {
      title: "Wɔyɛ shishi ni yɛtsɔ lɛ mli champions nɛɛ ni baa?",
    },

    footer: {
      copyright: "© 2025 Kutty Philips Football Academy. Nyɛmi gbɛi lɛ ni jiɛ lɛ.",
      developer: "Nɔ niɔ lɛ eha Schap Systems.",
    },
  },
  ar: { // Arabic

    
    auth: {
      username: "اسم المستخدم",
      email: "البريد الإلكتروني",
      password: "كلمة المرور",
      confirm_password: "تأكيد كلمة المرور",
      login: "تسجيل الدخول",
      register: "تسجيل",
      submit: "إرسال",
      already_account: "هل لديك حساب؟",
      forgot_password: "هل نسيت كلمة المرور؟",
      dont_have_account: "ليس لديك حساب؟",
      logout: "الخروج",
    },

    players: {
      title: "لاعبونا",
      name: "الاسم",
      age: "العمر",
      position: "المركز"
    },
    teams: {
      title: "فرقنا",
      coach: "المدرب",
      founded: "تأسست",
      men: "رجال",
      women: "نساء",
      junior: "صغار",
    },

    player:{
      seacrh: "البحث حسب اسم اللاعب",
      position: "المركز",
      country: "	الدولة"
      
    },

    our_team: {
      men_squad: "فرقة الرجال",
      women_squad: "فرقة النساء",
      junior_squad: "فرقة الناشئين",
    },

    
    eshop: {
      heading: "المتجر الرسمي لـ KPFA",
      subhead: "أطقم كرة قدم عالية الجودة وبضائع رياضية عامة",
      category: "الفئة",
      search: "بحث",
      go: "انطلق",
      reset: "إعادة تعيين الفلاتر",
      cart: "سلة التسوق"
    },
    matches: {
      list: "عرض جميع المباريات",
      upcoming: "المباراة القادمة",
      upcoming_fixtures: "المباريات القادمة",
      recent: "المباريات الأخيرة",
      date: "التاريخ",
      time: "الوقت",
      men: "الرجا",
      women: "النساء",
      junior: "الناشئين",
      location: "المكان",
      score: "النتيجة",
      home: "أرض الفريق",
      away: "خارج الأرض",
      home_team: "الفريق المضيف",
      away_team: "الفريق الزائر"
    },
    news: {
      title: "آخر الأخبار",
      read_more: "اقرأ المزيد",
      comments: "التعليقات",
      hide_comments: "",
      show_comments: "",
    },

    comments: {
      placeholder: "اكتب تعليقًا...",
      post: "إرسال التعليق",
      login_to_comment: "يرجى تسجيل الدخول للتعليق.",
      no_comment_yet: "لا توجد تعليقات بعد. كن الأول!",
      reply: "رد",

    },

    navbar: {
      home: "الرئيسية",
      players: "اللاعبون",
      teams: "الفرق",
      matches: "المباريات",
      news: "الأخبار",
      eshop: "متجرإلكتروني",
      videos:"مقاطع الفيديو",
      aboutcontact: "معلومات عنا",
      greetings: "أهلاً وسهلاً",
    },

    aboutcontact: {
      about_kpfa: "عن أكاديمية كوتي فيليبس لكرة القدم",
      contact_us: "اتصل بنا",
      cu_content: "يسعدنا أن نسمع منك! يرجى التواصل معنا عبر النموذج أدناه أو من خلال معلومات الاتصال الخاصة بنا",
      form_fname: "الاسم الكامل",
      form_email: "البريد الإلكتروني",
      form_msg:"الرسالة",
      form_pn:  "أدخل اسمك الكامل",
      form_pe:  "أدخل بريدك الإلكتروني ",
      form_pm:  "...اكتب رسالتك",
      form_button: "إرسال رسالة",
      academy_address: "عنوان الأكاديمية",
      abt1: "",
      abt2: " في أكاديمية كرة القدم كَتِّي فيليبس، نحن ملتزمون برعاية الجيل القادم من مواهب كرة القدم. مهمتنا هي الجمع بين التميز الفني والتعليم والانضباط والعمل الجماعي لإنتاج رياضيين متميزين داخل الملعب وخارجه.",
      abt3: "",
      abt4: "",
      abt5: "",
      vision_title: "رؤيتنا",
      mission_title: "مهمتنا",
      core_values_title: "قيمنا الأساسية",
      vision: "أن نصبح الأكاديمية الرائدة في إفريقيا لاكتشاف مواهب كرة القدم، ونُخرج لاعبين يتفوقون عالميًا.",
      mission: "تطوير لاعبي كرة قدم ماهرين ومنضبطين ومتعلمين يجسدون الروح الرياضية والتميز",
      core_values: "النزاهة، العمل الجماعي، الانضباط، والنمو المستمر",
    },
    

    banner: {
      title: "أكاديمية كرة القدم KPFA",
      tagline: '"تنمية المواهب الشابة لتصبح نجوم المستقبل"',
      building_champions: "بناء أبطال الغد",
      
    },
    form: {
      
      header: "استمارة التقديم لأكاديمية كوتي فيليبس لكرة القدم",
      candidate_info_title: " معلومات المرشح",
      first_name: "الاسم الأول",
      surname: "اللقب",
      date_of_birth:"تاريخ الميلاد",
      country_code: "رمز الدولة",
      phone_number: "رقم الهاتف",
      email: "البريد الإلكتروني",
      state_of_origin: "الولاية",
      country: "البلد",
      position: "المركز المفضل",
      team: "الفريق",
      profile_picture: "صورة الملف الشخصي (اختياري)",
      guardian_info_title: "معلومات الوصي",
      guardian_info_note: "(يجب ملء هذا القسم إذا كان عمر المرشح أقل من 18 عامًا)",
      guardian_name: "اسم الوصي",
      guardian_contact_code:"رمز اتصال الوصي",
      guardian_contact_number: "رقم الوصي",
      guardian_email: "البريد الإلكتروني للوصي",
      address: "العنوان",
      guardian_address: "عنوان الوصي",
      submit: "إرسال",

      
      holder: {
        select_code: "اختر الرمز",
        select_country: "اختر البلد",
        select_state: "اختر الولاية",
        select_team: "اختر الفريق",
        select_position: "اختر المركز",
        choose_file: "اختر الملف",
        no_file: "لم يتم اختيار ملف"
      },

      errors: {
        first_name: "الاسم الأول مطلوب",
        surname: "اسم العائلة مطلوب",
        date_of_birth:  "تاريخ الميلاد مطلوب",
        gender: "مطلوب تحديد الجنس",
        phone_country_code: "رمز الهاتف مطلوب",
        phone_number: "رقم الهاتف مطلوب",
        email:  "البريد الإلكتروني مطلوب",
        state_of_origin: "الولاية مطلوبة",
        country: "الدولة مطلوبة",
        address: "العنوان مطلوب",
        position: "الموقع المفضل مطلوب",
        team: "اختيار الفريق مطلوب",
        guardian_name: "اسم الوصي مطلوب",
        guardian_contact_code: "رمز الدولة للوصي مطلوب",
        guardian_contact_number: "هاتف الوصي مطلوب",
        guardian_email: "البريد الإلكتروني للوصي مطلوب",
        guardian_address: "عنوان الوصي مطلوب"
      }
    },
    
    home_subheaders: {
      about_us: "About Us",
      about_us_cont:"أكاديمية كوتي فيليبس لكرة القدم ترعى المواهب الشابة في كرة القدم من خلال التدريب المنظم، والتعليم، والإرشاد — وتجمع بين اللياقة البدنية، والتقنية، وتطوير الشخصية لبناء أبطال الغد",
      our_teams: "Our Teams",
      upcoming_matches: "Upcoming Matches",
      news_videos: "الأخبار وملخصات الفيديو",
      kpfa_eshop: "أبرز ما في متجر كَتِّي فيليبس الإلكتروني",
    },
    buttons: {
      join: "انضم إلينا الآن",
      login: "تسجيل/تسجيل الدخول",
      visit_eshop:  "زر المتجر الإلكتروني",
      view_teams: "عرض الفرق",
      view_team: "عرض الفريق",
      view: "عرض",
      add_to_cart: "إضافة",
      view_products: "عرض جميع المنتجات",
      home_videos:"أبرز مقاطع الفيديو الأخيرة",
      loadmore: "تحميل المزيد",
    },

    product: {
      buy_now: "اشترِ الآن",
      qnty: "الكمية",
      reviews:"المراجعات",
      no_reviews:"لا توجد مراجعات بعد",
    },

    cta_banner: {
      title: "هل أنت مستعد للانضمام إلى الجيل القادم من الأبطال؟",
    },
    footer: {
      copyright: " أكاديمية كوتي فيليبس لكرة القدم. جميع الحقوق محفوظة© 2025",
      developer: "تم تطويره بواسطة شركة شاب سيستمز.",
    


    },
  },
}



// Create i18n instance
const i18n = createI18n({
  legacy: false,   // required for Vue 3 Composition API
  globalInjection: true,
  locale: 'en',
  fallbackLocale: 'en',
  messages
});


// Create one single app
const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');

const savedLang = localStorage.getItem('selectedLanguage') || 'en';
i18n.global.locale = savedLang;



