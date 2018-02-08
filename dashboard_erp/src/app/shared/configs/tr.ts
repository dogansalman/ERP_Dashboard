export const tr = {
  abbr: 'en-gb',
  months: 'Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık'.split('_'),
  monthsShort: 'Ock_Şub_Mar_Nis_May_Haz_Tem_Agu_Eyl_Ekm_Kas_Ara'.split('_'),
  weekdays: 'Pazar_Pazartesi_Salı_Çarşama_Perşembe_Cuma_Cumartesi'.split('_'),
  weekdaysShort: 'Paz_Pst_Sal_Çar_Per_Cum_Cts'.split('_'),
  weekdaysMin: 'Pa_Pz_Sa_Ça_Pe_Cu_Ct'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY HH:mm',
    LLLL: 'dddd, D MMMM YYYY HH:mm'
  },
  calendar: {
    sameDay: '[Bugü at] LT',
    nextDay: '[Tomorrow at] LT',
    nextWeek: 'dddd [at] LT',
    lastDay: '[Yesterday at] LT',
    lastWeek: '[Last] dddd [at] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'in %s',
    past: '%s ago',
    s: 'saniye önce',
    m: 'dakika',
    mm: '%d dakika',
    h: 'saat',
    hh: '%d saat',
    d: 'a gün',
    dd: '%d gün',
    M: 'a ay',
    MM: '%d ay',
    y: 'a yıl',
    yy: '%d yıl'
  },
  dayOfMonthOrdinalParse: /\d{1,2}(st|nd|rd|th)/,
  ordinal: function (num) {
    const b = num % 10;
    const output = (~~(num % 100 / 10) === 1)
      ? 'th'
      : (b === 1)
        ? 'st'
        : (b === 2)
          ? 'nd'
          : (b === 3)
            ? 'rd' : 'th';
    return num + output;
  },
  week: {
    dow: 1,
    doy: 4 // The week that contains Jan 4th is the first week of the year.
  }
}
