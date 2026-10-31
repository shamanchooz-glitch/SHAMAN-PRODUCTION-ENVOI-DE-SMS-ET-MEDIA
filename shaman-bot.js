/*! Shaman Bot v2.0 — assistant conversationnel autonome (sans clé API, fonctionne hors-ligne).
 *  Installation : ajouter <script src="shaman-bot.js"></script> juste avant </body> dans index.html.
 *  Appui long (1 s) sur le titre du chat = espace administrateur (instructions + dossiers).
 */
(function () {
'use strict';
if (window.ShamanBot) return;
var LS = 'shamanbot.v1', W = window, D = typeof document !== 'undefined' ? document : null;
var DATA = {"pools":{"greet_day":["Bonjour ! Je suis ravi de vous lire.","Bonjour et bienvenue !","Akwaba ! Bienvenue.","Bonjour ! Heureux de vous accueillir.","Bonjour ! Belle journée à vous.","Bonjour ! Je suis là pour vous écouter.","Salutations ! Bienvenue.","Bonjour ! Quel plaisir de vous voir ici."],"greet_eve":["Bonsoir ! Je suis ravi de vous lire.","Bonsoir et bienvenue !","Akwaba ! Bienvenue, bonsoir.","Bonsoir ! J’espère que votre journée a été bonne.","Bonsoir ! Heureux de vous accueillir.","Bonsoir ! Je suis là pour vous écouter.","Bonsoir ! Quel plaisir de vous voir ici.","Bonsoir ! Bienvenue chez nous."],"greet_back":["Content de vous revoir !","Ravi de vous retrouver.","Vous revoilà, bienvenue de nouveau !","Heureux de vous relire.","Quel plaisir de vous retrouver.","Bon retour parmi nous !"],"help_q":["Comment puis-je vous aider ?","Que puis-je faire pour vous ?","De quoi avez-vous besoin ?","Je peux vous aider pour un emploi, du personnel, un service, ou simplement discuter.","Dites-moi tout, je vous écoute.","Je vous écoute, par quoi commençons-nous ?"],"hru_reply":["Je vais très bien, merci de demander.","Tout va bien de mon côté, merci.","Très bien, merci ! Toujours prêt à discuter.","Bien, merci. C’est gentil de demander.","Ça va très bien, merci."],"ask_back":["Et vous, comment allez-vous ?","Et de votre côté, comment ça va ?","Et vous, comment se passe votre journée ?","Et vous, quoi de neuf ?"],"fine_reply":["Content de l’entendre.","Tant mieux, c’est une bonne nouvelle.","Très bien, c’est agréable à lire.","C’est super à entendre.","Parfait, ça fait plaisir."],"bad_reply":["Je suis désolé de l’entendre.","Courage, les moments difficiles passent.","Je comprends, ce n’est pas facile.","Merci de me le dire. Je suis là pour vous écouter.","Prenez soin de vous, c’est important."],"thanks_reply":["Avec plaisir.","Je vous en prie.","C’est un plaisir.","De rien, c’est normal.","Pas de souci, avec plaisir.","Toujours là pour vous aider.","C’est moi qui vous remercie.","Je vous en prie, n’hésitez pas."],"bye":["Avec plaisir. Bonne journée à vous !","À bientôt, prenez soin de vous.","Bonne continuation, et à très vite !","Merci de votre visite. À bientôt !","Au revoir, et n’hésitez pas à revenir.","Belle journée à vous, à la prochaine !","Bonne soirée à vous, à bientôt.","Prenez soin de vous. À très bientôt !"],"nod":["Je vois.","D’accord.","Intéressant.","C’est noté.","Je comprends.","Très bien.","Ah, d’accord.","Bien reçu.","Oui, je vois ce que vous voulez dire.","Merci de me le dire.","C’est bien.","Ah oui ?","Je note cela.","Compris."],"emp_pos":["Quelle belle nouvelle !","Cela fait vraiment plaisir à lire.","Je suis content pour vous.","C’est super !","Bravo !","Voilà qui est encourageant.","Excellent !","Quel bonheur !","C’est formidable.","Tant mieux pour vous !","Vous méritez ce bon moment.","Magnifique !"],"emp_neg":["Je suis désolé de l’apprendre.","Ça ne doit pas être facile.","Je comprends que ce soit pesant.","Courage, vous n’êtes pas seul(e).","Je suis là pour vous écouter.","Ce n’est pas simple, je comprends.","Merci de vous confier à moi.","Prenez le temps qu’il vous faut.","Je vous souhaite du courage.","Cela arrive, et ça finit par passer.","Je comprends votre situation.","Vous faites de votre mieux, et c’est déjà beaucoup."],"emp_neu":["Je comprends.","C’est un sujet intéressant.","Merci de partager cela.","Voilà qui est bien dit.","Je vois.","D’accord, parlons-en.","C’est un bon point.","Ah, c’est un thème qui compte pour beaucoup de gens.","Très bien.","Merci pour votre message."],"curious":["Qu’en pensez-vous ?","Et vous, comment voyez-vous cela ?","Depuis quand êtes-vous dans cette situation ?","Qu’est-ce qui vous plaît le plus là-dedans ?","Qu’est-ce qui vous a amené à ce sujet ?","Voulez-vous m’en dire un peu plus ?","Comment cela se passe-t-il pour vous ?","Qu’est-ce qui compte le plus pour vous ?","Qu’aimeriez-vous changer ?","Quel serait votre souhait idéal ?","Qu’est-ce qui vous a le plus surpris ?","Avec qui en parlez-vous d’habitude ?","Quelle est la meilleure partie ?","Et ensuite, que comptez-vous faire ?","Qu’est-ce qui vous a marqué récemment ?","Quel est votre meilleur souvenir à ce sujet ?","Qu’avez-vous appris de tout cela ?","Qu’est-ce qui vous rend le plus fier(e) ?","Quelle est la chose la plus importante selon vous ?","Qu’est-ce qui vous ferait plaisir cette semaine ?"],"switch":["Changeons un peu de sujet.","Au fait,","Dites-moi,","Une petite question :","Pour varier un peu :","Autre chose :","À propos,","Si je peux me permettre :","Je suis curieux :","Parlons d’autre chose :","Tiens, une idée :","Sans transition :"],"bridge":["Au passage, si vous cherchez un emploi ou du personnel, je peux préparer votre dossier.","Si un jour vous avez besoin d’un service ou d’une aide à la maison, pensez à moi.","N’oubliez pas : je peux aussi préparer une demande d’emploi ou de recrutement.","Et si vous connaissez quelqu’un qui cherche du travail, vous pouvez lui parler de nous.","Au besoin, je prépare aussi votre dossier de service en quelques questions.","Pour un emploi, du personnel ou un service, je suis là aussi."],"laugh":["Ha ha, content que cela vous amuse !","Le rire fait du bien.","Ça fait plaisir de vous voir de bonne humeur.","Ha ! Un peu d’humour ne fait jamais de mal.","Je vois que vous avez le sourire.","Voilà une bonne ambiance !","Ça fait du bien de rire.","Tant mieux si vous vous amusez."],"yes_s":["Très bien.","Parfait.","D’accord.","Super.","C’est noté.","Excellent.","Bien sûr.","Entendu.","Avec plaisir.","Je vois."],"no_s":["D’accord, pas de souci.","Je comprends.","Très bien, c’est noté.","Pas de problème.","Entendu.","Aucun souci.","C’est tout à fait normal.","Je respecte cela.","D’accord.","Compris."],"maybe_s":["Je comprends, on n’est pas toujours sûr.","Prenez votre temps.","C’est normal d’hésiter.","Pas de pression.","D’accord, ça peut venir plus tard.","Aucun souci.","Il n’y a pas de mauvaise réponse.","Parfois il faut y réfléchir un peu."],"ok_s":["Très bien.","D’accord.","Parfait.","Bien reçu.","Entendu.","Compris.","Super.","Avec plaisir."],"compl":["Merci beaucoup, c’est gentil.","Merci, ça me touche.","C’est très aimable de votre part.","Merci, je fais de mon mieux.","Vous êtes trop aimable, merci.","Merci pour ce bon mot.","Ça fait plaisir, merci.","Merci, c’est un plaisir de discuter avec vous."],"apology":["Ce n’est rien du tout.","Pas de souci, on continue.","Aucun problème.","Ne vous excusez pas, tout va bien.","Pas de mal, je vous en prie.","C’est déjà oublié."],"insult":["Je comprends votre agacement.","Je suis désolé si je n’ai pas été utile.","Restons courtois, je veux vraiment vous aider.","Je comprends que vous soyez contrarié(e).","Dites-moi ce qui ne va pas, je ferai de mon mieux.","Je suis là pour vous aider, calmement."],"distress":["Je suis vraiment désolé que vous traversiez cela. // Vous n’êtes pas seul(e) : parlez dès maintenant à une personne de confiance. // Si vous êtes en danger, contactez les services d’urgence de votre pays. // Je reste avec vous. Voulez-vous me dire ce qui se passe ?","Merci de me l’avoir dit, c’est courageux. // Votre vie compte. Appelez un proche ou rendez-vous aux urgences si vous pensez vous faire du mal. // Je suis là. Qu’est-ce qui vous pèse le plus en ce moment ?","Ce que vous ressentez est sérieux, et vous méritez de l’aide. // Parlez à quelqu’un de confiance ou à un professionnel de santé dès que possible. // En cas de danger immédiat, appelez les secours. Je reste là pour vous écouter."],"fb_stmt":["Merci de me le dire.","Je vois, merci de partager cela.","C’est intéressant.","D’accord, je comprends.","Merci pour cette précision.","Je note cela avec plaisir.","Je comprends mieux maintenant.","Voilà qui est clair.","C’est bien de me le dire.","Ah, je vois."],"fb_q":["Bonne question. Je préfère ne pas inventer une réponse.","Là, je ne suis pas sûr de la réponse, et je préfère être honnête.","Je ne connais pas la réponse exacte et je ne veux pas vous induire en erreur.","Cette question dépasse un peu mes connaissances.","Je n’ai pas d’information fiable sur ce point.","Je ne suis pas certain, alors je préfère rester prudent."],"repeat":["Vous venez de me le dire, je l’ai bien noté.","Oui, je m’en souviens, vous l’avez dit à l’instant.","C’est bien noté, merci d’insister.","Je vous ai bien lu. Avez-vous autre chose à ajouter ?","Je l’ai bien reçu, merci."],"encour":["Courage, chaque petit pas compte.","Vous avez déjà fait le plus dur : commencer.","Ne vous découragez pas, ça finit par payer.","Vous êtes plus fort(e) que vous ne le pensez.","Un jour à la fois, et ça avance.","Croyez en vous, vous avez des atouts.","Les belles choses prennent du temps.","Gardez confiance, ça va aller.","Chaque expérience vous apprend quelque chose.","Continuez, vous êtes sur la bonne voie."],"day_q":["Comment se passe votre journée ?","Qu’avez-vous prévu aujourd’hui ?","Vous êtes plutôt du matin ou du soir ?","Quelle a été la meilleure partie de votre journée ?","Avez-vous déjà mangé aujourd’hui ?","Quel est le programme de votre semaine ?"],"about_name":["Je suis l’assistant virtuel de {agence}. Vous pouvez m’appeler simplement l’assistant.","Je n’ai pas de prénom : je suis l’assistant virtuel de {agence}.","Je suis l’assistant virtuel de {agence}, ravi de faire votre connaissance."],"about_age":["Je suis un assistant virtuel, donc je n’ai pas d’âge à proprement parler.","Pas d’âge pour moi : je suis un programme, toujours prêt à discuter."],"about_where":["Je vis dans votre téléphone, c’est assez confortable !","Je n’ai pas d’adresse : je suis un assistant virtuel qui vit dans l’application."],"about_feel":["Je suis un assistant virtuel, je n’éprouve pas d’émotions comme vous, mais votre conversation est un vrai plaisir à traiter.","Je n’ai pas de sentiments humains, mais je suis là pour vous écouter avec attention."],"about_food":["Je ne mange pas, je suis un assistant virtuel ! Mais je peux parler cuisine tant que vous voulez.","Pas de repas pour moi, mais je discute volontiers de recettes."],"about_sleep":["Je ne dors jamais : je suis disponible jour et nuit.","Pas besoin de sommeil pour moi, je suis là à toute heure."],"about_family":["Je n’ai pas de famille, mais je suis entouré des conseillers de {agence}.","Pas de famille : je suis un assistant virtuel, mais je parle volontiers de la vôtre."],"about_hobby":["Mon activité, c’est discuter avec vous et aider à trouver un emploi ou un service.","Discuter est mon passe-temps : parlez-moi de vos loisirs !"],"about_human":["Non, je suis un assistant virtuel. Mais un vrai conseiller suit chaque dossier.","Je suis un assistant virtuel, pas une personne. Je fais de mon mieux pour être utile et courtois."],"about_maker":["Je suis l’assistant virtuel de {agence}, conçu pour accueillir et orienter les personnes.","{agence} m’a mis en place pour répondre à vos questions et préparer vos dossiers."],"about_work":["Je travaille pour {agence} : j’accueille les gens et je prépare les dossiers d’emploi et de services.","Mon rôle : vous écouter, vous renseigner et préparer votre dossier."],"about_can":["Je peux discuter de beaucoup de sujets, préparer un dossier d’emploi, de recrutement ou de service, raconter une blague ou poser une devinette.","Je peux vous renseigner, préparer votre dossier, discuter librement, ou vous proposer une devinette."],"riddle_win":["Bravo, c’est exactement ça !","Excellente réponse !","Oui, bien joué !","C’est cela, félicitations !","Vous avez trouvé, chapeau !"],"riddle_lose":["Pas tout à fait, essayez encore !","Presque, un petit effort !","Ce n’est pas ça, mais continuez.","Hum, pas encore. Réfléchissez bien !"],"riddle_ask":["Voici une devinette :","J’ai une devinette pour vous :","Essayons une devinette :","À vous de trouver :"],"recall_aime":["Au fait, vous m’aviez dit aimer {x}. C’est toujours le cas ?","Vous m’aviez parlé de {x}. Comment ça se passe ?","Je repense à {x}, dont vous m’aviez parlé. Des nouvelles ?"],"recall_enfants":["Au fait, comment vont les enfants ?","Et vos enfants, tout se passe bien ?","Vos enfants vont bien, j’espère ?"],"recall_commune":["Il fait comment du côté de {x} aujourd’hui ?","Tout va bien à {x} ?"],"with_name":["{nom},","Dites-moi {nom},","Écoutez {nom},","{nom}, une question :"],"qa_follow":["Autre chose ?","Une autre question ?","Je réponds volontiers à d’autres questions.","Voulez-vous savoir autre chose ?"],"ask_more":["Avez-vous une autre question ?","Puis-je vous aider sur autre chose ?","Souhaitez-vous plus de détails ?"],"dossier_offer":["Souhaitez-vous que je prépare votre dossier ?","Voulez-vous que je note votre demande ?","Je peux préparer votre dossier si vous le souhaitez."],"unknown_note":["Je note votre question pour apprendre la réponse.","Je garde votre question en mémoire pour progresser.","J’ai noté votre question, elle m’aidera à m’améliorer."],"fun_follow":["Une autre ?","Voulez-vous une autre ?","Je peux continuer si vous voulez.","Encore une ?"],"prov_intro":["On dit souvent :","Un proverbe dit :","Voici un proverbe :","Une belle pensée :"],"about_back":["Et vous ?","Et de votre côté ?","Et vous, qu’en est-il ?"]},"topics":[{"id":"famille","kw":["famille","frere","soeur","cousin","cousine","oncle","tante","neveu","niece","grand mere","grand pere","grands parents","beau frere","belle soeur"],"remarks":["La famille, c’est souvent le premier soutien dans la vie.","Prendre des nouvelles de sa famille fait toujours du bien.","Chaque famille a ses petites traditions, c’est ce qui la rend unique.","Un repas partagé en famille crée de beaux souvenirs.","Garder le contact avec les siens demande un peu d’effort, mais ça en vaut la peine.","Les grandes familles ont toujours de belles histoires à raconter."],"questions":["Vous êtes d’une grande famille ?","Vous voyez souvent vos proches ?","Qui, dans votre famille, vous fait le plus rire ?","Avez-vous une tradition familiale qui vous tient à cœur ?","Vos proches habitent près de chez vous ?","Quel est votre meilleur souvenir en famille ?"],"related":["parents","enfants","fetes"]},{"id":"parents","kw":["papa","maman","mere","pere","parents","mes parents","ma mere","mon pere"],"remarks":["Les parents donnent souvent des conseils précieux, même quand on ne les écoute pas tout de suite.","Prendre soin de ses parents est une belle marque de respect.","Un petit appel à ses parents peut illuminer leur journée.","Être parent est un grand travail, jour après jour.","Beaucoup de gens mesurent avec le temps tout ce que leurs parents ont fait pour eux.","Il y a toujours une leçon de vie à retenir de nos parents."],"questions":["Vous parlez souvent avec vos parents ?","Quel conseil de vos parents vous a le plus marqué ?","Vos parents vivent près de vous ?","Que feriez-vous pour leur faire plaisir cette semaine ?","Comment se portent vos parents ?","Qu’est-ce que vos parents aiment faire ensemble ?"],"related":["famille","souvenirs","sagesse"]},{"id":"enfants","kw":["enfant","enfants","bebe","fils","fille","garcon","gamin","gosse"],"remarks":["Les enfants apportent de la joie et beaucoup d’énergie !","Chaque enfant a son rythme et sa personnalité.","Un enfant a surtout besoin d’attention et de repères.","Les petits posent des questions qui font réfléchir les grands.","Élever un enfant demande de la patience, mais c’est très gratifiant.","Les enfants apprennent beaucoup en imitant les adultes."],"questions":["Quel âge a l’enfant dont vous parlez ?","Qu’est-ce qui le ou la fait le plus sourire ?","Il ou elle va à l’école ?","Quelle est sa matière ou son jeu préféré ?","Vous passez du temps avec lui ou elle en ce moment ?","Qu’est-ce qui vous rend le plus fier de lui ou d’elle ?"],"related":["education","ecole","jeux"]},{"id":"ecole","kw":["ecole","etude","etudes","etudiant","etudiante","eleve","universite","fac","examen","bac","bepc","cepe","professeur","maitre","maitresse","devoir","diplome","concours","bulletin","rentree"],"remarks":["Les études ouvrent beaucoup de portes.","Réviser un peu chaque jour vaut mieux que tout faire la veille.","Un bon diplôme aide, mais la persévérance compte autant.","Les examens font stresser tout le monde, c’est normal.","Un bon professeur peut changer une vie.","Apprendre ne s’arrête jamais, même après l’école."],"questions":["Dans quelle classe ou filière êtes-vous ?","Quelle est votre matière préférée ?","Vous préparez un examen en ce moment ?","Qu’aimeriez-vous faire après vos études ?","Comment organisez-vous vos révisions ?","Quel professeur vous a le plus marqué ?"],"related":["motivation","travail","livres"]},{"id":"travail","kw":["boulot","patron","patronne","collegue","carriere","entreprise","employeur","promotion","equipe de travail","stage","chef","licenciement","metier"],"remarks":["Un bon environnement de travail change tout.","S’entendre avec ses collègues rend les journées plus légères.","Un travail bien fait finit toujours par être remarqué.","Trouver l’équilibre entre travail et repos est essentiel.","Chaque métier mérite le respect.","Prendre des initiatives est souvent apprécié par un employeur."],"questions":["Vous aimez ce que vous faites en ce moment ?","Qu’est-ce qui vous plaît le plus dans votre travail ?","Depuis combien de temps faites-vous ce métier ?","Comment se passent vos journées de travail ?","Quel serait votre travail idéal ?","Qu’aimeriez-vous améliorer dans votre quotidien professionnel ?"],"related":["motivation","argent","entrepreneuriat"]},{"id":"argent","kw":["argent","epargne","economie","economiser","budget","depense","depenses","dette","banque","credit","tontine","investir","investissement","mobile money","wave","orange money","mtn money","moov money","salaire"],"remarks":["Je ne suis pas conseiller financier, mais noter ses dépenses est un bon premier pas.","Mettre un peu de côté chaque mois, même une petite somme, finit par compter.","Il vaut mieux éviter les dettes qu’on ne peut pas rembourser.","Comparer les prix avant d’acheter permet souvent d’économiser.","Méfiez-vous des promesses de gains faciles : elles cachent souvent des arnaques.","Garder une petite réserve pour les imprévus apporte de la tranquillité."],"questions":["Vous essayez d’économiser en ce moment ?","Vous avez un projet pour lequel mettre de l’argent de côté ?","Vous tenez un budget mensuel ?","Vous préférez épargner seul ou en groupe, comme dans une tontine ?","Quel achat vous ferait vraiment plaisir ?","Qu’est-ce qui coûte le plus cher dans votre quotidien ?"],"related":["entrepreneuriat","securite","logement"]},{"id":"sante","kw":["sante","malade","maladie","fievre","docteur","medecin","hopital","clinique","medicament","medicaments","douleur","pharmacie","paludisme","toux","rhume","mal de tete","mal au ventre","tension"],"remarks":["Je ne suis pas médecin, mais votre santé passe avant tout.","Un symptôme qui dure mérite l’avis d’un professionnel de santé.","Boire assez d’eau et se reposer aident souvent le corps.","Évitez de prendre des médicaments sans l’avis d’un médecin ou d’un pharmacien.","Prendre soin de sa santé, c’est aussi s’accorder du repos.","Un bilan de santé régulier permet de prévenir bien des soucis."],"questions":["Depuis quand ressentez-vous cela ?","Avez-vous pu consulter quelqu’un ?","Quelqu’un peut-il vous accompagner à la clinique ?","Comment vous sentez-vous aujourd’hui ?","Prenez-vous assez de repos ces jours-ci ?","Y a-t-il quelque chose que je peux faire pour faciliter votre journée ?"],"related":["bien_etre","famille","tristesse"]},{"id":"bien_etre","kw":["sommeil","dormir","insomnie","stress","stresse","fatigue","fatigue","detente","relaxation","meditation","repos"],"remarks":["Un bon sommeil est la base d’une bonne énergie.","Quelques minutes de respiration calme peuvent apaiser le stress.","Une courte marche fait souvent du bien à la tête.","Éteindre son téléphone un peu avant de dormir aide à mieux se reposer.","Le repos n’est pas une perte de temps, c’est un investissement.","Parler à quelqu’un de confiance allège souvent la fatigue du moral."],"questions":["Vous dormez bien en ce moment ?","Qu’est-ce qui vous détend le plus ?","Vous arrivez à prendre des pauses dans la journée ?","Qu’est-ce qui vous stresse le plus ces temps-ci ?","Vous avez un moment rien qu’à vous dans la semaine ?","Quelle activité vous recharge les batteries ?"],"related":["sport","loisirs","sante"]},{"id":"cuisine","kw":["recette","manger","repas","riz","attieke","alloco","sauce","poisson","poulet","kedjenou","foutou","plat","faim","restaurant","cuisiner","gateau","dejeuner","diner","petit dejeuner","bouillie","garba","placali"],"remarks":["Un bon plat partagé rapproche les gens.","La cuisine ivoirienne est réputée pour ses saveurs : attiéké, alloco, kédjenou…","Un peu de patience et de bons ingrédients font toute la différence en cuisine.","Le piment se dose avec prudence, surtout pour les invités !","Goûter pendant la cuisson aide à ajuster l’assaisonnement.","Cuisiner à la maison permet souvent d’économiser et de mieux choisir ce qu’on mange."],"questions":["Quel est votre plat préféré ?","Vous aimez cuisiner ou vous préférez goûter ?","Quelle recette réussissez-vous le mieux ?","Vous mangez plutôt à la maison ou dehors ?","Quel plat vous rappelle votre enfance ?","Qu’aimeriez-vous manger là, tout de suite ?"],"related":["fetes","famille","sante"]},{"id":"football","kw":["football","foot","match","ballon","supporter","elephants","coupe du monde","buteur","championnat","stade","arbitre","transfert","ligue des champions","equipe"],"remarks":["Le football passionne énormément de monde, en Afrique comme ailleurs.","Un bon match, c’est surtout une belle ambiance.","Les Éléphants de Côte d’Ivoire comptent de nombreux supporters passionnés.","On dit qu’un match n’est jamais fini avant le coup de sifflet final.","Le football apprend aussi l’esprit d’équipe.","Les débats entre supporters font partie du plaisir !"],"questions":["Vous supportez quelle équipe ?","Vous jouez aussi au football ?","Quel a été le plus beau match que vous ayez vu ?","Quel joueur vous impressionne le plus ?","Vous regardez les matchs chez vous ou avec des amis ?","Selon vous, qu’est-ce qui fait une grande équipe ?"],"related":["sport","amitie","loisirs"]},{"id":"sport","kw":["sport","sports","courir","course","basket","tennis","musculation","gym","marathon","boxe","natation","entrainement","athletisme","velo","yoga"],"remarks":["Un peu de sport chaque semaine fait du bien au corps et au moral.","L’important, c’est la régularité plus que l’intensité.","S’échauffer avant l’effort évite bien des blessures.","Bouger avec des amis rend l’effort plus agréable.","Boire de l’eau pendant l’effort est important.","Chaque petit progrès mérite d’être célébré."],"questions":["Quel sport pratiquez-vous ou aimeriez-vous pratiquer ?","Vous faites du sport seul ou en groupe ?","À quel moment de la journée préférez-vous bouger ?","Quel est votre objectif sportif du moment ?","Qu’est-ce qui vous motive à vous y mettre ?","Vous avez un sport favori à regarder ?"],"related":["football","bien_etre","motivation"]},{"id":"musique","kw":["musique","chanson","chanter","chanteur","chanteuse","artiste","concert","rap","coupe decale","zouglou","afrobeat","danser","danse","gospel","rumba","melodie","album","dj"],"remarks":["La musique met de la couleur dans la journée.","Le coupé-décalé et le zouglou font danser bien des gens en Côte d’Ivoire.","Une bonne chanson peut changer l’humeur en quelques secondes.","La musique rapproche des gens de toutes origines.","Chanter, même sous la douche, fait du bien !","Beaucoup de souvenirs sont liés à une chanson."],"questions":["Quel style de musique écoutez-vous le plus ?","Quel artiste vous accompagne en ce moment ?","Vous chantez ou jouez d’un instrument ?","Quelle chanson vous met toujours de bonne humeur ?","Vous aimez danser ?","Vous écoutez de la musique en travaillant ?"],"related":["cinema","fetes","souvenirs"]},{"id":"cinema","kw":["film","films","serie","series","cinema","acteur","actrice","netflix","novela","telenovela","television","tele","comedie","documentaire","dessin anime"],"remarks":["Un bon film, c’est une petite évasion.","Les séries donnent envie de regarder « juste un épisode de plus » !","Les comédies sont idéales pour se détendre.","Un documentaire permet d’apprendre tout en se divertissant.","Le cinéma africain gagne en visibilité, c’est une belle évolution.","Regarder un film en famille crée de bons moments."],"questions":["Quel est le dernier film ou la dernière série que vous avez aimé ?","Vous préférez les comédies, l’action ou les drames ?","Vous regardez plutôt seul ou en famille ?","Quel acteur ou quelle actrice vous plaît le plus ?","Vous aimez les films africains ?","Quel film pourriez-vous revoir dix fois ?"],"related":["musique","loisirs","livres"]},{"id":"religion","kw":["dieu","priere","prier","eglise","mosquee","foi","bible","coran","pasteur","imam","culte","benediction","croyant","messe"],"remarks":["La foi est un soutien important pour beaucoup de personnes, et je la respecte.","Chacun vit sa foi à sa manière, et c’est une affaire personnelle.","Un moment de prière ou de recueillement apporte souvent de la paix.","Le respect entre croyances différentes fait la force d’une communauté.","Beaucoup trouvent du courage dans leurs convictions.","Les rassemblements religieux créent souvent un beau sentiment de communauté."],"questions":["La foi vous aide-t-elle dans les moments difficiles ?","Vous allez souvent au lieu de culte ?","Quelle valeur de votre foi vous tient le plus à cœur ?","Vous priez à un moment précis de la journée ?","Y a-t-il une fête religieuse que vous aimez particulièrement ?","Que souhaitez-vous partager à ce sujet ?"],"related":["sagesse","fetes","famille"]},{"id":"amour","kw":["amour","couple","mari","epouse","copain","copine","petit ami","petite amie","relation","celibataire","rupture","fiance","fiancee","amoureux","draguer"],"remarks":["Une relation solide se construit avec le respect et le dialogue.","Prendre le temps de se connaître est essentiel.","Les petites attentions comptent souvent plus que les grands cadeaux.","Les peines de cœur font mal, mais le temps aide à avancer.","Être bien avec soi-même aide à bien aimer les autres.","La confiance est la base de tout couple."],"questions":["Vous êtes dans une relation en ce moment ?","Qu’est-ce qui compte le plus pour vous dans un couple ?","Comment fêtez-vous les moments importants ensemble ?","Quelle est la plus belle attention qu’on vous ait faite ?","Qu’est-ce qui vous fait sourire chez la personne dont vous parlez ?","Souhaitez-vous m’en dire un peu plus ?"],"related":["amitie","tristesse","fetes"]},{"id":"amitie","kw":["ami","amie","amis","amies","pote","potes","amitie","camarade","voisin","voisine","copains","copines"],"remarks":["Un vrai ami se reconnaît dans les moments difficiles.","L’amitié demande un peu d’attention pour durer.","Rire avec des amis est l’un des meilleurs remèdes.","De bons voisins rendent la vie du quartier bien plus agréable.","Un message simple suffit parfois à raviver une amitié.","Les amis d’enfance ont une place à part."],"questions":["Vous avez un ami de longue date ?","Qu’aimez-vous faire avec vos amis ?","Vous voyez vos amis souvent ?","Qu’est-ce qui compte le plus pour vous dans une amitié ?","Quel est votre meilleur souvenir entre amis ?","Vous avez de bons voisins ?"],"related":["loisirs","souvenirs","humour"]},{"id":"voyage","kw":["voyage","voyager","vacances","avion","tourisme","hotel","billet","village","destination","aeroport","valise","visite","plage","bassam"],"remarks":["Voyager ouvre l’esprit et fait découvrir d’autres façons de vivre.","Préparer son voyage à l’avance évite bien des soucis.","Garder ses papiers et son argent en lieu sûr est très important en voyage.","Retourner au village est souvent un moment de grande joie.","Les plages de Grand-Bassam attirent beaucoup de visiteurs.","Un voyage, même court, permet de recharger les batteries."],"questions":["Vous avez un voyage en projet ?","Quelle destination vous fait rêver ?","Vous préférez la mer, la campagne ou la ville ?","Vous voyagez plutôt seul ou en groupe ?","Quel est le plus bel endroit que vous ayez visité ?","Que mettez-vous toujours dans votre valise ?"],"related":["transport","loisirs","souvenirs"]},{"id":"transport","kw":["transport","bus","taxi","gbaka","woro woro","embouteillage","embouteillages","circulation","route","moto","trajet","retard","gare","sotra","bateau"],"remarks":["Les embouteillages font perdre un temps précieux, surtout aux heures de pointe.","Partir un peu plus tôt évite souvent le stress des retards.","Bien choisir son trajet peut faire gagner beaucoup de temps.","La sécurité sur la route passe avant la vitesse.","Les transports en commun sont un vrai fil vital dans une grande ville.","Prévoir de la petite monnaie facilite bien les trajets."],"questions":["Vous mettez combien de temps pour aller au travail ?","Quel moyen de transport utilisez-vous le plus ?","Vous évitez certaines heures de pointe ?","Quel est le trajet le plus compliqué pour vous ?","Vous préférez conduire ou être passager ?","Qu’est-ce qui vous agace le plus sur la route ?"],"related":["ville","auto","voyage"]},{"id":"meteo","kw":["pluie","chaleur","soleil","saison","harmattan","orage","froid","meteo","temperature","nuage","vent","climat","inondation"],"remarks":["La météo change l’humeur de bien des gens.","Pendant la saison des pluies, mieux vaut sortir avec un parapluie.","Par forte chaleur, pensez à bien vous hydrater.","L’harmattan rend l’air sec : un peu de crème et beaucoup d’eau aident.","Je ne vois pas la météo en direct, mais une application météo vous donnera l’information exacte.","Après la pluie, l’air est souvent plus frais."],"questions":["Il fait comment chez vous aujourd’hui ?","Vous préférez la pluie ou le soleil ?","Quelle saison aimez-vous le plus ?","Vous avez prévu quelque chose malgré la météo ?","Vous supportez bien la chaleur ?","Qu’aimez-vous faire quand il pleut ?"],"related":["loisirs","transport","voyage"]},{"id":"telephone","kw":["telephone","smartphone","internet","wifi","reseau","forfait","application","appli","whatsapp","facebook","tiktok","instagram","youtube","batterie","data","connexion","ecran"],"remarks":["Le téléphone est devenu un vrai couteau suisse du quotidien.","Pensez à sauvegarder régulièrement vos photos et contacts.","Mettre à jour son téléphone améliore souvent la sécurité.","Ne partagez jamais vos codes secrets, même avec quelqu’un qui dit venir d’une banque.","Une pause loin des écrans fait du bien.","Fermer les applications inutilisées économise la batterie."],"questions":["Vous utilisez surtout quelle application ?","Votre forfait internet vous suffit ?","Vous passez beaucoup de temps sur votre téléphone ?","Quelle appli ne pourriez-vous pas supprimer ?","Vous avez déjà eu un souci de réseau important ?","Vous préférez appeler ou écrire des messages ?"],"related":["technologie","securite","loisirs"]},{"id":"technologie","kw":["ordinateur","intelligence artificielle","robot","technologie","programmation","coder","informatique","logiciel","site web","numerique","tablette","innovation"],"remarks":["La technologie change vite, et il y a toujours quelque chose à apprendre.","L’intelligence artificielle peut aider, mais elle ne remplace pas le jugement humain.","Apprendre l’informatique ouvre beaucoup d’opportunités aujourd’hui.","Un bon outil numérique peut faire gagner un temps précieux.","La sécurité de ses données personnelles est devenue très importante.","Se former un peu chaque jour suffit pour progresser en technologie."],"questions":["Quel outil numérique vous est le plus utile ?","Vous aimeriez apprendre l’informatique ?","Que pensez-vous de l’intelligence artificielle ?","Vous utilisez un ordinateur au quotidien ?","Quelle nouveauté technologique vous a le plus surpris ?","Qu’aimeriez-vous que la technologie facilite dans votre vie ?"],"related":["telephone","sciences","motivation"]},{"id":"logement","kw":["logement","maison","appartement","loyer","demenager","demenagement","location","chambre","quartier","proprietaire","locataire","studio","bail","villa"],"remarks":["Bien choisir son logement, c’est choisir aussi son quotidien.","Avant de louer, il est prudent de tout faire écrire dans un contrat.","Un quartier calme et bien desservi change la vie.","Un petit rangement régulier rend n’importe quel logement plus agréable.","Visiter à plusieurs moments de la journée aide à bien juger un quartier.","Un logement propre et organisé fait du bien au moral."],"questions":["Vous cherchez un logement ou vous en avez déjà un ?","Vous habitez dans quel type de logement ?","Qu’est-ce qui compte le plus pour vous : le prix, le calme ou la proximité ?","Votre quartier vous plaît ?","Vous aimeriez déménager un jour ?","Quelle pièce de la maison préférez-vous ?"],"related":["ville","maison_entretien","argent"]},{"id":"fetes","kw":["fete","fetes","noel","tabaski","paques","ramadan","nouvel an","anniversaire","cadeau","reveillon","carnaval","fete des meres","fete des peres","saint valentin"],"remarks":["Les fêtes sont l’occasion de se retrouver et de partager.","Préparer à l’avance son budget évite le stress des fêtes.","Un petit mot gentil peut faire autant plaisir qu’un cadeau.","Chaque fête a ses traditions, et c’est ce qui les rend belles.","Les repas de fête restent souvent de bons souvenirs.","Penser aussi à ceux qui sont seuls pendant les fêtes est un beau geste."],"questions":["Quelle est votre fête préférée ?","Comment fêtez-vous d’habitude ?","Vous préparez déjà une fête en ce moment ?","Quel cadeau vous a le plus marqué ?","Quel plat ne manque jamais à vos fêtes ?","Avec qui aimez-vous fêter ?"],"related":["ceremonies","cuisine","famille"]},{"id":"ceremonies","kw":["mariage","dot","bapteme","funerailles","deuil","ceremonie","invitation","temoin","fiancailles","communion","veillee"],"remarks":["Les cérémonies rassemblent la famille et les amis autour d’un moment important.","Bien s’organiser à l’avance rend une cérémonie plus sereine.","Dans les moments de deuil, la présence des proches compte énormément.","Un mariage demande beaucoup de préparation, et de patience aussi.","Faire appel à des prestataires de confiance aide à réussir un événement.","Une belle cérémonie, c’est avant tout de bonnes personnes réunies."],"questions":["Vous préparez une cérémonie ?","Quand doit avoir lieu l’événement ?","Combien de personnes attendez-vous environ ?","Vous avez déjà trouvé des prestataires ?","Qu’est-ce qui vous inquiète le plus dans l’organisation ?","Comment puis-je vous aider pour cela ?"],"related":["fetes","famille","amitie"]},{"id":"humour","kw":["rire","drole","mdr","lol","ptdr","hilarant","rigoler","plaisanter","humoriste"],"remarks":["Le rire est bon pour le moral.","Un peu d’humour rend les journées plus légères.","Rire ensemble rapproche vraiment les gens.","Le rire fait du bien, même dans les moments compliqués.","Savoir rire de soi, c’est une vraie qualité.","Une bonne blague vaut mieux qu’un long discours !"],"questions":["Qu’est-ce qui vous fait le plus rire ?","Vous aimez les blagues ou l’humour des humoristes ?","Quelle est la dernière fois que vous avez beaucoup ri ?","Voulez-vous que je vous raconte une blague ?","Vous êtes plutôt blagueur ou public ?","Qui est la personne la plus drôle de votre entourage ?"],"related":["amitie","cinema","loisirs"]},{"id":"motivation","kw":["motivation","courage","reussir","reussite","succes","objectif","objectifs","reve","ambition","decourage","perseverer","projet","confiance en soi","avenir"],"remarks":["Chaque grande réussite commence par un petit pas.","Les obstacles font partie du chemin, pas la fin du chemin.","La persévérance finit presque toujours par payer.","Se fixer un petit objectif par semaine aide à avancer.","Se comparer aux autres fatigue : comparez-vous plutôt à qui vous étiez hier.","Croire en soi, c’est déjà la moitié du travail."],"questions":["Quel est votre objectif principal en ce moment ?","Quel premier petit pas pourriez-vous faire cette semaine ?","Qu’est-ce qui vous motive le plus ?","Qu’est-ce qui vous freine aujourd’hui ?","Quel rêve aimeriez-vous réaliser dans l’année ?","Qui pourrait vous soutenir dans ce projet ?"],"related":["travail","entrepreneuriat","sagesse"]},{"id":"entrepreneuriat","kw":["entreprise","commerce","boutique","business","client","clients","vendre","vente","creer","entrepreneur","commercant","stock","fournisseur","benefice","magasin"],"remarks":["Réussir un commerce demande de la constance et un bon service client.","Un client satisfait revient et en amène d’autres.","Bien suivre ses entrées et ses dépenses est la base d’une activité durable.","Commencer petit et grandir progressivement est souvent plus sûr.","Un bon fournisseur est un vrai partenaire.","Une activité bien organisée a besoin de personnes de confiance."],"questions":["Quelle est votre activité ou votre projet ?","Depuis combien de temps l’exercez-vous ?","Qui sont vos principaux clients ?","Avez-vous besoin de personnel pour vous aider ?","Quel est votre plus grand défi en ce moment ?","Où aimeriez-vous voir votre activité dans deux ans ?"],"related":["argent","travail","motivation"]},{"id":"agriculture","kw":["agriculture","champ","plantation","cacao","cafe","hevea","cultiver","jardin","recolte","ferme","elevage","planteur","igname","manioc","banane","anacarde"],"remarks":["L’agriculture nourrit tout le monde, c’est un métier précieux.","La Côte d’Ivoire est connue dans le monde pour son cacao.","Une bonne récolte demande du travail, de la patience et un peu de pluie.","Cultiver un petit jardin à la maison est un plaisir et une économie.","Les cultures vivrières, comme l’igname ou le manioc, nourrissent beaucoup de familles.","Protéger la terre aujourd’hui, c’est préparer les récoltes de demain."],"questions":["Vous cultivez quelque chose ?","Vous avez un champ ou un petit jardin ?","Quelle culture vous plaît le plus ?","La saison des récoltes se passe bien ?","Vous aimeriez vous lancer dans l’agriculture ?","Quelle plante aimez-vous avoir autour de vous ?"],"related":["animaux","cuisine","meteo"]},{"id":"animaux","kw":["chien","chat","animal","animaux","poule","mouton","oiseau","chevre","vache","veterinaire","perroquet"],"remarks":["Les animaux apportent beaucoup d’affection à leur maître.","Un animal demande du temps, de l’attention et des soins réguliers.","Un chien fidèle est souvent un excellent gardien et un bon ami.","Les chats ont leur caractère bien à eux !","Un animal en bonne santé a besoin d’une bonne alimentation et de visites chez le vétérinaire.","Les enfants apprennent beaucoup au contact des animaux."],"questions":["Vous avez un animal chez vous ?","Comment s’appelle-t-il ?","Vous préférez les chiens ou les chats ?","Quel animal aimeriez-vous avoir ?","Quelle est sa plus drôle d’habitude ?","Vous avez grandi avec des animaux ?"],"related":["agriculture","enfants","loisirs"]},{"id":"mode","kw":["mode","vetement","vetements","habit","robe","pagne","couture","beaute","coiffure","maquillage","chaussure","chaussures","style","tenue","parfum","bijou","tresse"],"remarks":["Chacun a son style, et c’est ce qui fait le charme.","Le pagne et ses motifs racontent de belles histoires.","Un vêtement bien choisi donne confiance.","Une tenue soignée fait toujours bonne impression, surtout à un entretien.","Se sentir bien dans ses vêtements compte plus que de suivre la mode.","Un bon couturier fait toute la différence."],"questions":["Quel est votre style préféré ?","Vous avez un couturier ou une couturière de confiance ?","Quelle tenue vous fait vous sentir le mieux ?","Vous aimez les couleurs vives ou sobres ?","Quelle occasion vous donne envie de bien vous habiller ?","Vous suivez la mode ou vous préférez votre propre style ?"],"related":["fetes","ceremonies","amitie"]},{"id":"auto","kw":["voiture","mecanique","panne","permis","garage","essence","conducteur","pneu","vidange","vehicule","auto","camion"],"remarks":["Un entretien régulier évite bien des pannes.","La prudence au volant protège tout le monde.","Vérifier ses pneus et ses freins régulièrement est une bonne habitude.","Un bon mécanicien est précieux, surtout de confiance.","Respecter le code de la route, c’est protéger sa famille aussi.","Faire la vidange à temps prolonge la vie d’un moteur."],"questions":["Vous avez une voiture ou une moto ?","Vous conduisez depuis longtemps ?","Vous avez un mécanicien de confiance ?","Quelle est la panne la plus difficile que vous ayez eue ?","Quelle voiture rêvez-vous de conduire ?","Vous conduisez tous les jours ?"],"related":["transport","securite","argent"]},{"id":"education","kw":["education","discipline","sage","devoirs","creche","garderie","adolescent","ado","grandir","eduquer"],"remarks":["Éduquer, c’est montrer l’exemple autant que parler.","La patience et la cohérence sont les meilleurs alliés d’un parent.","Écouter un enfant l’aide à se sentir en confiance.","Féliciter les efforts motive plus que critiquer les erreurs.","Chaque âge a ses défis, et ils passent avec le temps.","Un cadre clair, avec de la tendresse, aide un enfant à grandir."],"questions":["Quel âge ont vos enfants ?","Qu’est-ce qui est le plus difficile à votre avis dans l’éducation ?","Vous avez des astuces qui marchent bien chez vous ?","Comment se passent les devoirs à la maison ?","Quelles valeurs aimeriez-vous transmettre ?","Vous avez de l’aide pour la garde des enfants ?"],"related":["enfants","ecole","famille"]},{"id":"tristesse","kw":["triste","tristesse","deprime","seul","seule","solitude","pleurer","cafard","mal etre","souffrance","decourage","decouragee","chagrin","peine","moral"],"remarks":["Merci de me confier cela, ce n’est pas toujours facile à dire.","Ce que vous ressentez est réel, et vous avez le droit de ne pas aller bien.","Les moments de tristesse passent, même si c’est long parfois.","Parler à une personne de confiance peut alléger le cœur.","Une petite chose agréable dans la journée peut déjà aider un peu.","Vous n’êtes pas obligé(e) de tout porter seul(e)."],"questions":["Voulez-vous me dire ce qui vous pèse ?","Y a-t-il quelqu’un de proche avec qui vous pouvez parler ?","Depuis quand vous sentez-vous ainsi ?","Qu’est-ce qui vous fait du bien d’habitude ?","Avez-vous pu vous reposer un peu ?","Que pourrais-je faire pour alléger un peu votre journée ?"],"related":["bien_etre","amitie","famille"]},{"id":"joie","kw":["content","contente","heureux","heureuse","joie","bonne nouvelle","gagne","fier","fiere","reussi","felicitations","victoire"],"remarks":["Quelle belle nouvelle, cela fait plaisir à lire !","Les bons moments méritent d’être savourés.","Vous avez de quoi être fier(e) !","Partager sa joie, c’est la multiplier.","Un bon moment comme celui-là donne de l’énergie pour la suite.","Bravo à vous, vous le méritez !"],"questions":["Racontez-moi, qu’est-ce qui s’est passé ?","Qui a été le premier à l’apprendre ?","Comment allez-vous fêter cela ?","Qu’est-ce que cela change pour vous ?","Qu’est-ce qui vous rend le plus fier(e) ?","Vous allez le partager avec vos proches ?"],"related":["fetes","famille","motivation"]},{"id":"politique","kw":["politique","election","elections","gouvernement","president","parti","vote","ministre","assemblee","loi","democratie"],"remarks":["La politique est un sujet qui passionne et qui divise parfois.","Je préfère rester neutre sur les sujets politiques.","Chacun a le droit d’avoir ses opinions, dans le respect des autres.","S’informer auprès de plusieurs sources aide à se faire une opinion.","Voter est un droit important dans une démocratie.","Une discussion calme est plus utile qu’une dispute."],"questions":["Qu’est-ce qui vous intéresse dans l’actualité ?","Où vous informez-vous en général ?","Quel sujet de société vous tient à cœur ?","Souhaitez-vous qu’on parle d’autre chose de plus léger ?","Quel changement aimeriez-vous voir dans votre quartier ?","Que souhaitez-vous améliorer autour de vous ?"],"related":["sagesse","ville","loisirs"]},{"id":"langues","kw":["langue","langues","francais","anglais","nouchi","traduire","dialecte","baoule","dioula","bete","senoufo","vocabulaire","accent","espagnol","arabe"],"remarks":["Parler plusieurs langues ouvre énormément de portes.","Le nouchi est une belle preuve de la créativité des langues vivantes.","Apprendre une langue, c’est aussi découvrir une culture.","Pratiquer un peu chaque jour vaut mieux qu’un long cours une fois par semaine.","En Côte d’Ivoire, de nombreuses langues se côtoient, c’est une vraie richesse.","Oser parler, même avec des erreurs, est la meilleure façon de progresser."],"questions":["Quelles langues parlez-vous ?","Quelle langue aimeriez-vous apprendre ?","Vous parlez quelle langue à la maison ?","Vous avez une expression préférée dans votre langue ?","Vous avez déjà essayé d’apprendre l’anglais ?","Quel mot de votre langue aimeriez-vous qu’on connaisse partout ?"],"related":["ecole","voyage","livres"]},{"id":"livres","kw":["livre","livres","lire","lecture","roman","auteur","bibliotheque","poeme","poesie","conte","magazine"],"remarks":["Un bon livre est un compagnon fidèle.","Lire un peu chaque jour enrichit le vocabulaire et l’esprit.","Les contes africains sont de vrais trésors de sagesse.","La lecture aide aussi à bien dormir quand on la fait avant le coucher.","Un livre offert est souvent un cadeau qui marque.","Lire à voix haute aux enfants développe leur imagination."],"questions":["Quel est le dernier livre que vous avez lu ?","Vous préférez les romans, les contes ou les livres pratiques ?","Vous lisez plutôt le soir ou la journée ?","Quel livre conseilleriez-vous à un ami ?","Vous aimez la poésie ?","Vous lisez des livres en papier ou sur téléphone ?"],"related":["ecole","langues","cinema"]},{"id":"jeux","kw":["jeu","jeux","jouer","ludo","awale","dames","echecs","playstation","console","jeux video","domino","puzzle","mots croises","quiz"],"remarks":["Les jeux de société rapprochent petits et grands.","L’awalé est un jeu de stratégie très ancien et très apprécié en Afrique.","Jouer, c’est aussi apprendre à gérer la victoire et la défaite.","Les échecs développent la patience et la réflexion.","Un petit jeu après une journée chargée est une bonne détente.","Les jeux vidéo, en quantité raisonnable, sont un loisir comme un autre."],"questions":["À quel jeu aimez-vous jouer ?","Vous jouez plutôt seul ou à plusieurs ?","Quel jeu vous rappelle votre enfance ?","Voulez-vous que je vous propose une devinette ?","Vous êtes bon joueur quand vous perdez ?","Quel jeu aimeriez-vous apprendre ?"],"related":["loisirs","amitie","enfants"]},{"id":"ville","kw":["abidjan","ville","bruit","vie urbaine","banlieue","campagne","cocody","yopougon","immeuble","capitale"],"remarks":["Abidjan est une ville vivante, pleine d’énergie jour et nuit.","La vie en ville est rythmée, avec ses avantages et ses contraintes.","Chaque quartier a son ambiance et ses petites adresses.","La vie au village est plus calme, avec un autre rythme.","Les marchés sont le cœur de la vie d’un quartier.","En ville, un bon voisinage rend la vie bien plus douce."],"questions":["Vous êtes en ville ou au village en ce moment ?","Vous aimez le rythme de la ville ?","Quel est votre quartier préféré ?","Qu’est-ce que vous aimez le plus dans votre quartier ?","Vous préférez la ville ou la campagne ?","Quel endroit de la ville aimez-vous le plus ?"],"related":["transport","logement","voyage"]},{"id":"securite","kw":["securite","vol","voleur","peur","danger","police","cambriolage","alarme","arnaque","agression","prudence","cadenas"],"remarks":["La prudence au quotidien évite bien des soucis.","Ne partagez jamais vos codes secrets ou mots de passe.","Méfiez-vous des offres trop belles pour être vraies : ce sont souvent des arnaques.","Une bonne porte et un bon voisinage protègent mieux qu’on ne le pense.","En cas de danger immédiat, contactez les services de secours de votre pays.","Avant d’engager quelqu’un chez soi, il est prudent de demander des références."],"questions":["Il y a quelque chose qui vous inquiète en ce moment ?","Vous vous sentez en sécurité dans votre quartier ?","Vous avez déjà été confronté à une arnaque ?","Vous avez de bons voisins sur qui compter ?","Voulez-vous quelques conseils de prudence ?","Comment puis-je vous aider sur ce point ?"],"related":["logement","telephone","argent"]},{"id":"papiers","kw":["papier","papiers","document","documents","carte d identite","cni","passeport","extrait de naissance","mairie","administration","certificat","casier judiciaire","legalisation","photocopie"],"remarks":["Garder ses documents importants en copie, c’est une bonne habitude.","Pour les démarches administratives, il vaut mieux se renseigner auprès du service concerné.","Les délais varient souvent, il est prudent de s’y prendre à l’avance.","Un dossier bien rangé évite de perdre du temps.","Conservez toujours une copie numérique de vos papiers importants.","Vérifiez que les informations sur vos documents sont exactes."],"questions":["De quel document avez-vous besoin ?","Vous avez déjà commencé la démarche ?","Vous avez des copies de vos documents importants ?","Cela concerne un emploi ou une autre démarche ?","Voulez-vous que je vous aide à lister ce qu’il vous faut ?","Y a-t-il un délai à respecter ?"],"related":["travail","securite","voyage"]},{"id":"loisirs","kw":["loisir","loisirs","weekend","week end","sortie","distraction","passe temps","ennui","ennuyer","sortir","pique nique","balade"],"remarks":["Un bon week-end, c’est un mélange de repos et de petites sorties.","S’accorder des loisirs aide à mieux supporter la semaine.","Les petites sorties entre amis coûtent peu et font beaucoup de bien.","Un nouveau passe-temps peut redonner de l’énergie.","S’ennuyer est parfois le début d’une bonne idée.","Une balade à pied, même courte, change les idées."],"questions":["Que faites-vous d’habitude le week-end ?","Quel loisir aimeriez-vous commencer ?","Vous préférez sortir ou rester chez vous ?","Qu’est-ce que vous avez fait de sympa récemment ?","Vous avez un projet de sortie bientôt ?","Avec qui aimez-vous passer votre temps libre ?"],"related":["amitie","musique","jeux"]},{"id":"sagesse","kw":["sagesse","destin","patience","bonheur","sens de la vie","philosophie","honnetete"],"remarks":["La patience est une force qu’on sous-estime souvent.","Le bonheur se trouve souvent dans les choses simples.","L’honnêteté est une valeur qui ouvre beaucoup de portes.","Ce qu’on donne aux autres revient souvent d’une manière ou d’une autre.","Le respect est la base de toute bonne relation.","Un bon conseil vaut parfois plus qu’un grand cadeau."],"questions":["Quelle valeur compte le plus pour vous ?","Qu’est-ce qui vous rend vraiment heureux ?","Quel conseil de vie vous a le plus aidé ?","Que diriez-vous à quelqu’un qui commence sa vie professionnelle ?","Quelle personne vous inspire le plus ?","Qu’est-ce que vous aimeriez transmettre autour de vous ?"],"related":["motivation","religion","souvenirs"]},{"id":"maison_entretien","kw":["menage","lessive","vaisselle","ranger","linge","repassage","poussiere","desinfecter","balai","serpillere","entretien de la maison","javel"],"remarks":["Un petit rangement chaque jour évite les grosses corvées.","Ne mélangez jamais l’eau de javel avec d’autres produits ménagers : cela peut dégager des gaz dangereux.","Aérer chaque jour la maison aide à garder un air sain.","Commencer par le haut et finir par le sol est une bonne méthode pour nettoyer.","Laver le linge à la bonne température protège les tissus.","Une maison bien tenue, c’est aussi un esprit plus tranquille."],"questions":["Vous préférez faire le ménage vous-même ou vous faire aider ?","Quelle tâche ménagère vous pèse le plus ?","Vous cherchez quelqu’un pour vous aider à la maison ?","Vous avez une astuce de nettoyage qui marche bien ?","Quel est votre jour de grand ménage ?","Voulez-vous que je prépare une demande pour trouver une aide à la maison ?"],"related":["logement","cuisine","education"]},{"id":"sciences","kw":["etoile","etoiles","planete","planetes","lune","espace","science","sciences","univers","atome","dinosaure","volcan","mer","ocean"],"remarks":["L’univers est immense, et on en découvre un peu plus chaque année.","La science explique beaucoup de choses, mais pose aussi de nouvelles questions.","Un enfant curieux d’astronomie devient souvent un adulte curieux de tout.","La Terre est la seule planète connue à abriter la vie, pour l’instant.","Les océans couvrent la majeure partie de la surface de la Terre.","Observer le ciel étoilé est un spectacle gratuit et magnifique."],"questions":["Vous aimez regarder les étoiles ?","Quelle découverte scientifique vous fascine le plus ?","Vous étiez bon en sciences à l’école ?","Quelle planète vous intrigue le plus ?","Voulez-vous une petite anecdote scientifique ?","Vous aimez les documentaires sur la nature ?"],"related":["technologie","livres","ecole"]},{"id":"souvenirs","kw":["enfance","souvenir","souvenirs","nostalgie","jeunesse","autrefois"],"remarks":["Les souvenirs d’enfance ont une saveur particulière.","La nostalgie nous rappelle ce qui a compté pour nous.","Se souvenir, c’est aussi garder vivants ceux qu’on aime.","Les photos anciennes racontent plus qu’on ne l’imagine.","Les jeux d’enfance restent souvent gravés pour toujours.","Raconter ses souvenirs est un beau cadeau pour les plus jeunes."],"questions":["Quel est votre plus beau souvenir d’enfance ?","À quoi jouiez-vous quand vous étiez petit(e) ?","Où avez-vous grandi ?","Quel plat ou quelle odeur vous rappelle votre enfance ?","Quelle personne a le plus marqué votre jeunesse ?","Quel souvenir aimeriez-vous revivre ?"],"related":["famille","parents","amitie"]}],"expert":[{"kw":["cv conseil","cv faire","cv ecrire","cv comment","curriculum"],"a":"Un bon CV tient sur une page. // Mettez vos coordonnées, vos expériences récentes, vos compétences et vos références. // Soyez clair, honnête et sans fautes.","follow":"candidat"},{"kw":["entretien embauche","entretien conseil","entretien preparer","entretien reussir","entretien travail"],"a":"Soyez ponctuel et présentez-vous avec une tenue propre et soignée. // Écoutez bien les questions et répondez simplement et honnêtement. // Montrez votre motivation et posez une ou deux questions sur le poste.","follow":"candidat"},{"kw":["trouver travail","trouver emploi","trouver boulot","decrocher emploi"],"a":"Dites clairement quel métier vous voulez et ce que vous savez faire. // Préparez vos références et un numéro WhatsApp actif. // Un dossier clair aide beaucoup les employeurs à vous choisir.","follow":"candidat"},{"kw":["choisir nounou","recruter nounou","engager nounou","embaucher nounou","bonne nounou"],"a":"Demandez des références et appelez les anciens employeurs. // Faites une période d’essai et parlez clairement des horaires et des tâches. // Observez surtout le sens des responsabilités et la douceur avec les enfants.","follow":"employeur"},{"kw":["choisir menagere","recruter menagere","engager menagere","embaucher menagere","choisir employe maison","recruter personnel maison"],"a":"Définissez par écrit les tâches, les horaires et les jours de repos. // Demandez des références et faites un essai de quelques jours. // Un accord clair dès le début évite la plupart des malentendus.","follow":"employeur"},{"kw":["salaire fixer","salaire combien","quel salaire","remuneration","salaire employe"],"a":"Le salaire dépend du poste, de l’expérience, des horaires et du lieu. // L’important est de le fixer clairement et par écrit avant de commencer. // Un conseiller peut vous orienter selon votre situation.","follow":"employeur"},{"kw":["contrat travail","periode essai","contrat ecrit","contrat employe"],"a":"Un accord écrit protège l’employeur comme l’employé. // Il précise les tâches, les horaires, le salaire et la durée d’essai. // Pour les détails légaux, renseignez-vous auprès des services du travail.","follow":""},{"kw":["documents emploi","papiers emploi","quels documents travail","pieces fournir","dossier emploi"],"a":"En général, on prépare une pièce d’identité, un contact joignable et des références. // Un CV simple et des attestations d’expérience sont un plus. // Chaque employeur peut demander des pièces différentes.","follow":"candidat"},{"kw":["references employe","verifier references","antecedents","confiance employe","verifier employe"],"a":"Appelez les anciens employeurs et posez des questions précises. // Faites un essai avant l’engagement définitif. // Gardez les objets de valeur en lieu sûr, par prudence.","follow":"employeur"},{"kw":["conseils menagere","metier menagere","devenir menagere"],"a":"Être ponctuelle, discrète et soigneuse est la base du métier. // Demandez dès le début les tâches attendues et les horaires. // Un travail bien fait amène souvent de nouveaux employeurs.","follow":"candidat"},{"kw":["devenir nounou","conseils nounou","metier nounou","garde enfants metier"],"a":"Une bonne nounou est patiente, attentive et fiable. // Ne laissez jamais un jeune enfant seul, surtout près de l’eau ou d’un escalier. // Parlez régulièrement avec les parents de la journée de l’enfant.","follow":"candidat"},{"kw":["devenir cuisinier","conseils cuisinier","metier cuisinier","hygiene cuisine"],"a":"L’hygiène est essentielle : mains propres, plan de travail net, aliments bien conservés. // Un bon cuisinier organise ses courses et évite le gaspillage. // Un menu simple bien exécuté vaut mieux qu’un menu compliqué raté.","follow":"candidat"},{"kw":["devenir gardien","conseils gardien","metier gardien","agent securite metier"],"a":"Un gardien fiable est vigilant, ponctuel et reste calme. // Notez ce qui se passe et prévenez vite en cas de souci. // Une bonne communication avec l’employeur est essentielle.","follow":"candidat"},{"kw":["devenir chauffeur","conseils chauffeur","metier chauffeur"],"a":"Un bon chauffeur respecte le code de la route et la ponctualité. // Un permis valide et un bon dossier de conduite rassurent l’employeur. // L’entretien du véhicule fait aussi partie du métier.","follow":"candidat"},{"kw":["conseils jardinier","metier jardinier","entretien jardin","arroser plantes","jardinage conseil"],"a":"Arrosez tôt le matin ou en fin de journée pour éviter l’évaporation. // Taillez avec des outils propres et bien affûtés. // Un jardin entretenu régulièrement demande moins d’effort qu’un jardin rattrapé.","follow":"service"},{"kw":["fuite eau","robinet fuit","plomberie conseil","tuyau fuite","canalisation"],"a":"En cas de fuite, fermez d’abord l’arrivée d’eau principale. // Épongez pour éviter les dégâts et prenez une photo. // Pour réparer proprement, mieux vaut un plombier.","follow":"service"},{"kw":["court circuit","panne courant","electricite securite","prise electrique","disjoncteur"],"a":"Coupez le courant avant toute intervention, et n’y touchez jamais avec les mains mouillées. // Ne bricolez pas les fils : faites appel à un électricien. // En cas de fumée ou d’odeur de brûlé, éloignez-vous et coupez le courant.","follow":"service"},{"kw":["peinture conseil","peindre mur","peinture maison","repeindre"],"a":"Protégez le sol et les meubles avant de commencer. // Nettoyez et poncez les murs pour une meilleure tenue. // Aérez bien la pièce pendant et après la peinture.","follow":"service"},{"kw":["devis prestation","devis conseil","payer prestataire","acompte","prix intervention"],"a":"Demandez un devis écrit avec le détail du travail et du prix. // Prévoyez seulement un acompte raisonnable, et le solde à la fin du travail. // Comparez deux ou trois offres avant de décider.","follow":"service"},{"kw":["organiser fete","organiser evenement","traiteur","evenement prestation","organiser mariage"],"a":"Fixez d’abord la date, le lieu, le nombre d’invités et le budget. // Réservez les prestataires assez tôt. // Gardez une marge pour les imprévus.","follow":"service"},{"kw":["demenagement conseil","demenager conseil","cartons","demenager aide"],"a":"Faites le tri avant d’emballer : moins à porter, moins à payer. // Étiquetez chaque carton par pièce. // Gardez à part les papiers et les objets de valeur.","follow":"service"},{"kw":["recruter vendeuse","engager vendeur","personnel boutique","recruter caissiere","recruter commerce"],"a":"Précisez les tâches, les horaires et l’expérience attendue. // Testez la personne quelques jours avant de l’engager. // Un vendeur aimable fait revenir les clients.","follow":"employeur"},{"kw":["arnaque emploi","faux recruteur","offre emploi suspecte","payer pour travail","frais recrutement"],"a":"Méfiez-vous des offres qui demandent de l’argent avant de commencer à travailler. // Vérifiez toujours l’identité de l’entreprise et le lieu de travail. // Ne donnez jamais vos codes bancaires ou secrets.","follow":""},{"kw":["comment marche","fonctionnement placement","comment fonctionne","etapes dossier","comment placement"],"a":"Vous me donnez vos informations pour préparer votre dossier. // Un conseiller l’étudie et vous contacte sur WhatsApp. // Ensuite, on cherche la personne ou le poste qui correspond.","follow":""},{"kw":["delai placement","delai dossier","delai reponse","recevoir reponse dossier"],"a":"Le délai dépend de la demande et du profil recherché. // Un conseiller vous donnera une estimation après étude de votre dossier. // Un numéro WhatsApp actif accélère les choses.","follow":""},{"kw":["recrutement entreprise","recruter plusieurs","personnel entreprise","recruter ouvriers"],"a":"Dites-moi les postes, le nombre de personnes et le lieu. // Précisez les compétences et les horaires attendus. // Un conseiller vous proposera des profils adaptés.","follow":"employeur"},{"kw":["travail journalier","temps partiel","ponctuel menage","aide quelques heures"],"a":"On peut chercher une aide à temps plein, à temps partiel ou à la journée. // Précisez les jours et les heures qui vous conviennent. // Plus la demande est claire, plus le choix est rapide.","follow":"employeur"},{"kw":["loge non loge","personnel loge","employe loge","hebergement employe"],"a":"Précisez si la personne doit être logée ou non. // Cela change beaucoup les conditions et le choix des candidats. // Dites-le clairement dès le début.","follow":"employeur"},{"kw":["job etudiant","petit boulot","job vacances","travail etudiant"],"a":"Il existe des petits travaux flexibles compatibles avec les études. // Précisez vos horaires libres et votre commune. // Un dossier clair vous fait gagner du temps.","follow":"candidat"},{"kw":["changer metier","reconversion","nouveau metier","apprendre metier"],"a":"Changer de métier demande de la préparation, mais c’est possible. // Listez ce que vous savez déjà faire et ce que vous voulez apprendre. // Une formation courte peut suffire pour un nouveau départ.","follow":"candidat"},{"kw":["aide personnes agees","garde malade","aide domicile","garde personne agee"],"a":"Une aide à domicile demande patience, douceur et fiabilité. // Précisez les besoins : toilette, repas, compagnie, horaires. // Une période d’essai permet de vérifier que le courant passe.","follow":"employeur"},{"kw":["lessive conseil","repassage conseil","laver linge","tache vetement","enlever tache"],"a":"Traitez les taches vite, avec de l’eau froide pour commencer. // Triez le linge par couleur avant de laver. // Vérifiez toujours l’étiquette d’entretien des vêtements.","follow":""},{"kw":["nettoyer cuisine","nettoyer salle bain","astuce menage","produit menage","desinfecter maison"],"a":"Commencez par dépoussiérer en haut, puis nettoyez le sol en dernier. // Ne mélangez jamais deux produits ménagers, surtout avec de l’eau de javel. // Rincez bien et aérez la pièce.","follow":"service"},{"kw":["conservation aliments","conserver nourriture","frigo conseil","aliments perimes"],"a":"Mettez les aliments cuits au frais rapidement après le repas. // Ne remettez jamais au frigo un plat resté longtemps à température ambiante. // Chauffez bien les restes avant de les manger.","follow":""},{"kw":["securite enfant","bebe securite","enfant danger maison","accident domestique"],"a":"Gardez les produits ménagers et les médicaments hors de portée des enfants. // Surveillez toujours un jeune enfant près de l’eau, d’un escalier ou d’une cuisine. // Protégez les prises et fermez les portes dangereuses.","follow":""}],"qa":[{"k":"capitale france","a":"La capitale est Paris."},{"k":"capitale senegal","a":"La capitale est Dakar."},{"k":"capitale mali","a":"La capitale est Bamako."},{"k":"capitale burkina faso","a":"La capitale est Ouagadougou."},{"k":"capitale ghana","a":"La capitale est Accra."},{"k":"capitale nigeria","a":"La capitale est Abuja."},{"k":"capitale togo","a":"La capitale est Lomé."},{"k":"capitale guinee","a":"La capitale est Conakry."},{"k":"capitale cameroun","a":"La capitale est Yaoundé."},{"k":"capitale gabon","a":"La capitale est Libreville."},{"k":"capitale rdc","a":"La capitale est Kinshasa."},{"k":"capitale republique democratique du congo","a":"La capitale est Kinshasa."},{"k":"capitale congo brazzaville","a":"La capitale est Brazzaville."},{"k":"capitale maroc","a":"La capitale est Rabat."},{"k":"capitale algerie","a":"La capitale est Alger."},{"k":"capitale tunisie","a":"La capitale est Tunis."},{"k":"capitale egypte","a":"La capitale est Le Caire."},{"k":"capitale kenya","a":"La capitale est Nairobi."},{"k":"capitale ethiopie","a":"La capitale est Addis-Abeba."},{"k":"capitale niger","a":"La capitale est Niamey."},{"k":"capitale tchad","a":"La capitale est N’Djamena."},{"k":"capitale liberia","a":"La capitale est Monrovia."},{"k":"capitale sierra leone","a":"La capitale est Freetown."},{"k":"capitale mauritanie","a":"La capitale est Nouakchott."},{"k":"capitale madagascar","a":"La capitale est Antananarivo."},{"k":"capitale rwanda","a":"La capitale est Kigali."},{"k":"capitale angola","a":"La capitale est Luanda."},{"k":"capitale ouganda","a":"La capitale est Kampala."},{"k":"capitale etats unis","a":"La capitale est Washington."},{"k":"capitale usa","a":"La capitale est Washington."},{"k":"capitale canada","a":"La capitale est Ottawa."},{"k":"capitale bresil","a":"La capitale est Brasilia."},{"k":"capitale argentine","a":"La capitale est Buenos Aires."},{"k":"capitale chine","a":"La capitale est Pékin."},{"k":"capitale japon","a":"La capitale est Tokyo."},{"k":"capitale inde","a":"La capitale est New Delhi."},{"k":"capitale royaume uni","a":"La capitale est Londres."},{"k":"capitale angleterre","a":"La capitale est Londres."},{"k":"capitale allemagne","a":"La capitale est Berlin."},{"k":"capitale espagne","a":"La capitale est Madrid."},{"k":"capitale italie","a":"La capitale est Rome."},{"k":"capitale belgique","a":"La capitale est Bruxelles."},{"k":"capitale portugal","a":"La capitale est Lisbonne."},{"k":"capitale russie","a":"La capitale est Moscou."},{"k":"capitale turquie","a":"La capitale est Ankara."},{"k":"capitale arabie saoudite","a":"La capitale est Riyad."},{"k":"capitale australie","a":"La capitale est Canberra."},{"k":"capitale mexique","a":"La capitale est Mexico."},{"k":"capitale gambie","a":"La capitale est Banjul."},{"k":"capitale guinee bissau","a":"La capitale est Bissau."},{"k":"capitale cap vert","a":"La capitale est Praia."},{"k":"capitale zambie","a":"La capitale est Lusaka."},{"k":"capitale zimbabwe","a":"La capitale est Harare."},{"k":"capitale mozambique","a":"La capitale est Maputo."},{"k":"capitale namibie","a":"La capitale est Windhoek."},{"k":"capitale botswana","a":"La capitale est Gaborone."},{"k":"capitale burundi","a":"La capitale est Gitega."},{"k":"capitale centrafrique","a":"La capitale est Bangui."},{"k":"capitale djibouti","a":"La capitale est Djibouti."},{"k":"capitale somalie","a":"La capitale est Mogadiscio."},{"k":"capitale soudan","a":"La capitale est Khartoum."},{"k":"capitale libye","a":"La capitale est Tripoli."},{"k":"capitale grece","a":"La capitale est Athènes."},{"k":"capitale pologne","a":"La capitale est Varsovie."},{"k":"capitale suede","a":"La capitale est Stockholm."},{"k":"capitale norvege","a":"La capitale est Oslo."},{"k":"capitale irlande","a":"La capitale est Dublin."},{"k":"capitale autriche","a":"La capitale est Vienne."},{"k":"capitale coree du sud","a":"La capitale est Séoul."},{"k":"capitale indonesie","a":"La capitale est Jakarta."},{"k":"capitale pakistan","a":"La capitale est Islamabad."},{"k":"capitale iran","a":"La capitale est Téhéran."},{"k":"capitale irak","a":"La capitale est Bagdad."},{"k":"capitale israel","a":"La capitale est Jérusalem."},{"k":"capitale liban","a":"La capitale est Beyrouth."},{"k":"capitale cuba","a":"La capitale est La Havane."},{"k":"capitale colombie","a":"La capitale est Bogota."},{"k":"capitale chili","a":"La capitale est Santiago."},{"k":"capitale perou","a":"La capitale est Lima."},{"k":"capitale cote ivoire","a":"Yamoussoukro est la capitale politique et Abidjan la capitale économique."},{"k":"capitale benin","a":"Porto-Novo est la capitale officielle, et le gouvernement siège à Cotonou."},{"k":"capitale afrique sud","a":"L’Afrique du Sud a trois capitales : Pretoria, Le Cap et Bloemfontein."},{"k":"capitale tanzanie","a":"Dodoma est la capitale officielle ; Dar es Salam est la plus grande ville."},{"k":"capitale suisse","a":"Berne est la ville fédérale de la Suisse."},{"k":"capitale congo","a":"Brazzaville pour la République du Congo, Kinshasa pour la RDC."},{"k":"devise cote ivoire","a":"La devise de la Côte d’Ivoire est « Union, Discipline, Travail »."},{"k":"independance cote ivoire","a":"La Côte d’Ivoire est devenue indépendante le 7 août 1960."},{"k":"premier president cote ivoire","a":"Félix Houphouët-Boigny fut le premier président de la Côte d’Ivoire."},{"k":"monnaie cote ivoire","a":"La monnaie est le franc CFA (XOF)."},{"k":"langue officielle cote ivoire","a":"La langue officielle est le français."},{"k":"fete nationale cote ivoire","a":"La fête nationale est célébrée le 7 août."},{"k":"nombre planetes","a":"Le système solaire compte huit planètes."},{"k":"plus grande planete","a":"Jupiter est la plus grande planète du système solaire."},{"k":"plus grand ocean","a":"L’océan Pacifique est le plus grand océan."},{"k":"plus haute montagne","a":"L’Everest est la plus haute montagne du monde."},{"k":"plus long fleuve","a":"Le Nil et l’Amazone se disputent ce titre selon la façon de mesurer."},{"k":"plus grand desert chaud","a":"Le Sahara est le plus grand désert chaud du monde."},{"k":"nombre continents","a":"On compte généralement cinq à sept continents, selon le modèle utilisé."},{"k":"nombre jours annee","a":"Une année compte 365 jours, et 366 les années bissextiles."},{"k":"nombre jours semaine","a":"Une semaine compte sept jours."},{"k":"nombre mois annee","a":"Il y a douze mois dans une année."},{"k":"eau bout temperature","a":"L’eau bout à 100 °C au niveau de la mer."},{"k":"valeur pi","a":"Pi vaut environ 3,14."},{"k":"nombre os corps","a":"Un adulte a en général 206 os."},{"k":"nombre dents adulte","a":"Un adulte a généralement 32 dents."},{"k":"nombre joueurs football equipe","a":"Une équipe de football compte onze joueurs sur le terrain."},{"k":"coupe monde frequence","a":"La Coupe du monde de football a lieu tous les quatre ans."},{"k":"jeux olympiques frequence","a":"Les Jeux olympiques d’été ont lieu tous les quatre ans."},{"k":"inventeur telephone","a":"On cite souvent Alexander Graham Bell pour l’invention du téléphone."},{"k":"inventeur ampoule","a":"On cite Thomas Edison, même si plusieurs inventeurs ont contribué à l’ampoule."},{"k":"decouverte amerique","a":"Christophe Colomb est arrivé en Amérique en 1492, mais des peuples y vivaient déjà depuis très longtemps."},{"k":"soleil etoile","a":"Oui, le Soleil est une étoile."},{"k":"lune satellite","a":"La Lune est le satellite naturel de la Terre."},{"k":"vitesse lumiere","a":"La lumière voyage à environ 300 000 kilomètres par seconde."},{"k":"formule eau","a":"La formule de l’eau est H2O."},{"k":"minutes heure","a":"Il y a 60 minutes dans une heure."},{"k":"secondes minute","a":"Il y a 60 secondes dans une minute."},{"k":"heures jour","a":"Il y a 24 heures dans une journée."},{"k":"metres kilometre","a":"Un kilomètre fait 1 000 mètres."},{"k":"centimetres metre","a":"Un mètre fait 100 centimètres."},{"k":"grammes kilo","a":"Un kilo fait 1 000 grammes."},{"k":"plus grand pays","a":"La Russie est le plus grand pays du monde par la superficie."},{"k":"plus petit pays","a":"Le Vatican est le plus petit pays du monde."},{"k":"premier homme lune","a":"Neil Armstrong a marché sur la Lune en 1969."},{"k":"plus grand animal","a":"La baleine bleue est le plus grand animal connu."},{"k":"animal plus rapide","a":"Le guépard est le plus rapide des animaux terrestres."},{"k":"pattes araignee","a":"Une araignée a huit pattes."},{"k":"couleurs arc ciel","a":"L’arc-en-ciel compte sept couleurs."},{"k":"plus grand continent","a":"L’Asie est le plus grand continent."},{"k":"cote ivoire cacao","a":"La Côte d’Ivoire est l’un des plus grands producteurs de cacao du monde."}],"jokes":["Pourquoi les oiseaux volent-ils vers le sud ? Parce que c’est trop loin pour y aller à pied !","Que dit un escargot sur le dos d’une tortue ? Youpiii !","Quel est le comble pour un électricien ? De ne pas être au courant.","Quel est le comble pour un jardinier ? De raconter des salades.","Pourquoi le livre de maths est-il triste ? Parce qu’il a trop de problèmes.","Un patron dit à son employé : « Vous êtes en retard ! » L’employé répond : « Non, je suis juste en avance pour demain. »","Pourquoi les poissons n’aiment-ils pas l’ordinateur ? Parce qu’ils ont peur du net.","Que fait une fraise sur un cheval ? Tagada, tagada !","Pourquoi les mathématiciens aiment-ils la nature ? Parce qu’il y a plein de racines.","Quel est le comble pour un cuisinier ? De perdre son sang-froid devant une soupe froide.","Quel est le comble pour un menuisier ? De passer son temps à s’énerver sur du bois dont il est le plan.","Qu’est-ce qui est jaune et qui attend ? Jonathan."],"proverbs":["« Petit à petit, l’oiseau fait son nid. »","« Les petits ruisseaux font les grandes rivières. »","« Mieux vaut tard que jamais. »","« La patience est mère de toutes les vertus. »","« Qui ne tente rien n’a rien. »","« L’union fait la force. »","« Aide-toi, le ciel t’aidera. »","« Rien ne sert de courir, il faut partir à point. »","« Après la pluie, le beau temps. »","« Un seul doigt ne peut pas ramasser un caillou. »","« Si tu veux aller vite, marche seul ; si tu veux aller loin, marchons ensemble. »","« On récolte ce que l’on sème. »","« La nuit porte conseil. »","« Tout vient à point à qui sait attendre. »","« Le chemin se fait en marchant. »","« L’habit ne fait pas le moine. »","« Mieux vaut un voisin proche qu’un parent lointain. »","« La parole est d’argent, le silence est d’or. »"],"facts":["Le miel est l’un des rares aliments qui ne se périment pratiquement pas.","Les pieuvres ont trois cœurs.","Sur Vénus, une journée est plus longue qu’une année.","Botaniquement, la banane est une baie.","La girafe a le même nombre de vertèbres cervicales que l’être humain : sept.","Le Sahara est le plus grand désert chaud du monde.","Les abeilles communiquent entre elles grâce à une sorte de danse.","La Côte d’Ivoire est l’un des plus grands producteurs mondiaux de cacao.","L’eau couvre environ 70 % de la surface de la Terre.","La Terre met environ 365 jours pour faire le tour du Soleil.","Le français est parlé sur plusieurs continents.","Un éclair peut être plus chaud que la surface du Soleil.","Les éléphants sont les plus grands animaux terrestres.","Le cœur humain bat environ cent mille fois par jour."],"riddles":[{"q":"Qu’est-ce qui a des dents mais ne mord pas ?","a":["peigne"],"r":"Un peigne."},{"q":"Plus je sèche, plus je suis mouillée. Qui suis-je ?","a":["serviette"],"r":"Une serviette."},{"q":"Qu’est-ce qui monte et descend sans jamais bouger ?","a":["escalier","escaliers"],"r":"Un escalier."},{"q":"Je parle sans bouche et j’entends sans oreilles. Qui suis-je ?","a":["echo"],"r":"L’écho."},{"q":"Qu’est-ce qui est à vous, mais que les autres utilisent plus que vous ?","a":["prenom","nom"],"r":"Votre prénom."},{"q":"Qu’est-ce qui a un lit mais ne dort jamais, et une bouche mais ne parle pas ?","a":["fleuve","riviere"],"r":"Un fleuve."},{"q":"Plus on en prend, plus on en laisse derrière soi. Qu’est-ce que c’est ?","a":["pas"],"r":"Les pas."},{"q":"Qu’est-ce qui voyage partout tout en restant dans son coin ?","a":["timbre"],"r":"Un timbre."},{"q":"Qu’est-ce qui est plein de trous mais retient l’eau ?","a":["eponge"],"r":"Une éponge."},{"q":"Qu’est-ce qui a quatre pieds mais ne marche pas ?","a":["table","chaise","lit"],"r":"Une table."}],"sent":{"pos":["content","contente","heureux","heureuse","super","genial","excellent","bien","top","merveilleux","joyeux","fier","fiere","reussi","ravi","ravie","parfait","formidable","sympa","cool","chouette","gagne","bonne nouvelle","bravo","merci"],"neg":["triste","mal","nul","fatigue","decu","decue","stresse","stress","colere","fache","fachee","inquiet","inquiete","probleme","difficile","galere","peur","pleurer","malade","seul","seule","deprime","decourage","decouragee","horrible","perdu","echec","douleur","souffre","souffrance","cafard","epuise","epuisee"]}};
var rng = Math.random;

/* ================= Instructions par défaut (modifiables dans l’espace admin) ================= */
var DEFAULT_INSTR = [
'# Instructions de l’assistant. Une information par ligne, au format  Titre: valeur',
'Agence: Shaman Chooz',
'Activité: Prestation de service, recrutement et placement de personnes dans tous les secteurs d’activité, travaux domestiques, activités urbaines et commerciales.',
'Services: Placement de personnel de maison, recrutement pour entreprises et commerces, prestations de service en ville.',
'# Pour ajouter une info, écrivez une ligne sans le # au début. Exemples :',
'# Horaires: Du lundi au samedi, de 8h à 18h',
'# Contact: +225 00 00 00 00 00',
'# Adresse: Commune, quartier, repère',
'# Tarifs: Le conseiller donne le détail après étude du dossier.',
'# Q: Quels documents faut-il ? => Une pièce d’identité et un numéro WhatsApp.',
'# Consigne: Toujours vouvoyer et rester courtois.'
].join('\n');

/* ================= Stockage ================= */
var S = load();
function load() {
  var s = {};
  try { s = JSON.parse(W.localStorage.getItem(LS) || '{}') || {}; } catch (e) { s = {}; }
  s.instr = s.instr || DEFAULT_INSTR; s.convs = s.convs || {}; s.dossiers = s.dossiers || []; s.seq = s.seq || 0;
  s.unknown = s.unknown || {}; s.st = s.st || { n: 0, top: {} }; s.st.top = s.st.top || {}; if (s.choices !== false) s.choices = true;
  return s;
}
var saveT = null;
function save() { if (typeof setTimeout !== 'function') return flush(); if (!saveT) saveT = setTimeout(flush, 400); }
function flush() {
  saveT = null; var ks = Object.keys(S.convs), uk = Object.keys(S.unknown);
  if (ks.length > 250) { ks.sort(function (a, b) { return (S.convs[a].t || 0) - (S.convs[b].t || 0); }); ks.slice(0, ks.length - 250).forEach(function (k) { delete S.convs[k]; }); }
  if (S.dossiers.length > 2000) S.dossiers.length = 2000;
  if (uk.length > 300) { uk.sort(function (a, b) { return S.unknown[a].n - S.unknown[b].n || S.unknown[a].t - S.unknown[b].t; }); uk.slice(0, uk.length - 300).forEach(function (k) { delete S.unknown[k]; }); }
  try { W.localStorage.setItem(LS, JSON.stringify(S)); } catch (e) {}
}

/* ================= Outils de langage ================= */
function norm(s) {
  return String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/['\u2019`\u00B4]/g, ' ').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
}
var ABBR = { slt: 'salut', bjr: 'bonjour', bsr: 'bonsoir', stp: 's il te plait', svp: 's il vous plait', cc: 'coucou',
  mrc: 'merci', cmt: 'comment', pr: 'pour', pk: 'pourquoi', pq: 'pourquoi', qd: 'quand', cb: 'combien', dsl: 'desole',
  jsp: 'je ne sais pas', bcp: 'beaucoup', slm: 'salam', tjrs: 'toujours', dc: 'donc', ds: 'dans' };
function N(s) { return norm(s).split(' ').map(function (w) { return Object.prototype.hasOwnProperty.call(ABBR, w) ? ABBR[w] : w; }).join(' '); }
var STOP = Object.create(null);
('le la les un une des de du d l et ou a au aux en dans pour par sur je j tu il elle on nous vous ils me m te t se s ce c ca cela ' +
 'que qu qui quoi est suis es sont etes mon ma mes ton ta tes son sa ses votre vos notre nos y ne pas plus avec sans si mais comme tout tres bien')
  .split(' ').forEach(function (w) { STOP[w] = 1; });
function stem(w) { return w.length > 4 ? w.replace(/(s|x)$/, '') : w; }
function toks(s) { return N(s).split(' ').filter(function (w) { return w && !STOP[w]; }).map(stem); }
function lev(a, b) {
  if (a === b) return 0; if (Math.abs(a.length - b.length) > 2) return 9;
  var p = [], c, i, j; for (j = 0; j <= b.length; j++) p[j] = j;
  for (i = 1; i <= a.length; i++) {
    c = [i];
    for (j = 1; j <= b.length; j++) c[j] = Math.min(p[j] + 1, c[j - 1] + 1, p[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    p = c;
  }
  return p[b.length];
}
function same(a, b) { return a === b || (a.length >= 5 && b.length >= 5 && lev(a, b) <= (a.length >= 9 ? 2 : 1)); }
function hit(T, w) { for (var i = 0; i < T.length; i++) if (same(T[i], w)) return true; return false; }
function cap(s) { return String(s).toLowerCase().replace(/(^|[\s'\u2019-])([a-z\u00e0-\u00ff])/g, function (m, a, b) { return a + b.toUpperCase(); }); }
function pick(a) { return a[Math.floor(rng() * a.length)]; }
function R(re, n) { return re.test(n); }

/* ================= Instructions → connaissances ================= */
function parseInstr(t) {
  var P = {}, F = [], C = [];
  String(t || '').split(/\r?\n/).forEach(function (l) {
    l = l.trim(); if (!l || l[0] === '#') return; var m;
    if ((m = l.match(/^(?:q|question)\s*:\s*(.+?)\s*(?:=>|->|\|\||\?\?)\s*(.+)$/i))) F.push({ q: m[1], a: m[2] });
    else if ((m = l.match(/^consigne\s*:\s*(.+)$/i))) C.push(m[1]);
    else if ((m = l.match(/^([^:]{2,30}):\s*(.+)$/))) P[norm(m[1])] = { label: m[1].trim(), v: m[2].trim() };
  });
  return { P: P, F: F, C: C };
}
function KB() { return parseInstr(S.instr); }
function agency() { var k = KB(); return (k.P.agence && k.P.agence.v) || 'Shaman Chooz'; }

var TOPICS = [
  { ks: ['horaires', 'horaire', 'ouverture'], re: /(horaire|ouvert|ouverture|ferme|quelle heure.*(ouvr|ferm)|quels jours)/, lab: 'Nos horaires' },
  { ks: ['contact', 'telephone', 'whatsapp', 'numero', 'email'], re: /(contact|numero|telephone|whatsapp|joindre|appeler|email|mail)/, lab: 'Notre contact' },
  { ks: ['adresse', 'localisation', 'lieu', 'bureau'], re: /(adresse|ou etes vous|ou se trouve|localisation|vous situez|ou est (votre|le) (bureau|agence)|bureau)/, lab: 'Notre adresse' },
  { ks: ['tarifs', 'tarif', 'prix', 'paiement', 'frais'], re: /(tarif|prix|cout|coute|payant|gratuit|frais|payer|paiement|combien (ca|cela|il faut|je dois|ca fait))/, lab: 'Tarifs' },
  { ks: ['services', 'activite', 'secteurs'], re: /(que faites vous|vous faites quoi|vos services|quels services|proposez|activite|offrez|quels secteurs|quel domaine)/, lab: 'Nos services' }
];
function kbAnswer(text) {
  var n = N(text), k = KB(), i, j, t;
  for (i = 0; i < TOPICS.length; i++) {
    t = TOPICS[i];
    if (R(t.re, n)) {
      for (j = 0; j < t.ks.length; j++) if (k.P[t.ks[j]]) return k.P[t.ks[j]].label + ' : ' + k.P[t.ks[j]].v;
      if (i === 4 && k.P.activite) return k.P.activite.v;
      return { missing: true };
    }
  }
  var T = toks(text), best = null, bs = 0;
  k.F.forEach(function (f) {
    var E = toks(f.q); if (!E.length) return;
    var m = E.filter(function (w) { return hit(T, w); }).length, sc = m / E.length;
    if (m >= Math.min(2, E.length) && sc >= 0.6 && sc > bs) { bs = sc; best = f.a; }
  });
  return best;
}

/* ================= Extraction d’informations ================= */
var JOBS = [
  ['Ménagère / aide ménagère', /\b(menager\w*|femme de menage|bonne|domestique|employee de maison|aide menager\w*)\b/],
  ['Nounou / garde d’enfants', /\b(nounou\w*|baby ?sitt\w*|garde d enfants?|garde enfants?|nourrice)\b/],
  ['Cuisinier(ère)', /\b(cuisinier\w*|cuisiniere|traiteur)\b/],
  ['Gardien / agent de sécurité', /\b(gardien\w*|vigile\w*|agent de securite|securite|veilleur)\b/],
  ['Chauffeur / livreur', /\b(chauffeur\w*|livreur\w*|coursier\w*|conducteur\w*)\b/],
  ['Vendeur(se) / caissier(ère)', /\b(vendeu\w+|caissi\w+|vente)\b/],
  ['Serveur(se)', /\b(serveu\w+|serveur|barman|barmaid)\b/],
  ['Jardinier', /\bjardin\w*\b/],
  ['Plombier', /\bplomb\w*\b/],
  ['Électricien', /\belectric\w*\b/],
  ['Maçon / bâtiment', /\b(macon\w*|batiment|carrelage|carreleur\w*|ferrailleur\w*)\b/],
  ['Peintre', /\bpeintre\w*|peinture\b/],
  ['Coiffeur(se) / beauté', /\b(coiffeu\w+|coiffure|esthetic\w*|maquill\w*|manucure)\b/],
  ['Secrétaire / comptable / bureau', /\b(secretaire\w*|comptab\w*|assistant\w*|reception\w*|bureau)\b/],
  ['Couturier(ère)', /\b(couturi\w+|tailleur|couture)\b/],
  ['Mécanicien', /\bmecanic\w*\b/],
  ['Repasseuse / blanchisserie', /\b(repass\w*|blanchisse\w*|pressing|lessive)\b/],
  ['Garde-malade / aide-soignant(e)', /\b(garde malade|aide soignan\w*|infirmi\w*)\b/],
  ['Climatisation / froid', /\b(clim\w*|frigo\w*|froid)\b/],
  ['Menuisier / soudeur', /\b(menuisi\w*|soudeu\w*|soudure|ebeniste)\b/]
];
var VILLES = ['yopougon', 'cocody', 'abobo', 'adjame', 'plateau', 'marcory', 'treichville', 'koumassi', 'port bouet', 'attecoube',
  'bingerville', 'anyama', 'songon', 'riviera', 'angre', 'deux plateaux', 'grand bassam', 'bassam', 'dabou', 'bouake',
  'yamoussoukro', 'san pedro', 'daloa', 'korhogo', 'abengourou', 'gagnoa', 'divo', 'soubre', 'odienne', 'bondoukou',
  'ferkessedougou', 'aboisso', 'agboville', 'abidjan', 'man'].sort(function (a, b) { return b.length - a.length; });
var VRE = new RegExp('\\b(' + VILLES.join('|') + ')\\b');
var DISPO = /\b(immediat\w*|maintenant|des que possible|tout de suite|demain|cette semaine|la semaine prochaine|ce mois|le mois prochain|lundi|mardi|mercredi|jeudi|vendredi|samedi|dimanche|aujourd hui|ce soir)\b/;
var NUMW = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10 };

function dispoLabel(x) {
  if (/^immediat/.test(x)) return 'Immédiatement';
  if (x === 'aujourd hui') return 'Aujourd’hui';
  if (x === 'ce mois') return 'Ce mois-ci';
  if (x === 'ce soir') return 'Ce soir';
  if (x === 'des que possible') return 'Dès que possible';
  return x.charAt(0).toUpperCase() + x.slice(1);
}
function phoneOf(t) {
  var m = String(t).match(/(\+?\d[\d\s.\-]{6,18}\d)/); if (!m) return null;
  var d = m[1].replace(/[^\d+]/g, ''), len = d.replace('+', '').length;
  return len >= 8 && len <= 15 ? d : null;
}
function yes(n) { return R(/\b(oui|ouais|yes|bien sur|absolument|certainement|exact|d accord|ok|volontiers|correct|c est ca|c est bon|parfait|valide|confirme)\b/, n); }
function no(n) { return R(/^(non|nan|no|pas encore|pas du tout)\b|\b(non merci|pas necessaire|ce n est pas)\b/, n); }

function extract(text) {
  var n = N(text), o = {}, m, found = [];
  var tel = phoneOf(text); if (tel) o.tel = tel;
  if ((m = String(text).match(/(?:je m ?['\u2019]?appelle|mon nom (?:est|c['\u2019 ]?est)|moi c['\u2019 ]?est|appelez[- ]moi|mon nom\s*:)\s+([A-Za-z\u00C0-\u00FF'\u2019 -]{2,40})/i))) { var nmv = cap(m[1].replace(/\s+(?:et|je|qui)\b.*|\s+j['\u2019].*/i, '').trim()); if (nmv) o.nom = nmv; }
  if ((m = n.match(/\bj ai (\d{2}) ans\b/))) { o.majeur = +m[1] >= 18; n = n.replace(m[0], ' '); }
  JOBS.forEach(function (j) { if (j[1].test(n) && found.length < 2) found.push(j[0]); });
  if (found.length) o.metier = found.join(', ');
  if ((m = n.match(VRE))) o.commune = cap(m[1]);
  if ((m = n.match(/\b(\d{1,2}) (?:ans?|annees?)\b/))) o.experience = m[1] + ' an' + (+m[1] > 1 ? 's' : '');
  else if (R(/\b(debutant\w*|sans experience|aucune experience|pas d experience|jamais travaille)\b/, n)) o.experience = 'Débutant(e)';
  if ((m = n.match(/\b(\d{1,3}|un|une|deux|trois|quatre|cinq|six|sept|huit|neuf|dix) (?:personnes?|employes?|ouvriers?|agents?|postes?|menageres?|gardiens?)\b/))) o.nombre = NUMW[m[1]] || m[1];
  if ((m = n.match(DISPO))) o.dispo = dispoLabel(m[1]);
  return o;
}

/* ================= Parcours (dossiers) ================= */
var Q = function () { return Array.prototype.slice.call(arguments); };
var FLOWS = {
  candidat: { titre: 'Recherche d’emploi', slots: [
    { k: 'nom', lab: 'Nom', q: Q('Quel est votre nom complet ?', 'Comment vous appelez-vous ?') },
    { k: 'majeur', lab: '18 ans ou plus', q: Q('Avez-vous 18 ans ou plus ?'), chips: ['Oui', 'Non'] },
    { k: 'metier', lab: 'Travail recherché', q: Q('Quel type de travail cherchez-vous ?', 'Quel métier ou poste souhaitez-vous ?') },
    { k: 'experience', lab: 'Expérience', q: Q('Combien d’années d’expérience avez-vous ?'), chips: ['Débutant(e)', '1 à 2 ans', '3 ans et plus'] },
    { k: 'commune', lab: 'Commune', q: Q('Dans quelle commune habitez-vous ?', 'Où habitez-vous exactement ?') },
    { k: 'dispo', lab: 'Disponibilité', q: Q('Quand pouvez-vous commencer ?'), chips: ['Immédiatement', 'Cette semaine', 'Ce mois-ci'] },
    { k: 'tel', lab: 'WhatsApp / téléphone', q: Q('Quel est votre numéro WhatsApp ?', 'Quel numéro peut-on vous joindre ?') }
  ] },
  employeur: { titre: 'Besoin de personnel', slots: [
    { k: 'nom', lab: 'Nom', q: Q('Quel est votre nom ?', 'Comment vous appelez-vous ?') },
    { k: 'metier', lab: 'Poste recherché', q: Q('Quel poste ou profil recherchez-vous ?', 'Quel type de personnel vous faut-il ?') },
    { k: 'nombre', lab: 'Nombre de personnes', q: Q('Combien de personnes vous faut-il ?') },
    { k: 'commune', lab: 'Lieu de travail', q: Q('Dans quelle commune se fera le travail ?') },
    { k: 'dispo', lab: 'Date de début', q: Q('Pour quand en avez-vous besoin ?'), chips: ['Tout de suite', 'Cette semaine', 'Ce mois-ci'] },
    { k: 'conditions', lab: 'Conditions proposées', opt: true, q: Q('Quel salaire ou quelles conditions proposez-vous ?') },
    { k: 'tel', lab: 'WhatsApp / téléphone', q: Q('Quel est votre numéro WhatsApp ?', 'Quel numéro peut-on vous joindre ?') }
  ] },
  service: { titre: 'Demande de service', slots: [
    { k: 'nom', lab: 'Nom', q: Q('Quel est votre nom ?', 'Comment vous appelez-vous ?') },
    { k: 'metier', lab: 'Service demandé', q: Q('Quel service vous faut-il ?', 'De quel service avez-vous besoin ?') },
    { k: 'commune', lab: 'Lieu', q: Q('Dans quelle commune se trouve le lieu ?') },
    { k: 'dispo', lab: 'Date souhaitée', q: Q('Pour quand souhaitez-vous ce service ?'), chips: ['Urgent', 'Cette semaine', 'Pas pressé'] },
    { k: 'details', lab: 'Précisions', opt: true, q: Q('Voulez-vous ajouter une précision ?') },
    { k: 'tel', lab: 'WhatsApp / téléphone', q: Q('Quel est votre numéro WhatsApp ?', 'Quel numéro peut-on vous joindre ?') }
  ] }
};
var MENU = ['Je cherche un emploi', 'Je cherche du personnel', 'J’ai besoin d’un service', 'Informations'];

var SYN = { nom: 'nom prenom', tel: 'numero telephone whatsapp contact tel', metier: 'travail poste metier service profil', commune: 'commune lieu quartier ville adresse', dispo: 'date disponibilite debut quand', experience: 'experience annee', nombre: 'nombre personne', conditions: 'salaire condition', details: 'precision detail', majeur: 'age majeur' };
function slotDef(c, k) { var s = FLOWS[c.flow].slots; for (var i = 0; i < s.length; i++) if (s[i].k === k) return s[i]; }
function nextSlot(c) { var s = FLOWS[c.flow].slots; for (var i = 0; i < s.length; i++) if (c.slots[s[i].k] === undefined) return s[i]; return null; }
function inFlow(c, k) { return !!slotDef(c, k); }

function direct(k, text) {
  var n = N(text), t = String(text).trim(), m;
  if (k !== 'majeur' && R(/^(oui|ok|okay|merci|bonjour|bonsoir|salut|d accord|stop|annuler|corriger|recommencer)\b/, n)) return undefined;
  if ((k === 'nom' || k === 'metier' || k === 'commune' || k === 'dispo' || k === 'nombre') && R(/^(non|nan)\b/, n)) return undefined;
  if (R(/\b(je ne sais pas|sais pas|plus tard|passer|pas encore|aucune idee)\b/, n)) return k === 'majeur' ? undefined : '__skip';
  if (k === 'nom') {
    t = t.replace(/^(?:je suis|c['\u2019 ]?est|moi c['\u2019 ]?est|mon nom est|je m['\u2019 ]?appelle|appelez[- ]moi)\s+/i, '').replace(/[.!]+$/, '');
    return (/\d/.test(t) || t.split(/\s+/).length > 5 || t.length < 2 || /[^A-Za-z\u00C0-\u00FF'\u2019. -]/.test(t)) ? undefined : cap(t);
  }
  if (k === 'tel') return phoneOf(t) || undefined;
  if (k === 'majeur') {
    if ((m = n.match(/\b(\d{2})\b/))) return +m[1] >= 18;
    if (no(n)) return false; if (yes(n)) return true; return undefined;
  }
  if (k === 'experience') {
    if ((m = n.match(/(\d{1,2})/))) return m[1] + ' an' + (+m[1] > 1 ? 's' : '');
    if (R(/(debutant|aucune|sans|jamais|pas d)/, n)) return 'Débutant(e)';
    return /mois/.test(n) && t.length <= 40 ? t : undefined;
  }
  if (k === 'nombre') { m = n.match(/\b(\d{1,3})\b/); if (m) return m[1]; for (var w in NUMW) if (new RegExp('\\b' + w + '\\b').test(n)) return NUMW[w]; return undefined; }
  if (k === 'commune') { t = t.replace(/^(?:j['\u2019]habite|je suis|je reste|je vis|a|\u00e0|au|en|vers)\s+/i, ''); }
  if ((k === 'conditions' || k === 'details') && R(/^(non|rien|aucun|pas de)\b/, n)) return k === 'details' ? 'Aucune' : 'À discuter';
  return (t.length >= 2 && t.length <= 160 && !/\?\s*$/.test(t)) ? t : undefined;
}

function chipsOf(s) { return (S.choices === false) ? [] : (s.chips || []); }
function fill(c, text) {
  var got = extract(text), cnt = 0, applied = 0, k, a = c.asked, v, d, ci;
  d = a ? slotDef(c, a) : null;
  if (d && d.chips && a !== 'majeur') { for (ci = 0; ci < d.chips.length; ci++) if (N(d.chips[ci]) === N(text)) { c.slots[a] = d.chips[ci]; return 1; } }
  if (a === 'majeur') { v = direct('majeur', text); if (v !== undefined && v !== '__skip') { c.slots.majeur = v; cnt++; delete got.experience; delete got.majeur; } }
  for (k in got) if (inFlow(c, k) && (c.slots[k] === undefined || k === a)) { c.slots[k] = got[k]; cnt++; applied++; }
  if (a === 'commune' && c.slots.commune && applied) { v = direct('commune', text); if (v && v !== '__skip' && v.split(/\s+/).length <= 4) c.slots.commune = cap(v); }
  if (a && c.slots[a] === undefined && !applied) {
    v = direct(a, text);
    if (v === '__skip') { d = slotDef(c, a); if (d && d.opt) { c.slots[a] = 'Non précisé'; cnt++; } }
    else if (v !== undefined) { c.slots[a] = v; cnt++; }
  }
  return cnt;
}

/* ================= Phrases humaines ================= */
function fn(c) { var n = c.known && c.known.nom; return n ? n.split(' ')[0] : ''; }
function ack(c) {
  var f = fn(c), a = ['Très bien.', 'C’est noté.', 'Parfait.', 'D’accord.', 'Merci.'];
  c.n = (c.n || 0) + 1;
  if (c.n % 3 === 0) return null;
  return f && c.n % 4 === 0 ? 'Merci ' + f + '.' : pick(a);
}
function ask(c, s) {
  var q = s.q.filter(function (x) { return x !== c.lastQ; }); q = q.length ? q : s.q;
  c.lastQ = pick(q); c.asked = s.k; return c.lastQ;
}
function greeting() { var h = new Date().getHours(); return h < 18 ? 'Bonjour' : 'Bonsoir'; }
function recap(c) {
  var f = FLOWS[c.flow];
  return f.slots.map(function (s) { var v = c.slots[s.k]; if (v === true) v = 'Oui'; return '• ' + s.lab + ' : ' + v; }).join('\n');
}
function out(m, chips) { return { m: m.filter(Boolean), chips: chips || [] }; }
function mainQ(c) { c.asked = null; return out(['Comment puis-je vous aider ?'], MENU); }

function startFlow(c, id, text) {
  c.flow = id; c.slots = {}; c.stage = 'ask'; c.fails = 0; c.asked = null; c.game = null; c.offer = null;
  if (c.known) { if (c.known.nom && inFlow(c, 'nom')) c.slots.nom = c.known.nom; if (c.known.tel && inFlow(c, 'tel')) c.slots.tel = c.known.tel; }
  fill(c, text);
  return advance(c, id === 'candidat' ? ['Avec plaisir.', 'Je vais prendre quelques informations.'] :
    id === 'employeur' ? ['Avec plaisir.', 'Je note votre besoin en quelques questions.'] : ['Avec plaisir.', 'Je note votre demande en quelques questions.']);
}
function advance(c, lead) {
  if (c.slots.majeur === false) { var m = ['Merci de votre franchise.', 'Nous travaillons uniquement avec des personnes majeures.', 'Revenez nous voir à vos 18 ans.']; reset(c); return out(m); }
  var s = nextSlot(c);
  if (!s) { c.stage = 'confirm'; c.asked = null; return out(lead.concat(['Voici votre dossier :', recap(c), 'Tout est correct ?']), ['Oui, c’est correct', 'Corriger']); }
  c.stage = 'ask';
  return out(lead.concat([ask(c, s)]), chipsOf(s));
}
function reset(c) { c.flow = null; c.slots = {}; c.stage = null; c.asked = null; c.fails = 0; }

function saveDossier(c) {
  var d = { ref: 'SC-' + new Date().toISOString().slice(2, 10).replace(/-/g, '') + '-' + ('000' + (++S.seq)).slice(-3),
    type: FLOWS[c.flow].titre, flow: c.flow, contact: c.id, date: new Date().toISOString(), statut: 'Nouveau', champs: {} };
  FLOWS[c.flow].slots.forEach(function (s) { var v = c.slots[s.k]; d.champs[s.lab] = v === true ? 'Oui' : v; });
  S.dossiers.unshift(d); c.known = c.known || {};
  if (c.slots.nom) c.known.nom = c.slots.nom; if (c.slots.tel) c.known.tel = c.slots.tel;
  save(); try { if (typeof API.onDossier === 'function') API.onDossier(d); } catch (e) {}
  return d;
}

/* ================= Conversation (petites phrases, sujets, culture, expertise) ================= */
var PREP = null;
function prep() {
  if (PREP) return PREP;
  var g = function (a) { return a.map(function (k) { return toks(k); }).filter(function (x) { return x.length; }); };
  var lex = function (a) { var o = []; a.forEach(function (w) { norm(w).split(' ').forEach(function (x) { if (x) o.push(stem(x)); }); }); return o; };
  var byId = {};
  var tp = DATA.topics.map(function (t) { byId[t.id] = t; return { t: t, kw: g(t.kw) }; });
  PREP = { tp: tp, byId: byId, ex: DATA.expert.map(function (e) { return { e: e, kw: g(e.kw) }; }),
    qa: DATA.qa.map(function (q) { return { q: q, k: toks(q.k) }; }), pos: lex(DATA.sent.pos), neg: lex(DATA.sent.neg) };
  return PREP;
}
function allHit(T, arr) { for (var i = 0; i < arr.length; i++) if (!hit(T, arr[i])) return false; return true; }
function findTopic(T) {
  var best = null, bs = 0;
  prep().tp.forEach(function (x) { var s = 0; x.kw.forEach(function (k) { if (allHit(T, k)) s += k.length; }); if (s > bs) { bs = s; best = x.t; } });
  return best;
}
function findExpert(T) {
  var best = null, bs = 0;
  prep().ex.forEach(function (x) { x.kw.forEach(function (k) { if (allHit(T, k) && k.length > bs) { bs = k.length; best = x.e; } }); });
  return best;
}
function findQA(T) {
  var best = null, bs = 0;
  prep().qa.forEach(function (x) { if (x.k.length && allHit(T, x.k) && x.k.length > bs) { bs = x.k.length; best = x.q; } });
  return best;
}
function topicById(id) { return prep().byId[id] || null; }
function wordsOf(n) { return n ? n.split(' ').length : 0; }
function lcf(s) { return s ? s.charAt(0).toLowerCase() + s.slice(1) : s; }

/* phrases : jamais deux fois la même de suite pour une personne */
function pickIdx(c, key, len) {
  var u = (c.u = c.u || {}), l = (u[key] = u[key] || []), i, t = 0, lim = Math.min(len - 1, 5);
  do { i = Math.floor(rng() * len); t++; } while (l.indexOf(i) >= 0 && t < 12);
  l.push(i); while (l.length > lim) l.shift();
  return i;
}
function pickU(c, key, arr) { return arr && arr.length ? arr[pickIdx(c, key, arr.length)] : ''; }
function emit(s, c, x) {
  s = String(s).replace(/\{agence\}/g, agency()).replace(/\{nom\}/g, (c && c.known && c.known.nom) || '').replace(/\{x\}/g, x || '');
  return s.split('//').map(function (t) { return t.trim(); }).filter(function (t) { return t; });
}
function E(c, key, arr, x) { return emit(pickU(c, key, arr), c, x); }

var QCUE = /^(combien|quel|quelle|quels|quelles|qui|ou|quand|comment|c est quoi|que|qu est ce|pourquoi|est ce)\b/;
var DISTRESS = /(je veux mourir|envie de mourir|veux en finir|me tuer|me suicider|suicide|mettre fin a mes jours|plus envie de vivre|disparaitre pour toujours|me faire du mal|me blesser|on me frappe|je suis battu|violence conjugale|\b(viol|violee|viole)\b)/;
var ABOUT = [
  ['about_human', /(es tu (un |une )?(robot|humain|vrai|vraie|reel|personne|homme|femme)|tu es (un |une )?(robot|humain|vrai|vraie|personne|homme|femme)|etes vous (un |une )?(robot|humain|reel|personne|homme|femme)|vous etes (un |une )?(robot|humain|personne|homme|femme)|vraie personne|intelligence artificielle|chatbot|\bbot\b)/, true],
  ['about_maker', /(qui t a (cree|fait|programme|concu)|qui vous a (cree|fait|programme|concu)|qui est ton createur|qui est votre createur)/, true],
  ['about_name', /(qui es tu|qui est tu|qui etes vous|tu es qui|vous etes qui|comment (tu t appelles|vous vous appelez|t appelles tu|vous appelez vous)|ton prenom|votre prenom|ton nom|votre nom|c est quoi ton nom)/, true],
  ['about_age', /(quel age (as tu|avez vous)|ton age|votre age|tu as quel age|vous avez quel age)/, false],
  ['about_where', /(ou (habites tu|habitez vous|vis tu|vivez vous)|tu habites ou|tu viens d ou|vous venez d ou|d ou viens tu|d ou venez vous)/, false],
  ['about_sleep', /(tu dors|tu ne dors|tu as sommeil|vous dormez)/, false],
  ['about_food', /(tu manges|tu as faim|vous mangez|tu bois)/, false],
  ['about_family', /(tu as (une |des )?(famille|enfants|frere|soeur|femme|mari|copine|copain)|tu es marie|tu es en couple|vous etes marie)/, false],
  ['about_feel', /(as tu des (sentiments|emotions)|tu ressens|tu es (heureux|triste|fatigue|content)|vous etes (heureux|triste|fatigue|content))/, false],
  ['about_work', /(tu travailles|vous travaillez|ton travail|votre travail|ton metier|votre metier)/, true],
  ['about_can', /(que sais tu faire|que peux tu faire|que pouvez vous faire|tu sers a quoi|a quoi tu sers|a quoi servez vous|tu peux m aider|vous pouvez m aider|que sais faire)/, true],
  ['about_hobby', /(ton passe temps|tu aimes quoi|tu fais quoi dans la vie|que fais tu de beau|tu fais quoi de beau|tu fais quoi)/, false]
];
var TOPIC_CHIPS = { humour: ['Une blague', 'Une devinette'], jeux: ['Une devinette', 'Une blague'], sciences: ['Une anecdote'],
  maison_entretien: ['J’ai besoin d’un service', 'Je cherche du personnel'], entrepreneuriat: ['Je cherche du personnel'] };
var FOLLOW = { candidat: 'Je cherche un emploi', employeur: 'Je cherche du personnel', service: 'J’ai besoin d’un service' };

function nextQ(c) {
  var t = c.topic ? topicById(c.topic) : null;
  return t ? pickU(c, 'q:' + t.id, t.questions) : pickU(c, 'cu', DATA.pools.curious);
}

/* mémoire de la personne : prénom, goûts, enfants, commune */
function fact(k, t, x) {
  k.facts = (k.facts || []).filter(function (f) { return f.t !== t; });
  k.facts.push({ t: t, x: x }); if (k.facts.length > 6) k.facts.shift();
}
function learn(c, text) {
  var k = (c.known = c.known || {}), n = N(text), m, x, ex = extract(text);
  if (ex.nom) k.nom = ex.nom;
  if ((m = n.match(/\bj aime (?:bien |beaucoup |vraiment )?(?:le |la |les |l |un |une |des )?([a-z ]{3,30})/))) {
    x = m[1].split(/ (?:et|mais|parce|car|quand|surtout)\b/)[0].trim().split(' ').slice(0, 3).join(' ');
    if (x.length >= 3 && !/^(pas|vous|tu|te|ca|cela|bien|beaucoup|trop|ce|cette)\b/.test(x)) fact(k, 'aime', x);
  }
  if ((m = n.match(/\bj ai (un|une|deux|trois|quatre|cinq|\d) (?:enfants?|fils|filles?)\b/))) fact(k, 'enfants', m[1]);
  if (ex.commune && R(/\b(j habite|je vis|je reste|je suis a|je suis de)\b/, n)) fact(k, 'commune', ex.commune);
}
function ukey(t) { return 'u:' + N(t).slice(0, 80); }
function logUnknown(text) {
  var key = ukey(text), u = Object.prototype.hasOwnProperty.call(S.unknown, key) ? S.unknown[key] : null;
  if (u) { u.n++; u.t = Date.now(); } else S.unknown[key] = { q: String(text).slice(0, 160), n: 1, t: Date.now() };
}
function teach(q, a) {
  q = String(q || '').replace(/=>|->/g, ' ').trim(); a = String(a || '').trim(); if (!q || !a) return false;
  S.instr = S.instr.replace(/\s*$/, '') + '\nQ: ' + q + ' => ' + a + '\n';
  delete S.unknown[ukey(q)]; save(); return true;
}

/* petites conversations */
function small(c, text) {
  var n = N(text), words = wordsOf(n), f = fn(c), P = DATA.pools, h = new Date().getHours(), m, r, i, d;
  if (!n) return null;
  if (words <= 4 && R(/\b(bonjour|bonsoir|salut|coucou|hello|hey|salam)\b/, n)) {
    var g = c.ret ? E(c, 'gb', P.greet_back) : E(c, 'g', h < 18 ? P.greet_day : P.greet_eve);
    if (f && !c.ret && g.length) g[0] = g[0].replace(/^(Bonjour|Bonsoir|Akwaba|Salutations)/, '$1 ' + f);
    return out(g.concat(E(c, 'hq', P.help_q)), MENU);
  }
  if (words <= 6 && R(/\b(merci|remercie|remercions)\b/, n)) {
    r = out(E(c, 'th', P.thanks_reply).concat(['Puis-je faire autre chose pour vous ?']), ['Non merci', 'Autre demande']); r.more = true; return r;
  }
  if (words <= 6 && R(/\b(au revoir|a bientot|bonne nuit|bonne soiree|bonne journee|a plus|bye|ciao|a demain|a la prochaine)\b/, n)) return out(E(c, 'by', P.bye));
  if (words <= 7 && (R(/(comment (vas tu|allez vous|va tu|tu vas|vous allez|ca va)|tu vas bien|vous allez bien|la forme)/, n) || (/\?/.test(text) && R(/^ca va\b/, n)))) return out(E(c, 'hru', P.hru_reply).concat(E(c, 'ab', P.ask_back)));
  if (words <= 4 && R(/^(ca va pas|pas bien|je vais mal|pas top|bof|ca ne va pas)/, n)) return out(E(c, 'bd', P.bad_reply).concat(['Voulez-vous m’en parler ?']));
  if (words <= 5 && R(/^(ca va|je vais bien|tres bien|bien merci|nickel|ca va bien|super|pas mal)/, n)) return out(E(c, 'fn', P.fine_reply).concat(E(c, 'hq', P.help_q)), MENU);
  if (words <= 5 && R(/\b(desole|pardon|excusez moi|excuse moi|mes excuses)\b/, n)) return out(E(c, 'ap', P.apology));
  if (R(/\b(tu es|vous etes|t es)\b.{0,12}\b(idiot|imbecile|stupide|debile|nul|con)\b|\b(connard|merde|ferme la)\b/, n)) return out(E(c, 'in', P.insult));
  if (words <= 6 && R(/\b(bravo|genial|excellent|felicitation|bon travail|bien joue|tu es gentil|vous etes gentil|tu es genial|vous etes genial)\b/, n)) return out(E(c, 'cp', P.compl));
  if ((words <= 4 && R(/(mdr|lol|ptdr|haha|hihi|hehe|\bxd\b)/, n)) || /(😂|🤣|😆)/.test(text)) return out(E(c, 'lg', P.laugh).concat([nextQ(c)]));
  for (i = 0; i < ABOUT.length; i++) {
    if (R(ABOUT[i][1], n)) {
      d = ABOUT[i][0];
      return out(E(c, d, P[d]).concat(ABOUT[i][2] ? E(c, 'hq', P.help_q) : E(c, 'abk', P.about_back)), ABOUT[i][2] ? MENU : []);
    }
  }
  if (R(/(quelle heure|heure est il)/, n)) { d = new Date(); return out(['Il est ' + d.getHours() + ' h ' + ('0' + d.getMinutes()).slice(-2) + '.'].concat(E(c, 'qf', P.qa_follow))); }
  if (R(/(quel jour|quelle date|date d aujourd)/, n)) return out(['Nous sommes le ' + new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) + '.'].concat(E(c, 'qf', P.qa_follow)));
  if (words <= 9 && (m = String(text).replace(/,/g, '.').match(/(\d+(?:\.\d+)?)\s*([+\-*x\u00d7\/\u00f7])\s*(\d+(?:\.\d+)?)/))) {
    var a = +m[1], b = +m[3], op = m[2], v = null;
    if (op === '+') v = a + b; else if (op === '-') v = a - b; else if (op === '/' || op === '\u00f7') v = (b && R(/(combien|divis)/, n)) ? a / b : null; else v = a * b;
    if (v !== null && isFinite(v) && Math.abs(v) < 1e15) return out(['Le résultat est ' + (Math.round(v * 1000) / 1000).toString().replace('.', ',') + '.'].concat(E(c, 'qf', P.qa_follow)));
  }
  return null;
}

/* jeux : devinettes */
function riddle(c) {
  var r = DATA.riddles[pickIdx(c, 'rid', DATA.riddles.length)];
  c.game = { a: r.a, r: r.r, t: 0 };
  return out(E(c, 'ra', DATA.pools.riddle_ask).concat([r.q]));
}
function gameStep(c, text, n) {
  var g = c.game, P = DATA.pools, W = n.split(' ').map(stem), ok = false, i;
  for (i = 0; i < g.a.length; i++) if (hit(W, g.a[i])) ok = true;
  if (ok) { c.game = null; return out(E(c, 'rw', P.riddle_win).concat(['Une autre devinette ?']), ['Une autre devinette', 'Non merci']); }
  if (g.t >= 1 || R(/(je ne sais pas|donne ma langue|la reponse|abandon|je passe|dis moi)/, n)) {
    c.game = null; return out(['La réponse était : ' + g.r, 'Une autre devinette ?'], ['Une autre devinette', 'Non merci']);
  }
  g.t++; return out(E(c, 'rl', P.riddle_lose));
}

/* expertise métier */
function expertReply(c, e) {
  var P = DATA.pools, ms = emit(e.a, c), chips = [];
  if (ms.length === 3) ms = [ms[0], ms[1] + ' ' + ms[2]];
  if (e.follow && FOLLOW[e.follow]) { ms = ms.concat(E(c, 'do', P.dossier_offer)); chips = [FOLLOW[e.follow], 'Non merci']; c.offer = e.follow; }
  else ms = ms.concat(E(c, 'am', P.ask_more));
  c.topic = null;
  return out(ms, chips);
}

/* sujets de conversation */
function senti(text) {
  var n = N(text).replace(/\bpas mal\b/g, 'bien').replace(/\bpas (bien|content|heureux|heureuse|super|top|genial)\b/g, 'mal'), p = 0, g = 0, X = prep();
  var W = n.split(' ').map(stem);
  X.pos.forEach(function (w) { if (hit(W, w)) p++; });
  X.neg.forEach(function (w) { if (hit(W, w)) g++; });
  return p > g ? 1 : g > p ? -1 : 0;
}
function joinSw(op, q) { return /[,:]$/.test(op) ? [op + ' ' + lcf(q)] : [op, q]; }
function finishChat(c, parts, chips, tid) {
  var k = (c.known = c.known || {}), P = DATA.pools, calm = (tid === 'tristesse' || tid === 'sante' || tid === 'ceremonies'), res = parts.slice(), f, x;
  c.sb = (c.sb || 0) + 1; c.sr = (c.sr || 0) + 1;
  if (!calm && c.sr >= 5 && k.facts && k.facts.length && rng() < 0.5) {
    f = k.facts[Math.floor(rng() * k.facts.length)]; x = f.t === 'aime' ? 'recall_aime' : f.t === 'enfants' ? 'recall_enfants' : 'recall_commune';
    res = res.concat(E(c, x, P[x], f.x)); c.sr = 0;
  } else if (!calm && c.sb >= 8) { res = res.concat(E(c, 'br', P.bridge)); chips = MENU; c.sb = 0; }
  if (k.nom && res.length >= 2 && rng() < 0.12) res[0] = E(c, 'wn', P.with_name)[0] + ' ' + lcf(res[0]);
  while (res.length > 3) res.shift();
  return out(res, chips);
}
function composeTopic(c, t, text) {
  var s = senti(text), same = (c.topic === t.id), parts = [], rp, P = DATA.pools, rel;
  c.tt = same ? (c.tt || 0) + 1 : 0; c.topic = t.id;
  S.st.top[t.id] = (S.st.top[t.id] || 0) + 1;
  if (same && c.tt >= 4 && t.related.length) {
    rel = topicById(pickU(c, 'rel', t.related));
    if (rel) { c.topic = rel.id; c.tt = 0; return finishChat(c, joinSw(pickU(c, 'sw', P.switch), pickU(c, 'q:' + rel.id, rel.questions)), TOPIC_CHIPS[rel.id] || [], rel.id); }
  }
  rp = t.id === 'tristesse' ? 'emp_neg' : t.id === 'joie' ? 'emp_pos' : s > 0 ? 'emp_pos' : s < 0 ? 'emp_neg' : (rng() < 0.5 ? 'nod' : 'emp_neu');
  if (!(c.short && rng() < 0.5)) parts.push(pickU(c, 'r:' + rp, P[rp]));
  if (rp === 'emp_neg' && rng() < 0.3) parts.push(pickU(c, 'en', P.encour));
  if (!same || rng() < 0.6) parts.push(pickU(c, 'm:' + t.id, t.remarks));
  parts.push(pickU(c, 'q:' + t.id, t.questions));
  return finishChat(c, parts, TOPIC_CHIPS[t.id] || [], t.id);
}
function shortKind(n) {
  if (R(/^(ok|okay|d accord|daccord|entendu|compris|bien recu|ca marche)\b/, n)) return 'ok';
  if (R(/^(oui|ouais|yes|bien sur|exact|carrement|tout a fait|absolument|volontiers|evidemment|certainement)\b/, n)) return 'yes';
  if (R(/^(non|nan|no|pas du tout|jamais|pas vraiment|pas encore)\b/, n)) return 'no';
  if (R(/(peut etre|je ne sais pas|sais pas|pas sur|bof|un peu|moyen|ca depend|on verra)/, n)) return 'maybe';
  return null;
}
function shortReply(c, kind, off) {
  var P = DATA.pools, pk = { yes: 'yes_s', no: 'no_s', maybe: 'maybe_s', ok: 'ok_s' }[kind];
  if (kind === 'yes' && off) return startFlow(c, off, '');
  return finishChat(c, E(c, pk, P[pk]).concat([nextQ(c)]), [], c.topic);
}
function chat(c, text) {
  var n = N(text), T = toks(text), P = DATA.pools, off = c.offer, t, e, q, kind;
  c.offer = null;
  if (!n) return null;
  if (c.game) return gameStep(c, text, n);
  if (R(/\b(blagues?|rigoler|faire rire|histoire drole)\b/, n)) return out([pickU(c, 'j', DATA.jokes)].concat(E(c, 'ff', P.fun_follow)), ['Une autre blague', 'Une devinette']);
  if (R(/\b(devinettes?|enigmes?|charade)\b/, n)) return riddle(c);
  if (R(/\b(proverbes?|citations?|dictons?)\b/, n)) return out([E(c, 'pi', P.prov_intro)[0] + ' ' + pickU(c, 'p', DATA.proverbs)].concat(E(c, 'ff', P.fun_follow)), ['Un autre proverbe', 'Une blague']);
  if (R(/\b(anecdotes?|saviez vous|insolite|fait amusant|fait surprenant|apprends moi quelque chose)\b/, n)) return out(['Le saviez-vous ? ' + pickU(c, 'f', DATA.facts)].concat(E(c, 'ff', P.fun_follow)), ['Une autre anecdote', 'Une devinette']);
  if ((/\?/.test(text) || R(QCUE, n)) && T.length <= 8) { q = findQA(T); if (q) return out([q.a].concat(E(c, 'qf', P.qa_follow))); }
  e = findExpert(T); if (e) return expertReply(c, e);
  t = findTopic(T); if (t) return composeTopic(c, t, text);
  if (wordsOf(n) <= 3) { kind = shortKind(n); if (kind) return shortReply(c, kind, off); }
  return null;
}
function fallback(c, text) {
  var n = N(text), P = DATA.pools, isQ = /\?/.test(text) || R(QCUE, n);
  c.fq = (c.fq || 0) + 1;
  if (isQ) return out(E(c, 'fq', P.fb_q).concat(E(c, 'un', P.unknown_note)), c.fq % 3 === 0 ? MENU : []);
  return out(E(c, 'fs', P.fb_stmt).concat([pickU(c, 'cu', P.curious)]), c.fq % 4 === 0 ? MENU : []);
}
function avgLen(c) {
  var u = c.hist.filter(function (h) { return h.r === 'u'; }).slice(-6), tot = 0;
  u.forEach(function (h) { tot += h.t.split(/\s+/).length; });
  c.short = u.length >= 3 && tot / u.length <= 3;
}

/* ================= Cerveau IA optionnel (sans clé API) ================= */
var brain = null, pend = {};
function systemPrompt() {
  var k = KB(), info = Object.keys(k.P).map(function (x) { return k.P[x].label + ' : ' + k.P[x].v; }).join('\n');
  return 'Tu es l’assistant virtuel de ' + agency() + ', une agence de recrutement, de placement et de prestation de services. ' +
    'Tu parles français, tu vouvoies, tu es très poli, sage et courtois. Tu réponds en une ou deux phrases courtes, puis tu poses UNE question simple. ' +
    'Tu ne donnes jamais de prix, de délai ou d’adresse qui ne figurent pas ci-dessous. Tu dis que tu es un assistant virtuel si on te le demande. ' +
    'Si la question est hors de ton domaine, réponds brièvement et prudemment, sans inventer, puis ramène la conversation vers l’emploi ou les services.\n' +
    'Informations de l’agence :\n' + info + (k.C.length ? '\nConsignes :\n- ' + k.C.join('\n- ') : '');
}
function androidBrain(ctx) {
  return new Promise(function (res, rej) {
    var id = 'b' + Date.now(); pend[id] = res;
    try { W.AndroidLLM.generate(id, JSON.stringify({ system: ctx.system, history: ctx.history, user: ctx.text })); } catch (e) { delete pend[id]; return rej(e); }
    setTimeout(function () { if (pend[id]) { delete pend[id]; rej(new Error('timeout')); } }, 90000);
  });
}
W.__shamanLLMDone = function (id, text) { if (pend[id]) { pend[id](text); delete pend[id]; } };
function getBrain() { return brain || (W.AndroidLLM && typeof W.AndroidLLM.generate === 'function' ? androidBrain : null); }
function shorten(t) {
  t = String(t || '').replace(/\*+/g, '').replace(/\s+/g, ' ').trim();
  var s = t.match(/[^.!?]+[.!?]+/g) || [t]; return s.slice(0, 3).map(function (x) { return x.trim(); }).join(' ').slice(0, 320);
}

/* ================= Cœur : une réponse ================= */
function conv(id) {
  var key = 'c:' + String(id == null ? 'app' : id).slice(0, 80), c = Object.prototype.hasOwnProperty.call(S.convs, key) ? S.convs[key] : null;
  if (!c) c = S.convs[key] = { id: key, flow: null, slots: {}, hist: [], known: {} };
  return c;
}
function think(c, text) {
  var n = N(text), r, kb;
  if (R(DISTRESS, n) && !R(/mourir de /, n)) return out(emit(pickU(c, 'ds', DATA.pools.distress), c), []);
  learn(c, text);
  /* confirmation / correction */
  if (c.flow && c.stage === 'confirm') {
    var g = extract(text), changed = 0, k;
    for (k in g) if (inFlow(c, k) && !(k === 'majeur')) { c.slots[k] = g[k]; changed++; }
    if (changed && !yes(n)) return advance(c, ['C’est corrigé.']);
    if (yes(n) && !no(n)) {
      var d = saveDossier(c), f = fn(c); reset(c); c.asked = 'more';
      return out(['Merci' + (f ? ' ' + f : '') + '. Votre dossier ' + d.ref + ' est enregistré.', 'Un conseiller vous contactera très bientôt.', 'Puis-je vous aider pour autre chose ?'], ['Non merci', 'Autre demande']);
    }
    if (no(n) || R(/\b(corrig|modifi|chang|erreur|faux)\w*/, n)) {
      c.stage = 'fix'; return out(['D’accord.', 'Quelle information voulez-vous corriger ?'], FLOWS[c.flow].slots.map(function (s) { return s.lab; }));
    }
  }
  if (c.flow && c.stage === 'fix') {
    var T = toks(text), sl = FLOWS[c.flow].slots.filter(function (s) {
      return toks(s.lab + ' ' + SYN[s.k]).some(function (w) { return hit(T, w); });
    })[0], g2 = extract(text), ch2 = 0, k2;
    if (sl) { delete c.slots[sl.k]; c.stage = 'ask'; return out(['Bien sûr.', ask(c, sl)], chipsOf(sl)); }
    for (k2 in g2) if (inFlow(c, k2) && k2 !== 'majeur') { c.slots[k2] = g2[k2]; ch2++; }
    if (ch2) return advance(c, ['C’est corrigé.']);
    return out(['Quelle information voulez-vous corriger ?'], FLOWS[c.flow].slots.map(function (s) { return s.lab; }));
  }
  /* commandes globales */
  if (c.flow && R(/\b(recommenc\w*|annul\w*|laisse tomber|stop|oublie\w*)\b/, n)) { reset(c); return out(['D’accord, on laisse cela de côté.', 'Comment puis-je vous aider ?'], MENU); }
  if (c.asked === 'more' && !c.flow) {
    if (no(n) || R(/(c est tout|rien)/, n)) { c.asked = null; return out(['Très bien. Bonne journée à vous !', 'Je reste disponible.']); }
    if (R(/^(oui|autre|une autre)/, n)) return mainQ(c);
  }
  if (!c.flow && c.asked === 'more') c.asked = null;
  /* parcours en cours */
  if (c.flow && (c.stage === 'ask' || c.stage === 'fix')) {
    var cnt = fill(c, text);
    if (cnt) { c.fails = 0; var a = ack(c); return advance(c, a ? [a] : []); }
    kb = kbAnswer(text);
    var sm = kb ? null : small(c, text);
    if (kb || sm) {
      var s0 = nextSlot(c), side = kb ? (kb.missing ? 'Un conseiller vous donnera cette information.' : kb) : sm.m.join(' ');
      return out([side, s0 ? 'Pour continuer : ' + ask(c, s0) : null], s0 ? chipsOf(s0) : []);
    }
    if (getBrain() && (/\?/.test(text) || R(/^(pourquoi|comment|quand|qui|que|quel|quelle|quels|est ce|combien|ou)\b/, n))) return { brain: true, m: [], chips: [] };
    c.fails++; var s1 = nextSlot(c);
    if (c.fails >= 3 && s1 && s1.opt) { c.slots[s1.k] = 'Non précisé'; c.fails = 0; return advance(c, ['Pas de souci.']); }
    return out(['Je n’ai pas bien compris.', s1 ? ask(c, s1) : 'Pouvez-vous répéter ?'], s1 ? chipsOf(s1) : []);
  }
  if (!c.flow && R(/(comment|conseil|astuce|que faut il|quels documents|quelle difference)/, n)) { var ex0 = findExpert(toks(text)); if (ex0) return expertReply(c, ex0); }
  /* intentions */
  var emp = /(cherch|besoin|veux|voudrais|souhait|aimerais|faut|recrut|embauch|engag|trouv)\w*.{0,40}(personnel|employe|ouvrier|ouvriere|menagere|nounou|gardien|cuisinier|cuisiniere|chauffeur|vendeu|bonne|femme de menage|jardinier|babysitter|secretaire|comptable|agent|serveu|caissi|livreur|coiffeu|domestique|nourrice|vigile|main d oeuvre)|\b(recrutement|recruter|embaucher|engager)\b/;
  var job = /(cherch|besoin|veux|voudrais|souhait|aimerais|recherche)\w*.{0,30}(travail|emploi|job|boulot|poste|place|stage|travailler)|\b(chomeur|chomage|sans emploi|postuler|candidat|mon cv)\b|\bje suis (une |un )?(menagere|nounou|cuisinier\w*|gardien|chauffeur|vendeu\w+|serveu\w+|jardinier|couturi\w+|secretaire|comptable|coiffeu\w+)/;
  var svc = /(prestation|intervention|reparation|reparer|depannage|depanner|installation|installer|nettoyage|devis|entretien|demenagement|besoin d un service|un service|plombier|electricien|peintre|macon|carrelage|climatisation|serrurier|menuisier)/;
  if (c.asked === 'clar') { var o = c.clar; c.clar = null; c.asked = null; return startFlow(c, R(/recrut|quelqu/, n) ? 'employeur' : 'service', o + ' ' + text); }
  if (R(job, n)) return startFlow(c, 'candidat', text);
  if (R(emp, n) && !R(/(plombier|electricien|peintre|macon|serrurier|menuisier|climatisation)/, n)) return startFlow(c, 'employeur', text);
  if (R(svc, n) && !R(/entretien (d embauche|de travail|professionnel)|un entretien|mon entretien/, n)) {
    if (R(/(cherch|trouver|il me faut|besoin d un).{0,20}(plombier|electricien|peintre|macon|menuisier|serrurier)/, n) && !R(/(intervention|reparation|depannage|installation|devis)/, n) && !c.clar)
      { c.clar = text; c.asked = 'clar'; return out(['Avec plaisir.', 'C’est pour une intervention, ou pour recruter quelqu’un ?'], ['Une intervention', 'Recruter quelqu’un']); }
    return startFlow(c, 'service', text);
  }
  /* connaissances */
  kb = kbAnswer(text);
  if (kb) return kb.missing ? out(['Un conseiller vous donnera cette information avec précision.', 'Puis-je prendre votre demande ?'], MENU)
    : out([kb, 'Souhaitez-vous que je prenne votre demande ?'], MENU);
  if (R(/\b(informations?|renseignements?|renseigner|infos?)\b/, n)) {
    var kk = KB(), a2 = kk.P.activite ? kk.P.activite.v : 'Nous faisons du recrutement, du placement et de la prestation de services.';
    return out([a2, 'Que souhaitez-vous faire ?'], MENU.slice(0, 3));
  }
  r = small(c, text); if (r) return r;
  return chat(c, text);
}

function reply(id, text) {
  id = id || 'app'; var c = conv(id); text = String(text == null ? '' : text).trim().slice(0, 600);
  return new Promise(function (resolve) {
    if (!text) return resolve(out(['Je vous écoute.']));
    if (/^[1-9]$/.test(text) && c.opts && +text <= c.opts.length) text = c.opts[+text - 1];
    var now = Date.now(), nn = N(text);
    c.ret = !!(c.t && c.hist.length && now - c.t > 21600000); c.t = now;
    c.hist.push({ r: 'u', t: text.slice(0, 300) }); S.st.n++; avgLen(c);
    var r = (nn.length > 3 && c.lu === nn && !c.flow && !c.game) ? out(E(c, 'rp', DATA.pools.repeat)) : think(c, text);
    c.lu = nn;
    if (r && r.more && !c.flow) c.asked = 'more';
    var finish = function (x) {
      x.m = x.m.slice(0, 4).map(function (t) { return String(t).slice(0, 600); }); if (!x.m.length) x.m = ['Je vous écoute.'];
      x.m.forEach(function (t) { c.hist.push({ r: 'b', t: t.slice(0, 300) }); }); c.hist = c.hist.slice(-40); c.opts = x.chips || [];
      save(); resolve(x);
    };
    if (r && !r.brain) return finish(r);
    if (nn.length >= 6 && (/\?/.test(text) || wordsOf(nn) >= 4)) logUnknown(text);
    var b = getBrain(), s0 = c.flow ? nextSlot(c) : null;
    if (b) {
      b({ text: text, history: c.hist.slice(-8).map(function (h) { return { role: h.r === 'u' ? 'user' : 'assistant', content: h.t }; }), system: systemPrompt(), profile: c.known })
        .then(function (t) { var s = shorten(t); finish(out([s || 'Pouvez-vous préciser votre demande ?', s0 ? 'Pour continuer : ' + ask(c, s0) : null], s0 ? chipsOf(s0) : [])); })
        .catch(function () { finish(out(s0 ? ['Un conseiller répondra à cette question.', 'Pour continuer : ' + ask(c, s0)] : ['Pouvez-vous préciser votre demande ?'], s0 ? chipsOf(s0) : MENU)); });
      return;
    }
    finish(fallback(c, text));
  });
}

/* ================= Interface ================= */
var API = {
  open: function () { ui('open'); }, close: function () { ui('close'); }, admin: function () { ui('admin'); },
  reply: function (id, text) { return reply(id, text).then(function (x) { return x.m.join(' '); }); },
  setBrain: function (fn) { brain = fn; },
  dossiers: function () { return S.dossiers.slice(); },
  instructions: function (t) { if (typeof t === 'string') { S.instr = t; save(); } return S.instr; },
  onDossier: null,
  replyFull: function (id, text) { return reply(id, text); },
  seed: function (n) { var a = n >>> 0; rng = function () { a = (a + 0x6D2B79F5) | 0; var t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; },
  flush: flush, teach: teach, stats: function () { return S.st; }, unknown: function () { return S.unknown; }, state: function () { return S; },
  version: '2.0'
};
W.ShamanBot = API;

var UI = {}, CSS = [
'#sb-fab{position:fixed;left:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));width:52px;height:52px;border-radius:50%;border:0;background:#1A7DA8;color:#fff;font-size:24px;z-index:2147483000;box-shadow:0 4px 14px rgba(0,0,0,.28);cursor:pointer}',
'#sb-fab::after{content:"";position:absolute;top:6px;right:6px;width:12px;height:12px;border-radius:50%;background:#F0528C;border:2px solid #1A7DA8}',
'#sb-p{position:fixed;inset:0;z-index:2147483001;display:none;flex-direction:column;background:#EAF5FC;font:16px/1.4 system-ui,-apple-system,Roboto,sans-serif;color:#0F2436}',
'#sb-p.on{display:flex}',
'@media(min-width:640px){#sb-p{inset:auto 16px 16px auto;width:390px;height:620px;max-height:calc(100% - 32px);border-radius:16px;overflow:hidden;box-shadow:0 10px 40px rgba(0,0,0,.35)}}',
'.sb-h{display:flex;align-items:center;gap:10px;padding:calc(10px + env(safe-area-inset-top,0px)) 12px 10px;background:#1A7DA8;color:#fff}',
'.sb-av{width:38px;height:38px;border-radius:50%;background:#F0528C;color:#0F2436;display:grid;place-items:center;font-weight:700}',
'.sb-t{flex:1;min-width:0;user-select:none;-webkit-user-select:none}.sb-t b{display:block;font-size:16px}.sb-t span{font-size:12px;opacity:.8}',
'.sb-x{background:none;border:0;color:#fff;font-size:26px;padding:4px 8px;cursor:pointer}',
'#sb-m{flex:1;overflow-y:auto;padding:12px;display:flex;flex-direction:column;gap:6px}',
'.sb-b{max-width:84%;padding:9px 12px;border-radius:14px;white-space:pre-wrap;word-wrap:break-word;font-size:15.5px}',
'.sb-b.bot{align-self:flex-start;background:#fff;border-bottom-left-radius:4px}',
'.sb-b.me{align-self:flex-end;background:#1A7DA8;color:#fff;border-bottom-right-radius:4px}',
'.sb-ty{align-self:flex-start;background:#fff;border-radius:14px;padding:10px 14px;color:#43647F;letter-spacing:3px}',
'#sb-c{display:flex;flex-direction:column;align-items:flex-start;gap:6px;padding:0 12px 8px;max-height:45%;overflow-y:auto}',
'#sb-c button{border:1.5px solid #1A7DA8;background:#fff;color:#1A7DA8;border-radius:18px;padding:7px 14px;font-size:14px;text-align:left;cursor:pointer}',
'.sb-i{display:flex;gap:8px;padding:8px 10px calc(8px + env(safe-area-inset-bottom,0px));background:#fff;border-top:1px solid #B8DCEC}',
'.sb-i input{flex:1;min-width:0;border:1.5px solid #B8DCEC;border-radius:22px;padding:10px 14px;font-size:16px;outline:none}',
'.sb-i input:focus,#sb-c button:focus-visible,.sb-i button:focus-visible{outline:2px solid #F0528C}',
'.sb-i button{border:0;border-radius:50%;width:44px;height:44px;background:#1A7DA8;color:#fff;font-size:18px;cursor:pointer}',
'#sb-a{position:absolute;inset:0;background:#EAF5FC;display:none;flex-direction:column;z-index:2}#sb-a.on{display:flex}',
'#sb-a .bd{flex:1;overflow:auto;padding:12px}',
'#sb-a textarea{width:100%;min-height:260px;border:1.5px solid #B8DCEC;border-radius:10px;padding:10px;font:14px/1.4 ui-monospace,Consolas,monospace;box-sizing:border-box}',
'#sb-a .tb{display:flex;gap:6px;padding:calc(8px + env(safe-area-inset-top,0px)) 12px 8px;background:#fff;flex-wrap:wrap}',
'#sb-a .tb button,#sb-a .bd button{border:1.5px solid #1A7DA8;background:#fff;color:#1A7DA8;border-radius:8px;padding:8px 10px;font-size:13.5px;white-space:nowrap;cursor:pointer}',
'#sb-a .tb button.on,#sb-a .bd button.pri{background:#1A7DA8;color:#fff}',
'.sb-d{background:#fff;border-radius:10px;padding:10px 12px;margin-bottom:8px;font-size:14px;white-space:pre-wrap}.sb-d b{display:block;margin-bottom:4px}',
'.sb-emb{font:16px/1.4 system-ui,-apple-system,Roboto,sans-serif;color:#0F2436}',
'.sb-seg{display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px}',
'.sb-seg button{border:1.5px solid #B8DCEC;background:#F3FAFF;color:#43647F;border-radius:10px;padding:10px 8px;font-size:13.5px;font-weight:600;white-space:nowrap;cursor:pointer}',
'body.sb-on #journalFab{display:none!important}',
'.sb-seg button.on{background:linear-gradient(135deg,#F0528C,#2496C7);border-color:transparent;color:#fff}',
'.sb-box{position:relative;display:flex;flex-direction:column;height:min(72vh,620px);height:min(72dvh,620px);min-height:360px;background:#EAF5FC;border:1px solid #B8DCEC;border-radius:14px;overflow:hidden}',
'@media(prefers-reduced-motion:no-preference){.sb-b{animation:sbin .18s ease-out}@keyframes sbin{from{opacity:0;transform:translateY(4px)}}}'
].join('');

function el(tag, cls, txt) { var e = D.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }
function build() {
  syncNative();
  var st = el('style'); st.textContent = CSS; D.head.appendChild(st);
  var host = D.getElementById('sb-embed'); if (host) return buildEmbed(host);
  UI.fab = el('button', null, '💬'); UI.fab.id = 'sb-fab'; UI.fab.setAttribute('aria-label', 'Ouvrir le chat');
  UI.p = el('div'); UI.p.id = 'sb-p';
  var h = el('div', 'sb-h'), av = el('div', 'sb-av', 'S'), t = el('div', 'sb-t'), x = el('button', 'sb-x', '×');
  UI.title = el('b', null, agency()); t.appendChild(UI.title); t.appendChild(el('span', null, 'Assistant virtuel • en ligne'));
  x.setAttribute('aria-label', 'Fermer'); h.appendChild(av); h.appendChild(t); h.appendChild(x);
  UI.m = el('div'); UI.m.id = 'sb-m'; UI.m.setAttribute('aria-live', 'polite');
  UI.c = el('div'); UI.c.id = 'sb-c';
  var f = el('div', 'sb-i'); UI.in = el('input'); UI.in.type = 'text'; UI.in.placeholder = 'Écrivez votre message…'; UI.in.setAttribute('enterkeyhint', 'send');
  var sd = el('button', null, '➤'); sd.setAttribute('aria-label', 'Envoyer'); f.appendChild(UI.in); f.appendChild(sd);
  UI.a = el('div'); UI.a.id = 'sb-a';
  UI.p.appendChild(h); UI.p.appendChild(UI.m); UI.p.appendChild(UI.c); UI.p.appendChild(f); UI.p.appendChild(UI.a);
  D.body.appendChild(UI.fab); D.body.appendChild(UI.p);
  UI.fab.onclick = function () { ui('open'); }; x.onclick = function () { ui('close'); };
  function go() { var v = UI.in.value.trim(); if (v) { UI.in.value = ''; say(v); } }
  sd.onclick = go; UI.in.onkeydown = function (e) { if (e.key === 'Enter') { e.preventDefault(); go(); } };
  var tm; t.addEventListener('touchstart', function () { tm = setTimeout(function () { ui('admin'); }, 1000); }, { passive: true });
  ['touchend', 'touchmove', 'touchcancel'].forEach(function (ev) { t.addEventListener(ev, function () { clearTimeout(tm); }, { passive: true }); });
  t.addEventListener('mousedown', function () { tm = setTimeout(function () { ui('admin'); }, 1000); });
  ['mouseup', 'mouseleave'].forEach(function (ev) { t.addEventListener(ev, function () { clearTimeout(tm); }); });
}
function bubble(txt, me) { var b = el('div', 'sb-b ' + (me ? 'me' : 'bot'), txt); UI.m.appendChild(b); UI.m.scrollTop = UI.m.scrollHeight; }
function chips(list) {
  UI.c.textContent = '';
  (list || []).forEach(function (t, i) { var b = el('button', null, (i + 1) + '_' + t); b.onclick = function () { say(t); }; UI.c.appendChild(b); });
  if (typeof setTimeout === 'function') setTimeout(function () { UI.m.scrollTop = UI.m.scrollHeight; }, 0);
}
var busy = false;
function say(txt) {
  if (busy) return; busy = true; chips([]); bubble(txt, true);
  var ty = el('div', 'sb-ty', '•••'); UI.m.appendChild(ty); UI.m.scrollTop = UI.m.scrollHeight;
  reply('app', txt).then(function (r) {
    var i = 0;
    (function next() {
      if (i >= r.m.length) { ty.remove(); chips(r.chips); busy = false; UI.in.focus(); return; }
      var t = r.m[i++];
      setTimeout(function () { UI.m.insertBefore(el('div', 'sb-b bot', t), ty); UI.m.scrollTop = UI.m.scrollHeight; next(); }, Math.min(1400, 350 + t.length * 14));
    })();
  });
}
function ui(a) {
  if (!D) return; if (!UI.p && !UI.m) build();
  if (EMB) {
    if (a === 'admin') showView('instr');
    else if (a === 'open') { var tb0 = D.querySelector('[data-tab="assistant"]'); if (tb0) tb0.click(); showView('chat'); }
    return;
  }
  if (a === 'open') {
    UI.p.classList.add('on'); UI.fab.style.display = 'none'; UI.title.textContent = agency();
    if (!UI.m.childNodes.length) {
      var c = conv('app'); c.hist.slice(-12).forEach(function (h) { bubble(h.t, h.r === 'u'); });
      if (!c.hist.length) { E(c, 'g', new Date().getHours() < 18 ? DATA.pools.greet_day : DATA.pools.greet_eve).forEach(function (t) { bubble(t); }); bubble(E(c, 'hq', DATA.pools.help_q)[0]); chips(MENU); }
    }
  } else if (a === 'close') { UI.p.classList.remove('on'); UI.fab.style.display = ''; UI.a.classList.remove('on'); }
  else if (a === 'admin') { UI.p.classList.add('on'); UI.fab.style.display = 'none'; adminView('instr'); }
}
function nat() { try { return W.ShamanNative && typeof W.ShamanNative.botSetInstr === 'function' ? W.ShamanNative : null; } catch (e) { return null; } }
function syncNative() { var X = nat(); if (X) { try { X.botSetInstr(S.instr); } catch (e) {} try { if (typeof X.botChoicesSet === 'function') X.botChoicesSet(S.choices !== false); } catch (e) {} } }
function natJSON(fnm, arg) {
  var X = nat(); if (!X) return [];
  try { var r = arg === undefined ? X[fnm]() : X[fnm](arg); return JSON.parse(r || '[]'); } catch (e) { return []; }
}
function dosCard(bd, d, tag) {
  var card = el('div', 'sb-d'), txt = d.ref + ' — ' + d.type + '\n' + Object.keys(d.champs).map(function (k) { return k + ' : ' + d.champs[k]; }).join('\n');
  card.appendChild(el('b', null, d.ref + ' • ' + d.type + ' • ' + new Date(d.date).toLocaleDateString('fr-FR') + (tag ? ' • ' + tag : '')));
  card.appendChild(el('div', null, txt.split('\n').slice(1).join('\n')));
  var cp = el('button', null, 'Copier'); cp.style.marginTop = '6px'; cp.onclick = function () { copy(txt, cp); }; card.appendChild(cp); bd.appendChild(card);
}
function adminView(tab) {
  var A = UI.a; A.textContent = ''; A.classList.add('on');
  var tb = el('div', 'tb'), bd = el('div', 'bd'), nd = natJSON('botDossiers'), unk = unknownList();
  if (EMB) Object.keys(UI.seg).forEach(function (k) { UI.seg[k].b.className = (k === tab) ? 'on' : ''; });
  [['instr', 'Instructions'], ['dos', 'Dossiers (' + (S.dossiers.length + nd.length) + ')'], ['learn', 'À apprendre (' + unk.length + ')']].forEach(function (t) {
    var b = el('button', tab === t[0] ? 'on' : '', t[1]); b.onclick = function () { adminView(t[0]); }; tb.appendChild(b);
  });
  var cl = el('button', null, 'Fermer'); cl.style.marginLeft = 'auto'; cl.onclick = function () { A.classList.remove('on'); }; tb.appendChild(cl);
  if (tab === 'instr') {
    bd.appendChild(el('p', null, 'Écrivez ici ce que l’assistant doit savoir : une information par ligne (Titre: valeur). Pour une question précise : Q: question => réponse.'));
    var ta = el('textarea'); ta.value = S.instr; bd.appendChild(ta);
    var sv = el('button', 'pri', 'Enregistrer'); sv.style.marginTop = '8px'; sv.onclick = function () { S.instr = ta.value; save(); syncNative(); UI.title.textContent = agency(); sv.textContent = 'Enregistré ✓'; };
    var rs = el('button', null, 'Remettre par défaut'); rs.style.cssText = 'margin:8px 0 0 8px'; rs.onclick = function () { ta.value = DEFAULT_INSTR; };
    bd.appendChild(sv); bd.appendChild(rs);
    var lc = el('label'); lc.style.cssText = 'display:block;margin:16px 0 4px'; var cc = el('input'); cc.type = 'checkbox'; cc.checked = S.choices !== false;
    cc.onchange = function () { S.choices = cc.checked; save(); syncNative(); };
    lc.appendChild(cc); lc.appendChild(D.createTextNode(' Proposer des choix numérotés (1_, 2_, 3_…) pour certaines questions du dossier. Décochez pour que l’assistant pose la question et laisse la personne répondre librement.')); bd.appendChild(lc);
    var X = nat();
    if (X && typeof X.botSmsGet === 'function') {
      var lab = el('label'); lab.style.cssText = 'display:block;margin:16px 0 8px'; var cb = el('input'); cb.type = 'checkbox';
      try { cb.checked = !!X.botSmsGet(); } catch (e) {}
      cb.onchange = function () { try { X.botSmsSet(cb.checked); } catch (e) {} };
      lab.appendChild(cb); lab.appendChild(D.createTextNode(' Répondre aux SMS reçus avec l’assistant (chaque réponse envoie un SMS : du crédit est consommé)')); bd.appendChild(lab);
      var ti = el('input'); ti.type = 'text'; ti.placeholder = 'Tester : écrivez un SMS reçu'; ti.style.cssText = 'width:100%;box-sizing:border-box;padding:10px;border:1.5px solid #B8DCEC;border-radius:8px;font-size:15px';
      var tbn = el('button', null, 'Tester la réponse SMS'); tbn.style.marginTop = '6px'; var tout = el('div', 'sb-d'); tout.style.marginTop = '8px';
      tbn.onclick = function () { try { tout.textContent = X.botTest(ti.value) || '(aucune réponse)'; } catch (e) { tout.textContent = 'Erreur de test'; } };
      bd.appendChild(ti); bd.appendChild(tbn); bd.appendChild(tout);
    }
  } else if (tab === 'dos') {
    if (!S.dossiers.length && !nd.length) bd.appendChild(el('p', null, 'Aucun dossier pour le moment.'));
    S.dossiers.forEach(function (d) { dosCard(bd, d, ''); });
    nd.forEach(function (d) { dosCard(bd, d, 'SMS'); });
    if (S.dossiers.length) { var all = el('button', 'pri', 'Copier tous les dossiers'); all.onclick = function () { copy(JSON.stringify(S.dossiers.concat(nd), null, 1), all); }; bd.appendChild(all); }
  } else {
    var top = Object.keys(S.st.top).sort(function (a, b) { return S.st.top[b] - S.st.top[a]; }).slice(0, 3).map(function (k) { return k.replace(/_/g, ' '); });
    bd.appendChild(el('p', null, 'Messages traités : ' + S.st.n + (top.length ? ' • Sujets les plus abordés : ' + top.join(', ') : '') + '. Voici les questions auxquelles l’assistant n’a pas su répondre : donnez la réponse, il l’apprend et la retiendra.'));
    if (!unk.length) bd.appendChild(el('p', null, 'Rien à apprendre pour le moment.'));
    unk.slice(0, 40).forEach(function (u) {
      var card = el('div', 'sb-d'); card.appendChild(el('b', null, u.q + (u.n > 1 ? '  (×' + u.n + ')' : '')));
      var ans = el('input'); ans.type = 'text'; ans.placeholder = 'Votre réponse…'; ans.style.cssText = 'width:100%;box-sizing:border-box;padding:9px;border:1.5px solid #B8DCEC;border-radius:8px;font-size:15px;margin:4px 0';
      var ok = el('button', 'pri', 'Apprendre'), no_ = el('button', null, 'Ignorer'); no_.style.marginLeft = '6px';
      var forget = function () { delete S.unknown[ukey(u.q)]; var Y = nat(); if (Y) { try { Y.botForget(u.q); } catch (e) {} } save(); };
      ok.onclick = function () { if (teach(u.q, ans.value)) { syncNative(); forget(); adminView('learn'); } else ans.focus(); };
      no_.onclick = function () { forget(); adminView('learn'); };
      card.appendChild(ans); card.appendChild(ok); card.appendChild(no_); bd.appendChild(card);
    });
  }
  if (!EMB) A.appendChild(tb);
  A.appendChild(bd);
  if (EMB) refreshSeg();
}

/* ---- mode « onglet de l’application » : le chat vit dans un onglet, avec son espace admin toujours visible ---- */
var EMB = false;
function unknownList() {
  var seen = {}, unk = [];
  Object.keys(S.unknown).map(function (k) { return S.unknown[k]; }).concat(natJSON('botUnknown')).forEach(function (u) {
    var k = ukey(u.q); if (!seen[k]) { seen[k] = 1; unk.push(u); }
  });
  unk.sort(function (a, b) { return b.n - a.n; });
  return unk;
}
function refreshSeg() {
  if (!EMB || !UI.seg) return;
  UI.seg.dos.b.textContent = '📁 Dossiers (' + (S.dossiers.length + natJSON('botDossiers').length) + ')';
  UI.seg.learn.b.textContent = '🧠 À apprendre (' + unknownList().length + ')';
}
function showView(v) {
  if (!EMB) return;
  Object.keys(UI.seg).forEach(function (k) { UI.seg[k].b.className = (k === v) ? 'on' : ''; });
  if (v === 'chat') { UI.a.classList.remove('on'); UI.m.scrollTop = UI.m.scrollHeight; refreshSeg(); } else adminView(v);
}
function greetInto(c) {
  var hr = new Date().getHours();
  E(c, 'g', hr < 18 ? DATA.pools.greet_day : DATA.pools.greet_eve).forEach(function (t) { bubble(t); });
  bubble(E(c, 'hq', DATA.pools.help_q)[0]); chips(MENU);
}
function buildEmbed(host) {
  EMB = true; UI.title = el('b'); UI.seg = {};
  var root = el('div', 'sb-emb'), seg = el('div', 'sb-seg'), box = el('div', 'sb-box');
  [['chat', '💬 Discussion'], ['instr', '⚙ Instructions'], ['dos', '📁 Dossiers'], ['learn', '🧠 À apprendre']].forEach(function (t) {
    var b = el('button', t[0] === 'chat' ? 'on' : '', t[1]); b.onclick = function () { showView(t[0]); }; seg.appendChild(b); UI.seg[t[0]] = { b: b };
  });
  UI.m = el('div'); UI.m.id = 'sb-m'; UI.m.setAttribute('aria-live', 'polite');
  UI.c = el('div'); UI.c.id = 'sb-c';
  var f = el('div', 'sb-i'); UI.in = el('input'); UI.in.type = 'text'; UI.in.placeholder = 'Écrivez votre message…'; UI.in.setAttribute('enterkeyhint', 'send');
  var sd = el('button', null, '➤'); sd.setAttribute('aria-label', 'Envoyer'); f.appendChild(UI.in); f.appendChild(sd);
  UI.a = el('div'); UI.a.id = 'sb-a';
  box.appendChild(UI.m); box.appendChild(UI.c); box.appendChild(f); box.appendChild(UI.a);
  root.appendChild(seg); root.appendChild(box); host.appendChild(root);
  var go = function () { var v = UI.in.value.trim(); if (v) { UI.in.value = ''; say(v); } };
  sd.onclick = go; UI.in.onkeydown = function (e) { if (e.key === 'Enter') { e.preventDefault(); go(); } };
  var c = conv('app');
  if (c.hist.length) c.hist.slice(-12).forEach(function (h) { bubble(h.t, h.r === 'u'); }); else greetInto(c);
  refreshSeg();
  var tb = D.querySelector('[data-tab="assistant"]');
  if (tb) tb.addEventListener('click', function () { setTimeout(function () { UI.m.scrollTop = UI.m.scrollHeight; refreshSeg(); }, 60); });
  D.querySelectorAll('.tab-btn').forEach(function (bt) { bt.addEventListener('click', function () { D.body.classList.toggle('sb-on', bt.getAttribute('data-tab') === 'assistant'); }); });
  if (W.location && W.location.hash === '#assistant' && tb) tb.click();
}
function copy(t, b) {
  var done = function () { b.textContent = 'Copié ✓'; };
  try { if (W.navigator.clipboard) return W.navigator.clipboard.writeText(t).then(done); } catch (e) {}
  var x = el('textarea'); x.value = t; D.body.appendChild(x); x.select(); try { D.execCommand('copy'); done(); } catch (e) {} x.remove();
}

if (D) { if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', function () { if (!UI.p) build(); }); else build(); }
})();
