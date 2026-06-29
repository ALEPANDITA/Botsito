// plugins/tools/doxeo.js

const PHONE_DB = {
  '1':   { country: 'Estados Unidos / Canadá', flag: '🇺🇸', continent: 'América del Norte', operators: ['AT&T', 'Verizon', 'T-Mobile', 'Sprint'] },
  '7':   { country: 'Rusia',                   flag: '🇷🇺', continent: 'Europa / Asia',      operators: ['MTS', 'Beeline', 'MegaFon', 'Tele2'] },
  '20':  { country: 'Egipto',                  flag: '🇪🇬', continent: 'África',             operators: ['Vodafone EG', 'Orange EG', 'Etisalat'] },
  '27':  { country: 'Sudáfrica',               flag: '🇿🇦', continent: 'África',             operators: ['Vodacom', 'MTN', 'Cell C', 'Telkom'] },
  '30':  { country: 'Grecia',                  flag: '🇬🇷', continent: 'Europa',             operators: ['Cosmote', 'Vodafone GR', 'Wind'] },
  '31':  { country: 'Países Bajos',            flag: '🇳🇱', continent: 'Europa',             operators: ['KPN', 'Vodafone NL', 'T-Mobile NL'] },
  '32':  { country: 'Bélgica',                 flag: '🇧🇪', continent: 'Europa',             operators: ['Proximus', 'Orange BE', 'Base'] },
  '33':  { country: 'Francia',                 flag: '🇫🇷', continent: 'Europa',             operators: ['Orange', 'SFR', 'Bouygues', 'Free Mobile'] },
  '34':  { country: 'España',                  flag: '🇪🇸', continent: 'Europa',             operators: ['Movistar', 'Vodafone ES', 'Orange ES', 'Yoigo'] },
  '36':  { country: 'Hungría',                 flag: '🇭🇺', continent: 'Europa',             operators: ['Magyar Telekom', 'Telenor HU', 'Vodafone HU'] },
  '39':  { country: 'Italia',                  flag: '🇮🇹', continent: 'Europa',             operators: ['TIM', 'Vodafone IT', 'Wind Tre', 'Iliad'] },
  '40':  { country: 'Rumanía',                 flag: '🇷🇴', continent: 'Europa',             operators: ['Orange RO', 'Vodafone RO', 'Telekom RO'] },
  '41':  { country: 'Suiza',                   flag: '🇨🇭', continent: 'Europa',             operators: ['Swisscom', 'Sunrise', 'Salt'] },
  '44':  { country: 'Reino Unido',             flag: '🇬🇧', continent: 'Europa',             operators: ['EE', 'O2', 'Vodafone UK', 'Three'] },
  '45':  { country: 'Dinamarca',               flag: '🇩🇰', continent: 'Europa',             operators: ['TDC', 'Telenor DK', 'Telia DK'] },
  '46':  { country: 'Suecia',                  flag: '🇸🇪', continent: 'Europa',             operators: ['Telia', 'Telenor SE', 'Tre', 'Tele2 SE'] },
  '47':  { country: 'Noruega',                 flag: '🇳🇴', continent: 'Europa',             operators: ['Telenor NO', 'Telia NO', 'Ice'] },
  '48':  { country: 'Polonia',                 flag: '🇵🇱', continent: 'Europa',             operators: ['Orange PL', 'Play', 'T-Mobile PL', 'Plus'] },
  '49':  { country: 'Alemania',                flag: '🇩🇪', continent: 'Europa',             operators: ['Deutsche Telekom', 'Vodafone DE', 'O2 DE'] },
  '51':  { country: 'Perú',                    flag: '🇵🇪', continent: 'América del Sur',    operators: ['Movistar PE', 'Claro PE', 'Entel PE', 'Bitel'] },
  '52':  { country: 'México',                  flag: '🇲🇽', continent: 'América del Norte',  operators: ['Telcel', 'AT&T MX', 'Movistar MX'] },
  '53':  { country: 'Cuba',                    flag: '🇨🇺', continent: 'América del Norte',  operators: ['ETECSA'] },
  '54':  { country: 'Argentina',               flag: '🇦🇷', continent: 'América del Sur',    operators: ['Claro AR', 'Movistar AR', 'Personal'] },
  '55':  { country: 'Brasil',                  flag: '🇧🇷', continent: 'América del Sur',    operators: ['Vivo', 'Claro BR', 'Tim BR', 'Oi'] },
  '56':  { country: 'Chile',                   flag: '🇨🇱', continent: 'América del Sur',    operators: ['Entel CL', 'Movistar CL', 'Claro CL', 'WOM'] },
  '57':  { country: 'Colombia',                flag: '🇨🇴', continent: 'América del Sur',    operators: ['Claro CO', 'Movistar CO', 'Tigo', 'WOM CO'] },
  '58':  { country: 'Venezuela',               flag: '🇻🇪', continent: 'América del Sur',    operators: ['Movistar VE', 'Movilnet', 'Digitel'] },
  '60':  { country: 'Malasia',                 flag: '🇲🇾', continent: 'Asia',               operators: ['Maxis', 'Celcom', 'Digi', 'U Mobile'] },
  '61':  { country: 'Australia',               flag: '🇦🇺', continent: 'Oceanía',            operators: ['Telstra', 'Optus', 'Vodafone AU'] },
  '62':  { country: 'Indonesia',               flag: '🇮🇩', continent: 'Asia',               operators: ['Telkomsel', 'Indosat', 'XL Axiata', 'Tri'] },
  '63':  { country: 'Filipinas',               flag: '🇵🇭', continent: 'Asia',               operators: ['Globe', 'Smart', 'DITO'] },
  '64':  { country: 'Nueva Zelanda',           flag: '🇳🇿', continent: 'Oceanía',            operators: ['Spark', 'One NZ', '2degrees'] },
  '65':  { country: 'Singapur',                flag: '🇸🇬', continent: 'Asia',               operators: ['Singtel', 'StarHub', 'M1'] },
  '66':  { country: 'Tailandia',               flag: '🇹🇭', continent: 'Asia',               operators: ['AIS', 'DTAC', 'True Move'] },
  '81':  { country: 'Japón',                   flag: '🇯🇵', continent: 'Asia',               operators: ['NTT Docomo', 'SoftBank', 'au'] },
  '82':  { country: 'Corea del Sur',           flag: '🇰🇷', continent: 'Asia',               operators: ['SK Telecom', 'KT', 'LG U+'] },
  '84':  { country: 'Vietnam',                 flag: '🇻🇳', continent: 'Asia',               operators: ['Viettel', 'Mobifone', 'Vinaphone'] },
  '86':  { country: 'China',                   flag: '🇨🇳', continent: 'Asia',               operators: ['China Mobile', 'China Unicom', 'China Telecom'] },
  '90':  { country: 'Turquía',                 flag: '🇹🇷', continent: 'Europa / Asia',      operators: ['Turkcell', 'Vodafone TR', 'Türk Telekom'] },
  '91':  { country: 'India',                   flag: '🇮🇳', continent: 'Asia',               operators: ['Jio', 'Airtel', 'Vi', 'BSNL'] },
  '92':  { country: 'Pakistán',                flag: '🇵🇰', continent: 'Asia',               operators: ['Jazz', 'Telenor PK', 'Zong', 'Ufone'] },
  '93':  { country: 'Afganistán',              flag: '🇦🇫', continent: 'Asia',               operators: ['Afghan Wireless', 'Roshan', 'MTN AF'] },
  '94':  { country: 'Sri Lanka',               flag: '🇱🇰', continent: 'Asia',               operators: ['Dialog', 'Mobitel', 'Airtel LK'] },
  '95':  { country: 'Myanmar',                 flag: '🇲🇲', continent: 'Asia',               operators: ['MPT', 'Mytel', 'Ooredoo MM'] },
  '98':  { country: 'Irán',                    flag: '🇮🇷', continent: 'Asia',               operators: ['Hamrahe Aval', 'Irancell', 'RighTel'] },
  '212': { country: 'Marruecos',               flag: '🇲🇦', continent: 'África',             operators: ['Maroc Telecom', 'Orange MA', 'Inwi'] },
  '213': { country: 'Argelia',                 flag: '🇩🇿', continent: 'África',             operators: ['Mobilis', 'Djezzy', 'Ooredoo DZ'] },
  '216': { country: 'Túnez',                   flag: '🇹🇳', continent: 'África',             operators: ['Tunisie Telecom', 'Ooredoo TN', 'Orange TN'] },
  '218': { country: 'Libia',                   flag: '🇱🇾', continent: 'África',             operators: ['Libyana', 'Madar'] },
  '220': { country: 'Gambia',                  flag: '🇬🇲', continent: 'África',             operators: ['Africell', 'Gamcel', 'QCell'] },
  '221': { country: 'Senegal',                 flag: '🇸🇳', continent: 'África',             operators: ['Orange SN', 'Free SN', 'Expresso'] },
  '222': { country: 'Mauritania',              flag: '🇲🇷', continent: 'África',             operators: ['Mauritel', 'Mattel', 'Chinguitel'] },
  '223': { country: 'Mali',                    flag: '🇲🇱', continent: 'África',             operators: ['Orange ML', 'Malitel'] },
  '224': { country: 'Guinea',                  flag: '🇬🇳', continent: 'África',             operators: ['Orange GN', 'MTN GN', 'Cellcom'] },
  '225': { country: 'Costa de Marfil',         flag: '🇨🇮', continent: 'África',             operators: ['Orange CI', 'MTN CI', 'Moov'] },
  '226': { country: 'Burkina Faso',            flag: '🇧🇫', continent: 'África',             operators: ['Orange BF', 'Telecel BF', 'Moov BF'] },
  '227': { country: 'Níger',                   flag: '🇳🇪', continent: 'África',             operators: ['Airtel NE', 'Moov NE', 'Orange NE'] },
  '228': { country: 'Togo',                    flag: '🇹🇬', continent: 'África',             operators: ['Togocel', 'Moov TG'] },
  '229': { country: 'Benín',                   flag: '🇧🇯', continent: 'África',             operators: ['MTN BJ', 'Moov BJ'] },
  '230': { country: 'Mauricio',                flag: '🇲🇺', continent: 'África',             operators: ['Orange MU', 'Emtel', 'MTML'] },
  '231': { country: 'Liberia',                 flag: '🇱🇷', continent: 'África',             operators: ['Lonestar', 'Orange LR'] },
  '232': { country: 'Sierra Leona',            flag: '🇸🇱', continent: 'África',             operators: ['Africell SL', 'Orange SL'] },
  '233': { country: 'Ghana',                   flag: '🇬🇭', continent: 'África',             operators: ['MTN GH', 'Vodafone GH', 'AirtelTigo'] },
  '234': { country: 'Nigeria',                 flag: '🇳🇬', continent: 'África',             operators: ['MTN NG', 'Airtel NG', 'Glo', '9mobile'] },
  '235': { country: 'Chad',                    flag: '🇹🇩', continent: 'África',             operators: ['Airtel TD', 'Moov TD'] },
  '236': { country: 'República Centroafricana',flag: '🇨🇫', continent: 'África',             operators: ['Orange CF', 'Telecel CF'] },
  '237': { country: 'Camerún',                 flag: '🇨🇲', continent: 'África',             operators: ['MTN CM', 'Orange CM'] },
  '238': { country: 'Cabo Verde',              flag: '🇨🇻', continent: 'África',             operators: ['CVMóvel', 'Unitel CV'] },
  '239': { country: 'Santo Tomé y Príncipe',   flag: '🇸🇹', continent: 'África',             operators: ['CST'] },
  '240': { country: 'Guinea Ecuatorial',       flag: '🇬🇶', continent: 'África',             operators: ['Orange GQ', 'GETESA'] },
  '241': { country: 'Gabón',                   flag: '🇬🇦', continent: 'África',             operators: ['Airtel GA', 'Moov GA'] },
  '242': { country: 'República del Congo',     flag: '🇨🇬', continent: 'África',             operators: ['MTN CG', 'Airtel CG'] },
  '243': { country: 'Rep. Democrática del Congo', flag: '🇨🇩', continent: 'África',          operators: ['Vodacom CD', 'Airtel CD', 'Orange CD'] },
  '244': { country: 'Angola',                  flag: '🇦🇴', continent: 'África',             operators: ['Unitel', 'Movicel'] },
  '245': { country: 'Guinea-Bisáu',            flag: '🇬🇼', continent: 'África',             operators: ['Orange GW', 'MTN GW'] },
  '246': { country: 'Territorio Británico del Océano Índico', flag: '🇮🇴', continent: 'África', operators: ['Cable & Wireless'] },
  '247': { country: 'Isla Ascensión',          flag: '🇸🇭', continent: 'África',             operators: ['Sure'] },
  '248': { country: 'Seychelles',              flag: '🇸🇨', continent: 'África',             operators: ['Airtel SC', 'Cable & Wireless SC'] },
  '249': { country: 'Sudán',                   flag: '🇸🇩', continent: 'África',             operators: ['Zain SD', 'MTN SD', 'Sudani'] },
  '250': { country: 'Ruanda',                  flag: '🇷🇼', continent: 'África',             operators: ['MTN RW', 'Airtel RW'] },
  '251': { country: 'Etiopía',                 flag: '🇪🇹', continent: 'África',             operators: ['Ethio Telecom', 'Safaricom ET'] },
  '252': { country: 'Somalia',                 flag: '🇸🇴', continent: 'África',             operators: ['Hormuud', 'Golis', 'Somtel'] },
  '253': { country: 'Yibuti',                  flag: '🇩🇯', continent: 'África',             operators: ['Djibouti Telecom'] },
  '254': { country: 'Kenia',                   flag: '🇰🇪', continent: 'África',             operators: ['Safaricom', 'Airtel KE', 'Telkom KE'] },
  '255': { country: 'Tanzania',                flag: '🇹🇿', continent: 'África',             operators: ['Vodacom TZ', 'Airtel TZ', 'Tigo TZ', 'Halotel'] },
  '256': { country: 'Uganda',                  flag: '🇺🇬', continent: 'África',             operators: ['MTN UG', 'Airtel UG'] },
  '257': { country: 'Burundi',                 flag: '🇧🇮', continent: 'África',             operators: ['Econet Leo', 'Lumitel', 'Onatel'] },
  '258': { country: 'Mozambique',              flag: '🇲🇿', continent: 'África',             operators: ['Vodacom MZ', 'Movitel', 'tmcel'] },
  '260': { country: 'Zambia',                  flag: '🇿🇲', continent: 'África',             operators: ['MTN ZM', 'Airtel ZM', 'Zamtel'] },
  '261': { country: 'Madagascar',              flag: '🇲🇬', continent: 'África',             operators: ['Airtel MG', 'Orange MG', 'Telma'] },
  '262': { country: 'Reunión / Mayotte',       flag: '🇷🇪', continent: 'África',             operators: ['Orange RE', 'SFR RE'] },
  '263': { country: 'Zimbabue',                flag: '🇿🇼', continent: 'África',             operators: ['Econet', 'NetOne', 'Telecel ZW'] },
  '264': { country: 'Namibia',                 flag: '🇳🇦', continent: 'África',             operators: ['MTC', 'TN Mobile'] },
  '265': { country: 'Malaui',                  flag: '🇲🇼', continent: 'África',             operators: ['Airtel MW', 'TNM'] },
  '266': { country: 'Lesoto',                  flag: '🇱🇸', continent: 'África',             operators: ['Econet Lesotho', 'Vodacom LS'] },
  '267': { country: 'Botsuana',                flag: '🇧🇼', continent: 'África',             operators: ['BTC', 'Mascom', 'Orange BW'] },
  '268': { country: 'Suazilandia',             flag: '🇸🇿', continent: 'África',             operators: ['MTN SZ', 'Swazi MTN'] },
  '269': { country: 'Comoras',                 flag: '🇰🇲', continent: 'África',             operators: ['Comores Telecom', 'Telma COM'] },
  '290': { country: 'Santa Elena',             flag: '🇸🇭', continent: 'África',             operators: ['Sure SH'] },
  '291': { country: 'Eritrea',                 flag: '🇪🇷', continent: 'África',             operators: ['EriTel'] },
  '297': { country: 'Aruba',                   flag: '🇦🇼', continent: 'América del Norte',  operators: ['SETAR', 'Digicel AW'] },
  '298': { country: 'Islas Feroe',             flag: '🇫🇴', continent: 'Europa',             operators: ['Faroese Telecom', 'Vodafone FO'] },
  '299': { country: 'Groenlandia',             flag: '🇬🇱', continent: 'América del Norte',  operators: ['Tele Greenland'] },
  '350': { country: 'Gibraltar',               flag: '🇬🇮', continent: 'Europa',             operators: ['Gibtel', 'CTS'] },
  '351': { country: 'Portugal',                flag: '🇵🇹', continent: 'Europa',             operators: ['MEO', 'NOS', 'Vodafone PT'] },
  '352': { country: 'Luxemburgo',              flag: '🇱🇺', continent: 'Europa',             operators: ['POST', 'Tango', 'Orange LU'] },
  '353': { country: 'Irlanda',                 flag: '🇮🇪', continent: 'Europa',             operators: ['Vodafone IE', 'Three IE', 'Eir'] },
  '354': { country: 'Islandia',                flag: '🇮🇸', continent: 'Europa',             operators: ['Síminn', 'Vodafone IS', 'Nova'] },
  '355': { country: 'Albania',                 flag: '🇦🇱', continent: 'Europa',             operators: ['Vodafone AL', 'Telekom AL', 'ALBtelecom'] },
  '356': { country: 'Malta',                   flag: '🇲🇹', continent: 'Europa',             operators: ['GO', 'Vodafone MT', 'Melita'] },
  '357': { country: 'Chipre',                  flag: '🇨🇾', continent: 'Europa',             operators: ['Epic', 'Cyta'] },
  '358': { country: 'Finlandia',               flag: '🇫🇮', continent: 'Europa',             operators: ['Elisa', 'DNA', 'Telia FI'] },
  '359': { country: 'Bulgaria',                flag: '🇧🇬', continent: 'Europa',             operators: ['A1 BG', 'Telenor BG', 'Vivacom'] },
  '370': { country: 'Lituania',                flag: '🇱🇹', continent: 'Europa',             operators: ['Tele2 LT', 'Telia LT', 'Bite'] },
  '371': { country: 'Letonia',                 flag: '🇱🇻', continent: 'Europa',             operators: ['LMT', 'Tele2 LV', 'Bite LV'] },
  '372': { country: 'Estonia',                 flag: '🇪🇪', continent: 'Europa',             operators: ['Telia EE', 'Elisa EE', 'Tele2 EE'] },
  '373': { country: 'Moldavia',                flag: '🇲🇩', continent: 'Europa',             operators: ['Orange MD', 'Moldcell', 'Unite'] },
  '374': { country: 'Armenia',                 flag: '🇦🇲', continent: 'Asia',               operators: ['Viva-MTS', 'Beeline AM', 'Ucom'] },
  '375': { country: 'Bielorrusia',             flag: '🇧🇾', continent: 'Europa',             operators: ['A1 BY', 'MTS BY', 'life:)'] },
  '376': { country: 'Andorra',                 flag: '🇦🇩', continent: 'Europa',             operators: ['Andorra Telecom'] },
  '377': { country: 'Mónaco',                  flag: '🇲🇨', continent: 'Europa',             operators: ['Monaco Telecom'] },
  '378': { country: 'San Marino',              flag: '🇸🇲', continent: 'Europa',             operators: ['TIM SM'] },
  '380': { country: 'Ucrania',                 flag: '🇺🇦', continent: 'Europa',             operators: ['Kyivstar', 'Vodafone UA', 'lifecell'] },
  '381': { country: 'Serbia',                  flag: '🇷🇸', continent: 'Europa',             operators: ['Telekom Srbija', 'Telenor RS', 'A1 RS'] },
  '382': { country: 'Montenegro',              flag: '🇲🇪', continent: 'Europa',             operators: ['Crnogorski Telekom', 'A1 ME', 'Mtel ME'] },
  '385': { country: 'Croacia',                 flag: '🇭🇷', continent: 'Europa',             operators: ['Hrvatski Telekom', 'A1 HR', 'Tele2 HR'] },
  '386': { country: 'Eslovenia',               flag: '🇸🇮', continent: 'Europa',             operators: ['Telekom SI', 'A1 SI', 'T-2'] },
  '387': { country: 'Bosnia y Herzegovina',    flag: '🇧🇦', continent: 'Europa',             operators: ['BH Telecom', 'm:tel', 'HT Eronet'] },
  '389': { country: 'Macedonia del Norte',     flag: '🇲🇰', continent: 'Europa',             operators: ['Telekom MK', 'A1 MK', 'Lycamobile MK'] },
  '420': { country: 'República Checa',         flag: '🇨🇿', continent: 'Europa',             operators: ['T-Mobile CZ', 'O2 CZ', 'Vodafone CZ'] },
  '421': { country: 'Eslovaquia',              flag: '🇸🇰', continent: 'Europa',             operators: ['Slovak Telekom', 'Orange SK', 'O2 SK'] },
  '423': { country: 'Liechtenstein',           flag: '🇱🇮', continent: 'Europa',             operators: ['Telecom FL', 'FL1'] },
  '500': { country: 'Islas Malvinas',          flag: '🇫🇰', continent: 'América del Sur',    operators: ['Sure FK'] },
  '501': { country: 'Belice',                  flag: '🇧🇿', continent: 'América Central',    operators: ['Belize Telemedia', 'Smart BZ'] },
  '502': { country: 'Guatemala',               flag: '🇬🇹', continent: 'América Central',    operators: ['Tigo GT', 'Claro GT', 'Movistar GT'] },
  '503': { country: 'El Salvador',             flag: '🇸🇻', continent: 'América Central',    operators: ['Tigo SV', 'Claro SV', 'Movistar SV'] },
  '504': { country: 'Honduras',                flag: '🇭🇳', continent: 'América Central',    operators: ['Tigo HN', 'Claro HN'] },
  '505': { country: 'Nicaragua',               flag: '🇳🇮', continent: 'América Central',    operators: ['Claro NI', 'Movistar NI'] },
  '506': { country: 'Costa Rica',              flag: '🇨🇷', continent: 'América Central',    operators: ['Kölbi', 'Claro CR', 'Movistar CR'] },
  '507': { country: 'Panamá',                  flag: '🇵🇦', continent: 'América Central',    operators: ['Cable & Wireless PA', 'Claro PA', 'Movistar PA'] },
  '508': { country: 'San Pedro y Miquelón',    flag: '🇵🇲', continent: 'América del Norte',  operators: ['Ameris'] },
  '509': { country: 'Haití',                   flag: '🇭🇹', continent: 'América del Norte',  operators: ['Digicel HT', 'Natcom'] },
  '590': { country: 'Guadalupe',               flag: '🇬🇵', continent: 'América del Norte',  operators: ['Orange GP', 'SFR GP'] },
  '591': { country: 'Bolivia',                 flag: '🇧🇴', continent: 'América del Sur',    operators: ['Tigo BO', 'Entel BO', 'Viva'] },
  '592': { country: 'Guyana',                  flag: '🇬🇾', continent: 'América del Sur',    operators: ['GTT', 'Digicel GY'] },
  '593': { country: 'Ecuador',                 flag: '🇪🇨', continent: 'América del Sur',    operators: ['Claro EC', 'Movistar EC', 'CNT'] },
  '594': { country: 'Guayana Francesa',        flag: '🇬🇫', continent: 'América del Sur',    operators: ['Orange GF', 'SFR GF'] },
  '595': { country: 'Paraguay',                flag: '🇵🇾', continent: 'América del Sur',    operators: ['Tigo PY', 'Claro PY', 'Personal PY'] },
  '596': { country: 'Martinica',               flag: '🇲🇶', continent: 'América del Norte',  operators: ['Orange MQ', 'SFR MQ'] },
  '597': { country: 'Surinam',                 flag: '🇸🇷', continent: 'América del Sur',    operators: ['Digicel SR', 'Telesur'] },
  '598': { country: 'Uruguay',                 flag: '🇺🇾', continent: 'América del Sur',    operators: ['Antel', 'Claro UY', 'Movistar UY'] },
  '599': { country: 'Antillas Neerlandesas',   flag: '🇨🇼', continent: 'América del Norte',  operators: ['Flow', 'Digicel AN'] },
  '670': { country: 'Timor Oriental',          flag: '🇹🇱', continent: 'Asia',               operators: ['Timor Telecom', 'Telemor'] },
  '672': { country: 'Norfolk',                 flag: '🇳🇫', continent: 'Oceanía',            operators: ['Norfolk Telecom'] },
  '673': { country: 'Brunéi',                  flag: '🇧🇳', continent: 'Asia',               operators: ['DST', 'Progresif'] },
  '674': { country: 'Nauru',                   flag: '🇳🇷', continent: 'Oceanía',            operators: ['Digicel NR'] },
  '675': { country: 'Papúa Nueva Guinea',      flag: '🇵🇬', continent: 'Oceanía',            operators: ['Digicel PG', 'Vodafone PG'] },
  '676': { country: 'Tonga',                   flag: '🇹🇴', continent: 'Oceanía',            operators: ['Digicel TO', 'Tonga Communications'] },
  '677': { country: 'Islas Salomón',           flag: '🇸🇧', continent: 'Oceanía',            operators: ['Our Telekom', 'bmobile SI'] },
  '678': { country: 'Vanuatu',                 flag: '🇻🇺', continent: 'Oceanía',            operators: ['Digicel VU', 'Vodafone VU'] },
  '679': { country: 'Fiyi',                    flag: '🇫🇯', continent: 'Oceanía',            operators: ['Vodafone FJ', 'Digicel FJ'] },
  '680': { country: 'Palaos',                  flag: '🇵🇼', continent: 'Oceanía',            operators: ['PNCC', 'Palau Mobile'] },
  '681': { country: 'Wallis y Futuna',         flag: '🇼🇫', continent: 'Oceanía',            operators: ['Optic'] },
  '682': { country: 'Islas Cook',              flag: '🇨🇰', continent: 'Oceanía',            operators: ['Telecom Cook Islands'] },
  '683': { country: 'Niue',                    flag: '🇳🇺', continent: 'Oceanía',            operators: ['Telecom Niue'] },
  '685': { country: 'Samoa',                   flag: '🇼🇸', continent: 'Oceanía',            operators: ['Digicel WS', 'Bluesky WS'] },
  '686': { country: 'Kiribati',                flag: '🇰🇮', continent: 'Oceanía',            operators: ['Telecom Kiribati'] },
  '687': { country: 'Nueva Caledonia',         flag: '🇳🇨', continent: 'Oceanía',            operators: ['OPT', 'Vodafone NC'] },
  '688': { country: 'Tuvalu',                  flag: '🇹🇻', continent: 'Oceanía',            operators: ['Tuvalu Telecom'] },
  '689': { country: 'Polinesia Francesa',      flag: '🇵🇫', continent: 'Oceanía',            operators: ['Vini', 'Vodafone PF'] },
  '690': { country: 'Tokelau',                 flag: '🇹🇰', continent: 'Oceanía',            operators: ['Teletok'] },
  '691': { country: 'Micronesia',              flag: '🇫🇲', continent: 'Oceanía',            operators: ['FSM Telecom'] },
  '692': { country: 'Islas Marshall',          flag: '🇲🇭', continent: 'Oceanía',            operators: ['NTSC'] },
  '850': { country: 'Corea del Norte',         flag: '🇰🇵', continent: 'Asia',               operators: ['Koryolink'] },
  '852': { country: 'Hong Kong',               flag: '🇭🇰', continent: 'Asia',               operators: ['SmarTone', 'HKT', '3 HK', 'China Mobile HK'] },
  '853': { country: 'Macao',                   flag: '🇲🇴', continent: 'Asia',               operators: ['CTM', '3 Macao'] },
  '855': { country: 'Camboya',                 flag: '🇰🇭', continent: 'Asia',               operators: ['Cellcard', 'Smart KH', 'Metfone'] },
  '856': { country: 'Laos',                    flag: '🇱🇦', continent: 'Asia',               operators: ['Lao Telecom', 'Unitel LA', 'ETL'] },
  '880': { country: 'Bangladesh',              flag: '🇧🇩', continent: 'Asia',               operators: ['Grameenphone', 'Robi', 'Banglalink', 'Teletalk'] },
  '886': { country: 'Taiwán',                  flag: '🇹🇼', continent: 'Asia',               operators: ['Chunghwa', 'Taiwan Mobile', 'Far EasTone'] },
  '960': { country: 'Maldivas',                flag: '🇲🇻', continent: 'Asia',               operators: ['Dhiraagu', 'Ooredoo MV'] },
  '961': { country: 'Líbano',                  flag: '🇱🇧', continent: 'Asia',               operators: ['touch', 'Alfa'] },
  '962': { country: 'Jordania',                flag: '🇯🇴', continent: 'Asia',               operators: ['Zain JO', 'Orange JO', 'Umniah'] },
  '963': { country: 'Siria',                   flag: '🇸🇾', continent: 'Asia',               operators: ['Syriatel', 'MTN SY'] },
  '964': { country: 'Irak',                    flag: '🇮🇶', continent: 'Asia',               operators: ['Zain IQ', 'Asiacell', 'Korek'] },
  '965': { country: 'Kuwait',                  flag: '🇰🇼', continent: 'Asia',               operators: ['Zain KW', 'Ooredoo KW', 'STC KW'] },
  '966': { country: 'Arabia Saudita',          flag: '🇸🇦', continent: 'Asia',               operators: ['STC', 'Mobily', 'Zain SA'] },
  '967': { country: 'Yemen',                   flag: '🇾🇪', continent: 'Asia',               operators: ['Yemen Mobile', 'MTN YE', 'Sabafon'] },
  '968': { country: 'Omán',                    flag: '🇴🇲', continent: 'Asia',               operators: ['Omantel', 'Ooredoo OM'] },
  '970': { country: 'Palestina',               flag: '🇵🇸', continent: 'Asia',               operators: ['Jawwal', 'Wataniya Mobile'] },
  '971': { country: 'Emiratos Árabes Unidos',  flag: '🇦🇪', continent: 'Asia',               operators: ['Etisalat', 'du'] },
  '972': { country: 'Israel',                  flag: '🇮🇱', continent: 'Asia',               operators: ['Cellcom', 'Partner', 'Hot Mobile', 'Pelephone'] },
  '973': { country: 'Baréin',                  flag: '🇧🇭', continent: 'Asia',               operators: ['Batelco', 'Zain BH', 'Ooredoo BH'] },
  '974': { country: 'Catar',                   flag: '🇶🇦', continent: 'Asia',               operators: ['Ooredoo QA', 'Vodafone QA'] },
  '975': { country: 'Bután',                   flag: '🇧🇹', continent: 'Asia',               operators: ['TashiCell', 'B-Mobile'] },
  '976': { country: 'Mongolia',                flag: '🇲🇳', continent: 'Asia',               operators: ['MobiCom', 'Unitel MN', 'Skytel'] },
  '977': { country: 'Nepal',                   flag: '🇳🇵', continent: 'Asia',               operators: ['Ncell', 'Nepal Telecom'] },
  '992': { country: 'Tayikistán',              flag: '🇹🇯', continent: 'Asia',               operators: ['Tcell', 'Beeline TJ', 'MegaFon TJ'] },
  '993': { country: 'Turkmenistán',            flag: '🇹🇲', continent: 'Asia',               operators: ['Altyn Asyr'] },
  '994': { country: 'Azerbaiyán',              flag: '🇦🇿', continent: 'Asia',               operators: ['Azercell', 'Bakcell', 'Nar'] },
  '995': { country: 'Georgia',                 flag: '🇬🇪', continent: 'Asia',               operators: ['Magti', 'Beeline GE', 'Silknet'] },
  '996': { country: 'Kirguistán',              flag: '🇰🇬', continent: 'Asia',               operators: ['Beeline KG', 'MegaCom', 'O!'] },
  '998': { country: 'Uzbekistán',              flag: '🇺🇿', continent: 'Asia',               operators: ['Ucell', 'Beeline UZ', 'UMS'] },
}

