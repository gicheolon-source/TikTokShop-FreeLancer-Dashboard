/* The people on the Shopee CS team.
   `photo` points at a file in assets/img/. If the file is missing the card falls
   back to a coloured circle with the initial, so adding a picture later is just
   dropping the file in -- no code change. Names and roles can also be corrected
   from the dashboard with the Edit button (paths `team.<id>.name` / `.role`). */

window.TEAM = [
  { id: 'camellia', name: 'Camellia', role: 'Customer service', photo: 'assets/img/camellia.jpg', color: '#e11d63' },
  { id: 'vivian',   name: 'Vivian',   role: 'Customer service', photo: '',                        color: '#2563eb' },
  { id: 'yun',      name: 'Yun',      role: 'Weekend shift',    photo: 'assets/img/yun.jpg',      color: '#0d9488' }
];
