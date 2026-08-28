/* Working timetable
   Source: https://docs.google.com/spreadsheets/d/1SJeCwnaPlS5hhBYX76_dLTm1SXoGcL0fDG5hlAAxk70/edit
   Shifts run on the weekend, so the sheet lists the working days one month at a
   time. `hours` is the paid time agreed for that day; the two clocks are the
   same shift shown in each person's local time. */

window.SCHEDULE = {
  person: 'Yun',
  role: 'Part-time \u00b7 weekend shift',
  doc: 'https://docs.google.com/spreadsheets/d/1SJeCwnaPlS5hhBYX76_dLTm1SXoGcL0fDG5hlAAxk70/edit?gid=0#gid=0',
  zones: [
    { id: 'kr', label: 'Korea time' },
    { id: 'vn', label: 'Vietnam time' }
  ],
  months: [
    {
      id: '2026-08',
      label: 'August',
      total: '8 hours',
      days: [
        { date: '2026-08-29', hours: '4 hours', kr: '10:00 - 15:00', vn: '8:00 - 13:00' },
        { date: '2026-08-30', hours: '4 hours', kr: '10:00 - 15:00', vn: '8:00 - 13:00' }
      ]
    },
    {
      id: '2026-09',
      label: 'September',
      total: '40 hours',
      days: [
        { date: '2026-09-05', hours: '5 hours', kr: '10:00 - 15:00', vn: '8:00 - 13:00' },
        { date: '2026-09-06', hours: '5 hours', kr: '10:00 - 15:00', vn: '8:00 - 13:00' },
        { date: '2026-09-12', hours: '5 hours', kr: '10:00 - 15:00', vn: '8:00 - 13:00' },
        { date: '2026-09-13', hours: '5 hours', kr: '10:00 - 15:00', vn: '8:00 - 13:00' },
        { date: '2026-09-19', hours: '5 hours', kr: '10:00 - 15:00', vn: '8:00 - 13:00' },
        { date: '2026-09-20', hours: '5 hours', kr: '10:00 - 15:00', vn: '8:00 - 13:00' },
        { date: '2026-09-26', hours: '5 hours', kr: '10:00 - 15:00', vn: '8:00 - 13:00' },
        { date: '2026-09-27', hours: '5 hours', kr: '10:00 - 15:00', vn: '8:00 - 13:00' }
      ]
    }
  ]
};