// ── Helpers de generación ficticia ──────────────────────────
const rnd = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
const rndOf = arr => arr[rnd(0, arr.length - 1)]
const hex = n => [...Array(n)].map(() => rnd(0, 15).toString(16)).join('')
const dec3 = () => rnd(0, 255)

const fakeIPv4 = () => `${rnd(1,254)}.${rnd(0,255)}.${rnd(0,255)}.${rnd(1,254)}`
const fakeIPv6 = () => [...Array(8)].map(() => hex(4)).join(':')
const fakeMAC  = () => [...Array(6)].map(() => hex(2).toUpperCase()).join(':')
const fakeIMEI = () => {
  const base = [...Array(14)].map(() => rnd(0, 9)).join('')
  return base + rnd(0, 9)
}
const fakeIMSI  = () => `${rnd(100,999)}${rnd(10,99)}${rnd(100000000, 999999999)}`
const fakeICCID = () => `89${rnd(10,99)}${rnd(10,99)}${rnd(1000,9999)}${rnd(10000000,99999999)}${rnd(0,9)}`
const fakeUUID  = () =>
  'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
const fakeHash  = () => [...Array(64)].map(() => rnd(0, 15).toString(16)).join('')
const fakeToken = () => Buffer.from(`${Date.now()}${Math.random()}`).toString('base64').replace(/[^a-zA-Z0-9]/g, '').slice(0, 48)
const fakeUID   = () => `UID-${rnd(100000, 999999)}-${hex(8).toUpperCase()}`

