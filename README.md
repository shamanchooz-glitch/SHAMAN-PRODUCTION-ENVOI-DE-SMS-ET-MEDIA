# SHAMAN PRODUCTION — Envoi SMS, E-mail & Médias

## Ce que fait vraiment cette app (et ce qu'aucune app ne peut faire)

Aucune application — PWA, app installée, peu importe — ne peut envoyer des
SMS ou des messages WhatsApp automatiquement à plusieurs personnes sans
qu'un humain confirme l'envoi. C'est un verrou de sécurité volontaire
d'Android, iOS et WhatsApp, pour empêcher les envois de masse non désirés.
Cette app respecte ça et vous fait gagner un maximum de temps dans ce
cadre :

- **SMS** — l'app prépare le message et regroupe vos destinataires par
  lots (taille réglable), et ouvre votre application SMS déjà remplie à
  chaque lot. Vous appuyez sur Envoyer vous-même, avec votre forfait SMS
  habituel.
- **E-mail** — c'est le seul volet où un vrai envoi groupé en un clic est
  possible : un e-mail peut avoir des dizaines de destinataires en copie
  cachée (CCI). L'app ouvre votre appli e-mail déjà remplie ; un seul
  appui sur Envoyer couvre tout le lot.
- **Médias / WhatsApp** — l'app centralise le choix des photos/vidéos/
  fichiers (galerie ou appareil photo), puis les transmet à WhatsApp via
  le partage natif du téléphone. C'est ensuite WhatsApp qui vous permet
  de cocher plusieurs contacts/groupes pour l'envoi — comme un partage
  classique depuis la galerie.

**Attention** : envoyer des messages en masse à des numéros ou des
contacts WhatsApp peut déclencher des limitations ou un blocage de votre
numéro par l'opérateur ou par WhatsApp, s'ils détectent un envoi
automatisé inhabituel — gardez des lots raisonnables et espacés dans le
temps.

## Vos contacts restent sur votre téléphone

Contacts et groupes sont stockés uniquement dans ce navigateur/cet
appareil (aucun serveur, aucun compte). Utilisez le bouton **Exporter**
régulièrement pour garder une sauvegarde, et **Importer** pour la
retrouver sur un autre téléphone ou après avoir changé de navigateur.

## Fonctionnement hors connexion

L'app est 100% autonome (aucune bibliothèque externe) et se précharge
entièrement dès l'installation : elle s'ouvre et fonctionne sans internet
dès que vous l'avez ouverte une première fois en ligne. Préparer des
messages, gérer contacts et groupes, choisir des médias — tout fonctionne
hors connexion. Seul l'envoi final (SMS/e-mail/WhatsApp) nécessite,
comme d'habitude, que votre téléphone ait du réseau au moment d'appuyer
sur Envoyer.

## Publier sur GitHub Pages

1. Créez un dépôt GitHub public (ex. `shaman-production-app`).
2. Déposez les 6 fichiers de ce dossier (`index.html`, `manifest.json`,
   `icon.png`, `icon-maskable.png`, `avatar.png`, `sw.js`) à la racine.
3. **Settings → Pages** → source = branche `main`, dossier `/ (root)`.
4. Votre lien sera du type :
   `https://<votre-nom-utilisateur>.github.io/shaman-production-app/`
5. Donnez-moi ce lien et je vous prépare le QR code et l'affiche à
   imprimer, comme pour l'app précédente.

Si vous préférez ne pas utiliser GitHub, ces fichiers peuvent aussi être
déposés sur n'importe quel hébergeur de site statique gratuit (Netlify,
Vercel, etc.) — dites-le-moi si vous voulez la marche à suivre pour l'un
d'eux.