const CITIES = {
  'América del Sur':    ['Bogotá','Medellín','Cali','Buenos Aires','São Paulo','Lima','Santiago','Caracas','Quito','Montevideo'],
  'América del Norte':  ['Ciudad de México','Guadalajara','Monterrey','La Habana','Ciudad de Panamá','San José'],
  'América Central':    ['Guatemala City','Tegucigalpa','Managua','San Salvador','San José'],
  'Europa':             ['Madrid','Barcelona','París','Londres','Berlín','Roma','Lisboa','Ámsterdam','Bruselas','Varsovia'],
  'Asia':               ['Tokio','Seúl','Pekín','Mumbai','Dubái','Singapur','Bangkok','Yakarta','Karachi'],
  'África':             ['Lagos','Cairo','Nairobi','Casablanca','Johannesburgo','Accra','Addis Abeba'],
  'Oceanía':            ['Sídney','Melbourne','Auckland','Brisbane','Perth'],
  'Europa / Asia':      ['Estambul','Moscú','Almaty','Bakú'],
}
const REGIONS = ['Norte','Sur','Este','Oeste','Central','Metropolitana','Capital','Costera']
const ISPS    = ['Cloudflare Inc.','Amazon Technologies','Google LLC','Digital Ocean LLC','Akamai Technologies','Microsoft Azure','OVH SAS','Hetzner Online GmbH']
const BROWSERS= ['Chrome 124.0','Firefox 125.0','Safari 17.4','Edge 124.0','Samsung Internet 24','Opera 109.0']
const PHONES  = [
  { brand:'Samsung', models:['Galaxy S24','Galaxy A55','Galaxy S23 Ultra','Galaxy M54'] },
  { brand:'Xiaomi',  models:['Redmi Note 13','Mi 13T','POCO X6 Pro','Redmi 13C'] },
  { brand:'Apple',   models:['iPhone 15 Pro','iPhone 14','iPhone 13 Mini','iPhone SE 3rd'] },
  { brand:'OPPO',    models:['Find X7','A98 5G','Reno 11 Pro','A78'] },
  { brand:'OnePlus', models:['12R','Nord CE4','12','Nord 4'] },
  { brand:'Motorola',models:['Edge 50 Pro','G84','G54 5G','Moto G Power'] },
  { brand:'Huawei',  models:['P60 Pro','Nova 11','Mate 60','Y90'] },
  { brand:'Realme',  models:['GT 6','12 Pro+','C67','Narzo 70 Pro'] },
]
const OS_VERSIONS = {
  Android: ['14.0','13.0','12.0','11.0'],
  iOS:     ['17.4','17.3','16.7','15.8'],
}
const SECURITY_LEVELS = ['🟢 BAJO','🟡 MEDIO','🔴 ALTO','🔴 CRÍTICO']
const RISK_LEVELS     = ['🟢 Mínimo','🟡 Moderado','🔴 Elevado','🔴 Severo']

function getPhoneInfo(number) {
  // Limpiar el número
  const clean = number.replace(/\D/g, '')
  // Buscar prefijo más largo primero (3 dígitos → 2 → 1)
  for (const len of [3, 2, 1]) {
    const prefix = clean.slice(0, len)
    if (PHONE_DB[prefix]) return { ...PHONE_DB[prefix], prefix, localNumber: clean.slice(len) }
  }
  return { country: 'Desconocido', flag: '🏳️', continent: 'Desconocido', operators: ['Desconocido'], prefix: '?', localNumber: clean }
}

function buildReport(rawNumber, phoneInfo) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('es-ES', { day:'2-digit', month:'2-digit', year:'numeric' })
  const timeStr = now.toLocaleTimeString('es-ES')

  const continent = phoneInfo.continent
  const cities    = CITIES[continent] || CITIES['América del Sur']
  const city      = rndOf(cities)
  const region    = `${city} ${rndOf(REGIONS)}`
  const lat       = (Math.random() * 180 - 90).toFixed(6)
  const lon       = (Math.random() * 360 - 180).toFixed(6)
  const postal    = rnd(10000, 99999)
  const isp       = rndOf(ISPS)
  const asn       = `AS${rnd(1000, 65000)}`
  const dns1      = fakeIPv4()
  const dns2      = fakeIPv4()

  const phone      = rndOf(PHONES)
  const isIOS      = phone.brand === 'Apple'
  const os         = isIOS ? 'iOS' : 'Android'
  const osVer      = rndOf(OS_VERSIONS[os])
  const model      = rndOf(phone.models)
  const browser    = rndOf(BROWSERS)
  const battery    = rnd(5, 99)
  const signal     = rnd(1, 5)
  const signalBar  = '█'.repeat(signal) + '░'.repeat(5 - signal)
  const latency    = rnd(12, 380)
  const connType   = rndOf(['4G LTE','5G SA','5G NSA','3G HSPA+','WiFi 6'])
  const operator   = rndOf(phoneInfo.operators)
  const secLevel   = rndOf(SECURITY_LEVELS)
  const riskLevel  = rndOf(RISK_LEVELS)
  const vpn        = rndOf(['Detectado ⚠️','No detectado ✅','No detectado ✅','No detectado ✅'])
  const proxy      = rndOf(['Activo ⚠️','Inactivo ✅','Inactivo ✅'])
  const tor        = rndOf(['Activo ⚠️','Inactivo ✅','Inactivo ✅'])
  const firewall   = rndOf(['Activo ✅','Inactivo ❌','Desconocido ⚠️'])
  const antivirus  = rndOf(['Activo ✅','Sin licencia ⚠️','Inactivo ❌'])
  const deviceId   = `DEV-${hex(8).toUpperCase()}-${hex(4).toUpperCase()}`
  const status     = rndOf(['Online 🟢','Offline 🔴','Inactivo ⚠️'])

  return `
𖣔 ɪᴅᴇɴᴛɪꜰɪᴄᴀᴄɪᴏ́ɴ ˚ʚ♡ɞ˚
❧ Número
> +${rawNumber}
❧ Código internacional
> +${phoneInfo.prefix}
❧ País
> ${phoneInfo.flag} ${phoneInfo.country}
❧ Continente
> ${continent}
❧ Operadora detectada
> ${operator}

𖣔 ɴᴇᴛᴡᴏʀᴋ ˚ʚ♡ɞ˚
❧ IP Pública
> ${fakeIPv4()}
❧ IPv6
> ${fakeIPv6()}
❧ ISP
> ${isp}
❧ ASN
> ${asn}
❧ DNS primario
> ${dns1}
❧ DNS secundario
> ${dns2}
❧ VPN
> ${vpn}
❧ Proxy
> ${proxy}
❧ Tor
> ${tor}

𖣔 ʟᴏᴄᴀʟɪᴢᴀᴄɪᴏ́ɴ ˚ʚ♡ɞ˚
❧ Ciudad
> ${city}
❧ Región
> ${region}
❧ Coordenadas
> ${lat}, ${lon}
❧ Código postal
> ${postal}

𖣔 ᴅɪsᴘᴏsɪᴛɪᴠᴏ ˚ʚ♡ɞ˚
❧ Marca
> ${phone.brand}
❧ Modelo
> ${model}
❧ Sistema operativo
> ${os} ${osVer}
❧ Navegador
> ${browser}
❧ Tipo de conexión
> ${connType}
❧ Batería
> ${battery}%
❧ Señal
> [${signalBar}] ${signal}/5
❧ Latencia
> ${latency}ms
❧ Estado
> ${status}
❧ Firewall
> ${firewall}
❧ Antivirus
> ${antivirus}

𖣔 ɪᴅᴇɴᴛɪꜰɪᴄᴀᴅᴏʀᴇs ˚ʚ♡ɞ˚
❧ IMEI
> ${fakeIMEI()}
❧ IMSI
> ${fakeIMSI()}
❧ ICCID
> ${fakeICCID()}
❧ MAC Address
> ${fakeMAC()}
❧ UUID
> ${fakeUUID()}
❧ Device ID
> ${deviceId}
❧ SHA-256
> ${fakeHash()}
❧ Token
> ${fakeToken()}
❧ UID
> ${fakeUID()}

𖣔 sᴇɢᴜʀɪᴅᴀᴅ ˚ʚ♡ɞ˚
❧ Nivel de seguridad
> ${secLevel}
❧ Riesgo de filtración
> ${riskLevel}

𖣔 ʀᴇᴘᴏʀᴛᴇ ˚ʚ♡ɞ˚
❧ Fecha
> ${dateStr}
❧ Hora
> ${timeStr}
❧ Generado por
> 𝕳𝖎𝖓𝖆𝖙𝖆 𝕭𝖔𝖙

⚠️ _Simulación. Solo el número, país y operadora son reales. El resto es ficticio._`.trim()
}

const sleep = ms => new Promise(r => setTimeout(r, ms))

const handler = async (m, { conn, args, usedPrefix, command }) => {
  await conn.sendMessage(m.chat, { react: { text: '🔍', key: m.key } })

  // ── Resolver objetivo ──────────────────────────────────────
  let targetJid = null

  if (m.quoted) {
    targetJid = m.quoted.sender
  } else if (m.mentionedJid?.length) {
    targetJid = m.mentionedJid[0]
  } else if (args[0]) {
    const raw = args[0].replace(/\D/g, '')
    targetJid = raw + '@s.whatsapp.net'
  }

  if (!targetJid) {
    return conn.sendMessage(m.chat, {
      text: [
        '࿇ ══━━━✥◈✥━━━══ ࿇',
        '    𝕳𝖎𝖓𝖆𝖙𝖆 𝕭𝖔𝖙',
        '࿇ ══━━━✥◈✥━━━══ ࿇',
        '',
        '𖣔 ᴜsᴏ ˚ʚ♡ɞ˚',
        `❧ ${usedPrefix}doxeo @usuario`,
        `❧ ${usedPrefix}doxeo (respondiendo un mensaje)`,
        `❧ ${usedPrefix}doxeo +57XXXXXXXXXX`,
      ].join('\n')
    }, { quoted: m })
  }

  const rawNumber = targetJid.replace('@s.whatsapp.net', '').replace('@lid', '')
  const phoneInfo = getPhoneInfo(rawNumber)

  // ── Animación de escaneo ───────────────────────────────────
  const steps = [
    '𖣔 ɪɴɪᴄɪᴀɴᴅᴏ ᴘʀᴏᴛᴏᴄᴏʟᴏ ˚ʚ♡ɞ˚\n❧ 🔍 Analizando objetivo...',
    '𖣔 ɪɴɪᴄɪᴀɴᴅᴏ ᴘʀᴏᴛᴏᴄᴏʟᴏ ˚ʚ♡ɞ˚\n❧ 🔍 Analizando objetivo...\n❧ 📡 Consultando servidores...',
    '𖣔 ɪɴɪᴄɪᴀɴᴅᴏ ᴘʀᴏᴛᴏᴄᴏʟᴏ ˚ʚ♡ɞ˚\n❧ 🔍 Analizando objetivo...\n❧ 📡 Consultando servidores...\n❧ 🛰 Localizando dispositivo...',
    '𖣔 ɪɴɪᴄɪᴀɴᴅᴏ ᴘʀᴏᴛᴏᴄᴏʟᴏ ˚ʚ♡ɞ˚\n❧ 🔍 Analizando objetivo...\n❧ 📡 Consultando servidores...\n❧ 🛰 Localizando dispositivo...\n❧ 🔓 Descifrando registros...',
    '𖣔 ɪɴɪᴄɪᴀɴᴅᴏ ᴘʀᴏᴛᴏᴄᴏʟᴏ ˚ʚ♡ɞ˚\n❧ 🔍 Analizando objetivo...\n❧ 📡 Consultando servidores...\n❧ 🛰 Localizando dispositivo...\n❧ 🔓 Descifrando registros...\n❧ 💾 Compilando información...',
  ]

  const scanMsg = await conn.sendMessage(m.chat, {
    text: [
      '࿇ ══━━━✥◈✥━━━══ ࿇',
      '    𝕳𝖎𝖓𝖆𝖙𝖆 𝕭𝖔𝖙',
      '࿇ ══━━━✥◈✥━━━══ ࿇',
      '',
      steps[0]
    ].join('\n')
  }, { quoted: m })

  for (let i = 1; i < steps.length; i++) {
    await sleep(1200)
    await conn.sendMessage(m.chat, {
      text: [
        '࿇ ══━━━✥◈✥━━━══ ࿇',
        '    𝕳𝖎𝖓𝖆𝖙𝖆 𝕭𝖔𝖙',
        '࿇ ══━━━✥◈✥━━━══ ࿇',
        '',
        steps[i]
      ].join('\n'),
      edit: scanMsg.key
    })
  }

  await sleep(1500)

  // ── Reporte final ──────────────────────────────────────────
  const report = [
    '࿇ ══━━━✥◈✥━━━══ ࿇',
    '    𝕳𝖎𝖓𝖆𝖙𝖆 𝕭𝖔𝖙',
    '࿇ ══━━━✥◈✥━━━══ ࿇',
    '',
    buildReport(rawNumber, phoneInfo),
    '',
    '⸻⸻⸻⸻⸻⸻',
    '𖣔 ᴄʀᴇᴀᴅᴏʀᴇs ˚ʚ♡ɞ˚',
    '❧ PANDA',
    '࿇ ══━━━✥◈✥━━━══ ࿇',
  ].join('\n')

  await conn.sendMessage(m.chat, {
    text: report,
    edit: scanMsg.key
  })

  await conn.sendMessage(m.chat, { react: { text: '❧', key: m.key } })
}

handler.command = ['doxeo', 'dox', 'lookup']
handler.tags = ['tools']
handler.help = ['doxeo @usuario']
handler.desc = 'Reporte ficticio de información de un número'
handler.exp = 5

export default handler
